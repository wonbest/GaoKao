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

    private columns = [
        {
            title: '学校名称',
            dataIndex: 'schoolname'
        },
        {
            title: '院校类型',
            dataIndex: 'schoolproperty'
        },
        {
            title: '所在省份',
            dataIndex: 'province'
        },
        {
            title: '学历层次',
            dataIndex: 'schooltype'
        }
    ]

    fetchSchoolInfo = (params = {}) => {
        $.ajax({
            url: 'getSchoolList',
            data: {
                ...params,
            },
            type: 'post',
            success: (data) => {
                this.setState({
                    dataSource: data.result,
                    loading: false
                })
            }
        })
    }

    componentDidMount() {
        this.fetchSchoolInfo(this.state.pagination)
    }

    render() {
        return (
            <Table
                columns={this.columns}
                loading={this.state.loading}
                rowKey={record => record.schoolid}
                dataSource={this.state.dataSource}
                style={{marginTop: '10px 0px 0px 0px'}} />
        )
    }
}