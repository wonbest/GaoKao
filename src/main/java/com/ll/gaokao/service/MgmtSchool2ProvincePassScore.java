package com.ll.gaokao.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.ll.gaokao.dao.RepoSchool2ProvincePassScore;
import com.ll.gaokao.model.School2ProvincePassScore;

@Service
public class MgmtSchool2ProvincePassScore {
	@Autowired
	private RepoSchool2ProvincePassScore dao;

	/**
	 * 查找工具栏搜索标签的值
	 * @return
	 */
	public Map<String, List<String>> findSearchTags() {
		Map<String, List<String>> map = new HashMap<>();
		map.put("studentProvince", dao.findStudentProvince());
		map.put("schoolProvince", dao.findSchoolProvince());
		List<String> list = dao.findYear();
		list.sort(new Comparator<String>() {  
            @Override  
            public int compare(String str1, String str2) {  
                  return Integer.parseInt(str2)-Integer.parseInt(str1); 
            }
		});
		map.put("year", list);
		map.put("batch", dao.findBatch());
		map.put("studentType", dao.findStudentType());
		return map;
	}
	
	public Page<School2ProvincePassScore> queryPageFindAll(
			Pageable pageable, 
			List<String> schoolProvince,
			List<String> studentProvince,
			List<String> studentType,
			List<String> year,
			List<String> batch) {
		Specification<School2ProvincePassScore> specification = new Specification<School2ProvincePassScore>() {

			@Override
			public Predicate toPredicate(Root<School2ProvincePassScore> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> pathSchoolProvince = root.get("province");
				Path<String> pathStudentProvince = root.get("localprovince");
				Path<String> pathStudentType = root.get("studenttype");
				Path<String> pathYear = root.get("year");
				Path<String> pathBatch = root.get("batch");
				List<Predicate> lsPredicates = new ArrayList<>();
				if(schoolProvince != null && schoolProvince.size() > 0) {
					In<String> in = cb.in(pathSchoolProvince);
					for(String str : schoolProvince) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if(studentProvince != null && studentProvince.size() > 0) {
					In<String> in = cb.in(pathStudentProvince);
					for(String str : studentProvince) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if(studentType != null && studentType.size() > 0) {
					In<String> in = cb.in(pathStudentType);
					for(String str : studentType) {
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
				if(batch != null && batch.size() > 0) {
					In<String> in = cb.in(pathBatch);
					for(String str : batch) {
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
