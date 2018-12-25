import { Injectable, EventEmitter } from '@angular/core';
import { Product, ProductComment } from '../class/product';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductSearchParams } from '../class/event_agrs';
import { urlParamsEncodeing } from '../utils/helper'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listProducts: Product[];
  listComments: ProductComment[] = [
    new ProductComment(1, 1, "这件商品非常好1", "2018-9-11", "test2", 2.5),
    new ProductComment(6, 1, "这件商品非常好1", "2018-9-11", "test2", 4.5),
    new ProductComment(2, 2, "这件商品非常好2", "2018-9-11", "test2", 2.5),
    new ProductComment(3, 3, "这件商品非常好3", "2018-8-11", "test3", 3),
    new ProductComment(4, 4, "这件商品非常好4", "2018-1-11", "test4", 5),
    new ProductComment(5, 5, "这件商品非常好5", "2018-11-11", "test5", 5)];

  constructor(private httpClient: HttpClient) { }


  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  ngOnInit(): void {

  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products')
  }

  getProductByID(id: number): Observable<Product> {
    let url = `/api/products/${id}`;
    return this.httpClient.get<Product>(url)
  }

  getProductComments(productID: number): Array<ProductComment> {
    return this.listComments.filter((comment) => comment.productID === productID);
  }

  getAllCategroyProduct(): string[] {
    return ["电子产品", "硬件设备", "图书"];
  }

  searchProducts(params: ProductSearchParams): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products' + urlParamsEncodeing(params));
  }


}
