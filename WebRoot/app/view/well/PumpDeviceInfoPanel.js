Ext.define("AP.view.well.PumpDeviceInfoPanel", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpDeviceInfoPanel', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var DiaphragmPumpDeviceInfoPanel = Ext.create('AP.view.well.DiaphragmPumpDeviceInfoPanel');
        var ScrewPumpDeviceInfoPanel = Ext.create('AP.view.well.ScrewPumpDeviceInfoPanel');
        var LinearMotorPumpDeviceInfoPanel = Ext.create('AP.view.well.LinearMotorPumpDeviceInfoPanel');
        var ElectricSubmersiblePumpDeviceInfoPanel = Ext.create('AP.view.well.ElectricSubmersiblePumpDeviceInfoPanel');
        var JetPumpDeviceInfoPanel = Ext.create('AP.view.well.JetPumpDeviceInfoPanel');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"PumpDeviceManagerTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '隔膜泵',
        				layout: "fit",
        				id:'DiaphragmPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [DiaphragmPumpDeviceInfoPanel]
        			},{
        				title: '螺杆泵',
        				layout: "fit",
        				id:'ScrewPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [ScrewPumpDeviceInfoPanel]
        			},{
        				title: '直线电机泵',
        				layout: "fit",
        				id:'LinearMotorPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [LinearMotorPumpDeviceInfoPanel]
        			},{
        				title: '电潜泵',
        				layout: "fit",
        				id:'ElectricSubmersiblePumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [ElectricSubmersiblePumpDeviceInfoPanel]
        			},{
        				title: '射流泵',
        				layout: "fit",
        				id:'JetPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [JetPumpDeviceInfoPanel]
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
        					if(newCard.id=="DiaphragmPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadDiaphragmPumpDeviceInfoTable(true);
        					}else if(newCard.id=="ScrewPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadScrewPumpDeviceInfoTable(true);
        					}else if(newCard.id=="LinearMotorPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadLinearMotorPumpDeviceInfoTable(true);
        					}else if(newCard.id=="ElectricSubmersiblePumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadElectricSubmersiblePumpDeviceInfoTable(true);
        					}else if(newCard.id=="JetPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadJetPumpDeviceInfoTable(true);
        					}
        				}
        			}
            	}],
            	listeners: {
        			beforeclose: function ( panel, eOpts) {
        				//隔膜泵
        				if (diaphragmPumpDeviceInfoHandsontableHelper != null) {
                            if (diaphragmPumpDeviceInfoHandsontableHelper.hot != undefined) {
                                diaphragmPumpDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            diaphragmPumpDeviceInfoHandsontableHelper = null;
                        }
                        if (diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (diaphragmPumpAdditionalInfoHandsontableHelper != null) {
                            if (diaphragmPumpAdditionalInfoHandsontableHelper.hot != undefined) {
                            	diaphragmPumpAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            diaphragmPumpAdditionalInfoHandsontableHelper = null;
                        }
                        //螺杆泵
                        if (screwPumpDeviceInfoHandsontableHelper != null) {
                            if (screwPumpDeviceInfoHandsontableHelper.hot != undefined) {
                                screwPumpDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            screwPumpDeviceInfoHandsontableHelper = null;
                        }
                        if (screwPumpAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            screwPumpAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (screwPumpAdditionalInfoHandsontableHelper != null) {
                            if (screwPumpAdditionalInfoHandsontableHelper.hot != undefined) {
                            	screwPumpAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            screwPumpAdditionalInfoHandsontableHelper = null;
                        }
                        //直线电机泵
                        if (linearMotorPumpDeviceInfoHandsontableHelper != null) {
                            if (linearMotorPumpDeviceInfoHandsontableHelper.hot != undefined) {
                                linearMotorPumpDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            linearMotorPumpDeviceInfoHandsontableHelper = null;
                        }
                        if (linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (linearMotorPumpAdditionalInfoHandsontableHelper != null) {
                            if (linearMotorPumpAdditionalInfoHandsontableHelper.hot != undefined) {
                            	linearMotorPumpAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            linearMotorPumpAdditionalInfoHandsontableHelper = null;
                        }
                        //电潜泵
                        if (electricSubmersiblePumpDeviceInfoHandsontableHelper != null) {
                            if (electricSubmersiblePumpDeviceInfoHandsontableHelper.hot != undefined) {
                                electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            electricSubmersiblePumpDeviceInfoHandsontableHelper = null;
                        }
                        if (electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (electricSubmersiblePumpAdditionalInfoHandsontableHelper != null) {
                            if (electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot != undefined) {
                            	electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            electricSubmersiblePumpAdditionalInfoHandsontableHelper = null;
                        }
                        //射流泵
                        if (jetPumpDeviceInfoHandsontableHelper != null) {
                            if (jetPumpDeviceInfoHandsontableHelper.hot != undefined) {
                                jetPumpDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            jetPumpDeviceInfoHandsontableHelper = null;
                        }
                        if (jetPumpAuxiliaryDeviceInfoHandsontableHelper != null) {
                            if (jetPumpAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                            	jetPumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                            }
                            jetPumpAuxiliaryDeviceInfoHandsontableHelper = null;
                        }
                        if (jetPumpAdditionalInfoHandsontableHelper != null) {
                            if (jetPumpAdditionalInfoHandsontableHelper.hot != undefined) {
                            	jetPumpAdditionalInfoHandsontableHelper.hot.destroy();
                            }
                            jetPumpAdditionalInfoHandsontableHelper = null;
                        }
        			}
            	}
        });
        me.callParent(arguments);
    }
});