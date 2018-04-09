import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Row, Col } from 'antd'

import { observer } from 'mobx-react'

import PageRight from '../../public/ts/page-right'

import Nav from '../../public/ts/nav'
import PageHeader from '../../public/ts/page-header'
import SearchSchool from '../../search-school/ts/app'

interface ContentProps {
    store: any
}
interface ContentStates {
    content: any
}
@observer
export default class Content extends React.Component<ContentProps, any> {
    state = {
        content: <SearchSchool store={this.props.store} />
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
                <Row className="footer">
                    版权所有@安康学院 电子信息与工程学院 2018 <br/>
                    Mail to: 1059997113@qq.com
                </Row>
            </div>
        )
    }
}