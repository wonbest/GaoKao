package com.ll.gaokao.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CtrlLogin {
	
	@RequestMapping(value="/toLogin")
	public String toLogin() {
		return "modules/login/html/index";
	}
}
