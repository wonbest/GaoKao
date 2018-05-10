import * as React from 'react'
import * as ReactDom from 'react-dom'

export default class MajorPassScore extends React.Component<any, any> {
    render() {
        return (
            <div>...</div>
        )
    }
}

interface ToolBarProps {
    onSubmit: () => void
}
interface ToolBarStates {
    majorTypeTagsData: any[]
    majorTypeSelectedTags: any[]

    schoolProvinceTagsData: any[]
    schoolProvinceSelectedTags: any[]

    schoolTypeTagsData: any[]
    schoolTypeSelectedTags: any[]

    educationTagsData: any[]
    educationSelectedTags: any[]

    batchTagsData: any[]
    batchSelectedTags: any[]

    yearTagsData: any[]
    yearSelectedTags: any[]

}
class ToolBar extends React.Component<ToolBarProps, ToolBarStates> {
    constructor(props) {
        super(props)
    }
}