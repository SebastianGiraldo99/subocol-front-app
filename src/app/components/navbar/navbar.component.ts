import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor() { }
  ngOnInit(): void {

  }
  logout() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      localStorage.removeItem('userSession');
      window.location.reload();
    }
  }

  goHome() {
    throw new Error('Method not implemented.');
    }

}
