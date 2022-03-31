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
	
	@Scheduled(fixedRate = 1000*60*60*24*365*100)
	public void loadMemoryData() throws SQLException, ParseException,InterruptedException, IOException{
		loadRPCDeviceInfo(null);
		loadPCPDeviceInfo(null);
	}
	
	public void loadRPCDeviceInfo(List<String> wellIdList){
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
					type = new TypeToken<RPCProductionData>() {}.getType();
					RPCProductionData rpcProductionData=gson.fromJson(productionData, type);
					if(rpcProductionData!=null){
						if(rpcProductionData.getFluidPVT()!=null){
							rocDeviceInfo.setFluidPVT(new RPCDeviceInfo.FluidPVT());
							rocDeviceInfo.getFluidPVT().setCrudeOilDensity(rpcProductionData.getFluidPVT().getCrudeOilDensity());
							rocDeviceInfo.getFluidPVT().setWaterDensity(rpcProductionData.getFluidPVT().getWaterDensity());
							rocDeviceInfo.getFluidPVT().setNaturalGasRelativeDensity(rpcProductionData.getFluidPVT().getNaturalGasRelativeDensity());
							rocDeviceInfo.getFluidPVT().setSaturationPressure(rpcProductionData.getFluidPVT().getSaturationPressure());
						}else{
							rocDeviceInfo.setFluidPVT(null);
						}
						if(rpcProductionData.getReservoir()!=null){
							rocDeviceInfo.setReservoir(new RPCDeviceInfo.Reservoir());
							rocDeviceInfo.getReservoir().setDepth(rpcProductionData.getReservoir().getDepth());
							rocDeviceInfo.getReservoir().setTemperature(rpcProductionData.getReservoir().getTemperature());
						}else{
							rocDeviceInfo.setReservoir(null);
						}
						if(rpcProductionData.getTubingString()!=null && rpcProductionData.getTubingString().getEveryTubing()!=null && rpcProductionData.getTubingString().getEveryTubing().size()>0){
							rocDeviceInfo.setTubingString(new RPCDeviceInfo.TubingString());
							rocDeviceInfo.getTubingString().setEveryTubing(new ArrayList<RPCDeviceInfo.EveryTubing>());
							RPCDeviceInfo.EveryTubing everyTubing=new RPCDeviceInfo.EveryTubing();
							everyTubing.setInsideDiameter(rpcProductionData.getTubingString().getEveryTubing().get(0).getInsideDiameter());
							rocDeviceInfo.getTubingString().getEveryTubing().add(everyTubing);
						}else{
							rocDeviceInfo.setTubingString(null);
						}
						if(rpcProductionData.getCasingString()!=null && rpcProductionData.getCasingString().getEveryCasing()!=null && rpcProductionData.getCasingString().getEveryCasing().size()>0){
							rocDeviceInfo.setCasingString(new RPCDeviceInfo.CasingString());
							rocDeviceInfo.getCasingString().setEveryCasing(new ArrayList<RPCDeviceInfo.EveryCasing>());
							RPCDeviceInfo.EveryCasing everyCasing=new RPCDeviceInfo.EveryCasing();
							everyCasing.setInsideDiameter(rpcProductionData.getCasingString().getEveryCasing().get(0).getInsideDiameter());
							rocDeviceInfo.getCasingString().getEveryCasing().add(everyCasing);
						}else{
							rocDeviceInfo.setCasingString(null);
						}
						if(rpcProductionData.getRodString()!=null && rpcProductionData.getRodString().getEveryRod()!=null && rpcProductionData.getRodString().getEveryRod().size()>0){
							rocDeviceInfo.setRodString(new RPCDeviceInfo.RodString());
							rocDeviceInfo.getRodString().setEveryRod(new ArrayList<RPCDeviceInfo.EveryRod>());
							for(int i=0;i<rpcProductionData.getRodString().getEveryRod().size();i++){
								RPCDeviceInfo.EveryRod everyRod=new RPCDeviceInfo.EveryRod();
								everyRod.setGrade(rpcProductionData.getRodString().getEveryRod().get(i).getGrade());
								everyRod.setInsideDiameter(rpcProductionData.getRodString().getEveryRod().get(i).getInsideDiameter());
								everyRod.setOutsideDiameter(rpcProductionData.getRodString().getEveryRod().get(i).getOutsideDiameter());
								everyRod.setLength(rpcProductionData.getRodString().getEveryRod().get(i).getLength());
								rocDeviceInfo.getRodString().getEveryRod().add(everyRod);
							}
						}else{
							rocDeviceInfo.setTubingString(null);
						}
						if(rpcProductionData.getPump()!=null){
							rocDeviceInfo.setPump(new RPCDeviceInfo.Pump());
							rocDeviceInfo.getPump().setPumpType(rpcProductionData.getPump().getPumpType());
							rocDeviceInfo.getPump().setBarrelType(rpcProductionData.getPump().getBarrelType());
							rocDeviceInfo.getPump().setPumpGrade(rpcProductionData.getPump().getPumpGrade());
							rocDeviceInfo.getPump().setPlungerLength(rpcProductionData.getPump().getPlungerLength());
							rocDeviceInfo.getPump().setPumpBoreDiameter(rpcProductionData.getPump().getPumpBoreDiameter());
						}else{
							rocDeviceInfo.setPump(null);
						}
						if(rpcProductionData.getProduction()!=null){
							rocDeviceInfo.setProduction(new RPCDeviceInfo.Production());
							rocDeviceInfo.getProduction().setWaterCut(rpcProductionData.getProduction().getWaterCut());
							rocDeviceInfo.getProduction().setProductionGasOilRatio(rpcProductionData.getProduction().getProductionGasOilRatio());
							rocDeviceInfo.getProduction().setTubingPressure(rpcProductionData.getProduction().getTubingPressure());
							rocDeviceInfo.getProduction().setCasingPressure(rpcProductionData.getProduction().getCasingPressure());
							rocDeviceInfo.getProduction().setWellHeadTemperature(rpcProductionData.getProduction().getWellHeadTemperature());
							rocDeviceInfo.getProduction().setProducingfluidLevel(rpcProductionData.getProduction().getProducingfluidLevel());
							rocDeviceInfo.getProduction().setPumpSettingDepth(rpcProductionData.getProduction().getPumpSettingDepth());
							rocDeviceInfo.getProduction().setLevelCorrectValue(rpcProductionData.getProduction().getLevelCorrectValue());
						}else{
							rocDeviceInfo.setProduction(null);
						}
						if(pumpingModelId>0){
							rocDeviceInfo.setPumpingUnit(new RPCDeviceInfo.PumpingUnit());
//							rocDeviceInfo.getPumpingUnit().setBalance(new RPCDeviceInfo.Balance());
//							rocDeviceInfo.getPumpingUnit().getBalance().setEveryBalance(new ArrayList<RPCDeviceInfo.EveryBalance>());
							rocDeviceInfo.getPumpingUnit().setManufacturer(rs.getString(24));
							rocDeviceInfo.getPumpingUnit().setModel(rs.getString(25));
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
						if(rpcProductionData.getManualIntervention()!=null){
							rocDeviceInfo.setManualIntervention(new RPCDeviceInfo.ManualIntervention());
							rocDeviceInfo.getManualIntervention().setNetGrossRatio(rpcProductionData.getManualIntervention().getNetGrossRatio());
							rocDeviceInfo.getManualIntervention().setCode(rpcProductionData.getManualIntervention().getCode());
						}else{
							rocDeviceInfo.setManualIntervention(null);
						}
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
	
	public void loadPCPDeviceInfo(List<String> wellIdList){
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
					type = new TypeToken<PCPProductionData>() {}.getType();
					PCPProductionData pcpProductionData=gson.fromJson(productionData, type);
					if(pcpProductionData!=null){
						if(pcpProductionData.getFluidPVT()!=null){
							rocDeviceInfo.setFluidPVT(new PCPDeviceInfo.FluidPVT());
							rocDeviceInfo.getFluidPVT().setCrudeOilDensity(pcpProductionData.getFluidPVT().getCrudeOilDensity());
							rocDeviceInfo.getFluidPVT().setWaterDensity(pcpProductionData.getFluidPVT().getWaterDensity());
							rocDeviceInfo.getFluidPVT().setNaturalGasRelativeDensity(pcpProductionData.getFluidPVT().getNaturalGasRelativeDensity());
							rocDeviceInfo.getFluidPVT().setSaturationPressure(pcpProductionData.getFluidPVT().getSaturationPressure());
						}else{
							rocDeviceInfo.setFluidPVT(null);
						}
						if(pcpProductionData.getReservoir()!=null){
							rocDeviceInfo.setReservoir(new PCPDeviceInfo.Reservoir());
							rocDeviceInfo.getReservoir().setDepth(pcpProductionData.getReservoir().getDepth());
							rocDeviceInfo.getReservoir().setTemperature(pcpProductionData.getReservoir().getTemperature());
						}else{
							rocDeviceInfo.setReservoir(null);
						}
						if(pcpProductionData.getTubingString()!=null && pcpProductionData.getTubingString().getEveryTubing()!=null && pcpProductionData.getTubingString().getEveryTubing().size()>0){
							rocDeviceInfo.setTubingString(new PCPDeviceInfo.TubingString());
							rocDeviceInfo.getTubingString().setEveryTubing(new ArrayList<PCPDeviceInfo.EveryTubing>());
							PCPDeviceInfo.EveryTubing everyTubing=new PCPDeviceInfo.EveryTubing();
							everyTubing.setInsideDiameter(pcpProductionData.getTubingString().getEveryTubing().get(0).getInsideDiameter());
							rocDeviceInfo.getTubingString().getEveryTubing().add(everyTubing);
						}else{
							rocDeviceInfo.setTubingString(null);
						}
						if(pcpProductionData.getCasingString()!=null && pcpProductionData.getCasingString().getEveryCasing()!=null && pcpProductionData.getCasingString().getEveryCasing().size()>0){
							rocDeviceInfo.setCasingString(new PCPDeviceInfo.CasingString());
							rocDeviceInfo.getCasingString().setEveryCasing(new ArrayList<PCPDeviceInfo.EveryCasing>());
							PCPDeviceInfo.EveryCasing everyCasing=new PCPDeviceInfo.EveryCasing();
							everyCasing.setInsideDiameter(pcpProductionData.getCasingString().getEveryCasing().get(0).getInsideDiameter());
							rocDeviceInfo.getCasingString().getEveryCasing().add(everyCasing);
						}else{
							rocDeviceInfo.setCasingString(null);
						}
						if(pcpProductionData.getRodString()!=null && pcpProductionData.getRodString().getEveryRod()!=null && pcpProductionData.getRodString().getEveryRod().size()>0){
							rocDeviceInfo.setRodString(new PCPDeviceInfo.RodString());
							rocDeviceInfo.getRodString().setEveryRod(new ArrayList<PCPDeviceInfo.EveryRod>());
							for(int i=0;i<pcpProductionData.getRodString().getEveryRod().size();i++){
								PCPDeviceInfo.EveryRod everyRod=new PCPDeviceInfo.EveryRod();
								everyRod.setGrade(pcpProductionData.getRodString().getEveryRod().get(i).getGrade());
								everyRod.setInsideDiameter(pcpProductionData.getRodString().getEveryRod().get(i).getInsideDiameter());
								everyRod.setOutsideDiameter(pcpProductionData.getRodString().getEveryRod().get(i).getOutsideDiameter());
								everyRod.setLength(pcpProductionData.getRodString().getEveryRod().get(i).getLength());
								rocDeviceInfo.getRodString().getEveryRod().add(everyRod);
							}
						}else{
							rocDeviceInfo.setTubingString(null);
						}
						if(pcpProductionData.getPump()!=null){
							rocDeviceInfo.setPump(new PCPDeviceInfo.Pump());
							rocDeviceInfo.getPump().setBarrelLength(pcpProductionData.getPump().getBarrelLength());
							rocDeviceInfo.getPump().setBarrelSeries(pcpProductionData.getPump().getBarrelSeries());
							rocDeviceInfo.getPump().setQPR(pcpProductionData.getPump().getQPR());
							rocDeviceInfo.getPump().setRotorDiameter(pcpProductionData.getPump().getRotorDiameter());
						}else{
							rocDeviceInfo.setPump(null);
						}
						if(pcpProductionData.getProduction()!=null){
							rocDeviceInfo.setProduction(new PCPDeviceInfo.Production());
							rocDeviceInfo.getProduction().setWaterCut(pcpProductionData.getProduction().getWaterCut());
							rocDeviceInfo.getProduction().setProductionGasOilRatio(pcpProductionData.getProduction().getProductionGasOilRatio());
							rocDeviceInfo.getProduction().setTubingPressure(pcpProductionData.getProduction().getTubingPressure());
							rocDeviceInfo.getProduction().setCasingPressure(pcpProductionData.getProduction().getCasingPressure());
							rocDeviceInfo.getProduction().setWellHeadTemperature(pcpProductionData.getProduction().getWellHeadTemperature());
							rocDeviceInfo.getProduction().setProducingfluidLevel(pcpProductionData.getProduction().getProducingfluidLevel());
							rocDeviceInfo.getProduction().setPumpSettingDepth(pcpProductionData.getProduction().getPumpSettingDepth());
						}else{
							rocDeviceInfo.setProduction(null);
						}
						if(pcpProductionData.getManualIntervention()!=null){
							rocDeviceInfo.setManualIntervention(new PCPDeviceInfo.ManualIntervention());
							rocDeviceInfo.getManualIntervention().setNetGrossRatio(pcpProductionData.getManualIntervention().getNetGrossRatio());
						}else{
							rocDeviceInfo.setManualIntervention(null);
						}
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
}
