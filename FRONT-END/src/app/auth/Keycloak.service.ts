import { Injectable } from '@angular/core';
import { keycloakConfig } from './keycloak-config';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  keycloak!: Keycloak.KeycloakInstance;

  init(): Promise<any> {
    this.keycloak = new Keycloak(keycloakConfig);
    return new Promise((resolve, reject) => {
      this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      })
      .then((authenticated) => {
        resolve(authenticated);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  getToken(): string {
    return this.keycloak.token as string;
  }
}
