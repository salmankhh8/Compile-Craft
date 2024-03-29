import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { CompilerService } from './compiler.service';
import { HttpClientModule } from '@angular/common/http';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,), provideClientHydration(), CompilerService,provideHttpClient(), provideAnimations(),HttpClientModule, ],
};
