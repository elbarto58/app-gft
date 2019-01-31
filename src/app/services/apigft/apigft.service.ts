import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
//import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

//nuestra variabla constante que contiene la url de nuestro servidor
const URL_SERVER = environment.url;

@Injectable({
	providedIn: 'root'
})

export class ApigftService {
	
	/**
	*
	* Constructor: declaramos todos los servicios que usaremos
	*
	*/
	constructor(private http: HttpClient) { }

	/**
	* GetAccounts: obtiene todas las cuentas validadas del usuario
	*
	* @return Response
	*
	*/
	getAccounts(token): Observable<any>{
		let optionsHeaders = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'x-access-token': token
			})
		};
		return this.http.get<any>(URL_SERVER+'/accounts', optionsHeaders)
				.pipe(map(res=>res));
	}

	/**
	* GetCatalogs: obtiene un catalogo y con ello pedir una nueva cuenta
	*
	* @return Response
	*
	*/
	getCatalogs(token): Observable<any>{
		let optionsHeaders = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'x-access-token': token
			})
		};
		return this.http.get<any>(URL_SERVER+'/catalogs/cards', optionsHeaders)
				.pipe(map(res=>res));
	}	

	/**
	* CreateAccount: crea una nueva cuenta (solicitamos una nueva cuenta)
	*
	* @return Response
	*
	*/
	createAccount(_id, name, type, token): Observable<any>{
		let optionsHeaders = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'x-access-token': token
			})
		};
		let data = {
			"userId": _id,
			"type": type,
			"name": name
		};
		return this.http.post<any>(URL_SERVER+'/accounts', data, optionsHeaders)
            .pipe(map(res=>res));
	}
}
