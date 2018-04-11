package com.ll.gaokao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ll.gaokao.dao.RepoSchool2ProvincePassScore;

@Service
public class MgmtSchool2ProvincePassScore {
	@Autowired
	private RepoSchool2ProvincePassScore dao;
}
