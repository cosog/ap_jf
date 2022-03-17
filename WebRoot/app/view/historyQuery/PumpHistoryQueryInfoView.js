Ext.define("AP.view.historyQuery.PumpHistoryQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpHistoryQueryInfoView',
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
                    var wellName = Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
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
                    id: "HistoryQueryPumpDeviceListComb_Id",
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
                        	Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id").getStore().loadPage(1);
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
                        id:'PumpHistoryQueryInfoDeviceListPanel_Id',
                        border: false,
                        layout: 'fit',
                        tbar:[{
                            id: 'PumpHistoryQueryInfoDeviceListSelectRow_Id',
                            xtype: 'textfield',
                            value: -1,
                            hidden: true
                        },{
                            id: 'PumpHistoryQueryStatSelectCommStatus_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'PumpHistoryQueryStatSelectDeviceType_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'PumpHistoryQueryWellListColumnStr_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'PumpHistoryQueryDataColumnStr_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },pumpDeviceCombo,'-', {
                            xtype: 'button',
                            text: cosog.string.exportExcel,
                            iconCls: 'export',
//                            pressed: true,
                            hidden:false,
                            handler: function (v, o) {
                            	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                            	var deviceName=Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
                            	var commStatusStatValue=Ext.getCmp("PumpHistoryQueryStatSelectCommStatus_Id").getValue();
                    			var deviceTypeStatValue=Ext.getCmp("PumpHistoryQueryStatSelectDeviceType_Id").getValue();
                           	 	var deviceType=0;
                           	 	var fileName='泵设备历史数据设备列表';
                           	 	var title='泵设备历史数据设备列表';
                           	 	var columnStr=Ext.getCmp("PumpHistoryQueryWellListColumnStr_Id").getValue();
                           	 	exportHistoryQueryDeviceListExcel(orgId,deviceType,deviceName,commStatusStatValue,deviceTypeStatValue,fileName,title,columnStr);
                            }
                        }]
                    },{
                    	region: 'south',
                    	split: true,
                        collapsible: true,
                    	height: '40%',
                    	xtype: 'tabpanel',
                    	id:'PumpHistoryQueryStatTabPanel',
                    	activeTab: 0,
                        header: false,
                		tabPosition: 'top',
                		items: [{
                			title:'通信状态',
                			layout: 'fit',
                        	id:'PumpHistoryQueryStatGraphPanel_Id',
                        	html: '<div id="PumpHistoryQueryStatGraphPanelPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PumpHistoryQueryStatGraphPanelPieDiv_Id").highcharts() != undefined) {
                                        $("#PumpHistoryQueryStatGraphPanelPieDiv_Id").highcharts().setSize($("#PumpHistoryQueryStatGraphPanelPieDiv_Id").offsetWidth, $("#PumpHistoryQueryStatGraphPanelPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("PumpHistoryQueryStatGraphPanelPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'PumpHistoryQueryStatGraphPanelPieToolTip_Id',
                                        		target: 'PumpHistoryQueryStatGraphPanelPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		},{
                			title:'设备类型',
                			layout: 'fit',
                        	id:'PumpHistoryQueryDeviceTypeStatGraphPanel_Id',
                        	html: '<div id="PumpHistoryQueryDeviceTypeStatPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PumpHistoryQueryDeviceTypeStatPieDiv_Id").highcharts() != undefined) {
                                        $("#PumpHistoryQueryDeviceTypeStatPieDiv_Id").highcharts().setSize($("#PumpHistoryQueryDeviceTypeStatPieDiv_Id").offsetWidth, $("#PumpHistoryQueryDeviceTypeStatPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("PumpHistoryQueryDeviceTypeStatPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'PumpHistoryQueryDeviceTypeStatPieToolTip_Id',
                                        		target: 'PumpHistoryQueryDeviceTypeStatPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		}],
                		listeners: {
            				tabchange: function (tabPanel, newCard,oldCard, obj) {
            					if(newCard.id=="PumpHistoryQueryStatGraphPanel_Id"){
            						loadAndInitHistoryQueryCommStatusStat(true);
            					}else if(newCard.id=="PumpHistoryQueryDeviceTypeStatGraphPanel_Id"){
            						loadAndInitHistoryQueryDeviceTypeStat(true);
            					}
            					Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').setValue('');
            					Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').setRawValue('');
            					var gridPanel = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id");
            					if (isNotVal(gridPanel)) {
            						gridPanel.getStore().load();
            					}else{
            						Ext.create('AP.store.historyQuery.PumpHistoryQueryWellListStore');
            					}
            				}
            			}
                    }]
                }, {
                	region: 'east',
                    width: '68%',
                    title: '历史数据',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    layout: 'border',
                    border: false,
                    tbar:[{
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: '区间',
                        labelWidth: 30,
                        width: 130,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'PumpHistoryQueryStartDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
//                        		Ext.getCmp("PumpHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'PumpHistoryQueryStartTime_Hour_Id',
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
                    	id: 'PumpHistoryQueryStartTime_Minute_Id',
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
                    	id: 'PumpHistoryQueryStartTime_Second_Id',
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
                        id: 'PumpHistoryQueryEndDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
//                        		Ext.getCmp("PumpHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },{
                    	xtype: 'numberfield',
                    	id: 'PumpHistoryQueryEndTime_Hour_Id',
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
                    	id: 'PumpHistoryQueryEndTime_Minute_Id',
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
                    	id: 'PumpHistoryQueryEndTime_Second_Id',
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
                        	var startTime_Hour=Ext.getCmp('PumpHistoryQueryStartTime_Hour_Id').getValue();
                        	if(!r.test(startTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryStartTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Minute=Ext.getCmp('PumpHistoryQueryStartTime_Minute_Id').getValue();
                        	if(!r2.test(startTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryStartTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Second=Ext.getCmp('PumpHistoryQueryStartTime_Second_Id').getValue();
                        	if(!r2.test(startTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryStartTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var endTime_Hour=Ext.getCmp('PumpHistoryQueryEndTime_Hour_Id').getValue();
                        	if(!r.test(endTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryEndTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Minute=Ext.getCmp('PumpHistoryQueryEndTime_Minute_Id').getValue();
                        	if(!r2.test(endTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryEndTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Second=Ext.getCmp('PumpHistoryQueryEndTime_Second_Id').getValue();
                        	if(!r2.test(endTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryEndTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	
                        	var gridPanel = Ext.getCmp("PumpHistoryQueryDataGridPanel_Id");
                        	if (isNotVal(gridPanel)) {
                        		gridPanel.getStore().loadPage(1);
                        	}
                        }
                    },'-', {
                        xtype: 'button',
                        text: cosog.string.exportExcel,
                        iconCls: 'export',
//                        pressed: true,
                        hidden:false,
                        handler: function (v, o) {
                        	var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                        	var r2 = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                        	var startTime_Hour=Ext.getCmp('PumpHistoryQueryStartTime_Hour_Id').getValue();
                        	if(!r.test(startTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryStartTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Minute=Ext.getCmp('PumpHistoryQueryStartTime_Minute_Id').getValue();
                        	if(!r2.test(startTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryStartTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var startTime_Second=Ext.getCmp('PumpHistoryQueryStartTime_Second_Id').getValue();
                        	if(!r2.test(startTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryStartTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var endTime_Hour=Ext.getCmp('PumpHistoryQueryEndTime_Hour_Id').getValue();
                        	if(!r.test(endTime_Hour)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryEndTime_Hour_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Minute=Ext.getCmp('PumpHistoryQueryEndTime_Minute_Id').getValue();
                        	if(!r2.test(endTime_Minute)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryEndTime_Minute_Id').focus(true, 100);
                        		return;
                        	}
                        	var endTime_Second=Ext.getCmp('PumpHistoryQueryEndTime_Second_Id').getValue();
                        	if(!r2.test(endTime_Second)){
                        		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                        		Ext.getCmp('PumpHistoryQueryEndTime_Second_Id').focus(true, 100);
                        		return;
                        	}
                        	
                        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                        	var deviceName='';
                        	var deviceId=0;
                        	var selectRow= Ext.getCmp("PumpHistoryQueryInfoDeviceListSelectRow_Id").getValue();
                        	if(selectRow>=0){
                        		deviceName = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
                        		deviceId = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.id;
                        	}
                        	var startDate=Ext.getCmp('PumpHistoryQueryStartDate_Id').rawValue;
                            var endDate=Ext.getCmp('PumpHistoryQueryEndDate_Id').rawValue;
                            
                       	 	var deviceType=0;
                       	 	var fileName='泵设备'+deviceName+'历史数据';
                       	 	var title='泵设备'+deviceName+'历史数据';
                       	 	var columnStr=Ext.getCmp("PumpHistoryQueryDataColumnStr_Id").getValue();
                       	 	exportHistoryQueryDataExcel(orgId,deviceType,deviceId,deviceName,getDateAndTime(startDate,startTime_Hour,startTime_Minute,startTime_Second),getDateAndTime(endDate,endTime_Hour,endTime_Minute,endTime_Second),fileName,title,columnStr);
                        }
                    }],
                    items: [{
                    	region: 'center',
                    	title: '历史曲线',
                    	layout: 'fit',
                    	header: false,
                    	border: true,
                        html: '<div id="pumpHistoryQueryCurveDiv_Id" style="width:100%;height:100%;"></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                if ($("#pumpHistoryQueryCurveDiv_Id").highcharts() != undefined) {
                                    $("#pumpHistoryQueryCurveDiv_Id").highcharts().setSize($("#pumpHistoryQueryCurveDiv_Id").offsetWidth, $("#pumpHistoryQueryCurveDiv_Id").offsetHeight, true);
                                }
                            }
                        }
                    },{
                    	region: 'south',
                    	height: '50%',
                    	title: '历史数据',
                    	header: false,
                    	id: "PumpHistoryQueryDataInfoPanel_Id",
                    	layout: 'fit',
                    	border: true,
                    	split: true,
                        collapsible: true
                        
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});
