import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterFiled: string, keyWord: string): any {
    if (!filterFiled || !keyWord) {
      return list;
    }
    return list.filter(item => {
      let fieldValue = item[filterFiled];
      return fieldValue.toLowerCase().indexOf(keyWord) >= 0;
    });
  }

}
