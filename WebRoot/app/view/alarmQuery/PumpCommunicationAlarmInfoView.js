Ext.define('AP.view.alarmQuery.PumpCommunicationAlarmInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PumpCommunicationAlarmInfoView',
    layout: "fit",
    id: "PumpCommunicationAlarmInfoView_Id",
    border: false,
    //forceFit : true,
    initComponent: function () {
        var deviceCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('PumpCommunicationAlarmDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 0,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var deviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '井名',
                    id: "PumpCommunicationAlarmDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: deviceCombStore,
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
                            deviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("PumpCommunicationAlarmOverviewGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
    	Ext.apply(this, {
    		layout: 'border',
    		tbar: [{
                id: 'PumpCommunicationAlarmOverviewColumnStr_Id',
                xtype: 'textfield',
                value: '',
                hidden: true
            },{
                id: 'PumpCommunicationAlarmDetailsColumnStr_Id',
                xtype: 'textfield',
                value: '',
                hidden: true
            },deviceCombo,'-',{
            	xtype : "combobox",
				fieldLabel : '是否发送短信',
				id : 'PumpCommunicationAlarmIsSendMessageComb_Id',
				hidden: true,
				labelWidth: 80,
                width: 190,
                labelAlign: 'left',
				triggerAction : 'all',
				displayField: "boxval",
                valueField: "boxkey",
				selectOnFocus : true,
			    forceSelection : true,
			    value:'',
			    allowBlank: false,
				editable : false,
				emptyText: cosog.string.all,
                blankText: cosog.string.all,
				store : new Ext.data.SimpleStore({
							fields : ['boxkey', 'boxval'],
							data : [['', '选择全部'],[1, '是'],[0, '否']]
						}),
				queryMode : 'local',
				listeners : {
					select:function(v,o){
						Ext.getCmp("PumpCommunicationAlarmOverviewGridPanel_Id").getStore().loadPage(1);
					}
				}
            },'-',{
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: '区间',
                labelWidth: 30,
                width: 125,
                format: 'Y-m-d ',
                value: '',
                id: 'PumpCommunicationAlarmQueryStartDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                    }
                }
            },{
            	xtype: 'numberfield',
            	id: 'PumpCommunicationAlarmQueryStartTime_Hour_Id',
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
            	id: 'PumpCommunicationAlarmQueryStartTime_Minute_Id',
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
            	id: 'PumpCommunicationAlarmQueryStartTime_Second_Id',
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
                width: 110,
                format: 'Y-m-d ',
                value: '',
                id: 'PumpCommunicationAlarmQueryEndDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                    }
                }
            },{
            	xtype: 'numberfield',
            	id: 'PumpCommunicationAlarmQueryEndTime_Hour_Id',
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
            	id: 'PumpCommunicationAlarmQueryEndTime_Minute_Id',
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
            	id: 'PumpCommunicationAlarmQueryEndTime_Second_Id',
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
                iconCls: 'search',
                handler: function () {
                	var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                	var r2 = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                	var startTime_Hour=Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Hour_Id').getValue();
                	if(!r.test(startTime_Hour)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Hour_Id').focus(true, 100);
                		return;
                	}
                	var startTime_Minute=Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Minute_Id').getValue();
                	if(!r2.test(startTime_Minute)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Minute_Id').focus(true, 100);
                		return;
                	}
                	var startTime_Second=Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Second_Id').getValue();
                	if(!r2.test(startTime_Second)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Second_Id').focus(true, 100);
                		return;
                	}
                	
                	var endTime_Hour=Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Hour_Id').getValue();
                	if(!r.test(endTime_Hour)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Hour_Id').focus(true, 100);
                		return;
                	}
                	var endTime_Minute=Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Minute_Id').getValue();
                	if(!r2.test(endTime_Minute)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Minute_Id').focus(true, 100);
                		return;
                	}
                	var endTime_Second=Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Second_Id').getValue();
                	if(!r2.test(endTime_Second)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Second_Id').focus(true, 100);
                		return;
                	}
                	var gridPanel = Ext.getCmp("PumpCommunicationAlarmGridPanel_Id");
                	if (isNotVal(gridPanel)) {
                		gridPanel.getStore().loadPage(1);
                	}
                }
            },'-',{
                xtype: 'button',
                text: '导出设备列表',
                iconCls: 'export',
                hidden:false,
                handler: function (v, o) {
                	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                	var deviceType=0;
                	var deviceName=Ext.getCmp('PumpCommunicationAlarmDeviceListComb_Id').getValue();
                	var isSendMessage=Ext.getCmp('PumpCommunicationAlarmIsSendMessageComb_Id').getValue();
                	var alarmType=0;
               	 	var alarmLevel='';
               	 	
               	 	var fileName='泵设备通信报警设备列表';
               	 	var title='泵设备通信报警设备列表';
               	 	var columnStr=Ext.getCmp("PumpCommunicationAlarmOverviewColumnStr_Id").getValue();
               	 	exportAlarmOverviewDataExcel(orgId,deviceType,deviceName,alarmType,alarmLevel,isSendMessage,fileName,title,columnStr);
                }
            },'-', {
                xtype: 'button',
                text: '导出报警数据',
                iconCls: 'export',
                hidden:false,
                handler: function (v, o) {
                	var r = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
                	var r2 = /^[1-5]?\d([\/-][1-5]?\d)?$/;
                	var startTime_Hour=Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Hour_Id').getValue();
                	if(!r.test(startTime_Hour)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Hour_Id').focus(true, 100);
                		return;
                	}
                	var startTime_Minute=Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Minute_Id').getValue();
                	if(!r2.test(startTime_Minute)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Minute_Id').focus(true, 100);
                		return;
                	}
                	var startTime_Second=Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Second_Id').getValue();
                	if(!r2.test(startTime_Second)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryStartTime_Second_Id').focus(true, 100);
                		return;
                	}
                	
                	var endTime_Hour=Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Hour_Id').getValue();
                	if(!r.test(endTime_Hour)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>小时为0~23之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Hour_Id').focus(true, 100);
                		return;
                	}
                	var endTime_Minute=Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Minute_Id').getValue();
                	if(!r2.test(endTime_Minute)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>分钟为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Minute_Id').focus(true, 100);
                		return;
                	}
                	var endTime_Second=Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Second_Id').getValue();
                	if(!r2.test(endTime_Second)){
                		Ext.Msg.alert('消息', "<font color=red>数值无效！</font>秒为0~59之间的整数。");
                		Ext.getCmp('PumpCommunicationAlarmQueryEndTime_Second_Id').focus(true, 100);
                		return;
                	}
                	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                	var deviceType=0;
                	var deviceName=Ext.getCmp("PumpCommunicationAlarmOverviewGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
                	var deviceId=  Ext.getCmp("PumpCommunicationAlarmOverviewGridPanel_Id").getSelectionModel().getSelection()[0].data.id;
                	var isSendMessage=Ext.getCmp('PumpCommunicationAlarmIsSendMessageComb_Id').getValue();
                	var startDate=Ext.getCmp('PumpCommunicationAlarmQueryStartDate_Id').rawValue;
                    var endDate=Ext.getCmp('PumpCommunicationAlarmQueryEndDate_Id').rawValue;
               	 	var alarmType=0;
               	 	var alarmLevel='';
               	 	
               	 	var fileName='泵设备'+deviceName+'通信报警数据';
               	 	var title='泵设备'+deviceName+'通信报警数据';
               	 	var columnStr=Ext.getCmp("PumpCommunicationAlarmDetailsColumnStr_Id").getValue();
               	 	exportAlarmDataExcel(orgId,deviceType,deviceId,deviceName,getDateAndTime(startDate,startTime_Hour,startTime_Minute,startTime_Second),getDateAndTime(endDate,endTime_Hour,endTime_Minute,endTime_Second),alarmType,alarmLevel,isSendMessage,fileName,title,columnStr);
                }
            }],
            items: [{
    			region: 'center',
    			title: '设备列表',
    			id: 'PumpCommunicationAlarmOverviewPanel_Id',
    			autoScroll: true,
                scrollable: true,
    			layout: 'fit'
    		},{
    			region: 'east',
    			title: '报警数据',
    			id: 'PumpCommunicationAlarmDetailsPanel_Id',
                width: '70%',
                autoScroll: true,
                split: true,
                collapsible: true,
                layout: 'fit'
    		}]
        });
        this.callParent(arguments);
    }
});