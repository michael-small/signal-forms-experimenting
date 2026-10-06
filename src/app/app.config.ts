import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideResourceExtensions,
  withPreviousValueOnError,
  withPreviousValueOnLoading,
} from './temp_resource_extensions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Once this is mainlined in a fix, remove this code pulled in manually
    // https://github.com/ngrx/platform/pull/5225
    provideResourceExtensions(withPreviousValueOnError(), withPreviousValueOnLoading()),
  ],
};
