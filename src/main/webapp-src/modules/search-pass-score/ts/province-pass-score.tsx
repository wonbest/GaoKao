import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col, Card } from 'antd'
import { Icon, Tag } from 'antd'
import { Table } from 'antd'

interface ProvincePassScoreProps {

}
interface ProvincePassScoreStates {
    yearTagsData: any[]
    yearSelectedTags: any[]
    typeTagsData: any[]
    typeSelectedTags: any[]
    batchTagsData: any[]
    batchSelectedTags: any[]
    provinceTagsData: any[]
    provinceSelectedTags: any[]

    passScoreDataSource: any[]
    pagination: any
    loading: boolean
}
export default class ProvincePassScore extends React.Component<ProvincePassScoreProps, ProvincePassScoreStates> {

    constructor(props) {
        super(props)
        this.state = {
            yearTagsData: [],
            yearSelectedTags: [],
            typeTagsData: [],
            typeSelectedTags: [],
            batchTagsData: [],
            batchSelectedTags: [],
            provinceTagsData: [],
            provinceSelectedTags: [],

            passScoreDataSource: [],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 100
            },
            loading: true
        }
    }

    private columns = [
        {
            title: '考生地区',
            dataIndex: 'province'
        },
        {
            title: '录取年份',
            dataIndex: 'year'
        },
        {
            title: '考生类别',
            dataIndex: 'type'
        },
        {
            title: '录取批次',
            dataIndex: 'bath'
        },
        {
            title: '分数线',
            dataIndex: 'score'
        }
    ]

    /** 获取工具栏搜索条件 */
    fetchSeachParams = () => {
        $.ajax({
            url: 'getSearchParams',
            success: (data) => {
                this.setState({
                    yearTagsData: data.result.year,
                    typeTagsData: data.result.type.filter(t => t !== '[]'),
                    batchTagsData: data.result.batch,
                    provinceTagsData: data.result.province,
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
                case 'type':
                    this.setState({
                        typeSelectedTags: checked
                            ? [...this.state.typeSelectedTags, tag]
                            : this.state.typeSelectedTags.filter(t => t !== tag)
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
                case 'province':
                    this.setState({
                        provinceSelectedTags: checked
                            ? [...this.state.provinceSelectedTags, tag]
                            : this.state.provinceSelectedTags.filter(t => t !== tag)
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
            url: 'findProvincePassScore',
            data: {
                ...params,
            },
            type: 'post',
            success: (data) => {
                const pagination = { ...this.state.pagination }
                pagination.total = data.total
                this.setState({
                    passScoreDataSource: data.rows,
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
            type: JSON.stringify(this.state.typeSelectedTags),
            year: JSON.stringify(this.state.yearSelectedTags),
            province: JSON.stringify(this.state.provinceSelectedTags),
            batch: JSON.stringify(this.state.batchSelectedTags)
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
                        <Col span={3}>所在省份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.provinceTagsData, 'province')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>录取年份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.yearTagsData, 'year')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>考生类别</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.typeTagsData, 'type')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>录取批次</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.batchTagsData, 'batch')}
                        </Col>
                    </Row>
                </Card>
                <Table
                    rowKey={record => record.id}
                    columns={this.columns}
                    onChange={this.handleTableOnChange}
                    pagination={this.state.pagination}
                    dataSource={this.state.passScoreDataSource}
                    loading={this.state.loading}
                    style={{ margin: '10px 0px 0px 0px' }} />
            </div>
        )
    }

}