import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'
@Pipe({
  name: 'toPairs'
})
export class ToPairsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.toPairs(value);
  }

}
