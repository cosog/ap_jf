Ext.define("AP.view.historyQuery.RPCHistoryQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rpcHistoryQueryInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var rpcCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('HistoryQueryRPCDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 0,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var rpcDeviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '井名',
                    id: "HistoryQueryRPCDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: rpcCombStore,
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
                            rpcDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("RPCHistoryQueryDeviceListGridPanel_Id").getStore().loadPage(1);
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
                    items:[{
                    	region: 'center',
                        title:'设备列表',
                        id:'RPCHistoryQueryInfoDeviceListPanel_Id',
                        border: false,
                        layout: 'fit',
                        tbar:[{
                            id: 'RPCHistoryQueryInfoDeviceListSelectRow_Id',
                            xtype: 'textfield',
                            value: -1,
                            hidden: true
                        },{
                            id: 'RPCHistoryQueryStatSelectCommStatus_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'RPCHistoryQueryStatSelectDeviceType_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'RPCHistoryQueryWellListColumnStr_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'RPCHistoryQueryDataColumnStr_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },rpcDeviceCombo,'-', {
                            xtype: 'button',
                            text: cosog.string.exportExcel,
                            iconCls: 'export',
//                            pressed: true,
                            hidden:false,
                            handler: function (v, o) {
                            	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                            	var deviceName=Ext.getCmp('HistoryQueryRPCDeviceListComb_Id').getValue();
                            	var commStatusStatValue=Ext.getCmp("RPCHistoryQueryStatSelectCommStatus_Id").getValue();
                    			var deviceTypeStatValue=Ext.getCmp("RPCHistoryQueryStatSelectDeviceType_Id").getValue();
                           	 	var deviceType=0;
                           	 	var fileName='抽油机历史数据设备列表';
                           	 	var title='抽油机历史数据设备列表';
                           	 	var columnStr=Ext.getCmp("RPCHistoryQueryWellListColumnStr_Id").getValue();
                           	 	exportHistoryQueryDeviceListExcel(orgId,deviceType,deviceName,commStatusStatValue,deviceTypeStatValue,fileName,title,columnStr);
                            }
                        }]
                    },{
                    	region: 'south',
                    	split: true,
                        collapsible: true,
                    	height: '40%',
                    	xtype: 'tabpanel',
                    	id:'RPCHistoryQueryStatTabPanel',
                    	activeTab: 0,
                        header: false,
                		tabPosition: 'top',
                		items: [{
                			title:'通信状态',
                			layout: 'fit',
                        	id:'RPCHistoryQueryStatGraphPanel_Id',
                        	html: '<div id="RPCHistoryQueryStatGraphPanelPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#RPCHistoryQueryStatGraphPanelPieDiv_Id").highcharts() != undefined) {
                                        $("#RPCHistoryQueryStatGraphPanelPieDiv_Id").highcharts().setSize($("#RPCHistoryQueryStatGraphPanelPieDiv_Id").offsetWidth, $("#RPCHistoryQueryStatGraphPanelPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("RPCHistoryQueryStatGraphPanelPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'RPCHistoryQueryStatGraphPanelPieToolTip_Id',
                                        		target: 'RPCHistoryQueryStatGraphPanelPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		},{
                			title:'设备类型',
                			layout: 'fit',
                        	id:'RPCHistoryQueryDeviceTypeStatGraphPanel_Id',
                        	html: '<div id="RPCHistoryQueryDeviceTypeStatPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#RPCHistoryQueryDeviceTypeStatPieDiv_Id").highcharts() != undefined) {
                                        $("#RPCHistoryQueryDeviceTypeStatPieDiv_Id").highcharts().setSize($("#RPCHistoryQueryDeviceTypeStatPieDiv_Id").offsetWidth, $("#RPCHistoryQueryDeviceTypeStatPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("RPCHistoryQueryDeviceTypeStatPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'RPCHistoryQueryDeviceTypeStatPieToolTip_Id',
                                        		target: 'RPCHistoryQueryDeviceTypeStatPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		}],
                		listeners: {
            				tabchange: function (tabPanel, newCard,oldCard, obj) {
            					if(newCard.id=="RPCHistoryQueryStatGraphPanel_Id"){
            						loadAndInitHistoryQueryCommStatusStat(true);
            					}else if(newCard.id=="RPCHistoryQueryDeviceTypeStatGraphPanel_Id"){
            						loadAndInitHistoryQueryDeviceTypeStat(true);
            					}
            					Ext.getCmp('HistoryQueryRPCDeviceListComb_Id').setValue('');
            					Ext.getCmp('HistoryQueryRPCDeviceListComb_Id').setRawValue('');
            					var gridPanel = Ext.getCmp("RPCHistoryQueryDeviceListGridPanel_Id");
            					if (isNotVal(gridPanel)) {
            						gridPanel.getStore().load();
            					}else{
            						Ext.create('AP.store.historyQuery.RPCHistoryQueryWellListStore');
            					}
            				}
            			}
                    }]
                }, {
                	region: 'east',
                    width: '68%',
                    xtype: 'tabpanel',
                    id:"RPCHistoryQueryTabPanel",
            		activeTab: 0,
            		border: false,
            		tabPosition: 'top',
            		tbar:[{
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: '区间',
                        labelWidth: 30,
                        width: 130,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'RPCHistoryQueryStartDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
//                        		Ext.getCmp("RPCHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'RPCHistoryQueryStartTime_Hour_Id',
                        fieldLabel: '时',
                        labelWidth: 15,
                        width: 60,
                        minValue: 0,
                        maxValue: 23,
                        value:'',
                        msgTarget: 'none',
                        regex:/^(2[0-3]|[0-1]?\d|\*|-|\/)$/,
                        listeners: {
                        	blur: function (field, event, eOpts) {
                        		var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                        		var flag=r.test(field.value);
                        		if(!flag){
                        			Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        			field.focus(true, 100);
                        		}
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'RPCHistoryQueryStartTime_Minute_Id',
                        fieldLabel: '分',
                        labelWidth: 15,
                        width: 60,
                        minValue: 0,
                        maxValue: 59,
                        value:'',
                        msgTarget: 'none',
                        regex:/^[1-5]?\d([\/-][1-5]?\d)?$/,
                        listeners: {
                        	blur: function (field, event, eOpts) {
                        		var r = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        		var flag=r.test(field.value);
                        		if(!flag){
                        			Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        			field.focus(true, 100);
                        		}
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'RPCHistoryQueryStartTime_Second_Id',
                        fieldLabel: '秒',
                        labelWidth: 15,
                        width: 60,
                        minValue: 0,
                        maxValue: 59,
                        value:'',
                        msgTarget: 'none',
                        regex:/^[1-5]?\d([\/-][1-5]?\d)?$/,
                        listeners: {
                        	blur: function (field, event, eOpts) {
                        		var r = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        		var flag=r.test(field.value);
                        		if(!flag){
                        			Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        			field.focus(true, 100);
                        		}
                            }
                        }
                    },{
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: '至',
                        labelWidth: 15,
                        width: 115,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'RPCHistoryQueryEndDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
//                        		Ext.getCmp("RPCHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'RPCHistoryQueryEndTime_Hour_Id',
                        fieldLabel: '时',
                        labelWidth: 15,
                        width: 60,
                        minValue: 0,
                        maxValue: 23,
                        value:'',
                        msgTarget: 'none',
                        regex:/^(2[0-3]|[0-1]?\d|\*|-|\/)$/,
                        listeners: {
                        	blur: function (field, event, eOpts) {
                        		var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                        		var flag=r.test(field.value);
                        		if(!flag){
                        			Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        			field.focus(true, 100);
                        		}
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'RPCHistoryQueryEndTime_Minute_Id',
                        fieldLabel: '分',
                        labelWidth: 15,
                        width: 60,
                        minValue: 0,
                        maxValue: 59,
                        value:'',
                        msgTarget: 'none',
                        regex:/^[1-5]?\d([\/-][1-5]?\d)?$/,
                        listeners: {
                        	blur: function (field, event, eOpts) {
                        		var r = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        		var flag=r.test(field.value);
                        		if(!flag){
                        			Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        			field.focus(true, 100);
                        		}
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'RPCHistoryQueryEndTime_Second_Id',
                        fieldLabel: '秒',
                        labelWidth: 15,
                        width: 60,
                        minValue: 0,
                        maxValue: 59,
                        value:'',
                        msgTarget: 'none',
                        regex:/^[1-5]?\d([\/-][1-5]?\d)?$/,
                        listeners: {
                        	blur: function (field, event, eOpts) {
                        		var r = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        		var flag=r.test(field.value);
                        		if(!flag){
                        			Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        			field.focus(true, 100);
                        		}
                            }
                        }
                    },'-',{
                        xtype: 'button',
                        text: cosog.string.search,
//                        pressed: true,
                        iconCls: 'search',
                        handler: function () {
                        	var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                        	var r2 = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        	var startTime_Hour=Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').getValue();
                        	if(!r.test(startTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Minute=Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').getValue();
                        	if(!r2.test(startTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Second=Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').getValue();
                        	if(!r2.test(startTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var endTime_Hour=Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').getValue();
                        	if(!r.test(endTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Minute=Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').getValue();
                        	if(!r2.test(endTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Second=Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').getValue();
                        	if(!r2.test(endTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	
                        	var tabPanel = Ext.getCmp("RPCHistoryQueryTabPanel");
            				var activeId = tabPanel.getActiveTab().id;
            				if(activeId=="RPCHistoryDataTabPanel"){
        						Ext.getCmp("RPCHistoryDataExportBtn_Id").show();
        						Ext.getCmp("RPCHistoryDiagramTileBtn_Id").hide();
        						Ext.getCmp("RPCHistoryDiagramOverlayBtn_Id").hide();
        						Ext.getCmp("SurfaceCardTotalCount_Id").hide();
        						var gridPanel = Ext.getCmp("RPCHistoryQueryDataGridPanel_Id");
                                if (isNotVal(gridPanel)) {
                                	gridPanel.getStore().loadPage(1);
                                }else{
                                	Ext.create("AP.store.historyQuery.RPCHistoryDataStore");
                                }
        					}else{
        						Ext.getCmp("RPCHistoryDataExportBtn_Id").hide();
        						Ext.getCmp("RPCHistoryDiagramTileBtn_Id").show();
        						Ext.getCmp("RPCHistoryDiagramOverlayBtn_Id").show();
        						Ext.getCmp("SurfaceCardTotalCount_Id").show();
        						loadSurfaceCardList(1);
        					}
                        }
                    }, {
                        xtype: 'button',
                        text: cosog.string.exportExcel,
                        iconCls: 'export',
//                        pressed: true,
                        id:'RPCHistoryDataExportBtn_Id',
                        hidden:false,
                        handler: function (v, o) {
                        	var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                        	var r2 = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        	var startTime_Hour=Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').getValue();
                        	if(!r.test(startTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Minute=Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').getValue();
                        	if(!r2.test(startTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Second=Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').getValue();
                        	if(!r2.test(startTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var endTime_Hour=Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').getValue();
                        	if(!r.test(endTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Minute=Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').getValue();
                        	if(!r2.test(endTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Second=Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').getValue();
                        	if(!r2.test(endTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                        	var deviceName='';
                        	var deviceId=0;
                        	var selectRow= Ext.getCmp("RPCHistoryQueryInfoDeviceListSelectRow_Id").getValue();
                        	if(selectRow>=0){
                        		deviceName = Ext.getCmp("RPCHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
                        		deviceId = Ext.getCmp("RPCHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.id;
                        	}
                        	var startDate=Ext.getCmp('RPCHistoryQueryStartDate_Id').rawValue;
                            var endDate=Ext.getCmp('RPCHistoryQueryEndDate_Id').rawValue;
                            
                       	 	var deviceType=0;
                       	 	var fileName='抽油机'+deviceName+'历史数据';
                       	 	var title='抽油机'+deviceName+'历史数据';
                       	 	var columnStr=Ext.getCmp("RPCHistoryQueryDataColumnStr_Id").getValue();
                       	 	exportHistoryQueryDataExcel(orgId,deviceType,deviceId,deviceName,getDateAndTime(startDate,startTime_Hour,startTime_Minute,startTime_Second),getDateAndTime(endDate,endTime_Hour,endTime_Minute,endTime_Second),fileName,title,columnStr);
                        }
                    }, {
                        xtype: 'button',
                        text: '图形平铺',
//                        iconCls: 'export',
                        id:'RPCHistoryDiagramTileBtn_Id',
                        hidden:true,
                        handler: function (v, o) {
                        	var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                        	var r2 = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        	var startTime_Hour=Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').getValue();
                        	if(!r.test(startTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Minute=Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').getValue();
                        	if(!r2.test(startTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Second=Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').getValue();
                        	if(!r2.test(startTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var endTime_Hour=Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').getValue();
                        	if(!r.test(endTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Minute=Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').getValue();
                        	if(!r2.test(endTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Second=Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').getValue();
                        	if(!r2.test(endTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	$("#surfaceCardContainer").html('');
                        	loadSurfaceCardList(1);
                        }
                    }, {
                        xtype: 'button',
                        text: '图形叠加',
//                        iconCls: 'export',
                        id:'RPCHistoryDiagramOverlayBtn_Id',
                        hidden:true,
                        handler: function (v, o) {
                        	var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                        	var r2 = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        	var startTime_Hour=Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').getValue();
                        	if(!r.test(startTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Minute=Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').getValue();
                        	if(!r2.test(startTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Second=Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').getValue();
                        	if(!r2.test(startTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var endTime_Hour=Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').getValue();
                        	if(!r.test(endTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Minute=Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').getValue();
                        	if(!r2.test(endTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Second=Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').getValue();
                        	if(!r2.test(endTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	$("#surfaceCardContainer").html('');
                        	var htmlResult='<div id="FSDiagramOverlayChartDiv_Id" style="width:100%;height:100%;"></div>';
                            $("#surfaceCardContainer").append(htmlResult);
                        }
                    }, '->', {
                        id: 'SurfaceCardTotalCount_Id',
                        xtype: 'component',
                        tpl: cosog.string.totalCount + ': {count}', // 总记录数
                        hidden:true,
                        style: 'margin-right:15px'
                    }, {
                        id: 'SurfaceCardTotalPages_Id', // 记录总页数
                        xtype: 'textfield',
                        value: '',
                        hidden: true
                    }],
            		items: [{
            			title: '历史数据',
            			id:"RPCHistoryDataTabPanel",
                        autoScroll: true,
                        split: true,
                        collapsible: true,
                        layout: 'border',
                        border: false,
                        items: [{
                        	region: 'center',
                        	title: '历史曲线',
                        	layout: 'fit',
                        	header: false,
                        	border: true,
                            html: '<div id="rpcHistoryQueryCurveDiv_Id" style="width:100%;height:100%;"></div>',
                            listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                    if ($("#rpcHistoryQueryCurveDiv_Id").highcharts() != undefined) {
                                        $("#rpcHistoryQueryCurveDiv_Id").highcharts().setSize($("#rpcHistoryQueryCurveDiv_Id").offsetWidth, $("#rpcHistoryQueryCurveDiv_Id").offsetHeight, true);
                                    }
                                }
                            }
                        },{
                        	region: 'south',
                        	height: '50%',
                        	title: '历史数据',
                        	header: false,
                        	id: "RPCHistoryQueryDataInfoPanel_Id",
                        	layout: 'fit',
                        	border: true,
                        	split: true,
                            collapsible: true
                            
                        }]
            		},{
            			title: '历史图形',
            			id:"RPCHistoryDiagramTabPanel",
            			border: false,
                        layout: "fit",
                        autoScroll: true,
                        html: '<div id="surfaceCardContainer" class="hbox"></div>',
                        listeners: {
                        	resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        		var GridPanel = Ext.getCmp("RPCHistoryQueryDeviceListGridPanel_Id");
                        		if(isNotVal(GridPanel)){
                        			loadSurfaceCardList(1);
                        		}
                            },
                            render: function (p, o, i, c) {
                                p.body.on('scroll', function () {
                                    var totalPages = Ext.getCmp("SurfaceCardTotalPages_Id").getValue(); // 总页数
                                    if (diagramPage < totalPages) {
                                        var RPCHistoryDiagramTabPanel = Ext.getCmp("RPCHistoryDiagramTabPanel");
                                        var hRatio = RPCHistoryDiagramTabPanel.getScrollY() / Ext.get("surfaceCardContainer").dom.clientHeight; // 滚动条所在高度与内容高度的比值
                                        if (hRatio > 0.5) {
                                            if (diagramPage < 2) {
                                                diagramPage++;
                                                loadSurfaceCardList(diagramPage);
                                            } else {
                                                var divCount = $("#surfaceCardContainer div ").size();
                                                var count = (diagramPage - 1) * defaultGraghSize * 3;
                                                if (divCount > count) {
                                                    diagramPage++;
                                                    loadSurfaceCardList(diagramPage);
                                                }
                                            }
                                        }
                                    }
                                }, this);
                            }
                        }
            		}],
            		listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					if(newCard.id=="RPCHistoryDataTabPanel"){
        						Ext.getCmp("RPCHistoryDataExportBtn_Id").show();
        						Ext.getCmp("RPCHistoryDiagramTileBtn_Id").hide();
        						Ext.getCmp("RPCHistoryDiagramOverlayBtn_Id").hide();
        						Ext.getCmp("SurfaceCardTotalCount_Id").hide();
        						var gridPanel = Ext.getCmp("RPCHistoryQueryDataGridPanel_Id");
                                if (isNotVal(gridPanel)) {
                                	gridPanel.getStore().loadPage(1);
                                }else{
                                	Ext.create("AP.store.historyQuery.RPCHistoryDataStore");
                                }
        					}else{
        						Ext.getCmp("RPCHistoryDataExportBtn_Id").hide();
        						Ext.getCmp("RPCHistoryDiagramTileBtn_Id").show();
        						Ext.getCmp("RPCHistoryDiagramOverlayBtn_Id").show();
        						Ext.getCmp("SurfaceCardTotalCount_Id").show();
        						loadSurfaceCardList(1);
        					}
        				}
            		}
                }]
            }]
        });
        me.callParent(arguments);
    }
});

loadSurfaceCardList = function (page) {
	diagramPage=page;
	var defaultGraghSize=60;
    Ext.getCmp("RPCHistoryDiagramTabPanel").mask(cosog.string.loading); // 数据加载中，请稍后
    var start = (page - 1) * defaultGraghSize;
    page=page;
    if(page==1){
    	$("#surfaceCardContainer").html(''); // 将html内容清空
    }
    var orgId = Ext.getCmp('leftOrg_Id').getValue();
	var deviceName='';
	var deviceId=0;
	var selectRow= Ext.getCmp("RPCHistoryQueryInfoDeviceListSelectRow_Id").getValue();
	if(selectRow>=0){
		deviceName = Ext.getCmp("RPCHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
		deviceId = Ext.getCmp("RPCHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.id;
	}
	var startDate=Ext.getCmp('RPCHistoryQueryStartDate_Id').rawValue;
	var startTime_Hour=Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').getValue();
	var startTime_Minute=Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').getValue();
	var startTime_Second=Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').getValue();

    var endDate=Ext.getCmp('RPCHistoryQueryEndDate_Id').rawValue;
    var endTime_Hour=Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').getValue();
	var endTime_Minute=Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').getValue();
	var endTime_Second=Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').getValue();
    Ext.Ajax.request({
        url: context + '/historyQueryController/querySurfaceCard',
        method: "POST",
        params: {
        	orgId: orgId,
    		deviceType:0,
    		deviceId:deviceId,
            deviceName:deviceName,
            startDate:getDateAndTime(startDate,startTime_Hour,startTime_Minute,startTime_Second),
            endDate:getDateAndTime(endDate,endTime_Hour,endTime_Minute,endTime_Second),
            limit: defaultGraghSize,
            start: start,
            page: page
        },
        success: function (response) {
        	if(page==1){
        		$("#surfaceCardContainer").html(''); // 将html内容清空
        	}
            Ext.getCmp("RPCHistoryDiagramTabPanel").unmask(cosog.string.loading); // 数据加载中，请稍后
            var get_rawData = Ext.decode(response.responseText); // 获取返回数据
            var gtlist = get_rawData.list; // 获取功图数据
            
            var totals = get_rawData.totals; // 总记录数
            var totalPages = get_rawData.totalPages; // 总页数
            Ext.getCmp("SurfaceCardTotalPages_Id").setValue(totalPages);
            updateTotalRecords(totals,"SurfaceCardTotalCount_Id");
            
            var startDate=Ext.getCmp('RPCHistoryQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date.split(' ')[0]);
            	Ext.getCmp('RPCHistoryQueryStartTime_Hour_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[0]);
            	Ext.getCmp('RPCHistoryQueryStartTime_Minute_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[1]);
            	Ext.getCmp('RPCHistoryQueryStartTime_Second_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[2]);
            }
            var endDate=Ext.getCmp('RPCHistoryQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date.split(' ')[0]);
            	Ext.getCmp('RPCHistoryQueryEndTime_Hour_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[0]);
            	Ext.getCmp('RPCHistoryQueryEndTime_Minute_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[1]);
            	Ext.getCmp('RPCHistoryQueryEndTime_Second_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[2]);
            }
            
            
            var RPCHistoryDiagramTabPanel = Ext.getCmp("RPCHistoryDiagramTabPanel"); // 获取功图列表panel信息
            var panelHeight = RPCHistoryDiagramTabPanel.getHeight(); // panel的高度
            var panelWidth = RPCHistoryDiagramTabPanel.getWidth(); // panel的宽度
            var scrollWidth = getScrollWidth(); // 滚动条的宽度
            var columnCount = parseInt( (panelWidth - scrollWidth) / graghMinWidth); // 有滚动条时一行显示的图形个数，graghMinWidth定义在CommUtils.js
            var gtWidth = (panelWidth - scrollWidth) / columnCount; // 有滚动条时图形宽度
            var gtHeight = gtWidth * 0.75; // 有滚动条时图形高度
            var gtWidth2 = gtWidth + 'px';
            var gtHeight2 = gtHeight + 'px';
            var htmlResult = '';
            var divId = '';

            // 功图列表，创建div
            Ext.Array.each(gtlist, function (name, index, countriesItSelf) {
                var gtId = gtlist[index].id;
                divId = 'gt' + gtId;
                htmlResult += '<div id=\"' + divId + '\"';
                htmlResult += ' style="height:'+ gtHeight2 +';width:'+ gtWidth2 +';"';
                htmlResult += '></div>';
            });
            $("#surfaceCardContainer").append(htmlResult);
            Ext.Array.each(gtlist, function (name, index, countriesItSelf) {
                var gtId = gtlist[index].id;
                divId = 'gt' + gtId;
                showSurfaceCard(gtlist[index], divId); // 调用画功图的函数，功图列表
            });
        },
        failure: function () {
            Ext.Msg.alert(cosog.string.ts, "【<font color=red>" + cosog.string.execption + " </font>】：" + cosog.string.contactadmin + "！");
        }
    });
};
