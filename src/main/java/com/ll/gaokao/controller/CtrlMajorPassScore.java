package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ll.gaokao.service.MgmtMajorPassScore;

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
}
