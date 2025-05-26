import {Component, HostListener} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  constructor(private http: HttpClient) {}

  generateFakeProducts() {
    this.http.post('http://localhost:8080/api/dev/generate', {})
      .subscribe({
        next: () => alert('✅ 100K fake products generated.'),
        error: () => alert('❌ Failed to generate fake products.')
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  deleteFakeProducts(event: any) {
    navigator.sendBeacon('http://localhost:8080/api/products/delete-temp');
  }
}
