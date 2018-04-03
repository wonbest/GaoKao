package com.ll.gaokao.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ll.gaokao.model.PassScore;

public interface RepoPassScore extends JpaRepository<PassScore, String> {
	
}
