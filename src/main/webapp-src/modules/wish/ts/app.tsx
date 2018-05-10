import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Select } from 'antd'
import { Radio } from 'antd'
import { Input } from 'antd'
import { Card } from 'antd'
import { Form, Button } from 'antd'
import { Table } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import SearchSchool from '../../search-school/ts/app'

interface WishProps extends FormComponentProps {

}
interface WishStates {
    content: any
}
class Wish extends React.Component<WishProps, WishStates> {

    constructor(props) {
        super(props)
        this.state = {
            content: <SearchSchool store={{}} />
        }
    }

    // 加载生源地下拉框数据
    fetchLocalProvince = () => {
        let optionData = []
        $.ajax({
            url: 'getLocalProvince',
            async: false,
            success: (data) => {
                if (data.state) {
                    optionData = data.result
                }
            }
        })
        return optionData
    }

    // 生源地onchange事件
    handleLocalProvinceOnChange = (value) => {
        console.log(value)
    }

    // 文理科onchange事件
    handleStudentTypeOnChange = (e) => {
        console.log(e.target.value)
    }

    // 高考分数onchange事件
    handleScoreOnChange = (e) => {
        console.log(e.target.value)
    }

    handleOnSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card>
                    <Form>
                        <Row>
                            <Col span={6}>
                                <Form.Item>
                                    {getFieldDecorator('localProvince', {
                                        rules: [{
                                            required: true,
                                            message: '请选择生源地',
                                        }],
                                    })(
                                        <Select showSearch
                                            style={{ width: 150 }}
                                            placeholder="生源地选择"
                                            // onChange={this.handleLocalProvinceOnChange}
                                            filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                                            {this.fetchLocalProvince().map((value, index) => {
                                                return <Select.Option key={value}>{value}</Select.Option>
                                            })}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item>
                                    {getFieldDecorator('studentType', {
                                        initialValue: "理科",
                                        rules: [{
                                            required: true,
                                            message: '请选择文理科',
                                        }],
                                    })(
                                        <Radio.Group
                                        // onChange={this.handleStudentTypeOnChange}
                                        >
                                            <Radio.Button value="理科">理科</Radio.Button>
                                            <Radio.Button value="文科">文科</Radio.Button>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item>
                                    {getFieldDecorator('score', {
                                        rules: [{
                                            required: true,
                                            message: '请输入高考分数',
                                        }],
                                    })(
                                        <Input
                                            placeholder="请输入高考分数"
                                            // onChange={this.handleScoreOnChange}
                                            style={{ width: 150 }} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item>
                                    {getFieldDecorator('pass_score', {
                                        rules: [{
                                            required: true,
                                            message: '请输入分数线',
                                        }],
                                    })(
                                        <Input
                                            placeholder="请输入分数线"
                                            // onChange={this.handleScoreOnChange}
                                            style={{ width: 120 }} />
                                    )}
                                    <Button
                                        onClick={this.handleOnSubmit}
                                        style={{ marginLeft: '10px' }}>搜索</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        {this.state.content}
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create<any>()(Wish)