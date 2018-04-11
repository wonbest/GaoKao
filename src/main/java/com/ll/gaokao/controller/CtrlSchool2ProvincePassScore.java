package com.ll.gaokao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ll.gaokao.service.MgmtSchool2ProvincePassScore;

/**
 * 学校在各省的分数线
 * 
 * @author LL
 *
 */
@Controller
public class CtrlSchool2ProvincePassScore {
	@Autowired
	private MgmtSchool2ProvincePassScore mgmtSchool2ProvincePassScore;
}
