package com.cosog.controller.datainterface;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TimeZone;

import javax.servlet.ServletInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.TextMessage;

import com.cosog.controller.base.BaseController;
import com.cosog.model.AlarmShowStyle;
import com.cosog.model.CommStatus;
import com.cosog.model.DataMapping;
import com.cosog.model.WorkType;
import com.cosog.model.calculate.AcqInstanceOwnItem;
import com.cosog.model.calculate.AlarmInstanceOwnItem;
import com.cosog.model.calculate.CommResponseData;
import com.cosog.model.calculate.DisplayInstanceOwnItem;
import com.cosog.model.calculate.PCPDeviceInfo;
import com.cosog.model.calculate.RPCCalculateRequestData;
import com.cosog.model.calculate.RPCCalculateResponseData;
import com.cosog.model.calculate.RPCDeviceInfo;
import com.cosog.model.calculate.TimeEffResponseData;
import com.cosog.model.calculate.TimeEffTotalResponseData;
import com.cosog.model.calculate.UserInfo;
import com.cosog.model.calculate.WellAcquisitionData;
import com.cosog.model.drive.AcqGroup;
import com.cosog.model.drive.AcqOnline;
import com.cosog.model.drive.AcquisitionGroupResolutionData;
import com.cosog.model.drive.AcquisitionItemInfo;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.datainterface.CalculateDataService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.task.MemoryDataManagerTask;
import com.cosog.task.MemoryDataManagerTask.CalItem;
import com.cosog.utils.AcquisitionItemColumnsMap;
import com.cosog.utils.AlarmInfoMap;
import com.cosog.utils.Config;
import com.cosog.utils.Config2;
import com.cosog.utils.Constants;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.MemoryDataMap;
import com.cosog.utils.OracleJdbcUtis;
import com.cosog.utils.ParamUtils;
import com.cosog.utils.ProtocolItemResolutionData;
import com.cosog.utils.SerializeObjectUnils;
import com.cosog.utils.StringManagerUtils;
import com.cosog.websocket.config.WebSocketByJavax;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import jxl.DateCell;
import jxl.Sheet;
import jxl.Workbook;
import redis.clients.jedis.Jedis;

@Controller
@RequestMapping("/api")
@Scope("prototype")
public class DriverAPIController extends BaseController{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private CalculateDataService<?> calculateDataService;
	@Autowired
	private CommonDataService commonDataService;
	@Bean
    public static WebSocketByJavax infoHandler() {
        return new WebSocketByJavax();
    }
	
	
	@RequestMapping("/acq/allDeviceOffline")
	public String AllDeviceOffline() throws Exception {
		StringBuffer webSocketSendData = new StringBuffer();
		String functionCode="adExitAndDeviceOffline";
		String time=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
		String updateRPCRealData="update tbl_rpcacqdata_latest t "
				+ "set t.acqTime=to_date('"+time+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0 "
				+ "where t.CommStatus=1";
		String updateRPCHistData="update tbl_rpcacqdata_hist t "
				+ " set t.acqTime=to_date('"+time+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0"
				+ " where t.CommStatus=1 and t.acqtime=( select max(t2.acqtime) from tbl_rpcacqdata_hist t2 where t2.wellid=t.wellid ) ";
		
		String updatePCPRealData="update tbl_pcpacqdata_latest t "
				+ "set t.acqTime=to_date('"+time+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0 "
				+ "where t.CommStatus=1";
		String updatePCPHistData="update tbl_pcpacqdata_hist t "
				+ " set t.acqTime=to_date('"+time+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0"
				+ " where t.CommStatus=1 and t.acqtime=( select max(t2.acqtime) from tbl_pcpacqdata_hist t2 where t2.wellid=t.wellid ) ";
		
		int result=commonDataService.getBaseDao().updateOrDeleteBySql(updateRPCRealData);
		result=commonDataService.getBaseDao().updateOrDeleteBySql(updateRPCHistData);
		
		result=commonDataService.getBaseDao().updateOrDeleteBySql(updatePCPRealData);
		result=commonDataService.getBaseDao().updateOrDeleteBySql(updatePCPHistData);
		
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		List<CommStatus> commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
		if(commStatusList!=null&&commStatusList.size()>0){
			for(int i=0;i<commStatusList.size();i++){
				commStatusList.get(i).setCommStatus(0);
			}
			dataModelMap.put("DeviceCommStatus", commStatusList);
		}
		
		webSocketSendData.append("{\"functionCode\":\""+functionCode+"\",");
		webSocketSendData.append("\"time\":\""+time+"\"");
		webSocketSendData.append("}");
		if(StringManagerUtils.isNotNull(webSocketSendData.toString())){
			infoHandler().sendMessageToBy("ApWebSocketClient", webSocketSendData.toString());
		}
		
		String json = "{success:true,flag:true}";
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/acq/allDeviceOffline2")
	public String AllDeviceOffline2() throws Exception {
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
//		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		String currentTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
		StringManagerUtils.printLog(currentTime+"：ad未运行，所有设备离线");
		String protocols="";
		ModbusProtocolConfig modbusProtocolConfig=MemoryDataManagerTask.getModbusProtocolConfig();
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			protocols+="'"+modbusProtocolConfig.getProtocol().get(i).getCode()+"'";
			if(i<modbusProtocolConfig.getProtocol().size()-1){
				protocols+=",";
			}
		}
		if(StringManagerUtils.isNotNull(protocols)){
			String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
					+ "t2.commstatus,"
					+ "t2.commtime"
					+ "t2.commtimeefficiency,"
					+ "t2.commrange,"
					+ "t.devicetype,t.id from tbl_rpcdevice t "
					+ " left outer join tbl_rpcacqdata_latest  t2 on t.id=t2.wellid "
					+ " left outer join tbl_protocolinstance t4 on t.instancecode=t4.code"
					+ " left outer join tbl_acq_unit_conf t5 on t4.unitid=t5.id"
					+ " where t5.protocol in("+protocols+")"
					+ " and decode(t.devicetype,0,t2.commstatus,t3.commstatus)=1";
			List list = this.commonDataService.findCallSql(sql);
			
			for(int i=0;i<list.size();i++){
				Object[] obj=(Object[]) list.get(i);
				String wellId=obj[obj.length-1]+"";
				String devicetype=obj[obj.length-2]+"";
				
				String realtimeTable="tbl_rpcacqdata_latest";
				String historyTable="tbl_rpcacqdata_hist";
				if("0".equalsIgnoreCase(devicetype)){//如果是抽油机
					realtimeTable="tbl_rpcacqdata_latest";
					historyTable="tbl_rpcacqdata_hist";
				}else{//否则螺杆泵
					realtimeTable="tbl_pcpacqdata_latest";
					historyTable="tbl_pcpacqdata_hist";
				}
				CommResponseData commResponseData=null;
				String commRequest="{"
						+ "\"AKString\":\"\","
						+ "\"WellName\":\""+obj[0]+"\",";
				if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[5]))){
					commRequest+= "\"Last\":{"
							+ "\"AcqTime\": \""+obj[1]+"\","
							+ "\"CommStatus\": "+("1".equals(obj[2]+"")?true:false)+","
							+ "\"CommEfficiency\": {"
							+ "\"Efficiency\": "+obj[4]+","
							+ "\"Time\": "+obj[3]+","
							+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[5]))+""
							+ "}"
							+ "},";
				}	
				commRequest+= "\"Current\": {"
						+ "\"AcqTime\":\""+currentTime+"\","
						+ "\"CommStatus\":false"
						+ "}"
						+ "}";
				String commResponse="";
//				commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
				type = new TypeToken<CommResponseData>() {}.getType();
				commResponseData=gson.fromJson(commResponse, type);
				String updateRealData="update "+realtimeTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0";
				String updateRealCommRangeClobSql="update "+realtimeTable+" t set t.commrange=?";
				
				String updateHistData="update "+historyTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0";
				String updateHistCommRangeClobSql="update "+historyTable+" t set t.commrange=?";
				List<String> clobCont=new ArrayList<String>();
				
				if(commResponseData!=null&&commResponseData.getResultStatus()==1){
					updateRealData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
							+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
					updateHistData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
							+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
					
					clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
				}
				updateRealData+=" where t.wellId= "+wellId;
				updateRealCommRangeClobSql+=" where t.wellId= "+wellId;
				
				updateHistData+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";
				updateHistCommRangeClobSql+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";;
				
				int result=commonDataService.getBaseDao().updateOrDeleteBySql(updateRealData);
				result=commonDataService.getBaseDao().updateOrDeleteBySql(updateHistData);
				if(commResponseData!=null&&commResponseData.getResultStatus()==1){
					result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRealCommRangeClobSql,clobCont);
					result=commonDataService.getBaseDao().executeSqlUpdateClob(updateHistCommRangeClobSql,clobCont);
				}
			}
			
			sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
					+ "t2.commstatus,"
					+ "t2.commtime"
					+ "t2.commtimeefficiency,"
					+ "t2.commrange,"
					+ "t.devicetype,t.id from tbl_pcpdevice t "
					+ " left outer join tbl_pcpacqdata_latest t2 on t.id =t2.wellid"
					+ " left outer join tbl_protocolinstance t4 on t.instancecode=t4.code"
					+ " left outer join tbl_acq_unit_conf t5 on t4.unitid=t5.id"
					+ " where t5.protocol in("+protocols+")"
					+ " and decode(t.devicetype,0,t2.commstatus,t3.commstatus)=1";
			list = this.commonDataService.findCallSql(sql);
			for(int i=0;i<list.size();i++){
				Object[] obj=(Object[]) list.get(i);
				String wellId=obj[obj.length-1]+"";
				String devicetype=obj[obj.length-2]+"";
				
				String realtimeTable="tbl_rpcacqdata_latest";
				String historyTable="tbl_rpcacqdata_hist";
				if("0".equalsIgnoreCase(devicetype)){//如果是抽油机
					realtimeTable="tbl_rpcacqdata_latest";
					historyTable="tbl_rpcacqdata_hist";
				}else{//否则螺杆泵
					realtimeTable="tbl_pcpacqdata_latest";
					historyTable="tbl_pcpacqdata_hist";
				}
				CommResponseData commResponseData=null;
				String commRequest="{"
						+ "\"AKString\":\"\","
						+ "\"WellName\":\""+obj[0]+"\",";
				if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[5]))){
					commRequest+= "\"Last\":{"
							+ "\"AcqTime\": \""+obj[1]+"\","
							+ "\"CommStatus\": "+("1".equals(obj[2]+"")?true:false)+","
							+ "\"CommEfficiency\": {"
							+ "\"Efficiency\": "+obj[4]+","
							+ "\"Time\": "+obj[3]+","
							+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[5]))+""
							+ "}"
							+ "},";
				}	
				commRequest+= "\"Current\": {"
						+ "\"AcqTime\":\""+currentTime+"\","
						+ "\"CommStatus\":false"
						+ "}"
						+ "}";
				String commResponse="";
//				commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
				type = new TypeToken<CommResponseData>() {}.getType();
				commResponseData=gson.fromJson(commResponse, type);
				String updateRealData="update "+realtimeTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0";
				String updateRealCommRangeClobSql="update "+realtimeTable+" t set t.commrange=?";
				
				String updateHistData="update "+historyTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0";
				String updateHistCommRangeClobSql="update "+historyTable+" t set t.commrange=?";
				List<String> clobCont=new ArrayList<String>();
				
				if(commResponseData!=null&&commResponseData.getResultStatus()==1){
					updateRealData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
							+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
					updateHistData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
							+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
					
					clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
				}
				updateRealData+=" where t.wellId= "+wellId;
				updateRealCommRangeClobSql+=" where t.wellId= "+wellId;
				
				updateHistData+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";
				updateHistCommRangeClobSql+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";;
				
				int result=commonDataService.getBaseDao().updateOrDeleteBySql(updateRealData);
				result=commonDataService.getBaseDao().updateOrDeleteBySql(updateHistData);
				if(commResponseData!=null&&commResponseData.getResultStatus()==1){
					result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRealCommRangeClobSql,clobCont);
					result=commonDataService.getBaseDao().executeSqlUpdateClob(updateHistCommRangeClobSql,clobCont);
				}
			}
		}
		
		String json = "{success:true,flag:true}";
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/acq/online")
	public String AcqOnlineData() throws Exception {
		ServletInputStream ss = request.getInputStream();
		Gson gson=new Gson();
		StringBuffer webSocketSendData = new StringBuffer();
//		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		String data=StringManagerUtils.convertStreamToString(ss,"utf-8");
		StringManagerUtils.printLog("接收到ad推送online数据："+data);
		java.lang.reflect.Type type = new TypeToken<AcqOnline>() {}.getType();
		AcqOnline acqOnline=gson.fromJson(data, type);
		if(acqOnline!=null){
			String deviceType="";
			String realtimeTable="";
			String historyTable="";
			//判断设备类型
			String deviceTypeSql="select t.devicetype"
					+ " from tbl_rpcdevice t   "
					+ " where t.signinid='"+acqOnline.getID()+"' and to_number(t.slave)="+acqOnline.getSlave();
			List devicetypeList = this.commonDataService.findCallSql(deviceTypeSql);
			if(devicetypeList.size()>0 && StringManagerUtils.isNotNull(devicetypeList.get(0)+"")){
				deviceType=devicetypeList.get(0)+"";
			}
			if(!StringManagerUtils.isNotNull(deviceType)){//如果抽油机表中未找到对应设备，查找螺杆泵表
				deviceTypeSql="select t.devicetype"
						+ " from tbl_pcpdevice t   "
						+ " where t.signinid='"+acqOnline.getID()+"' and to_number(t.slave)="+acqOnline.getSlave();
				devicetypeList = this.commonDataService.findCallSql(deviceTypeSql);
				if(devicetypeList.size()>0 && StringManagerUtils.isNotNull(devicetypeList.get(0)+"")){
					deviceType=devicetypeList.get(0)+"";
				}
			}
			
			if(StringManagerUtils.isNotNull(deviceType)){
				String functionCode="rpcDeviceRealTimeMonitoringStatusData";
				String deviceTableName="tbl_rpcdevice";
				String alarmTableName="tbl_rpcalarminfo_hist";
				if(StringManagerUtils.stringToInteger(deviceType)>=100 && StringManagerUtils.stringToInteger(deviceType)<200){//如果是抽油机
					deviceTableName="tbl_rpcdevice";
					alarmTableName="tbl_rpcalarminfo_hist";
					realtimeTable="tbl_rpcacqdata_latest";
					historyTable="tbl_rpcacqdata_hist";
					functionCode="rpcDeviceRealTimeMonitoringStatusData";
				}else if(StringManagerUtils.stringToInteger(deviceType)>=200 && StringManagerUtils.stringToInteger(deviceType)<300){//否则螺杆泵
					deviceTableName="tbl_pcpdevice";
					alarmTableName="tbl_pcpalarminfo_hist";
					realtimeTable="tbl_pcpacqdata_latest";
					historyTable="tbl_pcpacqdata_hist";
					functionCode="pcpDeviceRealTimeMonitoringStatusData";
				}
				
				String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
						+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange,"
						+ " t.orgid,"
						+ " t.id"
						+ " from "+deviceTableName+" t,"+realtimeTable+"  t2 "
						+ " where t.id=t2.wellid"
						+ " and t.signinid='"+acqOnline.getID()+"' and to_number(t.slave)="+acqOnline.getSlave();
				String commAlarmSql="select  t5.itemname,decode(t5.alarmsign,0,0,t5.alarmlevel) as alarmlevel,t5.issendmessage,t5.issendmail,t5.delay"
						+ " from "+deviceTableName+" t"
						+ " left outer join tbl_protocolalarminstance t3 on t.alarminstancecode=t3.code"
						+ " left outer join tbl_alarm_unit_conf t4 on t3.alarmunitid=t4.id"
						+ " left outer join tbl_alarm_item2unit_conf t5 on t4.id=t5.unitid and t5.type=3 "
						+ " where t.signinid='"+acqOnline.getID()+"' and to_number(t.slave)="+acqOnline.getSlave();
				List list = this.commonDataService.findCallSql(sql);
				List commAlarmList = this.commonDataService.findCallSql(commAlarmSql);
				if(list.size()>0){
					Object[] obj=(Object[]) list.get(0);
					
					String currentTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
					CommResponseData commResponseData=null;
					String wellName=obj[0]+"";
					String wellId=obj[obj.length-1]+"";
					String orgId=obj[obj.length-2]+"";
					String commRequest="{"
							+ "\"AKString\":\"\","
							+ "\"WellName\":\""+wellName+"\",";
					if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[5]))){
						commRequest+= "\"Last\":{"
								+ "\"AcqTime\": \""+obj[1]+"\","
								+ "\"CommStatus\": "+("1".equals(obj[2]+"")?true:false)+","
								+ "\"CommEfficiency\": {"
								+ "\"Efficiency\": "+obj[4]+","
								+ "\"Time\": "+obj[3]+","
								+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[5]))+""
								+ "}"
								+ "},";
					}	
					commRequest+= "\"Current\": {"
							+ "\"AcqTime\":\""+currentTime+"\","
							+ "\"CommStatus\":"+acqOnline.getStatus()+""
							+ "}"
							+ "}";
					String commResponse="";
//					commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
					type = new TypeToken<CommResponseData>() {}.getType();
					commResponseData=gson.fromJson(commResponse, type);
					String updateRealData="update "+realtimeTable+" t set t.acqTime=to_date('"+currentTime+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(acqOnline.getStatus()?1:0);
					String updateRealCommRangeClobSql="update "+realtimeTable+" t set t.commrange=?";
					
					String updateHistData="update "+historyTable+" t set t.acqTime=to_date('"+currentTime+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(acqOnline.getStatus()?1:0);
					String updateHistCommRangeClobSql="update "+historyTable+" t set t.commrange=?";
					List<String> clobCont=new ArrayList<String>();
					
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						updateRealData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
								+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
						updateHistData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
								+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
						
						clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
					}
					updateRealData+=" where t.wellId= "+wellId;
					updateRealCommRangeClobSql+=" where t.wellId= "+wellId;
					
					updateHistData+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";
					updateHistCommRangeClobSql+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";;
					
					int result=commonDataService.getBaseDao().updateOrDeleteBySql(updateRealData);
					result=commonDataService.getBaseDao().updateOrDeleteBySql(updateHistData);
					
					//更新内存中设备通信状态
					Map<String, Object> dataModelMap = DataModelMap.getMapObject();
					List<CommStatus> commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
					if(commStatusList==null){
						EquipmentDriverServerTask.LoadDeviceCommStatus();
						commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
					}
					for(int i=0;i<commStatusList.size();i++){
						if(wellName.equals(commStatusList.get(i).getDeviceName()) && deviceType.equals(commStatusList.get(i).getDeviceType()+"")){
							commStatusList.get(i).setCommStatus(acqOnline.getStatus()?1:0);
							break;
						}
					}
					
					String commAlarm="";
					int commAlarmLevel=0,isSendMessage=0,isSendMail=0,delay=0;
					String key="";
					String alarmInfo="";
					Map<String, String> alarmInfoMap=AlarmInfoMap.getMapObject();
					if(acqOnline.getStatus()){
						key=wellName+","+deviceType+",上线";
						alarmInfo="上线";
						for(int i=0;i<commAlarmList.size();i++){
							Object[] alarmObj=(Object[]) commAlarmList.get(i);
							if("上线".equalsIgnoreCase(alarmObj[0]+"") && StringManagerUtils.isInteger(alarmObj[1]+"")){
								commAlarmLevel=StringManagerUtils.stringToInteger(alarmObj[1]+"");
								isSendMessage=StringManagerUtils.stringToInteger(alarmObj[2]+"");
								isSendMail=StringManagerUtils.stringToInteger(alarmObj[3]+"");
								delay=StringManagerUtils.stringToInteger(alarmObj[4]+"");
								break;
							}
						}
					}else{
						key=wellName+","+deviceType+",离线";
						alarmInfo="离线";
						for(int i=0;i<commAlarmList.size();i++){
							Object[] alarmObj=(Object[]) commAlarmList.get(i);
							if("离线".equalsIgnoreCase(alarmObj[0]+"") && StringManagerUtils.isInteger(alarmObj[1]+"")){
								commAlarmLevel=StringManagerUtils.stringToInteger(alarmObj[1]+"");
								isSendMessage=StringManagerUtils.stringToInteger(alarmObj[2]+"");
								isSendMail=StringManagerUtils.stringToInteger(alarmObj[3]+"");
								delay=StringManagerUtils.stringToInteger(alarmObj[4]+"");
								break;
							}
						}
					}
					commAlarm="insert into "+alarmTableName+" (wellid,alarmtime,itemname,alarmtype,alarmvalue,alarminfo,alarmlevel)"
							+ "values("+wellId+",to_date('"+currentTime+"','yyyy-mm-dd hh24:mi:ss'),'通信状态',0,"+(acqOnline.getStatus()?1:0)+",'"+alarmInfo+"',"+commAlarmLevel+")";
					String alarmSMSContent="设备"+wellName+"于"+currentTime+"离线";
					
					String lastAlarmTime=alarmInfoMap.get(key);
					long timeDiff=StringManagerUtils.getTimeDifference(lastAlarmTime, currentTime, "yyyy-MM-dd HH:mm:ss");
					if(commAlarmLevel>0&&timeDiff>delay*1000){
						result=commonDataService.getBaseDao().updateOrDeleteBySql(commAlarm);
						calculateDataService.sendAlarmSMS(wellName, deviceType,isSendMessage==1,isSendMail==1,alarmSMSContent,alarmSMSContent);
						alarmInfoMap.put(key, currentTime);
					}
					
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRealCommRangeClobSql,clobCont);
						result=commonDataService.getBaseDao().executeSqlUpdateClob(updateHistCommRangeClobSql,clobCont);
					}
					
					webSocketSendData.append("{\"functionCode\":\""+functionCode+"\",");
					webSocketSendData.append("\"wellName\":\""+wellName+"\",");
					webSocketSendData.append("\"orgId\":"+orgId+",");
					webSocketSendData.append("\"acqTime\":\""+currentTime+"\",");
					webSocketSendData.append("\"commStatus\":"+(acqOnline.getStatus()?1:0)+",");
					webSocketSendData.append("\"commAlarmLevel\":"+commAlarmLevel);
					webSocketSendData.append("}");
					if(StringManagerUtils.isNotNull(webSocketSendData.toString())){
						infoHandler().sendMessageToBy("ApWebSocketClient", webSocketSendData.toString());
					}
				}
			}
		}
		String json = "{success:true,flag:true}";
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/acq/group")
	public String AcqGroupData() throws Exception{
		ServletInputStream ss = request.getInputStream();
		Gson gson=new Gson();
		String data=StringManagerUtils.convertStreamToString(ss,"utf-8");
		StringManagerUtils.printLog(StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"接收到ad推送group数据："+data);
		java.lang.reflect.Type type = new TypeToken<AcqGroup>() {}.getType();
		AcqGroup acqGroup=gson.fromJson(data, type);
		String json = "{success:true,flag:true}";
		if(acqGroup!=null){
			Jedis jedis = new Jedis();
			RPCDeviceInfo rpcDeviceInfo=null;
			PCPDeviceInfo pcpDeviceInfo=null;
			
			if(!jedis.exists("RPCDeviceInfo".getBytes())){
				MemoryDataManagerTask.loadRPCDeviceInfo(null);
			}
			List<byte[]> rpcDeviceInfoByteList =jedis.hvals("RPCDeviceInfo".getBytes());
			for(int i=0;i<rpcDeviceInfoByteList.size();i++){
				Object obj = SerializeObjectUnils.unserizlize(rpcDeviceInfoByteList.get(i));
				if (obj instanceof RPCDeviceInfo) {
					RPCDeviceInfo memRPCDeviceInfo=(RPCDeviceInfo)obj;
					if(acqGroup.getID().equalsIgnoreCase(memRPCDeviceInfo.getSignInId()) && acqGroup.getSlave()==StringManagerUtils.stringToInteger(memRPCDeviceInfo.getSlave())){
						rpcDeviceInfo=memRPCDeviceInfo;
						break;
					}
				}
			}
			
			
			if(rpcDeviceInfo==null){
				if(!jedis.exists("PCPDeviceInfo".getBytes())){
					MemoryDataManagerTask.loadPCPDeviceInfo(null);
				}
				List<byte[]> pcpDeviceInfoByteList =jedis.hvals("PCPDeviceInfo".getBytes());
				for(int i=0;i<pcpDeviceInfoByteList.size();i++){
					Object obj = SerializeObjectUnils.unserizlize(pcpDeviceInfoByteList.get(i));
					if (obj instanceof PCPDeviceInfo) {
						PCPDeviceInfo memPCPDeviceInfo=(PCPDeviceInfo)obj;
						if(acqGroup.getID().equalsIgnoreCase(memPCPDeviceInfo.getSignInId()) && acqGroup.getSlave()==StringManagerUtils.stringToInteger(memPCPDeviceInfo.getSlave())){
							pcpDeviceInfo=memPCPDeviceInfo;
							break;
						}
					}
				}
			}
			
			if(rpcDeviceInfo!=null){
				this.RPCDataProcessing(rpcDeviceInfo,acqGroup);
			}
			if(pcpDeviceInfo!=null){
//				this.PCPDataProcessing(pcpDeviceInfo,acqGroup);
			}
			jedis.disconnect();
			jedis.close();
		}else{
			json = "{success:true,flag:false}";
		}
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	};
	
	@SuppressWarnings({ "rawtypes", "unchecked", "resource" })
	public String RPCDataProcessing(RPCDeviceInfo rpcDeviceInfo,AcqGroup acqGroup) throws Exception{
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		int dataSaveMode=Config.getInstance().configFile.getOthers().getDataSaveMode();
		String url=Config.getInstance().configFile.getAgileCalculate().getFESDiagram()[0];
		List<String> websocketClientUserList=new ArrayList<>();
		for (WebSocketByJavax item : WebSocketByJavax.clients.values()) { 
            String[] clientInfo=item.userId.split("_");
            if(clientInfo!=null && clientInfo.length==3 && !StringManagerUtils.existOrNot(websocketClientUserList, clientInfo[1], true)){
            	websocketClientUserList.add(clientInfo[1]);
            }
        }
		Jedis jedis = new Jedis();
		StringBuffer webSocketSendData = new StringBuffer();
		StringBuffer info_json = new StringBuffer();
//		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		boolean save=false;
		boolean alarm=false;
		boolean sendMessage=false;
		
		if(!jedis.exists("AlarmShowStyle".getBytes())){
			MemoryDataManagerTask.initAlarmStyle();
		}
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) SerializeObjectUnils.unserizlize(jedis.get("AlarmShowStyle".getBytes()));
		
		if(!jedis.exists("RPCWorkType".getBytes())){
			MemoryDataManagerTask.loadRPCWorkType();
		}
		
		if(!jedis.exists("rpcCalItemList".getBytes())){
			MemoryDataManagerTask.loadRPCCalculateItem();
		}
		
		if(!jedis.exists("UserInfo".getBytes())){
			MemoryDataManagerTask.loadUserInfo();
		}
		
		if(!jedis.exists("AcqInstanceOwnItem".getBytes())){
			MemoryDataManagerTask.loadAcqInstanceOwnItemByGroupId("");
		}
		
		if(!jedis.exists("DisplayInstanceOwnItem".getBytes())){
			MemoryDataManagerTask.loadDisplayInstanceOwnItemByUnitId("");
		}
		
		if(!jedis.exists("AlarmInstanceOwnItem".getBytes())){
			MemoryDataManagerTask.loadAlarmInstanceOwnItemByUnitId("");
		}
		
		String deviceTableName="tbl_rpcdevice";
		String realtimeTable="tbl_rpcacqdata_latest";
		String historyTable="tbl_rpcacqdata_hist";
		String rawDataTable="tbl_rpcacqrawdata";
		String functionCode="rpcDeviceRealTimeMonitoringData";
		String columnsKey="rpcDeviceAcquisitionItemColumns";
		int DeviceType=0;
		if(rpcDeviceInfo.getDeviceType()>=100 && rpcDeviceInfo.getDeviceType()<200){
			DeviceType=0;
		}else if(rpcDeviceInfo.getDeviceType()>=200 && rpcDeviceInfo.getDeviceType()<300){
			DeviceType=1;
		}
		Map<String, Map<String,String>> acquisitionItemColumnsMap=AcquisitionItemColumnsMap.getMapObject();
		if(acquisitionItemColumnsMap==null||acquisitionItemColumnsMap.size()==0||acquisitionItemColumnsMap.get(columnsKey)==null){
			EquipmentDriverServerTask.loadAcquisitionItemColumns(DeviceType);
		}
		Map<String,String> loadedAcquisitionItemColumnsMap=acquisitionItemColumnsMap.get(columnsKey);
		if(acqGroup!=null){
			Set<byte[]>rpcCalItemSet= jedis.smembers("rpcCalItemList".getBytes());
			String protocolName="";
			AcqInstanceOwnItem acqInstanceOwnItem=null;
			if(jedis.hexists("AcqInstanceOwnItem".getBytes(), rpcDeviceInfo.getInstanceCode().getBytes())){
				acqInstanceOwnItem=(AcqInstanceOwnItem) SerializeObjectUnils.unserizlize(jedis.hget("AcqInstanceOwnItem".getBytes(), rpcDeviceInfo.getInstanceCode().getBytes()));
				protocolName=acqInstanceOwnItem.getProtocol();
			}
			DisplayInstanceOwnItem displayInstanceOwnItem=null;
			if(jedis.hexists("DisplayInstanceOwnItem".getBytes(), rpcDeviceInfo.getDisplayInstanceCode().getBytes())){
				displayInstanceOwnItem=(DisplayInstanceOwnItem) SerializeObjectUnils.unserizlize(jedis.hget("DisplayInstanceOwnItem".getBytes(), rpcDeviceInfo.getDisplayInstanceCode().getBytes()));
			}
			
			AlarmInstanceOwnItem alarmInstanceOwnItem=null;
			if(jedis.hexists("AlarmInstanceOwnItem".getBytes(), rpcDeviceInfo.getAlarmInstanceCode().getBytes())){
				alarmInstanceOwnItem=(AlarmInstanceOwnItem) SerializeObjectUnils.unserizlize(jedis.hget("AlarmInstanceOwnItem".getBytes(), rpcDeviceInfo.getAlarmInstanceCode().getBytes()));
			}
			ModbusProtocolConfig modbusProtocolConfig=MemoryDataManagerTask.getModbusProtocolConfig();
			
			ModbusProtocolConfig.Protocol protocol=null;
			if(StringManagerUtils.isNotNull(protocolName)){
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(protocolName.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getName())){
						protocol=modbusProtocolConfig.getProtocol().get(i);
						break;
					}
				}
			}
			
			if(protocol!=null){
				String lastSaveTime=rpcDeviceInfo.getAcqTime();
				int save_cycle=acqInstanceOwnItem.getSaveCycle();
				String acqTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
				long timeDiff=StringManagerUtils.getTimeDifference(lastSaveTime, acqTime, "yyyy-MM-dd HH:mm:ss");
				if(timeDiff>save_cycle*1000){
					save=true;
				}
				
				RPCCalculateRequestData rpcCalculateRequestData=new RPCCalculateRequestData();
				rpcCalculateRequestData.init();
				RPCCalculateResponseData rpcCalculateResponseData=null;
				
				rpcCalculateRequestData.setWellName(rpcDeviceInfo.getWellName());
				rpcCalculateRequestData.setFluidPVT(rpcDeviceInfo.getFluidPVT());
				rpcCalculateRequestData.setReservoir(rpcDeviceInfo.getReservoir());
				rpcCalculateRequestData.setRodString(rpcDeviceInfo.getRodString());
				rpcCalculateRequestData.setTubingString(rpcDeviceInfo.getTubingString());
				rpcCalculateRequestData.setCasingString(rpcDeviceInfo.getCasingString());
				rpcCalculateRequestData.setPump(rpcDeviceInfo.getPump());
				rpcCalculateRequestData.setPumpingUnit(rpcDeviceInfo.getPumpingUnit());
				rpcCalculateRequestData.setProduction(rpcDeviceInfo.getProduction());
				rpcCalculateRequestData.setManualIntervention(rpcDeviceInfo.getManualIntervention());
				
				String updateRealtimeData="update "+realtimeTable+" t set t.acqTime=to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss'),t.CommStatus=1";
				String insertHistColumns="wellid,acqTime,CommStatus";
				String insertHistValue=rpcDeviceInfo.getId()+",to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss'),1";
				String insertHistSql="";
				
				List<AcquisitionItemInfo> acquisitionItemInfoList=new ArrayList<AcquisitionItemInfo>();
				List<ProtocolItemResolutionData> protocolItemResolutionDataList=new ArrayList<ProtocolItemResolutionData>();
				for(int i=0;acqGroup.getAddr()!=null &&i<acqGroup.getAddr().size();i++){
					for(int j=0;j<protocol.getItems().size();j++){
						if(acqGroup.getAddr().get(i)==protocol.getItems().get(j).getAddr()){
							String value="";
							String columnName=dataSaveMode==0?("addr"+protocol.getItems().get(j).getAddr()):(loadedAcquisitionItemColumnsMap.get(protocol.getItems().get(j).getTitle()));
							
							DataMapping dataMappingColumn=(DataMapping)SerializeObjectUnils.unserizlize(jedis.hget("ProtocolMappingColumn".getBytes(), (protocol.getDeviceType()+"_"+columnName).getBytes()));
							
							if(acqGroup.getValue()!=null&&acqGroup.getValue().size()>i&&acqGroup.getValue().get(i)!=null){
								value=StringManagerUtils.objectListToString(acqGroup.getValue().get(i), protocol.getItems().get(j).getIFDataType());
							}
							String rawValue=value;
							String addr=protocol.getItems().get(j).getAddr()+"";
							String title=protocol.getItems().get(j).getTitle();
							String rawTitle=title;
							String columnDataType=protocol.getItems().get(j).getIFDataType();
							String resolutionMode=protocol.getItems().get(j).getResolutionMode()+"";
							String bitIndex="";
							String unit=protocol.getItems().get(j).getUnit();
							int alarmLevel=0;
							int sort=9999;
							
							if(existOrNot(acqInstanceOwnItem.getItemList(), title, false)){
								updateRealtimeData+=",t."+columnName+"='"+rawValue+"'";
								insertHistColumns+=","+columnName;
								insertHistValue+=",'"+rawValue+"'";
								
								
								if(protocol.getItems().get(j).getResolutionMode()==1||protocol.getItems().get(j).getResolutionMode()==2){//如果是枚举量或数据量
									if(protocol.getItems().get(j).getMeaning()!=null&&protocol.getItems().get(j).getMeaning().size()>0){
										for(int l=0;l<protocol.getItems().get(j).getMeaning().size();l++){
											if(StringManagerUtils.isNotNull(value)&&StringManagerUtils.stringToFloat(value)==(protocol.getItems().get(j).getMeaning().get(l).getValue())){
												value=protocol.getItems().get(j).getMeaning().get(l).getMeaning();
												break;
											}
										}
									}
									ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(rawTitle,title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex,unit,sort);
									protocolItemResolutionDataList.add(protocolItemResolutionData);
								}else if(protocol.getItems().get(j).getResolutionMode()==0){//如果是开关量
									boolean isMatch=false;
									if(protocol.getItems().get(j).getMeaning()!=null&&protocol.getItems().get(j).getMeaning().size()>0){
										int maxIndex=0;
										for(int l=0;l<protocol.getItems().get(j).getMeaning().size();l++){
											if(protocol.getItems().get(j).getMeaning().get(l).getValue()>maxIndex){
												maxIndex=protocol.getItems().get(j).getMeaning().get(l).getValue();
											}
										}
										String[] valueArr=new String[maxIndex+1];
										if(StringManagerUtils.isNotNull(value)){
											valueArr=value.split(",");
										}
										for(int l=0;l<protocol.getItems().get(j).getMeaning().size();l++){
											title=protocol.getItems().get(j).getMeaning().get(l).getMeaning();
											
											isMatch=false;
											for(int n=0;n<acqInstanceOwnItem.getItemList().size();n++){
												if(acqInstanceOwnItem.getItemList().get(n).getItemName().equalsIgnoreCase(protocol.getItems().get(j).getTitle()) 
														&&acqInstanceOwnItem.getItemList().get(n).getBitIndex()==protocol.getItems().get(j).getMeaning().get(l).getValue()
														){
													isMatch=true;
													break;
												}
											}
											if(!isMatch){
												continue;
											}
											if(StringManagerUtils.isNotNull(value) || true){
												boolean match=false;
												for(int m=0;valueArr!=null&&m<valueArr.length;m++){
													if(m==protocol.getItems().get(j).getMeaning().get(l).getValue()){
														bitIndex=protocol.getItems().get(j).getMeaning().get(l).getValue()+"";
														if(("bool".equalsIgnoreCase(columnDataType) || "boolean".equalsIgnoreCase(columnDataType)) && StringManagerUtils.isNotNull(valueArr[m])){
															value=("true".equalsIgnoreCase(valueArr[m]) || "1".equalsIgnoreCase(valueArr[m]))?"开":"关";
															rawValue=("true".equalsIgnoreCase(valueArr[m]) || "1".equalsIgnoreCase(valueArr[m]))?"1":"0";
														}else{
															value="";
															rawValue="";
														}
														ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(rawTitle,title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex,unit,sort);
														protocolItemResolutionDataList.add(protocolItemResolutionData);
														match=true;
														break;
													}
												}
												if(!match){
													value="";
													rawValue="";
													bitIndex=protocol.getItems().get(j).getMeaning().get(l).getValue()+"";
													ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(rawTitle,title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex,unit,sort);
													protocolItemResolutionDataList.add(protocolItemResolutionData);
												}
											}
										}
									}else{
										ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(rawTitle,title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex,unit,sort);
										protocolItemResolutionDataList.add(protocolItemResolutionData);
									}
								}else{
									ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(rawTitle,title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex,unit,sort);
									protocolItemResolutionDataList.add(protocolItemResolutionData);
								}
								
								if("TubingPressure".equalsIgnoreCase(dataMappingColumn.getCalColumn())){//油压
									rpcCalculateRequestData.getProduction().setTubingPressure(StringManagerUtils.stringToFloat(rawValue));
									rpcDeviceInfo.getProduction().setTubingPressure(StringManagerUtils.stringToFloat(rawValue));
									updateRealtimeData+=",t.TubingPressure="+rawValue+"";
									insertHistColumns+=",TubingPressure";
									insertHistValue+=","+rawValue+"";
								}else if("CasingPressure".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									rpcCalculateRequestData.getProduction().setCasingPressure(StringManagerUtils.stringToFloat(rawValue));
									rpcDeviceInfo.getProduction().setCasingPressure(StringManagerUtils.stringToFloat(rawValue));
									updateRealtimeData+=",t.CasingPressure="+rawValue+"";
									insertHistColumns+=",CasingPressure";
									insertHistValue+=","+rawValue+"";
								}else if("ProducingfluidLevel".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									rpcCalculateRequestData.getProduction().setProducingfluidLevel(StringManagerUtils.stringToFloat(rawValue));
									rpcDeviceInfo.getProduction().setProducingfluidLevel(StringManagerUtils.stringToFloat(rawValue));
									updateRealtimeData+=",t.ProducingfluidLevel="+rawValue+"";
									insertHistColumns+=",ProducingfluidLevel";
									insertHistValue+=","+rawValue+"";
								}else if("volumeWaterCut".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									rpcCalculateRequestData.getProduction().setWaterCut(StringManagerUtils.stringToFloat(rawValue));
									rpcDeviceInfo.getProduction().setWaterCut(StringManagerUtils.stringToFloat(rawValue));
									updateRealtimeData+=",t.volumeWaterCut="+rawValue+"";
									insertHistColumns+=",volumeWaterCut";
									insertHistValue+=","+rawValue+"";
								}else if("acqtime".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									rpcCalculateRequestData.getFESDiagram().setAcqTime(rawValue);
								}else if("stroke".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									rpcCalculateRequestData.getFESDiagram().setStroke(StringManagerUtils.stringToFloat(rawValue));
								}else if("spm".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									rpcCalculateRequestData.getFESDiagram().setSPM(StringManagerUtils.stringToFloat(rawValue));
								}else if("position_curve".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									if(StringManagerUtils.isNotNull(rawValue)){
										String[] dataArr=rawValue.split(",");
										for(int k=0;k<dataArr.length;k++){
											rpcCalculateRequestData.getFESDiagram().getS().add(StringManagerUtils.stringToFloat(dataArr[k]));
										}
									}
								}else if("load_curve".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									if(StringManagerUtils.isNotNull(rawValue)){
										String[] dataArr=rawValue.split(",");
										for(int k=0;k<dataArr.length;k++){
											rpcCalculateRequestData.getFESDiagram().getF().add(StringManagerUtils.stringToFloat(dataArr[k]));
										}
									}
								}else if("power_curve".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									if(StringManagerUtils.isNotNull(rawValue)){
										String[] dataArr=rawValue.split(",");
										for(int k=0;k<dataArr.length;k++){
											rpcCalculateRequestData.getFESDiagram().getWatt().add(StringManagerUtils.stringToFloat(dataArr[k]));
										}
									}
								}else if("current_curve".equalsIgnoreCase(dataMappingColumn.getCalColumn())){
									if(StringManagerUtils.isNotNull(rawValue)){
										String[] dataArr=rawValue.split(",");
										for(int k=0;k<dataArr.length;k++){
											rpcCalculateRequestData.getFESDiagram().getI().add(StringManagerUtils.stringToFloat(dataArr[k]));
										}
									}
								}
							}
							break;
						}
					}
				}
				
				if(StringManagerUtils.isNotNull(rpcCalculateRequestData.getFESDiagram().getAcqTime())
						&& rpcCalculateRequestData.getFESDiagram().getS().size()>0
						&& rpcCalculateRequestData.getFESDiagram().getF().size()>0){
					String responseData=StringManagerUtils.sendPostMethod(url, gson.toJson(rpcCalculateRequestData),"utf-8");
					type = new TypeToken<RPCCalculateResponseData>() {}.getType();
					rpcCalculateResponseData=gson.fromJson(responseData, type);
					
					if(rpcCalculateResponseData!=null){
						
					}
				}
				
				updateRealtimeData+=" where t.wellId= "+rpcDeviceInfo.getId();
				insertHistSql="insert into "+historyTable+"("+insertHistColumns+")values("+insertHistValue+")";
				
				//排序
				Collections.sort(protocolItemResolutionDataList);
				//报警判断
				for(int i=0;i<protocolItemResolutionDataList.size();i++){
					int alarmLevel=0;
					AcquisitionItemInfo acquisitionItemInfo=new AcquisitionItemInfo();
					acquisitionItemInfo.setAddr(StringManagerUtils.stringToInteger(protocolItemResolutionDataList.get(i).getAddr()));
					acquisitionItemInfo.setColumn(protocolItemResolutionDataList.get(i).getColumn());
					acquisitionItemInfo.setTitle(protocolItemResolutionDataList.get(i).getColumnName());
					acquisitionItemInfo.setRawTitle(protocolItemResolutionDataList.get(i).getRawColumnName());
					acquisitionItemInfo.setValue(protocolItemResolutionDataList.get(i).getValue());
					acquisitionItemInfo.setRawValue(protocolItemResolutionDataList.get(i).getRawValue());
					acquisitionItemInfo.setDataType(protocolItemResolutionDataList.get(i).getColumnDataType());
					acquisitionItemInfo.setResolutionMode(protocolItemResolutionDataList.get(i).getResolutionMode());
					acquisitionItemInfo.setBitIndex(protocolItemResolutionDataList.get(i).getBitIndex());
					acquisitionItemInfo.setAlarmLevel(alarmLevel);
					acquisitionItemInfo.setUnit(protocolItemResolutionDataList.get(i).getUnit());
					acquisitionItemInfo.setSort(protocolItemResolutionDataList.get(i).getSort());
					for(int l=0;alarmInstanceOwnItem!=null&&l<alarmInstanceOwnItem.getItemList().size();l++){
						if((acquisitionItemInfo.getAddr()+"").equals(alarmInstanceOwnItem.getItemList().get(l).getItemAddr()+"")){
							int alarmType=alarmInstanceOwnItem.getItemList().get(l).getType();
							if(alarmType==2 && StringManagerUtils.isNotNull(acquisitionItemInfo.getRawValue())){//数据量报警
								float hystersis=alarmInstanceOwnItem.getItemList().get(l).getHystersis();
								if(StringManagerUtils.isNotNull(alarmInstanceOwnItem.getItemList().get(l).getUpperLimit()+"") && StringManagerUtils.stringToFloat(acquisitionItemInfo.getRawValue())>alarmInstanceOwnItem.getItemList().get(l).getUpperLimit()+hystersis){
									alarmLevel=alarmInstanceOwnItem.getItemList().get(l).getAlarmSign()>0?alarmInstanceOwnItem.getItemList().get(l).getAlarmLevel():0;
									acquisitionItemInfo.setAlarmLevel(alarmLevel);
									acquisitionItemInfo.setHystersis(hystersis);
									acquisitionItemInfo.setAlarmLimit(alarmInstanceOwnItem.getItemList().get(l).getUpperLimit());
									acquisitionItemInfo.setAlarmInfo("高报");
									acquisitionItemInfo.setAlarmType(1);
									acquisitionItemInfo.setAlarmDelay(alarmInstanceOwnItem.getItemList().get(l).getDelay());
									acquisitionItemInfo.setIsSendMessage(alarmInstanceOwnItem.getItemList().get(l).getIsSendMessage());
									acquisitionItemInfo.setIsSendMail(alarmInstanceOwnItem.getItemList().get(l).getIsSendMail());
								}else if((StringManagerUtils.isNotNull(alarmInstanceOwnItem.getItemList().get(l).getLowerLimit()+"") && StringManagerUtils.stringToFloat(acquisitionItemInfo.getRawValue())<alarmInstanceOwnItem.getItemList().get(l).getLowerLimit()-hystersis)){
									alarmLevel=alarmInstanceOwnItem.getItemList().get(l).getAlarmSign()>0?alarmInstanceOwnItem.getItemList().get(l).getAlarmLevel():0;
									acquisitionItemInfo.setAlarmLevel(alarmLevel);
									acquisitionItemInfo.setHystersis(hystersis);
									acquisitionItemInfo.setAlarmLimit(alarmInstanceOwnItem.getItemList().get(l).getLowerLimit());
									acquisitionItemInfo.setAlarmInfo("低报");
									acquisitionItemInfo.setAlarmType(1);
									acquisitionItemInfo.setAlarmDelay(alarmInstanceOwnItem.getItemList().get(l).getDelay());
									acquisitionItemInfo.setIsSendMessage(alarmInstanceOwnItem.getItemList().get(l).getIsSendMessage());
									acquisitionItemInfo.setIsSendMail(alarmInstanceOwnItem.getItemList().get(l).getIsSendMail());
								}
								break;
							}else if(alarmType==0  && StringManagerUtils.isNotNull(acquisitionItemInfo.getRawValue()) ){//开关量报警
								if(StringManagerUtils.isNotNull(acquisitionItemInfo.getBitIndex())){
									if(acquisitionItemInfo.getBitIndex().equals(alarmInstanceOwnItem.getItemList().get(l).getBitIndex()+"") && StringManagerUtils.stringToInteger(acquisitionItemInfo.getRawValue())==StringManagerUtils.stringToInteger(alarmInstanceOwnItem.getItemList().get(l).getValue()+"")){
										alarmLevel=alarmInstanceOwnItem.getItemList().get(l).getAlarmSign()>0?alarmInstanceOwnItem.getItemList().get(l).getAlarmLevel():0;
										acquisitionItemInfo.setAlarmLevel(alarmLevel);
										acquisitionItemInfo.setAlarmInfo(acquisitionItemInfo.getValue());
										acquisitionItemInfo.setAlarmType(3);
										acquisitionItemInfo.setAlarmDelay(alarmInstanceOwnItem.getItemList().get(l).getDelay());
										acquisitionItemInfo.setIsSendMessage(alarmInstanceOwnItem.getItemList().get(l).getIsSendMessage());
										acquisitionItemInfo.setIsSendMail(alarmInstanceOwnItem.getItemList().get(l).getIsSendMail());
									}
								}
							}else if(alarmType==1  && StringManagerUtils.isNotNull(acquisitionItemInfo.getRawValue()) ){//枚举量报警
								if(StringManagerUtils.stringToInteger(acquisitionItemInfo.getRawValue())==StringManagerUtils.stringToInteger(alarmInstanceOwnItem.getItemList().get(l).getValue()+"")){
									alarmLevel=alarmInstanceOwnItem.getItemList().get(l).getAlarmSign()>0?alarmInstanceOwnItem.getItemList().get(l).getAlarmLevel():0;
									acquisitionItemInfo.setAlarmLevel(alarmLevel);
									acquisitionItemInfo.setAlarmInfo(acquisitionItemInfo.getValue());
									acquisitionItemInfo.setAlarmType(2);
									acquisitionItemInfo.setAlarmDelay(alarmInstanceOwnItem.getItemList().get(l).getDelay());
									acquisitionItemInfo.setIsSendMessage(alarmInstanceOwnItem.getItemList().get(l).getIsSendMessage());
									acquisitionItemInfo.setIsSendMail(alarmInstanceOwnItem.getItemList().get(l).getIsSendMail());
								}
							}
						}
					}
					if(acquisitionItemInfo.getAlarmLevel()>0){
						alarm=true;
					}
					acquisitionItemInfoList.add(acquisitionItemInfo);
				}
				//更新内存中设备通信状态
				Map<String, Object> dataModelMap = DataModelMap.getMapObject();
				List<CommStatus> commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
				if(commStatusList==null){
					EquipmentDriverServerTask.LoadDeviceCommStatus();
					commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
				}
				for(int i=0;i<commStatusList.size();i++){
					if(rpcDeviceInfo.getWellName().equals(commStatusList.get(i).getDeviceName()) && rpcDeviceInfo.getDeviceType()==commStatusList.get(i).getDeviceType()){
						commStatusList.get(i).setCommStatus(1);
						break;
					}
				}
				dataModelMap.put("DeviceCommStatus", commStatusList);
				
				if(save || alarm){//如果满足保存周期或者有报警，保存数据
					String saveRawDataSql="insert into "+rawDataTable+"(wellid,acqtime,rawdata)values("+rpcDeviceInfo.getId()+",to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss'),'"+acqGroup.getRawData()+"' )";
					rpcDeviceInfo.setAcqTime(acqTime);
					rpcDeviceInfo.setAcquisitionItemInfoList(acquisitionItemInfoList);
					//更新内存数据
					jedis.hset("RPCDeviceInfo".getBytes(), (rpcDeviceInfo.getId()+"").getBytes(), SerializeObjectUnils.serialize(rpcDeviceInfo));
					commonDataService.getBaseDao().updateOrDeleteBySql(updateRealtimeData);
					commonDataService.getBaseDao().updateOrDeleteBySql(insertHistSql);
					commonDataService.getBaseDao().updateOrDeleteBySql(saveRawDataSql);
					//报警项
					if(alarm){
//						calculateDataService.saveAlarmInfo(wellName,deviceType,acqTime,acquisitionItemInfoList);
						calculateDataService.saveAndSendAlarmInfo(rpcDeviceInfo.getWellName(),rpcDeviceInfo.getDeviceType()+"",acqTime,acquisitionItemInfoList);
					}
				}
				
				
				//处理websocket推送
				if(displayInstanceOwnItem!=null){
					for (String websocketClientUser : websocketClientUserList) {
						if(jedis.hexists("UserInfo".getBytes(), websocketClientUser.getBytes())){
							UserInfo userInfo=(UserInfo) SerializeObjectUnils.unserizlize(jedis.hget("UserInfo".getBytes(), websocketClientUser.getBytes()));
							
							int items=3;
							String columns = "[";
							for(int i=1;i<=items;i++){
								columns+= "{ \"header\":\"名称\",\"dataIndex\":\"name"+i+"\",children:[] },"
										+ "{ \"header\":\"变量\",\"dataIndex\":\"value"+i+"\",children:[] }";
								if(i<items){
									columns+=",";
								}
							}
							columns+= "]";
							
							webSocketSendData.append("{ \"success\":true,\"functionCode\":\""+functionCode+"\",\"wellName\":\""+rpcDeviceInfo.getWellName()+"\",\"acqTime\":\""+acqTime+"\",\"columns\":"+columns+",");
							webSocketSendData.append("\"totalRoot\":[");
							info_json.append("[");
							webSocketSendData.append("{\"name1\":\""+rpcDeviceInfo.getWellName()+":"+acqTime+" 在线\"},");
							//排序
							Collections.sort(acquisitionItemInfoList);
							//筛选
							List<AcquisitionItemInfo> userAcquisitionItemInfoList=new ArrayList<AcquisitionItemInfo>();
							for(int j=0;j<acquisitionItemInfoList.size();j++){
								for(int k=0;k<displayInstanceOwnItem.getItemList().size();k++){
									if(existDisplayItem(displayInstanceOwnItem.getItemList(), acquisitionItemInfoList.get(j).getRawTitle(), false)){
										if(displayInstanceOwnItem.getItemList().get(k).getShowLevel()==0||displayInstanceOwnItem.getItemList().get(k).getShowLevel()>userInfo.getRoleShowLevel()){
											userAcquisitionItemInfoList.add(acquisitionItemInfoList.get(j));
										}
										break;
									}
								}
							}
							//插入排序间隔的空项
							List<AcquisitionItemInfo> finalAcquisitionItemInfoList=new ArrayList<AcquisitionItemInfo>();
							for(int j=0;j<userAcquisitionItemInfoList.size();j++){
								if(j>0&&userAcquisitionItemInfoList.get(j).getSort()<9999
										&&userAcquisitionItemInfoList.get(j).getSort()-userAcquisitionItemInfoList.get(j-1).getSort()>1
									){
										int def=userAcquisitionItemInfoList.get(j).getSort()-userAcquisitionItemInfoList.get(j-1).getSort();
										for(int k=1;k<def;k++){
											AcquisitionItemInfo acquisitionItemInfo=new AcquisitionItemInfo();
											finalAcquisitionItemInfoList.add(acquisitionItemInfo);
										}
									}
									finalAcquisitionItemInfoList.add(userAcquisitionItemInfoList.get(j));
							}
							
							int row=1;
							if(finalAcquisitionItemInfoList.size()%items==0){
								row=finalAcquisitionItemInfoList.size()/items+1;
							}else{
								row=finalAcquisitionItemInfoList.size()/items+2;
							}
							
							for(int j=1;j<row;j++){
								webSocketSendData.append("{");
								for(int k=0;k<items;k++){
									int index=items*(j-1)+k;
									String columnName="";
									String value="";
									String rawValue="";
									String column="";
									String columnDataType="";
									String resolutionMode="";
									String unit="";
									int alarmLevel=0;
									if(index<finalAcquisitionItemInfoList.size() 
											&& StringManagerUtils.isNotNull(finalAcquisitionItemInfoList.get(index).getTitle())
//											&&StringManagerUtils.existOrNot(userItems, finalAcquisitionItemInfoList.get(index).getRawTitle(),false)
											){
										columnName=finalAcquisitionItemInfoList.get(index).getTitle();
										value=finalAcquisitionItemInfoList.get(index).getValue();
										rawValue=finalAcquisitionItemInfoList.get(index).getRawValue();
										column=finalAcquisitionItemInfoList.get(index).getColumn();
										columnDataType=finalAcquisitionItemInfoList.get(index).getDataType();
										resolutionMode=finalAcquisitionItemInfoList.get(index).getResolutionMode()+"";
										alarmLevel=finalAcquisitionItemInfoList.get(index).getAlarmLevel();
										unit=finalAcquisitionItemInfoList.get(index).getUnit();
									}
									
									if(StringManagerUtils.isNotNull(columnName)&&StringManagerUtils.isNotNull(unit)){
										webSocketSendData.append("\"name"+(k+1)+"\":\""+(columnName+"("+unit+")")+"\",");
									}else{
										webSocketSendData.append("\"name"+(k+1)+"\":\""+columnName+"\",");
									}
									webSocketSendData.append("\"value"+(k+1)+"\":\""+value+"\",");
									info_json.append("{\"row\":"+j+",\"col\":"+k+",\"columnName\":\""+columnName+"\",\"column\":\""+column+"\",\"value\":\""+value+"\",\"rawValue\":\""+rawValue+"\",\"columnDataType\":\""+columnDataType+"\",\"resolutionMode\":\""+resolutionMode+"\",\"alarmLevel\":"+alarmLevel+"},");
								}
								if(webSocketSendData.toString().endsWith(",")){
									webSocketSendData.deleteCharAt(webSocketSendData.length() - 1);
								}
								webSocketSendData.append("},");
							}
							if(webSocketSendData.toString().endsWith(",")){
								webSocketSendData.deleteCharAt(webSocketSendData.length() - 1);
							}
							
							if(info_json.toString().endsWith(",")){
								info_json.deleteCharAt(info_json.length() - 1);
							}
							info_json.append("]");
							
							webSocketSendData.append("]");
							webSocketSendData.append(",\"CellInfo\":"+info_json);
							webSocketSendData.append(",\"AlarmShowStyle\":"+new Gson().toJson(alarmShowStyle)+"}");
							infoHandler().sendMessageToUser(websocketClientUser, webSocketSendData.toString());
						}
					}
				}
				
				jedis.disconnect();
				jedis.close();
			}
		}
		return null;
	}
	
	public static boolean existOrNot(List<AcqInstanceOwnItem.AcqItem> acqInstanceOwnItemList, String key, boolean caseSensitive ){
		boolean flag = false;
		for (int i = 0; i < acqInstanceOwnItemList.size(); i++) {
            boolean match = false;
            if (caseSensitive) {
                match = acqInstanceOwnItemList.get(i).getItemName().equals(key);
            } else {
                match = acqInstanceOwnItemList.get(i).getItemName().equalsIgnoreCase(key);
            }
            if (match) {
                flag = true;
                break;
            }
        }
		return flag;
	}
	
	public static boolean existDisplayItem(List<DisplayInstanceOwnItem.DisplayItem> displayItemList, String key, boolean caseSensitive ){
		boolean flag = false;
		for (int i = 0; i < displayItemList.size(); i++) {
            boolean match = false;
            if (caseSensitive) {
                match = displayItemList.get(i).getItemName().equals(key);
            } else {
                match = displayItemList.get(i).getItemName().equalsIgnoreCase(key);
            }
            if (match) {
                flag = true;
                break;
            }
        }
		return flag;
	}
}
