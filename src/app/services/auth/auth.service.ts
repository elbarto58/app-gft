import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

/*
*
* constantes:
* MY_TOKEN: contiene el nombre de nuestro token para obtener del storage
* URL_SERVER: url del servidor
*/
const MY_TOKEN = "token_gft";
const URL_SERVER = environment.url;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  user: null;//contendrá los datos que lleva el token
  authState = new BehaviorSubject(false);//el cambio de estado de nuestro usuario

  /**
  *
  * Constructor: declaramos todos los servicios que usaremos
  *
  */
  constructor(private http: HttpClient, 
    private jwtHelperService: JwtHelperService, 
    private storage: Storage,
    private platform: Platform) { 
      this.platform.ready().then(() => {this.isExistToken();}); 
  }
  
  /**
  *
  * isExistToken: verifica si nuestro token siga activo o ya expiró
  *
  */
  isExistToken(){
    this.storage.get(MY_TOKEN).then(token => {
      if(token){
        let expired = this.jwtHelperService.isTokenExpired(token);
        //alert(expired)
        if (!expired) {
          this.authState.next(true);
        } else {
          this.storage.remove(MY_TOKEN);
        }
      }
    });
  }

  /**
  * login: logea al usuario que solicita el acceso
  *
  * @return Response
  *
  */
  login(user: any): Observable<any>{
    return this.http.post<any>(URL_SERVER + '/auth/user/authenticate', user)
      .pipe(map(res => { 
        if(res.token){
          this.storage.set(MY_TOKEN, res.token);
          this.authState.next(true);
        }
      }));
  }

  /**
  * register: registra un nuevo usuario
  *
  * @return Response
  *
  */
  register(user:any): Observable<any>{
    return this.http.post<any>(URL_SERVER+'/auth/user/create', user)
            .pipe(
              map(res=> res));
  }

  /**
  * logout: cierra la sesiòn de un usuario: destruye los datos del storage
  *
  * @return Response
  *
  */
  logout(){
    this.storage.remove(MY_TOKEN).then(() => {
      this.authState.next(false);
    });
  }

  /*setFlag(flag: boolean){
    this.authState.next(flag);
  }*/

  /**
  *
  * getValueState: regresa el valor actual (false o true) del estado del usuario
  *
  * @return Boolean
  */
  getValueState(){
    return this.authState.value;
  }
  

}
