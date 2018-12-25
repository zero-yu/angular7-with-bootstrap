import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductComponent } from './components/product/product.component';
import { StartComponent } from './components/start/start.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe'
const routeConfig:Routes=[
  {path:'',component:HomeComponent},
  {path:'product/:productID',component:ProductdetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StartComponent,
    ProductdetailComponent,
    HomeComponent,
    FilterPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routeConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
