import { Component, OnInit } from '@angular/core';
import { observable, Observable, Observer } from 'rxjs';
import { CustomObserver } from './custome.observer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  custOb!: CustomObserver;
  ngOnInit(): void {
    this.firstExample();
  }

  title = 'ObservableTutuorial';


  private firstExample() {
    this.custOb = new CustomObserver();
    console.debug("Right before subscribe");
    this.observable.subscribe(this.custOb);
    console.debug("after subscribe");
  }

  // create an observable with constructor 

  methodExecutedWhenSubscribeMethodInvoked_CalledSubscriberMethod(observer: Observer<string>) {
    observer.next('Luong');
    var num = Math.random();
    console.debug('Math.random() = ' + num)
    console.debug(num > 0.5 ? 'Error' : 'No Error')
    if (num > 0.5) {
      observer.error('Exception happen');
    }
    observer.next('Luong second');
    observer.complete(); // will stop publish any event.
    observer.next('luong final');
  }

  observable = new Observable(this.methodExecutedWhenSubscribeMethodInvoked_CalledSubscriberMethod);


  /**
   * Another example 
   */
  sequenceSubscriber(observer: Observer<number>) {
    const seq = [1, 2, 3];
    let timeoutId: any;

    // Will run through an array of numbers, emitting one value
    // per second until it gets to the end of the array.
    function doInSequence(arr: number[], idx: number) {
      timeoutId = setTimeout(() => {
        observer.next(arr[idx]);
        if (idx === arr.length - 1) {
          observer.complete();
        } else {
          doInSequence(arr, ++idx);
        }
      }, 1000);
    }

    doInSequence(seq, 0);

    // Unsubscribe should clear the timeout to stop execution
    return {
      unsubscribe() {
        clearTimeout(timeoutId);
      }
    };
  }

  secondExample() {

    // Create a new Observable that will deliver the above sequence
    const sequence = new Observable(this.sequenceSubscriber /* this is a subscriber method */);

    sequence.subscribe(
      // this is an observer
      {
      next(num) { console.debug(num); },
      complete() { console.debug('Finished sequence'); }
    }
    );
    // Logs:
    // (at 1 second): 1
    // (at 2 seconds): 2
    // (at 3 seconds): 3
    // (at 3 seconds): Finished sequence

  }

}
