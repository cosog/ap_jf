Ext.define("AP.view.well.DeviceManagerInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.deviceManagerInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var PumpDeviceInfoPanel = Ext.create('AP.view.well.PumpDeviceInfoPanel');
        var PipelineDeviceInfoPanel = Ext.create('AP.view.well.PipelineDeviceInfoPanel');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"DeviceManagerTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '泵设备',
        				layout: "fit",
        				id:'PumpDeviceManagerPanel',
        				border: false,
        				items: [PumpDeviceInfoPanel]
        			},{
        				title: '管设备',
        				id:'PipelineDeviceManagerPanel',
        				layout: "fit",
        				border: false,
        				items: [PipelineDeviceInfoPanel]
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
        					if(newCard.id=="PumpDeviceManagerPanel"){
        						CreateAndLoadPumpDeviceInfoTable();
        					}else if(newCard.id=="PipelineDeviceManagerPanel"){
        						CreateAndLoadPipelineDeviceInfoTable();
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }

});