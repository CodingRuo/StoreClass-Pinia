export default class BaseStore {

    $storeID: string

    constructor(storeId: string = "STORE-NAME") {
        this.$storeID = storeId
    }

    test(){
        console.log('hy!')
    }
}