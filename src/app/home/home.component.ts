
import { Component, OnInit, NgModule, ViewChild, Output ,EventEmitter, Input } from '@angular/core';
import {CarouselConfig, CarouselModule} from 'ngx-bootstrap/carousel'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Action } from 'rxjs/internal/scheduler/Action';

import { Router } from '@angular/router';

import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { isNgTemplate } from '@angular/compiler';
import { Subject } from 'rxjs';


@Component({ 
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit {

  data ={

    prix : 0,
    imgurl: '',
    nompro : '',
  }


itemList : AngularFireList<any>
itemArra = []
panier : number= 0 ;
panier2 : string ='';
prixtotal
paniertotal : Number =0;
startAt = new Subject();
endAt = new Subject();
startObs = this.startAt.asObservable();
endObs = this.endAt.asObservable();


@Input('product') product : any=[];

private isloged :Boolean = false;
private isadmin : Boolean = false;

  constructor(public db:AngularFireDatabase,private _router:Router,private afStorage: AngularFireStorage) {


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
  

    this.itemList = db.list('produit')

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

  @Output() MessageEvent = new EventEmitter <number>() ;

  public cart = []

  public cartpri = []
  
  public cartmage = []

   randomId = Math.random().toString(36).substring(2);



  
  ajoutpro(item){
    this.panier = this.panier + 1 ;
    //console.log(this.panier) ;
    
      
      
    this.MessageEvent.emit(this.panier)
      
      this.panier2 = this.panier.toString()

      localStorage.setItem('number_prod',this.panier2)

      this.paniertotal = Number(item.prix) + Number(this.paniertotal)


      this.cart.push(item.marque)

       this.cartpri.push(item.prix)
       this.cartmage.push(item.urlimage)
       this.data.prix = item.prix;
       this.data.imgurl = item.urlimage;
       this.data.nompro = item.marque;
      
      console.log(this.cart)

      alert ( item.marque +  " est ajouter dans votre panier ")

    // this.cartServices.addtocart(this.product)
  
    this.itemList = this.db.list('panier/'+this.randomId)

    this.itemList.push({
      prixpro: this.data.prix,
      urlimg: this.data.imgurl,
      marquepro :this.data.nompro
    })


      console.log(item ,"sada")
      console.log('data : ',this.data)
      console.log(this.paniertotal)

      this.prixtotal = this.paniertotal

      localStorage.setItem('prixtoal',this.prixtotal)

    console.log(listitem)
    localStorage.setItem('randomid',this.randomId)
    

  }
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  
  
   sharingdata(){

  //   const randomId = Math.random().toString(36).substring(2);
  //   localStorage.setItem('randomid',randomId)
    
  //   this.itemList = this.db.list('panier/'+randomId)

  //   this.itemList.push({
  //       itemmar:this.cart,
  //       itempri:this.cartpri,
  //       itemimg:this.cartmage

  //   })





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
export class listitem{
  
  $key :string;
  prix : number;
  imgurl: string;
  nompro :string;

}

