export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type StoreType = "state" | "getter" | "action" | "fahrtplanung" | "gridaction" | "gridgetter" | "gridstate" | "socketaction"

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

export type Getters<T, K extends keyof T = keyof T>     = {
    [Key in K]: (state: T) => T[Key]
}

export type Actions<T>     = {
    [K in keyof T]: (...args: any[]) => void
} & {}