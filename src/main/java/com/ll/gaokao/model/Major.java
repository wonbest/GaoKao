package com.ll.gaokao.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 教育在线 网 专业数据类型
 * 
 * @author LL
 *
 */
@Entity
@Table(name = "major")
public class Major {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String code;

	private String specialname;

	private String specialurl;

	private String clicks;

	private String monthclicks;

	private String weekclicks;

	private String zycengci;

	private String zytype;

	private String bnum;

	private String znum;

	private String zyid;

	private String ranking;

	private String rankingType;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSpecialname() {
		return specialname;
	}

	public void setSpecialname(String specialname) {
		this.specialname = specialname;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getSpecialurl() {
		return specialurl;
	}

	public void setSpecialurl(String specialurl) {
		this.specialurl = specialurl;
	}

	public String getClicks() {
		return clicks;
	}

	public void setClicks(String clicks) {
		this.clicks = clicks;
	}

	public String getMonthclicks() {
		return monthclicks;
	}

	public void setMonthclicks(String monthclicks) {
		this.monthclicks = monthclicks;
	}

	public String getWeekclicks() {
		return weekclicks;
	}

	public void setWeekclicks(String weekclicks) {
		this.weekclicks = weekclicks;
	}

	public String getZycengci() {
		return zycengci;
	}

	public void setZycengci(String zycengci) {
		this.zycengci = zycengci;
	}

	public String getZytype() {
		return zytype;
	}

	public void setZytype(String zytype) {
		this.zytype = zytype;
	}

	public String getBnum() {
		return bnum;
	}

	public void setBnum(String bnum) {
		this.bnum = bnum;
	}

	public String getZnum() {
		return znum;
	}

	public void setZnum(String znum) {
		this.znum = znum;
	}

	public String getZyid() {
		return zyid;
	}

	public void setZyid(String zyid) {
		this.zyid = zyid;
	}

	public String getRanking() {
		return ranking;
	}

	public void setRanking(String ranking) {
		this.ranking = ranking;
	}

	public String getRankingType() {
		return rankingType;
	}

	public void setRankingType(String rankingType) {
		this.rankingType = rankingType;
	}

	@Override
	public String toString() {
		return "Major [specialname=" + specialname + ", code=" + code + ", specialurl=" + specialurl + ", clicks="
				+ clicks + ", monthclicks=" + monthclicks + ", weekclicks=" + weekclicks + ", zycengci=" + zycengci
				+ ", zytype=" + zytype + ", bnum=" + bnum + ", znum=" + znum + ", zyid=" + zyid + ", ranking=" + ranking
				+ ", rankingType=" + rankingType + "]";
	}

}
