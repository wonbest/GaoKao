package com.ll.gaokao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ll.gaokao.dao.RepoPassScore;

@Service
public class MgmtPassScore {
	@Autowired
	private RepoPassScore dao;
	
	public List<String> findProvince() {
		return dao.findProvince();
	}
}
