import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Card } from 'antd'

import * as moment from 'moment'

interface CountDownProps {

}
interface CountDownStates {
    year: string
    days: string
}
export default class CountDown extends React.Component<CountDownProps, CountDownStates> {

    constructor(props) {
        super(props)
        this.state = {
            year: '',
            days: ''
        }
    }

    componentDidMount() {
        let today = moment()
        let target = moment(today.year() + '-06-' + '07', 'YYYY-MM-DD')
        let days = (target.valueOf() - today.valueOf()) / (24 * 60 * 60 * 1000)
        this.setState({
            year: today.year().toString(),
            days: Math.floor(days).toString()
        })
    }

    render() {
        const style: React.CSSProperties = {
            color: 'red',
            fontSize: '25px',
        }
        return (
            <div>
                距离
                <span style={style}>{this.state.year}</span>
                年高考还有
                <span style={style}>{this.state.days}</span>
                天
            </div>
        )
    }
}