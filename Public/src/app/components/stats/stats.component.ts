import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [ChartModule, CardModule ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit  {
    pieData: any;
    pieOptions: any;

    barData: any;
    barOptions: any;

    lineData: any;
    lineOptions: any;


  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);

    // Kördiagram (pie)
    this.pieData = {
      labels: ['Kategória A', 'Kategória B', 'Kategória C'],
      datasets: [
        {
          data: [
            Math.floor(Math.random() * 500 + 100),
            Math.floor(Math.random() * 500 + 100),
            Math.floor(Math.random() * 500 + 100)
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--orange-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--orange-400')
          ]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: documentStyle.getPropertyValue('--text-color')
          }
        }
      }
    };

    // Oszlopdiagram (bar)
    this.barData = {
      labels: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
      datasets: [
        {
          label: 'Látogatók',
          backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
          data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100 + 1))
        }
      ]
    };

    this.barOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: documentStyle.getPropertyValue('--text-color')
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: documentStyle.getPropertyValue('--text-color-secondary')
          },
          grid: {
            color: documentStyle.getPropertyValue('--surface-border')
          }
        },
        y: {
          ticks: {
            color: documentStyle.getPropertyValue('--text-color-secondary')
          },
          grid: {
            color: documentStyle.getPropertyValue('--surface-border')
          }
        }
      }
    };

    // Vonaldiagram (line)
this.lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Felhasználók',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--purple-500'),
        tension: 0.4,
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100 + 1))
      }
    ]
  };
  
  this.lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: documentStyle.getPropertyValue('--text-color')
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: documentStyle.getPropertyValue('--text-color-secondary')
        },
        grid: {
          color: documentStyle.getPropertyValue('--surface-border')
        }
      },
      y: {
        ticks: {
          color: documentStyle.getPropertyValue('--text-color-secondary')
        },
        grid: {
          color: documentStyle.getPropertyValue('--surface-border')
        }
      }
    }
  };
  
  }


}
