import { observable, action, computed } from 'mobx'

class Store {
    @observable count

    constructor() {
        this.count = 1
    }

}

export default new Store()