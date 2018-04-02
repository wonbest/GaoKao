import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Row, Col } from 'antd'

import PageRight from '../../public/ts/page-right'

import Nav from '../../public/ts/nav'
import PageHeader from '../../public/ts/page-header'
import SearchSchool from '../../search-school/ts/app'

interface ContentStates {
    content: any
}
export default class Content extends React.Component<any, any> {
    state = {
        content: <SearchSchool />
    }

    render() {
        return (
            <div>
                <Row>
                    <PageHeader />
                </Row>
                <Row>
                    <Nav />
                </Row>
                <Row>
                    <Col span={14} offset={2}>
                        {this.state.content}
                    </Col>
                    <Col span={7} offset={1}>
                        <PageRight />
                    </Col>
                </Row>
            </div>
        )
    }
}