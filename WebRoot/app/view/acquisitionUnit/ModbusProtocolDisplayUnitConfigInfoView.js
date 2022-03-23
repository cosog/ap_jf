var protocolDisplayUnitAcqItemsConfigHandsontableHelper=null;
var protocolDisplayUnitCalItemsConfigHandsontableHelper=null;
var protocolDisplayUnitPropertiesHandsontableHelper=null;
Ext.define('AP.view.acquisitionUnit.ModbusProtocolDisplayUnitConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolDisplayUnitConfigInfoView',
    layout: "fit",
    id:'modbusProtocolDisplayUnitConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	Ext.apply(me, {
    		items: [{
            	tbar: [{
                    id: 'ModbusProtocolDisplayUnitConfigSelectRow_Id',
                    xtype: 'textfield',
                    value: 0,
                    hidden: true
                },'->',{
        			xtype: 'button',
                    text: '添加显示单元',
                    iconCls: 'add',
                    handler: function (v, o) {
                    	addDisplayUnitInfo();
        			}
        		},"-",{
                	xtype: 'button',
        			text: cosog.string.save,
        			iconCls: 'save',
        			handler: function (v, o) {
        				SaveModbusProtocolDisplayUnitConfigTreeData();
        			}
                }],
                layout: "border",
                items: [{
                	border: true,
                	region: 'west',
                	width:'20%',
                    layout: "border",
                    border: true,
                    header: false,
                    collapsible: true,
                    split: true,
                    collapseDirection: 'left',
                    hideMode:'offsets',
                    items: [{
                    	region: 'center',
                    	title:'显示单元配置',
                        scrollable: true,
                    	id:"ModbusProtocolDisplayUnitConfigPanel_Id"
                    },{
                    	region: 'south',
                    	height:'42%',
                    	title:'属性',
                    	collapsible: true,
                        split: true,
                    	layout: 'fit',
                        html:'<div class="ModbusProtocolDisplayUnitPropertiesTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolDisplayUnitPropertiesTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(protocolDisplayUnitPropertiesHandsontableHelper!=null && protocolDisplayUnitPropertiesHandsontableHelper.hot!=undefined){
                            		protocolDisplayUnitPropertiesHandsontableHelper.hot.refreshDimensions();
                            	}
                            }
                        }
                    }]
                },{
                	border: true,
                	region: 'center',
                	layout: "border",
                	items: [{
                		region: 'center',
                		title:'采集项配置',
                		id:"ModbusProtocolDisplayUnitAcqItemsConfigTableInfoPanel_Id",
                        layout: 'fit',
                        html:'<div class="ModbusProtocolDisplayUnitAcqItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolDisplayUnitAcqItemsConfigTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(protocolDisplayUnitAcqItemsConfigHandsontableHelper!=null && protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot!=undefined){
                            		protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot.refreshDimensions();
                            	}
                            }
                        }
                	},{
                		region: 'south',
                    	height:'50%',
                    	title:'计算项配置',
                    	collapsible: true,
                        split: true,
                    	layout: 'fit',
                    	id:"ModbusProtocolDisplayUnitCalItemsConfigTableInfoPanel_Id",
                        layout: 'fit',
                        html:'<div class="ModbusProtocolDisplayUnitCalItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolDisplayUnitCalItemsConfigTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(protocolDisplayUnitCalItemsConfigHandsontableHelper!=null && protocolDisplayUnitCalItemsConfigHandsontableHelper.hot!=undefined){
                            		protocolDisplayUnitCalItemsConfigHandsontableHelper.hot.refreshDimensions();
                            	}
                            }
                        }
                	}]
                    
                }]
            }]
    	});
        this.callParent(arguments);
    }
});

function CreateProtocolDisplayUnitAcqItemsConfigInfoTable(protocolName,classes,code,type){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getProtocolDisplayUnitItemsConfigData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolDisplayUnitAcqItemsConfigHandsontableHelper==null || protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot==undefined){
				protocolDisplayUnitAcqItemsConfigHandsontableHelper = ProtocolDisplayUnitAcqItemsConfigHandsontableHelper.createNew("ModbusProtocolDisplayUnitAcqItemsConfigTableInfoDiv_id");
				var colHeaders="['','序号','名称','地址','读写类型','单位','解析模式','显示级别','显示顺序','实时曲线','实时曲线颜色','历史曲线','历史曲线曲线']";
				var columns="[" 
						+"{data:'checked',type:'checkbox'}," 
						+"{data:'id'}," 
						+"{data:'title'},"
					 	+"{data:'addr',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolDisplayUnitAcqItemsConfigHandsontableHelper);}},"
						+"{data:'RWType',type:'dropdown',strict:true,allowInvalid:false,source:['只读', '读写']}," 
						+"{data:'unit'},"
						+"{data:'resolutionMode',type:'dropdown',strict:true,allowInvalid:false,source:['开关量', '枚举量','数据量']}," 
						+"{data:'showLevel',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,protocolDisplayUnitAcqItemsConfigHandsontableHelper);}}," 
						+"{data:'sort',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,protocolDisplayUnitAcqItemsConfigHandsontableHelper);}}," 
						+"{data:'isRealtimeCurve',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,protocolDisplayUnitAcqItemsConfigHandsontableHelper);}}," 
						+"{data:'realtimeCurveColor'},"
						+"{data:'isHistoryCurve',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,protocolDisplayUnitAcqItemsConfigHandsontableHelper);}},"
						+"{data:'historyCurveColor'},"
						+"{data:'bitIndex'}"
						+"]";
				
				protocolDisplayUnitAcqItemsConfigHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolDisplayUnitAcqItemsConfigHandsontableHelper.columns=Ext.JSON.decode(columns);
//				if(result.totalRoot.length==0){
//					protocolDisplayUnitAcqItemsConfigHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
//				}else{
//					protocolDisplayUnitAcqItemsConfigHandsontableHelper.createTable(result.totalRoot);
//				}
				protocolDisplayUnitAcqItemsConfigHandsontableHelper.createTable(result.totalRoot);
			}else{
//				if(result.totalRoot.length==0){
//					protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
//				}else{
//					protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot.loadData(result.totalRoot);
//				}
				protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			protocolName:protocolName,
			classes:classes,
			code:code,
			type:type
        }
	});
};

var ProtocolDisplayUnitAcqItemsConfigHandsontableHelper = {
		createNew: function (divid) {
	        var protocolDisplayUnitAcqItemsConfigHandsontableHelper = {};
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot1 = '';
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.divid = divid;
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.validresult=true;//数据校验
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.colHeaders=[];
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.columns=[];
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.AllData=[];
	        
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.addCurveBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            if(value!=null){
	            	td.style.backgroundColor = '#'+value;
	            }
	            
	            
	            
	        }
	        
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolDisplayUnitAcqItemsConfigHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolDisplayUnitAcqItemsConfigHandsontableHelper.divid);
	        	protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot = new Handsontable(hotElement, {
	        		licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	        		data: data,
	        		hiddenColumns: {
	                    columns: [13],
	                    indicators: false
	                },
	        		colWidths: [25,50,140,60,80,80,80,60,60,60,70,60,70],
	                columns:protocolDisplayUnitAcqItemsConfigHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolDisplayUnitAcqItemsConfigHandsontableHelper.colHeaders,//显示列头
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
	                    var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ModbusProtocolDisplayUnitConfigSelectRow_Id").getValue();
	                	if(ScadaDriverModbusConfigSelectRow!=''){
	                		var selectedItem=Ext.getCmp("ModbusProtocolDisplayUnitConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
	                		if(selectedItem.data.classes!=3){
	                			cellProperties.readOnly = true;
	                		}else{
	                			if (visualColIndex >=1 && visualColIndex<=6) {
	    							cellProperties.readOnly = true;
	    		                }else if(visualColIndex==10||visualColIndex==12){
	    		                	cellProperties.renderer = protocolDisplayUnitAcqItemsConfigHandsontableHelper.addCurveBg;
	    		                }
	                		}
	                	}
	                    return cellProperties;
	                },
	                afterBeginEditing:function(row,column){
	                	var row1=protocolDisplayUnitAcqItemsConfigHandsontableHelper.hot.getDataAtRow(row);
	                	if(row1[0] && (column==10||column==12)){
	                		var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ModbusProtocolDisplayUnitConfigSelectRow_Id").getValue();
	                		if(ScadaDriverModbusConfigSelectRow!=''){
	                			var selectedItem=Ext.getCmp("ModbusProtocolDisplayUnitConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
	                			if(selectedItem.data.classes==3 && selectedItem.data.type==0){
	                				var CurveColorSelectWindow=Ext.create("AP.view.acquisitionUnit.CurveColorSelectWindow");
	                				Ext.getCmp("curveColorSelectedRow_Id").setValue(row);
	                				Ext.getCmp("curveColorSelectedCol_Id").setValue(column);
	                				CurveColorSelectWindow.show();
	                				var value=row1[column];
	                				if(value==null||value==''){
	                					value='ff0000';
	                				}
	                				Ext.getCmp('CurveColorSelectWindowColor_id').setValue(value);
                		        	var BackgroundColor=Ext.getCmp('CurveColorSelectWindowColor_id').color;
                		        	BackgroundColor.a=1;
                		        	Ext.getCmp('CurveColorSelectWindowColor_id').setColor(BackgroundColor);
	                			}
	                		}
	                	}
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                	
	                }
	        	});
	        }
	        //保存数据
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.saveData = function () {}
	        protocolDisplayUnitAcqItemsConfigHandsontableHelper.clearContainer = function () {
	        	protocolDisplayUnitAcqItemsConfigHandsontableHelper.AllData = [];
	        }
	        return protocolDisplayUnitAcqItemsConfigHandsontableHelper;
	    }
};


function CreateProtocolDisplayUnitConfigPropertiesInfoTable(data){
	var root=[];
	if(data.classes==2){
		var item1={};
		item1.id=1;
		item1.title='单元名称';
		item1.value=data.text;
		root.push(item1);
		
		var item2={};
		item2.id=2;
		item2.title='采控单元';
		item2.value=data.acqUnitName;
		root.push(item2);
		
		var item3={};
		item3.id=3;
		item3.title='备注';
		item3.value=data.remark;
		root.push(item3);
	}
	
	if(protocolDisplayUnitPropertiesHandsontableHelper==null || protocolDisplayUnitPropertiesHandsontableHelper.hot==undefined){
		protocolDisplayUnitPropertiesHandsontableHelper = ProtocolDisplayUnitPropertiesHandsontableHelper.createNew("ModbusProtocolDisplayUnitPropertiesTableInfoDiv_id");
		var colHeaders="['序号','名称','变量']";
		var columns="[{data:'id'},{data:'title'},{data:'value'}]";
		protocolDisplayUnitPropertiesHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
		protocolDisplayUnitPropertiesHandsontableHelper.columns=Ext.JSON.decode(columns);
		protocolDisplayUnitPropertiesHandsontableHelper.classes=data.classes;
		protocolDisplayUnitPropertiesHandsontableHelper.createTable(root);
	}else{
		protocolDisplayUnitPropertiesHandsontableHelper.classes=data.classes;
		protocolDisplayUnitPropertiesHandsontableHelper.hot.loadData(root);
	}
};

var ProtocolDisplayUnitPropertiesHandsontableHelper = {
		createNew: function (divid) {
	        var protocolDisplayUnitPropertiesHandsontableHelper = {};
	        protocolDisplayUnitPropertiesHandsontableHelper.hot = '';
	        protocolDisplayUnitPropertiesHandsontableHelper.classes =null;
	        protocolDisplayUnitPropertiesHandsontableHelper.divid = divid;
	        protocolDisplayUnitPropertiesHandsontableHelper.validresult=true;//数据校验
	        protocolDisplayUnitPropertiesHandsontableHelper.colHeaders=[];
	        protocolDisplayUnitPropertiesHandsontableHelper.columns=[];
	        protocolDisplayUnitPropertiesHandsontableHelper.AllData=[];
	        
	        protocolDisplayUnitPropertiesHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolDisplayUnitPropertiesHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolDisplayUnitPropertiesHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolDisplayUnitPropertiesHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolDisplayUnitPropertiesHandsontableHelper.divid);
	        	protocolDisplayUnitPropertiesHandsontableHelper.hot = new Handsontable(hotElement, {
	        		licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	        		data: data,
	        		colWidths: [2,3,5],
	                columns:protocolDisplayUnitPropertiesHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolDisplayUnitPropertiesHandsontableHelper.colHeaders,//显示列头
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
	                    if (visualColIndex ==0 || visualColIndex ==1) {
							cellProperties.readOnly = true;
							cellProperties.renderer = protocolDisplayUnitPropertiesHandsontableHelper.addBoldBg;
		                }
	                    if(protocolDisplayUnitPropertiesHandsontableHelper.classes===1){
	                    	if (visualColIndex === 2 && visualRowIndex===1) {
		                    	this.type = 'dropdown';
		                    	this.source = ['抽油机','螺杆泵'];
		                    	this.strict = true;
		                    	this.allowInvalid = false;
		                    }
	                    }else if(protocolDisplayUnitPropertiesHandsontableHelper.classes===3){
	                    	if (visualColIndex === 2 && visualRowIndex===1) {
		                    	this.type = 'dropdown';
		                    	this.source = ['采集组','控制组'];
		                    	this.strict = true;
		                    	this.allowInvalid = false;
		                    }
	                    }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        protocolDisplayUnitPropertiesHandsontableHelper.saveData = function () {}
	        protocolDisplayUnitPropertiesHandsontableHelper.clearContainer = function () {
	        	protocolDisplayUnitPropertiesHandsontableHelper.AllData = [];
	        }
	        return protocolDisplayUnitPropertiesHandsontableHelper;
	    }
};


function SaveModbusProtocolDisplayUnitConfigTreeData(){
	var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ModbusProtocolDisplayUnitConfigSelectRow_Id").getValue();
	if(ScadaDriverModbusConfigSelectRow!=''){
		var selectedItem=Ext.getCmp("ModbusProtocolDisplayUnitConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
		var propertiesData=protocolDisplayUnitPropertiesHandsontableHelper.hot.getData();
		var protocolProperties={};
		if(selectedItem.data.classes==2){//选中的是采控单元
			protocolProperties.classes=selectedItem.data.classes;
			protocolProperties.id=selectedItem.data.id;
			protocolProperties.unitCode=selectedItem.data.code;
			protocolProperties.unitName=propertiesData[0][2];
			protocolProperties.remark=propertiesData[1][2];
		}else if(selectedItem.data.classes==3){//选中的是采控单元组
			protocolProperties.classes=selectedItem.data.classes;
			protocolProperties.id=selectedItem.data.id;
			protocolProperties.groupCode=selectedItem.data.code;
			protocolProperties.groupName=propertiesData[0][2];
			protocolProperties.typeName=propertiesData[1][2];
			if(selectedItem.data.type==0){//采集组
				protocolProperties.acqCycle=propertiesData[2][2];
				protocolProperties.saveCycle=propertiesData[3][2];
				protocolProperties.remark=propertiesData[4][2];
			}else if(selectedItem.data.type==1){//控制组
//				protocolProperties.acqCycle=propertiesData[2][2];
//				protocolProperties.saveCycle=propertiesData[3][2];
				protocolProperties.remark=propertiesData[2][2];
			}
			
		}
		if(selectedItem.data.classes==2){//保存采控单元
			var acqUnitSaveData={};
			acqUnitSaveData.updatelist=[];
			acqUnitSaveData.updatelist.push(protocolProperties);
			saveDisplayUnitConfigData(acqUnitSaveData,selectedItem.data.protocol,selectedItem.parentNode.data.deviceType);
		}
		
		if(selectedItem.data.classes==3){//选中的是采控单元组
			var acqGroupSaveData={};
			acqGroupSaveData.updatelist=[];
			acqGroupSaveData.updatelist.push(protocolProperties);
			
			saveDisplayGroupConfigData(acqGroupSaveData,selectedItem.data.protocol,selectedItem.parentNode.data.id);
			//给采控组授予采控项
			grantDisplayItemsPermission();
		}
		
	}
};

function saveModbusProtocolConfigData(configInfo){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveModbusProtocolConfigData',
		success:function(response) {
			var data=Ext.JSON.decode(response.responseText);
			protocolDisplayUnitAcqItemsConfigHandsontableHelper.clearContainer();
			if (data.success) {
            	Ext.MessageBox.alert("信息","保存成功");
            	Ext.getCmp("ModbusProtocolDisplayUnitConfigTreeGridPanel_Id").getStore().load();
            } else {
            	Ext.MessageBox.alert("信息","数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
		},
		params: {
			data:JSON.stringify(configInfo)
        }
	});
}

function saveDisplayUnitConfigData(acqUnitSaveData,protocol,deviceType){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveDisplayUnitHandsontableData',
		success:function(response) {
			rdata=Ext.JSON.decode(response.responseText);
			if (rdata.success) {
            	Ext.MessageBox.alert("信息","保存成功");
            	Ext.getCmp("ModbusProtocolDisplayUnitConfigTreeGridPanel_Id").getStore().load();
            } else {
            	Ext.MessageBox.alert("信息","采控单元数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
            displayUnitConfigHandsontableHelper.clearContainer();
		},
		params: {
        	data: JSON.stringify(acqUnitSaveData),
        	protocol: protocol,
        	deviceType:deviceType
        }
	});
}

function saveDisplayGroupConfigData(acqGroupSaveData,protocol,unitId){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveDisplayGroupHandsontableData',
		success:function(response) {
			rdata=Ext.JSON.decode(response.responseText);
			if (rdata.success) {
            	Ext.MessageBox.alert("信息","保存成功");
            	Ext.getCmp("ModbusProtocolDisplayUnitConfigTreeGridPanel_Id").getStore().load();
            } else {
            	Ext.MessageBox.alert("信息","采控组数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
		},
		params: {
        	data: JSON.stringify(acqGroupSaveData),
        	protocol: protocol,
        	unitId: unitId
        }
	});
};
