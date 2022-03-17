Ext.define('AP.store.alarmQuery.PipelineNumericValueAlarmStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.PipelineNumericValueAlarmStore',
    fields: ['id','deviceType','deviceTypeName','wellName','createTime','user_id','loginIp','action','actionName','remark'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/alarmQueryController/getAlarmData',
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
            var column = createAlarmQueryColumn(arrColumns);
            Ext.getCmp("PipelineNumericValueAlarmDetailsColumnStr_Id").setValue(column);
            var gridPanel = Ext.getCmp("PipelineNumericValueAlarmGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '当前 {0}~{1}条  共 {2} 条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineNumericValueAlarmGridPanel_Id",
                    border: false,
                    autoLoad: true,
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
                    		
                    	},
                    	select: function(grid, record, index, eOpts) {}
                    }
                });
                var panel = Ext.getCmp("PipelineNumericValueAlarmDetailsPanel_Id");
                panel.add(gridPanel);
            }
            
            var startDate=Ext.getCmp('PipelineNumericValueAlarmQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date.split(' ')[0]);
            	Ext.getCmp('PipelineNumericValueAlarmQueryStartTime_Hour_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[0]);
            	Ext.getCmp('PipelineNumericValueAlarmQueryStartTime_Minute_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[1]);
            	Ext.getCmp('PipelineNumericValueAlarmQueryStartTime_Second_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[2]);
            }
            var endDate=Ext.getCmp('PipelineNumericValueAlarmQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date.split(' ')[0]);
            	Ext.getCmp('PipelineNumericValueAlarmQueryEndTime_Hour_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[0]);
            	Ext.getCmp('PipelineNumericValueAlarmQueryEndTime_Minute_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[1]);
            	Ext.getCmp('PipelineNumericValueAlarmQueryEndTime_Second_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[2]);
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceType=1;
        	var deviceId  = Ext.getCmp("PipelineNumericValueAlarmOverviewGridPanel_Id").getSelectionModel().getSelection()[0].data.id;
        	var deviceName  = Ext.getCmp("PipelineNumericValueAlarmOverviewGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
        	var alarmLevel=Ext.getCmp('PipelineNumericValueAlarmLevelComb_Id').getValue();
        	var isSendMessage=Ext.getCmp('PipelineNumericValueAlarmIsSendMessageComb_Id').getValue();
        	var startDate=Ext.getCmp('PipelineNumericValueAlarmQueryStartDate_Id').rawValue;
        	var startTime_Hour=Ext.getCmp('PipelineNumericValueAlarmQueryStartTime_Hour_Id').getValue();
        	var startTime_Minute=Ext.getCmp('PipelineNumericValueAlarmQueryStartTime_Minute_Id').getValue();
        	var startTime_Second=Ext.getCmp('PipelineNumericValueAlarmQueryStartTime_Second_Id').getValue();
            var endDate=Ext.getCmp('PipelineNumericValueAlarmQueryEndDate_Id').rawValue;
            var endTime_Hour=Ext.getCmp('PipelineNumericValueAlarmQueryEndTime_Hour_Id').getValue();
        	var endTime_Minute=Ext.getCmp('PipelineNumericValueAlarmQueryEndTime_Minute_Id').getValue();
        	var endTime_Second=Ext.getCmp('PipelineNumericValueAlarmQueryEndTime_Second_Id').getValue();
            var new_params = {
                    orgId: orgId,
                    deviceType:deviceType,
                    deviceId:deviceId,
                    deviceName:deviceName,
                    alarmLevel:alarmLevel,
                    isSendMessage:isSendMessage,
                    startDate:getDateAndTime(startDate,startTime_Hour,startTime_Minute,startTime_Second),
                    endDate:getDateAndTime(endDate,endTime_Hour,endTime_Minute,endTime_Second),
                    alarmType:1
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});