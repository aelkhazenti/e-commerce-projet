
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  private isloged :Boolean = false;
  private isadmin : Boolean = false;

  constructor() {
    let recha = localStorage.getItem('number_prod')
    console.log(recha)
    

    let status = localStorage.getItem('isloged')
    console.log(status)
    
    let statadmin = localStorage.getItem('admin')

    if(status==="true"){
      this.isloged = true
    }else{
      this.isloged = false
    }

    if (statadmin==="true") {
      this.isadmin = true
    } else {
      this.isadmin = false
    }

   }

  ngOnInit() {
  }

  panier : number ;

  ajoutpro(){

  }
  receiveMessage($event){
    this.panier = $event
  }



  logout(){
    this.isloged=false
    localStorage.setItem('isloged',"false")
    localStorage.setItem('admin',"false")

    localStorage.removeItem('number_prod')
    localStorage.removeItem('prixtoal')
    localStorage.removeItem('randomid')

  }
}