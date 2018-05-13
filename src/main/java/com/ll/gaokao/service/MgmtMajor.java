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

import com.ll.gaokao.dao.RepoMajor;
import com.ll.gaokao.model.Major;

@Service
public class MgmtMajor {
	@Autowired
	private RepoMajor dao;

	/** 查询专业层次（本科/专科） */
	public List<String> findAllMajorLevel() {
		return dao.findAllMajorLevel();
	}

	/** 查询专业类别 */
	public List<String> findAllMajorType() {
		return dao.findAllMajorType();
	}

	/**
	 * 根据专业类型查询所有专业
	 * 
	 * @param majorType
	 * @return
	 */
	public List<String> findByMajorType(String majorType) {
		return dao.findByZytype(majorType);
	}

	public Page<Major> queryPageBySearchParams(Pageable pageable, List<String> majorType, List<String> majorLevel) {
		Specification<Major> specification = new Specification<Major>() {

			@Override
			public Predicate toPredicate(Root<Major> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> pathMajorType = root.get("zytype");
				Path<String> pathMajorLevel = root.get("zycengci");
				List<Predicate> lsPredicates = new ArrayList<>();
				if (majorType != null && majorType.size() > 0) {
					In<String> in = cb.in(pathMajorType);
					for (String str : majorType) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (majorLevel != null && majorLevel.size() > 0) {
					In<String> in = cb.in(pathMajorLevel);
					for (String str : majorLevel) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				Predicate[] p = new Predicate[lsPredicates.size()];
				return cb.and(lsPredicates.toArray(p));
			}
		};
		return dao.findAll(specification, pageable);
	}
}
