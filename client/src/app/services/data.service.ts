import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public isLogged = new BehaviorSubject<boolean>(false)
  currentIsLogged = this.isLogged.asObservable();
  changeIsLogged(l: boolean) {    
    this.isLogged.next(l)
  }

  public nameSourse = new BehaviorSubject<string>("guest")
  currentName = this.nameSourse.asObservable();
  changeName(name: string) {    
    this.nameSourse.next(name)
  }

  public total = new BehaviorSubject<number>(null)
  currentTotal = this.total.asObservable();
  changeTotal(num: number) {    
    this.total.next(num)
  }

  public itemsToShow = new BehaviorSubject<Array<any>>([])
  currentItemsToShow = this.itemsToShow
  changeItemsToShow(data) {    
    this.itemsToShow.next(data)
  }

  public itemsInCart = new BehaviorSubject<Array<any>>([])
  currentItemsInCart = this.itemsInCart
  changeItemsInCart(data) {   
    this.itemsInCart.next(data)
  }

  public itemToUpdate = new BehaviorSubject<Array<any>>([])
  currentItemToUpdate = this.itemToUpdate
  changeItemToUpdate(data) {    
    this.itemToUpdate.next(data)
  }

  constructor() { }
}
