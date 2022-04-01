package com.cosog.task;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cosog.model.WorkType;
import com.cosog.model.calculate.AcqInstanceOwnItem;
import com.cosog.model.calculate.AlarmInstanceOwnItem;
import com.cosog.model.calculate.DisplayInstanceOwnItem;
import com.cosog.model.calculate.PCPDeviceInfo;
import com.cosog.model.calculate.PCPProductionData;
import com.cosog.model.calculate.RPCDeviceInfo;
import com.cosog.model.calculate.RPCProductionData;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.MemoryDataMap;
import com.cosog.utils.OracleJdbcUtis;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Component("LoadingMemoryData")  
public class MemoryDataManagerTast {

	private static MemoryDataManagerTast instance=new MemoryDataManagerTast();
	
	public static MemoryDataManagerTast getInstance(){
		return instance;
	}
	
//	@Scheduled(fixedRate = 1000*60*60*24*365*100)
	public void loadMemoryData() throws SQLException, ParseException,InterruptedException, IOException{
		loadAcqInstanceOwnItemByGroupId("");
		loadAlarmInstanceOwnItemByGroupId("");
		loadDisplayInstanceOwnItemByGroupId("");
		loadRPCDeviceInfo(null);
		loadPCPDeviceInfo(null);
	}
	
	public static void loadRPCDeviceInfo(List<String> wellIdList){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int result=0;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		Map<Integer,RPCDeviceInfo> rpcDeviceInfoMap= (HashMap<Integer,RPCDeviceInfo>)memoryDataMap.get("RPCDeviceInfo");
		if(rpcDeviceInfoMap==null){
			rpcDeviceInfoMap=new HashMap<Integer,RPCDeviceInfo>();
		}
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try { 
			String wellId=StringUtils.join(wellIdList, ",");
			String sql="select t.id,t.orgid,t.orgName,t.wellname,t.devicetype,t.devicetypename,t.applicationscenarios,t.applicationScenariosName,t.signinid,t.slave,t.videourl,"
					+ "t.instancecode,t.instancename,t.alarminstancecode,t.alarminstancename,t.displayinstancecode,t.displayinstancename,"
					+ "t.status,t.statusName,"
					+ "t.productiondata,t.balanceinfo,t.stroke,"
					+ "t.pumpingmodelid,"
					+ "t.manufacturer,t.model,t.crankrotationdirection,t.offsetangleofcrank,t.crankgravityradius,t.singlecrankweight,t.singlecrankpinweight,t.structuralunbalance,"
					+ "t.sortnum "
					+ " from viw_rpcdevice t";
			if(StringManagerUtils.isNotNull(wellId)){
				sql+=" and t.id in("+wellId+")";
			}
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				RPCDeviceInfo rocDeviceInfo=new RPCDeviceInfo();
				rocDeviceInfo.setId(rs.getInt(1));
				rocDeviceInfo.setOrgId(rs.getInt(2));
				rocDeviceInfo.setOrgName(rs.getString(3));
				rocDeviceInfo.setWellName(rs.getString(4));
				rocDeviceInfo.setDeviceType(rs.getInt(5));
				rocDeviceInfo.setDeviceTypeName(rs.getString(6));
				rocDeviceInfo.setApplicationScenarios(rs.getInt(7));
				rocDeviceInfo.setApplicationScenariosName(rs.getString(8));
				rocDeviceInfo.setSignInId(rs.getString(9));
				rocDeviceInfo.setSlave(rs.getString(10));
				rocDeviceInfo.setVideoUrl(rs.getString(11));
				rocDeviceInfo.setInstanceCode(rs.getString(12));
				rocDeviceInfo.setInstanceName(rs.getString(13));
				rocDeviceInfo.setAlarmInstanceCode(rs.getString(14));
				rocDeviceInfo.setAlarmInstanceName(rs.getString(15));
				rocDeviceInfo.setDisplayInstanceCode(rs.getString(16));
				rocDeviceInfo.setDisplayInstanceName(rs.getString(17));
				rocDeviceInfo.setStatus(rs.getInt(18));
				rocDeviceInfo.setStatusName(rs.getString(19));
				String productionData=rs.getString(20);
				String balanceInfo=rs.getString(21);
				float stroke=rs.getFloat(22);
				int pumpingModelId=rs.getInt(23);
				if(StringManagerUtils.isNotNull(productionData)){
					type = new TypeToken<RPCDeviceInfo>() {}.getType();
					RPCDeviceInfo rpcProductionData=gson.fromJson(productionData, type);
					rocDeviceInfo.setFluidPVT(rpcProductionData.getFluidPVT());
					rocDeviceInfo.setReservoir(rpcProductionData.getReservoir());
					rocDeviceInfo.setTubingString(rpcProductionData.getTubingString());
					rocDeviceInfo.setCasingString(rpcProductionData.getCasingString());
					rocDeviceInfo.setRodString(rpcProductionData.getRodString());
					rocDeviceInfo.setPump(rpcProductionData.getPump());
					rocDeviceInfo.setProduction(rpcProductionData.getProduction());
					rocDeviceInfo.setManualIntervention(rpcProductionData.getManualIntervention());
					if(pumpingModelId>0){
						rocDeviceInfo.setPumpingUnit(new RPCDeviceInfo.PumpingUnit());
						rocDeviceInfo.getPumpingUnit().setManufacturer(rs.getString(24));
						rocDeviceInfo.getPumpingUnit().setModel(rs.getString(25));
						rocDeviceInfo.getPumpingUnit().setStroke(stroke);
						rocDeviceInfo.getPumpingUnit().setCrankRotationDirection(rs.getString(26));
						rocDeviceInfo.getPumpingUnit().setOffsetAngleOfCrank(rs.getFloat(27));
						rocDeviceInfo.getPumpingUnit().setCrankGravityRadius(rs.getFloat(28));
						rocDeviceInfo.getPumpingUnit().setSingleCrankWeight(rs.getFloat(29));
						rocDeviceInfo.getPumpingUnit().setSingleCrankPinWeight(rs.getFloat(30));
						rocDeviceInfo.getPumpingUnit().setStructuralUnbalance(rs.getFloat(31));
						type = new TypeToken<RPCDeviceInfo.Balance>() {}.getType();
						RPCDeviceInfo.Balance balance=gson.fromJson(balanceInfo, type);
						if(balance!=null){
							rocDeviceInfo.getPumpingUnit().setBalance(balance);
						}
					}else{
						rocDeviceInfo.setPumpingUnit(null);
					}
				}else{
					rocDeviceInfo.setFluidPVT(null);
					rocDeviceInfo.setReservoir(null);
					rocDeviceInfo.setRodString(null);
					rocDeviceInfo.setTubingString(null);
					rocDeviceInfo.setCasingString(null);
					rocDeviceInfo.setPump(null);
					rocDeviceInfo.setProduction(null);
					rocDeviceInfo.setPumpingUnit(null);
					rocDeviceInfo.setManualIntervention(null);
				}
				rocDeviceInfo.setSortNum(32);
				System.out.println(gson.toJson(rocDeviceInfo));
				rpcDeviceInfoMap.put(rocDeviceInfo.getId(), rocDeviceInfo);
			}
			memoryDataMap.put("RPCDeviceInfo", rpcDeviceInfoMap);
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadPCPDeviceInfo(List<String> wellIdList){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		int result=0;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		Map<Integer,PCPDeviceInfo> pcpDeviceInfoMap= (HashMap<Integer,PCPDeviceInfo>)memoryDataMap.get("PCPDeviceInfo");
		if(pcpDeviceInfoMap==null){
			pcpDeviceInfoMap=new HashMap<Integer,PCPDeviceInfo>();
		}
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try { 
			String wellId=StringUtils.join(wellIdList, ",");
			String sql="select t.id,t.orgid,t.orgName,t.wellname,t.devicetype,t.devicetypename,t.applicationscenarios,t.applicationScenariosName,t.signinid,t.slave,t.videourl,"
					+ "t.instancecode,t.instancename,t.alarminstancecode,t.alarminstancename,t.displayinstancecode,t.displayinstancename,"
					+ "t.status,t.statusName,"
					+ "t.productiondata,"
					+ "t.sortnum "
					+ " from viw_pcpdevice t";
			if(StringManagerUtils.isNotNull(wellId)){
				sql+=" and t.id in("+wellId+")";
			}
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				PCPDeviceInfo rocDeviceInfo=new PCPDeviceInfo();
				rocDeviceInfo.setId(rs.getInt(1));
				rocDeviceInfo.setOrgId(rs.getInt(2));
				rocDeviceInfo.setOrgName(rs.getString(3));
				rocDeviceInfo.setWellName(rs.getString(4));
				rocDeviceInfo.setDeviceType(rs.getInt(5));
				rocDeviceInfo.setDeviceTypeName(rs.getString(6));
				rocDeviceInfo.setApplicationScenarios(rs.getInt(7));
				rocDeviceInfo.setApplicationScenariosName(rs.getString(8));
				rocDeviceInfo.setSignInId(rs.getString(9));
				rocDeviceInfo.setSlave(rs.getString(10));
				rocDeviceInfo.setVideoUrl(rs.getString(11));
				rocDeviceInfo.setInstanceCode(rs.getString(12));
				rocDeviceInfo.setInstanceName(rs.getString(13));
				rocDeviceInfo.setAlarmInstanceCode(rs.getString(14));
				rocDeviceInfo.setAlarmInstanceName(rs.getString(15));
				rocDeviceInfo.setDisplayInstanceCode(rs.getString(16));
				rocDeviceInfo.setDisplayInstanceName(rs.getString(17));
				rocDeviceInfo.setStatus(rs.getInt(18));
				rocDeviceInfo.setStatusName(rs.getString(19));
				String productionData=rs.getString(20);
				if(StringManagerUtils.isNotNull(productionData)){
					type = new TypeToken<PCPDeviceInfo>() {}.getType();
					PCPDeviceInfo pcpProductionData=gson.fromJson(productionData, type);
					if(pcpProductionData!=null){
						rocDeviceInfo.setFluidPVT(pcpProductionData.getFluidPVT());
						rocDeviceInfo.setReservoir(pcpProductionData.getReservoir());
						rocDeviceInfo.setTubingString(pcpProductionData.getTubingString());
						rocDeviceInfo.setCasingString(pcpProductionData.getCasingString());
						rocDeviceInfo.setRodString(pcpProductionData.getRodString());
						rocDeviceInfo.setPump(pcpProductionData.getPump());
						rocDeviceInfo.setProduction(pcpProductionData.getProduction());
						rocDeviceInfo.setManualIntervention(pcpProductionData.getManualIntervention());
					}
				}else{
					rocDeviceInfo.setFluidPVT(null);
					rocDeviceInfo.setReservoir(null);
					rocDeviceInfo.setRodString(null);
					rocDeviceInfo.setTubingString(null);
					rocDeviceInfo.setCasingString(null);
					rocDeviceInfo.setPump(null);
					rocDeviceInfo.setProduction(null);
					rocDeviceInfo.setManualIntervention(null);
				}
				rocDeviceInfo.setSortNum(21);
				System.out.println(gson.toJson(rocDeviceInfo));
				pcpDeviceInfoMap.put(rocDeviceInfo.getId(), rocDeviceInfo);
			}
			memoryDataMap.put("PCPDeviceInfo", pcpDeviceInfoMap);
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadAcqInstanceOwnItemByGroupId(String groupId){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		int result=0;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		Map<String,ArrayList<AcqInstanceOwnItem>> acqInstanceOwnItemMap= (HashMap<String,ArrayList<AcqInstanceOwnItem>>)memoryDataMap.get("AcqInstanceOwnItem");
		if(acqInstanceOwnItemMap==null){
			acqInstanceOwnItemMap=new HashMap<String,ArrayList<AcqInstanceOwnItem>>();
		}
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			String sql="select t5.code as instanceCode,t5.deviceType,t4.protocol,t.id as itemid,t.itemname,t.itemcode,t.bitindex,t.groupid,t3.unitid "
					+ " from tbl_acq_item2group_conf t,tbl_acq_group_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_unit_conf t4,tbl_protocolinstance t5 "
					+ " where t.groupid=t2.id and t2.id=t3.groupid and t3.unitid=t4.id and t4.id=t5.unitid";
			if(StringManagerUtils.isNotNull(groupId)){
				sql+=" and t.groupid="+groupId;
			}
			sql+=" order by t5.code, t.groupid,t.id";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				AcqInstanceOwnItem acqInstanceOwnItem=new AcqInstanceOwnItem();
				acqInstanceOwnItem.setInstanceCode(rs.getString(1));
				acqInstanceOwnItem.setDeviceType(rs.getInt(2));
				acqInstanceOwnItem.setProtocol(rs.getString(3));
				acqInstanceOwnItem.setItemId(rs.getInt(4));
				acqInstanceOwnItem.setItemName(rs.getString(5));
				acqInstanceOwnItem.setItemCode(rs.getString(6));
				acqInstanceOwnItem.setBitIndex(rs.getInt(7));
				acqInstanceOwnItem.setGroupId(rs.getInt(8));
				acqInstanceOwnItem.setUnitId(rs.getInt(9));
				
				
				ArrayList<AcqInstanceOwnItem> acqInstanceOwnItemList=acqInstanceOwnItemMap.get(acqInstanceOwnItem.getInstanceCode());
				if(acqInstanceOwnItemList==null){
					acqInstanceOwnItemList=new ArrayList<AcqInstanceOwnItem>();
				}
				int index=-1;
				for(int i=0;i<acqInstanceOwnItemList.size();i++){
					if(acqInstanceOwnItem.getItemId()==acqInstanceOwnItemList.get(i).getItemId()){
						index=i;
						break;
					}
				}
				if(index>=0){
					acqInstanceOwnItemList.set(index, acqInstanceOwnItem);
				}else{
					acqInstanceOwnItemList.add(acqInstanceOwnItem);
				}
				
				acqInstanceOwnItemMap.put(acqInstanceOwnItem.getInstanceCode(), acqInstanceOwnItemList);
			}
			memoryDataMap.put("AcqInstanceOwnItem", acqInstanceOwnItemMap);
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadDisplayInstanceOwnItemByGroupId(String unitId){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		int result=0;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		Map<String,ArrayList<DisplayInstanceOwnItem>> displayInstanceOwnItemMap= (HashMap<String,ArrayList<DisplayInstanceOwnItem>>)memoryDataMap.get("DisplayInstanceOwnItem");
		if(displayInstanceOwnItemMap==null){
			displayInstanceOwnItemMap=new HashMap<String,ArrayList<DisplayInstanceOwnItem>>();
		}
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			String sql="select t3.code as instanceCode,t3.deviceType,t2.protocol,t.id as itemid,t.itemname,t.itemcode,t.bitindex,t.unitid,"
					+ "t.showlevel,t.sort,t.realtimecurve,t.realtimecurvecolor,t.historycurve,t.historycurvecolor,t.type "
					+ " from tbl_display_items2unit_conf t,tbl_display_unit_conf t2,tbl_protocoldisplayinstance t3 "
					+ " where t.unitid=t2.id and t2.id=t3.displayunitid";
			if(StringManagerUtils.isNotNull(unitId)){
				sql+=" and t.unitid="+unitId;
			}
			sql+=" order by t3.code, t.unitid,t.id";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				DisplayInstanceOwnItem displayInstanceOwnItem=new DisplayInstanceOwnItem();
				displayInstanceOwnItem.setInstanceCode(rs.getString(1));
				displayInstanceOwnItem.setDeviceType(rs.getInt(2));
				displayInstanceOwnItem.setProtocol(rs.getString(3));
				displayInstanceOwnItem.setItemId(rs.getInt(4));
				displayInstanceOwnItem.setItemName(rs.getString(5));
				displayInstanceOwnItem.setItemCode(rs.getString(6));
				displayInstanceOwnItem.setBitIndex(rs.getInt(7));
				displayInstanceOwnItem.setUnitId(rs.getInt(8));
				displayInstanceOwnItem.setShowLevel(rs.getInt(9));
				displayInstanceOwnItem.setSort(rs.getInt(10));
				displayInstanceOwnItem.setRealtimeCurve(rs.getInt(11));
				displayInstanceOwnItem.setRealtimeCurveColor(rs.getString(12));
				displayInstanceOwnItem.setHistoryCurve(rs.getInt(13));
				displayInstanceOwnItem.setHistoryCurveColor(rs.getString(14));
				
				ArrayList<DisplayInstanceOwnItem> displayInstanceOwnItemList=displayInstanceOwnItemMap.get(displayInstanceOwnItem.getInstanceCode());
				if(displayInstanceOwnItemList==null){
					displayInstanceOwnItemList=new ArrayList<DisplayInstanceOwnItem>();
				}
				int index=-1;
				for(int i=0;i<displayInstanceOwnItemList.size();i++){
					if(displayInstanceOwnItem.getItemId()==displayInstanceOwnItemList.get(i).getItemId()){
						index=i;
						break;
					}
				}
				if(index>=0){
					displayInstanceOwnItemList.set(index, displayInstanceOwnItem);
				}else{
					displayInstanceOwnItemList.add(displayInstanceOwnItem);
				}
				
				displayInstanceOwnItemMap.put(displayInstanceOwnItem.getInstanceCode(), displayInstanceOwnItemList);
			}
			memoryDataMap.put("DisplayInstanceOwnItem", displayInstanceOwnItemMap);
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadAlarmInstanceOwnItemByGroupId(String unitId){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		int result=0;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		Map<String,ArrayList<AlarmInstanceOwnItem>> alarmInstanceOwnItemMap= (HashMap<String,ArrayList<AlarmInstanceOwnItem>>)memoryDataMap.get("AlarmInstanceOwnItem");
		if(alarmInstanceOwnItemMap==null){
			alarmInstanceOwnItemMap=new HashMap<String,ArrayList<AlarmInstanceOwnItem>>();
		}
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			String sql="select t3.code as instanceCode,t3.deviceType,t.unitid,t2.protocol,t.id as itemId,t.itemname,t.itemcode,t.itemaddr,t.bitindex,"
					+ "t.value,t.upperlimit,t.lowerlimit,t.hystersis,t.delay,t.alarmlevel,t.alarmsign,t.type,t.issendmessage,t.issendmail "
					+ " from tbl_alarm_item2unit_conf t,tbl_alarm_unit_conf t2,tbl_protocolalarminstance t3 "
					+ " where t.unitid=t2.id and t2.id=t3.alarmunitid";
			if(StringManagerUtils.isNotNull(unitId)){
				sql+=" and t.unitid="+unitId;
			}
			sql+=" order by t3.code, t.unitid,t.id";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				AlarmInstanceOwnItem alarmInstanceOwnItem=new AlarmInstanceOwnItem();
				alarmInstanceOwnItem.setInstanceCode(rs.getString(1));
				alarmInstanceOwnItem.setDeviceType(rs.getInt(2));
				alarmInstanceOwnItem.setUnitId(rs.getInt(3));
				alarmInstanceOwnItem.setProtocol(rs.getString(4));
				alarmInstanceOwnItem.setItemId(rs.getInt(5));
				alarmInstanceOwnItem.setItemName(rs.getString(6));
				alarmInstanceOwnItem.setItemCode(rs.getString(7));
				alarmInstanceOwnItem.setItemAddr(rs.getInt(8));
				alarmInstanceOwnItem.setBitIndex(rs.getInt(9));
				
				alarmInstanceOwnItem.setValue(rs.getFloat(10));
				alarmInstanceOwnItem.setUpperLimit(rs.getFloat(11));
				alarmInstanceOwnItem.setLowerLimit(rs.getFloat(12));
				alarmInstanceOwnItem.setHystersis(rs.getFloat(13));
				alarmInstanceOwnItem.setDelay(rs.getInt(14));
				
				alarmInstanceOwnItem.setAlarmLevel(rs.getInt(15));
				alarmInstanceOwnItem.setAlarmSign(rs.getInt(16));
				
				alarmInstanceOwnItem.setType(rs.getInt(17));

				alarmInstanceOwnItem.setIsSendMessage(rs.getInt(18));
				alarmInstanceOwnItem.setIsSendMail(rs.getInt(19));
				
				ArrayList<AlarmInstanceOwnItem> alarmInstanceOwnItemList=alarmInstanceOwnItemMap.get(alarmInstanceOwnItem.getInstanceCode());
				if(alarmInstanceOwnItemList==null){
					alarmInstanceOwnItemList=new ArrayList<AlarmInstanceOwnItem>();
				}
				int index=-1;
				for(int i=0;i<alarmInstanceOwnItemList.size();i++){
					if(alarmInstanceOwnItem.getItemId()==alarmInstanceOwnItemList.get(i).getItemId()){
						index=i;
						break;
					}
				}
				if(index>=0){
					alarmInstanceOwnItemList.set(index, alarmInstanceOwnItem);
				}else{
					alarmInstanceOwnItemList.add(alarmInstanceOwnItem);
				}
				
				alarmInstanceOwnItemMap.put(alarmInstanceOwnItem.getInstanceCode(), alarmInstanceOwnItemList);
			}
			memoryDataMap.put("AlarmInstanceOwnItem", alarmInstanceOwnItemMap);
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadRPCCalculateItem(){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		ArrayList<CalItem> rpcCalItemList= (ArrayList<CalItem>)memoryDataMap.get("rpcCalItemList");
		if(rpcCalItemList==null){
			rpcCalItemList=new ArrayList<CalItem>();
		}
		rpcCalItemList.add(new CalItem("工况","ResultCode",""));
		rpcCalItemList.add(new CalItem("最大载荷","FMax","kN"));
		rpcCalItemList.add(new CalItem("最小载荷","FMin","kN"));
		rpcCalItemList.add(new CalItem("充满系数","FullnessCoefficient",""));
		
		rpcCalItemList.add(new CalItem("理论排量","TheoreticalProduction","m^3/d"));
		
		rpcCalItemList.add(new CalItem("产液量","LiquidVolumetricProduction","m^3/d"));
		rpcCalItemList.add(new CalItem("产油量","OilVolumetricProduction","m^3/d"));
		rpcCalItemList.add(new CalItem("产水量","WaterVolumetricProduction","m^3/d"));
		rpcCalItemList.add(new CalItem("柱塞有效冲程计算产量","AvailablePlungerStrokeVolumetricProduction","m^3/d"));
		rpcCalItemList.add(new CalItem("泵间隙漏失量","PumpClearanceLeakVolumetricProduction","m^3/d"));
		rpcCalItemList.add(new CalItem("游动凡尔漏失量","TVLeakVolumetricProduction","m^3/d"));
		rpcCalItemList.add(new CalItem("固定凡尔漏失量","SVLeakVolumetricProduction","m^3/d"));
		rpcCalItemList.add(new CalItem("气影响","GasInfluenceVolumetricProduction","m^3/d"));
		
		rpcCalItemList.add(new CalItem("产液量","LiquidWeightProduction","t/d"));
		rpcCalItemList.add(new CalItem("产油量","OilWeightProduction","t/d"));
		rpcCalItemList.add(new CalItem("产水量","WaterWeightProduction","t/d"));
		rpcCalItemList.add(new CalItem("柱塞有效冲程计算产量","AvailablePlungerStrokeWeightProduction","t/d"));
		rpcCalItemList.add(new CalItem("泵间隙漏失量","PumpClearanceLeakWeightProduction","t/d"));
		rpcCalItemList.add(new CalItem("游动凡尔漏失量","TVLeakWeightProduction","t/d"));
		rpcCalItemList.add(new CalItem("固定凡尔漏失量","SVLeakWeightProduction","t/d"));
		rpcCalItemList.add(new CalItem("气影响","GasInfluenceWeightProduction","t/d"));
		memoryDataMap.put("rpcCalItemList", rpcCalItemList);
	}
	
	public static void loadPCPCalculateItem(){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		ArrayList<CalItem> pcpCalItemList= (ArrayList<CalItem>)memoryDataMap.get("pcpCalItemList");
		if(pcpCalItemList==null){
			pcpCalItemList=new ArrayList<CalItem>();
		}
		pcpCalItemList.add(new CalItem("理论排量","TheoreticalProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产液量","LiquidVolumetricProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产油量","OilVolumetricProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产水量","WaterVolumetricProduction","m^3/d"));
		pcpCalItemList.add(new CalItem("产液量","LiquidWeightProduction","t/d"));
		pcpCalItemList.add(new CalItem("产油量","OilWeightProduction","t/d"));
		pcpCalItemList.add(new CalItem("产水量","WaterWeightProduction","t/d"));
		memoryDataMap.put("pcpCalItemList", pcpCalItemList);
	}
	
	public static void loadRPCWorkType(){
		Map<String, Object> memoryDataMap = MemoryDataMap.getMapObject();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Map<Integer,WorkType> rpcWorkTypeMap= (HashMap<Integer,WorkType>)memoryDataMap.get("RPCWorkType");
		if(rpcWorkTypeMap==null){
			rpcWorkTypeMap=new HashMap<Integer,WorkType>();
		}
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			String sql="select t.id,t.resultcode,t.resultname,t.resultdescription,t.optimizationsuggestion,t.remark "
					+ " from TBL_RPC_WORKTYPE t order by t.resultcode";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				WorkType workType=new WorkType();
				workType.setId(rs.getInt(1));
				workType.setResultCode(rs.getInt(2));
				workType.setResultName(rs.getString(3));
				workType.setResultDescription(rs.getString(4));
				workType.setOptimizationSuggestion(rs.getString(5));
				workType.setRemark(rs.getString(6));
				rpcWorkTypeMap.put(workType.getResultCode(), workType);
			}
			memoryDataMap.put("RPCWorkType", rpcWorkTypeMap);
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
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
