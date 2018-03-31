import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Row, Col } from 'antd'

import Nav from '../../public/ts/nav'
import PageHeader from '../../public/ts/page-header'

export default class Content extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Row>
                    <PageHeader />
                </Row>
                <Row>
                    <Nav />
                </Row>
            </div>

        )
    }
}