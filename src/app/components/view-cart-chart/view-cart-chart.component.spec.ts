import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartChartComponent } from './view-cart-chart.component';

describe('ViewCartChartComponent', () => {
  let component: ViewCartChartComponent;
  let fixture: ComponentFixture<ViewCartChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCartChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCartChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
