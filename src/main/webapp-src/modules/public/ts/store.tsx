import { observable, action, computed } from 'mobx'

class Store {
    @observable schoolProvince
    @observable schoolType
    @observable schoolProperty
    @observable schoolSpecialProps
    // @observable schoolList
    @observable count

    constructor() {
        this.schoolProvince = observable([])
        this.schoolType = observable([])
        this.schoolProperty = observable([])
        this.schoolSpecialProps = observable([])
        this.count = 1
    }

    // fetchSchoolList = (params = {}) => {
    //     $.ajax({
    //         url: 'getSchoolList',
    //         data: {
    //             ...params,
    //         },
    //         type: 'post',
    //         success: (data) => {
    //             const pagination = { ...this.state.pagination }
    //             pagination.total = data.total
    //             this.setState({
    //                 dataSource: data.rows,
    //                 pagination,
    //                 loading: false,
    //             })
    //         }
    //     })
    // }
}

export default new Store()