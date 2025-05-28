import {Component, HostListener} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.prod";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  constructor(private http: HttpClient) {}

  generateFakeProducts() {
    this.http.post(`${environment.luv2shopApiUrl}/dev/geneerate`, {})
      .subscribe({
        next: () => alert('✅ 100K fake products generated.'),
        error: () => alert('❌ Failed to generate fake products.')
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  deleteFakeProducts(event: any) {
    navigator.sendBeacon(`${environment.luv2shopApiUrl}/products/delete-temp`);
  }
}
