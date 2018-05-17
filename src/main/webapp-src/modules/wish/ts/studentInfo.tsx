import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'
import { Select } from 'antd'
import { Radio } from 'antd'
import { InputNumber } from 'antd'
import { Form, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

export const RISK = {
    HIGH: 'high',
    MIDDLE: 'middle',
    LOW: 'low'
}

interface StudentInfoProps extends FormComponentProps {
    onSubmit: (param) => void
}
interface StudentInfoStates {
    province: any[]
    batch: any[]
}
class StudentInfo extends React.Component<StudentInfoProps, StudentInfoStates> {

    state: StudentInfoStates = {
        province: [],
        batch: []
    }

    // 加载生源地下拉框数据
    fetchProvinceAndBatch = () => {
        $.ajax({
            url: 'getSearchTagsData',
            success: (data) => {
                if (data.state) {
                    this.setState({
                        province: data.result.studentProvince,
                        batch: data.result.batch
                    })
                }
            }
        })
    }

    handleOnSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values)
            }
        })
    }

    componentWillMount() {
        this.fetchProvinceAndBatch()
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form>
                    <Row>
                        <Col span={6}>
                            <Form.Item>
                                {getFieldDecorator('studentProvince', {
                                    rules: [{
                                        required: true,
                                        message: '请选择生源地',
                                    }],
                                })(
                                    <Select showSearch
                                        style={{ width: 150 }}
                                        placeholder="生源地选择"
                                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                                        {this.state.province.map((value, index) => {
                                            return <Select.Option key={value}>{value}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item>
                                {getFieldDecorator('batch', {
                                    rules: [{
                                        required: true,
                                        message: '请选择录取批次',
                                    }],
                                })(
                                    <Select showSearch
                                        style={{ width: 150 }}
                                        placeholder="请选择录取批次"
                                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                                        {this.state.batch.map((value, index) => {
                                            return <Select.Option key={value}>{value}</Select.Option>
                                        })}
                                    </Select>
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