import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

//This Guard is use to protect routes considering the user token and to renovate token if is necessary

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(private usuarioService: UsuariosService, private router: Router) { }
  canActivate(): Promise<boolean> | boolean {

    const token = this.usuarioService.token; //Get User Token
    let payload = JSON.parse(atob(token.split('.')[1])); //Decoded the token (base-64 encoded string)

    let expired = this.expired(payload.exp); //Get token expiration date and examine whether it has expired

    if (expired) {
      this.router.navigate(['/login']);
      return false; //If the token has already expired, return false and lock the route
    };

    return this.tokenRenovateVerification(payload.exp); //Contrary, renew token

  };

  expired(expDate: number) {
    const currentDate = new Date().getTime() / 1000; //Get current time in Miliseconds and Parse it to Seconds
    console.log(new Date(expDate * 1000), new Date(currentDate * 1000));
    if (expDate < currentDate) { //Comparison beetwen token expiration date and current time (Seconds)
      return true
    } else {
      false;
    };
  };

  tokenRenovateVerification(expDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const tokenExp = new Date(expDate * 1000); //Get token expiration date in Seconds and Parse it to Miliseconds
      const currentTime = new Date(); //Get Current Time

      currentTime.setTime(currentTime.getTime() + (4 * 60 * 60 * 1000)); //Set Current time and increase it by four hours

      if (tokenExp.getTime() > currentTime.getTime()) { //If token is about to expire

        resolve(true);

      } else {
        this.usuarioService.renuevaToken().subscribe(() => { //Renew token
          resolve(true);
        }, error => reject(false));
      };

    });
  };

};
