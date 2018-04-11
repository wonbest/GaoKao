import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Tabs } from 'antd'

import MajorPassScore from './major-pass-score'
import ProvincePassScore from './province-pass-score'
import SchoolPassScore from './school-pass-score'

export default class SearchPassScore extends React.Component<any, any> {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="各省省控线" key="1" >
                    <ProvincePassScore />
                </Tabs.TabPane>
                <Tabs.TabPane tab="各校分数线" key="2" >
                    <SchoolPassScore />
                </Tabs.TabPane>
                <Tabs.TabPane tab="专业分数线" key="3" >
                    <MajorPassScore />
                </Tabs.TabPane>
            </Tabs>
        )
    }
}