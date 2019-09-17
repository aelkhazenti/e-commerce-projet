
import { Component, OnInit, ViewChild, ElementRef ,AfterViewChecked, SystemJsNgModuleLoader} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage' ;
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {Router} from '@angular/router'
 
declare let paypal: any;


@Component({
  selector: 'app-validation-commande',
  templateUrl: './validation-commande.component.html',
  styleUrls: ['./validation-commande.component.css']
})
export class ValidationCommandeComponent implements OnInit{
   ngOnInit(): void {
      this.initConfig();
    }
   paniertotal : String
   public payPalConfig?: IPayPalConfig;
private initConfig(): void {
      this.payPalConfig = {
      currency: 'EUR',
      clientId: 'ARZGBMZeWsD9RgKg0FNPRQFDpdlFI2keZO_SVJnQxbMHlFHibh5lctG90pNd4ODHPQ6msU09EuqToevH',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.paniertotal,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.paniertotal
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.paniertotal,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }















  paidFor = false;

  data = {

    nom : '',
    prenom : '',
    email : '',
    numero : '',
    Adresse : '',
    Region : '', 
    Ville :'',
    prix_total : localStorage.getItem('prixtoal'),
    etat : 'en cours de traitement'
  }

  itemList :AngularFireList<any>; 

  constructor(private afStorage: AngularFireStorage,public db:AngularFireDatabase,public router:Router) { 
    this.itemList = db.list('validation')
    this.paniertotal = localStorage.getItem('prixtoal')
  }

  

  insertPro(){
    this.itemList.push({
      nom : this.data.nom,
      prenom : this.data.prenom,
      email : this.data.email,
      numero : this.data.numero,
      Adresse : this.data.Adresse,
      region : this.data.Region,
      Ville : this.data.Ville,
      PrixTotal : this.data.prix_total,
      etat : this.data.etat,
})
this.paidFor = true


}
finiPro(){
  this.router.navigate(['./home'])
  
}

}
