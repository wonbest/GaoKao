package com.ll.gaokao.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.CriteriaBuilder.In;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ll.gaokao.dao.RepoProvincePassScore;
import com.ll.gaokao.model.Major;
import com.ll.gaokao.model.ProvincePassScore;

@Service
public class MgmtProvincePassScore {
	@Autowired
	private RepoProvincePassScore dao;
	
	public Page<ProvincePassScore> queryPageBySearchParams(
			Pageable pageable, 
			List<String> type, 
			List<String> batch,
			List<String> year, 
			List<String> province) {
		Specification<ProvincePassScore> specification = new Specification<ProvincePassScore>() {

			@Override
			public Predicate toPredicate(Root<ProvincePassScore> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> pathType = root.get("type");
				Path<String> pathYear = root.get("year");
				Path<String> pathBatch = root.get("bath");
				Path<String> pathProvince = root.get("province");
				List<Predicate> lsPredicates = new ArrayList<>();
				if(type != null && type.size() > 0) {
					In<String> in = cb.in(pathType);
					for(String str : type) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if(batch != null && batch.size() > 0) {
					In<String> in = cb.in(pathBatch);
					for(String str : batch) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if(year != null && year.size() > 0) {
					In<String> in = cb.in(pathYear);
					for(String str : year) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if(province != null && province.size() > 0) {
					In<String> in = cb.in(pathProvince);
					for(String str : province) {
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
	
	/**
	 * 查询所有省份
	 * @return
	 */
	public List<String> findProvince() {
		return dao.findProvince();
	}
	
	/**
	 * 查询所有年份
	 * @return
	 */
	public List<String> findYear() {
		return dao.findYear();
	}
	
	/**
	 * 查询所有批次
	 * @return
	 */
	public List<String> findBath() {
		return dao.findBath();
	}
	
	/**
	 * 查询所有类别
	 * @return
	 */
	public List<String> findType() {
		return dao.findType();
	}
}
