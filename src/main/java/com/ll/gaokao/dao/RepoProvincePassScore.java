package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ll.gaokao.model.ProvincePassScore;

public interface RepoProvincePassScore extends JpaRepository<ProvincePassScore, String> {
	
	@Query(value="select distinct province from pass_score", nativeQuery=true)
	public List<String> findProvince();
	
	@Query(value="select distinct year from pass_score", nativeQuery=true)
	public List<String> findYear();
	
	@Query(value="select distinct bath from pass_score", nativeQuery=true)
	public List<String> findBath();
	
	@Query(value="select distinct type from pass_score", nativeQuery=true)
	public List<String> findType();
	
	public Page<ProvincePassScore> findAll(Specification<ProvincePassScore> specification, Pageable pageable);
}
