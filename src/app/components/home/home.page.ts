import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
//import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { AuthService } from '../../services/auth/auth.service';
import { ApigftService } from '../../services/apigft/apigft.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModaluserPage } from '../modaluser/modaluser.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
	//nuestras variables
	user: {};
	token: string;
	accounts: {};
	isLoadAccounts: boolean;

	/**
	*
	* Constructor: declaramos todos los servicios que usaremos
	*
	*/
	constructor(private storage: Storage,
				//private authService: AuthService,
				private api: ApigftService,
				private jwtHelperService: JwtHelperService,
				private router: Router,
				private modalCtrl: ModalController) { }
	/**
  	*
  	* ngOnInit: cuando la vista termina de cargar, realiza todo lo que se le indica
  	*
  	*/
	ngOnInit() {
		this.isLoadAccounts = false;
		//obtenemos nuestro token guardado en el storage
		this.storage.get('token_gft').then(token=>{
			if(token){
				this.token = token;
				//decodificamos nuestro token para acceder a los datos del usuario
				this.user = this.jwtHelperService.decodeToken(token);
				this.getAccounts();
			}
		})
	}

	/**
  	*
  	* getAccounts: solicita el servicio de getAccounts para obtener las cuentas en activo del usuario y mostrarlos en la vista
  	*
  	*/
	getAccounts(){
		this.api.getAccounts(this.token).subscribe(res=>{
			if(res.response){
				this.accounts = res.response;
				this.isLoadAccounts = true;
			}
		}, (err)=>{
			console.log("error "+err);
		  });
	}

	/**
  	*
  	* viewAccount: redirecciona a la vista de cuentas, con el token como parametro
  	*
  	*/
	viewAccount(){
		this.router.navigate(['account', { _token: this.token }]);
	}

	/**
  	*
  	* profile: muestra el modal perfil, que muestra la informaciòn del usuario, asì como la opciòn de salir de la aplicaciòn
  	*
  	*/
	async profile(){
		const modal = await this.modalCtrl.create({
      		component: ModaluserPage,
      		componentProps: { value: 123 }
    	});
    	return await modal.present();
	}

}
