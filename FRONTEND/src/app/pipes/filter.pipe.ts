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
      let keys = Object.keys(el);
      let includesText = false;
      keys.forEach(key => {
        if (el[key].includes(value)) {
          includesText = true
        }
      });
      if (includesText) {
        return el
      }
    });
    return arr2
  }

}
