Ext.define('AP.store.alarmQuery.PumpNumericValueAlarmOverviewStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pumpNumericValueAlarmOverviewStore',
    fields: ['id','deviceType','deviceTypeName','wellName','alarmTime','user_id','loginIp','action','actionName','remark'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/alarmQueryController/getAlarmOverviewData',
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
            var column = createAlarmOverviewQueryColumn(arrColumns);
            Ext.getCmp("PumpNumericValueAlarmOverviewColumnStr_Id").setValue(column);
            var gridPanel = Ext.getCmp("PumpNumericValueAlarmOverviewGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg:''
//                	displayMsg: '当前 {0}~{1}条  共 {2} 条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PumpNumericValueAlarmOverviewGridPanel_Id",
                    border: false,
//                    autoLoad: true,
                    bbar: bbar,
                    columnLines: true,
                    forceFit: false,
                    viewConfig: {
                    	emptyText: "<div class='con_div_' id='div_dataactiveid'><" + cosog.string.nodata + "></div>"
                    },
                    store: store,
                    columns: newColumns,
                    listeners: {
                    	selectionchange: function (view, selected, o) {
            				if(selected.length>0){
            					var gridPanel = Ext.getCmp("PumpNumericValueAlarmGridPanel_Id");
                				if (isNotVal(gridPanel)) {
                					gridPanel.getStore().load();
                				}else{
                					Ext.create('AP.store.alarmQuery.PumpNumericValueAlarmStore');
                				}
            				}
                    	},
                    	select: function(grid, record, index, eOpts) {}
                    }
                });
                var panel = Ext.getCmp("PumpNumericValueAlarmOverviewPanel_Id");
                panel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
            	if(gridPanel.getSelectionModel().getSelection().length>0){
            		gridPanel.getSelectionModel().deselectAll(true);
            	}
            	gridPanel.getSelectionModel().select(0, true);
            }else{
            	var gridPanel = Ext.getCmp("PumpNumericValueAlarmGridPanel_Id");
                if (isNotVal(gridPanel)) {
                	Ext.getCmp("PumpNumericValueAlarmDetailsPanel_Id").remove(gridPanel);
                }
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceType=0;
        	var deviceName=Ext.getCmp('PumpNumericValueAlarmDeviceListComb_Id').getValue();
        	var alarmLevel=Ext.getCmp('PumpNumericValueAlarmLevelComb_Id').getValue();
        	var isSendMessage=Ext.getCmp('PumpNumericValueAlarmIsSendMessageComb_Id').getValue();
            var new_params = {
                    orgId: orgId,
                    deviceType:deviceType,
                    deviceName:deviceName,
                    alarmLevel:alarmLevel,
                    isSendMessage:isSendMessage,
                    alarmType:1
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});