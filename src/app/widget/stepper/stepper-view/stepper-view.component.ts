import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper-view.component.html',
  styleUrls: ['./stepper-view.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperViewComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepperViewComponent extends CdkStepper implements OnInit {

  constructor(
    private readonly dir: Directionality,
    private readonly cd: ChangeDetectorRef
  ) {
    super(dir, cd);
  }

  ngOnInit() { }

  onClick(index: number) {
    this.selectedIndex = index;
    // this.cd.detectChanges();
  }

  selectedStep(index) {
    return this.selectedIndex === index;
  }

}
