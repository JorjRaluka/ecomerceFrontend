import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {BehaviorSubject, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[];

  totalPrice:Subject<number>=new BehaviorSubject<number>(0);
  //subject= a subclass of Observable;publish events in code;the event will be sent to all of the subscribers

  totalQuantity:Subject<number>=new BehaviorSubject<number>(0);

  //sessionStorage persista doar cat e deschis tab-ul;
  //localStorage persista si cand inchizi tab-ul
  storage:Storage=localStorage;
  constructor() {

    let data=JSON.parse(this.storage.getItem('cartItems')!);
    if(data != null){

      this.cartItems=data;
      this.computeCartTotals();

    }
  }

  addToCart(theCartItem:CartItem){
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:CartItem | undefined;

    if(this.cartItems.length>0){
      existingCartItem=this.cartItems.find(temp=>temp.id ===theCartItem.id);

      alreadyExistsInCart=(existingCartItem != undefined);
    }

    if(alreadyExistsInCart){
      // @ts-ignore
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem)
    }

    this.computeCartTotals();
  }

  computeCartTotals(){
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentItem  of this.cartItems){
      totalPriceValue +=currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue += currentItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging
    this.logCartData(totalPriceValue,totalQuantityValue);
    this.persistCartItems();
  }

  logCartData(totalPriceValue:number,totalQuantityValue:number){
    console.log('contents of the cart');
    for(let aux of this.cartItems){
      const subTotalPrice=aux.quantity*aux.unitPrice;

    }

  }

  decrementQuantity(theCartItem:CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity ===0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem:CartItem){
    const itemIndex=this.cartItems.findIndex(temp=>temp.id === theCartItem.id);
    if(itemIndex >-1){
      this.cartItems.splice(itemIndex ,1);
      this.computeCartTotals();
    }
  }

  persistCartItems(){
    //JSON.stringify convert object to JSON string
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));

  }

  getProductCountsPerCategoryCart(): Promise<{ categoryName: string, count: number }[]> {
    if (this.cartItems.length === 0) {
      alert("The shopping cart is empty");
      return Promise.resolve([]);
    }
    const categoryCounts: { [key: string]: number } = {};

    for (let item of this.cartItems) {
      if (categoryCounts[item.name]) {
        categoryCounts[item.name] += item.quantity;
      } else {
        categoryCounts[item.name] = item.quantity;
      }
    }

    const result = Object.entries(categoryCounts).map(([categoryName, count]) => ({
      categoryName,
      count
    }));

    return Promise.resolve(result);
  }



}
