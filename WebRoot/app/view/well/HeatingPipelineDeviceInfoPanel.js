//加热管
var heatingPipelineDeviceInfoHandsontableHelper = null;
var heatingPipelineAuxiliaryDeviceInfoHandsontableHelper = null;
var heatingPipelineAdditionalInfoHandsontableHelper = null;
Ext.define('AP.view.well.HeatingPipelineDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.heatingPipelineDeviceInfoPanel',
    id: 'HeatingPipelineDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var heatingPipelineCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('heatingPipelineDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 201,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var heatingPipelineDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "heatingPipelineDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: heatingPipelineCombStore,
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
                        heatingPipelineDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                            CreateAndLoadHeatingPipelineDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [{
                id: 'HeatingPipelineDeviceSelectRow_Id',
                xtype: 'textfield',
                value: 0,
                hidden: true
            },{
                id: 'HeatingPipelineDeviceSelectEndRow_Id',
                xtype: 'textfield',
                value: 0,
                hidden: true
            },heatingPipelineDeviceCombo, '-', {
                xtype: 'button',
                text: cosog.string.exportExcel,
//                pressed: true,
                iconCls: 'export',
                hidden: false,
                handler: function (v, o) {
                    var fields = "";
                    var heads = "";
                    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellInformationName = Ext.getCmp('heatingPipelineDeviceListComb_Id').getValue();
                    var url = context + '/wellInformationManagerController/exportWellInformationData';
                    for (var i = 0; i < heatingPipelineDeviceInfoHandsontableHelper.colHeaders.length; i++) {
                        fields += heatingPipelineDeviceInfoHandsontableHelper.columns[i].data + ",";
                        heads += heatingPipelineDeviceInfoHandsontableHelper.colHeaders[i] + ","
                    }
                    if (isNotVal(fields)) {
                        fields = fields.substring(0, fields.length - 1);
                        heads = heads.substring(0, heads.length - 1);
                    }

                    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id + "&deviceType=201&wellInformationName=" + URLencode(URLencode(wellInformationName)) + "&recordCount=10000" + "&fileName=" + URLencode(URLencode("加热管设备")) + "&title=" + URLencode(URLencode("加热管设备"));
                    openExcelWindow(url + '?flag=true' + param);
                }
            }, '-', {
                xtype: 'button',
                iconCls: 'note-refresh',
                text: cosog.string.refresh,
//                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadHeatingPipelineDeviceInfoTable();
                }
            },'-', {
                id: 'HeatingPipelineDeviceTotalCount_Id',
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
                	
                	var window = Ext.create("AP.view.well.PipelineDeviceInfoWindow", {
                        title: '添加设备'
                    });
                    window.show();
                    Ext.getCmp("pipelineDeviceWinOgLabel_Id").setHtml("设备将添加到【<font color=red>"+selectedOrgName+"</font>】下,请确认<br/>&nbsp;");
                    Ext.getCmp("pipelineDeviceType_Id").setValue(201);
                    Ext.getCmp("pipelineDeviceOrg_Id").setValue(selectedOrgId);
                    Ext.getCmp("addFormPipelineDevice_Id").show();
                    Ext.getCmp("updateFormPipelineDevice_Id").hide();
                    return false;
    			}
    		},'-',{
    			xtype: 'button',
    			id: 'deleteHeatingPipelineDeviceNameBtn_Id',
    			text: '删除设备',
    			iconCls: 'delete',
    			handler: function (v, o) {
    				var startRow= Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").getValue();
    				var endRow= Ext.getCmp("HeatingPipelineDeviceSelectEndRow_Id").getValue();
    				var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    				if(startRow!=''&&endRow!=''){
    					startRow=parseInt(startRow);
    					endRow=parseInt(endRow);
    					var deleteInfo='是否删除第'+(startRow+1)+"行~第"+(endRow+1)+"行数据";
    					if(startRow==endRow){
    						deleteInfo='是否删除第'+(startRow+1)+"行数据";
    					}
    					
    					Ext.Msg.confirm(cosog.string.yesdel, deleteInfo, function (btn) {
    			            if (btn == "yes") {
    			            	for(var i=startRow;i<=endRow;i++){
    	    						var rowdata = heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
    	    						if (rowdata[0] != null && parseInt(rowdata[0])>0) {
    	    		                    heatingPipelineDeviceInfoHandsontableHelper.delidslist.push(rowdata[0]);
    	    		                }
    	    					}
    	    					var saveData={};
    	    	            	saveData.updatelist=[];
    	    	            	saveData.insertlist=[];
    	    	            	saveData.delidslist=heatingPipelineDeviceInfoHandsontableHelper.delidslist;
    	    	            	Ext.Ajax.request({
    	    	                    method: 'POST',
    	    	                    url: context + '/wellInformationManagerController/saveWellHandsontableData',
    	    	                    success: function (response) {
    	    	                        rdata = Ext.JSON.decode(response.responseText);
    	    	                        if (rdata.success) {
    	    	                        	Ext.MessageBox.alert("信息", "删除成功");
    	    	                            //保存以后重置全局容器
    	    	                            heatingPipelineDeviceInfoHandsontableHelper.clearContainer();
    	    	                            Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").setValue(0);
    	    	                        	Ext.getCmp("HeatingPipelineDeviceSelectEndRow_Id").setValue(0);
    	    	                            CreateAndLoadHeatingPipelineDeviceInfoTable();
    	    	                        } else {
    	    	                            Ext.MessageBox.alert("信息", "数据保存失败");
    	    	                        }
    	    	                    },
    	    	                    failure: function () {
    	    	                        Ext.MessageBox.alert("信息", "请求失败");
    	    	                        heatingPipelineDeviceInfoHandsontableHelper.clearContainer();
    	    	                    },
    	    	                    params: {
    	    	                        data: JSON.stringify(saveData),
    	    	                        orgId: leftOrg_Id,
    	    	                        deviceType: 201
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
                itemId: 'saveHeatingPipelineDeviceDataBtnId',
                id: 'saveHeatingPipelineDeviceDataBtn_Id',
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    heatingPipelineDeviceInfoHandsontableHelper.saveData();
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
                        title: '加热管批量添加'
                    });
                	Ext.getCmp("batchAddDeviceWinOgLabel_Id").setHtml("设备将添加到【<font color=red>"+selectedOrgName+"</font>】下,请确认");
                    Ext.getCmp("batchAddDeviceType_Id").setValue(201);
                    Ext.getCmp("batchAddDeviceOrg_Id").setValue(selectedOrgId);
                    window.show();
                    return false;
    			}
    		},'-',{
    			xtype: 'button',
    			text:'设备隶属迁移',
    			iconCls: 'move',
    			handler: function (v, o) {
    				var window = Ext.create("AP.view.well.DeviceOrgChangeWindow", {
                        title: '设备隶属迁移'
                    });
                    window.show();
                    Ext.getCmp('DeviceOrgChangeWinDeviceType_Id').setValue(201);
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
            		title:'加热管设备列表',
                	html: '<div class="HeatingPipelineDeviceContainer" style="width:100%;height:100%;"><div class="con" id="HeatingPipelineDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            if (heatingPipelineDeviceInfoHandsontableHelper != null && heatingPipelineDeviceInfoHandsontableHelper.hot != null && heatingPipelineDeviceInfoHandsontableHelper.hot != undefined) {
                            	heatingPipelineDeviceInfoHandsontableHelper.hot.refreshDimensions();
                            }
                        }
                    }
            	},{
            		region: 'east',
            		width: '30%',
            		title:'设备附加信息',
                	id:'HeatingPipelineAdditionalInfoPanel_Id',
                	split: true,
                	collapsible: true,
                	html: '<div class="HeatingPipelineAdditionalInfoContainer" style="width:100%;height:100%;"><div class="con" id="HeatingPipelineAdditionalInfoTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if (heatingPipelineAdditionalInfoHandsontableHelper != null && heatingPipelineAdditionalInfoHandsontableHelper.hot != null && heatingPipelineAdditionalInfoHandsontableHelper.hot != undefined) {
                        		heatingPipelineAdditionalInfoHandsontableHelper.hot.refreshDimensions();
                            }
                        }
                    }
            	}]
            },{
            	region: 'east',
                width: '18%',
                title:'辅件设备列表',
                id:'HeatingPipelineAuxiliaryDevicePanel_Id',
                split: true,
                collapsible: true,
                html: '<div class="HeatingPipelineAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="HeatingPipelineAuxiliaryDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                    	if (heatingPipelineAuxiliaryDeviceInfoHandsontableHelper != null && heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != null && heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                    		heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.refreshDimensions();
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

function CreateAndLoadHeatingPipelineDeviceInfoTable(isNew) {
	if(isNew&&heatingPipelineDeviceInfoHandsontableHelper!=null){
		if (heatingPipelineDeviceInfoHandsontableHelper.hot != undefined) {
			heatingPipelineDeviceInfoHandsontableHelper.hot.destroy();
		}
		heatingPipelineDeviceInfoHandsontableHelper = null;
	}
    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    var wellInformationName_Id = Ext.getCmp('heatingPipelineDeviceListComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (heatingPipelineDeviceInfoHandsontableHelper == null || heatingPipelineDeviceInfoHandsontableHelper.hot == null || heatingPipelineDeviceInfoHandsontableHelper.hot == undefined) {
                heatingPipelineDeviceInfoHandsontableHelper = HeatingPipelineDeviceInfoHandsontableHelper.createNew("HeatingPipelineDeviceTableDiv_id");
                heatingPipelineDeviceInfoHandsontableHelper.dataLength=result.totalCount;
                var colHeaders = "[";
                var columns = "[";

                for (var i = 0; i < result.columns.length; i++) {
                    colHeaders += "'" + result.columns[i].header + "'";
                    if (result.columns[i].dataIndex.toUpperCase() === "orgName".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,heatingPipelineDeviceInfoHandsontableHelper);}}";
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
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,heatingPipelineDeviceInfoHandsontableHelper);}}";
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
                heatingPipelineDeviceInfoHandsontableHelper.colHeaders = Ext.JSON.decode(colHeaders);
                heatingPipelineDeviceInfoHandsontableHelper.columns = Ext.JSON.decode(columns);
                heatingPipelineDeviceInfoHandsontableHelper.createTable(result.totalRoot);
            } else {
            	heatingPipelineDeviceInfoHandsontableHelper.dataLength=result.totalCount;
            	heatingPipelineDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            if(result.totalRoot.length==0){
            	Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").setValue('');
            	Ext.getCmp("HeatingPipelineDeviceSelectEndRow_Id").setValue('');
            	CreateAndLoadHeatingPipelineAuxiliaryDeviceInfoTable(0,'');
            	CreateAndLoadHeatingPipelineAdditionalInfoTable(0,'');
            }else{
            	var selectedRow=Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").getValue();
            	var rowdata = heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(selectedRow);
            	CreateAndLoadHeatingPipelineAuxiliaryDeviceInfoTable(rowdata[0],rowdata[1]);
            	CreateAndLoadHeatingPipelineAdditionalInfoTable(rowdata[0],rowdata[1]);
            }
            Ext.getCmp("HeatingPipelineDeviceTotalCount_Id").update({
                count: result.totalCount
            });
        },
        failure: function () {
            Ext.MessageBox.alert("错误", "与后台联系的时候出了问题");
        },
        params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 201,
            recordCount: 50,
            orgId: leftOrg_Id,
            page: 1,
            limit: 10000
        }
    });
};

var HeatingPipelineDeviceInfoHandsontableHelper = {
    createNew: function (divid) {
        var heatingPipelineDeviceInfoHandsontableHelper = {};
        heatingPipelineDeviceInfoHandsontableHelper.hot = '';
        heatingPipelineDeviceInfoHandsontableHelper.divid = divid;
        heatingPipelineDeviceInfoHandsontableHelper.validresult = true; //数据校验
        heatingPipelineDeviceInfoHandsontableHelper.colHeaders = [];
        heatingPipelineDeviceInfoHandsontableHelper.columns = [];
        heatingPipelineDeviceInfoHandsontableHelper.dataLength = 0;

        heatingPipelineDeviceInfoHandsontableHelper.AllData = {};
        heatingPipelineDeviceInfoHandsontableHelper.updatelist = [];
        heatingPipelineDeviceInfoHandsontableHelper.delidslist = [];
        heatingPipelineDeviceInfoHandsontableHelper.insertlist = [];
        heatingPipelineDeviceInfoHandsontableHelper.editWellNameList = [];

        heatingPipelineDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'rgb(242, 242, 242)';
        }

        heatingPipelineDeviceInfoHandsontableHelper.createTable = function (data) {
            $('#' + heatingPipelineDeviceInfoHandsontableHelper.divid).empty();
            var hotElement = document.querySelector('#' + heatingPipelineDeviceInfoHandsontableHelper.divid);
            heatingPipelineDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
            	licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
            	data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: false
                },
                columns: heatingPipelineDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: heatingPipelineDeviceInfoHandsontableHelper.colHeaders, //显示列头
                columnSorting: true, //允许排序
                allowInsertRow:false,
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
                    return cellProperties;
                },
                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
                	if(row<0 && row2<0){//只选中表头
                		Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").setValue('');
                    	Ext.getCmp("HeatingPipelineDeviceSelectEndRow_Id").setValue('');
                    	CreateAndLoadHeatingPipelineAuxiliaryDeviceInfoTable(0,'');
                    	CreateAndLoadHeatingPipelineAdditionalInfoTable(0,'');
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
                    	
                    	Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").setValue(startRow);
                    	Ext.getCmp("HeatingPipelineDeviceSelectEndRow_Id").setValue(endRow);
                    	
                    	var row1=heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(startRow);
                    	var recordId=0;
                    	var deviceName='';
                    	if(isNotVal(row1[0])){
                    		recordId=row1[0];
                    	}
                    	if(isNotVal(row1[1])){
                    		deviceName=row1[1];
                    	}
                    	CreateAndLoadHeatingPipelineAuxiliaryDeviceInfoTable(recordId,deviceName);
                    	CreateAndLoadHeatingPipelineAdditionalInfoTable(recordId,deviceName);
                	}
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
                    //封装id成array传入后台
                    if (amount != 0) {
                        for (var i = index; i < amount + index; i++) {
                            var rowdata = heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                            ids.push(rowdata[0]);
                        }
                        heatingPipelineDeviceInfoHandsontableHelper.delExpressCount(ids);
                        heatingPipelineDeviceInfoHandsontableHelper.screening();
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
                            var rowdata = heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
                            params.push(rowdata[0]);
                            params.push(changes[i][1]);
                            params.push(changes[i][2]);
                            params.push(changes[i][3]);

                            if ("edit" == source && params[1] == "wellName") { //编辑井名单元格
                                var data = "{\"oldWellName\":\"" + params[2] + "\",\"newWellName\":\"" + params[3] + "\"}";
                                heatingPipelineDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
                            }

                            if (params[1] == "protocolName" && params[3] == "Kafka协议") {
                                heatingPipelineDeviceInfoHandsontableHelper.hot.getCell(index, 6).source = ['modbus-tcp', 'modbus-rtu'];
                            }

                            //仅当单元格发生改变的时候,id!=null,说明是更新
                            if (params[2] != params[3] && params[0] != null && params[0] > 0) {
                                var data = "{";
                                for (var j = 0; j < heatingPipelineDeviceInfoHandsontableHelper.columns.length; j++) {
                                    data += heatingPipelineDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                                    if (j < heatingPipelineDeviceInfoHandsontableHelper.columns.length - 1) {
                                        data += ","
                                    }
                                }
                                data += "}"
                                heatingPipelineDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
                            }
                        }
                    
                    }
                }
            });
        }
        //插入的数据的获取
        heatingPipelineDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                //id=null时,是插入数据,此时的i正好是行号
                if (idsdata[i] == null || idsdata[i] < 0) {
                    //获得id=null时的所有数据封装进data
                    var rowdata = heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                    //var collength = hot.countCols();
                    if (rowdata != null) {
                        var data = "{";
                        for (var j = 0; j < heatingPipelineDeviceInfoHandsontableHelper.columns.length; j++) {
                            data += heatingPipelineDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                            if (j < heatingPipelineDeviceInfoHandsontableHelper.columns.length - 1) {
                                data += ","
                            }
                        }
                        data += "}"
                        heatingPipelineDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
                    }
                }
            }
            if (heatingPipelineDeviceInfoHandsontableHelper.insertlist.length != 0) {
                heatingPipelineDeviceInfoHandsontableHelper.AllData.insertlist = heatingPipelineDeviceInfoHandsontableHelper.insertlist;
            }
        }
        //保存数据
        heatingPipelineDeviceInfoHandsontableHelper.saveData = function () {
        	var leftOrg_Name=Ext.getCmp("leftOrg_Name").getValue();
        	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
            //插入的数据的获取
            heatingPipelineDeviceInfoHandsontableHelper.insertExpressCount();
            //获取辅件配置数据
            var deviceAuxiliaryData={};
            var HeatingPipelineDeviceSelectRow= Ext.getCmp("HeatingPipelineDeviceSelectRow_Id").getValue();
            if(isNotVal(HeatingPipelineDeviceSelectRow)){
            	var rowdata = heatingPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(HeatingPipelineDeviceSelectRow);
            	var deviceId=rowdata[0];
            	if(isNotVal(deviceId) && parseInt(deviceId)>0 ){
                	deviceAuxiliaryData.deviceType=201;
                	deviceAuxiliaryData.deviceId=deviceId;
                	//辅件设备
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	if(heatingPipelineAuxiliaryDeviceInfoHandsontableHelper!=null && heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
                		var auxiliaryDeviceData=heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                            if (auxiliaryDeviceData[index][0]) {
                            	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                            	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                            }
                        });
                	}
                	//附加信息
                	deviceAuxiliaryData.additionalInfoList=[];
                	if(heatingPipelineAdditionalInfoHandsontableHelper!=null && heatingPipelineAdditionalInfoHandsontableHelper.hot!=undefined){
                		var additionalInfoData=heatingPipelineAdditionalInfoHandsontableHelper.hot.getData();
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
                        //保存以后重置全局容器
                        if(rdata.successCount>0){
                        	heatingPipelineDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadHeatingPipelineDeviceInfoTable();
                        }
                    } else {
                        Ext.MessageBox.alert("信息", "数据保存失败");
                    }
                },
                failure: function () {
                    Ext.MessageBox.alert("信息", "请求失败");
                    heatingPipelineDeviceInfoHandsontableHelper.clearContainer();
                },
                params: {
                    data: JSON.stringify(heatingPipelineDeviceInfoHandsontableHelper.AllData),
                    deviceAuxiliaryData: JSON.stringify(deviceAuxiliaryData),
                    orgId: leftOrg_Id,
                    deviceType: 201
                }
            });
        }

        //修改井名
        heatingPipelineDeviceInfoHandsontableHelper.editWellName = function () {
            //插入的数据的获取
            if (heatingPipelineDeviceInfoHandsontableHelper.editWellNameList.length > 0 && heatingPipelineDeviceInfoHandsontableHelper.validresult) {
                Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/editWellName',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            Ext.MessageBox.alert("信息", "保存成功");
                            heatingPipelineDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadHeatingPipelineDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");
                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        heatingPipelineDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(heatingPipelineDeviceInfoHandsontableHelper.editWellNameList),
                        deviceType:201
                    }
                });
            } else {
                if (!heatingPipelineDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        }


        //删除的优先级最高
        heatingPipelineDeviceInfoHandsontableHelper.delExpressCount = function (ids) {
            //传入的ids.length不可能为0
            $.each(ids, function (index, id) {
                if (id != null) {
                    heatingPipelineDeviceInfoHandsontableHelper.delidslist.push(id);
                }
            });
            heatingPipelineDeviceInfoHandsontableHelper.AllData.delidslist = heatingPipelineDeviceInfoHandsontableHelper.delidslist;
        }

        //updatelist数据更新
        heatingPipelineDeviceInfoHandsontableHelper.screening = function () {
            if (heatingPipelineDeviceInfoHandsontableHelper.updatelist.length != 0 && heatingPipelineDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
                for (var i = 0; i < heatingPipelineDeviceInfoHandsontableHelper.delidslist.length; i++) {
                    for (var j = 0; j < heatingPipelineDeviceInfoHandsontableHelper.updatelist.length; j++) {
                        if (heatingPipelineDeviceInfoHandsontableHelper.updatelist[j].id == heatingPipelineDeviceInfoHandsontableHelper.delidslist[i]) {
                            //更新updatelist
                            heatingPipelineDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
                        }
                    }
                }
                //把updatelist封装进AllData
                heatingPipelineDeviceInfoHandsontableHelper.AllData.updatelist = heatingPipelineDeviceInfoHandsontableHelper.updatelist;
            }
        }

        //更新数据
        heatingPipelineDeviceInfoHandsontableHelper.updateExpressCount = function (data) {
            if (JSON.stringify(data) != "{}") {
                var flag = true;
                //判断记录是否存在,更新数据     
                $.each(heatingPipelineDeviceInfoHandsontableHelper.updatelist, function (index, node) {
                    if (node.id == data.id) {
                        //此记录已经有了
                        flag = false;
                        //用新得到的记录替换原来的,不用新增
                        heatingPipelineDeviceInfoHandsontableHelper.updatelist[index] = data;
                    }
                });
                flag && heatingPipelineDeviceInfoHandsontableHelper.updatelist.push(data);
                //封装
                heatingPipelineDeviceInfoHandsontableHelper.AllData.updatelist = heatingPipelineDeviceInfoHandsontableHelper.updatelist;
            }
        }

        heatingPipelineDeviceInfoHandsontableHelper.clearContainer = function () {
            heatingPipelineDeviceInfoHandsontableHelper.AllData = {};
            heatingPipelineDeviceInfoHandsontableHelper.updatelist = [];
            heatingPipelineDeviceInfoHandsontableHelper.delidslist = [];
            heatingPipelineDeviceInfoHandsontableHelper.insertlist = [];
            heatingPipelineDeviceInfoHandsontableHelper.editWellNameList = [];
        }

        return heatingPipelineDeviceInfoHandsontableHelper;
    }
};

function CreateAndLoadHeatingPipelineAuxiliaryDeviceInfoTable(deviceId,deviceName,isNew){
	if(isNew&&heatingPipelineAuxiliaryDeviceInfoHandsontableHelper!=null){
		if(heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
			heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
		}
		heatingPipelineAuxiliaryDeviceInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getAuxiliaryDevice',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(deviceName)){
				deviceName='';
			}
			Ext.getCmp("HeatingPipelineAuxiliaryDevicePanel_Id").setTitle(deviceName+"辅件设备列表");
			if(heatingPipelineAuxiliaryDeviceInfoHandsontableHelper==null || heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot==undefined){
				heatingPipelineAuxiliaryDeviceInfoHandsontableHelper = HeatingPipelineAuxiliaryDeviceInfoHandsontableHelper.createNew("HeatingPipelineAuxiliaryDeviceTableDiv_id");
				var colHeaders="['','序号','名称','规格型号','']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'name'},{data:'model'},{data:'realId'}]";
				
				heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceId:deviceId,
			deviceType:201
        }
	});
};

var HeatingPipelineAuxiliaryDeviceInfoHandsontableHelper = {
		createNew: function (divid) {
	        var heatingPipelineAuxiliaryDeviceInfoHandsontableHelper = {};
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot1 = '';
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.divid = divid;
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.colHeaders=[];
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.columns=[];
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.AllData=[];
	        
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.divid);
	        	heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: false
	                },
	        		colWidths: [25,50,80,80],
	                columns:heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.columns,
	                columns:heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.colHeaders,//显示列头
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
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.saveData = function () {}
	        heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.clearContainer = function () {
	        	heatingPipelineAuxiliaryDeviceInfoHandsontableHelper.AllData = [];
	        }
	        return heatingPipelineAuxiliaryDeviceInfoHandsontableHelper;
	    }
};

function CreateAndLoadHeatingPipelineAdditionalInfoTable(deviceId,deviceName,isNew){
	if(isNew&&heatingPipelineAdditionalInfoHandsontableHelper!=null){
		if(heatingPipelineAdditionalInfoHandsontableHelper.hot!=undefined){
			heatingPipelineAdditionalInfoHandsontableHelper.hot.destroy();
		}
		heatingPipelineAdditionalInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getDeviceAdditionalInfo',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(deviceName)){
				deviceName='';
			}
			Ext.getCmp("HeatingPipelineAdditionalInfoPanel_Id").setTitle(deviceName+"附加信息");
			if(heatingPipelineAdditionalInfoHandsontableHelper==null || heatingPipelineAdditionalInfoHandsontableHelper.hot==undefined){
				heatingPipelineAdditionalInfoHandsontableHelper = HeatingPipelineAdditionalInfoHandsontableHelper.createNew("HeatingPipelineAdditionalInfoTableDiv_id");
				var colHeaders="['序号','名称','值','单位']";
				var columns="[{data:'id'},{data:'itemName'},{data:'itemValue'},{data:'itemUnit'}]";
				
				heatingPipelineAdditionalInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				heatingPipelineAdditionalInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					heatingPipelineAdditionalInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					heatingPipelineAdditionalInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					heatingPipelineAdditionalInfoHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					heatingPipelineAdditionalInfoHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceId:deviceId,
			deviceType:201
        }
	});
};

var HeatingPipelineAdditionalInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var heatingPipelineAdditionalInfoHandsontableHelper = {};
	        heatingPipelineAdditionalInfoHandsontableHelper.hot = '';
	        heatingPipelineAdditionalInfoHandsontableHelper.divid = divid;
	        heatingPipelineAdditionalInfoHandsontableHelper.colHeaders = [];
	        heatingPipelineAdditionalInfoHandsontableHelper.columns = [];
	        heatingPipelineAdditionalInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(242, 242, 242)';
	        }

	        heatingPipelineAdditionalInfoHandsontableHelper.createTable = function (data) {
	            $('#' + heatingPipelineAdditionalInfoHandsontableHelper.divid).empty();
	            var hotElement = document.querySelector('#' + heatingPipelineAdditionalInfoHandsontableHelper.divid);
	            heatingPipelineAdditionalInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	            	licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	            	data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: false
	                },
	                columns: heatingPipelineAdditionalInfoHandsontableHelper.columns,
	                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true, //显示行头
	                colHeaders: heatingPipelineAdditionalInfoHandsontableHelper.colHeaders, //显示列头
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
	        return heatingPipelineAdditionalInfoHandsontableHelper;
	    }
	};