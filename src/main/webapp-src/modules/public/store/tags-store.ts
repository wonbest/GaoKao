import { observable, action, computed } from 'mobx'

/**
 * 所有的查询标签数据源
 */
class TagsStore {

    /** 专业类型标签数据源 */
    @observable majorTypeTagsData: any[]
    /** 学校所在省份标签数据源 */
    @observable schoolProvinceTagsData: any[]
    /** 学校类型标签数据源 */
    @observable schoolTypeTagsData: any[]
    /** 学历层次标签数据源 */
    @observable educationTagsData: any[]
    /** 录取批次年份数据源 */
    @observable batchTagsData: any[]
    /** 年份标签数据源 */
    @observable yearTagsData: any[]

    constructor() {
        this.majorTypeTagsData = observable([])
        this.schoolProvinceTagsData = observable([])
        this.schoolTypeTagsData = observable([])
        this.educationTagsData = observable([])
        this.batchTagsData = observable([])
        this.yearTagsData = observable([])
    }

    @action initMajorTypeTags = () => {

    }

    @action initSchoolProvince = () => {

    }

    @action initSchoolType = () => {

    }

    @action initEducation = () => {

    }

    @action initBatch = () => {

    }

    @action initYear = () => {

    }
}

export default new TagsStore()