package com.ll.gaokao.util;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

/**
 * 前台传送到后台的分页查询数据model
 * 
 * @author lili
 * @date 2018年4月8日
 * 
 */
public class BGPageModel {

	private int current = 1;
	private int rowCount = 10;
	private Map<String, String> sort;
	private String searchPhrase;

	public int getCurrent() {
		return current;
	}

	public void setCurrent(int current) {
		this.current = current;
	}

	public int getRowCount() {
		return rowCount;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}

	public Map<String, String> getSort() {
		if (sort == null) {
			sort = new HashMap<String, String>();
		}
		return sort;
	}

	public void setSort(Map<String, String> sort) {
		this.sort = sort;
	}

	public String getSearchPhrase() {
		return searchPhrase;
	}

	public void setSearchPhrase(String searchPhrase) {
		this.searchPhrase = searchPhrase;
	}

	/**
	 * 生成一个Pageable对象供mongoDB的分页查询使用
	 */
	public Pageable bePageable() {
		return this.bePageable(this.sort);
	}

	public Pageable bePageable(Map<String, String> mapSort) {
		Pageable pageable = null;
		current = current < 1 ? 1 : current;
		rowCount = rowCount == -1 ? 1000 : rowCount;
		rowCount = rowCount < 1 ? 1 : rowCount;
		List<Order> lsOrder = new LinkedList<>();
		if (mapSort != null) {
			for (Map.Entry<String, String> entry : mapSort.entrySet()) {
				lsOrder.add(new Order(Direction.fromString(entry.getValue()), entry.getKey()));
			}
			pageable = new PageRequest(current - 1, rowCount, new Sort(lsOrder));
		} else {
			pageable = new PageRequest(current - 1, rowCount);
		}
		if (pageable.getSort() == null) {
		}
		return pageable;
	}

	public static BGPageModel newInstance() {
		return new BGPageModel();
	}
}
