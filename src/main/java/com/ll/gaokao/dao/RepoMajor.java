package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ll.gaokao.model.Major;

public interface RepoMajor extends JpaRepository<Major, String> {

	public Page<Major> findAll(Specification<Major> specification, Pageable pageable);

	@Query(value = "select distinct zytype from major", nativeQuery = true)
	public List<String> findAllMajorType();

	@Query(value = "select distinct zycengci from major", nativeQuery = true)
	public List<String> findAllMajorLevel();

	@Query(value = "select specialname from major where zytype=?1", nativeQuery = true)
	public List<String> findByZytype(String zytype);
}
