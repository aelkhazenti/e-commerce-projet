
import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList, } from '@angular/fire/database';
import { database } from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  itemList: AngularFireList<any>

  itemArra = []
  

  nom : string
  prenom : string
  email : string
  numero : string
  Adresse : string
  Region : string
  Ville :string
  prix_total : string
  







  constructor(public db:AngularFireDatabase) { 

    this.itemList = db.list('validation')

    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(Action=>{
       let y=  Action.payload.toJSON()
        y['$key']= Action.key
          this.itemArra.push(y as listitem)

        
      })
    })
    console.log(this.itemArra)

  }

  ngOnInit() {
  }

  supri( $key){
    this.itemList.remove($key);
    this.itemArra =  [];
  }
  valid($key,nom,prenom,email,Adresse,region,Ville,PrixTotal,etat ){
   
      this.nom = nom
     this.prenom =prenom
      this.email =email
     this.Adresse =Adresse
     this.Region =region
     this.Ville =Ville
     this.prix_total = PrixTotal 

   // console.log(this.nontest)

      this.itemList.set($key,{

      nom : this.nom,
       prenom : this.prenom ,
       email :  this.email ,
       Adresse : this.Adresse ,
       region : this.Region ,
       Ville : this.Ville ,
       PrixTotal : this.prix_total , 
      etat : 'valide',

     })
     console.log("adadad")
    

    this.itemArra = []
  }
}


export class listitem{
  
  $key :string;
  nom : string;
  prenom : string;
  email : string ; 
  numero : string;
  Adresse : string
  Region : string;
  Ville :string;
  prix_total : string;
  etat :string;


}