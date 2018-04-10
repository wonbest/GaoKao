import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import * as moment from 'moment'
import { observer } from 'mobx-react'

import Content from './content'
import store from '../../public/ts/store'

// @observer
// class TestMobx extends React.Component<any, any> {
//     onclick = () => {
//         this.props.store.count += 1
//     }
//     render() {
//         return (
//             <span>
//                 <button onClick={this.onclick} >{this.props.store.count}</button>
//             </span>
//         )
//     }
// }

$(() => {
    ReactDOM.render(
        <BrowserRouter>
            <Content store={store} />
        </BrowserRouter>
        , document.getElementById("root"))
})