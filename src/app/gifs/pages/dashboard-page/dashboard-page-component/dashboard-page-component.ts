import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../../componets/side-menu-header/side-menu-component/side-menu-component';

@Component({
  selector: 'app-dashboard-page-component',
  imports: [
    RouterOutlet, SideMenuComponent
  ],
  templateUrl: './dashboard-page-component.html',
  styleUrl: './dashboard-page-component.css'
})
export default class DashboardPageComponent {

}
