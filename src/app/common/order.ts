export class Order {
  totalPrice:number;
  totalQuantity:number;
  constructor(totalQuantity:number,totalPrice:number) {
    this.totalPrice=totalPrice;
    this.totalQuantity=totalQuantity;
  }
}
