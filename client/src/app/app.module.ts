import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { OrderComponent } from './components/order/order.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { AddformComponent } from './components/addform/addform.component';
import { UpdateformComponent } from './components/updateform/updateform.component';
import { DownloadComponent } from './components/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    NavbarComponent,
    CardComponent,
    OrderComponent,
    SearchComponent,
    AdminComponent,
    SidebarComponent,
    ModalComponent,
    AddformComponent,
    UpdateformComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
