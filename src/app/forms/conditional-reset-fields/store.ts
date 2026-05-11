import { signalStore, withFeature, withLinkedState, withMethods, withProps } from '@ngrx/signals';
import { updateState, withDevtools, withResource } from '@angular-architects/ngrx-toolkit';
import { rxResource } from '@angular/core/rxjs-interop';
import { EntityDataService } from './entity.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  defaultFormModel,
  FormModel,
  FormModelDomainModelService,
  numbersDefault,
  textDefault,
} from './form-model-domain-model.service';
import { withFormInitializing } from '../withFormState.store.feature';

/**
 * @description Unlike reactive forms, there is no `patchValue`/`setValue` layer.
 * This store is just concerned with the form state and connecting the form layer and data layer
 * on init and save.
 *
 * In conjunction with the prototype of the `delegatedSignal` (see form UI file),
 * the form state is projected for the form and updates the store on form change.
 */
export const Store = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    _dataService: inject(EntityDataService),
    _formModelDomainModelService: inject(FormModelDomainModelService),
  })),
  withDevtools('ConditionalResetFormStore'),
  withFeature((store) =>
    withFormInitializing({
      formDomainDataStream: store._dataService.getFormData(),
      defaultFormModel: defaultFormModel,
      mapDomainToFormFn: (domain) =>
        store._formModelDomainModelService.mapDomainToFormModel(domain),
    }),
  ),
  withResource(
    (store) => ({
      dbTables: rxResource({
        stream: () => store._dataService.getDbTables(),
        defaultValue: [],
      }),
      dbFields: rxResource({
        params: () => store._formStoreValue().dbTable,
        stream: (source) => store._dataService.getTableFields(source.params),
        defaultValue: [],
      }),
    }),
    { errorHandling: 'previous value' },
  ),
  // TODO - should this be made a feature itself, with it beign the one that maps the value to the state?
  withLinkedState((store) => {
    return {
      formTemplateValue: () => {
        // TODO - would be good for this to be a proper linkedSignal where you can access the previous value
        const formStoreValue = store._formStoreValue();
        return {
          ...formStoreValue,
          numbers: formStoreValue.fieldType === 'number' ? formStoreValue.numbers : numbersDefault,
          text: formStoreValue.fieldType === 'text' ? formStoreValue.text : textDefault,
        };
      },
    };
  }),
  withMethods((store) => {
    function setFieldType(): void {
      const selectedDbField = store
        .dbFieldsValue()
        ?.find((field) => field.id === store._formStoreValue().dbField);

      if (selectedDbField) {
        updateState(store, 'set Field Type', {
          _formStoreValue: {
            ...store._formStoreValue(),
            fieldType: selectedDbField.type,
          },
        });
      }
    }

    function save() {
      const formData = store.formTemplateValue();
      const domainModel = store._formModelDomainModelService.mapFormModelToDomain(formData);
      return firstValueFrom(store._dataService.save(domainModel));
    }

    return {
      setFieldType,
      save,
    };
  }),
);
