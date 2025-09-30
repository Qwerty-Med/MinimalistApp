import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenuComponent } from '../../../componets/gif-side-menu-header/gifs-side-menu-component/gifs-side-menu-component';
import { GifsSideMenuOptionsComponent } from '../../../componets/gif-side-menu-options/gifs-side-menu-options-component/gifs-side-menu-options-component';

@Component({
  selector: 'app-dashboard-page-component',
  imports: [
    RouterOutlet, GifsSideMenuComponent, GifsSideMenuOptionsComponent
  ],
  templateUrl: './dashboard-page-component.html',
  styleUrl: './dashboard-page-component.css'
})
export default class DashboardPageComponent {

}
