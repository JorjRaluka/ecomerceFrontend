import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragePriceComponent } from './average-price.component';

describe('AveragePriceComponent', () => {
  let component: AveragePriceComponent;
  let fixture: ComponentFixture<AveragePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AveragePriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AveragePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
