import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-modaluser',
	templateUrl: './modaluser.page.html',
	styleUrls: ['./modaluser.page.scss'],
})

export class ModaluserPage implements OnInit {
	//variables
	user: {};
	token: string;

	/**
  	*
  	* Constructor: declaramos todos los servicios que usaremos
  	*
  	*/
	constructor(private modalCtrl: ModalController,
				private jwtHelperService: JwtHelperService,
				private storage: Storage,
				private authService: AuthService) { }

	/**
  	*
  	* ngOnInit: cuando la vista termina de cargar, realiza todo lo que se le indica
  	*
  	*/
	ngOnInit() {
		this.storage.get('token_gft').then(token=>{
			if(token){
				this.token = token;
				this.user = this.jwtHelperService.decodeToken(token);
			}
		})
	}

	/**
  	*
  	* closeModal: cierra el modal
  	*
  	*/
	closeModal(){
		this.modalCtrl.dismiss();
	}

	/**
  	*
  	* logout: solicita el servicio de logout para salir de la aplicaciòn, destruyendo todos los datos del usuario
  	*
  	*/
	logout(){
		this.closeModal();
		this.authService.logout();
	}
}
