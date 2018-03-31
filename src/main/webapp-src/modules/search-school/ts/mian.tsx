import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Table } from 'antd'

interface SearchSchoolStates {
    dataSource: any[]
}
class SearchSchool extends React.Component<any, SearchSchoolStates> {
    state: SearchSchoolStates = {
        dataSource: []
    }
    
    render() {
        return (
            <Table
            rowKey={record => record.id}
            dataSource={this.state.dataSource} />
        )
    }
}