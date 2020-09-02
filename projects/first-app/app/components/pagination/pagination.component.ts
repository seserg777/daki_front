import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.css' ]
})

export class PaginationComponent {
  @Input('params')
  public set paramsSetter(params: PaginationParamsInterface) {
    if (!!params) {
      /*console.log('paramsSetter', params);*/
      this.params = params;
      this.indexes = this.calculate(params);
    }
  }

  @Output()
  public onChange: EventEmitter<number> = new EventEmitter<number>();

  public params: PaginationParamsInterface;

  public indexes: number[];

  public onItemClickHandler(index: number): void {
    this.onChange.emit(index);
  }

  private calculate(params: PaginationParamsInterface): number[] {
    const result: number[] = [];

    let startIndex: number = 1;

    if (params.total <= (params.controlsCount * params.controlsCount)) {
      startIndex = 1;
      params.controlsCount = Math.ceil(params.total / params.perPage);
    } else if (
      params.current > (Math.floor(params.controlsCount / 2)) &&
      params.current < Math.floor(params.total / params.perPage) - (Math.floor(params.controlsCount / 2))
    ) {
      startIndex = params.current - Math.floor(params.controlsCount / 2);
    } else if (params.current > Math.floor(params.total / params.perPage) - (Math.ceil(params.controlsCount / 2))) {
      startIndex = Math.round(params.total / params.perPage) - params.controlsCount + 1;
    }

    for (let i: number = startIndex; i < startIndex + params.controlsCount; i ++) {
      result.push(i);
    }

    /*console.log('params', params);*/

    return result;
  }
}
