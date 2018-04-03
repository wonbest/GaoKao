package com.ll.gaokao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ll.gaokao.model.Major;
import com.ll.gaokao.service.MgmtMajor;

@Controller
public class CtrlMajor {
	
	@Autowired
	private MgmtMajor mgmtMajor;
	
	@RequestMapping(value="getMajorByType")
	@ResponseBody
	public List<Major> getMajorByType(String type) {
		return mgmtMajor.findByZyType(type);
	}
}
