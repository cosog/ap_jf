Ext.define("AP.view.dataMaintaining.CalculateMaintainingInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CalculateMaintainingInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var RPCCalculateMaintainingInfoView = Ext.create('AP.view.dataMaintaining.RPCCalculateMaintainingInfoView');
        var PCPCalculateMaintainingInfoView = Ext.create('AP.view.dataMaintaining.PCPCalculateMaintainingInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"CalculateMaintainingTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '抽油机',
        				id:'RPCCalculateMaintainingInfoPanel_Id',
        				items: [RPCCalculateMaintainingInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '螺杆泵',
        				id:'PCPCalculateMaintainingInfoPanel_Id',
        				items: [PCPCalculateMaintainingInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="RPCCalculateMaintainingInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("RPCCalculateMaintainingWellListGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.dataMaintaining.RPCCalculateMaintainingWellListStore');
        						}
        						
        						var bbar=Ext.getCmp("RPCFESDiagramCalculateMaintainingBbar");
        						if (isNotVal(bbar)) {
        							if(bbar.getStore().isEmptyStore){
        								var RPCCalculateMaintainingDataStore=Ext.create('AP.store.dataMaintaining.RPCCalculateMaintainingDataStore');
        								bbar.setStore(RPCCalculateMaintainingDataStore);
        							}else{
        								bbar.getStore().loadPage(1);
        							}
        						}else{
        							Ext.create('AP.store.dataMaintaining.RPCCalculateMaintainingDataStore');
        						}
        					}else if(newCard.id=="PCPCalculateMaintainingInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PCPCalculateMaintainingWellListGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.dataMaintaining.PCPCalculateMaintainingWellListStore');
        						}
        						var bbar=Ext.getCmp("PCPFESDiagramCalculateMaintainingBbar");
        						if (isNotVal(bbar)) {
        							if(bbar.getStore().isEmptyStore){
        								var PCPCalculateMaintainingDataStore=Ext.create('AP.store.dataMaintaining.PCPCalculateMaintainingDataStore');
        								bbar.setStore(PCPCalculateMaintainingDataStore);
        							}else{
        								bbar.getStore().loadPage(1);
        							}
        						}else{
        							Ext.create('AP.store.dataMaintaining.PCPCalculateMaintainingDataStore');
        						}
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});