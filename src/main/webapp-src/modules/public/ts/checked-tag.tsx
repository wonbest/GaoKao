import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Tag } from 'antd'

interface CheckedTagProps {
    name: string
}
interface CheckedTagStates {
    checked: boolean
}
export default class CheckedTag extends React.Component<CheckedTagProps, CheckedTagStates> {

    state: CheckedTagStates = {
        checked: false
    }

    handleOnChange = (value) => {
        this.setState({
            checked: value
        })
    }

    render() {
        return <Tag.CheckableTag
            key={this.props.name}
            checked={this.state.checked}
            onChange={this.handleOnChange}>{this.props.name}</Tag.CheckableTag>
    }
}