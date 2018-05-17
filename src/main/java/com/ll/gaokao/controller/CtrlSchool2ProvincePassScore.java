package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ll.gaokao.model.School2ProvincePassScore;
import com.ll.gaokao.service.MgmtSchool2ProvincePassScore;
import com.ll.gaokao.util.BGDataGrid;
import com.ll.gaokao.util.BGPageModel;
import com.ll.gaokao.util.ResultJson;

/**
 * 学校在各省的分数线
 * 
 * @author LL
 *
 */
@Controller
public class CtrlSchool2ProvincePassScore {
	@Autowired
	private MgmtSchool2ProvincePassScore mgmtSchool2ProvincePassScore;

	@RequestMapping(value = "getWish")
	@ResponseBody
	public BGDataGrid getWish(BGPageModel pageModel, String studentProvince, String risk, String score,
			String passScore, String schoolProvince, String studentType) {
		Page<School2ProvincePassScore> page = mgmtSchool2ProvincePassScore.getWish(pageModel.bePageable(),
				studentProvince, risk, score, passScore, JSON.parseArray(schoolProvince, String.class), studentType);
		return BGDataGrid.newInstance(page);
	}

	@RequestMapping(value = "getSearchTagsData")
	@ResponseBody
	public ResultJson getSearchTagsData() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool2ProvincePassScore.findSearchTags());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 查找所有生源地数据
	 * 
	 * @return
	 */
	@RequestMapping(value = "getLocalProvince")
	@ResponseBody
	public ResultJson getLocalProvince() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool2ProvincePassScore.findLocalProvince());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 动态查询
	 * 
	 * @param pageModel
	 * @param schoolProvince
	 * @param studentProvince
	 * @param studentType
	 * @param year
	 * @param batch
	 * @return
	 */
	@RequestMapping(value = "getSchoolPassScore")
	@ResponseBody
	public BGDataGrid getSchoolPassScore(BGPageModel pageModel, String schoolProvince, String studentProvince,
			String studentType, String year, String batch) {
		Page<School2ProvincePassScore> page = mgmtSchool2ProvincePassScore.queryPageFindAll(pageModel.bePageable(),
				JSON.parseArray(schoolProvince, String.class), JSON.parseArray(studentProvince, String.class),
				JSON.parseArray(studentType, String.class), JSON.parseArray(year, String.class),
				JSON.parseArray(batch, String.class));
		return BGDataGrid.newInstance(page);
	}
}
