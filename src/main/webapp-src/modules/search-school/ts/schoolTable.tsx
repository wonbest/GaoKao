import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Table } from 'antd'

interface SchoolTableStates {
    dataSource: any[]
    pagination: {}
    loading: boolean
}
export default class SchoolTable extends React.Component<any, SchoolTableStates> {
    state: SchoolTableStates = {
        dataSource: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 100
        },
        loading: true
    }

    fetchSchoolInfo = (params = {}) => {

    }

    componentDidMount() {
        this.fetchSchoolInfo(this.state.pagination)
    }

    render() {
        return (
            <Table
                loading={this.state.loading}
                rowKey={record => record.id}
                dataSource={this.state.dataSource}
                pagination={this.state.pagination} />
        )
    }
}