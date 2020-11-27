import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading: boolean = false;
  isLoginMode: boolean = true;

  constructor(private loginService: LoginService, private router: Router, private LoadCtrl: LoadingController) { }

  ngOnInit() {
  }
  onLogin(){
    this.isLoading = true;
    this.loginService.login();

    this.LoadingCtrl
      .create({keyboardClose: true, message: 'Cargando ..'})
      .then(loadingEl => {
        loadingEl.present();
        setTimeout( () => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/lugares/tabs(busqueda');
        }, 1000);
      });
  }

  onSubmit(form: NgForm){

    if(!from.valid){
      return false;
    }

    const email = from.value.email;
    const password = form.value.password;

    if(this.isLoginMode){

    }
    else{

    }
  }
  onSwitchAuthMode(){
    this.isLoginMode = !this.isLoginMode; 
  }
}
