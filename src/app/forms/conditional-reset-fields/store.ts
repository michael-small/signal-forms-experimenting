import { signalStore, withFeature, withMethods, withProps } from '@ngrx/signals';
import { querySchema } from './form.service';
import { mapToResource, withDevtools, withMapper, withResource } from '@ngrx-toolkit/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { EntityDataService } from './entity.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { defaultConditionalFormModel } from './form.model';
import { FormToDomain } from './form-to-domain';
import { withFormState } from '../withFormState.store.feature';
import { extendResource } from '../../temp_resource_extensions';

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
  })),
  withDevtools(
    'ConditionalResetFormStore',
    withMapper((state) => ({ ...state, _formModelValue: '' })),
  ),
  withFeature((store) => {
    return withFormState({
      formDataStream: store._dataService.getFormData(),
      defaultFormModel: defaultConditionalFormModel,
      mapDomainToFormFn: (domain) => store._formToDomain.mapDomainToFormModel(domain),
      mapFormToDomainFn: (form) => store._formToDomain.mapFormModelToDomain(form),
      schema: querySchema,
    });
  }),
  withResource(
    (store) => ({
      dbTables: extendResource(
        rxResource({
          stream: () => store._dataService.getDbTables(),
          defaultValue: [],
        }),
      ),
      dbFields: extendResource(
        rxResource({
          params: () => store._formModelValue().dbTable,
          stream: (source) => store._dataService.getTableFields(source.params),
          defaultValue: [],
        }),
      ),
    }),
    { errorHandling: 'previous value' },
  ),
  withProps((store) => {
    return {
      dbTablesResource: mapToResource(store, 'dbTables'),
      dbFieldsResource: mapToResource(store, 'dbFields'),
    };
  }),
  withMethods((store) => {
    // TODO - skip the domain model setting and just have this be a function from the feature?
    function save() {
      return firstValueFrom(store._dataService.save(store.domainModel()));
    }

    return {
      save,
    };
  }),
);
