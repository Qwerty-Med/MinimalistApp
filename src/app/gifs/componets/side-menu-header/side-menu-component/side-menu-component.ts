import { Component } from '@angular/core';
import { GifsSideMenuComponent } from '../../gif-side-menu-header/gifs-side-menu-component/gifs-side-menu-component';
import { GifsSideMenuOptionsComponent } from '../../gif-side-menu-options/gifs-side-menu-options-component/gifs-side-menu-options-component';

@Component({
  selector: 'side-menu-component',
  imports: [
    GifsSideMenuComponent, GifsSideMenuOptionsComponent
  ],
  templateUrl: './side-menu-component.html',
  styleUrl: './side-menu-component.css'
})
export class SideMenuComponent {

}
