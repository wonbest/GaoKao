import * as React from 'react'
import * as ReactDom from 'react-dom'

import { observer } from 'mobx-react'

import { Table } from 'antd'

interface SchoolTableProps {
    store: any
}
interface SchoolTableStates {
    dataSource: any[]
    pagination: any
    loading: boolean
}
@observer
export default class SchoolTable extends React.Component<SchoolTableProps, SchoolTableStates> {
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
            dataIndex: '',
            render: text => <a href={text.guanwang} target="blank" >{text.schoolname}</a>
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

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize
        this.setState({
            pagination: pager,
        })
        this.fetchSchoolInfo({
            rowCount: pagination.pageSize,
            current: pagination.current,
        })
    }

    fetchSchoolInfo = (params = {}) => {
        this.setState({
            loading: true
        })
        $.ajax({
            url: 'getSchoolList',
            data: {
                ...params,
            },
            type: 'post',
            success: (data) => {
                const pagination = { ...this.state.pagination }
                pagination.total = data.total
                this.setState({
                    dataSource: data.rows,
                    pagination,
                    loading: false,
                })
            }
        })
    }

    componentDidMount() {
        this.fetchSchoolInfo({
            rowCount: this.state.pagination.pageSize,
            current: this.state.pagination.current,
            schoolType: this.props.store.schoolType.slice(),
            province: this.props.store.schoolProvince.slice(),
            schoolProperty: this.props.store.schoolProperty.slice(),
            specialProps: this.props.store.schoolSpecialProps.slice(),
        })
    }

    render() {
        return (
            <Table
                columns={this.columns}
                loading={this.state.loading}
                rowKey={record => record.schoolid}
                dataSource={this.state.dataSource}
                onChange={this.handleTableChange}
                pagination={this.state.pagination}
                style={{ margin: '10px 0px 0px 0px' }} />
        )
    }
}