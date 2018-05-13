import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Tag, Card, Row, Col, Icon, Table, Button } from 'antd'
import { Select, Input } from 'antd'

interface SearchParams {
    schoolName: string
    province: string
    batch: string
    year: string
}

interface MajorPassScoreStates {
    pagination: any
    dataSource: any[]
    searchParams: SearchParams
    loading: boolean
}
export default class MajorPassScore extends React.Component<any, MajorPassScoreStates> {

    private columns = [
        { title: '学校名称', dataIndex: 'schoolname', width: '' },
        { title: '专业名称', dataIndex: 'specialtyname', width: '' },
        { title: '招生地区', dataIndex: 'localprovince', width: '' },
        { title: '招生年份', dataIndex: 'year', width: '' },
        { title: '学生类型', dataIndex: 'studenttype', width: '' },
        { title: '最高分', dataIndex: 'max', width: '' },
        { title: '最低分', dataIndex: 'min', width: '' }
    ]

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            pagination: {
                current: 1,
                total: 100,
                pageSize: 10
            },
            searchParams: {
                province: '',
                batch: '',
                year: '',
                schoolName: '',
            },
            loading: false
        }
    }

    /** 标签变化事件 */
    handleTagsOnChange = (params: SearchParams) => {
        this.setState({
            searchParams: params
        }, () => {
            this.fetchDataSource({
                rowCount: 10,
                current: 1,
            })
        })
    }

    /** pagination变化事件 */
    handleTableOnChange = (pagination) => {
        this.fetchDataSource({
            current: pagination.current,
            rowCount: pagination.pageSize,
        })
    }

    /** 加载表格数据源 */
    fetchDataSource = (params = {}) => {
        this.setState({
            loading: true
        }, () => {
            $.ajax({
                url: 'getMajorPassScoreList',
                type: 'post',
                data: {
                    ...params,
                    ...this.state.searchParams
                },
                success: (data) => {
                    console.log(data.result)
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
        })

    }

    componentDidMount() {
        this.fetchDataSource({
            rowCount: this.state.pagination.pageSize,
            current: this.state.pagination.current,
        })
    }

    render() {
        return (
            <div>
                <ToolBar onSubmit={this.handleTagsOnChange} />
                <Table rowKey={(record: any) => record.id}
                    columns={this.columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableOnChange} />
            </div>
        )
    }
}

interface ToolBarProps {
    onSubmit: (param: SearchParams) => void
}
interface ToolBarStates {

    schoolData: any[]
    schoolName: string

    /** 院校招生地区 */
    schoolProvinceTagsData: any[]
    schoolProvinceSelectedTags: any[]

    batchTagsData: any[]
    batchSelectedTags: any[]

    yearTagsData: any[]
    yearSelectedTags: any[]

}
class ToolBar extends React.Component<ToolBarProps, ToolBarStates> {
    constructor(props) {
        super(props)
        this.state = {
            schoolData: [],
            schoolName: '',
            schoolProvinceTagsData: [],
            schoolProvinceSelectedTags: [],
            batchTagsData: [],
            batchSelectedTags: [],
            yearTagsData: [],
            yearSelectedTags: [],
        }
    }

    /** 标签onchange事件 */
    handleTagsOnChange = () => {
        let searchParams: SearchParams = {
            schoolName: this.state.schoolName,
            province: JSON.stringify(this.state.schoolProvinceSelectedTags),
            batch: JSON.stringify(this.state.batchSelectedTags),
            year: JSON.stringify(this.state.yearSelectedTags),
        }
        this.props.onSubmit(searchParams)
    }

    /** 监控工具栏过滤条件变化 */
    handleOptionOnClick = (tag: string, checked: boolean, prop: string) => {
        switch (prop) {
            case 'schoolProvince':
                this.setState({
                    schoolProvinceSelectedTags: checked
                        ? [...this.state.schoolProvinceSelectedTags, tag]
                        : this.state.schoolProvinceSelectedTags.filter(t => t !== tag)
                }, () => {
                    this.handleTagsOnChange()
                })
                break
            case 'batch':
                this.setState({
                    batchSelectedTags: checked
                        ? [...this.state.batchSelectedTags, tag]
                        : this.state.batchSelectedTags.filter(t => t !== tag)
                }, () => {
                    this.handleTagsOnChange()
                })
                break
            case 'year':
                this.setState({
                    yearSelectedTags: checked
                        ? [...this.state.yearSelectedTags, tag]
                        : this.state.yearSelectedTags.filter(t => t !== tag)
                }, () => {
                    this.handleTagsOnChange()
                })
                break
            default:
                break
        }
    }

    handleSchoolNameOnSearch = value => {
        this.setState({
            schoolName: value
        }, () => {
            this.handleTagsOnChange()
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

    /** 加载院校招生地区标签数据 */
    fetchSchoolProvince = () => {
        $.ajax({
            url: 'getAllProvince',
            type: 'post',
            async: false,
            success: (data) => {
                this.setState({
                    schoolProvinceTagsData: data.result
                })
            }
        })
    }

    /** 获取年份标签数据源 */
    fetchSeachParams = () => {
        $.ajax({
            url: 'getSearchTagsData',
            success: (data) => {
                this.setState({
                    yearTagsData: data.result.year,
                })
            }
        })
    }

    /** 加载录取批次信息 */
    fetchBatch = () => {
        $.ajax({
            url: 'getDistinctBatch',
            success: (data) => {
                this.setState({
                    batchTagsData: data.result
                })
            }
        })
    }

    /** 查找所有学校 */
    fetchSchoolName = () => {
        $.ajax({
            url: 'getAllSchoolName',
            success: (data) => {
                this.setState({
                    schoolData: data.result
                })
            }
        })
    }

    /** 创建下拉框数据源 */
    buildSelectOptions = (data: any[]) => {
        return data.map(e => <Select.Option key={e}>{e}</Select.Option>)
    }

    componentDidMount() {
        this.fetchSchoolName()
        this.fetchSchoolProvince()
        this.fetchSeachParams()
        this.fetchBatch()
    }

    render() {
        return (
            <div>
                <Card>
                    <Row style={{ margin: '0px 0px 20px 0px' }} gutter={16}>
                        <Input.Search
                            style={{ width: '90%' }}
                            size="large"
                            placeholder="请输入学校名称"
                            onSearch={this.handleSchoolNameOnSearch}
                            enterButton
                        />
                    </Row>
                    <Row>
                        <Col span={3}>招生地区</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.schoolProvinceTagsData, 'schoolProvince')}
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
                        <Col span={3}>录取年份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.yearTagsData, 'year')}
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}