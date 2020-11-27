import { ReservacionService } from './reservacion.service';
import { Component, OnInit } from '@angular/core';
import { Reservacion } from './reservacion.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {

  reservacionesCargadas: Reservacion[];

  constructor(private reservacionService: ReservacionService) { }

  ngOnInit() {
    this.reservacionesCargadas = this.reservacioneService.reservaciones;
  }
  onRemoveReservacion(id: number, slidingEl: ionItemSliding){
    slidingEl.close();
  }
}
