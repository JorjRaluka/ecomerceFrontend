import { Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {State} from "../common/state";

import {map} from 'rxjs/operators'
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl=environment.luv2shopApiUrl+ '/countries';
  private statesUrl=environment.luv2shopApiUrl+ '/states';

  constructor(private httpClient:HttpClient) { }
  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response=>response._embedded.countries)
    );
  }


  getStates(theCountryCode:string):Observable<State[]>{
    const searchStatesUrl=`${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response=>response._embedded.states)
    )
  }

  getCreditCardMonth(startMonth:number):Observable<number[]>{
    let data:number[]=[];
    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data)
  }
//of-din return of->wrap an object as an Observable
  getCreditCardYears():Observable<number[]>{
    let data:number[]=[];
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    for(let theYear=startYear;theYear<=endYear;theYear++){
      data.push(theYear);
    }
    return of(data);
  }

}

interface GetResponseCountries{
  _embedded:{
    countries:Country[];
  }
}
interface GetResponseStates{
  _embedded:{
    states:State[];
  }
}
