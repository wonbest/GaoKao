package com.ll.gaokao.util;

import org.springframework.data.domain.Page;

/**
 * 后台给前端传递分页数据的model
 * 
 * @author lili
 * @date 2018年4月8日
 */
public class BGDataGrid {

	private long total;
	private long current;
	private long rowCount;
	private Object rows;

	public BGDataGrid() {
		super();
	}

	public BGDataGrid(long total, Object rows) {
		super();
		this.total = total;
		this.rows = rows;
	}

	public BGDataGrid(long total, long current, long rowCount, Object rows) {
		super();
		this.total = total;
		this.current = current;
		this.rowCount = rowCount;
		this.rows = rows;
	}

	public static <T> BGDataGrid newInstance(Page<T> page) {
		BGDataGrid dg = new BGDataGrid();
		dg.setCurrent(page.getNumber() + 1);
		dg.setTotal(page.getTotalElements());
		dg.setRowCount(page.getSize());
		dg.setRows(page.getContent());
		return dg;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public long getCurrent() {
		return current;
	}

	public void setCurrent(long current) {
		this.current = current;
	}

	public long getRowCount() {
		return rowCount;
	}

	public void setRowCount(long rowCount) {
		this.rowCount = rowCount;
	}

	public Object getRows() {
		return rows;
	}

	public void setRows(Object rows) {
		this.rows = rows;
	}

}
