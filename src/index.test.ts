import BaseStore from "./baseStoreClass";
import { beforeEach, describe, expect, it } from "vitest";

describe("Base", () => {
    let base: BaseStore<{},{},{}>

    beforeEach(() => {
        base = new BaseStore()
    })

    it("sollte mit den korrekten Standardwerten initialisiert werden", () => {
        expect(base.$storeID).to.equal('STORE-NAME')
    })
})
