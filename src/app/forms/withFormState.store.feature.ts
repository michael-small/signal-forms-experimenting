import { updateState, withResource } from '@angular-architects/ngrx-toolkit';
import { rxResource } from '@angular/core/rxjs-interop';
import { signalStoreFeature, withHooks, withMethods } from '@ngrx/signals';
import { map, Observable } from 'rxjs';

/**
 * @description RxJS first feature for:
 * - Syncing form data
 * - Handing default value
 * - Domain to form mapping
 *
 * Perhaps it could also prescribe form submission handling
 */
export function withFormInitializing<DomainModel, FormModel>(args: {
  formDomainDataStream: Observable<DomainModel>;
  defaultFormModel: FormModel;
  mapDomainToFormFn: (domain: DomainModel) => FormModel;
}) {
  return signalStoreFeature(
    withResource(
      () => ({
        _formStore: rxResource({
          stream: () => args.formDomainDataStream.pipe(map(args.mapDomainToFormFn)),
          defaultValue: args.defaultFormModel,
        }),
      }),
      { errorHandling: 'previous value' },
    ),
    withMethods((store) => ({
      setFormState: (formValue: FormModel) =>
        updateState(store, 'set Form State', { _formStoreValue: formValue }),
    })),
  );
}
