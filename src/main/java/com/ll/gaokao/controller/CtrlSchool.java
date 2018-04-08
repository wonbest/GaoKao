package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ll.gaokao.service.MgmtSchool;
import com.ll.gaokao.util.ResultJson;

@Controller
public class CtrlSchool {
	
	@Autowired
	private MgmtSchool mgmtSchool;
	
	@RequestMapping(value="getAllSchoolType")
	@ResponseBody
	public ResultJson getAllSchoolType() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool.findAllSchooltype());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
	
	@RequestMapping(value="getAllSchoolProperty")
	@ResponseBody
	public ResultJson getAllSchoolProperty() {
		try {
			return ResultJson.trueState("获取成功！", mgmtSchool.findAllSchoolProperty());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
}
