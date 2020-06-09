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
    console.log("someone tries to get all orders")
    return this.http.get('http://localhost:1000/orders')
  }
  public getOrdersByUserId(user_id): Observable<any> {
    console.log("someone tries to get orders by ID")
    return this.http.get('http://localhost:1000/orders/' + user_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public checkDateDelivery(dd) {
    console.log("someone tries to check a day for delivery")
    return this.http.get('http://localhost:1000/orders/date/' + dd,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public saveOrder(body) {
    console.log("someone tries to save the order to DB")
    return this.http.post('http://localhost:1000/orders', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public saveBill(body) {
    console.log('someone tries to save a bill')
    return this.http.post('http://localhost:1000/filedownload', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public downloadBill(name) {
    console.log('someone tries to download bill')
    return this.http.get('http://localhost:1000/download/' + name,
      { headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token }, responseType: "blob" })
  }
  //********************************CARTS********************************/
  public getCartByUserId(user_id): Observable<any> {
    console.log("someone tries to get carts by user ID")
    return this.http.get('http://localhost:1000/carts/' + user_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public getCartByCardId(cart_id): Observable<any> {
    console.log("someone tries to get carts by cart ID")
    return this.http.get('http://localhost:1000/carts/cart/' + cart_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public createNewCart(body) {
    console.log("someone tries to create new cart")
    return this.http.post('http://localhost:1000/carts', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public deleteOneItem(body): Observable<any> {
    console.log("someone tries to delete 1 item")
    return this.http.put('http://localhost:1000/carts/item/', body, {
      headers: { 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public deleteAllItems(cart_id): Observable<any> {
    console.log("someone tries to delete cart details by cart ID")
    return this.http.delete('http://localhost:1000/carts/' + cart_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public addItemToCart(body): Observable<any> {
    console.log("someone tries to add new item to cart")
    return this.http.post('http://localhost:1000/carts/cart', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public updateItemInCart(body) {
    console.log("someone tries to update item in cart")
    return this.http.put('http://localhost:1000/carts/item/update', body,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  //********************************ITEMS********************************/
  public getItems() {
    console.log("someone tries to get all items")
    return this.http.get('http://localhost:1000/products/items')
  }
  public getItemsByCategoryId(category_id) {
    console.log("someone tries to get carts by cart ID")
    return this.http.get('http://localhost:1000/products/category/' + category_id,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
  public createNewItem(body) {
    console.log("someone tries to create a new item")
    return this.http.post('http://localhost:1000/products/item', body, {
      headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token },
      responseType: "text"
    })
  }
  public updateItem(body) {
    console.log("someone tries to update item")
    return this.http.put('http://localhost:1000/products/item', body,
      { headers: { 'token': sessionStorage.token }, responseType: "text" })
  }
}
