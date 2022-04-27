package com.cosog.utils;

import com.cosog.model.calculate.AppRunStatusProbeResonanceData;
import com.cosog.model.calculate.CommResponseData;
import com.cosog.model.calculate.DiskProbeResponseData;
import com.cosog.model.calculate.EnergyCalculateResponseData;
import com.cosog.model.calculate.MemoryProbeResponseData;
import com.cosog.model.calculate.PCPCalculateResponseData;
import com.cosog.model.calculate.RPCCalculateResponseData;
import com.cosog.model.calculate.TimeEffResponseData;
import com.cosog.model.calculate.TimeEffTotalResponseData;
import com.cosog.model.calculate.TotalCalculateResponseData;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class CalculateUtils {
	private final static String[] commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication();
	private final static String[] runUrl=Config.getInstance().configFile.getAgileCalculate().getRun();
	private final static String[] energyUrl=Config.getInstance().configFile.getAgileCalculate().getEnergy();
	
	private final static String[] FESDiagramUrl=Config.getInstance().configFile.getAgileCalculate().getFESDiagram();
	private final static String[] rpmUrl=Config.getInstance().configFile.getAgileCalculate().getPcpProduction();
	
	private final static String[] totalUrl=Config.getInstance().configFile.getAgileCalculate().getTotalCalculation().getWell();
	
	private final static String[] appProbe=Config.getInstance().configFile.getAgileCalculate().getProbe().getApp();
	private final static String[] memProbe=Config.getInstance().configFile.getAgileCalculate().getProbe().getMem();
	private final static String[] diskProbe=Config.getInstance().configFile.getAgileCalculate().getProbe().getDisk();
	private final static String[] hostProbe=Config.getInstance().configFile.getAgileCalculate().getProbe().getHost();
	private final static String[] cpuProbe=Config.getInstance().configFile.getAgileCalculate().getProbe().getCpu();
	
	
	public static CommResponseData commCalculate(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(commUrl[0], requestDataStr,"utf-8");
		type = new TypeToken<CommResponseData>() {}.getType();
		CommResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static TimeEffResponseData runCalculate(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(runUrl[0], requestDataStr,"utf-8");
		type = new TypeToken<TimeEffResponseData>() {}.getType();
		TimeEffResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static EnergyCalculateResponseData energyCalculate(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(energyUrl[0], requestDataStr,"utf-8");
		type = new TypeToken<EnergyCalculateResponseData>() {}.getType();
		EnergyCalculateResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static RPCCalculateResponseData fesDiagramCalculate(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(FESDiagramUrl[0], requestDataStr,"utf-8");
		type = new TypeToken<RPCCalculateResponseData>() {}.getType();
		RPCCalculateResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static PCPCalculateResponseData rpmCalculate(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(rpmUrl[0], requestDataStr,"utf-8");
		type = new TypeToken<PCPCalculateResponseData>() {}.getType();
		PCPCalculateResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static TotalCalculateResponseData totalCalculate(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(totalUrl[0], requestDataStr,"utf-8");
		type = new TypeToken<TotalCalculateResponseData>() {}.getType();
		TotalCalculateResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static AppRunStatusProbeResonanceData appProbe(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(appProbe[0], requestDataStr,"utf-8");
		type = new TypeToken<AppRunStatusProbeResonanceData>() {}.getType();
		AppRunStatusProbeResonanceData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static MemoryProbeResponseData memProbe(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(memProbe[0], requestDataStr,"utf-8");
		type = new TypeToken<MemoryProbeResponseData>() {}.getType();
		MemoryProbeResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static DiskProbeResponseData diskProbe(String requestDataStr){
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String responseDataStr=StringManagerUtils.sendPostMethod(diskProbe[0], requestDataStr,"utf-8");
		type = new TypeToken<DiskProbeResponseData>() {}.getType();
		DiskProbeResponseData responseData=gson.fromJson(responseDataStr, type);
		return responseData;
	}
	
	public static String getRangeJson(String rangeStr) {
        String result = "";
        StringBuffer dynSbf = new StringBuffer();
        if (StringManagerUtils.isNotNull(rangeStr)) {
            dynSbf.append("[");
            String[] wellRunRimeArr = rangeStr.split(";");
            for (int i = 0; i < wellRunRimeArr.length; i++) {
                if ("00:00-24:00".equals(wellRunRimeArr[i]) || "00:00-00:00".equals(wellRunRimeArr[i])) {
                    dynSbf.append("{\"startTime\":\"00:00\",\"endTime\":\"00:00\"}");
                    break;
                } else {
                    String[] tempArr = wellRunRimeArr[i].split("-");
                    dynSbf.append("{\"startTime\":\"" + tempArr[0] + "\",\"endTime\":\"" + tempArr[1] + "\"}");
                }

                if (i < wellRunRimeArr.length - 1) {
                    dynSbf.append(",");
                }
            }
            dynSbf.append("]");
            result = dynSbf.toString();
        } else {
            result = "[{\"startTime\":\"\",\"endTime\":\"\"}]";
        }
        return result;
    }
}
