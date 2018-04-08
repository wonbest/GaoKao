import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Card, Avatar } from 'antd'
import { List } from 'antd'

interface HotSchoolStates {
    dataSource: any[]
}
export default class HotSchool extends React.Component<any, HotSchoolStates> {
    state: HotSchoolStates = {
        dataSource: []
    }

    private testData = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
        ,
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
        ,
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ]

    fetchDataSource = (params = {}) => {
        $.ajax({
            url: '',
            type: 'post',
            success: (data) => {
                this.setState({
                    dataSource: this.testData
                })
            }
        })
    }

    componentDidMount() {
        this.fetchDataSource()
    }

    render() {
        return (
            <Card title="热门高校">
                <List
                    dataSource={this.state.dataSource}
                    renderItem={item => {
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    }} />
            </Card>
        )
    }
}