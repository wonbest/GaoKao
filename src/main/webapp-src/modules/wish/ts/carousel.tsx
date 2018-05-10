import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Carousel } from 'antd'

export default class Images extends React.Component {
    render() {
        return (
            <Carousel autoplay >
                <div><img src="../imgs/6.jpg" /></div>
                <div><img src="../imgs/1.jpg" /></div>
                <div><img src="../imgs/2.jpg" /></div>
                <div><img src="../imgs/3.jpg" /></div>
                <div><img src="../imgs/5.jpg" /></div>
            </Carousel>
            )
        }
}