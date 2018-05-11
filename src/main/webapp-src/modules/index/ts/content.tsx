import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Switch, Route } from 'react-router-dom'

import { Row, Col } from 'antd'

import { observer, inject } from 'mobx-react'

import PageRight from '../../public/ts/page-right'

import Nav from '../../public/ts/nav'
import PageHeader from '../../public/ts/page-header'
import SearchSchool from '../../search-school/ts/app'
import SearchMajor from '../../search-major/ts/app'
import SearchPassScore from '../../search-pass-score/ts/app'
import Wish from '../../wish/ts/app'

interface ContentProps {
    store?: any
}
interface ContentStates {
    content: any
}
@inject("store")
@observer
export default class Content extends React.Component<ContentProps, ContentStates> {

    constructor(props) {
        super(props)
        this.state = {
            content: <SearchSchool store={this.props.store.tagsStore} />
        }
    }

    changePage = (page: string) => {
        switch (page) {
            case 's_school':
                this.setState({
                    content: <SearchSchool store={this.props.store.tagsStore} />
                })
                break
            case 's_major':
                this.setState({
                    content: <SearchMajor />
                })
                break
            case 's_pass_score':
                this.setState({
                    content: <SearchPassScore />
                })
                break
            case 'wish':
                this.setState({
                    content: <Wish />
                })
                break
            default:
                break
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <PageHeader />
                </Row>
                <Row>
                    <Nav onChange={this.changePage} />
                </Row>
                <Row gutter={16} style={{ marginTop: '5px' }} >
                    <Col span={14} offset={2}>
                        {this.state.content}
                    </Col>
                    <Col span={6}>
                        <PageRight />
                    </Col>
                </Row>
                <Row className="footer">
                    版权所有@安康学院 电子信息与工程学院 2018 <br />
                    Mail to: 1059997113@qq.com
                </Row>
            </div>
        )
    }
}