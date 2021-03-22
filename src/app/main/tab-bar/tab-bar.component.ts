import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'data-view' },
    { label: 'Visualizations', icon: 'pi pi-chart-bar', routerLink: 'visualizations' },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
