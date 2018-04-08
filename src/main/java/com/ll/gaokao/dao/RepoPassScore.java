package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ll.gaokao.model.PassScore;

public interface RepoPassScore extends JpaRepository<PassScore, String> {
	@Query(value="select distinct province from pass_score", nativeQuery=true)
	public List<String> findProvince();
}
