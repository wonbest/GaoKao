import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col, Card } from 'antd'
import { Icon, Tag } from 'antd'
import { Table } from 'antd'

interface SchoolPassScoreProps {

}
interface SchoolPassScoreStates {
    dataSource: any[]
    pagination: any
    loading: boolean

    schoolProvinceTagsData: any[]
    schoolProvinceSelectedTags: any[]
    studentProvinceTagsData: any[]
    studentProvinceSelectedTags: any[]
    batchTagsData: any[]
    batchSelectedTags: any[]
    studentTypeTagsData: any[]
    studentTypeSelectedTags: any[]
    yearTagsData: any[]
    yearSelectedTags: any[]
}
export default class SchoolPassScore extends React.Component<SchoolPassScoreProps, SchoolPassScoreStates> {
    state: SchoolPassScoreStates = {
        dataSource: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 100
        },
        loading: true,

        schoolProvinceTagsData: [],
        schoolProvinceSelectedTags: [],
        studentProvinceTagsData: [],
        studentProvinceSelectedTags: [],
        batchTagsData: [],
        batchSelectedTags: [],
        studentTypeTagsData: [],
        studentTypeSelectedTags: [],
        yearTagsData: [],
        yearSelectedTags: []
    }

    private columns = [
        {
            title: '学校名称',
            dataIndex: 'schoolname',
            width: '15%'
        },
        {
            title: '招生地区',
            dataIndex: 'localprovince',
            width: '10%'
        },
        {
            title: '考生地区',
            dataIndex: 'province',
            width: '10%'
        },
        {
            title: '文理科',
            dataIndex: 'studenttype',
            width: '10%'
        },
        {
            title: '年份',
            dataIndex: 'year',
            width: '10%'
        },
        {
            title: '录取批次',
            dataIndex: 'batch',
            width: '15%'
        },
        {
            title: '最高分',
            dataIndex: 'max',
            width: '10%'
        },
        {
            title: '最低分',
            dataIndex: 'min',
            width: '10%'
        },
        {
            title: '省控线',
            dataIndex: 'provincescore',
            width: '10%'
        },
    ]

    /** 获取工具栏搜索条件 */
    fetchSeachParams = () => {
        $.ajax({
            url: 'getSearchTagsData',
            success: (data) => {
                this.setState({
                    yearTagsData: data.result.year,
                    studentTypeTagsData: data.result.studentType.filter(t => t !== '[]'),
                    batchTagsData: data.result.batch,
                    studentProvinceTagsData: data.result.studentProvince,
                    schoolProvinceTagsData: data.result.schoolProvince,
                })
            }
        })
    }

    handleTableOnChange = (pagination) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize
        this.setState({
            pagination: pager,
        }, () => {
            this.fetch()
        })

    }

    /** 监控工具栏过滤条件变化 */
    handleOptionOnClick = (tag: string, checked: boolean, prop: string) => {
        this.setState({
            pagination: {
                current: 1,
                pageSize: 10,
                total: 100
            }
        }, () => {
            switch (prop) {
                case 'schoolProvince':
                    this.setState({
                        schoolProvinceSelectedTags: checked
                            ? [...this.state.schoolProvinceSelectedTags, tag]
                            : this.state.schoolProvinceSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'year':
                    this.setState({
                        yearSelectedTags: checked
                            ? [...this.state.yearSelectedTags, tag]
                            : this.state.yearSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'batch':
                    this.setState({
                        batchSelectedTags: checked
                            ? [...this.state.batchSelectedTags, tag]
                            : this.state.batchSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'studentProvince':
                    this.setState({
                        studentProvinceSelectedTags: checked
                            ? [...this.state.studentProvinceSelectedTags, tag]
                            : this.state.studentProvinceSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'studentType':
                    this.setState({
                        studentTypeSelectedTags: checked
                            ? [...this.state.studentTypeSelectedTags, tag]
                            : this.state.studentTypeSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                default:
                    break
            }
        })
    }

    /** 加载表格数据源 */
    fetchPassScoreDataSource = (params = {}) => {
        this.setState({
            loading: true
        })
        $.ajax({
            url: 'getSchoolPassScore',
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

    /** 封装加载数据参数 */
    fetch = () => {
        this.fetchPassScoreDataSource({
            rowCount: this.state.pagination.pageSize,
            current: this.state.pagination.current,
            batch: JSON.stringify(this.state.batchSelectedTags),
            year: JSON.stringify(this.state.yearSelectedTags),
            schoolProvince: JSON.stringify(this.state.schoolProvinceSelectedTags),
            studentProvince: JSON.stringify(this.state.studentProvinceSelectedTags),
            studentType: JSON.stringify(this.state.studentTypeSelectedTags),
        })
    }

    /** 创建工具栏搜索条件标签 */
    createCheckableTag = (data = [], prop: string) => {
        let options = []
        data.forEach(e => {
            options.push(
                <Tag.CheckableTag
                    key={e}
                    checked={this.state[prop + 'SelectedTags'].indexOf(e) > -1}
                    onChange={checked => this.handleOptionOnClick(e, checked, prop)} >
                    {e}
                </Tag.CheckableTag>)
        })
        return options
    }

    componentDidMount() {
        this.fetch()
        this.fetchSeachParams()
    }

    render() {
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={3}>院校省份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.schoolProvinceTagsData, 'schoolProvince')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>考生省份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.studentProvinceTagsData, 'studentProvince')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>录取批次</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.batchTagsData, 'batch')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>考生类别</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.studentTypeTagsData, 'studentType')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>录取年份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.yearTagsData, 'year')}
                        </Col>
                    </Row>
                </Card>
                <Table
                    rowKey={record => record.id}
                    columns={this.columns}
                    // onChange={this.handleTableOnChange}
                    pagination={this.state.pagination}
                    dataSource={this.state.dataSource}
                    loading={this.state.loading}
                    style={{ margin: '10px 0px 0px 0px' }} />
            </div>
        )
    }
}