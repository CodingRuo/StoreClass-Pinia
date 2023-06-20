import { defineStore } from "pinia";
import { Actions, Base, Getters, States, StoreType } from "./types";

export class BaseStore<TState extends States<TState>, TGetters extends Getters<TGetters, TState>, TActions extends Actions<TActions>> implements Base {

    $storeID:       string
    $baseState:     TState
    $baseGetter:    TGetters
    $baseAction:    TActions

    constructor(storeId: string = "STORE-NAME") {
        this.$storeID       = storeId
        this.$baseState     = {} as TState
        this.$baseGetter    = {} as TGetters
        this.$baseAction    = { ...this.overrideAction() } as TActions
    }

    overrideAction(): TActions{
        return {} as TActions
    }

    
    baseProperty<Type>(type: StoreType, value: Type ) {

        this.checkType(type)

        const baseProperties: { [key in StoreType]: any } = {
            state:  this.$baseState,
            getter: this.$baseGetter,
            action: this.$baseAction,
        };

        const property = baseProperties[type];

        Object.assign(property, value);
        return property;
    }

    addStoreProperty(type: StoreType, keyOrObject: string | Object, value?: Function | any) {

        this.checkType(type)

        const storeProperties: { [key in StoreType]: any } = {
            state:  this.$baseState,
            getter: this.$baseGetter,
            action: this.$baseAction,
        };

        const propertyToUpdate = storeProperties[type];

        if (typeof keyOrObject === 'object') {
            for (const [key, value] of Object.entries(keyOrObject)) {
                if ((type === 'action' || type === 'getter') && typeof value !== 'function') {
                    throw new Error(`Provided ${type} for ${key} must be a function`);
                }
                propertyToUpdate[key] = value;
            }
        } else {
            if ((type === 'action' || type === 'getter') && typeof value !== 'function') {
                throw new Error(`Provided ${type} must be a function`);
            }
            propertyToUpdate[keyOrObject] = value;
        }
    }

    private checkType(type: StoreType): void {
        if (!['state', 'getter', 'action'].includes(type)) {
            throw new Error(`Invalid type ${type}`);
        }
    }

    generateStore(){

        const state:    TState      = { ...this.$baseState }
        const getter:   TGetters    = { ...this.$baseGetter }
        const action:   TActions    = { ...this.$baseAction }

        return defineStore({
            id: this.$storeID,
            state: () => state,
            getters: getter,
            actions: action
        })();
    }

}