package com.cosog.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class MemoryData {
	public static List<CalItem> calItemList;
	static {
		calItemList=new ArrayList<CalItem>();
		calItemList.add(new CalItem("运行状态",""));
		calItemList.add(new CalItem("运行时间","h"));
		calItemList.add(new CalItem("运行区间",""));
		
		calItemList.add(new CalItem("日有功电能","kW·h"));
		
		calItemList.add(new CalItem("工况",""));
		calItemList.add(new CalItem("最大载荷",""));
		calItemList.add(new CalItem("最小载荷",""));
		calItemList.add(new CalItem("充满系数",""));
		
		calItemList.add(new CalItem("产液量","m^3/d"));
		calItemList.add(new CalItem("产油量","m^3/d"));
		calItemList.add(new CalItem("产水量","m^3/d"));
		calItemList.add(new CalItem("柱塞有效冲程计算产量","m^3/d"));
		calItemList.add(new CalItem("泵间隙漏失量","m^3/d"));
		calItemList.add(new CalItem("游动凡尔漏失量","m^3/d"));
		calItemList.add(new CalItem("固定凡尔漏失量","m^3/d"));
		calItemList.add(new CalItem("气影响","m^3/d"));
		
		calItemList.add(new CalItem("产液量","t/d"));
		calItemList.add(new CalItem("产油量","t/d"));
		calItemList.add(new CalItem("产水量","t/d"));
		calItemList.add(new CalItem("柱塞有效冲程计算产量","t/d"));
		calItemList.add(new CalItem("泵间隙漏失量","t/d"));
		calItemList.add(new CalItem("游动凡尔漏失量","t/d"));
		calItemList.add(new CalItem("固定凡尔漏失量","t/d"));
		calItemList.add(new CalItem("气影响","t/d"));
		
		calItemList.add(new CalItem("沉没度","m"));
	}
	
	
	public static class CalItem{
		public String name;
		public String unit;
		
		public CalItem(String name, String unit) {
			super();
			this.name = name;
			this.unit = unit;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getUnit() {
			return unit;
		}
		public void setUnit(String unit) {
			this.unit = unit;
		}
		
	}
}

