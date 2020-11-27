import { NavController } from '@ionic/angular';
import { LugaresService } from './../../lugares.service';
import { Lugar } from './../../lugar.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservar-oferta',
  templateUrl: './reservar-oferta.page.html',
  styleUrls: ['./reservar-oferta.page.scss'],
})
export class ReservarOfertaPage implements OnInit {

  lugar: Lugar;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private lugaresService: LugaresService){ }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMAp => {
      if(!paramMAp.has('lugarId')){
        this.navCtrl.navigateBack('/lugares/tabs/ofertas');
        return;
      }
      this.lugar = this.lugaresService.getLugar(+paramMap.get('lugarId'))
    });
  }

}
