import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Card, Tag } from 'antd'
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
            {
                title: '学校名称', dataIndex: '', width: '20%',
                render: text => {
                    let school = this.fetchSchoolInfo(text.schoolid)
                    return <a href={school.guanwang} target="blank">{school.schoolname}</a>
                }
            },
            { title: '院校省份', dataIndex: 'province' },
            {
                title: '院校类型', dataIndex: '',
                render: text => <span>{this.fetchSchoolInfo(text.schoolid).schoolproperty}</span>
            },
            {
                title: '院校性质', dataIndex: '',
                render: text => <span>{this.fetchSchoolInfo(text.schoolid).schoolnature}</span>
            },
            {
                title: '热度排名', dataIndex: '',
                render: text => <span>{this.fetchSchoolInfo(text.schoolid).ranking}</span>
            },
            {
                title: '985/211', dataIndex: '',
                render: text => {
                    let school = this.fetchSchoolInfo(text.schoolid)
                    return <span>
                        {school.f211 === '1' ? <Tag color="#f50">211</Tag> : ''}
                        {school.f985 === '1' ? <Tag color="#2db7f5">985</Tag> : ''}
                        {school.f211 === '0' && school.f985 === '0' ? <Tag color="#108ee9">非985/211</Tag> : ''}
                    </span>
                }
            },
        ]
    }

    fetchSchoolInfo = id => {
        let school
        $.ajax({
            url: 'getSchoolInfo',
            data: {
                id,
            },
            type: 'post',
            async: false,
            success: data => {
                if (data.state) {
                    school = data.result
                }
            }
        })
        return school
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
                // const pagination = { ...this.state.pagination }
                // pagination.total = data.total
                // pagination.current = data.current
                // pagination.pageSize = data.rowCount
                this.setState({
                    dataSource: data.result,
                    loading: false,
                    // pagination,
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