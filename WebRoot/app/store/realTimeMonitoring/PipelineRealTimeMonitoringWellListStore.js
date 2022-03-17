Ext.define('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringWellListStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pipelineRealTimeMonitoringWellListStore',
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
            Ext.getCmp("PipelineRealTimeMonitoringColumnStr_Id").setValue(column);
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '共 {2}条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineRealTimeMonitoringListGridPanel_Id",
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
                    		Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id").setValue(index);
                    		var deviceName=record.data.wellName;
                    		var deviceId=record.data.id;
                    		var deviceType=1;
                    		var tabPanel = Ext.getCmp("PipelineRealTimeMonitoringCurveAndTableTabPanel");
                    		var activeId = tabPanel.getActiveTab().id;
                    		if(activeId=="PipelineRealTimeMonitoringCurveTabPanel_Id"){
                    			deviceRealtimeMonitoringCurve(1);
                    		}else if(activeId=="PipelineRealTimeMonitoringTableTabPanel_Id"){
                        		CreatePipelineDeviceRealTimeMonitoringDataTable(deviceId,deviceName,deviceType);
                    		}
                    		Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringControlAndInfoStore');
                    	},
                    	itemdblclick: function (view,record,item,index,e,eOpts) {
                    		gotoDeviceHistory(record.data.wellName,1);
                    	}
                    }
                });
                var PipelineRealTimeMonitoringInfoDeviceListPanel = Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListPanel_Id");
                PipelineRealTimeMonitoringInfoDeviceListPanel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
            	gridPanel.getSelectionModel().select(0, true);
            }else{
            	if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper!=null){
					if(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot!=undefined){
						pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.destroy();
					}
					pipelineDeviceRealTimeMonitoringDataHandsontableHelper=null;
				}
            	Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id").setValue(-1);
            	
            	$("#pipelineRealTimeMonitoringCurveContainer").html('');
            	$("#PipelineRealTimeMonitoringInfoDataTableInfoContainer").html('');
            	Ext.getCmp("PipelineRealTimeMonitoringRightControlPanel").removeAll();
            	Ext.getCmp("PipelineRealTimeMonitoringRightDeviceInfoPanel").removeAll();
            	Ext.getCmp("PipelineRealTimeMonitoringRightAuxiliaryDeviceInfoPanel").removeAll();
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceName=Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').getValue();
        	var commStatusStatValue=Ext.getCmp("PipelineRealTimeMonitoringStatSelectCommStatus_Id").getValue();
        	var deviceTypeStatValue=Ext.getCmp("PipelineRealTimeMonitoringStatSelectDeviceType_Id").getValue();
            var new_params = {
                    orgId: orgId,
                    deviceType:1,
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