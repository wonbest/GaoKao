package com.ll.gaokao.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CtrlIndex {
	@RequestMapping(value = "toIndex")
	public String toIndex() {
		return "modules/index/html/index";
	}
}
