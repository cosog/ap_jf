Ext.define("AP.view.well.DeviceManagerInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.deviceManagerInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var RPCDeviceInfoPanel = Ext.create('AP.view.well.RPCDeviceInfoPanel');
        var PCPDeviceInfoPanel = Ext.create('AP.view.well.PCPDeviceInfoPanel');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"DeviceManagerTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '抽油机',
        				layout: "fit",
        				id:'RPCDeviceManagerPanel',
        				border: false,
        				items: [RPCDeviceInfoPanel]
        			},{
        				title: '螺杆泵',
        				id:'PCPDeviceManagerPanel',
        				layout: "fit",
        				border: false,
        				items: [PCPDeviceInfoPanel]
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
        					if(newCard.id=="RPCDeviceManagerPanel"){
        						CreateAndLoadRPCDeviceInfoTable();
        					}else if(newCard.id=="PCPDeviceManagerPanel"){
        						CreateAndLoadPCPDeviceInfoTable();
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }

});