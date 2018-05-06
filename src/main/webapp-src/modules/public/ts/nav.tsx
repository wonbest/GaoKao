import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Link } from 'react-router-dom'

import { Affix, Button } from 'antd'
import { Row, Col } from 'antd'
import { Divider } from 'antd'
import { Menu } from 'antd'

interface NavProps {
    onChange: (param: string) => void
}
interface NavStates {
    current: string
}
export default class Nav extends React.Component<NavProps, NavStates> {
    state: NavStates = {
        current: 's_school'
    }

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

    private colStyle: React.CSSProperties = {
        textAlign: 'center',
        maxHeight: '40px',
    }

    handleNavOnClick = (key: string) => {
        this.setState({
            current: key
        }, () => {
            this.props.onChange(key)
        })
    }

    checkSelected = (value: string) => {
        let css = {
            textAlign: 'center',
            backgroundColor: '#0000EE',
            maxHeight: '40px',
        }
        return this.state.current === value ? css : this.colStyle
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
                    <Col span={2} offset={2} style={this.checkSelected("s_school")}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 's_school')}
                            style={this.aStyle}>
                            选学校
                        </a>
                    </Col>
                    <Col span={2} style={this.checkSelected("s_major")}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 's_major')}
                            style={this.aStyle}>
                            选专业
                        </a>
                    </Col>
                    <Col span={2} style={this.checkSelected("s_pass_score")}>
                        <a
                            onClick={this.handleNavOnClick.bind(this, 's_pass_score')}
                            style={this.aStyle}>
                            查分数线
                        </a>
                    </Col>
                    <Col span={2} style={this.checkSelected("wish")}>
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