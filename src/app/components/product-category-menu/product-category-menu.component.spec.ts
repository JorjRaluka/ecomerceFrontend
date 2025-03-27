import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCategoryMenuComponent } from './product-category-menu.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { ProductCategory } from '../../common/product-category';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// @ts-ignore
import assert from 'assert';
import * as sinon from 'sinon';

describe('ProductCategoryMenuComponent', () => {
  let component: ProductCategoryMenuComponent;
  let fixture: ComponentFixture<ProductCategoryMenuComponent>;
  let productService: ProductService;

  const mockCategories: ProductCategory[] = [
    { id: 1, categoryName: 'Electronics' },
    { id: 2, categoryName: 'Books' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductCategoryMenuComponent],
      providers: [ProductService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryMenuComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    assert.ok(component);
  });

  it('should fetch product categories on init', () => {
    sinon.stub(productService, 'getProductCategories').returns(of(mockCategories));

    component.ngOnInit();
    fixture.detectChanges();

    assert.strictEqual(component.productCategories.length, 2);
    assert.deepStrictEqual(component.productCategories, mockCategories);
  });
});
