Ext.define("AP.view.alarmQuery.AlarmQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.alarmQueryInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var PumpAlarmQueryInfoView = Ext.create('AP.view.alarmQuery.PumpAlarmQueryInfoView');
        var PipelineAlarmQueryInfoView = Ext.create('AP.view.alarmQuery.PipelineAlarmQueryInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"AlarmQueryTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '泵设备',
        				id:'PumpAlarmQueryPanel_Id',
        				items: [PumpAlarmQueryInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '管设备',
        				id:'PipelineAlarmQueryPanel_Id',
        				items: [PipelineAlarmQueryInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="PumpAlarmQueryPanel_Id"){
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
        					}else if(newCard.id=="PipelineAlarmQueryPanel_Id"){
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
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});

function createAlarmOverviewQueryColumn(columnInfo) {
    var myArr = columnInfo;
    var myColumns = "[";
    for (var i = 0; i < myArr.length; i++) {
        var attr = myArr[i];
        var width_ = "";
        var flex_ = "";
        var lock_ = "";
        var hidden_ = "";
        if (attr.hidden == true) {
            hidden_ = ",hidden:true";
        }
        if (isNotVal(attr.lock)) {
            //lock_ = ",locked:" + attr.lock;
        }
        if (isNotVal(attr.width)) {
            width_ = ",width:" + attr.width;
        }
        if (isNotVal(attr.flex)) {
        	flex_ = ",flex:" + attr.flex;
        }
        myColumns += "{text:'" + attr.header + "',lockable:true,align:'center' "+width_+flex_;
        if (attr.dataIndex.toUpperCase() == 'id'.toUpperCase()) {
            myColumns += ",xtype: 'rownumberer',sortable : false,locked:false";
        }
        else if (attr.dataIndex.toUpperCase()=='wellName'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
        }
        else if (attr.dataIndex.toUpperCase()=='commStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceCommStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase()=='runStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceRunStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase() == 'alarmtime'.toUpperCase() || attr.dataIndex.toUpperCase() == 'recoverytime'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceTimeFormat(value,o,p,e);}";
        } 
        else {
            myColumns += hidden_ + lock_ + ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
            //        	myColumns += hidden_ + lock_ + width_ + ",sortable : false,dataIndex:'" + attr.dataIndex + "'";
        }
        myColumns += "}";
        if (i < myArr.length - 1) {
            myColumns += ",";
        }
    }
    myColumns += "]";
    return myColumns;
};

function createAlarmQueryColumn(columnInfo) {
    var myArr = columnInfo;
    var myColumns = "[";
    for (var i = 0; i < myArr.length; i++) {
        var attr = myArr[i];
        var width_ = "";
        var flex_ = "";
        var lock_ = "";
        var hidden_ = "";
        if (attr.hidden == true) {
            hidden_ = ",hidden:true";
        }
        if (isNotVal(attr.lock)) {
            //lock_ = ",locked:" + attr.lock;
        }
        if (isNotVal(attr.width)) {
            width_ = ",width:" + attr.width;
        }
        if (isNotVal(attr.flex)) {
        	flex_ = ",flex:" + attr.flex;
        }
        myColumns += "{text:'" + attr.header + "',lockable:true,align:'center' "+width_+flex_+hidden_ + lock_;
        if (attr.dataIndex.toUpperCase() == 'id'.toUpperCase()) {
            myColumns += ",xtype: 'rownumberer',sortable : false,locked:false";
        }
        else if (attr.dataIndex.toUpperCase()=='wellName'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
        }
        else if (attr.dataIndex.toUpperCase() == 'alarmtime'.toUpperCase() || attr.dataIndex.toUpperCase() == 'recoverytime'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceTimeFormat(value,o,p,e);}";
        } 
        else {
            myColumns +=",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
        }
        myColumns += "}";
        if (i < myArr.length - 1) {
            myColumns += ",";
        }
    }
    myColumns += "]";
    return myColumns;
};

function exportAlarmOverviewDataExcel(orgId,deviceType,deviceName,alarmType,alarmLevel,isSendMessage,fileName,title,columnStr) {
    var url = context + '/alarmQueryController/exportAlarmOverviewData';
    var fields = "";
    var heads = "";
    var lockedheads = "";
    var unlockedheads = "";
    var lockedfields = "";
    var unlockedfields = "";
    var columns_ = Ext.JSON.decode(columnStr);
    
    fields = "id";
    heads = "序号";
    Ext.Array.each(columns_, function (name, index, countriesItSelf) {
        var column = columns_[index];
        if (index > 0 && !column.hidden) {
        	if(column.locked){
        		lockedfields += column.dataIndex + ",";
        		lockedheads += column.text + ",";
        	}else{
        		unlockedfields += column.dataIndex + ",";
        		unlockedheads += column.text + ",";
        	}
        }
    });
    if (isNotVal(lockedfields)) {
    	lockedfields = lockedfields.substring(0, lockedfields.length - 1);
    	lockedheads = lockedheads.substring(0, lockedheads.length - 1);
    	fields+=","+lockedfields;
    	heads+= "," + lockedheads;
    }
    if (isNotVal(unlockedfields)) {
    	unlockedfields = unlockedfields.substring(0, unlockedfields.length - 1);
    	unlockedheads = unlockedheads.substring(0, unlockedheads.length - 1);
    	fields+=","+unlockedfields;
    	heads+= "," + unlockedheads;
    }
    
    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) 
    + "&orgId=" + orgId 
    + "&deviceType=" + deviceType 
    + "&deviceName=" + URLencode(URLencode(deviceName))
    + "&alarmType=" + alarmType
    + "&alarmLevel=" + alarmLevel
    + "&isSendMessage=" + isSendMessage
    + "&fileName=" + URLencode(URLencode(fileName)) 
    + "&title=" + URLencode(URLencode(title));
    openExcelWindow(url + '?flag=true' + param);
};

function exportAlarmDataExcel(orgId,deviceType,deviceId,deviceName,startDate,endDate,alarmType,alarmLevel,isSendMessage,fileName,title,columnStr) {
    var url = context + '/alarmQueryController/exportAlarmData';
    var fields = "";
    var heads = "";
    var lockedheads = "";
    var unlockedheads = "";
    var lockedfields = "";
    var unlockedfields = "";
    var columns_ = Ext.JSON.decode(columnStr);
    
    fields = "id";
    heads = "序号";
    Ext.Array.each(columns_, function (name, index, countriesItSelf) {
        var column = columns_[index];
        if (index > 0 && !column.hidden) {
        	if(column.locked){
        		lockedfields += column.dataIndex + ",";
        		lockedheads += column.text + ",";
        	}else{
        		unlockedfields += column.dataIndex + ",";
        		unlockedheads += column.text + ",";
        	}
        }
    });
    if (isNotVal(lockedfields)) {
    	lockedfields = lockedfields.substring(0, lockedfields.length - 1);
    	lockedheads = lockedheads.substring(0, lockedheads.length - 1);
    	fields+=","+lockedfields;
    	heads+= "," + lockedheads;
    }
    if (isNotVal(unlockedfields)) {
    	unlockedfields = unlockedfields.substring(0, unlockedfields.length - 1);
    	unlockedheads = unlockedheads.substring(0, unlockedheads.length - 1);
    	fields+=","+unlockedfields;
    	heads+= "," + unlockedheads;
    }
    
    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) 
    + "&orgId=" + orgId 
    + "&deviceType=" + deviceType 
    + "&deviceId=" + deviceId 
    + "&deviceName=" + URLencode(URLencode(deviceName))
    + "&startDate=" + startDate
    + "&endDate=" + endDate
    + "&alarmType=" + alarmType
    + "&alarmLevel=" + alarmLevel
    + "&isSendMessage=" + isSendMessage
    + "&fileName=" + URLencode(URLencode(fileName)) 
    + "&title=" + URLencode(URLencode(title));
    openExcelWindow(url + '?flag=true' + param);
};