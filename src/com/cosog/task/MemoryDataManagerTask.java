package com.cosog.task;

import java.io.IOException;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cosog.model.AlarmShowStyle;
import com.cosog.model.DataMapping;
import com.cosog.model.WorkType;
import com.cosog.model.calculate.AcqInstanceOwnItem;
import com.cosog.model.calculate.AcqInstanceOwnItem.AcqItem;
import com.cosog.model.calculate.AlarmInstanceOwnItem;
import com.cosog.model.calculate.AlarmInstanceOwnItem.AlarmItem;
import com.cosog.model.calculate.DisplayInstanceOwnItem;
import com.cosog.model.calculate.DisplayInstanceOwnItem.DisplayItem;
import com.cosog.model.drive.AcquisitionItemInfo;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.model.calculate.PCPDeviceInfo;
import com.cosog.model.calculate.PCPProductionData;
import com.cosog.model.calculate.RPCCalculateRequestData;
import com.cosog.model.calculate.RPCDeviceInfo;
import com.cosog.model.calculate.RPCProductionData;
import com.cosog.model.calculate.UserInfo;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.MemoryDataMap;
import com.cosog.utils.OracleJdbcUtis;
import com.cosog.utils.SerializeObjectUnils;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import redis.clients.jedis.Jedis;

@Component("LoadingMemoryData")  
public class MemoryDataManagerTask {

	private static MemoryDataManagerTask instance=new MemoryDataManagerTask();
	
	public static MemoryDataManagerTask getInstance(){
		return instance;
	}
	
	@Scheduled(fixedRate = 1000*60*60*24*365*100)
	public void loadMemoryData() throws SQLException, ParseException,InterruptedException, IOException{
		Jedis jedis = new Jedis();
        jedis.flushDB();
//		try {
//            
//            DataMapping dataMapping=new DataMapping();
//			dataMapping.setId(1);
//			dataMapping.setName("aa");
//			dataMapping.setMappingColumn("bb");
//			dataMapping.setCalColumn("cc");
//			dataMapping.setProtocolType(0);
//			dataMapping.setMappingMode(0);
//			dataMapping.setRepetitionTimes(1);
//			
////			byte[] personByte = SerializeObjectUnils.serialize(dataMapping);
////            jedis.set("goodsName".getBytes(),personByte);
////            System.out.println("存入redis完毕");
////            
////            byte[] byt = jedis.get("goodsName".getBytes());
////            Object obj = SerializeObjectUnils.unserizlize(byt);
////            
////            if (obj instanceof DataMapping) {
////                System.out.println(((DataMapping) obj).getId());
////                System.out.println(((DataMapping) obj).getName());
////                System.out.println(((DataMapping) obj).getMappingColumn());
////            }
//            
//            
//            jedis.hset("ProtocolMappingColumn".getBytes(), "cc".getBytes(), SerializeObjectUnils.serialize(dataMapping));//哈希(Hash)
//            byte[]byt=  jedis.hget("ProtocolMappingColumn".getBytes(), "cc".getBytes());
//            Object obj = SerializeObjectUnils.unserizlize(byt);
//            if (obj instanceof DataMapping) {
//                System.out.println(((DataMapping) obj).getId());
//                System.out.println(((DataMapping) obj).getName());
//                System.out.println(((DataMapping) obj).getMappingColumn());
//            }
//        } catch (Exception e) {
//        	e.printStackTrace();
//            System.out.println("登录无法更新该用户缓存");
//        }
		
		loadAcqInstanceOwnItemByGroupId("");
		loadAlarmInstanceOwnItemByUnitId("");
		loadDisplayInstanceOwnItemByUnitId("");
//		
		loadRPCDeviceInfo(null);
		loadPCPDeviceInfo(null);
		jedis.disconnect();
		jedis.close();
	}
	
	@SuppressWarnings("static-access")
	public static void loadProtocolConfig(){
		StringManagerUtils.printLog("驱动加载开始");
		StringManagerUtils stringManagerUtils=new StringManagerUtils();
		Gson gson = new Gson();
		String path="";
		String protocolConfigData="";
		java.lang.reflect.Type type=null;
		//添加Modbus协议配置
		path=stringManagerUtils.getFilePath("ModbusProtocolConfig.json","protocolConfig/");
		protocolConfigData=stringManagerUtils.readFile(path,"utf-8");
		type = new TypeToken<ModbusProtocolConfig>() {}.getType();
		ModbusProtocolConfig modbusProtocolConfig=gson.fromJson(protocolConfigData, type);
		if(modbusProtocolConfig==null){
			modbusProtocolConfig=new ModbusProtocolConfig();
			modbusProtocolConfig.setProtocol(new ArrayList<ModbusProtocolConfig.Protocol>());
		}else if(modbusProtocolConfig!=null&&modbusProtocolConfig.getProtocol()==null){
			modbusProtocolConfig.setProtocol(new ArrayList<ModbusProtocolConfig.Protocol>());
		}else if(modbusProtocolConfig!=null&&modbusProtocolConfig.getProtocol()!=null&&modbusProtocolConfig.getProtocol().size()>0){
			Collections.sort(modbusProtocolConfig.getProtocol());
		}
		
		Jedis jedis = new Jedis();
		jedis.set("modbusProtocolConfig".getBytes(), SerializeObjectUnils.serialize(modbusProtocolConfig));
		jedis.disconnect();
		jedis.close();
		StringManagerUtils.printLog("驱动加载结束");
	}
	
	public static void loadProtocolMappingColumn(){
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			Jedis jedis = new Jedis();
			String sql="select t.id,t.name,t.mappingcolumn,t.calcolumn,t.protocoltype,t.mappingmode,t.repetitiontimes from TBL_DATAMAPPING t order by t.protocoltype,t.id";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				DataMapping dataMapping=new DataMapping();
				dataMapping.setId(rs.getInt(1));
				dataMapping.setName(rs.getString(2));
				dataMapping.setMappingColumn(rs.getString(3));
				dataMapping.setCalColumn(rs.getString(4));
				dataMapping.setProtocolType(rs.getInt(5));
				dataMapping.setMappingMode(rs.getInt(6));
				dataMapping.setRepetitionTimes(rs.getInt(7));
				String key=dataMapping.getProtocolType()+"_"+dataMapping.getMappingColumn();
				jedis.hset("ProtocolMappingColumn".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(dataMapping));//哈希(Hash)
			}
			jedis.disconnect();
			jedis.close();
//			Set<String> aa=jedis.hkeys("ProtocolMappingColumn");
//			Set<byte[]> bb=jedis.hkeys("ProtocolMappingColumn".getBytes());
//			System.out.println("ProtocolMappingColumn中所有的key:"+aa);
//			System.out.println("ProtocolMappingColumn中所有的key:"+bb);
//			byte[] testKey=null;
//			for (byte[] str : bb) {
//				testKey=str;
//				break;
//			}
//			
//			System.out.println("ProtocolMappingColumn中所有的值:"+jedis.hvals("ProtocolMappingColumn".getBytes()));
//			System.out.println("ProtocolMappingColumn中所有的值:"+jedis.hvals("ProtocolMappingColumn"));
//			
//			
//			System.out.println("判断某个key是否存在:"+jedis.hexists("ProtocolMappingColumn".getBytes(), testKey));
//			System.out.println("判断某个key的值:"+jedis.hget("ProtocolMappingColumn".getBytes(), testKey));
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadRPCDeviceInfo(List<String> wellIdList){
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try { 
			Jedis jedis = new Jedis();
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
				RPCDeviceInfo rpcDeviceInfo=new RPCDeviceInfo();
				rpcDeviceInfo.setId(rs.getInt(1));
				rpcDeviceInfo.setOrgId(rs.getInt(2));
				rpcDeviceInfo.setOrgName(rs.getString(3));
				rpcDeviceInfo.setWellName(rs.getString(4));
				rpcDeviceInfo.setDeviceType(rs.getInt(5));
				rpcDeviceInfo.setDeviceTypeName(rs.getString(6));
				rpcDeviceInfo.setApplicationScenarios(rs.getInt(7));
				rpcDeviceInfo.setApplicationScenariosName(rs.getString(8));
				rpcDeviceInfo.setSignInId(rs.getString(9));
				rpcDeviceInfo.setSlave(rs.getString(10));
				rpcDeviceInfo.setVideoUrl(rs.getString(11));
				rpcDeviceInfo.setInstanceCode(rs.getString(12));
				rpcDeviceInfo.setInstanceName(rs.getString(13));
				rpcDeviceInfo.setAlarmInstanceCode(rs.getString(14));
				rpcDeviceInfo.setAlarmInstanceName(rs.getString(15));
				rpcDeviceInfo.setDisplayInstanceCode(rs.getString(16));
				rpcDeviceInfo.setDisplayInstanceName(rs.getString(17));
				rpcDeviceInfo.setStatus(rs.getInt(18));
				rpcDeviceInfo.setStatusName(rs.getString(19));
				String productionData=rs.getString(20);
				String balanceInfo=rs.getString(21);
				float stroke=rs.getFloat(22);
				int pumpingModelId=rs.getInt(23);
				if(StringManagerUtils.isNotNull(productionData)){
					type = new TypeToken<RPCDeviceInfo>() {}.getType();
					RPCDeviceInfo rpcProductionData=gson.fromJson(productionData, type);
					rpcDeviceInfo.setFluidPVT(rpcProductionData.getFluidPVT());
					rpcDeviceInfo.setReservoir(rpcProductionData.getReservoir());
					rpcDeviceInfo.setTubingString(rpcProductionData.getTubingString());
					rpcDeviceInfo.setCasingString(rpcProductionData.getCasingString());
					rpcDeviceInfo.setRodString(rpcProductionData.getRodString());
					rpcDeviceInfo.setPump(rpcProductionData.getPump());
					rpcDeviceInfo.setProduction(rpcProductionData.getProduction());
					rpcDeviceInfo.setManualIntervention(rpcProductionData.getManualIntervention());
					if(pumpingModelId>0){
						rpcDeviceInfo.setPumpingUnit(new RPCCalculateRequestData.PumpingUnit());
						rpcDeviceInfo.getPumpingUnit().setManufacturer(rs.getString(24));
						rpcDeviceInfo.getPumpingUnit().setModel(rs.getString(25));
						rpcDeviceInfo.getPumpingUnit().setStroke(stroke);
						rpcDeviceInfo.getPumpingUnit().setCrankRotationDirection(rs.getString(26));
						rpcDeviceInfo.getPumpingUnit().setOffsetAngleOfCrank(rs.getFloat(27));
						rpcDeviceInfo.getPumpingUnit().setCrankGravityRadius(rs.getFloat(28));
						rpcDeviceInfo.getPumpingUnit().setSingleCrankWeight(rs.getFloat(29));
						rpcDeviceInfo.getPumpingUnit().setSingleCrankPinWeight(rs.getFloat(30));
						rpcDeviceInfo.getPumpingUnit().setStructuralUnbalance(rs.getFloat(31));
						type = new TypeToken<RPCCalculateRequestData.Balance>() {}.getType();
						RPCCalculateRequestData.Balance balance=gson.fromJson(balanceInfo, type);
						if(balance!=null){
							rpcDeviceInfo.getPumpingUnit().setBalance(balance);
						}
					}else{
						rpcDeviceInfo.setPumpingUnit(null);
					}
				}else{
					rpcDeviceInfo.setFluidPVT(null);
					rpcDeviceInfo.setReservoir(null);
					rpcDeviceInfo.setRodString(null);
					rpcDeviceInfo.setTubingString(null);
					rpcDeviceInfo.setCasingString(null);
					rpcDeviceInfo.setPump(null);
					rpcDeviceInfo.setProduction(null);
					rpcDeviceInfo.setPumpingUnit(null);
					rpcDeviceInfo.setManualIntervention(null);
				}
				rpcDeviceInfo.setSortNum(32);
				rpcDeviceInfo.setAcqTime("");
				rpcDeviceInfo.setAcquisitionItemInfoList(new ArrayList<AcquisitionItemInfo>());
//				System.out.println(gson.toJson(rpcDeviceInfo));
				String key=rpcDeviceInfo.getId()+"";
				jedis.hset("RPCDeviceInfo".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(rpcDeviceInfo));//哈希(Hash)
			}
			jedis.disconnect();
			jedis.close();
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
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try { 
			Jedis jedis = new Jedis();
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
				PCPDeviceInfo pcpDeviceInfo=new PCPDeviceInfo();
				pcpDeviceInfo.setId(rs.getInt(1));
				pcpDeviceInfo.setOrgId(rs.getInt(2));
				pcpDeviceInfo.setOrgName(rs.getString(3));
				pcpDeviceInfo.setWellName(rs.getString(4));
				pcpDeviceInfo.setDeviceType(rs.getInt(5));
				pcpDeviceInfo.setDeviceTypeName(rs.getString(6));
				pcpDeviceInfo.setApplicationScenarios(rs.getInt(7));
				pcpDeviceInfo.setApplicationScenariosName(rs.getString(8));
				pcpDeviceInfo.setSignInId(rs.getString(9));
				pcpDeviceInfo.setSlave(rs.getString(10));
				pcpDeviceInfo.setVideoUrl(rs.getString(11));
				pcpDeviceInfo.setInstanceCode(rs.getString(12));
				pcpDeviceInfo.setInstanceName(rs.getString(13));
				pcpDeviceInfo.setAlarmInstanceCode(rs.getString(14));
				pcpDeviceInfo.setAlarmInstanceName(rs.getString(15));
				pcpDeviceInfo.setDisplayInstanceCode(rs.getString(16));
				pcpDeviceInfo.setDisplayInstanceName(rs.getString(17));
				pcpDeviceInfo.setStatus(rs.getInt(18));
				pcpDeviceInfo.setStatusName(rs.getString(19));
				String productionData=rs.getString(20);
				if(StringManagerUtils.isNotNull(productionData)){
					type = new TypeToken<PCPDeviceInfo>() {}.getType();
					PCPDeviceInfo pcpProductionData=gson.fromJson(productionData, type);
					if(pcpProductionData!=null){
						pcpDeviceInfo.setFluidPVT(pcpProductionData.getFluidPVT());
						pcpDeviceInfo.setReservoir(pcpProductionData.getReservoir());
						pcpDeviceInfo.setTubingString(pcpProductionData.getTubingString());
						pcpDeviceInfo.setCasingString(pcpProductionData.getCasingString());
						pcpDeviceInfo.setRodString(pcpProductionData.getRodString());
						pcpDeviceInfo.setPump(pcpProductionData.getPump());
						pcpDeviceInfo.setProduction(pcpProductionData.getProduction());
						pcpDeviceInfo.setManualIntervention(pcpProductionData.getManualIntervention());
					}
				}else{
					pcpDeviceInfo.setFluidPVT(null);
					pcpDeviceInfo.setReservoir(null);
					pcpDeviceInfo.setRodString(null);
					pcpDeviceInfo.setTubingString(null);
					pcpDeviceInfo.setCasingString(null);
					pcpDeviceInfo.setPump(null);
					pcpDeviceInfo.setProduction(null);
					pcpDeviceInfo.setManualIntervention(null);
				}
				pcpDeviceInfo.setSortNum(21);
//				System.out.println(gson.toJson(pcpDeviceInfo));
				String key=pcpDeviceInfo.getId()+"";
				jedis.hset("PCPDeviceInfo".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(pcpDeviceInfo));//哈希(Hash)
			}
			jedis.disconnect();
			jedis.close();
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadAcqInstanceOwnItemByGroupId(String groupId){
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			Jedis jedis = new Jedis();
			String sql="select t5.code as instanceCode,t5.deviceType,t4.protocol,t3.unitid ,"
					+ "t2.acq_cycle,t2.save_cycle,"
					+ "t.id as itemid,t.itemname,t.itemcode,t.bitindex,t.groupid"
					+ " from tbl_acq_item2group_conf t,tbl_acq_group_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_unit_conf t4,tbl_protocolinstance t5 "
					+ " where t.groupid=t2.id and t2.id=t3.groupid and t3.unitid=t4.id and t4.id=t5.unitid and t2.type=0";
			if(StringManagerUtils.isNotNull(groupId)){
				sql+=" and t.groupid="+groupId;
			}
			sql+=" order by t5.code, t.groupid,t.id";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				AcqInstanceOwnItem acqInstanceOwnItem=null;
				if(jedis.hexists("AcqInstanceOwnItem".getBytes(), rs.getString(1).getBytes())){
					byte[]byt=  jedis.hget("AcqInstanceOwnItem".getBytes(), rs.getString(1).getBytes());
					Object obj = SerializeObjectUnils.unserizlize(byt);
					if (obj instanceof AcqInstanceOwnItem) {
						acqInstanceOwnItem=(AcqInstanceOwnItem) obj;
			         }
				}else{
					acqInstanceOwnItem=new AcqInstanceOwnItem();
				}
				
				acqInstanceOwnItem.setInstanceCode(rs.getString(1));
				acqInstanceOwnItem.setDeviceType(rs.getInt(2));
				acqInstanceOwnItem.setProtocol(rs.getString(3));
				acqInstanceOwnItem.setUnitId(rs.getInt(4));
				acqInstanceOwnItem.setAcqCycle(rs.getInt(5));
				acqInstanceOwnItem.setSaveCycle(rs.getInt(6));
				
				if(acqInstanceOwnItem.getItemList()==null){
					acqInstanceOwnItem.setItemList(new ArrayList<AcqItem>());
				}
				AcqItem acqItem=new AcqItem();
				acqItem.setItemId(rs.getInt(7));
				acqItem.setItemName(rs.getString(8));
				acqItem.setItemCode(rs.getString(9));
				acqItem.setBitIndex(rs.getInt(10));
				acqItem.setGroupId(rs.getInt(11));
				
				int index=-1;
				for(int i=0;i<acqInstanceOwnItem.getItemList().size();i++){
					if(acqItem.getItemId()==acqInstanceOwnItem.getItemList().get(i).getItemId()){
						index=i;
						break;
					}
				}
				if(index>=0){
					acqInstanceOwnItem.getItemList().set(index, acqItem);
				}else{
					acqInstanceOwnItem.getItemList().add(acqItem);
				}
				
				String key=acqInstanceOwnItem.getInstanceCode();
				jedis.hset("AcqInstanceOwnItem".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(acqInstanceOwnItem));//哈希(Hash)
			}
			
//			byte[]byt=  jedis.hget("AcqInstanceOwnItem".getBytes(), "instance5".getBytes());
//			Object obj = SerializeObjectUnils.unserizlize(byt);
//			if (obj instanceof AcqInstanceOwnItem) {
//				AcqInstanceOwnItem acqInstanceOwnItem=(AcqInstanceOwnItem) obj;
//				System.out.println(new Gson().toJson(acqInstanceOwnItem));
//	        }
			jedis.disconnect();
			jedis.close();
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadDisplayInstanceOwnItemByUnitId(String unitId){
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		int result=0;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			Jedis jedis = new Jedis();
			String sql="select t3.code as instanceCode,t3.deviceType,t2.protocol,t.unitid,t.id as itemid,t.itemname,t.itemcode,t.bitindex,"
					+ "decode(t.showlevel,null,9999,t.showlevel) as showlevel,decode(t.sort,null,9999,t.sort) as sort,t.realtimecurve,t.realtimecurvecolor,t.historycurve,t.historycurvecolor,t.type "
					+ " from tbl_display_items2unit_conf t,tbl_display_unit_conf t2,tbl_protocoldisplayinstance t3 "
					+ " where t.unitid=t2.id and t2.id=t3.displayunitid";
			if(StringManagerUtils.isNotNull(unitId)){
				sql+=" and t.unitid="+unitId;
			}
			sql+=" order by t3.code, t.unitid,t.id";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				DisplayInstanceOwnItem displayInstanceOwnItem=null;
				if(jedis.hexists("DisplayInstanceOwnItem".getBytes(), rs.getString(1).getBytes())){
					byte[]byt=  jedis.hget("DisplayInstanceOwnItem".getBytes(), rs.getString(1).getBytes());
					Object obj = SerializeObjectUnils.unserizlize(byt);
					if (obj instanceof DisplayInstanceOwnItem) {
						displayInstanceOwnItem=(DisplayInstanceOwnItem) obj;
			         }
				}else{
					displayInstanceOwnItem=new DisplayInstanceOwnItem();
				}
				
				displayInstanceOwnItem.setInstanceCode(rs.getString(1));
				displayInstanceOwnItem.setDeviceType(rs.getInt(2));
				displayInstanceOwnItem.setProtocol(rs.getString(3));
				displayInstanceOwnItem.setUnitId(rs.getInt(4));
				
				if(displayInstanceOwnItem.getItemList()==null){
					displayInstanceOwnItem.setItemList(new ArrayList<DisplayItem>());
				}
				DisplayItem displayItem=new DisplayItem();
				displayItem.setUnitId(rs.getInt(4));
				displayItem.setItemId(rs.getInt(5));
				displayItem.setItemName(rs.getString(6));
				displayItem.setItemCode(rs.getString(7));
				displayItem.setBitIndex(rs.getInt(8));
				displayItem.setShowLevel(rs.getInt(9));
				displayItem.setSort(rs.getInt(10));
				displayItem.setRealtimeCurve(rs.getInt(11));
				displayItem.setRealtimeCurveColor(rs.getString(12));
				displayItem.setHistoryCurve(rs.getInt(13));
				displayItem.setHistoryCurveColor(rs.getString(14));
				displayItem.setType(rs.getInt(15));
				int index=-1;
				for(int i=0;i<displayInstanceOwnItem.getItemList().size();i++){
					if(displayItem.getItemId()==displayInstanceOwnItem.getItemList().get(i).getItemId()){
						index=i;
						break;
					}
				}
				if(index>=0){
					displayInstanceOwnItem.getItemList().set(index, displayItem);
				}else{
					displayInstanceOwnItem.getItemList().add(displayItem);
				}
				
				String key=displayInstanceOwnItem.getInstanceCode();
				jedis.hset("DisplayInstanceOwnItem".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(displayInstanceOwnItem));//哈希(Hash)
			}
//			byte[]byt=  jedis.hget("DisplayInstanceOwnItem".getBytes(), "displayinstance1".getBytes());
//			Object obj = SerializeObjectUnils.unserizlize(byt);
//			if (obj instanceof DisplayInstanceOwnItem) {
//				DisplayInstanceOwnItem displayInstanceOwnItem=(DisplayInstanceOwnItem) obj;
//				System.out.println(new Gson().toJson(displayInstanceOwnItem));
//	        }
			jedis.disconnect();
			jedis.close();
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadAlarmInstanceOwnItemByUnitId(String unitId){
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		int result=0;
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			Jedis jedis = new Jedis();
			String sql="select t3.code as instanceCode,t3.deviceType,t.unitid,t2.protocol,"
					+ " t.id as itemId,t.itemname,t.itemcode,t.itemaddr,t.bitindex,"
					+ "t.value,t.upperlimit,t.lowerlimit,t.hystersis,t.delay,decode(t.alarmsign,0,0,t.alarmlevel) as alarmlevel,t.alarmsign,t.type,t.issendmessage,t.issendmail "
					+ " from tbl_alarm_item2unit_conf t,tbl_alarm_unit_conf t2,tbl_protocolalarminstance t3 "
					+ " where t.unitid=t2.id and t2.id=t3.alarmunitid";
			if(StringManagerUtils.isNotNull(unitId)){
				sql+=" and t.unitid="+unitId;
			}
			sql+=" order by t3.code, t.unitid,t.id";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				AlarmInstanceOwnItem alarmInstanceOwnItem=null;
				if(jedis.hexists("AlarmInstanceOwnItem".getBytes(), rs.getString(1).getBytes())){
					byte[]byt=  jedis.hget("AlarmInstanceOwnItem".getBytes(), rs.getString(1).getBytes());
					Object obj = SerializeObjectUnils.unserizlize(byt);
					if (obj instanceof AlarmInstanceOwnItem) {
						alarmInstanceOwnItem=(AlarmInstanceOwnItem) obj;
			         }
				}else{
					alarmInstanceOwnItem=new AlarmInstanceOwnItem();
				}
				
				alarmInstanceOwnItem.setInstanceCode(rs.getString(1));
				alarmInstanceOwnItem.setDeviceType(rs.getInt(2));
				alarmInstanceOwnItem.setUnitId(rs.getInt(3));
				alarmInstanceOwnItem.setProtocol(rs.getString(4));
				
				if(alarmInstanceOwnItem.getItemList()==null){
					alarmInstanceOwnItem.setItemList(new ArrayList<AlarmItem>());
				}
				AlarmItem alarmItem=new AlarmItem();
				alarmItem.setUnitId(rs.getInt(3));
				alarmItem.setItemId(rs.getInt(5));
				alarmItem.setItemName(rs.getString(6));
				alarmItem.setItemCode(rs.getString(7));
				alarmItem.setItemAddr(rs.getInt(8));
				alarmItem.setBitIndex(rs.getInt(9));
				
				alarmItem.setValue(rs.getFloat(10));
				alarmItem.setUpperLimit(rs.getFloat(11));
				alarmItem.setLowerLimit(rs.getFloat(12));
				alarmItem.setHystersis(rs.getFloat(13));
				alarmItem.setDelay(rs.getInt(14));
				
				alarmItem.setAlarmLevel(rs.getInt(15));
				alarmItem.setAlarmSign(rs.getInt(16));
				
				alarmItem.setType(rs.getInt(17));

				alarmItem.setIsSendMessage(rs.getInt(18));
				alarmItem.setIsSendMail(rs.getInt(19));
				
				int index=-1;
				for(int i=0;i<alarmInstanceOwnItem.getItemList().size();i++){
					if(alarmItem.getItemId()==alarmInstanceOwnItem.getItemList().get(i).getItemId()){
						index=i;
						break;
					}
				}
				if(index>=0){
					alarmInstanceOwnItem.getItemList().set(index, alarmItem);
				}else{
					alarmInstanceOwnItem.getItemList().add(alarmItem);
				}
				
				String key=alarmInstanceOwnItem.getInstanceCode();
				jedis.hset("AlarmInstanceOwnItem".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(alarmInstanceOwnItem));//哈希(Hash)
				
			}
//			byte[]byt=  jedis.hget("AlarmInstanceOwnItem".getBytes(), "alarminstance3".getBytes());
//			Object obj = SerializeObjectUnils.unserizlize(byt);
//			if (obj instanceof AlarmInstanceOwnItem) {
//				AlarmInstanceOwnItem alarmInstanceOwnItem=(AlarmInstanceOwnItem) obj;
//				System.out.println(new Gson().toJson(alarmInstanceOwnItem));
//	        }
			jedis.disconnect();
			jedis.close();
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadRPCCalculateItem(){
		Jedis jedis = new Jedis();
		//有序集合
		jedis.zadd("rpcCalItemList".getBytes(),1, SerializeObjectUnils.serialize(new CalItem("工况","ResultCode","")));
		jedis.zadd("rpcCalItemList".getBytes(),2, SerializeObjectUnils.serialize(new CalItem("最大载荷","FMax","kN")));
		jedis.zadd("rpcCalItemList".getBytes(),3, SerializeObjectUnils.serialize(new CalItem("最小载荷","FMin","kN")));
		jedis.zadd("rpcCalItemList".getBytes(),4, SerializeObjectUnils.serialize(new CalItem("充满系数","FullnessCoefficient","")));
		jedis.zadd("rpcCalItemList".getBytes(),5, SerializeObjectUnils.serialize(new CalItem("理论排量","TheoreticalProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),6, SerializeObjectUnils.serialize(new CalItem("产液量","LiquidVolumetricProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),7, SerializeObjectUnils.serialize(new CalItem("产油量","OilVolumetricProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),8, SerializeObjectUnils.serialize(new CalItem("产水量","WaterVolumetricProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),9, SerializeObjectUnils.serialize(new CalItem("柱塞有效冲程计算产量","AvailablePlungerStrokeVolumetricProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),10, SerializeObjectUnils.serialize(new CalItem("泵间隙漏失量","PumpClearanceLeakVolumetricProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),11, SerializeObjectUnils.serialize(new CalItem("游动凡尔漏失量","TVLeakVolumetricProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),12, SerializeObjectUnils.serialize(new CalItem("固定凡尔漏失量","SVLeakVolumetricProduction","m^3/d")));
		jedis.zadd("rpcCalItemList".getBytes(),13, SerializeObjectUnils.serialize(new CalItem("气影响","GasInfluenceVolumetricProduction","m^3/d")));
		
		jedis.zadd("rpcCalItemList".getBytes(),14, SerializeObjectUnils.serialize(new CalItem("产液量","LiquidWeightProduction","t/d")));
		jedis.zadd("rpcCalItemList".getBytes(),15, SerializeObjectUnils.serialize(new CalItem("产油量","OilWeightProduction","t/d")));
		jedis.zadd("rpcCalItemList".getBytes(),16, SerializeObjectUnils.serialize(new CalItem("产水量","WaterWeightProduction","t/d")));
		jedis.zadd("rpcCalItemList".getBytes(),17, SerializeObjectUnils.serialize(new CalItem("柱塞有效冲程计算产量","AvailablePlungerStrokeWeightProduction","t/d")));
		jedis.zadd("rpcCalItemList".getBytes(),18, SerializeObjectUnils.serialize(new CalItem("泵间隙漏失量","PumpClearanceLeakWeightProduction","t/d")));
		jedis.zadd("rpcCalItemList".getBytes(),19, SerializeObjectUnils.serialize(new CalItem("游动凡尔漏失量","TVLeakWeightProduction","t/d")));
		jedis.zadd("rpcCalItemList".getBytes(),20, SerializeObjectUnils.serialize(new CalItem("固定凡尔漏失量","SVLeakWeightProduction","t/d")));
		jedis.zadd("rpcCalItemList".getBytes(),21, SerializeObjectUnils.serialize(new CalItem("气影响","GasInfluenceWeightProduction","t/d")));
		jedis.disconnect();
		jedis.close();
	}
	
	public static void loadPCPCalculateItem(){
		Jedis jedis = new Jedis();
		
		jedis.zadd("pcpCalItemList".getBytes(),1, SerializeObjectUnils.serialize(new CalItem("理论排量","TheoreticalProduction","m^3/d")));
		jedis.zadd("pcpCalItemList".getBytes(),2, SerializeObjectUnils.serialize(new CalItem("产液量","LiquidVolumetricProduction","m^3/d")));
		jedis.zadd("pcpCalItemList".getBytes(),3, SerializeObjectUnils.serialize(new CalItem("产油量","OilVolumetricProduction","m^3/d")));
		jedis.zadd("pcpCalItemList".getBytes(),4, SerializeObjectUnils.serialize(new CalItem("产水量","WaterVolumetricProduction","m^3/d")));
		
		jedis.zadd("pcpCalItemList".getBytes(),5, SerializeObjectUnils.serialize(new CalItem("产液量","LiquidWeightProduction","t/d")));
		jedis.zadd("pcpCalItemList".getBytes(),6, SerializeObjectUnils.serialize(new CalItem("产油量","OilWeightProduction","t/d")));
		jedis.zadd("pcpCalItemList".getBytes(),7, SerializeObjectUnils.serialize(new CalItem("产水量","WaterWeightProduction","t/d")));
		jedis.disconnect();
		jedis.close();
	}
	
	public static void loadUserInfo(){
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			Jedis jedis = new Jedis();
			String sql="select t.user_no,t.user_id,t.user_name,t.user_pwd,t.user_orgid,"
					+ " t.user_in_email,t.user_phone,"
					+ " t.user_quicklogin,t.user_enable,t.user_receivesms,t.user_receivemail,"
					+ " t.user_type,t2.role_name,t2.role_level,t2.role_flag,t2.showlevel "
					+ " from tbl_user t,tbl_role t2 "
					+ " where t.user_type=t2.role_id"
					+ " order by t.user_no";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				UserInfo userInfo=new UserInfo();
				userInfo.setUserNo(rs.getInt(1));
				userInfo.setUserId(rs.getString(2));
				userInfo.setUserName(rs.getString(3));
				userInfo.setUserPwd(rs.getString(4));
				userInfo.setUserOrgid(rs.getInt(5));
				
				userInfo.setUserInEmail(rs.getString(6));
				userInfo.setUserPhone(rs.getString(7));
				
				userInfo.setUserQuickLogin(rs.getInt(8));
				userInfo.setUserEnable(rs.getInt(9));
				userInfo.setReceiveSMS(rs.getInt(10));
				userInfo.setReceiveMail(rs.getInt(11));
				
				userInfo.setUserType(rs.getInt(12));
				userInfo.setRoleName(rs.getString(13));
				userInfo.setRoleLevel(rs.getInt(14));
				userInfo.setRoleFlag(rs.getInt(15));
				userInfo.setRoleShowLevel(rs.getInt(16));
				
				String key=userInfo.getUserId();
				jedis.hset("UserInfo".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(userInfo));//哈希(Hash)
			}
			jedis.disconnect();
			jedis.close();
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static void loadRPCWorkType(){
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return;
        }
		try {
			Jedis jedis = new Jedis();
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
				String key=workType.getResultCode()+"";
				jedis.hset("RPCWorkType".getBytes(), key.getBytes(), SerializeObjectUnils.serialize(workType));//哈希(Hash)
			}
			jedis.disconnect();
			jedis.close();
		}catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	@SuppressWarnings("resource")
	public static void initAlarmStyle(){
		Connection conn = null;   
		PreparedStatement pstmt = null;  
		Statement stmt = null;  
		ResultSet rs = null;
		try {
			Jedis jedis = new Jedis();
			AlarmShowStyle alarmShowStyle=new AlarmShowStyle();
			String sql="select v1.itemvalue as alarmLevel,v1.itemname as backgroundColor,v2.itemname as color,v3.itemname as opacity from "
					+ " (select * from tbl_code t where t.itemcode='BJYS' ) v1,"
					+ " (select * from tbl_code t where t.itemcode='BJQJYS' ) v2,"
					+ " (select * from tbl_code t where t.itemcode='BJYSTMD' ) v3 "
					+ " where v1.itemvalue=v2.itemvalue and v1.itemvalue=v3.itemvalue "
					+ " order by v1.itemvalue ";
			String sql2="select v1.itemvalue as alarmLevel,v1.itemname as backgroundColor,v2.itemname as color,v3.itemname as opacity from "
					+ " (select * from tbl_code t where t.itemcode='TXBJYS' ) v1,"
					+ " (select * from tbl_code t where t.itemcode='TXBJQJYS' ) v2,"
					+ " (select * from tbl_code t where t.itemcode='TXBJYSTMD' ) v3 "
					+ " where v1.itemvalue=v2.itemvalue and v1.itemvalue=v3.itemvalue "
					+ " order by v1.itemvalue ";
			
			conn=OracleJdbcUtis.getConnection();
			if(conn==null){
				return ;
			}
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				if(rs.getInt(1)==0){
					alarmShowStyle.getData().getNormal().setValue(rs.getInt(1));
					alarmShowStyle.getData().getNormal().setBackgroundColor(rs.getString(2));
					alarmShowStyle.getData().getNormal().setColor(rs.getString(3));
					alarmShowStyle.getData().getNormal().setOpacity(rs.getString(4));
				}else if(rs.getInt(1)==100){
					alarmShowStyle.getData().getFirstLevel().setValue(rs.getInt(1));
					alarmShowStyle.getData().getFirstLevel().setBackgroundColor(rs.getString(2));
					alarmShowStyle.getData().getFirstLevel().setColor(rs.getString(3));
					alarmShowStyle.getData().getFirstLevel().setOpacity(rs.getString(4));
				}else if(rs.getInt(1)==200){
					alarmShowStyle.getData().getSecondLevel().setValue(rs.getInt(1));
					alarmShowStyle.getData().getSecondLevel().setBackgroundColor(rs.getString(2));
					alarmShowStyle.getData().getSecondLevel().setColor(rs.getString(3));
					alarmShowStyle.getData().getSecondLevel().setOpacity(rs.getString(4));
				}else if(rs.getInt(1)==300){
					alarmShowStyle.getData().getThirdLevel().setValue(rs.getInt(1));
					alarmShowStyle.getData().getThirdLevel().setBackgroundColor(rs.getString(2));
					alarmShowStyle.getData().getThirdLevel().setColor(rs.getString(3));
					alarmShowStyle.getData().getThirdLevel().setOpacity(rs.getString(4));
				}	
			}
			pstmt = conn.prepareStatement(sql2); 
			rs=pstmt.executeQuery();
			while(rs.next()){
				if(rs.getInt(1)==0){
					alarmShowStyle.getComm().getOffline().setValue(rs.getInt(1));
					alarmShowStyle.getComm().getOffline().setBackgroundColor(rs.getString(2));
					alarmShowStyle.getComm().getOffline().setColor(rs.getString(3));
					alarmShowStyle.getComm().getOffline().setOpacity(rs.getString(4));
				}else if(rs.getInt(1)==1){
					alarmShowStyle.getComm().getOnline().setValue(rs.getInt(1));
					alarmShowStyle.getComm().getOnline().setBackgroundColor(rs.getString(2));
					alarmShowStyle.getComm().getOnline().setColor(rs.getString(3));
					alarmShowStyle.getComm().getOnline().setOpacity(rs.getString(4));
				}
			}
			jedis.set("AlarmShowStyle".getBytes(), SerializeObjectUnils.serialize(alarmShowStyle));
			jedis.disconnect();
			jedis.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
	}
	
	public static ModbusProtocolConfig getModbusProtocolConfig(){
		Jedis jedis = new Jedis();
		if(!jedis.exists("modbusProtocolConfig".getBytes())){
			MemoryDataManagerTask.loadProtocolConfig();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig)SerializeObjectUnils.unserizlize(jedis.get("modbusProtocolConfig".getBytes()));
		jedis.disconnect();
		jedis.close();
		return modbusProtocolConfig;
	}
	
	public static class CalItem implements Serializable {
		private static final long serialVersionUID = 1L;
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
