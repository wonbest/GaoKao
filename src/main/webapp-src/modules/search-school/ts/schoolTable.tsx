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
    provinceSelectedTags: any[]
    typeSelectedTags: any[]
    educationSelectedTags: any[]
    specialSelectedTags: any[]
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
        loading: true,

        provinceData: [],
        schoolTypeData: [],
        educationData: [],
        provinceSelectedTags: [],
        typeSelectedTags: [],
        educationSelectedTags: [],
        specialSelectedTags: []
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

    /** 学校列表onchange事件 */
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

    ///////////////////////////////////////////////////////
    private specialProps = ['985', '211']

    /** 监控工具栏过滤条件变化 */
    handleOptionOnClick = (tag: string, checked: boolean, prop: string) => {
        switch (prop) {
            case 'province':
                this.setState({
                    provinceSelectedTags: checked
                        ? [...this.state.provinceSelectedTags, tag]
                        : this.state.provinceSelectedTags.filter(t => t !== tag)
                }, () => {
                    console.log(this.state.provinceSelectedTags)
                    this.props.store.schoolProvince = this.state.provinceSelectedTags
                    this.fetch()
                })
                break
            case 'type':
                this.setState({
                    typeSelectedTags: checked
                        ? [...this.state.typeSelectedTags, tag]
                        : this.state.typeSelectedTags.filter(t => t !== tag)
                }, () => {
                    console.log(this.state.typeSelectedTags)
                    this.props.store.schoolProperty = this.state.typeSelectedTags
                    this.fetch()
                })
                break
            case 'education':
                this.setState({
                    educationSelectedTags: checked
                        ? [...this.state.educationSelectedTags, tag]
                        : this.state.educationSelectedTags.filter(t => t !== tag)
                }, () => {
                    console.log(this.state.educationSelectedTags)
                    this.props.store.schoolType = this.state.educationSelectedTags
                    this.fetch()
                })
                break
            case 'special':
                this.setState({
                    specialSelectedTags: checked
                        ? [...this.state.specialSelectedTags, tag]
                        : this.state.specialSelectedTags.filter(t => t !== tag)
                }, () => {
                    console.log(this.state.specialSelectedTags)
                    this.props.store.schoolSpecialProps = this.state.specialSelectedTags
                    this.fetch()
                })
                break
            default:
                break
        }
    }

    /** 封装加载数据参数 */
    fetch = () => {
        this.fetchSchoolInfo({
            rowCount: this.state.pagination.pageSize,
            current: this.state.pagination.current,
            schoolType: JSON.stringify(this.props.store.schoolType.slice()),
            province: JSON.stringify(this.props.store.schoolProvince.slice()),
            schoolProperty: JSON.stringify(this.props.store.schoolProperty.slice()),
            specialProps: JSON.stringify(this.props.store.schoolSpecialProps.slice()),
        })
    }

    /** 加载省份数据 */
    fetchProvince = () => {
        $.ajax({
            url: 'getAllProvince',
            type: 'post',
            async: true,
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
            async: true,
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
            async: true,
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

    //////////////////////////////////////////////////////

    componentDidMount() {
        this.fetch()
        this.fetchEducation()
        this.fetchProvince()
        this.fetchSchoolProperty()
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
                        <Col span={3}>特殊属性</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.specialProps, 'special')}
                        </Col>
                    </Row>
                </Card>
                <Table
                    columns={this.columns}
                    loading={this.state.loading}
                    rowKey={record => record.schoolid}
                    dataSource={this.state.dataSource}
                    onChange={this.handleTableChange}
                    pagination={this.state.pagination}
                    style={{ margin: '10px 0px 0px 0px' }} />
            </div>
        )
    }
}