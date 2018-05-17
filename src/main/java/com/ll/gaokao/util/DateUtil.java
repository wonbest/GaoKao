package com.ll.gaokao.util;

import java.util.Calendar;

public class DateUtil {

	/** 获取近三年年份数组 */
	public static String[] getNearlyThreeYears() {
		Calendar date = Calendar.getInstance();
		int year = date.get(Calendar.YEAR);
		String[] years = new String[3];
		for (int i = 0; i < 3; i++) {
			years[i] = String.valueOf(year - 1 - i);
		}
		return years;
	}

	public static int getCurrentYear() {
		return Calendar.getInstance().get(Calendar.YEAR);
	}
}
