package com.ll.gaokao.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	 * 分页获取学校列表
	 * 按ranking字段排序
	 * @param pageModel
	 * @return
	 */
	@RequestMapping(value = "getSchoolList")
	@ResponseBody
	public BGDataGrid getSchoolList(
			BGPageModel pageModel, 
			String[] schoolType, 
			String[] province, 
			String[] schoolProperty, 
			String[] specialProps) {
		Map<String, String> sort = pageModel.getSort();
		sort.clear();
		sort.put("ranking", Direction.ASC.toString());
		Page<School> page = mgmtSchool.queryPageFindAll(
				pageModel.bePageable(sort),
				schoolType,
				province, 
				schoolProperty, 
				specialProps);
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

//	/**
//	 * 测试动态条件查询
//	 * @return
//	 */
//	@RequestMapping(value = "testPage")
//	@ResponseBody
//	public BGDataGrid testPage() {
//		BGPageModel pageModel = new BGPageModel();
//		pageModel.setCurrent(1);
//		pageModel.setRowCount(10);
//		Page<School> page = mgmtSchool.queryPageFindAll(pageModel.bePageable(), "陕西", "");
//		return BGDataGrid.newInstance(page);
//	}
}
