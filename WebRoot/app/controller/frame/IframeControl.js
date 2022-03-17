/*******************************************************************************
 * 定义 IframeControl AP 为在app.js里定义的命名空间
 * 
 * @argument views： 改控制器里使用的view 为frame.IframeView
 * @cfg refs： 通过别名来引用 改view iframeView init：初始化改控制器 渲染iframeViewd 的时候，
 *      配置一个itemclick 事件
 */
Ext.define('AP.controller.frame.IframeControl', {
			extend : 'Ext.app.Controller',
			views : ['frame.IframeView'],
			refs : [{
						ref : 'iframeView',
						selector : 'iframeView'
					}],
			init : function() {
				this.control({
							'iframeView' : {
//								itemclick : extTreeItemsClk,
								selectionchange:extTreeItemsSelectedChange,
								afterrender : function() {
									Ext.fly('loading_div_id').remove(); 
								}
							}
						})
			}
		});
/*******************************************************************************
 * 点击左侧组织树时，调用该方法。向后台传入一个组织的ID值orgId
 ******************************************************************************/
function extTreeItemsSelectedChange(view, selected, o) {
	if (selected.length > 0) {
		var rec=selected[0];
		selectresult=[];
		var org_Id = foreachAndSearchOrgChildId(rec);// 获取到当前点击的组织ID
		selectReeTextRsult = [];
		var org_Name=selectEachTreeText(rec);
		if(!(org_Id.indexOf(userOrg_Ids)>0)){
			Ext.getCmp("leftOrg_Id").setValue("");// 将org_Id的值赋值给IframeView里的组织隐藏域
			Ext.getCmp("leftOrg_Id").setValue(org_Id);// 将org_Id的值赋值给IframeView里的组织隐藏域
		}
		if(!(org_Name.indexOf(userOrg_Names)>0)){
			Ext.getCmp("leftOrg_Name").setValue("");// 将org_Id的值赋值给IframeView里的组织隐藏域
			Ext.getCmp("leftOrg_Name").setValue(org_Name);// 将org_Id的值赋值给IframeView里的组织隐藏域
		}
		Ext.getCmp("orgTreeSelectedCoordX_Id").setValue(rec.data.orgCoordX);// 将组织X坐标的值赋值给IframeView里的组织隐藏域
		Ext.getCmp("orgTreeSelectedCoordY_Id").setValue(rec.data.orgCoordY);// 将组织Y坐标的值赋值给IframeView里的组织隐藏域
		Ext.getCmp("orgTreeSelectedShowLevel_Id").setValue(rec.data.orgShowLevel);// 将组织显示级别的值赋值给IframeView里的组织隐藏域
		var module_Code = Ext.getCmp("topModule_Id").getValue();// 拿到IframeView
		var secondTab_Code=getSecondTapCode(module_Code);
		refreshPanel(org_Id,secondTab_Code,rec);
	}
	
	// Ext.getCmp("frame_west").collapse(Ext.Component.DIRECTION_LEFT,true);
	return false;
};

/*******************************************************************************
 * 
 * 功能模块公用的方法，每次点击上部的功能模块时，调用该方法
 * 
 * @argument o：为对应模块view的URL
 * @argument mdCode：为当前模块的编码 例如monitor_MonitorPumpingUnit
 * @argument tab_url:动态创建底部的tab的url 传入改参数来动态的拼接出action的URL MonitorOutAllText
 *           MonitorPumpingUnit 诸如此类的变量全是是 vary.js文件定义的全局变量
 ******************************************************************************/
function addPanelEps(o, mdCode, tab_url) {

	var leftOrg_Id = Ext.getCmp("leftOrg_Id");
	
	if (!Ext.isEmpty(leftOrg_Id)) {
		leftOrg_Id = leftOrg_Id.getValue();
	}
	
	var secondTab_Code=getSecondTapCode(mdCode);
	
	refreshPanel(leftOrg_Id,secondTab_Code);
	return false;
}


getSecondTapCode=function(mdCode){
	var secondTab_Code="";
	var secondBottomTab_Id=Ext.getCmp("secondBottomTab_Id");
	if(isNotVal(secondBottomTab_Id)){
		secondBottomTab_Id=secondBottomTab_Id.getValue();
		}
	var productBottomTab_Id=Ext.getCmp("productBottomTab_Id");
	if(isNotVal(productBottomTab_Id)){
		productBottomTab_Id=productBottomTab_Id.getValue();
		}
	var imageBottomTab_Id=Ext.getCmp("imageBottomTab_Id");
	if(isNotVal(imageBottomTab_Id)){
		imageBottomTab_Id=imageBottomTab_Id.getValue();
		}
	
	try {
		var modules = mdCode.split("_");
		if (modules.length > 0) {
				Ext.getCmp("topModule_Id").setValue("");// 给IframeView里的模块隐藏域赋值
				Ext.getCmp("bottomTab_Id").setValue("");// 给IframeView里的模块隐藏域赋值
				//Ext.getCmp("secondBottomTab_Id").setValue("");// 给IframeView里的第二个tab的模块隐藏域赋值
				Ext.getCmp("topModule_Id").setValue(mdCode);// 给IframeView里的模块隐藏域赋值
				Ext.getCmp("bottomTab_Id").setValue(modules[1]);// 给IframeView里的模块隐藏域赋值
				if (modules.length > 2) {
					var aa=modules[1].indexOf("Diagnosis");
					if(modules[1].indexOf("Diagnosis")>-1){
						if(secondBottomTab_Id==(modules[2])){
							Ext.getCmp("secondBottomTab_Id").setValue("");// 给IframeView里的第二个tab的模块隐藏域赋值
							Ext.getCmp("secondBottomTab_Id").setValue(modules[2]);// 给IframeView里的第二个tab的模块隐藏域赋值
						}
						secondTab_Code=secondBottomTab_Id;
					}
					if(modules[1].indexOf("Compute")>-1){
						if(productBottomTab_Id==(modules[2])){
							Ext.getCmp("productBottomTab_Id").setValue("");// 给IframeView里的第二个tab的模块隐藏域赋值
							Ext.getCmp("productBottomTab_Id").setValue(modules[2]);// 给IframeView里的第二个tab的模块隐藏域赋值
						}
						secondTab_Code=productBottomTab_Id;
					}
					if(modules[1].indexOf("Image")>-1){
						if(imageBottomTab_Id==(modules[2])){
							Ext.getCmp("imageBottomTab_Id").setValue("");// 给IframeView里的第二个tab的模块隐藏域赋值
							Ext.getCmp("imageBottomTab_Id").setValue(modules[2]);// 给IframeView里的第二个tab的模块隐藏域赋值
						}
						secondTab_Code=imageBottomTab_Id;
					}
				}else{
					secondTab_Code="";
				}
		}
	} catch (e) {
		//Ext.Msg.alert("exception", " name: " + e.name + " \n message: "
						//+ e.message + " \n lineNumber: " + e.lineNumber
						//+ " \n fileName: " + e.fileName + " \n stack: "
						//+ e.stack);
	}
	return secondTab_Code;
	
};


refreshPanel=function(leftOrg_Id,secondTab_Code,rec){
	var module_Code = Ext.getCmp("topModule_Id").getValue();// 拿到IframeView
	var tab_Code = Ext.getCmp("bottomTab_Id").getValue();// 拿到IframeView
	//var secondTab_Code = Ext.getCmp("secondBottomTab_Id").getValue();// 拿到第二个tab隐藏域的值
	var tab_Id = Ext.getCmp(tab_Code);
	var url;
	var countId;
	
	if (tab_Id != undefined) {
		tab_Id.show();
	}
	var modules = module_Code.split("_");
	
	
	var panel_Id = "";
	if (module_Code != "video" && module_Code != "map_MapDraw" && module_Code != "realtime_RealtimeMonitor"
		&& module_Code != "ProductionReport"
		&& module_Code != "ProductionData"
		&& module_Code != "WellInformation"
		&& module_Code != "PumpDeviceManager"
		&& module_Code != "PipelineDeviceManager"
		&& module_Code != "SMSDeviceManager"
		&& module_Code != "AuxiliaryDeviceManager"
		&& module_Code != "DeviceRealTimeMonitoring"
		&& module_Code != "DeviceHistoryQuery"
		&& module_Code != "LogQuery"
		&& module_Code != "AlarmQuery"
		&& module_Code != "AlarmSet") {
		if (modules.length > 2) {
			if(secondTab_Code!= modules[2]){
				modules[2]=secondTab_Code;
			}
			panel_Id = tab_Code + "_" + secondTab_Code + "_Id";
			// alert(panel_Id);
			if (modules[2] == "ProductionStatistics") {
				var jssj_ = Ext.getCmp("Statistics_date_Id").rawValue;
						// 检索动态列表头及内容信息
							Ext.Ajax.request({
								method : 'POST',
								url : context+ '/viewOutPutStatisticsController/showRecentlyDay?flag=con',
								params: {
						             orgId: leftOrg_Id,
						             jssj:jssj_
						           },
								success : function(response, opts) {
									// 处理后json
									var obj = Ext.decode(response.responseText);
									var getDomHtml = Ext.get("computeStatisticsTablePanel_Id");
								    getDomHtml.dom.innerHTML = obj.compute;
								    senfe("compute","#fff","#FAFAFA","#F4F4F4","#DFE8F6");
									var ProductionStatisticsChartData_Ids=Ext.getCmp("ProductionStatisticsChartData_Ids");
									if(isNotVal(ProductionStatisticsChartData_Ids)){
										ProductionStatisticsChartData_Ids.setValue("");
										ProductionStatisticsChartData_Ids.setValue(response.responseText);
									}
									initComputeChartType(obj);
									// ==end
								},
								failure : function(response, opts) {
									Ext.Msg.alert("信息提示", "后台获取数据失败！");
								}
							});
			}
		} else {
			panel_Id = tab_Code + "_Id";
		}
		var ext_panel = Ext.getCmp(panel_Id);
		if (ext_panel != undefined||tab_Code=="BalanceHistory"||tab_Code=="BalanceCycle") {
			// 工况诊断的统计信息刷新及图形
			if (secondTab_Code == "ResultDistributionStatistic") {
				ext_panel.getStore().load();
			} else if (secondTab_Code == "SingleDinagnosisAnalysis") {
				var leftOrg_Id = Ext.getCmp("leftOrg_Id");
				if (!Ext.isEmpty(leftOrg_Id)) {
					leftOrg_Id = leftOrg_Id.getValue();
				}
				ext_panel.getStore().load();
				var iframe_Id = Ext.get("iframeSingleDyn_Id");
				//iframe_Id.dom.src = context+ "/login/list?orgId="+ leftOrg_Id;
			} else if (secondTab_Code == "DynContrastDinagnosisAnalysis") {
				var leftOrg_Id = Ext.getCmp("leftOrg_Id");
				if (!Ext.isEmpty(leftOrg_Id)) {
					leftOrg_Id = leftOrg_Id.getValue();
				}
				ext_panel.getStore().load();
			} else if (modules[2] == "ProductionStatistics"
					&& secondTab_Code == "ProductionStatistics") {
				var chartImage_Id = Ext.getCmp("ProductionStatisticsChart_TypeId").getValue();// 拿到IframeView
				var ProductionStatisticsChart_TypeId = Ext
						.getCmp("ProductionStatisticsChart_TypeId").getValue();
				if (ProductionStatisticsChart_TypeId == "ColumnInfoCharts_Id") {
					showComputeChart("AP.view.compute.ColumnInfoChart");
				} else if (ProductionStatisticsChart_TypeId == "PieInfoCharts_Id") {
					showComputeChart("AP.view.compute.PieInfoChart");
				}
			} else if (tab_Code == "CurvePumpingUnit") {
				ext_panel.getStore().load();
				Ext.getCmp("CurvePumpingUnit_LineChartId").store.load();
			} else if (tab_Code == "CurveWaterInjectionWell") {
				ext_panel.getStore().load();
				Ext.getCmp("CurveWaterInjectionWell_LineChartId").store.load();
			} else if(tab_Code=="SurfaceCardQuery"){
//				page=1;
//				Ext.create("AP.store.graphicalQuery.SurfaceCardStore");
			} else if(tab_Code=="PumpCardQuery"){
				page=1;
				Ext.create("AP.store.graphicalQuery.PumpCardStore");
			} else if(tab_Code=="RodPressQuery"){
				page=1;
				Ext.create("AP.store.graphicalQuery.RodPressStore");
			} else if(tab_Code=="PumpEfficiencyQuery"){
				page=1;
				Ext.create("AP.store.graphicalQuery.PumpEfficiencyStore");
			} else if(tab_Code=="BalanceHistory"){
				var tabPanel = Ext.getCmp("BalanceHistoryTab_Id");
				var activeId = tabPanel.getActiveTab().id;
				if(activeId=="HistoryTorqueMaxValue_Id"){
					Ext.getCmp("TorqueMaxValueHistoryWellListGrid_Id").getStore().load();
				}
			}else if(tab_Code=="BalanceCycle"){
				var tabPanel = Ext.getCmp("BalanceCycleTab_Id");
				var activeId = tabPanel.getActiveTab().id;
				if(activeId=="CycleTorqueMaxValue_Id"){
					var tabPanel2 = Ext.getCmp("CycleTorqueMaxValueTappanel_Id");
					var activeId2 = tabPanel2.getActiveTab().id;
					if(activeId2=="CycleTorqueMaxValuePanel_Id"){
						Ext.getCmp("TorqueMaxValueCycleWellListGrid_Id").getStore().load();
					}else{
						Ext.getCmp("TorqueMaxValueTotalWellListGrid_Id").getStore().load();
					}
				}
			} else {
				ext_panel.getStore().load();
			}
		} else {
			// Ext.Msg.alert("info", '抱歉，该模块正在开发中... ');
		}
	}else if(module_Code == "WellInformation"){
		var tabPanel = Ext.getCmp("DeviceManagerTabPanel");
		var activeId = tabPanel.getActiveTab().id;
		if(activeId=="PumpDeviceManagerPanel"){
			CreateAndLoadPumpDeviceInfoTable();
		}else if(activeId=="PipelineDeviceManagerPanel"){
			CreateAndLoadPipelineDeviceInfoTable();
		}
	}else if(module_Code == "PumpDeviceManager"){
		var tabPanel = Ext.getCmp("PumpDeviceManagerTabPanel");
		var activeId = tabPanel.getActiveTab().id;
		if(activeId=="DiaphragmPumpDeviceInfoTabPanel_Id"){
			Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("DiaphragmPumpDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadDiaphragmPumpDeviceInfoTable(true);
		}else if(activeId=="ScrewPumpDeviceInfoTabPanel_Id"){
			Ext.getCmp("ScrewPumpDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("ScrewPumpDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadScrewPumpDeviceInfoTable(true);
		}else if(activeId=="LinearMotorPumpDeviceInfoTabPanel_Id"){
			Ext.getCmp("LinearMotorPumpDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("LinearMotorPumpDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadLinearMotorPumpDeviceInfoTable(true);
		}else if(activeId=="ElectricSubmersiblePumpDeviceInfoTabPanel_Id"){
			Ext.getCmp("ElectricSubmersiblePumpDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("ElectricSubmersiblePumpDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadElectricSubmersiblePumpDeviceInfoTable(true);
		}else if(activeId=="JetPumpDeviceInfoTabPanel_Id"){
			Ext.getCmp("JetPumpDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("JetPumpDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadJetPumpDeviceInfoTable(true);
		}
	}else if(module_Code == "PipelineDeviceManager"){
		var tabPanel = Ext.getCmp("PipelineDeviceManagerTabPanel");
		var activeId = tabPanel.getActiveTab().id;
		if(activeId=="HeatingPipelineDeviceInfoTabPanel_Id"){
			Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("HeatingPipelineDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadHeatingPipelineDeviceInfoTable(true);
		}else if(activeId=="WaterGatheringPipelineDeviceInfoTabPanel_Id"){
			Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("WaterGatheringPipelineDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadWaterGatheringPipelineDeviceInfoTable(true);
		}else if(activeId=="GatheringPipelineDeviceInfoTabPanel_Id"){
			Ext.getCmp("GatheringPipelineDeviceSelectRow_Id").setValue(0);
        	Ext.getCmp("GatheringPipelineDeviceSelectEndRow_Id").setValue(0);
			CreateAndLoadGatheringPipelineDeviceInfoTable(true);
		}
	}else if(module_Code == "SMSDeviceManager"){
		CreateAndLoadSMSDeviceInfoTable(true);
	}else if(module_Code == "AuxiliaryDeviceManager"){
		CreateAndLoadAuxiliaryDeviceInfoTable(true);
	}else if(module_Code == "DeviceRealTimeMonitoring"){
		var tabPanel = Ext.getCmp("RealTimeMonitoringTabPanel");
		var activeId = tabPanel.getActiveTab().id;
		if(activeId=="PumpRealTimeMonitoringInfoPanel_Id"){
			var statTabActiveId = Ext.getCmp("PumpRealTimeMonitoringStatTabPanel").getActiveTab().id;
			if(statTabActiveId=="PumpRealTimeMonitoringStatGraphPanel_Id"){
				loadAndInitCommStatusStat(true);
			}else if(statTabActiveId=="PumpRealTimeMonitoringDeviceTypeStatGraphPanel_Id"){
				loadAndInitDeviceTypeStat(true);
			}
			Ext.getCmp('RealTimeMonitoringPumpDeviceListComb_Id').setValue('');
			Ext.getCmp('RealTimeMonitoringPumpDeviceListComb_Id').setRawValue('');
			var gridPanel = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id");
			if (isNotVal(gridPanel)) {
				gridPanel.getSelectionModel().deselectAll(true);
				gridPanel.getStore().load();
			}else{
				Ext.create('AP.store.realTimeMonitoring.PumpRealTimeMonitoringWellListStore');
			}
		}else if(activeId=="PipelineRealTimeMonitoringInfoPanel_Id"){
			var statTabActiveId = Ext.getCmp("PipelineRealTimeMonitoringStatTabPanel").getActiveTab().id;
			if(statTabActiveId=="PipelineRealTimeMonitoringStatGraphPanel_Id"){
				loadAndInitCommStatusStat(true);
			}else if(statTabActiveId=="PipelineRealTimeMonitoringDeviceTypeStatGraphPanel_Id"){
				loadAndInitDeviceTypeStat(true);
			}
			Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').setValue('');
			Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').setRawValue('');
			var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
			if (isNotVal(gridPanel)) {
				gridPanel.getSelectionModel().deselectAll(true);
				gridPanel.getStore().load();
			}else{
				Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringWellListStore');
			}
		}
	}else if(module_Code == "DeviceHistoryQuery"){
		var realtimeTurnToHisyorySign=Ext.getCmp("realtimeTurnToHisyorySign_Id").getValue();
		var activeId = Ext.getCmp("HistoryQueryTabPanel").getActiveTab().id;
		if(activeId=="PumpHistoryQueryInfoPanel_Id"){
			var statTabActiveId = Ext.getCmp("PumpHistoryQueryStatTabPanel").getActiveTab().id;
			if(statTabActiveId=="PumpHistoryQueryStatGraphPanel_Id"){
				loadAndInitHistoryQueryCommStatusStat(true);
			}else if(statTabActiveId=="PumpHistoryQueryDeviceTypeStatGraphPanel_Id"){
				loadAndInitHistoryQueryDeviceTypeStat(true);
			}
			
			if(isNotVal(realtimeTurnToHisyorySign)){//如果是实时跳转
				Ext.getCmp("realtimeTurnToHisyorySign_Id").setValue('');
			}else{
				Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').setValue('');
				Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').setRawValue('');
			}
			var gridPanel = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id");
			if (isNotVal(gridPanel)) {
				gridPanel.getStore().load();
			}else{
				Ext.create('AP.store.historyQuery.PumpHistoryQueryWellListStore');
			}
		}else if(activeId=="PipelineHistoryQueryInfoPanel_Id"){
			var statTabActiveId = Ext.getCmp("PipelineHistoryQueryStatTabPanel").getActiveTab().id;
			if(statTabActiveId=="PipelineHistoryQueryStatGraphPanel_Id"){
				loadAndInitHistoryQueryCommStatusStat(true);
			}else if(statTabActiveId=="PipelineHistoryQueryDeviceTypeStatGraphPanel_Id"){
				loadAndInitHistoryQueryDeviceTypeStat(true);
			}
			if(isNotVal(realtimeTurnToHisyorySign)){//如果是实时跳转
				Ext.getCmp("realtimeTurnToHisyorySign_Id").setValue('');
			}else{
				Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setValue('');
				Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setRawValue('');
			}
			var gridPanel = Ext.getCmp("PipelineHistoryQueryDeviceListGridPanel_Id");
			if (isNotVal(gridPanel)) {
				gridPanel.getStore().load();
			}else{
				Ext.create('AP.store.historyQuery.PipelineHistoryQueryWellListStore');
			}
		}
	}else if(module_Code == "LogQuery"){
		var tabPanel = Ext.getCmp("LogQueryTabPanel");
		var activeId = tabPanel.getActiveTab().id;
		if(activeId=="DeviceOperationLogInfoPanel_Id"){
			var gridPanel = Ext.getCmp("DeviceOperationLogGridPanel_Id");
			if (isNotVal(gridPanel)) {
				gridPanel.getStore().load();
			}else{
				Ext.create('AP.store.log.DeviceOperationLogStore');
			}
		}else if(activeId=="SystemLogInfoPanel_Id"){
			var gridPanel = Ext.getCmp("SystemLogGridPanel_Id");
			if (isNotVal(gridPanel)) {
				gridPanel.getStore().load();
			}else{
				Ext.create('AP.store.log.SystemLogStore');
			}
		}
	}else if(module_Code == "AlarmQuery"){
		var tabPanel = Ext.getCmp("AlarmQueryTabPanel");
		var activeId = tabPanel.getActiveTab().id;
		if(activeId=="PumpAlarmQueryPanel_Id"){
			var secondTabPanel = Ext.getCmp("PumpAlarmQueryTabPanel");
			var secondActiveId = secondTabPanel.getActiveTab().id;
			if(secondActiveId=="PumpCommunicationAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PumpCommunicationAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PumpCommunicationAlarmOverviewStore');
				}
			}else if(secondActiveId=="PumpNumericValueAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PumpNumericValueAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PumpNumericValueAlarmOverviewStore');
				}
			}else if(secondActiveId=="PumpEnumValueAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PumpEnumValueAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PumpEnumValueAlarmOverviewStore');
				}
			}else if(secondActiveId=="PumpSwitchingValueAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PumpSwitchingValueAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PumpSwitchingValueAlarmOverviewStore');
				}
			}
		}else if(activeId=="PipelineAlarmQueryPanel_Id"){
			var secondTabPanel = Ext.getCmp("PipelineAlarmQueryTabPanel");
			var secondActiveId = secondTabPanel.getActiveTab().id;
			if(secondActiveId=="PipelineCommunicationAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PipelineCommunicationAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PipelineCommunicationAlarmOverviewStore');
				}
			}else if(secondActiveId=="PipelineNumericValueAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PipelineNumericValueAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PipelineNumericValueAlarmOverviewStore');
				}
			}else if(secondActiveId=="PipelineEnumValueAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PipelineEnumValueAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PipelineEnumValueAlarmOverviewStore');
				}
			}else if(secondActiveId=="PipelineSwitchingValueAlarmInfoPanel_Id"){
				var gridPanel = Ext.getCmp("PipelineSwitchingValueAlarmOverviewGridPanel_Id");
				if (isNotVal(gridPanel)) {
					gridPanel.getStore().load();
				}else{
					Ext.create('AP.store.alarmQuery.PipelineSwitchingValueAlarmOverviewStore');
				}
			}
		}
	}else if(module_Code == "AlarmSet"){
		getAlarmLevelColor();
	}else {
		return false;
	}
	
}
