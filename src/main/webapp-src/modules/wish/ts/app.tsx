import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Card } from 'antd'
import { Button } from 'antd'
import { Table } from 'antd'

import Toobal from './toolbar'
import StudentInfo, { RISK } from './studentInfo'

interface WishProps {

}
interface WishStates {
    dataSource: any[]
    pagination: any
    loading: boolean

    studentProvince: string
    batch: string
    score: string
    passScore: string

    schoolProvince: string
    studentType: string
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
            },
            studentProvince: '',
            batch: '',
            score: '',
            passScore: '',

            schoolProvince: '',
            studentType: '',
        }
        this.columns = [
            { title: '学校名称', dataIndex: 'schoolname', width: '15%' },
            { title: '院校省份', dataIndex: 'province' },
            { title: '招生类型', dataIndex: 'studenttype' },
            { title: '年份', dataIndex: 'year' },
            { title: '录取批次', dataIndex: 'batch' },
            {
                title: '最高分', dataIndex: 'max',
                render: text => <span>{text === '[]' ? '--' : text}</span>
            },
            {
                title: '最低分', dataIndex: 'min',
                render: text => <span>{text === '[]' ? '--' : text}</span>
            },
            { title: '省控线', dataIndex: 'provincescore' }
        ]
    }

    handleOnSearch = (param) => {
        console.log(param)
        this.setState({
            studentProvince: param.studentProvince,
            batch: param.batch,
            score: param.score,
            passScore: param.passScore
        }, () => {
            this.fetchDataSourchWithParams(10, 1)
        })
    }

    handleTagsOnChange = (param) => {
        console.log(param)
        this.setState({
            schoolProvince: param.province,
            studentType: param.studentType
        }, () => {
            this.fetchDataSourchWithParams(10, 1)
        })
    }

    fetchDataSource = (param = {}) => {
        this.setState({
            loading: true
        })
        $.ajax({
            url: 'getWish',
            data: {
                ...param
            },
            type: 'post',
            success: data => {
                const pagination = { ...this.state.pagination }
                pagination.total = data.total
                pagination.current = data.current
                pagination.pageSize = data.rowCount
                this.setState({
                    dataSource: data.rows,
                    loading: false,
                    pagination,
                })
            }
        })
    }

    /** 封装请求参数 */
    fetchDataSourchWithParams = (rowCount: number, current: number) => {
        this.fetchDataSource({
            studentProvince: this.state.studentProvince,
            batch: this.state.batch,
            score: this.state.score,
            passScore: this.state.passScore,
            schoolProvince: this.state.schoolProvince,
            studentType: this.state.studentType,
            rowCount,
            current,
        })
    }

    handleTableOnChange = (pagination) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize
        this.setState({
            pagination: pager
        }, () => {
            this.fetchDataSourchWithParams(
                this.state.pagination.pageSize,
                this.state.pagination.current
            )
        })
    }

    componentDidMount() {
        this.fetchDataSourchWithParams(
            this.state.pagination.rowCount,
            this.state.pagination.current)
    }

    render() {
        return (
            <div>
                <Card>
                    <StudentInfo onSubmit={this.handleOnSearch} />
                    <Toobal onChange={this.handleTagsOnChange} />
                    <Table rowKey={(record: any) => record.id}
                        onChange={this.handleTableOnChange}
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        loading={this.state.loading} />
                </Card>
            </div>
        )
    }
}