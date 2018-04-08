package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ll.gaokao.service.MgmtMajor;
import com.ll.gaokao.util.ResultJson;

@Controller
public class CtrlMajor {
	
	@Autowired
	private MgmtMajor mgmtMajor;
	
	@RequestMapping(value="getMajorByType")
	@ResponseBody
	public ResultJson getMajorByType() {
		return ResultJson.trueState("获取成功！", mgmtMajor.findByZyType("哲学类"));
	}
}
