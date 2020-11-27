import { Router } from '@angular/router';
import { LugaresService } from './../lugares.service';
import { Lugar } from './../lugar.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { iif, Subscription } from 'rxjs';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit, OnDestroy {

  ofertas: Lugar[];
  private lugaresSub: Subscription;

  constructor(private offerService: LugaresService, private router: Router){ }

  ngOnInit() {
    this.lugaresSub = this.offerService.lugares.subscribe(lugares => {
      this.ofertas = lugares;
    });

  ngOnDestroy(){
    if(this.lugaresSub){
      this.lugaresSub.unsubscribe();
    }
  }
  }
  onEdit(id: number){
    this.router.navigate(['/', 'lugares', 'tabs', 'ofertas', 'edit', id]);
  }
}
