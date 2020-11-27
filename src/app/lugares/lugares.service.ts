import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar.model';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LugaresService {

  private _lugares: new BehaviorSubject<Lugar[]>([
    new Lugar(1, 'Quinta Gonzalez', 'Quinta con excelente ubicacción', 'https://s2.qwant.com/thumbr/700x0/4/b/5569d71556984435a20faadf90faccc4ce7b942872bb5dce74fc53e70a3a56/Enclave+Mountain+Estates.jpg?u=http%3A%2F%2F3.bp.blogspot.com%2F-L46lTVCs1ik%2FUoUmRanCvcI%2FAAAAAAAAEwo%2FtfoTWqzk3jw%2Fw1200-h630-p-k-no-nu%2FEnclave%2BMountain%2BEstates.jpg&q=0&b=1&p=0&a=1',1200, new Date('2020-10-01'), new Date('2021-01-01'),1),
    new Lugar(2, 'Depto. Las Torres', 'Apartamento con excelente ubicación', 'https://s2.qwant.com/thumbr/0x380/f/3/d04fd0aefc7f8b0a2cc459f3ffc691ffd7ba123520b4dd6733eed32d6ef7f6/1200px-Luzon_Apartment_Building.JPG?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fcf%2FLuzon_Apartment_Building.JPG%2F1200px-Luzon_Apartment_Building.JPG&q=0&b=1&p=0&a=1', 2400, new Date('2020-10-01'), new Date('2021-01-01'),1),
    new Lugar(3, 'Cumbre Elite', 'Apartamento con excelente ubicación', 'https://s2.qwant.com/thumbr/0x380/d/6/0ee11be73be0597ee2b38383f7f754370c96cb883613c82c450f43a7b07928/San-Jose.jpg?u=https%3A%2F%2Fwww.myfirstapartment.com%2Fwp-content%2Fuploads%2F2016%2F03%2FSan-Jose.jpg&q=0&b=1&p=0&a=1', 1800, new Date('2020-10-01'), new Date('2021-01-01'),1),
    new Lugar(4, 'Cumbre Elite', 'Apartamento con excelente ubicación', 'https://s2.qwant.com/thumbr/0x380/d/6/0ee11be73be0597ee2b38383f7f754370c96cb883613c82c450f43a7b07928/San-Jose.jpg?u=https%3A%2F%2Fwww.myfirstapartment.com%2Fwp-content%2Fuploads%2F2016%2F03%2FSan-Jose.jpg&q=0&b=1&p=0&a=1', 1800, new Date('2020-10-01'), new Date('2021-01-01'),1),
    new Lugar(5, 'Cumbre Elite', 'Apartamento con excelente ubicación', 'https://s2.qwant.com/thumbr/0x380/d/6/0ee11be73be0597ee2b38383f7f754370c96cb883613c82c450f43a7b07928/San-Jose.jpg?u=https%3A%2F%2Fwww.myfirstapartment.com%2Fwp-content%2Fuploads%2F2016%2F03%2FSan-Jose.jpg&q=0&b=1&p=0&a=1', 1800, new Date('2020-10-01'), new Date('2021-01-01'),1),
    new Lugar(6, 'Cumbre Elite', 'Apartamento con excelente ubicación', 'https://s2.qwant.com/thumbr/0x380/d/6/0ee11be73be0597ee2b38383f7f754370c96cb883613c82c450f43a7b07928/San-Jose.jpg?u=https%3A%2F%2Fwww.myfirstapartment.com%2Fwp-content%2Fuploads%2F2016%2F03%2FSan-Jose.jpg&q=0&b=1&p=0&a=1', 1800, new Date('2020-10-01'), new Date('2021-01-01'),1)

  ]);
  
  get lugares(){
    return this._lugares.asObservable();
  }

  constructor(private loginService: LoginService) { }

  getLugar(id: number){
    return this.lugares.pipe(take(1), map(lugares => {
      return {...lugares.find.find( lu => lu.id === id)};
    }));
  }

  addLugar(titulo: string, descripcion:string, precio: number, disponibleDesde: Date, disponibleHasta: Date){
    const newLugar = new Lugar(
      Math.random(),
      titulo,
      descripcion,
      'https://img10.naventcdn.com/avisos/18/00/53/55/97/00*/720x532/144271181.jpg',
      precio,
      disponibleDesde,
      disponibleHasta,
      this.loginService.usuarioId
    );
    this._lugares.pipe(take(1)).subcribe(lugares => {
      this._lugares.next(lugares.concat(newLugar));
    })
  }
}

updateLugar(lugarId: number, titulo: string, descripcion: string){
  return this.lugares.pipe(take(1), delay(2000), tap(lugares => {
    const index = lugares.findIndex( lu => lu.id === lugarId);
    const nuevosLugares = [...lugares];
    const old = nuevosLugares[index];
    nuevosLugares[index] = new Lugar (old.id, titulo, descripcion, old.imageUrl, old.precio, old.disponibleDesde, old.disponibleHasta, old.usuarioId);
    this._lugares.next(nuevosLugares);
  }));
}
