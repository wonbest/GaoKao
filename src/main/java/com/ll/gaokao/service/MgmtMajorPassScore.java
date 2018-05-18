package com.ll.gaokao.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ll.gaokao.dao.RepoMajorPassScore;
import com.ll.gaokao.model.MajorPassScore;

@Service
public class MgmtMajorPassScore {
	@Autowired
	private RepoMajorPassScore dao;

	/** 加载录取批次信息 */
	public List<String> findDistinctBatch() {
		return dao.findBatch();
	}
	
	public List<String> findDistinctYears() {
		return dao.findYears();
	}

	/** 加载学生类别信息（文理科） */
	public List<String> findDistinctStudentType() {
		return dao.findStudentType();
	}

	/** 加载专业信息 */
	public List<String> findDistinctSpecialTyName() {
		return dao.findSpecialTyName();
	}

	public Page<MajorPassScore> queryPageBySearchParams(Pageable pageable, List<String> province, List<String> batch,
			List<String> year, String schoolName) {
		Specification<MajorPassScore> specification = new Specification<MajorPassScore>() {

			@Override
			public Predicate toPredicate(Root<MajorPassScore> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> pathProvince = root.get("localprovince");
				Path<String> pathBatch = root.get("batch");
				Path<String> pathYear = root.get("year");
				Path<String> pathSchoolName = root.get("schoolname");
				List<Predicate> lsPredicates = new ArrayList<>();
				if (province != null && province.size() > 0) {
					In<String> in = cb.in(pathProvince);
					for (String str : province) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (batch != null && batch.size() > 0) {
					In<String> in = cb.in(pathBatch);
					for (String str : batch) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (year != null && year.size() > 0) {
					In<String> in = cb.in(pathYear);
					for (String str : year) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (!schoolName.equals("")) {
					lsPredicates.add(cb.equal(pathSchoolName, schoolName));
				}
				Predicate[] p = new Predicate[lsPredicates.size()];
				return cb.and(lsPredicates.toArray(p));
			}
		};
		return dao.findAll(specification, pageable);
	}
}
