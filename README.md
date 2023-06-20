# Pinia Store TS Class

Mit der Klasse wird ein vollständiger Piniastore erstellt. Er enthält, states, getters und actions. 

Im folgenden Code sieht man den Aufruf bzw weitervererbung der Klasse.
Durch die generischen Types werden auch zukünftige Types weiterverbt und sind durch den Linter dann auch zugänglich. 



```ts

import { BaseStore } from '@codingruo/pinia-store-base-class';

type State = {
    _data: any[],
    _active: boolean
}

type Getters = {}

type Actions = {
    test: () => void
}

export class Factory extends BaseStore<State, Getters, Actions> {
    constructor() {
        super();

        this.baseProperty<State>("state", {
            _data: [],
            _active: false
        })
        
        
    }
}

```