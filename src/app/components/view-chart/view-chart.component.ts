import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-view-chart',
  templateUrl: './view-chart.component.html',
  styleUrls: ['./view-chart.component.css']
})
export class ViewChartComponent implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    const categoryCounts = await this.productService.getProductCountsPerCategory();

    const labels = categoryCounts.map(item => item.categoryName);
    const data = categoryCounts.map(item => item.count);

    this.renderChart(labels, data);
  }

  renderChart(labels: string[], data: number[]) {
    const ctx = this.doughnutCanvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
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
