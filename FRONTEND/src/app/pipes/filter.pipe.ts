import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterPipe implements PipeTransform {

  transform(array: any,value: any): any {
    if (value == "") {
      return array;
    }
    let arr2 = array.filter((el: any) => {
      let values = Object.values(el);
      let values2 = values.join('');
      if (values2.toLowerCase().includes(value)) {
        return el
      }
    });
    return arr2
  }

}
