import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductComment } from 'src/app/class/product';
import { ProductService } from 'src/app/services/product.service';
import { WebsocketserviceService } from 'src/app/services/websocketservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: Product = null;

  // productComments: ProductComment[];

  constructor(private routerInfo: ActivatedRoute, private productService: ProductService, private websocketService: WebsocketserviceService) { }

  productTitle: string

  starRating: number = 5;
  comment: string = "";
  isCommentHidden: boolean = true;
  isWatched: Boolean = false;
  currentPrice: number = 0;
  subscription: Subscription

  ngOnInit() {
    let productID: number = Number.parseInt(this.routerInfo.snapshot.paramMap.get('productID'));

    if (productID > 0) {
      this.productService.getProductByID(productID).subscribe(s => {
        this.product = s;
        this.currentPrice = this.product.price;
      });

      // this.productComments = this.productService.getProductComments(productID);
    }
  }

  onSubmitComment(): void {
    let comment = new ProductComment(0, this.product.id, this.comment, new Date().toISOString(), "蛤蛤", this.starRating);

    this.product.comments.unshift(comment);
    let sum = this.product.comments.reduce((sum, comment) => (sum + comment.rating), 0);
    this.product.rating = sum / this.product.comments.length;
    this.resetComment();
  }

  onComment(): void {
    this.isCommentHidden = !this.isCommentHidden;
  }

  resetComment(): void {
    this.comment = "";
    this.starRating = 5;
    this.isCommentHidden = true;
  }

  onWatchProduct(): void {
    this.isWatched = !this.isWatched;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
      this.websocketService.ws.close()
    }
    if (this.isWatched) {
      this.subscription = this.websocketService.createObserverableSocket("ws://localhost:8085", this.product.id).subscribe(products => {
        let product = products.find(p => p.productId === this.product.id);
        this.currentPrice = product.bid;
      });
    }
  }

}
