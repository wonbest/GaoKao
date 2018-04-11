package com.ll.gaokao.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ll.gaokao.model.ProvincePassScore;
import com.ll.gaokao.service.MgmtProvincePassScore;
import com.ll.gaokao.util.BGDataGrid;
import com.ll.gaokao.util.BGPageModel;
import com.ll.gaokao.util.ResultJson;

/**
 * 各省省控线
 * 
 * @author LL
 *
 */
@Controller
public class CtrlProvincePassScore {
	@Autowired
	private MgmtProvincePassScore mgmtProvincePassScore;
	
	/**
	 * 合并获取工具栏搜索条件
	 * @return
	 */
	@RequestMapping(value="getSearchParams")
	@ResponseBody
	public ResultJson getSearchParams() {
		Map<String, List<String>> map = new HashMap<>();
		try {
			map.put("province", mgmtProvincePassScore.findProvince());
			map.put("type", mgmtProvincePassScore.findType());
			map.put("batch", mgmtProvincePassScore.findBath());
			map.put("year", mgmtProvincePassScore.findYear());
			return ResultJson.trueState("获取成功！", map);
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
	
	/**
	 * 根据条件获取结果
	 * @param pageModel
	 * @param type
	 * @param year
	 * @param batch
	 * @param province
	 * @return
	 */
	@RequestMapping(value="findProvincePassScore")
	@ResponseBody
	public BGDataGrid findProvincePassScore(
			BGPageModel pageModel,
			String type,
			String year,
			String batch,
			String province) {
		Page<ProvincePassScore> page = 
				mgmtProvincePassScore.queryPageBySearchParams(
						pageModel.bePageable(), 
						JSON.parseArray(type, String.class), 
						JSON.parseArray(batch, String.class), 
						JSON.parseArray(year, String.class), 
						JSON.parseArray(province, String.class));
		return BGDataGrid.newInstance(page);
	}
	
	/**
	 * 获取省份
	 * @return
	 */
	@RequestMapping(value="getAllProvince")
	@ResponseBody
	public ResultJson getAllProvince() {
		try {
			return ResultJson.trueState("获取成功！", mgmtProvincePassScore.findProvince());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
	
	/**
	 * 获取批次
	 * @return
	 */
	@RequestMapping(value="getAllBatch")
	@ResponseBody
	public ResultJson getAllBatch() {
		try {
			return ResultJson.trueState("获取成功！", mgmtProvincePassScore.findBath());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
	
	/**
	 * 获取年份
	 * @return
	 */
	@RequestMapping(value="getAllYear")
	@ResponseBody
	public ResultJson getAllYear() {
		try {
			return ResultJson.trueState("获取成功！", mgmtProvincePassScore.findYear());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
	
	/**
	 * 获取类别
	 * @return
	 */
	@RequestMapping(value="getAllType")
	@ResponseBody
	public ResultJson getAllType() {
		try {
			return ResultJson.trueState("获取成功！", mgmtProvincePassScore.findType());
		} catch (Exception e) {
			return ResultJson.FALSE;
		}
	}
}


