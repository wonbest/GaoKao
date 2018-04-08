package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ll.gaokao.service.MgmtPassScore;
import com.ll.gaokao.util.ResultJson;

@Controller
public class CtrlPassScore {
	@Autowired
	private MgmtPassScore mgmtPassScore;
	
	@RequestMapping(value="getAllProvince")
	@ResponseBody
	public ResultJson getAllProvince() {
		try {
			return ResultJson.trueState("获取成功！", mgmtPassScore.findProvince());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
}
