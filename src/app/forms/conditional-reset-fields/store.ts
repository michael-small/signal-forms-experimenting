import {
  signalStore,
  withFeature,
  withLinkedState,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { querySchema } from './form.service';
import { FormService } from './form.service';
import { updateState, withDevtools, withMapper, withResource } from '@ngrx-toolkit/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { EntityDataService } from './entity.service';
import { computed, inject, linkedSignal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { defaultConditionalFormModel, FormModel } from './form.model';
import { FormToDomain } from './form-to-domain';
import { withFormState } from '../withFormState.store.feature';
import { TempService } from './test';
import { TableField } from './entity.model';
import { form } from '@angular/forms/signals';

/**
 * @description Unlike reactive forms, there is no `patchValue`/`setValue` layer.
 * This store is just concerned with the form state and connecting the form layer and data layer
 * on init and save.
 *
 * In conjunction with 22.1's `linkedSignal` + `set` arg,
 * the form state is projected for the form and updates the store on form change.
 */
export const FormStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    _dataService: inject(EntityDataService),
    _formToDomain: inject(FormToDomain),
    _test: inject(TempService),
  })),
  withDevtools(
    'ConditionalResetFormStore',
    withMapper((state) => ({ ...state, _formModelValue: '' })),
  ),
  withFeature((store) => {
    const state = computed(() => store._test.val());

    return withFormState({
      formDataStream: store._dataService.getFormData(),
      defaultFormModel: defaultConditionalFormModel,
      mapDomainToFormFn: (domain) => store._formToDomain.mapDomainToFormModel(domain),
      mapFormToDomainFn: (form) => store._formToDomain.mapFormModelToDomain(form, state()),
      schema: querySchema,
    });
  }),
  withResource(
    (store) => ({
      dbTables: rxResource({
        stream: () => store._dataService.getDbTables(),
        defaultValue: [],
      }),
      dbFields: rxResource({
        params: () => store._formModelValue().dbTable,
        stream: (source) => store._dataService.getTableFields(source.params),
        defaultValue: [],
      }),
    }),
    { errorHandling: 'previous value' },
  ),
  withMethods((store) => {
    // TODO - how to add to the feature?
    function save() {
      return firstValueFrom(store._dataService.save(store.domainModel()));
    }

    return {
      save,
    };
  }),
);
