import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rut'
})
export class RutPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let rut = value.replace(/\./g, '').replace('-', '');

    if (rut.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    }
    else if (rut.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      rut = rut.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
    }
    else if (rut.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      rut = rut.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
    }
    else if (rut.match(/^(\d)(\d{0,2})$/)) {
      rut = rut.replace(/^(\d)(\d{0,2})$/, '$1.$2');
    }
    return rut;
  }

}
