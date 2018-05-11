import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Tag, Card, Row, Col, Icon } from 'antd'

interface MajorPassScoreStates {
    dataSource: any[]
}
export default class MajorPassScore extends React.Component<any, MajorPassScoreStates> {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }

    handleTagsOnChange = (param) => {
        console.log(param)
    }

    render() {
        return (
            <div>
                <ToolBar onSubmit={this.handleTagsOnChange} />
            </div>
        )
    }
}

interface ToolBarProps {
    onSubmit: (param) => void
}
interface ToolBarStates {
    majorTypeTagsData: any[]
    majorTypeSelectedTags: any[]

    schoolProvinceTagsData: any[]
    schoolProvinceSelectedTags: any[]

    schoolTypeTagsData: any[]
    schoolTypeSelectedTags: any[]

    educationTagsData: any[]
    educationSelectedTags: any[]

    batchTagsData: any[]
    batchSelectedTags: any[]

    yearTagsData: any[]
    yearSelectedTags: any[]

}
class ToolBar extends React.Component<ToolBarProps, ToolBarStates> {
    constructor(props) {
        super(props)
        this.state = {
            majorTypeTagsData: [],
            majorTypeSelectedTags: [],
            schoolProvinceTagsData: [],
            schoolProvinceSelectedTags: [],
            schoolTypeTagsData: [],
            schoolTypeSelectedTags: [],
            educationTagsData: [],
            educationSelectedTags: [],
            batchTagsData: [],
            batchSelectedTags: [],
            yearTagsData: [],
            yearSelectedTags: [],
        }
    }

    /** 标签onchange事件 */
    handleTagsOnChange = () => {
        let searchParams = {
            majorType: this.state.majorTypeSelectedTags,
            schoolProvince: this.state.schoolProvinceSelectedTags,
            schoolTypeTagsData: this.state.schoolTypeSelectedTags,
            educationTagsData: this.state.educationSelectedTags,
            batchTagsData: this.state.batchSelectedTags,
            yearTagsData: this.state.yearSelectedTags,
        }
        this.props.onSubmit(searchParams)
    }

    /** 监控工具栏过滤条件变化 */
    handleOptionOnClick = (tag: string, checked: boolean, prop: string) => {
        switch (prop) {
            case 'majorType':
                this.setState({
                    majorTypeSelectedTags: checked
                        ? [...this.state.majorTypeSelectedTags, tag]
                        : this.state.majorTypeSelectedTags.filter(t => t !== tag)
                }, () => {
                    this.handleTagsOnChange()
                })
                break
            case 'schoolProvince':
                this.setState({
                    schoolProvinceSelectedTags: checked
                        ? [...this.state.schoolProvinceSelectedTags, tag]
                        : this.state.schoolProvinceSelectedTags.filter(t => t !== tag)
                }, () => {
                    this.handleTagsOnChange()
                })
                break
            case 'schoolType':
                this.setState({
                    schoolTypeSelectedTags: checked
                        ? [...this.state.schoolTypeSelectedTags, tag]
                        : this.state.schoolTypeSelectedTags.filter(t => t !== tag)
                }, () => {
                    this.handleTagsOnChange()
                })
                break
            case 'education':
                this.setState({
                    educationSelectedTags: checked
                        ? [...this.state.educationSelectedTags, tag]
                        : this.state.educationSelectedTags.filter(t => t !== tag)
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

    /** 加载专业类型标签数据源 */
    fetchMajorType = () => {
        $.ajax({
            url: 'findAllMajorType',
            success: (data) => {
                this.setState({
                    majorTypeTagsData: data.result
                })
            }
        })
    }

    /** 加载院校省份数据 */
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

    /** 加载学院类型（综合、农林...）数据 */
    fetchSchoolProperty = () => {
        $.ajax({
            url: 'getAllSchoolProperty',
            type: 'post',
            async: false,
            success: (data) => {
                this.setState({
                    schoolTypeTagsData: data.result.filter(e => e !== '[]')
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
                    educationTagsData: data.result.filter(e => e !== '[]')
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
                    // batchTagsData: data.result.batch,
                })
            }
        })
    }

    componentDidMount() {
        this.fetchMajorType()
        this.fetchSchoolProvince()
        this.fetchSchoolProperty()
        this.fetchEducation()
        this.fetchSeachParams()
    }

    render() {
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={3}>专业类别</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.majorTypeTagsData, 'majorType')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>院校省份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.schoolProvinceTagsData, 'schoolProvince')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>院校分类</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.schoolTypeTagsData, 'schoolType')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>学历层次</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.educationTagsData, 'education')}
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