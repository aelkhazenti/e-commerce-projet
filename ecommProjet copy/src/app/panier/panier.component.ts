
import { Component, OnInit , TemplateRef } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

import {Router} from '@angular/router'

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  itemget : string
  nombreProd : string
  itemList: AngularFireList<any>
  paniertotal : string;

itemArra = []

 randomID: string;

  constructor(public db:AngularFireDatabase,public router:Router) { 
    this.nombreProd = localStorage.getItem('number_prod');

this.randomID = localStorage.getItem('randomid')
    
    this.itemList = db.list('panier/'+this.randomID)
    console.log(this.randomID)

    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(Action=>{
       let y=  Action.payload.toJSON()
        y['$key']= Action.key
          this.itemArra.push(y as listitem)

        
      })
    })
    console.log(this.itemArra)

     this.paniertotal = localStorage.getItem('prixtoal')


  }
  


  ngOnInit() {
  }




  infoprodect(){

  }


  getitem(){
    
    this.router.navigate(['./ValidationCommande'])
    
  }


}


export class listitem{
  
  $key :string;
  img :string;
  prix :string;
  marque:string

}