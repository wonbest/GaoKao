package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ll.gaokao.model.MajorPassScore;

public interface RepoMajorPassScore extends JpaRepository<MajorPassScore, String> {
	
	public Page<MajorPassScore> findAll(Specification<MajorPassScore> specification, Pageable pageable);
	
	@Query(value = "select distinct year from major_pass_score", nativeQuery = true)
	public List<String> findYears();
	
	@Query(value = "select distinct batch from major_pass_score", nativeQuery = true)
	public List<String> findBatch();

	@Query(value = "select distinct studenttype from major_pass_score", nativeQuery = true)
	public List<String> findStudentType();

	@Query(value = "select distinct specialtyname from major_pass_score", nativeQuery = true)
	public List<String> findSpecialTyName();
}
