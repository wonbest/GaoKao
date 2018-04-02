import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Card } from 'antd'
import { Divider } from 'antd'
import { Form } from 'antd'
import { Tag } from 'antd'
import { Icon } from 'antd'

import { FormComponentProps } from 'antd/lib/form/Form'

import CheckedTag from '../../public/ts/checked-tag'

interface ToolbarProps {

}
interface ToolbarStates {
    provinceSelectedTags: any[]
    typeSelectedTags: any[]
    educationSelectedTags: any[]
    specialSelectedTags: any[]
}
export default class Toolbar extends React.Component<ToolbarProps, ToolbarStates> {

    state: ToolbarStates = {
        provinceSelectedTags: [],
        typeSelectedTags: [],
        educationSelectedTags: [],
        specialSelectedTags: []
    }

    private testTags = ['Movies', 'Books', 'Music', 'Sports']
    private testTags1 = ['Movies', 'Books', 'Music', 'Sports']
    private testTags2 = ['Movies', 'Books', 'Music', 'Sports']
    private testTags3 = ['Movies', 'Books', 'Music', 'Sports']

    handleOptionOnClick = (tag: string, checked: boolean, prop: string) => {
        switch (prop) {
            case 'province':
                this.setState({
                    provinceSelectedTags: checked
                        ? [...this.state.provinceSelectedTags, tag]
                        : this.state.provinceSelectedTags.filter(t => t !== tag)
                })
                break
            case 'type':
                this.setState({
                    typeSelectedTags: checked
                        ? [...this.state.typeSelectedTags, tag]
                        : this.state.typeSelectedTags.filter(t => t !== tag)
                })
                break
            case 'education':
                this.setState({
                    educationSelectedTags: checked
                        ? [...this.state.educationSelectedTags, tag]
                        : this.state.educationSelectedTags.filter(t => t !== tag)
                })
                break
            case 'special':
                this.setState({
                    specialSelectedTags: checked
                        ? [...this.state.specialSelectedTags, tag]
                        : this.state.specialSelectedTags.filter(t => t !== tag)
                })
                break
            default:
                break
        }

    }

    fetchProvince = () => {

    }

    fetchSchoolType = () => {

    }

    fetchEducation = () => {

    }

    fetchSpecialProp = () => {

    }

    handleTagsOnChange = () => {

    }

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
        this.fetchEducation()
        this.fetchProvince()
        this.fetchSchoolType()
        this.fetchSpecialProp()
    }

    render() {
        return (
            <Card>
                <Row>
                    <Col span={3}>所在省份</Col>
                    <Col span={1}><Icon type="right" /></Col>
                    <Col span={20}>
                        {...this.createCheckableTag(this.testTags, 'province')}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>院校类型</Col>
                    <Col span={1}><Icon type="right" /></Col>
                    <Col span={20}>
                        {...this.createCheckableTag(this.testTags1, 'type')}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>学历层次</Col>
                    <Col span={1}><Icon type="right" /></Col>
                    <Col span={20}>
                        {...this.createCheckableTag(this.testTags2, 'education')}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>特殊属性</Col>
                    <Col span={1}><Icon type="right" /></Col>
                    <Col span={20}>
                        {...this.createCheckableTag(this.testTags3, 'special')}
                    </Col>
                </Row>
            </Card>
        )
    }
}