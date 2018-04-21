package com.ll.gaokao.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ll.gaokao.model.School;
import com.ll.gaokao.service.MgmtSchool;
import com.ll.gaokao.util.BGDataGrid;
import com.ll.gaokao.util.BGPageModel;
import com.ll.gaokao.util.ResultJson;

@Controller
public class CtrlSchool {

	@Autowired
	private MgmtSchool mgmtSchool;

	/**
	 * 获取学校学历层次
	 * @return
	 */
	@RequestMapping(value = "getAllSchoolType")
	@ResponseBody
	public ResultJson getAllSchoolType() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool.findAllSchooltype());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 获取所有学校类型
	 * @return
	 */
	@RequestMapping(value = "getAllSchoolProperty")
	@ResponseBody
	public ResultJson getAllSchoolProperty() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool.findAllSchoolProperty());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
	
	/**
	 * 获取所有学校性质
	 * @return
	 */
	@RequestMapping(value = "getAllSchoolNature")
	@ResponseBody
	public ResultJson getAllSchoolNature() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool.findAllSchoolNature());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 分页获取学校列表
	 * 按ranking字段排序
	 * @param pageModel
	 * @return
	 */
	@RequestMapping(value = "getSchoolList")
	@ResponseBody
	public BGDataGrid getSchoolList(
			BGPageModel pageModel, 
			String schoolType, 
			String province, 
			String schoolProperty, 
			String schoolNature) {
		Map<String, String> sort = pageModel.getSort();
		sort.clear();
		sort.put("ranking", Direction.ASC.toString());
		Page<School> page = mgmtSchool.queryPageFindAll(
				pageModel.bePageable(sort),
				JSON.parseArray(schoolType, String.class),
				JSON.parseArray(province, String.class), 
				JSON.parseArray(schoolProperty, String.class), 
				JSON.parseArray(schoolNature, String.class));
		return BGDataGrid.newInstance(page);
	}

	/**
	 * 获取热门院校
	 * @return
	 */
	@RequestMapping(value = "getHotSchool")
	@ResponseBody
	public ResultJson getHotSchool() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool.findHot());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
	
}
