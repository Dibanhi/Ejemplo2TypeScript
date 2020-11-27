import { LugaresService } from './../lugares.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lugar } from './.../lugar.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit, OnDestroy {

  lugaresCargados: Lugar[];
  lugaresListados: Lugar[];
  lugaresRelevantes: Lugar[];
  private lugaresSub: Subscription;

  constructor(private LugaresService: LugaresService, private menuCtrl: MenuController, private loginService: LoginService) { }

  ngOnInit() {
    this.lugaresSub = this.lugaresService.lugares.subscribe(lugares => {
      this.lugaresCargados = lugares;
      this.lugaresRelevantes = this.lugaresCargados;
      this.lugaresListados = this.lugaresRelevantes.slice(1);
    });
  }

  ngOnDestroy(){
    if(this.lugaresSub){
      if(this.lugaresSub){
        this.lugaresSub.unsubscribe();
      }
    }
  }

  openSideMenu(){
    this.menuCtrl.open();
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);

    if(event.detail.value === 'todos'){
      this.lugaresRelevantes = this.lugaresCargados;
      this.lugaresListados = this.lugaresRelevantes.slice(1);
    }
    else{
      this.lugaresRelevantes = this.lugaresCargados.filter(
        lugar => lugar.usuarioId !== this.loginService.usuarioId
      );
    }
  }
}
