var pipelineDeviceRealTimeMonitoringDataHandsontableHelper=null;
Ext.define("AP.view.realTimeMonitoring.PipelineRealTimeMonitoringInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineRealTimeMonitoringInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var pipelineCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 1,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var pipelineDeviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '井名',
                    id: "RealTimeMonitoringPipelineDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: pipelineCombStore,
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
                            pipelineDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id").getStore().loadPage(1);
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
                    id:'PipelineRealTimeMonitoringCenterPanel_Id',
                    items:[{
                    	region: 'center',
                    	title:'设备概览',
                    	id:'PipelineRealTimeMonitoringInfoDeviceListPanel_Id',
                        border: false,
                        layout: 'fit',
                        tbar:[{
                        	id: 'PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id',
                        	xtype: 'textfield',
                            value: -1,
                            hidden: true
                         },{
                        	id: 'PipelineRealTimeMonitoringStatSelectCommStatus_Id',
                        	xtype: 'textfield',
                            value: '',
                            hidden: true
                         },{
                        	id: 'PipelineRealTimeMonitoringStatSelectDeviceType_Id',
                        	xtype: 'textfield',
                            value: '',
                            hidden: true
                         },{
                             id: 'PipelineRealTimeMonitoringColumnStr_Id',
                             xtype: 'textfield',
                             value: '',
                             hidden: true
                         },pipelineDeviceCombo,'-', {
                             xtype: 'button',
                             text: cosog.string.exportExcel,
                             iconCls: 'export',
                             hidden:false,
                             handler: function (v, o) {
                            	 var orgId = Ext.getCmp('leftOrg_Id').getValue();
                            	 var deviceName=Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').getValue();
                            	 var commStatusStatValue=Ext.getCmp("PipelineRealTimeMonitoringStatSelectCommStatus_Id").getValue();
                             	 var deviceTypeStatValue=Ext.getCmp("PipelineRealTimeMonitoringStatSelectDeviceType_Id").getValue();
                            	 var deviceType=1;
                            	 var fileName='管设备实时监控数据';
                            	 var title='管设备实时监控数据';
                            	 var columnStr=Ext.getCmp("PipelineRealTimeMonitoringColumnStr_Id").getValue();
                            	 exportRealTimeMonitoringDataExcel(orgId,deviceType,deviceName,commStatusStatValue,deviceTypeStatValue,fileName,title,columnStr);
                             }
                         }, '->', {
                         	xtype: 'button',
                            text:'查看历史',
                            tooltip:'点击按钮或者双击表格，查看历史数据',
//                            pressed: true,
                            handler: function (v, o) {
                            	var selectRow= Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id").getValue();
                        		var gridPanel=Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
                        		if(isNotVal(gridPanel)){
                        			var record=gridPanel.getStore().getAt(selectRow);
                        			gotoDeviceHistory(record.data.wellName,1);
                        		}
                            }
                        }]
                    },{
                    	region: 'south',
                    	split: true,
                        collapsible: true,
                    	height: '40%',
                    	xtype: 'tabpanel',
                    	id:'PipelineRealTimeMonitoringStatTabPanel',
                    	activeTab: 0,
                        header: false,
                		tabPosition: 'top',
                		items: [{
                			title:'通信状态',
                			layout: 'fit',
                        	id:'PipelineRealTimeMonitoringStatGraphPanel_Id',
                        	html: '<div id="PipelineRealTimeMonitoringStatGraphPanelPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PipelineRealTimeMonitoringStatGraphPanelPieDiv_Id").highcharts() != undefined) {
                                        $("#PipelineRealTimeMonitoringStatGraphPanelPieDiv_Id").highcharts().setSize($("#PipelineRealTimeMonitoringStatGraphPanelPieDiv_Id").offsetWidth, $("#PipelineRealTimeMonitoringStatGraphPanelPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	Ext.create('Ext.tip.ToolTip', {
                                            target: 'PipelineRealTimeMonitoringStatGraphPanelPieDiv_Id',
                                            html: '点击饼图不同区域或标签，查看相应统计数据'
                                        });
                                    }
                                }
                            }
                		},{
                			title:'设备类型',
                			layout: 'fit',
                        	id:'PipelineRealTimeMonitoringDeviceTypeStatGraphPanel_Id',
                        	html: '<div id="PipelineRealTimeMonitoringDeviceTypeStatPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PipelineRealTimeMonitoringDeviceTypeStatPieDiv_Id").highcharts() != undefined) {
                                        $("#PipelineRealTimeMonitoringDeviceTypeStatPieDiv_Id").highcharts().setSize($("#PipelineRealTimeMonitoringDeviceTypeStatPieDiv_Id").offsetWidth, $("#PipelineRealTimeMonitoringDeviceTypeStatPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	Ext.create('Ext.tip.ToolTip', {
                                            target: 'PipelineRealTimeMonitoringDeviceTypeStatPieDiv_Id',
                                            html: '点击饼图不同区域或标签，查看相应统计数据'
                                        });
                                    }
                                }
                            }
                		}],
                		listeners: {
            				tabchange: function (tabPanel, newCard,oldCard, obj) {
            					if(newCard.id=="PipelineRealTimeMonitoringStatGraphPanel_Id"){
            						loadAndInitCommStatusStat(true);
            					}else if(newCard.id=="PipelineRealTimeMonitoringDeviceTypeStatGraphPanel_Id"){
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
            			}
                    }]
                }, {
                	region: 'east',
                    width: '78%',
                    id:'PipelineRealTimeMonitoringEastPanel_Id',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    layout: 'border',
                    header: false,
                    items:[{
                        region: 'center',
                        xtype: 'tabpanel',
                		id:"PipelineRealTimeMonitoringCurveAndTableTabPanel",
                		activeTab: 0,
                		border: false,
                		tabPosition: 'top',
                		items: [{
                			title:'实时曲线',
                			id:"PipelineRealTimeMonitoringCurveTabPanel_Id",
                			layout: 'border',
                			items: [{
                				region: 'center',
                				layout: 'fit',
                    			autoScroll: true,
                    			border: false,
                    			id:"pipelineRealTimeMonitoringCurveContent",
                    			html: '<div id="pipelineRealTimeMonitoringCurveContainer" class="hbox" style="width:100%;height:100%;"></div>',
                    			listeners: {
                                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                    	var container=$('#pipelineRealTimeMonitoringCurveContainer');
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
//                			layout: 'fit',
//                			html: '<div id="pipelineRealTimeMonitoringCurveDiv_Id" style="width:100%;height:100%;"></div>',
//                            listeners: {
//                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
//                                    if ($("#pipelineRealTimeMonitoringCurveDiv_Id").highcharts() != undefined) {
//                                        $("#pipelineRealTimeMonitoringCurveDiv_Id").highcharts().setSize($("#pipelineRealTimeMonitoringCurveDiv_Id").offsetWidth, $("#pipelineRealTimeMonitoringCurveDiv_Id").offsetHeight, true);
//                                    }
//                                }
//                            }
                		},{
                			title:'实时数据',
                			id:"PipelineRealTimeMonitoringTableTabPanel_Id",
                			layout: 'border',
                            border: false,
                            items: [{
                            	region: 'center',
//                            	title: '实时数据',
                            	header: false,
                            	id: "PipelineRealTimeMonitoringInfoDataPanel_Id",
                            	layout: 'fit',
                            	html:'<div class="PipelineRealTimeMonitoringInfoDataTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="PipelineRealTimeMonitoringInfoDataTableInfoDiv_id"></div></div>',
                                listeners: {
                                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                    	if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper!=null && pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot!=undefined){
                                    		pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.refreshDimensions();
                                    	}
                                    }
                                }
                            }
//                            ,{
//                            	region: 'south',
//                            	height: '40%',
//                            	title: '实时曲线',
//                            	layout: 'fit',
//                            	border: true,
//                            	split: true,
//                                collapsible: true,
//                                tbar:[{
//                                    id: 'PipelineRealTimeMonitoringSelectedCurve_Id',//选择的统计项的值
//                                    xtype: 'textfield',
//                                    value: '',
//                                    hidden: true
//                                }],
//                                html: '<div id="pipelineRealTimeMonitoringCurveDiv_Id" style="width:100%;height:100%;"></div>',
//                                listeners: {
//                                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
//                                        if ($("#pipelineRealTimeMonitoringCurveDiv_Id").highcharts() != undefined) {
//                                            $("#pipelineRealTimeMonitoringCurveDiv_Id").highcharts().setSize($("#pipelineRealTimeMonitoringCurveDiv_Id").offsetWidth, $("#pipelineRealTimeMonitoringCurveDiv_Id").offsetHeight, true);
//                                        }
//                                    }
//                                }
//                            }
                            ]
                		}],
                		listeners: {
            				tabchange: function (tabPanel, newCard,oldCard, obj) {
            					var selectRow= Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id").getValue();
            					var gridPanel=Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
            					if(newCard.id=="PipelineRealTimeMonitoringCurveTabPanel_Id"){
            						if(isNotVal(gridPanel)&&selectRow>=0){
            							deviceRealtimeMonitoringCurve(1);
            						}
            					}else if(newCard.id=="PipelineRealTimeMonitoringTableTabPanel_Id"){
                            		if(isNotVal(gridPanel)&&selectRow>=0){
                            			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            			CreatePipelineDeviceRealTimeMonitoringDataTable(selectedItem.data.id,selectedItem.data.wellName,1)
                            		}
            					}
            				}
                		}
                    },{
                    	region: 'east',
                    	width: '20%',
                    	xtype: 'tabpanel',
                    	id:"PipelineRealTimeMonitoringRightTabPanel",
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
                				id: 'PipelineRealTimeMonitoringRightDeviceInfoPanel',
                                border: false,
                                layout: 'fit',
                                autoScroll: true,
                                scrollable: true
                			},{
                				region: 'south',
                				id: 'PipelineRealTimeMonitoringRightAuxiliaryDeviceInfoPanel',
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
                			id: 'PipelineRealTimeMonitoringRightControlPanel',
                            border: false,
                            layout: 'fit',
                            autoScroll: true,
                            scrollable: true
                		}]
                    }],
                    listeners: {
                        beforeCollapse: function (panel, eOpts) {
                        	var container=$('#pipelineRealTimeMonitoringCurveContainer');
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
                        	var container=$('#pipelineRealTimeMonitoringCurveContainer');
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

function CreatePipelineDeviceRealTimeMonitoringDataTable(deviceId,deviceName,deviceType){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/realTimeMonitoringController/getDeviceRealTimeMonitoringData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper==null || pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot==undefined){
				pipelineDeviceRealTimeMonitoringDataHandsontableHelper = PipelineDeviceRealTimeMonitoringDataHandsontableHelper.createNew("PipelineRealTimeMonitoringInfoDataTableInfoDiv_id");
				var colHeaders="['名称','变量','名称','变量','名称','变量']";
				var columns="[" 
						+"{data:'name1'}," 
						+"{data:'value1'}," 
						+"{data:'name2'},"
						+"{data:'value2'}," 
						+"{data:'name3'}," 
						+"{data:'value3'}" 
						+"]";
				pipelineDeviceRealTimeMonitoringDataHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				pipelineDeviceRealTimeMonitoringDataHandsontableHelper.columns=Ext.JSON.decode(columns);
				pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=result.CellInfo;
				if(result.totalRoot.length==0){
					pipelineDeviceRealTimeMonitoringDataHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					pipelineDeviceRealTimeMonitoringDataHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=result.CellInfo;
				pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.loadData(result.totalRoot);
			}
			//添加单元格属性
			for(var i=0;i<pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo.length;i++){
				var row=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].row;
				var col=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].col;
				var column=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].column;
				var columnDataType=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].columnDataType;
				pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.setCellMeta(row,col,'columnDataType',columnDataType);
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

var PipelineDeviceRealTimeMonitoringDataHandsontableHelper = {
		createNew: function (divid) {
	        var pipelineDeviceRealTimeMonitoringDataHandsontableHelper = {};
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.divid = divid;
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.validresult=true;//数据校验
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.colHeaders=[];
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.columns=[];
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=[];
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addFirstAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
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
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addSecondAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
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
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addThirdAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
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
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = '#E6E6E6';
	        }
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addItenmNameColStyle = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.fontWeight = 'bold';
	        }
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addSizeBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	        	td.style.fontWeight = 'bold';
		        td.style.fontSize = '20px';
		        td.style.fontFamily = 'SimSun';
		        td.style.height = '40px';
	        }
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addCellStyle = function (instance, td, row, col, prop, value, cellProperties) {
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
	            for(var i=0;i<pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo.length;i++){
                	if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel>=0){
                		var row2=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].row;
        				var col2=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].col*2+1;
        				if(row==row2 && col==col2 ){
        					if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel>0){
        						td.style.fontWeight = 'bold';
       			             	td.style.fontFamily = 'SimHei';
        					}
   			             	if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==0){
			             		if(AlarmShowStyle.Data.Normal.Opacity!=0){
			             			td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.Normal.BackgroundColor,AlarmShowStyle.Data.Normal.Opacity);
			             		}
			             		td.style.color='#'+AlarmShowStyle.Data.Normal.Color;
			             	}else if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==100){
        						if(AlarmShowStyle.Data.FirstLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.FirstLevel.BackgroundColor,AlarmShowStyle.Data.FirstLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Data.FirstLevel.Color;
        					}else if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==200){
        						if(AlarmShowStyle.Data.SecondLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.SecondLevel.BackgroundColor,AlarmShowStyle.Data.SecondLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Data.SecondLevel.Color;
        					}else if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].alarmLevel==300){
        						if(AlarmShowStyle.Data.ThirdLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Data.ThirdLevel.BackgroundColor,AlarmShowStyle.Data.ThirdLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Data.ThirdLevel.Color;
        					}
        				}
                	}
    			}
	        }
	        
	        pipelineDeviceRealTimeMonitoringDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pipelineDeviceRealTimeMonitoringDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pipelineDeviceRealTimeMonitoringDataHandsontableHelper.divid);
	        	pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	        		data: data,
	        		colWidths: [30,20,30,20,30,20],
	                columns:pipelineDeviceRealTimeMonitoringDataHandsontableHelper.columns,
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
	                    cellProperties.renderer = pipelineDeviceRealTimeMonitoringDataHandsontableHelper.addCellStyle;
	                    
	                    cellProperties.readOnly = true;
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	if(row>0||column>0){
//	                		var relRow=row;
//	                		var relColumn=column;
//	                		if(column%2==1){
//	                			relColumn=column-1;
//	                		}else if(column%2==0){
//	                			
//	                		}
//		                	
//		                	var item=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.getDataAtCell(relRow,relColumn);
//		                	var selectecCell=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.getCell(relRow,relColumn);
//		                	var columnDataType='';
//		                	var resolutionMode=0;
//		                	for(var i=0;i<pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo.length;i++){
//		        				if(relRow==pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].row && relColumn==pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].col*2){
//		        					item=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].columnName;
//		        					columnDataType=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].columnDataType;
//		        					resolutionMode=pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo[i].resolutionMode;
//		        					break;
//		        				}
//		        			}
//		                	
//		                	if(isNotVal(item)&&resolutionMode==2){
//		                		Ext.getCmp("PipelineRealTimeMonitoringSelectedCurve_Id").setValue(item);
//			                	pipelineRealTimeMonitoringCurve(item);
//		                	}
//	                	}
	                }
	        	});
	        }
	        return pipelineDeviceRealTimeMonitoringDataHandsontableHelper;
	    }
};
function pipelineRealTimeMonitoringCurve(item){
	var gridPanel=Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id")
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
			    initTimeAndDataCurveChartFn(ser, tickInterval, "pipelineRealTimeMonitoringCurveDiv_Id", title, '', xTitle, yTitle, color,false,'%H:%M:%S');
			},
			failure:function(){
				Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
			},
			params: {
				deviceName:deviceName,
				item:item,
				deviceType:1
	        }
		});
	}
}