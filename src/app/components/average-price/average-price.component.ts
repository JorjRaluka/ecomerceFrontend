import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-average-price',
  templateUrl: './average-price.component.html',
  styleUrls: ['./average-price.component.css']
})
export class AveragePriceComponent implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(){
    const categoryAvg=await this.productService.getAveragePricePerCategory()
    const labels=categoryAvg.map(item=>item.categoryName);
    const data=categoryAvg.map(item=>item.avgPrice);
    this.renderLineChart(labels,data)
  }
  renderLineChart(labels: string[], data: number[]) {
    const ctx = this.doughnutCanvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Price per Category',
          data: data,
          borderColor: '#2a9e9f',
          backgroundColor: this.generateColors(data.length),
          borderWidth: 2,

        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,

            }
          },
          x: {
            title: {
              display: true,

            }
          }
        }
      }
    });
  }
  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor(Math.random() * 360);
      colors.push(`hsl(${hue}, 70%, 60%,0.18)`);
    }
    return colors;
  }


}
