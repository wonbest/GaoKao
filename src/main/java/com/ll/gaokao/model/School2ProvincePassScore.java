package com.ll.gaokao.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 学校在各省的分数线
 * 
 * @author LL
 *
 */
@Entity
@Table(name = "school_pass_score")
public class School2ProvincePassScore {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String schoolid;
	private String schoolname;
	private String localprovince;
	private String province;
	private String studenttype;
	private String year;
	private String batch;
	private String var;
	private String var_score;
	private String max;
	private String min;
	private String num;
	private String fencha;
	private String provincescore;
	private String url;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSchoolid() {
		return schoolid;
	}

	public void setSchoolid(String schoolid) {
		this.schoolid = schoolid;
	}

	public String getSchoolname() {
		return schoolname;
	}

	public void setSchoolname(String schoolname) {
		this.schoolname = schoolname;
	}

	public String getLocalprovince() {
		return localprovince;
	}

	public void setLocalprovince(String localprovince) {
		this.localprovince = localprovince;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getStudenttype() {
		return studenttype;
	}

	public void setStudenttype(String studenttype) {
		this.studenttype = studenttype;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getBatch() {
		return batch;
	}

	public void setBatch(String batch) {
		this.batch = batch;
	}

	public String getVar() {
		return var;
	}

	public void setVar(String var) {
		this.var = var;
	}

	public String getVar_score() {
		return var_score;
	}

	public void setVar_score(String var_score) {
		this.var_score = var_score;
	}

	public String getMax() {
		return max;
	}

	public void setMax(String max) {
		this.max = max;
	}

	public String getMin() {
		return min;
	}

	public void setMin(String min) {
		this.min = min;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getFencha() {
		return fencha;
	}

	public void setFencha(String fencha) {
		this.fencha = fencha;
	}

	public String getProvincescore() {
		return provincescore;
	}

	public void setProvincescore(String provincescore) {
		this.provincescore = provincescore;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
