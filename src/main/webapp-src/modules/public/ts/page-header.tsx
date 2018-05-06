import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Row, Col } from 'antd'

import CountDown from '../../public/ts/countDown'

export default class PageHeader extends React.Component<any, any> {
    render() {
        return (
            <Row style={{
                height: '80px',
                width: "100%",
                lineHeight: '80px'
            }}>
                <Col span={8} offset={2}>
                    <h1 style={{
                        fontSize: '30px',
                        fontFamily: '楷书'
                    }}>高考志愿推荐系统</h1>
                </Col>
                <Col span={6} offset={8} >
                    <CountDown />
                </Col>
            </Row>
        )
    }
}