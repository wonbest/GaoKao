import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Card } from 'antd'
import { Button } from 'antd'
import { Table } from 'antd'

import Toobal from './toolbar'
import StudentInfo from './studentInfo'

interface WishProps {

}
interface WishStates {
    dataSource: any[]
    pagination: any
    loading: boolean
}
export default class Wish extends React.Component<WishProps, WishStates> {

    private columns: any[]

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            loading: false,
            pagination: {
                current: 1,
                total: 100,
                pageSize: 10
            }
        }
        this.columns = [
            { title: '学校名称', dataIndex: 'schoolname', width: '12%' },
            { title: '招生地区', dataIndex: 'localprovince', width: '13%' },
            { title: '院校省份', dataIndex: 'province', width: '13%' },
            { title: '文理科', dataIndex: 'studenttype', width: '10%' },
            { title: '年份', dataIndex: 'year', width: '9%' },
            { title: '录取批次', dataIndex: 'batch', width: '13%' },
            {
                title: '最高分', dataIndex: 'max', width: '10%',
                render: text => <span>{text === '[]' ? '--' : text}</span>
            },
            {
                title: '最低分', dataIndex: 'min', width: '10%',
                render: text => <span>{text === '[]' ? '--' : text}</span>
            },
            { title: '省控线', dataIndex: 'provincescore', width: '10%' }
        ]
    }

    handleOnSearch = (param) => {
        console.log(param)
    }

    handleTagsOnChange = (param) => {
        console.log(param)
    }

    fetchDataSource = (param = {}) => {

    }

    componentDidMount() {
        this.fetchDataSource()
    }

    render() {
        return (
            <div>
                <Card>
                    <StudentInfo onSubmit={this.handleOnSearch} />
                    <Toobal onChange={this.handleTagsOnChange} />
                    <Table rowKey={(record: any) => record.id}
                        columns={this.columns}
                        dataSource={this.state.dataSource} />
                </Card>
            </div>
        )
    }
}