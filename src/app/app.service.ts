import { Injectable } from '@angular/core';

import metadataJson from '../assets/metadata.json';

export type InteralStateType = {
    [key: string]: any
};

@Injectable()
export class AppState {

    // tslint:disable-next-line: variable-name
    private _state: InteralStateType = {};

    constructor() {
        this.set('lastUpdate', metadataJson.timestamp);
    }

    // already return a clone of the current state
    get state(): InteralStateType {
        return this._state = this.clone(this._state);
    }
    // never allow mutation
    set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }

    get(prop?: any): boolean {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    set(prop: string, value: any): void {
        // internally mutate our state
        this._state[prop] = value;
    }

    private clone(object: InteralStateType): InteralStateType {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    }
}
