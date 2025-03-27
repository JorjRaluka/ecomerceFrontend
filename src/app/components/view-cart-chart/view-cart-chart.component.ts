import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import Chart from "chart.js/auto";
import {CartService} from "../../services/cart.service";
@Component({
  selector: 'app-view-cart-chart',
  templateUrl: './view-cart-chart.component.html',
  styleUrls: ['./view-cart-chart.component.css']
})
export class ViewCartChartComponent implements OnInit {

  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    const categoryCounts =  await this.cartService.getProductCountsPerCategoryCart();


    const labels = categoryCounts.map(item => item.categoryName);
    const data = categoryCounts.map(item => item.count);

    this.renderChart(labels, data);
  }

  renderChart(labels: string[], data: number[]) {
    const ctx = this.doughnutCanvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.generateColors(data.length),
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor(Math.random() * 360);
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  }


}
