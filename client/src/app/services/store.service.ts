import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public http: HttpClient) { }

  //********************************ORDERS********************************/
  public getOrders() {
    return this.http.get('http://localhost:1000/orders')
  }
  public getOrdersByUserId(user_id): Observable<any> {
    return this.http.get('http://localhost:1000/orders/' + user_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public checkDateDelivery(dd) {
    return this.http.get('http://localhost:1000/orders/date/' + dd,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public saveOrder(body) {
    return this.http.post('http://localhost:1000/orders', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public saveBill(body) {
    return this.http.post('http://localhost:1000/filedownload', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public downloadBill(name) {
    return this.http.get('http://localhost:1000/download/' + name,
      { headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token }, responseType: "blob" })
  }
  //********************************CARTS********************************/
  public getCartByUserId(user_id): Observable<any> {
    return this.http.get('http://localhost:1000/carts/' + user_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public getCartByCardId(cart_id): Observable<any> {
    return this.http.get('http://localhost:1000/carts/cart/' + cart_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public createNewCart(body) {
    return this.http.post('http://localhost:1000/carts', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public deleteOneItem(body): Observable<any> {
    return this.http.put('http://localhost:1000/carts/item/', body, {
      headers: { 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public deleteAllItems(cart_id): Observable<any> {
    return this.http.delete('http://localhost:1000/carts/' + cart_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public addItemToCart(body): Observable<any> {
    return this.http.post('http://localhost:1000/carts/cart', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public updateItemInCart(body) {
    return this.http.put('http://localhost:1000/carts/item/update', body,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  //********************************ITEMS********************************/
  public getItems() {
    return this.http.get('http://localhost:1000/products/items')
  }
  public getItemsByCategoryId(category_id) {
    return this.http.get('http://localhost:1000/products/category/' + category_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public createNewItem(body) {
    return this.http.post('http://localhost:1000/products/item', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public updateItem(body) {
    return this.http.put('http://localhost:1000/products/item', body,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
}
