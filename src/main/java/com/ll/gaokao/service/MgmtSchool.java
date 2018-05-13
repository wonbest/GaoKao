package com.ll.gaokao.service;

import java.util.ArrayList;
import java.util.Comparator;
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

import com.ll.gaokao.dao.RepoSchool;
import com.ll.gaokao.model.School;

@Service
public class MgmtSchool {
	@Autowired
	private RepoSchool dao;

	/**
	 * 查询学校的学历层次 普通本科 高职高专...
	 * 
	 * @return
	 */
	public List<String> findAllSchooltype() {
		return dao.findAllSchooltype();
	}

	/**
	 * 查询学校属性 农林类 理工类...
	 * 
	 * @return
	 */
	public List<String> findAllSchoolProperty() {
		return dao.findAllSchoolproperty();
	}

	/**
	 * 查询所有学校名称
	 * 
	 * @return
	 */
	public List<String> findAllSchoolName() {
		return dao.findAllSchoolName();
	}

	/**
	 * 查询学校性质 公办 民办..
	 * 
	 * @return
	 */
	public List<String> findAllSchoolNature() {
		return dao.findAllSchoolNature();
	}

	public Page<School> findAll(Pageable pageable) {
		return dao.findAll(pageable);
	}

	public List<School> findHot() {
		List<School> lsSchools = dao.findAll();
		lsSchools.sort(new Comparator<School>() {
			@Override
			public int compare(School s1, School s2) {
				return Integer.parseInt(s2.getClicks()) - Integer.parseInt(s1.getClicks());
			}
		});
		return lsSchools.subList(0, 8);
	}

	/**
	 * 动态查询
	 * 
	 * @param pageable
	 * @param schoolType
	 * @param province
	 * @param schoolProperty
	 * @param schoolNature
	 * @return
	 */
	public Page<School> queryPageFindAll(Pageable pageable, List<String> schoolType, List<String> province,
			List<String> schoolProperty, List<String> schoolNature) {
		Specification<School> specification = new Specification<School>() {

			@Override
			public Predicate toPredicate(Root<School> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> pathProvince = root.get("province");
				Path<String> pathSchoolType = root.get("schooltype");
				Path<String> pathSchoolProperty = root.get("schoolproperty");
				Path<String> pathSchoolNature = root.get("schoolnature");
				List<Predicate> lsPredicates = new ArrayList<>();
				if (province != null && province.size() > 0) {
					In<String> in = cb.in(pathProvince);
					for (String str : province) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (schoolType != null && schoolType.size() > 0) {
					In<String> in = cb.in(pathSchoolType);
					for (String str : schoolType) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (schoolProperty != null && schoolProperty.size() > 0) {
					In<String> in = cb.in(pathSchoolProperty);
					for (String str : schoolProperty) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (schoolNature != null && schoolNature.size() > 0) {
					In<String> in = cb.in(pathSchoolNature);
					for (String str : schoolNature) {
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
