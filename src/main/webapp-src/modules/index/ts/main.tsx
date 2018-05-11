import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import * as moment from 'moment'
import { Provider } from 'mobx-react'

import Content from './content'
import store from '../../public/ts/store'

$(() => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Content />
            </Provider>
        </BrowserRouter>
        , document.getElementById("root"))
})