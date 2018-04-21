package com.ll.gaokao.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * school模型
 * 
 * @author LL
 *
 */
@Entity
@Table(name="school")
public class School {
	@Id
	private String schoolid;

	private String schoolname;

	private String clicks;

	private String monthclicks;

	private String weekclicks;

	private String province;

	private String schooltype;

	private String schoolproperty;

	private String edudirectly;

	private String f985;

	private String f211;

	private String level;

	private String autonomyrs;

	private String library;

	private String membership;

	private String schoolnature;

	private String shoufei;

	private String jianjie;

	private String schoolcode;

	private String ranking;

	private String rankingCollegetype;

	private String guanwang;

	private String oldname;

	private String ads;

	private String center;

	private String master;

	private String num;

	private String firstrate;

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

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getSchooltype() {
		return schooltype;
	}

	public void setSchooltype(String schooltype) {
		this.schooltype = schooltype;
	}

	public String getSchoolproperty() {
		return schoolproperty;
	}

	public void setSchoolproperty(String schoolproperty) {
		this.schoolproperty = schoolproperty;
	}

	public String getEdudirectly() {
		return edudirectly;
	}

	public void setEdudirectly(String edudirectly) {
		this.edudirectly = edudirectly;
	}

	public String getF985() {
		return f985;
	}

	public void setF985(String f985) {
		this.f985 = f985;
	}

	public String getF211() {
		return f211;
	}

	public void setF211(String f211) {
		this.f211 = f211;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getAutonomyrs() {
		return autonomyrs;
	}

	public void setAutonomyrs(String autonomyrs) {
		this.autonomyrs = autonomyrs;
	}

	public String getLibrary() {
		return library;
	}

	public void setLibrary(String library) {
		this.library = library;
	}

	public String getMembership() {
		return membership;
	}

	public void setMembership(String membership) {
		this.membership = membership;
	}

	public String getSchoolnature() {
		return schoolnature;
	}

	public void setSchoolnature(String schoolnature) {
		this.schoolnature = schoolnature;
	}

	public String getShoufei() {
		return shoufei;
	}

	public void setShoufei(String shoufei) {
		this.shoufei = shoufei;
	}

	public String getJianjie() {
		return jianjie;
	}

	public void setJianjie(String jianjie) {
		this.jianjie = jianjie;
	}

	public String getSchoolcode() {
		return schoolcode;
	}

	public void setSchoolcode(String schoolcode) {
		this.schoolcode = schoolcode;
	}

	public String getRanking() {
		return ranking;
	}

	public void setRanking(String ranking) {
		this.ranking = ranking;
	}

	public String getRankingCollegetype() {
		return rankingCollegetype;
	}

	public void setRankingCollegetype(String rankingCollegetype) {
		this.rankingCollegetype = rankingCollegetype;
	}

	public String getGuanwang() {
		return guanwang;
	}

	public void setGuanwang(String guanwang) {
		this.guanwang = guanwang;
	}

	public String getOldname() {
		return oldname;
	}

	public void setOldname(String oldname) {
		this.oldname = oldname;
	}

	public String getAds() {
		return ads;
	}

	public void setAds(String ads) {
		this.ads = ads;
	}

	public String getCenter() {
		return center;
	}

	public void setCenter(String center) {
		this.center = center;
	}

	public String getMaster() {
		return master;
	}

	public void setMaster(String master) {
		this.master = master;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getFirstrate() {
		return firstrate;
	}

	public void setFirstrate(String firstrate) {
		this.firstrate = firstrate;
	}

	@Override
	public String toString() {
		return "School [schoolid=" + schoolid + ", schoolname=" + schoolname + ", clicks=" + clicks + ", monthclicks="
				+ monthclicks + ", weekclicks=" + weekclicks + ", province=" + province + ", schooltype=" + schooltype
				+ ", schoolproperty=" + schoolproperty + ", edudirectly=" + edudirectly + ", f985=" + f985 + ", f211="
				+ f211 + ", level=" + level + ", autonomyrs=" + autonomyrs + ", library=" + library + ", membership="
				+ membership + ", schoolnature=" + schoolnature + ", shoufei=" + shoufei + ", jianjie=" + jianjie
				+ ", schoolcode=" + schoolcode + ", ranking=" + ranking + ", rankingCollegetype=" + rankingCollegetype
				+ ", guanwang=" + guanwang + ", oldname=" + oldname + ", ads=" + ads + ", center=" + center
				+ ", master=" + master + ", num=" + num + ", firstrate=" + firstrate + "]";
	}

}
