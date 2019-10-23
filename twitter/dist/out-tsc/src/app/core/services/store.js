import { BehaviorSubject } from 'rxjs';
export class Store {
    constructor(initialState) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable();
        this.stateBehavior$ = this._state$;
    }
    get state() {
        return this._state$.getValue();
    }
    setState(nextState) {
        this._state$.next(nextState);
    }
}
//# sourceMappingURL=store.js.map