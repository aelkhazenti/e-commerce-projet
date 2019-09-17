
import { Component, OnInit } from '@angular/core';
import {AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage'
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'


import { Observable} from 'rxjs';
import {finalize, tap}from 'rxjs/operators'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';


import {Router} from '@angular/router'


@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  file: File;

data = {

  nomProduit : '',
  marque : '',
  prix : 0,
  ram : '',
  stockage : '',
  couleur : '', 
  urlmage :'',
}


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;


tasksnap :UploadTaskSnapshot;
  
items : Observable<any[]>;
itemList :AngularFireList<any>; 

  
imageurldata : string

percentage: Observable<number>;
snapshot: Observable<any>;
urlmage : Observable<string>

 
  constructor(private afStorage: AngularFireStorage,public db:AngularFireDatabase,public router:Router) { 

    this.itemList = db.list('produit')

    


  }

  ngOnInit() {
  }


  upload(event){

    const randomId = Math.random().toString(36).substring(2);
    


    const file = event.target.files[0];
    const filepath = randomId;
    const refe = this.afStorage.ref(filepath);
    const tasks = this.afStorage.upload(filepath , file)
    this.percentage = tasks.percentageChanges();
    tasks.snapshotChanges().pipe(finalize(() =>this.urlmage = refe.getDownloadURL())).subscribe()



    

  }



  insertPro(){
      this.itemList.push({
      nomProduit : this.data.nomProduit,
      marque : this.data.marque,
      prix : this.data.prix,
      ram : this.data.ram,
      stockage : this.data.stockage,
      couleur : this.data.couleur, 
      urlimage : this.data.urlmage, 

})



this.router.navigate(['./home'])

  }


  

}