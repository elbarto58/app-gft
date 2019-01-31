import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class InterceptorToken implements HttpInterceptor {
    
    constructor(public alertController: AlertController,
                private storage: Storage,
                private authService: AuthService ) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //obtenemos el token gft
        const token = this.storage.get('token_gft');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error.error.success || error.error.error || error.error.message,
                    status: error.status
                };
                
                this.presentAlert(data);
                
                if(error.status === 401){
                    this.authService.logout();
                }

                return throwError(error);
        }));
    }

    //alert que indica el estatus del error y el mensaje
    async presentAlert(data) {
        const alert = await this.alertController.create({
            header: 'Aviso de Error!',
            message: "(Error "+data.status+"): "+data.reason,
            buttons: ['OK']
        });
        await alert.present();
      }    
}