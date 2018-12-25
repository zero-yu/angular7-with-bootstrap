import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProductSearchParams } from 'src/app/class/event_agrs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  formModel: FormGroup;

  categroies: string[];

  constructor(private fb: FormBuilder, private productService: ProductService) {

  }

  ngOnInit() {
    this.formModel = this.fb.group({
      "title": ["", Validators.minLength(3)],
      "price": [null, this.positivePriceValidator],
      "categroy": ["-1"]
    });
    this.categroies = this.productService.getAllCategroyProduct();
  }

  positivePriceValidator(control: FormControl): any {
    let value = control.value
    if (!value) {
      return null;
    }
    let price = parseInt(value);

    if (price > 0) {
      return null;
    } else {
      return { positiveNumber: true }
    }
  }

  onSubmit(): void {
    if (this.formModel.valid) {
      this.productService.searchEvent.emit(new ProductSearchParams(this.formModel.get("title").value, this.formModel.get("price").value, this.formModel.get("categroy").value));
    }
  }

}
