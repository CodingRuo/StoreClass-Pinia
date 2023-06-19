import { defineStore } from "pinia";

type StoreTypes = 'action' | 'getter' | 'state'

export default class BaseStore {

    $storeID: string
    $baseState:     {}
    $baseGetter:    {}
    $baseAction:    {}

    constructor(storeId: string = "STORE-NAME") {
        this.$storeID       = storeId
        this.$baseState     = {}
        this.$baseGetter    = {}
        this.$baseAction    = {}
    }

    baseProperty<Type>(type: StoreTypes, value: Type ) {

        this.checkType(type)

        const baseProperties: { [key in StoreTypes]: any } = {
            state:  this.$baseState,
            getter: this.$baseGetter,
            action: this.$baseAction,
        };

        const property = baseProperties[type];

        Object.assign(property, value);
        return property;
    }

    addStoreProperty(type: StoreTypes, keyOrObject: string | Object, value?: Function | any) {

        this.checkType(type)

        const storeProperties: { [key in StoreTypes]: any } = {
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

    private checkType(type: StoreTypes): void {
        if (!['state', 'getter', 'action'].includes(type)) {
            throw new Error(`Invalid type ${type}`);
        }
    }

    generateStore(){

        const state     = { ...this.$baseState }
        const getter    = { ...this.$baseGetter }
        const action    = { ...this.$baseAction }

        return defineStore({
            id: this.$storeID,
            state: () => state,
            getters: getter,
            actions: action
        })();
    }
    
}