import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient , withFetch, withInterceptors} from '@angular/common/http';

import { authInterceptor } from './services/auth-interceptor.service';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
        { eventCoalescing: true }
    ),
    provideRouter(routes),
    provideClientHydration(withEventReplay()) ,
    provideHttpClient(withFetch() , withInterceptors([authInterceptor]))]
};
