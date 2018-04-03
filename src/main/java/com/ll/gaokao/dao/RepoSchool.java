package com.ll.gaokao.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ll.gaokao.model.School;

public interface RepoSchool extends JpaRepository<School, String> {
	
}
