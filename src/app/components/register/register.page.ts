import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //variables
  registerForm: FormGroup;
  showMessage: boolean;
  message: string;
  class: string;
 
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
    this.showMessage = false;
    this.message = "";
    this.class = "message-success";
    this.registerForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
   
  /**
  *
  * register: solicita el servicio de register para registar a un nuevo usuario
  *
  */
  register(){
    this.showMessage = false;
    this.authService.register(this.registerForm.value).subscribe(res => {
      if(res.success){
        this.showMessage = true;
        this.message = res.success+".\nInicie sesión con el correo registrado: "+this.registerForm.value.email;
        this.class = "message-success";  
        this.registerForm.reset();
      }
    }, (err)=>{
      //console.log("error "+err.error.success);
      this.registerForm.reset();
      this.showMessage = true;
      this.message = err.error.message;
      this.class = "message-error";
    });
  }

}
