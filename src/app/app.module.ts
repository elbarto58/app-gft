import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/*Añadiendo módulos de http (para consultas http), de storage (almacenamiento interno) y jwt (json web token)*/
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { InterceptorToken } from './interceptors/interceptor.token';
import { Storage, IonicStorageModule } from "@ionic/storage";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";

import { ModaluserPage } from './components/modaluser/modaluser.page';

export function jwtOptionsFactory(storage){
  return {
    tokenGetter: ()=>{
      return storage.get('token_gft');
    },
    whitelistedDomains: ['https://mighty-refuge-81707.herokuapp.com/api/']
  }
}

@NgModule({
  declarations: [AppComponent, ModaluserPage],
  entryComponents: [ModaluserPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    /*Nuevos módulos*/
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorToken, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
