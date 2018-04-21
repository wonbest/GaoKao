package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ll.gaokao.model.School;

public interface RepoSchool extends JpaRepository<School, String> {
	@Query(value = "select distinct schooltype from school", nativeQuery = true)
	public List<String> findAllSchooltype();

	@Query(value = "select distinct schoolproperty from school", nativeQuery = true)
	public List<String> findAllSchoolproperty();

	@Query(value = "select distinct schoolnature from school", nativeQuery = true)
	public List<String> findAllSchoolNature();

	public Page<School> findAll(Specification<School> specification, Pageable pageable);

//	@Query(value = "select * from school order by clicks+0 desc", nativeQuery = true)
//	public List<School> findTop5();

}
