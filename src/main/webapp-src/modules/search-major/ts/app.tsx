import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col, Card } from 'antd'
import { Icon, Tag } from 'antd'
import { Table } from 'antd'

interface SearchMajorProps {

}
interface SearchMajorStates {
    majorTypeData: any[]
    majorTypeSelectedTags: any[]
    majorLevelData: any[]
    majorLevelSelectedTags: any[]
    majorDataSource: any[]
    pagination: any
    loading: boolean
}
export default class SearchMajor extends React.Component<SearchMajorProps, SearchMajorStates> {

    state: SearchMajorStates = {
        majorTypeData: [],
        majorTypeSelectedTags: [],
        majorLevelData: [],
        majorLevelSelectedTags: [],
        majorDataSource: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 100
        },
        loading: true
    }

    private columns = [
        {
            title: '专业名称',
            dataIndex: 'specialname',
            width: '20%'
        },
        {
            title: '专业类别',
            dataIndex: 'zytype',
            width: '20%'
        },
        {
            title: '全国报考热度',
            dataIndex: 'ranking',
            width: '20%'
        },
        {
            title: '同类报考热度',
            dataIndex: 'rankingType',
            width: '20%'
        },
        {
            title: '专业层次',
            dataIndex: 'zycengci',
            width: '20%'
        }
    ]

    handleTableOnChange = (pagination) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize
        this.setState({
            pagination: pager,
        }, ()=>{
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
                case 'majorType':
                    this.setState({
                        majorTypeSelectedTags: checked
                            ? [...this.state.majorTypeSelectedTags, tag]
                            : this.state.majorTypeSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                case 'majorLevel':
                    this.setState({
                        majorLevelSelectedTags: checked
                            ? [...this.state.majorLevelSelectedTags, tag]
                            : this.state.majorLevelSelectedTags.filter(t => t !== tag)
                    }, () => {
                        this.fetch()
                    })
                    break
                default:
                    break
            }
        })
    }

    fetchMajorDataSource = (params = {}) => {
        this.setState({
            loading: true
        })
        $.ajax({
            url: 'getMajorList',
            data: {
                ...params,
            },
            type: 'post',
            success: (data) => {
                const pagination = { ...this.state.pagination }
                pagination.total = data.total
                this.setState({
                    majorDataSource: data.rows,
                    pagination,
                    loading: false,
                })
            }
        })
    }

    /** 封装加载数据参数 */
    fetch = () => {
        this.fetchMajorDataSource({
            rowCount: this.state.pagination.pageSize,
            current: this.state.pagination.current,
            majorType: JSON.stringify(this.state.majorTypeSelectedTags),
            majorLevel: JSON.stringify(this.state.majorLevelSelectedTags),
        })
    }

    fetchMajorType = () => {
        $.ajax({
            url: 'findAllMajorType',
            success: (data) => {
                this.setState({
                    majorTypeData: data.result
                })
            }
        })
    }

    fetchMajorLevel = () => {
        $.ajax({
            url: 'findAllMajorLevel',
            success: (data) => {
                this.setState({
                    majorLevelData: data.result
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
        this.fetchMajorLevel()
        this.fetchMajorType()
    }

    render() {
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={3}>专业类别</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.majorTypeData, 'majorType')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>专业层次</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.majorLevelData, 'majorLevel')}
                        </Col>
                    </Row>
                </Card>
                <Table
                    rowKey={record => record.id}
                    columns={this.columns}
                    onChange={this.handleTableOnChange}
                    pagination={this.state.pagination}
                    dataSource={this.state.majorDataSource}
                    loading={this.state.loading}
                    style={{ margin: '10px 0px 0px 0px' }} />
            </div>
        )
    }
}