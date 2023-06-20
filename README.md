# Pinia Store TS Class

Mit der Klasse wird ein vollständiger Piniastore erstellt. Er enthält, states, getters und actions. 

Im folgenden Code sieht man den Aufruf bzw weitervererbung der Klasse.
Durch die generischen Types werden auch zukünftige Types weiterverbt und sind durch den Linter dann auch zugänglich. 



```ts

import { BaseStore } from '@codingruo/pinia-store-base-class';

export type State = {
    _data: any[],
    _active: boolean
}

export type Getters<T extends State> = {
    data: (state: T) => T["_data"]
}

export type Actions = {
    test: () => void
}

export class Factory extends BaseStore<State, Getters<State>, Actions> {
    constructor() {
        super();

        this.baseProperty<State>("state", {
            _data: [],
            _active: false
        })

        this.baseProperty("getter", {
            data: (state: State) => state._data
        })

        this.baseProperty("action", {
            test(){
                console.log('Klasse')
            }
        })
    }

    overrideAction(): Actions {
        return {
            ...super.overrideAction(),
            test: function (options: { logic?: (instance: any) => void } = {}) {

                const result = {id: 1, name: "test"}

                if (options.logic){
                    options.logic.call(this, result)
                }

                console.log('Klasse Override');
            }
        }
    }
}

```

Die Funktion baseProperty kann 1 der 3 Types entgegennehmen. "state", "getter", "action".
Diese Funktion sollte Grundsätzlich dann aufgerufen werden denn alles Stores sich gewisse Daten teilen sollen.

Um eine Funktion vollständig zu überschreiben und eine CustomLogic einzufügen, wird die overrideAction funktion in der Klasse aufgerufen.
Dies ermöglicht ein Erzeugen eigener Bedingungen im Store.

Folgender Code zeigt die Instanziierung der Klasse und überschreiben des test Funktion.

```ts

import { Factory } from "@/stores/Factory";

export function useCounterStore() {
  const factory = new Factory()

  factory.addStoreProperty("state", {
    _active: false,
  })

  factory.addStoreProperty("getter", {
    active: (state: any) => state._active
  })

  factory.addStoreProperty("action", {
    test(){
      // @ts-ignore
      return factory.overrideAction().test.call(this, {
        logic: function (result: any) {
          if(result){
            // @ts-ignore
            this._data = [result]
          }
        }
      })
    }
  })

  return factory.generateStore()
}

```

Und am Ende natürlich dann in der Vue Datei auch die Funktion nutzen.

```ts
import {useCounterStore} from "@/stores/counter";
import {storeToRefs} from "pinia";

const counterStore = useCounterStore()
const { data } = storeToRefs(counterStore)

counterStore.test()

```