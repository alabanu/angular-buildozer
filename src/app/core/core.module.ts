import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  LoggerInterceptor,
  UrlInterceptor,
  ProgressInterceptor,
  SetupInterceptor,
  TeardownInterceptor,
  UniversalInterceptor,
  CacheInterceptor
} from './interceptors';
import { CacheDatabase } from './helpers/cache';
import { AsyncDatabase, IndexedDB } from '@ezzabuzaid/document-storage';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: CacheDatabase,
      useValue: new AsyncDatabase(new IndexedDB('cache'))
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetupInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CacheInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TeardownInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
