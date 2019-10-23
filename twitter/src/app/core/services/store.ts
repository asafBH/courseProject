import {Observable, BehaviorSubject} from 'rxjs';

export class Store<T> {
    state$: Observable<T>;
    stateBehavior$: BehaviorSubject<T>;
    // tslint:disable-next-line:variable-name
    private _state$: BehaviorSubject<T>;

    protected constructor(initialState: T) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable();
        this.stateBehavior$ = this._state$;
    }

    get state(): T {
        return this._state$.getValue();
    }

    setState(nextState: T): void {
        this._state$.next(nextState);
    }
}