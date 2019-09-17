
import { Component, OnInit } from '@angular/core';

import{ AngularFireAuth } from '@angular/fire/auth'
import { Router }from '@angular/router'
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})






export class RegisterComponent implements OnInit {
  passwordConfirmationFailed = false;
  passwordConfirmationTxt = '';
 
  signup = new Signup('','','','') ;
 
  confirmPassword() {
    if (this.signup.password === this.passwordConfirmationTxt) {
      this.passwordConfirmationFailed = false;
    } else {
      this.passwordConfirmationFailed = true;
    }
  }





  email:string = '';
  mdp:string = ''; 

  registerForm: FormGroup;
  submitted = false;


  constructor(private fire:AngularFireAuth ,public router:Router,private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      
  });
  }
  //========
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
//===============
  register(){

    this.fire.auth.createUserWithEmailAndPassword(this.email,this.mdp)
    .then(user=>{
      console.log("correct")
      
        this.router.navigate(['home'])
      }) .catch(error=>{
        console.error(error)
        this.router.navigate(['admin'])
      });
    
  }



}


export class Signup {
 
  constructor (
    public email: string,
    public name: string,
    public password: string,
    public country: string,
  ) {  }
 
}