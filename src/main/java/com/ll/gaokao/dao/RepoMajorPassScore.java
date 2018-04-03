package com.ll.gaokao.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ll.gaokao.model.MajorPassScore;

public interface RepoMajorPassScore extends JpaRepository<MajorPassScore, String> {
	
}
