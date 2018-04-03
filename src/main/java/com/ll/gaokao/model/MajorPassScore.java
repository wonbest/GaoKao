package com.ll.gaokao.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 教育在线 网 专业分数线数据类型
 * 
 * @author LL
 *
 */
@Entity
@Table(name = "major_pass_score")
public class MajorPassScore {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String schoolid;

	private String schoolname;

	private String specialtyname;

	private String localprovince;

	private String studenttype;

	private String year;

	private String batch;

	private String var;

	private String var_score;

	private String max;

	private String min;

	private String zyid;

	private String url;

	private String seesign;

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

	public String getSpecialtyname() {
		return specialtyname;
	}

	public void setSpecialtyname(String specialtyname) {
		this.specialtyname = specialtyname;
	}

	public String getLocalprovince() {
		return localprovince;
	}

	public void setLocalprovince(String localprovince) {
		this.localprovince = localprovince;
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

	public String getZyid() {
		return zyid;
	}

	public void setZyid(String zyid) {
		this.zyid = zyid;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSeesign() {
		return seesign;
	}

	public void setSeesign(String seesign) {
		this.seesign = seesign;
	}

	@Override
	public String toString() {
		return "MajorPassScore [schoolid=" + schoolid + ", schoolname=" + schoolname + ", specialtyname="
				+ specialtyname + ", localprovince=" + localprovince + ", studenttype=" + studenttype + ", year=" + year
				+ ", batch=" + batch + ", var=" + var + ", var_score=" + var_score + ", max=" + max + ", min=" + min
				+ ", zyid=" + zyid + ", url=" + url + ", seesign=" + seesign + "]";
	}

}
