package com.ll.gaokao.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ll.gaokao.model.Major;

public interface RepoMajor extends JpaRepository<Major, String> {
	public List<Major> findByZyType(String type);
}
