import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  private canEditSubject = new BehaviorSubject<boolean>(false);
  canEdit$ = this.canEditSubject.asObservable();

  setCanEdit(value: boolean): void {
    this.canEditSubject.next(value);
  }
}
