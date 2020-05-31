import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DialogComponent, GLOBAL_CONFIG_FOR_DIALOG } from 'app/widget/dialog/dialog.component';
import { DialogService } from 'app/widget/dialog/dialog.service';
import { Backdrop } from './backdrop.utils';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent
  ],
  providers: [
    DialogService,
    Backdrop,
  ]
})
export class DialogModule {
  static forRoot(config?: GlobarDialogConfig): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
        {
          provide: GLOBAL_CONFIG_FOR_DIALOG,
          // TODO: Use factory instead
          useValue: Object.assign({ width: '500px', fadeLeave: 150, fadeEnter: 150 }, config)
        }
      ]
    };
  }
}

interface GlobarDialogConfig {
  width: string;
}
