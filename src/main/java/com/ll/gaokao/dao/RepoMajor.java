package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ll.gaokao.model.Major;

public interface RepoMajor extends JpaRepository<Major, String> {
	@Query(value="select * from major where zytype = ?1", nativeQuery=true)
	public List<Major> findByZytype(String type);
}
