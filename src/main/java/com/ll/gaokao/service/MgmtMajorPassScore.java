package com.ll.gaokao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ll.gaokao.dao.RepoMajorPassScore;

@Service
public class MgmtMajorPassScore {
	@Autowired
	private RepoMajorPassScore dao;
}
