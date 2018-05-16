import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Select } from 'antd'
import { Radio } from 'antd'
import { InputNumber } from 'antd'
import { Form, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'


interface StudentInfoProps extends FormComponentProps {
    onSubmit: (param) => void
}
interface StudentInfoStates {

}
class StudentInfo extends React.Component<StudentInfoProps, StudentInfoStates> {

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

    handleOnSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form>
                    <Row>
                        <Col span={4}>
                            <Form.Item>
                                {getFieldDecorator('studentProvince', {
                                    rules: [{
                                        required: true,
                                        message: '请选择生源地',
                                    }],
                                })(
                                    <Select showSearch
                                        style={{ width: 120 }}
                                        placeholder="生源地选择"
                                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                                        {this.fetchLocalProvince().map((value, index) => {
                                            return <Select.Option key={value}>{value}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="风险系数" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                                {getFieldDecorator('risk', {
                                    initialValue: "low"
                                })(
                                    <Radio.Group>
                                        <Radio.Button value="high">高</Radio.Button>
                                        <Radio.Button value="middle">中</Radio.Button>
                                        <Radio.Button value="low">低</Radio.Button>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item>
                                {getFieldDecorator('score', {
                                    rules: [{
                                        required: true,
                                        message: '请输入高考分数',
                                    }],
                                })(
                                    <InputNumber
                                        placeholder="高考分数"
                                        style={{ width: 100 }} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item>
                                {getFieldDecorator('passScore', {
                                    rules: [{
                                        required: true,
                                        message: '请输入分数线',
                                    }],
                                })(
                                    <InputNumber
                                        placeholder="请输入分数线"
                                        style={{ width: 120 }} />
                                )}
                                <Button
                                    onClick={this.handleOnSubmit}
                                    style={{ marginLeft: '10px' }}>搜索</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default Form.create<any>()(StudentInfo)