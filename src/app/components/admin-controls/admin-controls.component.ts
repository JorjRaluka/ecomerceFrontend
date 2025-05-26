import {Component, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-controls',
  templateUrl: './admin-controls.component.html',
  styleUrls: ['./admin-controls.component.css']
})
export class AdminControlsComponent {

  message = '';

  constructor(private http: HttpClient) {}

  generateProducts() {
    this.message = 'Generating...';
    this.http.post('http://localhost:8080/api/dev/seed-products', {}, { responseType: 'text' })
      .subscribe({
        next: msg => this.message = msg,
        error: err => this.message = 'Failed to generate products.'
      });
  }


  // deleteProducts() {
  //   this.message = 'Deleting...';
  //   this.http.delete('http://localhost:8080/api/dev/delete-products', { responseType: 'text' })
  //     .subscribe({
  //       next: msg => this.message = msg,
  //       error: err => this.message = 'Failed to delete products.'
  //     });
  // }
}
