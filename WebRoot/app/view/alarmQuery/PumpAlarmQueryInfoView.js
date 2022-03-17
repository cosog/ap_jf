Ext.define("AP.view.alarmQuery.PumpAlarmQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpAlarmQueryInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var CommunicationAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpCommunicationAlarmInfoView');
        var NumericValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpNumericValueAlarmInfoView');
        var EnumValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpEnumValueAlarmInfoView');
        var SwitchingValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpSwitchingValueAlarmInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"PumpAlarmQueryTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'left',
        		items: [{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">通信状态报警</div>',
        				id:'PumpCommunicationAlarmInfoPanel_Id',
        				items: [CommunicationAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">数值量报警</div>',
        				id:'PumpNumericValueAlarmInfoPanel_Id',
        				items: [NumericValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">枚举量报警</div>',
        				id:'PumpEnumValueAlarmInfoPanel_Id',
        				items: [EnumValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">开关量报警</div>',
        				id:'PumpSwitchingValueAlarmInfoPanel_Id',
        				items: [SwitchingValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="PumpCommunicationAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpCommunicationAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpCommunicationAlarmOverviewStore');
        						}
        					}else if(newCard.id=="PumpNumericValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpNumericValueAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpNumericValueAlarmOverviewStore');
        						}
        					}else if(newCard.id=="PumpEnumValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpEnumValueAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpEnumValueAlarmOverviewStore');
        						}
        					}else if(newCard.id=="PumpSwitchingValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpSwitchingValueAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpSwitchingValueAlarmOverviewStore');
        						}
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});