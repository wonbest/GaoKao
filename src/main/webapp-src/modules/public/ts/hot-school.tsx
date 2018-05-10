import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Card, Avatar } from 'antd'
import { List, Tooltip } from 'antd'

interface HotSchoolProps {

}
interface HotSchoolStates {
    dataSource: any[]
}
export default class HotSchool extends React.Component<HotSchoolProps, HotSchoolStates> {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }

    fetchDataSource = (params = {}) => {
        $.ajax({
            url: 'getHotSchool',
            data: {
                ...params
            },
            type: 'post',
            success: (data) => {
                if (data.state) {
                    this.setState({
                        dataSource: data.result
                    })
                }
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
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar size="large" src={"https://gkcx.eol.cn/upload/schoollogo/" + item.schoolid + ".jpg"} />}
                                title={<a href={item.guanwang} target="blank" >{item.schoolname}</a>}
                                description={<Tooltip title={item.jianjie}>
                                    <span className="ellipsis">{item.jianjie}</span>
                                </Tooltip>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}