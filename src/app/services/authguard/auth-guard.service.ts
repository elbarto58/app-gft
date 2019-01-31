import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	/**
  	*
  	* Constructor: declaramos todos los servicios que usaremos
  	*
  	*/
	constructor(private authService: AuthService) { }

	/**
	*
	* canActivate: obtiene el valor actual del estado para determinar a que vista redireccionarà
	*
	*/
	canActivate(): boolean{
		return this.authService.getValueState();
	}
}
