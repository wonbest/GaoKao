import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import * as moment from 'moment'
import { observer } from 'mobx-react'

import Content from './content'
import store from '../../public/ts/store'

$(() => {
    ReactDOM.render(
        <BrowserRouter>
            <Content store={store} />
        </BrowserRouter>
        , document.getElementById("root"))
})