Ext.define('AP.store.realTimeMonitoring.PumpRealTimeMonitoringWellListStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pumpRealTimeMonitoringWellListStore',
    fields: ['id','commStatus','commStatusName','wellName'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/realTimeMonitoringController/getDeviceRealTimeOverview',
        actionMethods: {
            read: 'POST'
        },
    reader: {
            type: 'json',
            rootProperty: 'totalRoot',
            totalProperty: 'totalCount',
            keepRawData: true
        }
    },
    listeners: {
        load: function (store, record, f, op, o) {
            //获得列表数
            var get_rawData = store.proxy.reader.rawData;
            var arrColumns = get_rawData.columns;
            var column = createRealTimeMonitoringColumn(arrColumns);
            Ext.getCmp("PumpRealTimeMonitoringColumnStr_Id").setValue(column);
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '共 {2}条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PumpRealTimeMonitoringListGridPanel_Id",
                    border: false,
                    autoLoad: true,
                    bbar: bbar,
                    columnLines: true,
                    forceFit: false,
//                    stripeRows: true,
                    viewConfig: {
                    	emptyText: "<div class='con_div_' id='div_dataactiveid'><" + cosog.string.nodata + "></div>"
                    },
                    store: store,
                    columns: newColumns,
                    listeners: {
                    	selectionchange: function (view, selected, o) {
                    	},
                    	select: function(grid, record, index, eOpts) {
                    		Ext.getCmp("PumpRealTimeMonitoringInfoDeviceListSelectRow_Id").setValue(index);
                    		var deviceName=record.data.wellName;
                    		var deviceId=record.data.id;
                    		var deviceType=0;
                    		var tabPanel = Ext.getCmp("PumpRealTimeMonitoringCurveAndTableTabPanel");
                    		var activeId = tabPanel.getActiveTab().id;
                    		if(activeId=="PumpRealTimeMonitoringCurveTabPanel_Id"){
                    			deviceRealtimeMonitoringCurve(0);
                    		}else if(activeId=="PumpRealTimeMonitoringTableTabPanel_Id"){
                        		CreatePumpDeviceRealTimeMonitoringDataTable(deviceId,deviceName,deviceType);
                    		}
                    		Ext.create('AP.store.realTimeMonitoring.PumpRealTimeMonitoringControlAndInfoStore');
                    	},
                    	itemdblclick: function (view,record,item,index,e,eOpts) {
                    		gotoDeviceHistory(record.data.wellName,0);
                    	}
                    }
                });
                var PumpRealTimeMonitoringInfoDeviceListPanel = Ext.getCmp("PumpRealTimeMonitoringInfoDeviceListPanel_Id");
                PumpRealTimeMonitoringInfoDeviceListPanel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
            	gridPanel.getSelectionModel().select(0, true);
            }else{
            	if(pumpDeviceRealTimeMonitoringDataHandsontableHelper!=null){
					if(pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot!=undefined){
						pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot.destroy();
					}
					pumpDeviceRealTimeMonitoringDataHandsontableHelper=null;
				}
            	Ext.getCmp("PumpRealTimeMonitoringInfoDeviceListSelectRow_Id").setValue(-1);
            	$("#pumpRealTimeMonitoringCurveContainer").html('');
            	$("#PumpRealTimeMonitoringInfoDataTableInfoContainer").html('');
            	
            	Ext.getCmp("PumpRealTimeMonitoringRightControlPanel").removeAll();
            	Ext.getCmp("PumpRealTimeMonitoringRightDeviceInfoPanel").removeAll();
            	Ext.getCmp("PumpRealTimeMonitoringRightAuxiliaryDeviceInfoPanel").removeAll();
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceName=Ext.getCmp('RealTimeMonitoringPumpDeviceListComb_Id').getValue();
        	var commStatusStatValue=Ext.getCmp("PumpRealTimeMonitoringStatSelectCommStatus_Id").getValue();
        	var deviceTypeStatValue=Ext.getCmp("PumpRealTimeMonitoringStatSelectDeviceType_Id").getValue();
            var new_params = {
                    orgId: orgId,
                    deviceType:0,
                    deviceName:deviceName,
                    commStatusStatValue:commStatusStatValue,
                    deviceTypeStatValue:deviceTypeStatValue
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});