//隔膜泵
var diaphragmPumpDeviceInfoHandsontableHelper = null;
var diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper = null;
var diaphragmPumpAdditionalInfoHandsontableHelper = null;
Ext.define('AP.view.well.DiaphragmPumpDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.diaphragmPumpDeviceInfoPanel',
    id: 'DiaphragmPumpDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var diaphragmPumpCombStore = new Ext.data.JsonStore({
            pageSize: defaultWellComboxSize,
            fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
            proxy: {
                url: context + '/wellInformationManagerController/loadWellComboxList',
                type: "ajax",
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (store, options) {
                    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellName = Ext.getCmp('diaphragmPumpDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 101,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var diaphragmPumpDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "diaphragmPumpDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: diaphragmPumpCombStore,
                autoSelect: false,
                editable: true,
                triggerAction: 'all',
                displayField: "boxval",
                valueField: "boxkey",
                pageSize: comboxPagingStatus,
                minChars: 0,
                emptyText: cosog.string.all,
                blankText: cosog.string.all,
                listeners: {
                    expand: function (sm, selections) {
                        diaphragmPumpDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                            CreateAndLoadDiaphragmPumpDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [diaphragmPumpDeviceCombo, '-',{
                id: 'DiaphragmPumpDeviceSelectRow_Id',
                xtype: 'textfield',
                value: 0,
                hidden: true
            },{
                id: 'DiaphragmPumpDeviceSelectEndRow_Id',
                xtype: 'textfield',
                value: 0,
                hidden: true
            }, {
                xtype: 'button',
                text: cosog.string.exportExcel,
//                pressed: true,
                iconCls: 'export',
                hidden: false,
                handler: function (v, o) {
                    var fields = "";
                    var heads = "";
                    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellInformationName = Ext.getCmp('diaphragmPumpDeviceListComb_Id').getValue();
                    var url = context + '/wellInformationManagerController/exportWellInformationData';
                    for (var i = 0; i < diaphragmPumpDeviceInfoHandsontableHelper.colHeaders.length; i++) {
                        fields += diaphragmPumpDeviceInfoHandsontableHelper.columns[i].data + ",";
                        heads += diaphragmPumpDeviceInfoHandsontableHelper.colHeaders[i] + ","
                    }
                    if (isNotVal(fields)) {
                        fields = fields.substring(0, fields.length - 1);
                        heads = heads.substring(0, heads.length - 1);
                    }

                    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id + "&deviceType=101&wellInformationName=" + URLencode(URLencode(wellInformationName)) + "&recordCount=10000" + "&fileName=" + URLencode(URLencode("隔膜泵设备")) + "&title=" + URLencode(URLencode("隔膜泵设备"));
                    openExcelWindow(url + '?flag=true' + param);
                }
            }, '-', {
                xtype: 'button',
                iconCls: 'note-refresh',
                text: cosog.string.refresh,
//                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadDiaphragmPumpDeviceInfoTable();
                }
            },'-', {
                id: 'DiaphragmPumpDeviceTotalCount_Id',
                xtype: 'component',
                hidden: false,
                tpl: cosog.string.totalCount + ': {count}',
                style: 'margin-right:15px'
            },'->', {
    			xtype: 'button',
                text: '添加设备',
                iconCls: 'add',
                handler: function (v, o) {
                	var selectedOrgName="";
                	var selectedOrgId="";
                	var IframeViewStore = Ext.getCmp("IframeView_Id").getStore();
            		var count=IframeViewStore.getCount();
                	var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
                	if (IframeViewSelection.length > 0) {
                		selectedOrgName=foreachAndSearchOrgAbsolutePath(IframeViewStore.data.items,IframeViewSelection[0].data.orgId);
                		selectedOrgId=IframeViewSelection[0].data.orgId;
                		
                	} else {
                		if(count>0){
                			selectedOrgName=IframeViewStore.getAt(0).data.text;
                			selectedOrgId=IframeViewStore.getAt(0).data.orgId;
                		}
                	}
                	
                	var window = Ext.create("AP.view.well.PumpDeviceInfoWindow", {
                        title: '添加设备'
                    });
                    window.show();
                    Ext.getCmp("pumpDeviceWinOgLabel_Id").setHtml("设备将添加到【<font color=red>"+selectedOrgName+"</font>】下,请确认<br/>&nbsp;");
                    Ext.getCmp("pumpDeviceType_Id").setValue(101);
                    Ext.getCmp("pumpDeviceOrg_Id").setValue(selectedOrgId);
                    Ext.getCmp("addFormPumpDevice_Id").show();
                    Ext.getCmp("updateFormPumpDevice_Id").hide();
                    return false;
    			}
    		}, '-',{
    			xtype: 'button',
    			id: 'deleteDiaphragmPumpDeviceNameBtn_Id',
    			text: '删除设备',
    			iconCls: 'delete',
    			handler: function (v, o) {
    				var startRow= Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").getValue();
    				var endRow= Ext.getCmp("DiaphragmPumpDeviceSelectEndRow_Id").getValue();
    				var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    				if(startRow!='' && endRow!=''){
    					startRow=parseInt(startRow);
    					endRow=parseInt(endRow);
    					var deleteInfo='是否删除第'+(startRow+1)+"行~第"+(endRow+1)+"行数据";
    					if(startRow==endRow){
    						deleteInfo='是否删除第'+(startRow+1)+"行数据";
    					}
    					
    					Ext.Msg.confirm(cosog.string.yesdel, deleteInfo, function (btn) {
    			            if (btn == "yes") {
    			            	for(var i=startRow;i<=endRow;i++){
    	    						var rowdata = diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
    	    						if (rowdata[0] != null && parseInt(rowdata[0])>0) {
    	    		                    diaphragmPumpDeviceInfoHandsontableHelper.delidslist.push(rowdata[0]);
    	    		                }
    	    					}
    	    					var saveData={};
    	    	            	saveData.updatelist=[];
    	    	            	saveData.insertlist=[];
    	    	            	saveData.delidslist=diaphragmPumpDeviceInfoHandsontableHelper.delidslist;
    	    	            	Ext.Ajax.request({
    	    	                    method: 'POST',
    	    	                    url: context + '/wellInformationManagerController/saveWellHandsontableData',
    	    	                    success: function (response) {
    	    	                        rdata = Ext.JSON.decode(response.responseText);
    	    	                        if (rdata.success) {
    	    	                        	Ext.MessageBox.alert("信息", "删除成功");
    	    	                            //保存以后重置全局容器
    	    	                            diaphragmPumpDeviceInfoHandsontableHelper.clearContainer();
    	    	                            Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").setValue(0);
    	    	                        	Ext.getCmp("DiaphragmPumpDeviceSelectEndRow_Id").setValue(0);
    	    	                            CreateAndLoadDiaphragmPumpDeviceInfoTable();
    	    	                        } else {
    	    	                            Ext.MessageBox.alert("信息", "数据保存失败");
    	    	                        }
    	    	                    },
    	    	                    failure: function () {
    	    	                        Ext.MessageBox.alert("信息", "请求失败");
    	    	                        diaphragmPumpDeviceInfoHandsontableHelper.clearContainer();
    	    	                    },
    	    	                    params: {
    	    	                        data: JSON.stringify(saveData),
    	    	                        orgId: leftOrg_Id,
    	    	                        deviceType: 101
    	    	                    }
    	    	                });
    			            }
    			        });
    				}else{
    					Ext.MessageBox.alert("信息","请先选中要删除的行");
    				}
    			}
    		},"-", {
                xtype: 'button',
                itemId: 'saveDiaphragmPumpDeviceDataBtnId',
                id: 'saveDiaphragmPumpDeviceDataBtn_Id',
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    diaphragmPumpDeviceInfoHandsontableHelper.saveData();
                }
            },"-",{
    			xtype: 'button',
                text: '批量添加',
                iconCls: 'batchAdd',
                hidden: false,
                handler: function (v, o) {
                	var selectedOrgName="";
                	var selectedOrgId="";
                	var IframeViewStore = Ext.getCmp("IframeView_Id").getStore();
            		var count=IframeViewStore.getCount();
                	var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
                	if (IframeViewSelection.length > 0) {
                		selectedOrgName=foreachAndSearchOrgAbsolutePath(IframeViewStore.data.items,IframeViewSelection[0].data.orgId);
                		selectedOrgId=IframeViewSelection[0].data.orgId;
                		
                	} else {
                		if(count>0){
                			selectedOrgName=IframeViewStore.getAt(0).data.text;
                			selectedOrgId=IframeViewStore.getAt(0).data.orgId;
                		}
                	}
                	
                	var window = Ext.create("AP.view.well.BatchAddDeviceWindow", {
                        title: '隔膜泵批量添加'
                    });
                    Ext.getCmp("batchAddDeviceWinOgLabel_Id").setHtml("设备将添加到【<font color=red>"+selectedOrgName+"</font>】下,请确认");
                    Ext.getCmp("batchAddDeviceType_Id").setValue(101);
                    Ext.getCmp("batchAddDeviceOrg_Id").setValue(selectedOrgId);
                    window.show();
                    return false;
    			}
    		},'-', {
    			xtype: 'button',
    			text:'设备隶属迁移',
    			iconCls: 'move',
    			handler: function (v, o) {
    				var window = Ext.create("AP.view.well.DeviceOrgChangeWindow", {
                        title: '设备隶属迁移'
                    });
                    window.show();
                    Ext.getCmp('DeviceOrgChangeWinDeviceType_Id').setValue(101);
                    Ext.create("AP.store.well.DeviceOrgChangeDeviceListStore");
                    Ext.create("AP.store.well.DeviceOrgChangeOrgListStore");
    			}
    		}],
            layout: 'border',
            items: [{
            	region: 'center',
            	layout: 'border',
            	items: [{
            		region: 'center',
            		title:'隔膜泵设备列表',
                	html: '<div class="DiaphragmPumpDeviceContainer" style="width:100%;height:100%;"><div class="con" id="DiaphragmPumpDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            if (diaphragmPumpDeviceInfoHandsontableHelper != null && diaphragmPumpDeviceInfoHandsontableHelper.hot != null && diaphragmPumpDeviceInfoHandsontableHelper.hot != undefined) {
//                            	CreateAndLoadDiaphragmPumpDeviceInfoTable();
                            	diaphragmPumpDeviceInfoHandsontableHelper.hot.refreshDimensions();
                            }
                        }
                    }
            	},{
            		region: 'east',
            		width: '30%',
            		title:'设备附加信息',
                	id:'DiaphragmPumpAdditionalInfoPanel_Id',
                	split: true,
                	collapsible: true,
                	html: '<div class="DiaphragmPumpAdditionalInfoContainer" style="width:100%;height:100%;"><div class="con" id="DiaphragmPumpAdditionalInfoTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if (diaphragmPumpAdditionalInfoHandsontableHelper != null && diaphragmPumpAdditionalInfoHandsontableHelper.hot != null && diaphragmPumpAdditionalInfoHandsontableHelper.hot != undefined) {
                        		diaphragmPumpAdditionalInfoHandsontableHelper.hot.refreshDimensions();
                            }
                        }
                    }
            	}]
            },{
            	region: 'east',
                width: '18%',
                title:'辅件设备列表',
                id:'DiaphragmPumpAuxiliaryDevicePanel_Id',
                split: true,
                collapsible: true,
                html: '<div class="DiaphragmPumpAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="DiaphragmPumpAuxiliaryDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                    	if (diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper != null && diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot != null && diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                    		diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot.refreshDimensions();
                        }
                    }
                }
            }],
            listeners: {
                beforeclose: function (panel, eOpts) {
                    
                }
            }
        })
        this.callParent(arguments);
    }
});

function CreateAndLoadDiaphragmPumpDeviceInfoTable(isNew) {
	if(isNew&&diaphragmPumpDeviceInfoHandsontableHelper!=null){
		if (diaphragmPumpDeviceInfoHandsontableHelper.hot != undefined) {
			diaphragmPumpDeviceInfoHandsontableHelper.hot.destroy();
		}
		diaphragmPumpDeviceInfoHandsontableHelper = null;
	}
    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    var wellInformationName_Id = Ext.getCmp('diaphragmPumpDeviceListComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (diaphragmPumpDeviceInfoHandsontableHelper == null || diaphragmPumpDeviceInfoHandsontableHelper.hot == null || diaphragmPumpDeviceInfoHandsontableHelper.hot == undefined) {
                diaphragmPumpDeviceInfoHandsontableHelper = DiaphragmPumpDeviceInfoHandsontableHelper.createNew("DiaphragmPumpDeviceTableDiv_id");
                diaphragmPumpDeviceInfoHandsontableHelper.dataLength=result.totalCount;
                var colHeaders = "[";
                var columns = "[";

                for (var i = 0; i < result.columns.length; i++) {
                    colHeaders += "'" + result.columns[i].header + "'";
                    if (result.columns[i].dataIndex.toUpperCase() === "orgName".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,diaphragmPumpDeviceInfoHandsontableHelper);}}";
                    } else if (result.columns[i].dataIndex.toUpperCase() === "liftingTypeName".toUpperCase()) {
                        if (pcpHidden) {
                            columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机']}";
                        } else {
                            columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机', '螺杆泵']}";
                        }
                    } else if (result.columns[i].dataIndex.toUpperCase() === "instanceName".toUpperCase()) {
                        var source = "[";
                        for (var j = 0; j < result.instanceDropdownData.length; j++) {
                            source += "\'" + result.instanceDropdownData[j] + "\'";
                            if (j < result.instanceDropdownData.length - 1) {
                                source += ",";
                            }
                        }
                        source += "]";
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:" + source + "}";
                    } else if (result.columns[i].dataIndex.toUpperCase() === "alarmInstanceName".toUpperCase()) {
                        var source = "[";
                        for (var j = 0; j < result.alarmInstanceDropdownData.length; j++) {
                            source += "\'" + result.alarmInstanceDropdownData[j] + "\'";
                            if (j < result.alarmInstanceDropdownData.length - 1) {
                                source += ",";
                            }
                        }
                        source += "]";
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:" + source + "}";
                    }else if (result.columns[i].dataIndex.toUpperCase() === "applicationScenariosName".toUpperCase()) {
                        var source = "[";
                        for (var j = 0; j < result.applicationScenariosDropdownData.length; j++) {
                            source += "\'" + result.applicationScenariosDropdownData[j] + "\'";
                            if (j < result.applicationScenariosDropdownData.length - 1) {
                                source += ",";
                            }
                        }
                        source += "]";
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:" + source + "}";
                    } else if (result.columns[i].dataIndex.toUpperCase() === "sortNum".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,diaphragmPumpDeviceInfoHandsontableHelper);}}";
                    } else if (result.columns[i].dataIndex.toUpperCase() === "statusName".toUpperCase()) {
                    	columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:['使能', '失效']}";
                    } else {
                        columns += "{data:'" + result.columns[i].dataIndex + "'}";
                    }
                    if (i < result.columns.length - 1) {
                        colHeaders += ",";
                        columns += ",";
                    }
                }
                colHeaders += "]";
                columns += "]";
                diaphragmPumpDeviceInfoHandsontableHelper.colHeaders = Ext.JSON.decode(colHeaders);
                diaphragmPumpDeviceInfoHandsontableHelper.columns = Ext.JSON.decode(columns);
                diaphragmPumpDeviceInfoHandsontableHelper.createTable(result.totalRoot);
            } else {
            	diaphragmPumpDeviceInfoHandsontableHelper.dataLength=result.totalCount;
            	diaphragmPumpDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            if(result.totalRoot.length==0){
            	Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").setValue('');
            	Ext.getCmp("DiaphragmPumpDeviceSelectEndRow_Id").setValue('');
            	CreateAndLoadDiaphragmPumpAuxiliaryDeviceInfoTable(0,'');
            	CreateAndLoadDiaphragmPumpAdditionalInfoTable(0,'');
            }else{
            	var selectedRow=Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").getValue();
            	var rowdata = diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(selectedRow);
            	CreateAndLoadDiaphragmPumpAuxiliaryDeviceInfoTable(rowdata[0],rowdata[1]);
            	CreateAndLoadDiaphragmPumpAdditionalInfoTable(rowdata[0],rowdata[1]);
            }
            Ext.getCmp("DiaphragmPumpDeviceTotalCount_Id").update({
                count: result.totalCount
            });
        },
        failure: function () {
            Ext.MessageBox.alert("错误", "与后台联系的时候出了问题");
        },
        params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 101,
            recordCount: 50,
            orgId: leftOrg_Id,
            page: 1,
            limit: 10000
        }
    });
};

var DiaphragmPumpDeviceInfoHandsontableHelper = {
    createNew: function (divid) {
        var diaphragmPumpDeviceInfoHandsontableHelper = {};
        diaphragmPumpDeviceInfoHandsontableHelper.hot = '';
        diaphragmPumpDeviceInfoHandsontableHelper.divid = divid;
        diaphragmPumpDeviceInfoHandsontableHelper.validresult = true; //数据校验
        diaphragmPumpDeviceInfoHandsontableHelper.colHeaders = [];
        diaphragmPumpDeviceInfoHandsontableHelper.columns = [];
        diaphragmPumpDeviceInfoHandsontableHelper.dataLength = 0;

        diaphragmPumpDeviceInfoHandsontableHelper.AllData = {};
        diaphragmPumpDeviceInfoHandsontableHelper.updatelist = [];
        diaphragmPumpDeviceInfoHandsontableHelper.delidslist = [];
        diaphragmPumpDeviceInfoHandsontableHelper.insertlist = [];
        diaphragmPumpDeviceInfoHandsontableHelper.editWellNameList = [];

        diaphragmPumpDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'rgb(242, 242, 242)';
        }

        diaphragmPumpDeviceInfoHandsontableHelper.createTable = function (data) {
            $('#' + diaphragmPumpDeviceInfoHandsontableHelper.divid).empty();
            var hotElement = document.querySelector('#' + diaphragmPumpDeviceInfoHandsontableHelper.divid);
            diaphragmPumpDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
            	licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
            	data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: false
                },
                columns: diaphragmPumpDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: diaphragmPumpDeviceInfoHandsontableHelper.colHeaders, //显示列头
                columnSorting: true, //允许排序
                allowInsertRow:false,
//                contextMenu: {
//                    items: {
//                        "row_above": {
//                            name: '向上插入一行',
//                        },
//                        "row_below": {
//                            name: '向下插入一行',
//                        },
//                        "col_left": {
//                            name: '向左插入一列',
//                        },
//                        "col_right": {
//                            name: '向右插入一列',
//                        },
//                        "remove_row": {
//                            name: '删除行',
//                        },
//                        "remove_col": {
//                            name: '删除列',
//                        },
//                        "merge_cell": {
//                            name: '合并单元格',
//                        },
//                        "copy": {
//                            name: '复制',
//                        },
//                        "cut": {
//                            name: '剪切',
//                        },
//                        "paste": {
//                            name: '粘贴',
//                            disabled: function () {
//                            },
//                            callback: function () {
//                            }
//                        }
//                    }
//                }, //右键菜单展示
                sortIndicator: true,
                manualColumnResize: true, //当值为true时，允许拖动，当为false时禁止拖动
                manualRowResize: true, //当值为true时，允许拖动，当为false时禁止拖动
                filters: true,
                renderAllRows: true,
                search: true,
                cells: function (row, col, prop) {
                    var cellProperties = {};
                    var visualRowIndex = this.instance.toVisualRow(row);
                    var visualColIndex = this.instance.toVisualColumn(col);
//                    if(visualRowIndex < diaphragmPumpDeviceInfoHandsontableHelper.dataLength){
//                    	cellProperties.readOnly = true;
//                    }
                    return cellProperties;
                },
                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
                	if(row<0 && row2<0){//只选中表头
                		Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").setValue('');
                    	Ext.getCmp("DiaphragmPumpDeviceSelectEndRow_Id").setValue('');
                    	CreateAndLoadDiaphragmPumpAuxiliaryDeviceInfoTable(0,'');
                    	CreateAndLoadDiaphragmPumpAdditionalInfoTable(0,'');
                	}else{
                		if(row<0){
                    		row=0;
                    	}
                    	if(row2<0){
                    		row2=0;
                    	}
                    	var startRow=row;
                    	var endRow=row2;
                    	if(row>row2){
                    		startRow=row2;
                        	endRow=row;
                    	}
                    	
                    	Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").setValue(startRow);
                    	Ext.getCmp("DiaphragmPumpDeviceSelectEndRow_Id").setValue(endRow);
                    	
                    	var row1=diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(startRow);
                    	var recordId=0;
                    	var deviceName='';
                    	if(isNotVal(row1[0])){
                    		recordId=row1[0];
                    	}
                    	if(isNotVal(row1[1])){
                    		deviceName=row1[1];
                    	}
                    	CreateAndLoadDiaphragmPumpAuxiliaryDeviceInfoTable(recordId,deviceName);
                    	CreateAndLoadDiaphragmPumpAdditionalInfoTable(recordId,deviceName);
                	}
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
                    //封装id成array传入后台
                    if (amount != 0) {
                        for (var i = index; i < amount + index; i++) {
                            var rowdata = diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                            ids.push(rowdata[0]);
                        }
                        diaphragmPumpDeviceInfoHandsontableHelper.delExpressCount(ids);
                        diaphragmPumpDeviceInfoHandsontableHelper.screening();
                    }
                },
                afterChange: function (changes, source) {
                    //params 参数 1.column num , 2,id, 3,oldvalue , 4.newvalue
                    if (changes != null) {
//                        var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
//                        if (IframeViewSelection.length > 0 && IframeViewSelection[0].isLeaf()) {} else {
//                            Ext.MessageBox.alert("信息", "编辑前，请先在左侧选择对应组织节点");
//                        }

                        for (var i = 0; i < changes.length; i++) {
                            var params = [];
                            var index = changes[i][0]; //行号码
                            var rowdata = diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
                            params.push(rowdata[0]);
                            params.push(changes[i][1]);
                            params.push(changes[i][2]);
                            params.push(changes[i][3]);

                            if ("edit" == source && params[1] == "wellName") { //编辑井名单元格
                                var data = "{\"oldWellName\":\"" + params[2] + "\",\"newWellName\":\"" + params[3] + "\"}";
                                diaphragmPumpDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
                            }

                            if (params[1] == "protocolName" && params[3] == "Kafka协议") {
                                diaphragmPumpDeviceInfoHandsontableHelper.hot.getCell(index, 6).source = ['modbus-tcp', 'modbus-rtu'];
                            }

                            //仅当单元格发生改变的时候,id!=null,说明是更新
                            if (params[2] != params[3] && params[0] != null && params[0] > 0) {
                                var data = "{";
                                for (var j = 0; j < diaphragmPumpDeviceInfoHandsontableHelper.columns.length; j++) {
                                    data += diaphragmPumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                                    if (j < diaphragmPumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                        data += ","
                                    }
                                }
                                data += "}"
                                diaphragmPumpDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
                            }
                        }
                    
                    }
                }
            });
        }
        //插入的数据的获取
        diaphragmPumpDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                //id=null时,是插入数据,此时的i正好是行号
                if (idsdata[i] == null || idsdata[i] < 0) {
                    //获得id=null时的所有数据封装进data
                    var rowdata = diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                    //var collength = hot.countCols();
                    if (rowdata != null) {
                        var data = "{";
                        for (var j = 0; j < diaphragmPumpDeviceInfoHandsontableHelper.columns.length; j++) {
                            data += diaphragmPumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                            if (j < diaphragmPumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                data += ","
                            }
                        }
                        data += "}"
                        diaphragmPumpDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
                    }
                }
            }
            if (diaphragmPumpDeviceInfoHandsontableHelper.insertlist.length != 0) {
                diaphragmPumpDeviceInfoHandsontableHelper.AllData.insertlist = diaphragmPumpDeviceInfoHandsontableHelper.insertlist;
            }
        }
        //保存数据
        diaphragmPumpDeviceInfoHandsontableHelper.saveData = function () {
        	var leftOrg_Name=Ext.getCmp("leftOrg_Name").getValue();
        	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
            //插入的数据的获取
            diaphragmPumpDeviceInfoHandsontableHelper.insertExpressCount();
            //获取辅件配置数据
            var deviceAuxiliaryData={};
            var DiaphragmPumpDeviceSelectRow= Ext.getCmp("DiaphragmPumpDeviceSelectRow_Id").getValue();
            if(isNotVal(DiaphragmPumpDeviceSelectRow)){
            	var rowdata = diaphragmPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(DiaphragmPumpDeviceSelectRow);
            	var deviceId=rowdata[0];
            	if(isNotVal(deviceId) && parseInt(deviceId)>0 ){
                	deviceAuxiliaryData.deviceType=101;
                	deviceAuxiliaryData.deviceId=deviceId;
                	//辅件设备
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	if(diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper!=null && diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
                		var auxiliaryDeviceData=diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                            if (auxiliaryDeviceData[index][0]) {
                            	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                            	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                            }
                        });
                	}
                	//附加信息
                	deviceAuxiliaryData.additionalInfoList=[];
                	if(diaphragmPumpAdditionalInfoHandsontableHelper!=null && diaphragmPumpAdditionalInfoHandsontableHelper.hot!=undefined){
                		var additionalInfoData=diaphragmPumpAdditionalInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(additionalInfoData, function (name, index, countriesItSelf) {
                            if (isNotVal(additionalInfoData[index][1])) {
                            	var additionalInfo={};
                            	additionalInfo.itemName=additionalInfoData[index][1];
                            	additionalInfo.itemValue=isNotVal(additionalInfoData[index][2])?additionalInfoData[index][2]:"";
                            	additionalInfo.itemUnit=isNotVal(additionalInfoData[index][3])?additionalInfoData[index][3]:"";
                            	deviceAuxiliaryData.additionalInfoList.push(additionalInfo);
                            }
                        });
                	}
            	}
            }
        	Ext.Ajax.request({
                method: 'POST',
                url: context + '/wellInformationManagerController/saveWellHandsontableData',
                success: function (response) {
                    rdata = Ext.JSON.decode(response.responseText);
                    if (rdata.success) {
                    	var saveInfo='保存成功';
                    	if(rdata.collisionCount>0){//数据冲突
                    		saveInfo='保存成功'+rdata.successCount+'条记录,保存失败:<font color="red">'+rdata.collisionCount+'</font>条记录';
                    		for(var i=0;i<rdata.list.length;i++){
                    			saveInfo+='<br/><font color="red"> '+rdata.list[i]+'</font>';
                    		}
                    	}
                    	Ext.MessageBox.alert("信息", saveInfo);
                        if(rdata.successCount>0){
                        	diaphragmPumpDeviceInfoHandsontableHelper.clearContainer();
                        	CreateAndLoadDiaphragmPumpDeviceInfoTable();
                        }
                    } else {
                        Ext.MessageBox.alert("信息", "数据保存失败");
                    }
                },
                failure: function () {
                    Ext.MessageBox.alert("信息", "请求失败");
                    diaphragmPumpDeviceInfoHandsontableHelper.clearContainer();
                },
                params: {
                    data: JSON.stringify(diaphragmPumpDeviceInfoHandsontableHelper.AllData),
                    deviceAuxiliaryData: JSON.stringify(deviceAuxiliaryData),
                    orgId: leftOrg_Id,
                    deviceType: 101
                }
            });
        }

        //修改井名
        diaphragmPumpDeviceInfoHandsontableHelper.editWellName = function () {
            //插入的数据的获取
            if (diaphragmPumpDeviceInfoHandsontableHelper.editWellNameList.length > 0 && diaphragmPumpDeviceInfoHandsontableHelper.validresult) {
                Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/editWellName',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            Ext.MessageBox.alert("信息", "保存成功");
                            diaphragmPumpDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadDiaphragmPumpDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");
                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        diaphragmPumpDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(diaphragmPumpDeviceInfoHandsontableHelper.editWellNameList),
                        deviceType:101
                    }
                });
            } else {
                if (!diaphragmPumpDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        }


        //删除的优先级最高
        diaphragmPumpDeviceInfoHandsontableHelper.delExpressCount = function (ids) {
            //传入的ids.length不可能为0
            $.each(ids, function (index, id) {
                if (id != null) {
                    diaphragmPumpDeviceInfoHandsontableHelper.delidslist.push(id);
                }
            });
            diaphragmPumpDeviceInfoHandsontableHelper.AllData.delidslist = diaphragmPumpDeviceInfoHandsontableHelper.delidslist;
        }

        //updatelist数据更新
        diaphragmPumpDeviceInfoHandsontableHelper.screening = function () {
            if (diaphragmPumpDeviceInfoHandsontableHelper.updatelist.length != 0 && diaphragmPumpDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
                for (var i = 0; i < diaphragmPumpDeviceInfoHandsontableHelper.delidslist.length; i++) {
                    for (var j = 0; j < diaphragmPumpDeviceInfoHandsontableHelper.updatelist.length; j++) {
                        if (diaphragmPumpDeviceInfoHandsontableHelper.updatelist[j].id == diaphragmPumpDeviceInfoHandsontableHelper.delidslist[i]) {
                            //更新updatelist
                            diaphragmPumpDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
                        }
                    }
                }
                //把updatelist封装进AllData
                diaphragmPumpDeviceInfoHandsontableHelper.AllData.updatelist = diaphragmPumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        //更新数据
        diaphragmPumpDeviceInfoHandsontableHelper.updateExpressCount = function (data) {
            if (JSON.stringify(data) != "{}") {
                var flag = true;
                //判断记录是否存在,更新数据     
                $.each(diaphragmPumpDeviceInfoHandsontableHelper.updatelist, function (index, node) {
                    if (node.id == data.id) {
                        //此记录已经有了
                        flag = false;
                        //用新得到的记录替换原来的,不用新增
                        diaphragmPumpDeviceInfoHandsontableHelper.updatelist[index] = data;
                    }
                });
                flag && diaphragmPumpDeviceInfoHandsontableHelper.updatelist.push(data);
                //封装
                diaphragmPumpDeviceInfoHandsontableHelper.AllData.updatelist = diaphragmPumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        diaphragmPumpDeviceInfoHandsontableHelper.clearContainer = function () {
            diaphragmPumpDeviceInfoHandsontableHelper.AllData = {};
            diaphragmPumpDeviceInfoHandsontableHelper.updatelist = [];
            diaphragmPumpDeviceInfoHandsontableHelper.delidslist = [];
            diaphragmPumpDeviceInfoHandsontableHelper.insertlist = [];
            diaphragmPumpDeviceInfoHandsontableHelper.editWellNameList = [];
        }

        return diaphragmPumpDeviceInfoHandsontableHelper;
    }
};

function CreateAndLoadDiaphragmPumpAuxiliaryDeviceInfoTable(deviceId,deviceName,isNew){
	if(isNew&&diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper!=null){
		if(diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
			diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
		}
		diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getAuxiliaryDevice',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(deviceName)){
				deviceName='';
			}
			Ext.getCmp("DiaphragmPumpAuxiliaryDevicePanel_Id").setTitle(deviceName+"辅件设备列表");
			if(diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper==null || diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot==undefined){
				diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper = DiaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.createNew("DiaphragmPumpAuxiliaryDeviceTableDiv_id");
				var colHeaders="['','序号','名称','规格型号','']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'name'},{data:'model'},{data:'realId'}]";
				
				diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceId:deviceId,
			deviceType:101
        }
	});
};

var DiaphragmPumpAuxiliaryDeviceInfoHandsontableHelper = {
		createNew: function (divid) {
	        var diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper = {};
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot1 = '';
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.divid = divid;
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=[];
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.columns=[];
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.AllData=[];
	        
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.divid);
	        	diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: false
	                },
	        		colWidths: [25,50,80,80],
	                columns:diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                columns:diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders,//显示列头
	                columnSorting: true,//允许排序
	                sortIndicator: true,
	                manualColumnResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                manualRowResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                filters: true,
	                renderAllRows: true,
	                search: true,
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
	                    if (visualColIndex >0) {
							cellProperties.readOnly = true;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        //保存数据
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.saveData = function () {}
	        diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.clearContainer = function () {
	        	diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper.AllData = [];
	        }
	        return diaphragmPumpAuxiliaryDeviceInfoHandsontableHelper;
	    }
};

function CreateAndLoadDiaphragmPumpAdditionalInfoTable(deviceId,deviceName,isNew){
	if(isNew&&diaphragmPumpAdditionalInfoHandsontableHelper!=null){
		if(diaphragmPumpAdditionalInfoHandsontableHelper.hot!=undefined){
			diaphragmPumpAdditionalInfoHandsontableHelper.hot.destroy();
		}
		diaphragmPumpAdditionalInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getDeviceAdditionalInfo',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(deviceName)){
				deviceName='';
			}
			Ext.getCmp("DiaphragmPumpAdditionalInfoPanel_Id").setTitle(deviceName+"附加信息");
			if(diaphragmPumpAdditionalInfoHandsontableHelper==null || diaphragmPumpAdditionalInfoHandsontableHelper.hot==undefined){
				diaphragmPumpAdditionalInfoHandsontableHelper = DiaphragmPumpAdditionalInfoHandsontableHelper.createNew("DiaphragmPumpAdditionalInfoTableDiv_id");
				var colHeaders="['序号','名称','值','单位']";
				var columns="[{data:'id'},{data:'itemName'},{data:'itemValue'},{data:'itemUnit'}]";
				
				diaphragmPumpAdditionalInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				diaphragmPumpAdditionalInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					diaphragmPumpAdditionalInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					diaphragmPumpAdditionalInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					diaphragmPumpAdditionalInfoHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					diaphragmPumpAdditionalInfoHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceId:deviceId,
			deviceType:101
        }
	});
};

var DiaphragmPumpAdditionalInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var diaphragmPumpAdditionalInfoHandsontableHelper = {};
	        diaphragmPumpAdditionalInfoHandsontableHelper.hot = '';
	        diaphragmPumpAdditionalInfoHandsontableHelper.divid = divid;
	        diaphragmPumpAdditionalInfoHandsontableHelper.colHeaders = [];
	        diaphragmPumpAdditionalInfoHandsontableHelper.columns = [];
	        diaphragmPumpAdditionalInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(242, 242, 242)';
	        }

	        diaphragmPumpAdditionalInfoHandsontableHelper.createTable = function (data) {
	            $('#' + diaphragmPumpAdditionalInfoHandsontableHelper.divid).empty();
	            var hotElement = document.querySelector('#' + diaphragmPumpAdditionalInfoHandsontableHelper.divid);
	            diaphragmPumpAdditionalInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	            	licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	            	data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: false
	                },
	                columns: diaphragmPumpAdditionalInfoHandsontableHelper.columns,
	                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true, //显示行头
	                colHeaders: diaphragmPumpAdditionalInfoHandsontableHelper.colHeaders, //显示列头
	                columnSorting: true, //允许排序
	                contextMenu: {
	                    items: {
	                        "row_above": {
	                            name: '向上插入一行',
	                        },
	                        "row_below": {
	                            name: '向下插入一行',
	                        },
	                        "col_left": {
	                            name: '向左插入一列',
	                        },
	                        "col_right": {
	                            name: '向右插入一列',
	                        },
	                        "remove_row": {
	                            name: '删除行',
	                        },
	                        "remove_col": {
	                            name: '删除列',
	                        },
	                        "merge_cell": {
	                            name: '合并单元格',
	                        },
	                        "copy": {
	                            name: '复制',
	                        },
	                        "cut": {
	                            name: '剪切',
	                        },
	                        "paste": {
	                            name: '粘贴',
	                            disabled: function () {
	                            },
	                            callback: function () {
	                            }
	                        }
	                    }
	                }, 
	                sortIndicator: true,
	                manualColumnResize: true, //当值为true时，允许拖动，当为false时禁止拖动
	                manualRowResize: true, //当值为true时，允许拖动，当为false时禁止拖动
	                filters: true,
	                renderAllRows: true,
	                search: true,
	                cells: function (row, col, prop) {
	                    var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
	                }
	            });
	        }
	        return diaphragmPumpAdditionalInfoHandsontableHelper;
	    }
	};