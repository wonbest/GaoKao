package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ll.gaokao.model.Major;
import com.ll.gaokao.service.MgmtMajor;
import com.ll.gaokao.util.BGDataGrid;
import com.ll.gaokao.util.BGPageModel;
import com.ll.gaokao.util.ResultJson;

@Controller
public class CtrlMajor {

	@Autowired
	private MgmtMajor mgmtMajor;

	@RequestMapping(value = "findAllMajorLevel")
	@ResponseBody
	public ResultJson findAllMajorLevel() {
		try {
			return ResultJson.trueState("获取成功！", mgmtMajor.findAllMajorLevel());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	@RequestMapping(value = "findAllMajorType")
	@ResponseBody
	public ResultJson findAllMajorType() {
		try {
			return ResultJson.trueState("获取成功！", mgmtMajor.findAllMajorType());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 分页获取专业列表， 动态查询
	 * 
	 * @return BGDataGrid
	 */
	@RequestMapping(value = "getMajorList")
	@ResponseBody
	public BGDataGrid getMajorList(BGPageModel pageModel, String majorType, String majorLevel) {
		Page<Major> page = mgmtMajor.queryPageBySearchParams(pageModel.bePageable(),
				JSON.parseArray(majorType, String.class), JSON.parseArray(majorLevel, String.class));
		return BGDataGrid.newInstance(page);
	}
}
