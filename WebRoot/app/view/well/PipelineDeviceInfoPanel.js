Ext.define("AP.view.well.PipelineDeviceInfoPanel", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineDeviceInfoPanel', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var HeatingPipelineDeviceInfoPanel = Ext.create('AP.view.well.HeatingPipelineDeviceInfoPanel');
        var WaterGatheringPipelineDeviceInfoPanel = Ext.create('AP.view.well.WaterGatheringPipelineDeviceInfoPanel');
        var GatheringPipelineDeviceInfoPanel = Ext.create('AP.view.well.GatheringPipelineDeviceInfoPanel');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"PipelineDeviceManagerTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '加热管',
        				layout: "fit",
        				id:'HeatingPipelineDeviceInfoTabPanel_Id',
        				border: false,
        				items: [HeatingPipelineDeviceInfoPanel]
        			},{
        				title: '采水管',
        				layout: "fit",
        				id:'WaterGatheringPipelineDeviceInfoTabPanel_Id',
        				border: false,
        				items: [WaterGatheringPipelineDeviceInfoPanel]
        			},{
        				title: '集输管',
        				layout: "fit",
        				id:'GatheringPipelineDeviceInfoTabPanel_Id',
        				border: false,
        				items: [GatheringPipelineDeviceInfoPanel]
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
        					if(newCard.id=="HeatingPipelineDeviceInfoTabPanel_Id"){
        						CreateAndLoadHeatingPipelineDeviceInfoTable(true);
        					}else if(newCard.id=="WaterGatheringPipelineDeviceInfoTabPanel_Id"){
        						CreateAndLoadWaterGatheringPipelineDeviceInfoTable(true);
        					}else if(newCard.id=="GatheringPipelineDeviceInfoTabPanel_Id"){
        						CreateAndLoadGatheringPipelineDeviceInfoTable(true);
        					}
        				}
        			}
            	}],
            	listeners: {
        			beforeclose: function ( panel, eOpts) {
        				//加热管
        				if (heatingPipelineDeviceInfoHandsontableHelper != null) {
                            if (heatingPipelineDeviceInfoHandsontableHelper.hot != undefined) {
                                heatingPipelineDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            heatingPipelineDeviceInfoHandsontableHelper = null;
                        }
                        if (heatingPipelineAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            heatingPipelineAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (heatingPipelineAdditionalInfoHandsontableHelper != null) {
                            if (heatingPipelineAdditionalInfoHandsontableHelper.hot != undefined) {
                            	heatingPipelineAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            heatingPipelineAdditionalInfoHandsontableHelper = null;
                        }
                        //采水管
                        if (waterGatheringPipelineDeviceInfoHandsontableHelper != null) {
                            if (waterGatheringPipelineDeviceInfoHandsontableHelper.hot != undefined) {
                                waterGatheringPipelineDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            waterGatheringPipelineDeviceInfoHandsontableHelper = null;
                        }
                        if (waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (waterGatheringPipelineAdditionalInfoHandsontableHelper != null) {
                            if (waterGatheringPipelineAdditionalInfoHandsontableHelper.hot != undefined) {
                            	waterGatheringPipelineAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            waterGatheringPipelineAdditionalInfoHandsontableHelper = null;
                        }
                        //集输管
                        if (gatheringPipelineDeviceInfoHandsontableHelper != null) {
                            if (gatheringPipelineDeviceInfoHandsontableHelper.hot != undefined) {
                                gatheringPipelineDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            gatheringPipelineDeviceInfoHandsontableHelper = null;
                        }
                        if (gatheringPipelineAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (gatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	gatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            gatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (gatheringPipelineAdditionalInfoHandsontableHelper != null) {
                            if (gatheringPipelineAdditionalInfoHandsontableHelper.hot != undefined) {
                            	gatheringPipelineAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            gatheringPipelineAdditionalInfoHandsontableHelper = null;
                        }
        			}
            	}
        });
        me.callParent(arguments);
    }
});