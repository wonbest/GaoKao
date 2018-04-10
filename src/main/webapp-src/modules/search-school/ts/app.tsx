import * as React from 'react'
import * as ReactDom from 'react-dom'

import {Row, Col} from 'antd'

import { observer } from 'mobx-react'

import SchoolTable from './schoolTable'
import Toolbar from './toolbar'

interface SearchSchoolProps {
    store: any
}
@observer
export default class SearchSchool extends React.Component<SearchSchoolProps, any>{
    render() {
        return (
            <div style={{marginTop: '5px'}}>
                {/* <Row><Toolbar store={this.props.store} /></Row> */}
                <Row><SchoolTable store={this.props.store} /></Row>
            </div>
        )
    }
}