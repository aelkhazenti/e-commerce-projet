
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanierComponent } from './panier/panier.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule,Routes} from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component'

import {AngularFireStorageModule} from '@angular/fire/storage'

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import {  FormsModule} from '@angular/forms'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ValidationCommandeComponent } from './validation-commande/validation-commande.component';
import {NgxPayPalModule} from 'ngx-paypal';


const routes:Routes =[
  {  path:'' ,redirectTo:'home',pathMatch:'full'},
  {path:'home' , component:HomeComponent},
  {path:'admin',component:AdminComponent},
  {path:'panier',component:PanierComponent},
  {path:'ajout-produit',component:AjoutProduitComponent},
  {path:'sideBar',component:SidebarComponent},
  {path:'validation_admin',component:LoginComponent },
  {path: 'register',component:RegisterComponent },
  {path: 'ValidationCommande',component:ValidationCommandeComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    PanierComponent,
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    AjoutProduitComponent,
    LoginComponent,
    RegisterComponent,
    ValidationCommandeComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    CarouselModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }