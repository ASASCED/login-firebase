import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDlO-w846u-Z6KReHXrSmkDQuVqw7uLaeY';
  userToken: string;

  // Crear nuevo usuario
  // signUp?key=[API_KEY]

  // Login
  // signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {}

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
      .pipe(
        map(resp => {
          const idToken = 'idToken';

          console.log('Entro en el mapa del RXJS');

          this.guardarToken(resp[idToken]);
          return resp;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}signUp?key=${this.apiKey}`, authData)
      .pipe(
        map(resp => {
          const idToken = 'idToken';

          console.log('Entro en el mapa del RXJS');

          this.guardarToken(resp[idToken]);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(): string {
    localStorage.getItem('token')
      ? (this.userToken = localStorage.getItem('token'))
      : (this.userToken = '');

    return this.userToken;
  }
}
