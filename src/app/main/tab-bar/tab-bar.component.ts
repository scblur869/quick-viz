import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Single Data View', icon: 'pi pi-fw pi-image', routerLink: 'single-data-view' },
    { label: 'About', icon: 'pi pi-info-circle', routerLink: 'about' },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
