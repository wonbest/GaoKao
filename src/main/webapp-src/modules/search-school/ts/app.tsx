import * as React from 'react'
import * as ReactDom from 'react-dom'

import {Row, Col} from 'antd'

import SchoolTable from './schoolTable'
import Toolbar from './toolbar'

export default class SearchSchool extends React.Component<any, any>{
    render() {
        return (
            <div>
                <Row><Toolbar /></Row>
                <Row><SchoolTable /></Row>
            </div>
        )
    }
}