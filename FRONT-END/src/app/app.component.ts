import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "./auth/Keycloak.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FRONT-END';

  constructor(private keycloakService: KeycloakService) {}


  ngOnInit(): void {

    this.keycloakService.init().then((authenticated) => {
      if (authenticated) {
        // If authenticated, perform actions such as navigating to a protected page
        console.log("User is authenticated");
        // Redirect the user to the dashboard or the desired route
        // this.router.navigate(['/dashboard']);
      } else {
        // If not authenticated, redirect to Keycloak for login
        this.keycloakService.keycloak.login();
      }
    }).catch((error) => {
      // Handle authentication failure
      console.error("Authentication error:", error);
    });
  }

  logout(): void {
    this.keycloakService.keycloak.logout();
  }

}

