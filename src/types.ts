export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type StoreType = "state" | "getter" | "action"

export type Base = {
    $storeID:       string
    $baseState:     {}
    $baseGetter:    {}
    $baseAction:    {}
    overrideAction(): {}
    baseProperty<Type>(type: StoreType, value: Type): Record<string, unknown>
    addStoreProperty(type: StoreType, keyOrObject: string | Object, value?: Function | any): void
    generateStore(): void
}

export type States<T>     = {
    [K in keyof T]: T[K]
} & {}

export type Getters<T, S>     = {
    [K in keyof T]: (state: S) => T[K]
} & {}

export type Actions<T>     = {
    [K in keyof T]: (...args: any[]) => void
} & {}