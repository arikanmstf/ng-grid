import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isHttpLoading$ = new ReplaySubject<boolean>(1);

  httpProgress(): Observable<boolean> {
    return this.isHttpLoading$.asObservable();
  }

  setHttpProgressStatus(isInProgress: boolean) {
    this.isHttpLoading$.next(isInProgress);
  }
}
