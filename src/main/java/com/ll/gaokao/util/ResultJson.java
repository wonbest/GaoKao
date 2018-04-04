package com.ll.gaokao.util;

/**
 * 封装请求返回的json类
 */
public class ResultJson {

	private boolean state;

	private String message;

	private Object result;

	private Object file;

	public ResultJson() {
	}

	public ResultJson(boolean state, String message) {
		this.state = state;
		this.message = message;
	}

	public ResultJson(boolean state, String message, Object result) {
		this.state = state;
		this.message = message;
		this.result = result;
	}

	public static final ResultJson TRUE = new ResultJson(true, "操作成功！");

	public static final ResultJson FALSE = new ResultJson(false, "操作失败！");

	public static final ResultJson INSERT_TRUE = new ResultJson(true, "增加成功");

	public static final ResultJson UPDATE_TRUE = new ResultJson(true, "修改成功");

	public static final ResultJson UPDATE_FALSE = new ResultJson(false, "修改失败，此记录不存在或已被删除！");

	public static final ResultJson DELETE_FALSE = new ResultJson(false, "删除失败，此记录不存在或已被删除！");

	public static final ResultJson NOPOWER = new ResultJson(false, "权限不足");

	public static ResultJson trueState(String message) {
		return new ResultJson(true, message);
	}

	public static ResultJson trueState(String message, Object result) {
		return new ResultJson(true, message, result);
	}

	public static ResultJson falseState(String message) {
		return new ResultJson(false, message);
	}

	public static ResultJson falseState(Throwable t) {
		return new ResultJson(false, t.getMessage());
	}

	public static ResultJson falseState(Throwable t, Object result) {
		return new ResultJson(false, t.getMessage(), result);
	}

	public static ResultJson falseState(String message, Object result) {
		return new ResultJson(false, message, result);
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public Object getFile() {
		return file;
	}

	public void setFile(Object file) {
		this.file = file;
	}

	public String toString() {
		return "state:" + state + ", message:" + message + ", result:" + result;
	}

}
