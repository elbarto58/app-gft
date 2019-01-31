import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  //formulario
  loginForm: FormGroup;
  
  /**
  *
  * Constructor: declaramos todos los servicios que usaremos
  *
  */
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router) { }
  
  /**
  *
  * ngOnInit: cuando la vista termina de cargar, realiza todo lo que se le indica
  *
  */
  ngOnInit() {
    //crea nuestro formulario con validaciones
    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });
  }

  /**
  *
  * login: solicita el servicio de login para autenticar a un usuario
  *
  */
  login(){
    this.authService.login(this.loginForm.value).subscribe(res=>{
      //esperando acciòn
    }, (err)=>{
      console.log("error "+err.error);
    });
    this.loginForm.reset();
  }

  /**
  *
  * viewRegister: redirecciona a la vista de registro
  *
  */
  viewRegister(){
    this.router.navigate(['register']);
  }

}
