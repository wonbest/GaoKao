import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Link } from 'react-router-dom'

import { Affix, Button } from 'antd'
import { Row, Col } from 'antd'
import { Divider } from 'antd'

interface NavProps {
    onChange: (param: string)=>void
}
export default class Nav extends React.Component<NavProps, any> {
    private rowStyle: React.CSSProperties = {
        backgroundColor: '#108ee9',
        width: '100%',
        height: '40px',
        lineHeight: '40px'
    }

    private aStyle: React.CSSProperties = {
        color: 'white',
        fontSize: '18px'
    }

    handleNavOnClick = (key: string) => {
        this.props.onChange(key)
    }

    render() {
        return (
            <Affix>
                <Row style={this.rowStyle}>
                    {/* <Col span={2} offset={2}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 'index')}
                            style={this.aStyle}>
                            首页
                        </a>
                    </Col> */}
                    <Col span={2} offset={2}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 's_school')}
                            style={this.aStyle}>
                            查学校
                        </a>
                    </Col>
                    <Col span={2}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 's_major')}
                            style={this.aStyle}>
                            查专业
                        </a>
                    </Col>
                    <Col span={2}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 's_pass_score')}
                            style={this.aStyle}>
                            查分数线
                        </a>
                    </Col>
                    <Col span={2}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 'wish')}
                            style={this.aStyle}>
                            志愿推荐
                        </a>
                    </Col>
                    {/* <Col span={4} offset={8}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 'login')}
                            style={{ color: 'white', fontSize: '15px' }}>
                            登陆
                        </a>
                        <Divider type="vertical" />
                        <a
                            onClick={this.handleNavOnClick.bind(this, 'register')}
                            style={{ color: 'white', fontSize: '15px' }}>
                            注册
                        </a>
                    </Col> */}
                </Row>
            </Affix>
        )
    }
}