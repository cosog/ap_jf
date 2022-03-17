Ext.define('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringStatStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pipelineRealTimeMonitoringStatStore',
    fields: ['id','item','count','itemCode'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/realTimeMonitoringController/getDeviceRealTimeStat',
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
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringStatGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineRealTimeMonitoringStatGridPanel_Id",
                    border: false,
                    autoLoad: true,
                    columnLines: true,
                    forceFit: true,
                    viewConfig: {
                    	emptyText: "<div class='con_div_' id='div_dataactiveid'><" + cosog.string.nodata + "></div>"
                    },
                    store: store,
                    columns: [{
                        text: '序号',
                        lockable: true,
                        align: 'center',
                        width: 50,
                        xtype: 'rownumberer',
                        sortable: false,
                        locked: false
                    }, {
                        text: '名称',
                        flex:2,
                        lockable: true,
                        align: 'center',
                        sortable: false,
                        dataIndex: 'item',
                        renderer: function (value) {
                            return "<span data-qtip=" + (value == undefined ? "" : value) + ">" + (value == undefined ? "" : value) + "</span>";
                        }
                    }, {
                        text: '变量',
                        flex:1,
                        lockable: true,
                        align: 'center',
                        sortable: false,
                        dataIndex: 'count',
                        renderer: function (value, o, p, e) {
                            return adviceStatTableCommStatusColor(value, o, p, e);
                        }
                    }],
                    listeners: {
                    	selectionchange: function (view, selected, o) {
                    		if(selected.length>0){
                    			Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').setValue('');
                    			Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').setRawValue('');
                        		var PipelineRealTimeMonitoringListGridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
                    			if (isNotVal(PipelineRealTimeMonitoringListGridPanel)) {
                    				PipelineRealTimeMonitoringListGridPanel.getSelectionModel().deselectAll(true);
                    				PipelineRealTimeMonitoringListGridPanel.getStore().load();
                    			}else{
                    				Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringWellListStore');
                    			}
                    		}
                    	},
                    	select: function(grid, record, index, eOpts) {
                    		
                    	}
                    }
                });
                var PipelineRealTimeMonitoringStatInfoPanel = Ext.getCmp("PipelineRealTimeMonitoringStatInfoPanel_Id");
                PipelineRealTimeMonitoringStatInfoPanel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
            	gridPanel.getSelectionModel().deselectAll(true);
            	gridPanel.getSelectionModel().select(0, true);
            }
            initRealTimeMonitoringStatPieOrColChat(get_rawData);
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
            var new_params = {
                    orgId: orgId,
                    deviceType:1
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});