import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  filterUsers(value: string,array: any) {
    let arr2 = array.filter((el: any) => {
      let keys = Object.keys(el);
      keys.forEach(key => {
        if (el[key].includes(value)) {
          return el
        }
      });
    });
    return arr2
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
