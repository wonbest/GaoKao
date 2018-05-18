package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ll.gaokao.model.MajorPassScore;
import com.ll.gaokao.service.MgmtMajorPassScore;
import com.ll.gaokao.util.BGDataGrid;
import com.ll.gaokao.util.BGPageModel;
import com.ll.gaokao.util.ResultJson;

/**
 * 历年各专业的分数线
 * 
 * @author LL
 *
 */
@Controller
public class CtrlMajorPassScore {
	@Autowired
	private MgmtMajorPassScore mgmtMajorPassScore;

	@RequestMapping(value = "getDistinctYears")
	@ResponseBody
	public ResultJson getDistinctYears() {
		try {
			return ResultJson.trueState("success", mgmtMajorPassScore.findDistinctYears());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 查询录取批次信息，为批次标签组提供数据
	 * 
	 * @return 本科一批...
	 */
	@RequestMapping(value = "getDistinctBatch")
	@ResponseBody
	public ResultJson getDistinctBatch() {
		try {
			return ResultJson.trueState("success", mgmtMajorPassScore.findDistinctBatch());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 查询学生类别
	 * 
	 * @return 文科 理科 不分科
	 */
	@RequestMapping(value = "findDistinctStudentType")
	@ResponseBody
	public ResultJson findDistinctStudentType() {
		try {
			return ResultJson.trueState("success", mgmtMajorPassScore.findDistinctStudentType());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 查询专业信息
	 * 
	 * @return 电子信息类，土木类...
	 */
	@RequestMapping(value = "findDistinctSpecialTyName")
	@ResponseBody
	public ResultJson findDistinctSpecialTyName() {
		try {
			return ResultJson.trueState("success", mgmtMajorPassScore.findDistinctSpecialTyName());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}

	/**
	 * 动态查询
	 * 
	 * @param pageModel
	 * @param province
	 * @param batch
	 * @param year
	 * @return
	 */
	@RequestMapping(value = "getMajorPassScoreList")
	@ResponseBody
	public BGDataGrid getMajorPassScoreList(BGPageModel pageModel, String province, String batch, String year,
			String schoolName) {
		Page<MajorPassScore> page = mgmtMajorPassScore.queryPageBySearchParams(pageModel.bePageable(),
				province.equals("") ? null : JSON.parseArray(province, String.class),
				batch.equals("") ? null : JSON.parseArray(batch, String.class),
				year.equals("") ? null : JSON.parseArray(year, String.class), schoolName);
		return BGDataGrid.newInstance(page);
	}
}
