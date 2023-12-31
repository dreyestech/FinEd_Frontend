import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated?: boolean;

  constructor(private authService: AuthService) { }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      res => this.isAuthenticated = res
    )
  }

}
