import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
//import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth/auth.service';
import { ApigftService } from '../../services/apigft/apigft.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
	/*Variables*/
	token: string;
	cards: {};
	isLoadCards: boolean;
	message: string;
	showMessage: boolean;
	class = "";
	
	/**
	*
	* Constructor: declaramos todos los servicios que usaremos
	*
	*/
	constructor(private storage: Storage,
				private authService: AuthService,
				private api: ApigftService,
				private jwtHelperService: JwtHelperService,
				private router: ActivatedRoute) { }

	/**
  	*
  	* ngOnInit: cuando la vista termina de cargar, realiza todo lo que se le indica
  	*
  	*/
	ngOnInit() {
		this.message = "";
		this.showMessage = false;
		this.class = "";
		this.isLoadCards = false;
		this.token = this.router.snapshot.paramMap.get('_token');
		this.getCatalogs();
		//alert("toke "+this.token);
	}

	/**
  	*
  	* getCatalogs: solicita el servicio de getCatalogs para obtener el catalogo de cuentas y mostrarlos a la vista
  	*
  	*/
	getCatalogs(){
		this.api.getCatalogs(this.token).subscribe(res=>{
			if(res.response){
				this.cards = res.response.type_cards;
				this.isLoadCards = true;
				//this.isLoadAccounts = true;
			}
		}, (err)=>{
			console.log("error "+err);
		 });
	}

	/**
  	*
  	* getCatalogs: solicita el servicio de createAccount para crear una cuenta nueva con base a los datos requeridos
  	*
  	*/
	createAccount(name, type){
		let data = this.jwtHelperService.decodeToken(this.token);
		this.api.createAccount(data.id, name, type, this.token).subscribe(res=>{
	    	if(res.success){
	    		this.showMessage = true;
        		this.message = res.success+", con tipo de tarjeta: "+name;
        		this.class = "message-success";
	    	}
	    }, (err)=>{
	    	this.showMessage = true;
      		this.message = err.error.message;
      		this.class = "message-error";
	    });
	}
}
