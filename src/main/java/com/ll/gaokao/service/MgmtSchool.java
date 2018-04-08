package com.ll.gaokao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ll.gaokao.dao.RepoSchool;
import com.ll.gaokao.model.School;

@Service
public class MgmtSchool {
	@Autowired
	private RepoSchool dao;
	
	public List<String> findAllSchooltype() {
		return dao.findAllSchooltype();
	}
	
	public List<String> findAllSchoolProperty() {
		return dao.findAllSchoolproperty();
	}
	
	public List<School> findAll() {
		return dao.findAll();
	}
	
	public List<School> findHot() {
		return dao.findTop5();
	}
	
//	public Page<School> queryPageFindAll(Pageable pageable) {
//		return dao.queryPagefindAll(pageable);
//	}
}
