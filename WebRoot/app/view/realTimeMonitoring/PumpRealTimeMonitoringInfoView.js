var pumpDeviceRealTimeMonitoringDataHandsontableHelper=null;
Ext.define("AP.view.realTimeMonitoring.PumpRealTimeMonitoringInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpRealTimeMonitoringInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var pumpCombStore = new Ext.data.JsonStore({
        	pageSize:defaultWellComboxSize,
            fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
            proxy: {
            	url: context + '/wellInformationManagerController/loadWellComboxList',
                type: "ajax",
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (store, options) {
                	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellName = Ext.getCmp('RealTimeMonitoringPumpDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 0,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var pumpDeviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '井名',
                    id: "RealTimeMonitoringPumpDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: pumpCombStore,
                    autoSelect: false,
                    editable: true,
                    triggerAction: 'all',
                    displayField: "boxval",
                    valueField: "boxkey",
                    pageSize:comboxPagingStatus,
                    minChars:0,
                    emptyText: cosog.string.all,
                    blankText: cosog.string.all,
                    listeners: {
                        expand: function (sm, selections) {
                            pumpDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
        
        Ext.applyIf(me, {
            items: [{
                border: false,
                layout: 'border',
                items: [{
                    region: 'center',
                    layout: 'border',
                    id:'PumpRealTimeMonitoringCenterPanel_Id',
                    items:[{
                    	region: 'center',
                    	title:'设备概览',
                    	id:'PumpRealTimeMonitoringInfoDeviceListPanel_Id',
                        border: false,
                        layout: 'fit',
                        tbar:[{
                        	id: 'PumpRealTimeMonitoringInfoDeviceListSelectRow_Id',
                        	xtype: 'textfield',
                            value: -1,
                            hidden: true
                         },{
                        	id: 'PumpRealTimeMonitoringStatSelectCommStatus_Id',
                        	xtype: 'textfield',
                            value: '',
                            hidden: true
                         },{
                        	id: 'PumpRealTimeMonitoringStatSelectDeviceType_Id',
                        	xtype: 'textfield',
                            value: '',
                            hidden: true
                         },{
                             id: 'PumpRealTimeMonitoringColumnStr_Id',
                             xtype: 'textfield',
                             value: '',
                             hidden: true
                         },pumpDeviceCombo,'-', {
                             xtype: 'button',
                             text: cosog.string.exportExcel,
                             iconCls: 'export',
                             hidden:false,
                             handler: function (v, o) {
                            	 var orgId = Ext.getCmp('leftOrg_Id').getValue();
                            	 var deviceName=Ext.getCmp('RealTimeMonitoringPumpDeviceListComb_Id').getValue();
                            	 var commStatusStatValue=Ext.getCmp("PumpRealTimeMonitoringStatSelectCommStatus_Id").getValue();
                             	 var deviceTypeStatValue=Ext.getCmp("PumpRealTimeMonitoringStatSelectDeviceType_Id").getValue();
                            	 var deviceType=0;
                            	 var fileName='泵设备实时监控数据';
                            	 var title='泵设备实时监控数据';
                            	 var columnStr=Ext.getCmp("PumpRealTimeMonitoringColumnStr_Id").getValue();
                            	 exportRealTimeMonitoringDataExcel(orgId,deviceType,deviceName,commStatusStatValue,deviceTypeStatValue,fileName,title,columnStr);
                             }
                         }, '->', {
                         	xtype: 'button',
                            text:'查看历史',
                            tooltip:'点击按钮或者双击表格，查看历史数据',
//                            pressed: true,
                            handler: function (v, o) {
                            	var selectRow= Ext.getCmp("PumpRealTimeMonitoringInfoDeviceListSelectRow_Id").getValue();
                        		var gridPanel=Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id");
                        		if(isNotVal(gridPanel)){
                        			var record=gridPanel.getStore().getAt(selectRow);
                        			gotoDeviceHistory(record.data.wellName,0);
                        		}
                            }
                        }]
                    },{
                    	region: 'south',
                    	split: true,
                        collapsible: true,
                    	height: '40%',
                    	xtype: 'tabpanel',
                    	id:'PumpRealTimeMonitoringStatTabPanel',
                    	activeTab: 0,
                        header: false,
                		tabPosition: 'top',
                		items: [{
                			title:'通信状态',
                			layout: 'fit',
                        	id:'PumpRealTimeMonitoringStatGraphPanel_Id',
                        	html: '<div id="PumpRealTimeMonitoringStatGraphPanelPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PumpRealTimeMonitoringStatGraphPanelPieDiv_Id").highcharts() != undefined) {
                                        $("#PumpRealTimeMonitoringStatGraphPanelPieDiv_Id").highcharts().setSize($("#PumpRealTimeMonitoringStatGraphPanelPieDiv_Id").offsetWidth, $("#PumpRealTimeMonitoringStatGraphPanelPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("PumpRealTimeMonitoringStatGraphPanelPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'PumpRealTimeMonitoringStatGraphPanelPieToolTip_Id',
                                        		target: 'PumpRealTimeMonitoringStatGraphPanelPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		},{
                			title:'设备类型',
                			layout: 'fit',
                        	id:'PumpRealTimeMonitoringDeviceTypeStatGraphPanel_Id',
                        	html: '<div id="PumpRealTimeMonitoringDeviceTypeStatPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PumpRealTimeMonitoringDeviceTypeStatPieDiv_Id").highcharts() != undefined) {
                                        $("#PumpRealTimeMonitoringDeviceTypeStatPieDiv_Id").highcharts().setSize($("#PumpRealTimeMonitoringDeviceTypeStatPieDiv_Id").offsetWidth, $("#PumpRealTimeMonitoringDeviceTypeStatPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("PumpRealTimeMonitoringDeviceTypeStatPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'PumpRealTimeMonitoringDeviceTypeStatPieToolTip_Id',
                                        		target: 'PumpRealTimeMonitoringDeviceTypeStatPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		}],
                		listeners: {
            				tabchange: function (tabPanel, newCard,oldCard, obj) {
            					if(newCard.id=="PumpRealTimeMonitoringStatGraphPanel_Id"){
            						loadAndInitCommStatusStat(true);
            					}else if(newCard.id=="PumpRealTimeMonitoringDeviceTypeStatGraphPanel_Id"){
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
            				}
            			}
                    }]
                }, {
                	region: 'east',
                    width: '78%',
                    id:'PumpRealTimeMonitoringEastPanel_Id',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    layout: 'border',
                    header: false,
                    items:[{
                        region: 'center',
                        xtype: 'tabpanel',
                		id:"PumpRealTimeMonitoringCurveAndTableTabPanel",
                		activeTab: 0,
                		border: false,
                		tabPosition: 'top',
                		items: [{
                			title:'实时曲线',
                			id:"PumpRealTimeMonitoringCurveTabPanel_Id",
                			layout: 'border',
                			items: [{
                				region: 'center',
                				layout: 'fit',
                    			autoScroll: true,
                    			border: false,
                    			id:"pumpRealTimeMonitoringCurveContent",
                    			html: '<div id="pumpRealTimeMonitoringCurveContainer" class="hbox" style="width:100%;height:100%;"></div>',
                    			listeners: {
                                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                    	var container=$('#pumpRealTimeMonitoringCurveContainer');
            		        			if(container!=undefined && container.length>0){
            		        				var containerChildren=container[0].children;
            		        				if(containerChildren!=undefined && containerChildren.length>0){
            		        					for(var i=0;i<containerChildren.length;i++){
            		        						var chart = $("#"+containerChildren[i].id).highcharts(); 
            		        						if(isNotVal(chart)){
            		        							chart.setSize($("#"+containerChildren[i].id).offsetWidth, $("#"+containerChildren[i].id).offsetHeight, true);
            		        						}
            		        					}
            		        				}
            		        			}
                                    }
                                }
                			}]
                		},{
                			title:'实时数据',
                			id:"PumpRealTimeMonitoringTableTabPanel_Id",
                			layout: 'border',
                            border: false,
                            items: [{
                            	region: 'center',
                            	header: false,
                            	id: "PumpRealTimeMonitoringInfoDataPanel_Id",
                            	layout: 'fit',
                            	html:'<div class="PumpRealTimeMonitoringInfoDataTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="PumpRealTimeMonitoringInfoDataTableInfoDiv_id"></div></div>',
                            	listeners: {
                                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                    	if(pumpDeviceRealTimeMonitoringDataHandsontableHelper!=null && pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot!=undefined){
                                    		pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot.refreshDimensions();
                                    	}
                                    }
                                }
                            }]
                		}],
                		listeners: {
            				tabchange: function (tabPanel, newCard,oldCard, obj) {
            					var selectRow= Ext.getCmp("PumpRealTimeMonitoringInfoDeviceListSelectRow_Id").getValue();
            					var gridPanel=Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id");
            					if(newCard.id=="PumpRealTimeMonitoringCurveTabPanel_Id"){
            						if(isNotVal(gridPanel)&&selectRow>=0){
            							deviceRealtimeMonitoringCurve(0);
            						}
            					}else if(newCard.id=="PumpRealTimeMonitoringTableTabPanel_Id"){
                            		if(isNotVal(gridPanel)&&selectRow>=0){
                            			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            			CreatePumpDeviceRealTimeMonitoringDataTable(selectedItem.data.id,selectedItem.data.wellName,0)
                            		}
            					}
            				}
                		}
                    },{
                    	region: 'east',
                    	width: '20%',
                    	xtype: 'tabpanel',
                    	id:"PumpRealTimeMonitoringRightTabPanel",
                		activeTab: 0,
                		border: false,
                		split: true,
                        collapsible: true,
                        header: false,
                		tabPosition: 'top',
                		items: [{
                			title:'设备信息',
                			layout: 'border',
                			items:[{
                				region: 'center',
                				id: 'PumpRealTimeMonitoringRightDeviceInfoPanel',
                                border: false,
                                layout: 'fit',
                                autoScroll: true,
                                scrollable: true
                			},{
                				region: 'south',
                				id: 'PumpRealTimeMonitoringRightAuxiliaryDeviceInfoPanel',
                				title:'辅件设备',
                				height: '50%',
                				border: false,
                                layout: 'fit',
                                split: true,
                                collapsible: true,
                                autoScroll: true,
                                scrollable: true
                			}]
                		},{
                			title:'设备控制',
                			id: 'PumpRealTimeMonitoringRightControlPanel',
                            border: false,
                            layout: 'fit',
                            autoScroll: true,
                            scrollable: true
                		}]
                    }],
                    listeners: {
                        beforeCollapse: function (panel, eOpts) {
                        	var container=$('#pumpRealTimeMonitoringCurveContainer');
		        			if(container!=undefined && container.length>0){
		        				var containerChildren=container[0].children;
		        				if(containerChildren!=undefined && containerChildren.length>0){
		        					for(var i=0;i<containerChildren.length;i++){
		        						$("#"+containerChildren[i].id).hide(); 
		        					}
		        				}
		        			}
                        },
                        expand: function (panel, eOpts) {
                        	var container=$('#pumpRealTimeMonitoringCurveContainer');
		        			if(container!=undefined && container.length>0){
		        				var containerChildren=container[0].children;
		        				if(containerChildren!=undefined && containerChildren.length>0){
		        					for(var i=0;i<containerChildren.length;i++){
		        						$("#"+containerChildren[i].id).show(); 
		        					}
		        				}
		        			}
                        }
                    }
                }]
            }]
        });
        me.callParent(arguments);
    }
});

function CreatePumpDeviceRealTimeMonitoringDataTable(deviceId,deviceName,deviceType){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/realTimeMonitoringController/getDeviceRealTimeMonitoringData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(pumpDeviceRealTimeMonitoringDataHandsontableHelper==null || pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot==undefined){
				pumpDeviceRealTimeMonitoringDataHandsontableHelper = PumpDeviceRealTimeMonitoringDataHandsontableHelper.createNew("PumpRealTimeMonitoringInfoDataTableInfoDiv_id");
				var colHeaders="['名称','变量','名称','变量','名称','变量']";
				var columns="[" 
						+"{data:'name1'}," 
						+"{data:'value1'}," 
						+"{data:'name2'},"
						+"{data:'value2'}," 
						+"{data:'name3'}," 
						+"{data:'value3'}" 
						+"]";
				pumpDeviceRealTimeMonitoringDataHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				pumpDeviceRealTimeMonitoringDataHandsontableHelper.columns=Ext.JSON.decode(columns);
				pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=result.CellInfo;
				if(result.totalRoot.length==0){
					pumpDeviceRealTimeMonitoringDataHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					pumpDeviceRealTimeMonitoringDataHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=result.CellInfo;
				pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot.loadData(result.totalRoot);
			}
			//添加单元格属性
			for(var i=0;i<pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo.length;i++){
				var row=pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].row;
				var col=pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].col;
				var column=pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].column;
				var columnDataType=pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].columnDataType;
				pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot.setCellMeta(row,col,'columnDataType',columnDataType);
			}
			
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceId:deviceId,
			deviceName:deviceName,
			deviceType:deviceType
        }
	});
};

var PumpDeviceRealTimeMonitoringDataHandsontableHelper = {
		createNew: function (divid) {
	        var pumpDeviceRealTimeMonitoringDataHandsontableHelper = {};
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.divid = divid;
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.validresult=true;//数据校验
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.colHeaders=[];
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.columns=[];
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=[];
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.addFirstAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
//	        	var BackgroundColor='#'+AlarmShowStyle.FirstLevel.BackgroundColor;
//	        	var Color='#'+AlarmShowStyle.FirstLevel.Color;
	        	var Color='#'+AlarmShowStyle.FirstLevel.BackgroundColor;
	        	var Opacity=AlarmShowStyle.FirstLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
//	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	             td.style.fontWeight = 'bold';
	             td.style.fontFamily = 'SimHei';
	             if(row%2==1){
	            	 td.style.backgroundColor = '#E6E6E6';
	             }
	        }
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.addSecondAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
//	        	var BackgroundColor='#'+AlarmShowStyle.SecondLevel.BackgroundColor;
//	        	var Color='#'+AlarmShowStyle.SecondLevel.Color;
	        	var Color='#'+AlarmShowStyle.SecondLevel.BackgroundColor;
	        	var Opacity=AlarmShowStyle.SecondLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
//	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	             td.style.fontWeight = 'bold';
	             td.style.fontFamily = 'SimHei';
	             if(row%2==1){
	            	 td.style.backgroundColor = '#E6E6E6';
	             }
	             
	        }
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.addThirdAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
//	        	var BackgroundColor='#'+AlarmShowStyle.ThirdLevel.BackgroundColor;
//	        	var Color='#'+AlarmShowStyle.ThirdLevel.Color;
	        	var Color='#'+AlarmShowStyle.ThirdLevel.BackgroundColor;
	        	var Opacity=AlarmShowStyle.ThirdLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
//	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	             td.style.fontWeight = 'bold';
	             td.style.fontFamily = 'SimHei';
	             if(row%2==1){
	            	 td.style.backgroundColor = '#E6E6E6';
	             }
	        }
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = '#E6E6E6';
	        }
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.addItenmNameColStyle = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.fontWeight = 'bold';
	        }
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.addSizeBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	        	td.style.fontWeight = 'bold';
		        td.style.fontSize = '20px';
		        td.style.fontFamily = 'SimSun';
		        td.style.height = '40px';
	        }
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.addCellStyle = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	            if (row ==0) {
	            	Handsontable.renderers.TextRenderer.apply(this, arguments);
//		        	td.style.fontWeight = 'bold';
			        td.style.fontSize = '20px';
			        td.style.fontFamily = 'SimSun';
			        td.style.height = '40px';
	            }
	            if (row%2==1&&row>0) {
	            	td.style.backgroundColor = '#f5f5f5';
                }
	            if (col%2==0) {
//	            	td.style.fontWeight = 'bold';
                }else{
                	td.style.fontFamily = 'SimHei';
                }
	            for(var i=0;i<pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo.length;i++){
                	if(pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel>=0){
                		var row2=pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].row;
        				var col2=pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].col*2+1;
        				if(row==row2 && col==col2 ){
        					if(pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel>0){
        						td.style.fontWeight = 'bold';
       			             	td.style.fontFamily = 'SimHei';
        					}
   			             	if(pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==0){
   			             		if(AlarmShowStyle.Data.Normal.Opacity!=0){
   			             			td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.Normal.BackgroundColor,AlarmShowStyle.Data.Normal.Opacity);
   			             		}
   			             		td.style.color='#'+AlarmShowStyle.Data.Normal.Color;
   			             	}else if(pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==100){
        						if(AlarmShowStyle.Data.FirstLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.FirstLevel.BackgroundColor,AlarmShowStyle.Data.FirstLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Data.FirstLevel.Color;
        					}else if(pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==200){
        						if(AlarmShowStyle.Data.SecondLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.SecondLevel.BackgroundColor,AlarmShowStyle.Data.SecondLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Data.SecondLevel.Color;
        					}else if(pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==300){
        						if(AlarmShowStyle.Data.ThirdLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.ThirdLevel.BackgroundColor,AlarmShowStyle.Data.ThirdLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Data.ThirdLevel.Color;
        					}
        				}
                	}
    			}
	        }
	        
	        pumpDeviceRealTimeMonitoringDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pumpDeviceRealTimeMonitoringDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pumpDeviceRealTimeMonitoringDataHandsontableHelper.divid);
	        	pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	        		data: data,
	        		colWidths: [30,20,30,20,30,20],
	                columns:pumpDeviceRealTimeMonitoringDataHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                rowHeaders: false,//显示行头
	                colHeaders: false,
	                rowHeights: [40],
	                mergeCells: [{
                        "row": 0,
                        "col": 0,
                        "rowspan": 1,
                        "colspan": 6
                    }],
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
	                    cellProperties.renderer = pumpDeviceRealTimeMonitoringDataHandsontableHelper.addCellStyle;
	                    
	                    cellProperties.readOnly = true;
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                	
	                }
	        	});
	        }
	        return pumpDeviceRealTimeMonitoringDataHandsontableHelper;
	    }
};
function pumpRealTimeMonitoringCurve(item){
	var gridPanel=Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id")
	var deviceName="";
	if(isNotVal(gridPanel)){
		deviceName=gridPanel.getSelectionModel().getSelection()[0].data.wellName;
		
		Ext.Ajax.request({
			method:'POST',
			url:context + '/realTimeMonitoringController/getRealTimeCurveData',
			success:function(response) {
				var result =  Ext.JSON.decode(response.responseText);
			    var data = result.list;
			    var tickInterval = 1;
			    tickInterval = Math.floor(data.length / 2) + 1;
			    if(tickInterval<100){
			    	tickInterval=100;
			    }
//			    tickInterval=1000;
//			    if(){
//			    	
//			    }
			    var title = result.deviceName  + result.item + "曲线";
			    var xTitle='采集时间';
			    var yTitle=result.item;
			    if(isNotVal(result.unit)){
			    	yTitle+='('+result.unit+')';
			    }
			    var legendName = [result.item];
			    var series = "[";
			    for (var i = 0; i < legendName.length; i++) {
			        series += "{\"name\":\"" + legendName[i] + "\",";
			        series += "\"data\":[";
			        for (var j = 0; j < data.length; j++) {
			            if (i == 0) {
			            	series += "[" + Date.parse(data[j].acqTime.replace(/-/g, '/')) + "," + data[j].value + "]";
			            }else if(i == 1){
			            	series += "[" + Date.parse(data[j].acqTime.replace(/-/g, '/')) + "," + data[j].value2 + "]";
			            }
			            if (j != data.length - 1) {
			                series += ",";
			            }
			        }
			        series += "]}";
			        if (i != legendName.length - 1) {
			            series += ",";
			        }
			    }
			    series += "]";
			    
			    var ser = Ext.JSON.decode(series);
			    var color = ['#800000', // 红
			       '#008C00', // 绿
			       '#000000', // 黑
			       '#0000FF', // 蓝
			       '#F4BD82', // 黄
			       '#FF00FF' // 紫
			     ];
			    initTimeAndDataCurveChartFn(ser, tickInterval, "pumpRealTimeMonitoringCurveDiv_Id", title, '', xTitle, yTitle, color,false,'%H:%M:%S');
			},
			failure:function(){
				Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
			},
			params: {
				deviceName:deviceName,
				item:item,
				deviceType:0
	        }
		});
	}
}