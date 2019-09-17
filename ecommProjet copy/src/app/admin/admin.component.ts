
import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import{AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  retourhome(){
    this.router.navigate(['/home'])
  }
  email:string = '';
  mdp:string = ''; 

  constructor(private fire:AngularFireAuth ,public router:Router) { }



  ngOnInit() {
  }
  login(){

    if (this.email === "admin" && this.mdp==="admin" ) {

      
      this,localStorage.setItem('admin',"true")
      console.log("correct")
      localStorage.setItem('isloged',"true")
      this.router.navigate(['home'])
      
    } else {
      console.log("false")
    }


    this.fire.auth.signInWithEmailAndPassword(this.email,this.mdp)
    .then(user=>{
      console.log("correct")
      localStorage.setItem('isloged',"true")
        this.router.navigate(['home'])
      }) .catch(error=>{
        console.error(error)
      });
    



  }





}