import * as React from 'react'
import * as ReactDom from 'react-dom'

import { observer } from 'mobx-react'

import { Input, Table } from 'antd'
import { Row, Col } from 'antd'
import { Card } from 'antd'
import { Divider } from 'antd'
import { Form } from 'antd'
import { Tag } from 'antd'
import { Icon } from 'antd'

interface SchoolTableProps {
    store: any
}
interface SchoolTableStates {
    dataSource: any[]
    pagination: any
    loading: boolean

    provinceData: any[]
    schoolTypeData: any[]
    educationData: any[]
    schoolNatureData: any[]
    provinceSelectedTags: any[]
    typeSelectedTags: any[]
    educationSelectedTags: any[]
    schoolNatureSelectedTags: any[]
}
@observer
export default class SchoolTable extends React.Component<SchoolTableProps, SchoolTableStates> {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 100
            },
            loading: true,

            provinceData: [],
            schoolTypeData: [],
            educationData: [],
            schoolNatureData: [],
            provinceSelectedTags: [],
            typeSelectedTags: [],
            educationSelectedTags: [],
            schoolNatureSelectedTags: []
        }
    }

    private columns = [
        {
            title: '学校名称',
            dataIndex: '',
            width: '20%',
            render: text => <a href={text.guanwang} target="blank" >{text.schoolname}</a>
        },
        {
            title: '所在省份',
            dataIndex: 'province',
            width: '20%'
        },
        {
            title: '院校类型',
            dataIndex: 'schoolproperty',
            width: '20%',
            render: text => <span>{text === '[]' ? '' : text}</span>
        },
        {
            title: '院校性质',
            dataIndex: 'schoolnature',
            width: '20%',
            render: text => <span>{text === '[]' ? '' : text}</span>
        },
        {
            title: '学历层次',
            dataIndex: 'schooltype',
            width: '20%'
        }
    ]

    /** 学校列表onChange事件 */
    handleTableOnChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize
        this.setState({
            pagination: pager,
        }, () => {
            this.fetch()
        })

    }

    /** 加载学校列表 */
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
                case 'province':
                    this.setState({
                        provinceSelectedTags: checked
                            ? [...this.state.provinceSelectedTags, tag]
                            : this.state.provinceSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'type':
                    this.setState({
                        typeSelectedTags: checked
                            ? [...this.state.typeSelectedTags, tag]
                            : this.state.typeSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'education':
                    this.setState({
                        educationSelectedTags: checked
                            ? [...this.state.educationSelectedTags, tag]
                            : this.state.educationSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'schoolNature':
                    this.setState({
                        schoolNatureSelectedTags: checked
                            ? [...this.state.schoolNatureSelectedTags, tag]
                            : this.state.schoolNatureSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                default:
                    break
            }
        })
    }

    /** 封装加载数据参数 */
    fetch = () => {
        this.fetchSchoolInfo({
            rowCount: this.state.pagination.pageSize,
            current: this.state.pagination.current,
            schoolType: JSON.stringify(this.state.educationSelectedTags),
            province: JSON.stringify(this.state.provinceSelectedTags),
            schoolProperty: JSON.stringify(this.state.typeSelectedTags),
            schoolNature: JSON.stringify(this.state.schoolNatureSelectedTags),
        })
    }

    /** 加载院校性质数据 */
    fetchSchoolNature = () => {
        $.ajax({
            url: 'getAllSchoolNature',
            type: 'post',
            async: false,
            success: (data) => {
                this.setState({
                    schoolNatureData: data.result.filter(e => e !== '[]')
                })
            }
        })
    }

    /** 加载省份数据 */
    fetchProvince = () => {
        $.ajax({
            url: 'getAllProvince',
            type: 'post',
            async: false,
            success: (data) => {
                this.setState({
                    provinceData: data.result
                })
            }
        })
    }

    /** 加载学院类型数据 */
    fetchSchoolProperty = () => {
        $.ajax({
            url: 'getAllSchoolProperty',
            type: 'post',
            async: false,
            success: (data) => {
                this.setState({
                    schoolTypeData: data.result.filter(e => e !== '[]')
                })
            }
        })
    }

    /** 加载学历数据 */
    fetchEducation = () => {
        $.ajax({
            url: 'getAllSchoolType',
            type: 'post',
            async: false,
            success: (data) => {
                this.setState({
                    educationData: data.result.filter(e => e !== '[]')
                })
            }
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
        this.fetchEducation()
        this.fetchProvince()
        this.fetchSchoolProperty()
        this.fetchSchoolNature()
    }

    render() {
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={3}>所在省份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.provinceData, 'province')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>院校类型</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.schoolTypeData, 'type')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>学历层次</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.educationData, 'education')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>院校性质</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.schoolNatureData, 'schoolNature')}
                        </Col>
                    </Row>
                </Card>
                <Table
                    columns={this.columns}
                    loading={this.state.loading}
                    rowKey={record => record.schoolid}
                    dataSource={this.state.dataSource}
                    onChange={this.handleTableOnChange}
                    pagination={this.state.pagination}
                    style={{ margin: '10px 0px 0px 0px' }} />
            </div>
        )
    }
}