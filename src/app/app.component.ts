import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    of(2, 4, 6, 8).subscribe((x) => console.log(x));

    from([10, 15, 20, 51])
      .pipe(
        tap((item) => console.log(`emitted item .... ${item}`)),
        map((item) => item * 2),
        map((item) => item - 10)
      )
      .subscribe(
        (item) => console.log(`resulting items ${item}`),
        (err) => console.log(`error occured ${err}`),
        () => console.log('complete')
      );

    of('Apple1', 'Apple2', 'Apple3').subscribe(
      (apple) => console.log(`Apple was emitted ${apple}`),
      (err) => console.log(`Error occured: ${err}`),
      () => console.log('No more apple, go home')
    );

    const observer = {
      next: (apple) => console.log(`Apple was emitted ${apple}`),
      error: (err) => console.log(`Error occured : ${err}`),
      complete: () => console.log(`No more apples, go home`),
    };

    const appleStream = new Observable((appleObserver) => {
      appleObserver.next('App1');
      appleObserver.next('App2');
      appleObserver.complete();
    });
    const sub = appleStream.subscribe(
      (apple) => console.log(`Emitted: ${apple}`),
      (err) => console.log(`Error: ${err}`),
      () => console.log(`No more apples, go home`)
    );

    sub.unsubscribe();

    of(2, 4, 6)
      .pipe(
        map((item) => item * 2),
        map((item) => item - 3),
        tap((item) => console.log(item)),
        take(2)
      )
      .subscribe();
  }
  name = 'Angular';
}
