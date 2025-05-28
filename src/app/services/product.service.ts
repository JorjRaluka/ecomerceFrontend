import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";
import * as process from "process";
import * as child_process from "child_process";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl=environment.luv2shopApiUrl +'/products';
  private categoryUrl=environment.luv2shopApiUrl+'/product-category'
  constructor(private httpClient:HttpClient) { }

  getProductListPaginate(thePage:number,thePageSize:number,theCategoryId:number):Observable<GetResponseProducts>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                          + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  getProductList(theCategoryId:number):Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }

  getProductCountsPerCategory(): Promise<{ categoryName: string, count: number }[]> {
    return this.getProductCategories().toPromise().then(async (categories) => {
      const result: { categoryName: string, count: number }[] = [];

      // @ts-ignore
      for (const category of categories) {
        const count = await this.httpClient.get<any>(
          `${this.baseUrl}/search/findByCategoryId?id=${category.id}&size=1`
        ).toPromise().then(res => res.page.totalElements);

        result.push({
          categoryName: category.categoryName,
          count
        });
      }

      return result;
    });
  }

  getAveragePricePerCategory(): Promise<{ categoryName: string, avgPrice: number }[]> {
    return this.getProductCategories().toPromise().then(async (categories) => {
      const result: { categoryName: string, avgPrice: number }[] = [];

      // @ts-ignore
      for (const category of categories) {
        // Fetch all products in this category
        const products = await this.getProductList(category.id).toPromise();

        // @ts-ignore
        if (products.length > 0) {
          // @ts-ignore
          const totalPrice = products.reduce((sum, p) => sum + p.unitPrice, 0);
          // @ts-ignore
          const avgPrice = totalPrice / products.length;

          result.push({
            categoryName: category.categoryName,
            avgPrice: avgPrice
          });
        }
      }

      return result;
    });
  }





  searchProducts(theKeyword: string):Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage:number,thePageSize:number,theKeyword:string):Observable<GetResponseProducts>{
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number):Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  // @ts-ignore
  private productUpdateSubject = new BehaviorSubject<void>(null);
  productUpdates$ = this.productUpdateSubject.asObservable();

  notifyProductUpdate() {
    this.productUpdateSubject.next();
  }
}

interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
