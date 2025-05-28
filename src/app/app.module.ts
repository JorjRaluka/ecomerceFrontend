import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ViewCartChartComponent } from './components/view-cart-chart/view-cart-chart.component';
import { ViewChartComponent } from './components/view-chart/view-chart.component';
import { AveragePriceComponent } from './components/average-price/average-price.component';
import { StatusIndicatorComponent } from './components/status-indicator/status-indicator.component';

import { ProductService } from './services/product.service';
import { AuthService } from './services/auth-service.service';
import { RegisterComponent } from './components/register/register.component';
import { AdminControlsComponent } from './components/admin-controls/admin-controls.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HelpComponent } from './components/help/help.component';

import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'help',component:HelpComponent},
  {path:'register',component:RegisterComponent},
  { path: 'average-price', component: AveragePriceComponent },
  { path: 'cart-chart', component: ViewCartChartComponent },
  { path: 'chart', component: ViewChartComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'members', component: MembersPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    ViewChartComponent,
    ViewCartChartComponent,
    AveragePriceComponent,
    StatusIndicatorComponent,
    RegisterComponent,
    AdminControlsComponent,
    AboutComponent,
    ContactComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  providers: [
    ProductService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
