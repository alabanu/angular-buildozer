import { Directive, OnInit, Input, Inject } from '@angular/core';
import { TableComponent } from '../table-view/table-view.component';

@Directive({
  selector: 'semi-table table thead tr:first-child semi-table-head > th'
})

export class FilterableDirective implements OnInit {
  @Input() filterable: string = null;
  @Input() list: any[] = [];
  @Input() type: string = 'text';

  constructor(
    @Inject(TableComponent) private tableComponent: TableComponent,
  ) { }

  ngOnInit() {
    if (this.filterable) {
      this.tableComponent.registerColumn({
        key: this.filterable,
        type: this.type || 'text',
        list: this.list
      });
    }
  }

}
