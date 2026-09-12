import { inject, linkedSignal, Service } from '@angular/core';
import { form, hidden, min, readonly, required, type SchemaPathTree } from '@angular/forms/signals';
import { defaultConditionalFormModel, type FormModel } from './form.model';
import { FormStore } from './store';
import { TableField } from './entity.model';

@Service()
export class FormService {
  protected readonly store = inject(FormStore);

  /**
   * @description Connects the form state to the store.
   * It takes care of
   * - Projecting the store state to the form (the computation)
   * - Updating the store on form changes (set)
   */
  protected formModel = linkedSignal<FormModel>(() => this.store.getFormModel(), {
    set: (value) => {
      const { newFormValue, fieldToReset } = this.setFieldType(value);

      this.store.setFormModel(newFormValue);

      this.resetFormFields(fieldToReset);
    },
  });

  public form = form<FormModel>(
    this.formModel,
    (schema) => {
      // The schema could all be done inline,
      // but this function allows cleaner declaration and possible re-use
      return querySchema(schema);
    },
    {
      submission: {
        action: async () => {
          // Error handling on save can differ a lot from app to app.
          // In my everyday use, we tend to handle errors as side effects directly in the call
          // to have clear spinner blocker and feedback via a snackbar.
          // For other workflows, consider handling errors by this submit,
          // returning a form submission error which can be shown in the UI.
          await this.store.save();
        },
      },
    },
  );

  private resetFormFields(fieldsToReset: 'numbers' | 'text' | null) {
    if (fieldsToReset === 'numbers') {
      this.form.numbers().reset(defaultConditionalFormModel.numbers);
    } else if (fieldsToReset === 'text') {
      this.form.text().reset(defaultConditionalFormModel.text);
    }
  }

  /**
   * @description Determines fields to reset and new form value overall based off of new and old form value
   */
  private setFieldType(value: FormModel): {
    newFormValue: FormModel;
    fieldToReset: 'numbers' | 'text' | null;
  } {
    return this.#setFieldType(value, this.store.getFormModel(), this.store.dbFieldsValue());
  }

  #setFieldType(
    value: FormModel,
    formValue: FormModel,
    dbFieldsValue: TableField[],
  ): {
    newFormValue: FormModel;
    fieldToReset: 'numbers' | 'text' | null;
  } {
    const oldDbField = formValue.dbField;
    const newDbField = value.dbField;

    const prevDBField = dbFieldsValue?.find((field) => field.id === oldDbField);
    const newDBField = dbFieldsValue?.find((field) => field.id === newDbField);

    const newFormValueWithResets =
      newDBField && newDBField !== prevDBField
        ? {
            ...value,
            fieldType: newDBField?.type,
            numbers:
              newDBField?.type === 'number' ? value.numbers : defaultConditionalFormModel.numbers,
            text: newDBField?.type === 'text' ? value.text : defaultConditionalFormModel.text,
          }
        : value;

    let fieldToReset: 'numbers' | 'text' | null = null;
    if (prevDBField?.type !== newDBField?.type) {
      fieldToReset = newDBField?.type === 'number' ? 'text' : 'numbers';
    } else if (prevDBField?.type === newDBField?.type) {
      fieldToReset = null;
    }

    return {
      newFormValue: newFormValueWithResets,
      fieldToReset: fieldToReset,
    };
  }
}

/**
 * @description The `fieldType` is what determins the relevant fields to require
 * Note: in signal forms, `hidden` is for fields not shown in the form, and for saying that
 * a field is not relevant for validation. `hidden` is NOT neccisarily meaning not shown in the UI,
 * but in practice with this example, it could be used like that.
 *
 * Rather than overloading `comparator` and `value` with union of all possible types,
 * each `fieldType` has its own specific comparator + value fields.
 *
 * @see {@link} https://angular.dev/guide/forms/signals/form-logic#choose-between-hidden-disabled-and-readonly
 */
export const querySchema = (schema: SchemaPathTree<FormModel>) => {
  readonly(schema.fieldType);

  required(schema.dbTable, { message: 'DB Table is required' });
  required(schema.dbField, { message: 'DB Field is required' });

  hidden(schema.numbers, {
    when: ({ valueOf }) => valueOf(schema.fieldType) !== 'number',
  });
  required(schema.numbers.comparator, { message: 'Number Comparator is required' });
  min(schema.numbers.value, 0);

  hidden(schema.text, {
    when: ({ valueOf }) => valueOf(schema.fieldType) !== 'text',
  });
  required(schema.text.comparator, { message: 'Text Comparator is required' });
  required(schema.text.value, { message: 'Text Value is required' });
};
