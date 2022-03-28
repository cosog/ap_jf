package com.cosog.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class MemoryData {
	public static List<CalItem> calItemList;
	public static List<CalItem> pcpCalItemList;
	static {
		calItemList=new ArrayList<CalItem>();
		
		calItemList.add(new CalItem("工况","ResultCode",""));
		calItemList.add(new CalItem("最大载荷","FMax","kN"));
		calItemList.add(new CalItem("最小载荷","FMin","kN"));
		calItemList.add(new CalItem("充满系数","FullnessCoefficient",""));
		
		calItemList.add(new CalItem("理论排量","TheoreticalProduction","m^3/d"));
		
		calItemList.add(new CalItem("产液量","LiquidVolumetricProduction","m^3/d"));
		calItemList.add(new CalItem("产油量","OilVolumetricProduction","m^3/d"));
		calItemList.add(new CalItem("产水量","WaterVolumetricProduction","m^3/d"));
		calItemList.add(new CalItem("柱塞有效冲程计算产量","AvailablePlungerStrokeVolumetricProduction","m^3/d"));
		calItemList.add(new CalItem("泵间隙漏失量","PumpClearanceLeakVolumetricProduction","m^3/d"));
		calItemList.add(new CalItem("游动凡尔漏失量","TVLeakVolumetricProduction","m^3/d"));
		calItemList.add(new CalItem("固定凡尔漏失量","SVLeakVolumetricProduction","m^3/d"));
		calItemList.add(new CalItem("气影响","GasInfluenceVolumetricProduction","m^3/d"));
		
		calItemList.add(new CalItem("产液量","LiquidWeightProduction","t/d"));
		calItemList.add(new CalItem("产油量","OilWeightProduction","t/d"));
		calItemList.add(new CalItem("产水量","WaterWeightProduction","t/d"));
		calItemList.add(new CalItem("柱塞有效冲程计算产量","AvailablePlungerStrokeWeightProduction","t/d"));
		calItemList.add(new CalItem("泵间隙漏失量","PumpClearanceLeakWeightProduction","t/d"));
		calItemList.add(new CalItem("游动凡尔漏失量","TVLeakWeightProduction","t/d"));
		calItemList.add(new CalItem("固定凡尔漏失量","SVLeakWeightProduction","t/d"));
		calItemList.add(new CalItem("气影响","GasInfluenceWeightProduction","t/d"));
		
		pcpCalItemList=new ArrayList<CalItem>();
		pcpCalItemList.add(new CalItem("理论排量","TheoreticalProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产液量","LiquidVolumetricProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产油量","OilVolumetricProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产水量","WaterVolumetricProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产液量","LiquidWeightProduction","t/d"));
		pcpCalItemList.add(new CalItem("产油量","OilWeightProduction","t/d"));
		pcpCalItemList.add(new CalItem("产水量","WaterWeightProduction","t/d"));
	}
	
	
	public static class CalItem{
		public String name;
		public String code;
		public String unit;
		
		public CalItem(String name,String code, String unit) {
			super();
			this.name = name;
			this.code = code;
			this.unit = unit;
		}
		public CalItem(String name,String unit) {
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
		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		
	}
}

