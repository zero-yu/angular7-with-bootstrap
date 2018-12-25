import { Component, OnInit } from '@angular/core';
import { Product } from '../../class/product'
import { ProductService } from 'src/app/services/product.service';
import { FormControl } from '@angular/forms';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WebsocketserviceService } from 'src/app/services/websocketservice.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public listProduct: Observable<Product[]> = null;

  titleFilter: FormControl = new FormControl('')


  keyWord: string;

  constructor(private productService: ProductService, private productWS: WebsocketserviceService) {
    this.titleFilter.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => this.keyWord = value.toLowerCase());
    
  }

  ngOnInit() {
    this.listProduct = this.productService.getProducts();
    this.productService.searchEvent.subscribe(params => this.listProduct = this.productService.searchProducts(params));
  }

}
