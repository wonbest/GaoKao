package com.ll.gaokao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ll.gaokao.dao.RepoSchool;

@Service
public class MgmtSchool {
	@Autowired
	private RepoSchool dao;
	
	public List<String> findAllSchooltype() {
		return dao.findAllSchooltype();
	}
}
