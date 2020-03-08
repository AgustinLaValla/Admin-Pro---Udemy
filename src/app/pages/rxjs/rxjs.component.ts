import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private contardorSubs$ = new Subscription();

  constructor() {
    this.contardorSubs$ = this.regresaObservable().pipe(
        /*retry(3))*/
        )
        .subscribe(numero => console.log(numero),
                   error => console.log(error),
                   () => console.log('El observador terminó'));
   }

  ngOnInit() { }

  regresaObservable():Observable<{valor:number}> { 
    return new Observable((observer:Subscriber<any>) => {
        let contador:number = 0;
        let interval = setInterval(() => {

          contador += 1;

          let salida = {
            valor:contador
          };

          observer.next( salida );

          // if(contador === 3) { 
          //   clearInterval(interval);
          //   observer.complete();
          // }
          // if(contador == 2) {
            // clearInterval(interval);
          //   observer.error('AUXILIO!')
          // }
        },1000)
      }).pipe(
        map((salida) => salida.valor), 
        filter((valor) => valor % 2 == 0 )
      );
    }    

    ngOnDestroy(): void {
      console.log('El contador se va a terminar');
      this.contardorSubs$.unsubscribe();
    }
}