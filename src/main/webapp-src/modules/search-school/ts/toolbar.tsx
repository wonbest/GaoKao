import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Card } from 'antd'
import { Divider } from 'antd'
import { Form } from 'antd'
import { Tag } from 'antd'
import { Icon } from 'antd'

import { observer } from 'mobx-react'

import { FormComponentProps } from 'antd/lib/form/Form'

import CheckedTag from '../../public/ts/checked-tag'

interface ToolbarProps {
    store: any
}
interface ToolbarStates {
    provinceData: any[]
    schoolTypeData: any[]
    educationData: any[]
    provinceSelectedTags: any[]
    typeSelectedTags: any[]
    educationSelectedTags: any[]
    specialSelectedTags: any[]
}
@observer
export default class Toolbar extends React.Component<ToolbarProps, ToolbarStates> {

    state: ToolbarStates = {
        provinceData: [],
        schoolTypeData: [],
        educationData: [],
        provinceSelectedTags: [],
        typeSelectedTags: [],
        educationSelectedTags: [],
        specialSelectedTags: []
    }

    private specialProps = ['985', '211']

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
                })
                break
            default:
                break
        }
    }

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
        this.fetchSchoolProperty()
    }

    render() {
        return (
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
        )
    }
}