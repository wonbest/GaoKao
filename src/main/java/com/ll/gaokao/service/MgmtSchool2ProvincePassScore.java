package com.ll.gaokao.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
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
import com.ll.gaokao.util.DateUtil;

@Service
public class MgmtSchool2ProvincePassScore {

	/**
	 * 定义风险系数的范围
	 */
	public static final int HIGH = 10;
	public static final int MIDDLE = 5;
	public static final int LOW = 0;

	@Autowired
	private RepoSchool2ProvincePassScore dao;

	/**
	 * 查找工具栏搜索标签的值
	 * 
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
				return Integer.parseInt(str2) - Integer.parseInt(str1);
			}
		});
		map.put("year", list);
		map.put("batch", dao.findBatch());
		map.put("studentType", dao.findStudentType());
		return map;
	}

	/**
	 * 通过风险系数计算线差
	 * 
	 * @param risk
	 * @param score
	 * @param passScore
	 * @return
	 */
	public int computeDifference(String score, String passScore, String province, String batch) {
		return this.computeAvgDiff(province, batch) + Integer.parseInt(score.equals("") ? "0" : score)
				- Integer.parseInt(passScore.equals("") ? "0" : passScore);
	}

	/**
	 * 计算近三年本省的线差浮动的平均值
	 * 
	 * @return
	 */
	public int computeAvgDiff(String province, String batch) {
		String[] years = DateUtil.getNearlyThreeYears();
		int diff1 = this.computeAvgDiffByYear(years[0], province, batch);
		int diff2 = this.computeAvgDiffByYear(years[1], province, batch);
		int diff3 = this.computeAvgDiffByYear(years[2], province, batch);
		int count = Math.abs(diff1 - diff2) + Math.abs(diff2 - diff3);
		return count / years.length;
	}

	/**
	 * 获取指定年份和省份的线差平均值
	 * 
	 * @param year
	 * @return
	 */
	public int computeAvgDiffByYear(String year, String province, String batch) {

		Specification<School2ProvincePassScore> specification = new Specification<School2ProvincePassScore>() {

			@Override
			public Predicate toPredicate(Root<School2ProvincePassScore> root, CriteriaQuery<?> query,
					CriteriaBuilder cb) {
				Path<String> pathBatch = root.get("batch");
				Path<String> pathStudentProvince = root.get("localprovince");
				Path<String> pathYear = root.get("year");
				List<Predicate> lsPredicates = new ArrayList<>();
				if (!batch.equals("")) {
					lsPredicates.add(cb.equal(pathBatch, batch));
				}
				if (!province.equals("")) {
					lsPredicates.add(cb.equal(pathStudentProvince, province));
				}
				if (!year.equals("")) {
					lsPredicates.add(cb.equal(pathYear, year));
				}
				Predicate[] p = new Predicate[lsPredicates.size()];
				return cb.and(lsPredicates.toArray(p));
			}
		};

		List<School2ProvincePassScore> list = dao.findAll(specification);

		int count = 0;
		for (School2ProvincePassScore temp : list) {
			count += Integer.parseInt(temp.getFencha());
		}
		return count / list.size();
	}

	/**
	 * 分页获取符合条件的院校列表
	 * 
	 * @param pageModel
	 * @param studentProvince
	 * @param risk
	 * @param score
	 * @param passScore
	 * @param schoolProvince
	 * @param studentType
	 * @return 推荐志愿
	 */
	public List<School2ProvincePassScore> getWish(Pageable pageable, String studentProvince, String batch, String score,
			String passScore, List<String> schoolProvince, String studentType) {
		return this.queryPageByScore(pageable, batch, studentProvince,
				String.valueOf(this.computeDifference(score, passScore, studentProvince, batch)), schoolProvince,
				studentType);
	}

	/**
	 * 动态查询
	 * 
	 * @param pageModel
	 * @param studentProvince
	 * @param difference
	 *            线差
	 * @param schoolProvince
	 * @param studentType
	 * @return
	 */
	public List<School2ProvincePassScore> queryPageByScore(Pageable pageable, String batch, String studentProvince,
			String difference, List<String> schoolProvince, String studentType) {

		Specification<School2ProvincePassScore> specification = new Specification<School2ProvincePassScore>() {

			@Override
			public Predicate toPredicate(Root<School2ProvincePassScore> root, CriteriaQuery<?> query,
					CriteriaBuilder cb) {
				Path<String> pathSchoolName = root.get("schoolname");
				Path<String> pathBatch = root.get("batch");
				Path<String> pathSchoolProvince = root.get("province");
				Path<String> pathStudentProvince = root.get("localprovince");
				Path<String> pathStudentType = root.get("studenttype");
				Expression<Integer> pathDifference = root.get("fencha").as(Integer.class);
				Path<String> pathYear = root.get("year");
				List<Predicate> lsPredicates = new ArrayList<>();

				In<String> years = cb.in(pathYear);
				for (String str : DateUtil.getNearlyThreeYears()) {
					years.value(str);
				}
				lsPredicates.add(years);

				if (!batch.equals("")) {
					lsPredicates.add(cb.equal(pathBatch, batch));
				}
				if (schoolProvince != null && schoolProvince.size() > 0) {
					In<String> in = cb.in(pathSchoolProvince);
					for (String str : schoolProvince) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (!studentProvince.equals("")) {
					lsPredicates.add(cb.equal(pathStudentProvince, studentProvince));
				}
				if (!studentType.equals("")) {
					lsPredicates.add(cb.equal(pathStudentType, studentType));
				}
				if (!difference.equals("")) {
					lsPredicates.add(cb.lessThanOrEqualTo(pathDifference, Integer.parseInt(difference)));
				}
				Predicate[] p = new Predicate[lsPredicates.size()];
				query.where(lsPredicates.toArray(p));
				query.groupBy(pathSchoolName);
				return query.getRestriction();
			}
		};
		return dao.findAll(specification);
	}

	/**
	 * 查找生源地
	 * 
	 * @return
	 */
	public List<String> findLocalProvince() {
		return dao.findStudentProvince();
	}

	/**
	 * 动态查询学校分数线信息 查分数线模块
	 * 
	 * @param pageable
	 * @param schoolProvince
	 * @param studentProvince
	 * @param studentType
	 * @param year
	 * @param batch
	 * @return
	 */
	public Page<School2ProvincePassScore> queryPageFindAll(Pageable pageable, List<String> schoolProvince,
			List<String> studentProvince, List<String> studentType, List<String> year, List<String> batch) {
		Specification<School2ProvincePassScore> specification = new Specification<School2ProvincePassScore>() {

			@Override
			public Predicate toPredicate(Root<School2ProvincePassScore> root, CriteriaQuery<?> query,
					CriteriaBuilder cb) {
				Path<String> pathSchoolProvince = root.get("province");
				Path<String> pathStudentProvince = root.get("localprovince");
				Path<String> pathStudentType = root.get("studenttype");
				Path<String> pathYear = root.get("year");
				Path<String> pathBatch = root.get("batch");
				List<Predicate> lsPredicates = new ArrayList<>();
				if (schoolProvince != null && schoolProvince.size() > 0) {
					In<String> in = cb.in(pathSchoolProvince);
					for (String str : schoolProvince) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (studentProvince != null && studentProvince.size() > 0) {
					In<String> in = cb.in(pathStudentProvince);
					for (String str : studentProvince) {
						in.value(str);
					}
					lsPredicates.add(in);
				}
				if (studentType != null && studentType.size() > 0) {
					In<String> in = cb.in(pathStudentType);
					for (String str : studentType) {
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
				if (batch != null && batch.size() > 0) {
					In<String> in = cb.in(pathBatch);
					for (String str : batch) {
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
