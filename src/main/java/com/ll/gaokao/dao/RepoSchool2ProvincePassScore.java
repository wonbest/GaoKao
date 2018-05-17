package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ll.gaokao.model.School2ProvincePassScore;

public interface RepoSchool2ProvincePassScore extends JpaRepository<School2ProvincePassScore, String> {

	public Page<School2ProvincePassScore> findAll(Specification<School2ProvincePassScore> specification, Pageable pageable);

	@Query(value="select distinct province from school_pass_score", nativeQuery=true)
	public List<String> findSchoolProvince();
	
	@Query(value="select distinct localprovince from school_pass_score", nativeQuery=true)
	public List<String> findStudentProvince();
	
	@Query(value="select distinct year from school_pass_score", nativeQuery=true)
	public List<String> findYear();
	
	@Query(value="select distinct batch from school_pass_score", nativeQuery=true)
	public List<String> findBatch();
	
	@Query(value="select distinct studenttype from school_pass_score", nativeQuery=true)
	public List<String> findStudentType();
	
	@Query(value="select fencha from school_pass_score where year=?1", nativeQuery=true)
	public List<String> getDifference(String year);
}
