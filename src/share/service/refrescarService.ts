import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RefrescarService {
    private behaviorSubject =new BehaviorSubject<number>(0)
    refrescar$ = this.behaviorSubject.asObservable()
    triggerRefrescar(){
        this.behaviorSubject.next(this.behaviorSubject.value + 1)
    }
}