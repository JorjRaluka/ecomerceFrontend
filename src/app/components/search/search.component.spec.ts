import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should have a search input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputElement = compiled.querySelector('input');
    expect(inputElement).toBeTruthy();
  });
});
