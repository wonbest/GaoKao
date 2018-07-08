import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Tag, Card, Row, Col, Icon, Table, Button } from 'antd'
import { Select, Input } from 'antd'

interface ToolBarProps {
    onChange: (param) => void
}
interface ToolBarStates {

    schoolProvinceTagsData: any[]
    schoolProvinceSelectedTags: any[]

    studentTypeTagsData: any[]
    studentTypeSelectedTags: string

}
export default class ToolBar extends React.Component<ToolBarProps, ToolBarStates> {
    constructor(props) {
        super(props)
        this.state = {
            schoolProvinceTagsData: [],
            schoolProvinceSelectedTags: [],
            studentTypeTagsData: [],
            studentTypeSelectedTags: '',
        }
    }

    /** 标签onchange事件 */
    handleTagsOnChange = () => {
        let searchParams = {
            province: JSON.stringify(this.state.schoolProvinceSelectedTags),
            studentType: this.state.studentTypeSelectedTags,
        }
        this.props.onChange(searchParams)
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
            case 'studentType':
                this.setState({
                    studentTypeSelectedTags: checked
                        ? tag
                        : ''
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

    /** 获取工具栏搜索条件 */
    fetchSeachParams = () => {
        $.ajax({
            url: 'getSearchTagsData',
            success: (data) => {
                this.setState({
                    studentTypeTagsData: data.result.studentType.filter(t => t !== '[]'),
                    schoolProvinceTagsData: data.result.schoolProvince,
                })
            }
        })
    }

    componentDidMount() {
        this.fetchSeachParams()
    }

    render() {
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={3}>学校省份</Col>
                        <Col span={1}><Icon type="right" /></Col>
                        <Col span={20}>
                            {...this.createCheckableTag(this.state.schoolProvinceTagsData, 'schoolProvince')}
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}