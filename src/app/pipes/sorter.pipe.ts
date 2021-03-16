import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[] | null, key: string):  any[] | null {

    if (!Array.isArray(value) || !key) {
      return value;
    }

    return value.sort((a, b) => {
      if (typeof (a[key]) === 'number' && typeof (b[key]) === 'number') {
        return a[key] - b[key];
      } else if (key == 'active') {                                       
        a[key] = ('' + a[key]).toLowerCase();
        b[key] = ('' + b[key]).toLowerCase();
        return a[key].localeCompare(b[key]);
      } else {
        return (a[key] as string).toLowerCase().localeCompare((b[key] as string).toLowerCase());
      }
    });

  }

}
