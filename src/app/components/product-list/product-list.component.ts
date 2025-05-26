import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../common/product";
import { CartItem } from "../../common/cart-item";
import { CartService } from "../../services/cart.service";
import { ActivatedRoute } from "@angular/router";
import {faker} from "@faker-js/faker";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  autoAddInterval: any = null;

  // Props for pagination
  thePageNumber: number = 1;
  thePageSize: number = 1000;
  theTotalElements: number = 0;
  previousKeyword: string = "";

  isLoading: boolean = false; // Loading state to show loading spinner

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

    // Listen for scroll events
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1; // Default to category ID 1
    }

    if (this.previousCategoryId !== this.currentCategoryId) {
      this.thePageNumber = 1;
      this.products = [];  // Reset products when category changes
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
      .subscribe(this.processResult());
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
      this.products = [];  // Reset products when keyword changes
    }
    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword)
      .subscribe(this.processResult());
  }
  // addFakeProduct() {
  //
  //   // @ts-ignore
  //   const fakeProduct: Product = {
  //     // @ts-ignore
  //     id: faker.number.int({ min: 1000, max: 9999 }),
  //     name: faker.commerce.productName(),
  //     category: faker.commerce.department(),
  //     price: parseFloat(faker.commerce.price()),
  //   };
  //
  //   this.products.push(fakeProduct);
  //   console.log('Added product:', fakeProduct);
  //   this.productService.notifyProductUpdate();
  // }

  // startAutoAdding() {
  //   if (!this.autoAddInterval) {
  //     this.autoAddInterval = setInterval(() => this.addFakeProduct(), 2000); // Add every 2 seconds
  //   }
  // }
  //
  // stopAutoAdding() {
  //   if (this.autoAddInterval) {
  //     clearInterval(this.autoAddInterval);
  //     this.autoAddInterval = null;
  //   }
  // }
  processResult() {
    return (data: any) => {
      this.products = [...this.products, ...data._embedded.products];
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      this.isLoading = false;  // Reset the loading flag after products are loaded
    };
  }

  // New function to load more products when scrolling
  loadMoreProducts() {
    if (!this.isLoading && (this.thePageNumber * this.thePageSize) < this.theTotalElements) {
      this.isLoading = true; // Set the flag to prevent multiple requests
      this.productService.getProductListPaginate(this.thePageNumber, this.thePageSize, this.currentCategoryId)
        .subscribe(data => {
          this.products.push(...data._embedded.products);
          this.thePageNumber++;
        });
    }
  }

  // Scroll listener
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= documentHeight - 50) { // 50px before reaching the bottom
      this.loadMoreProducts();
    }
  }

  addToCart(theProduct: Product) {
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
