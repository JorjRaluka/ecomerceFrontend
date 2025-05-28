import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../common/purchase";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";
import {PaymentInfo} from "../common/payment-info";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
private purchaseUrl=environment.luv2shopApiUrl+ '/checkout/purchase';
private paymentIntentUrl=environment.luv2shopApiUrl + '/checkout/payment-intent';
  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }

  createPaymentIntent(paymentInfo:PaymentInfo):Observable<any>{
    //post-rest api call
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl,paymentInfo);
  }


}
