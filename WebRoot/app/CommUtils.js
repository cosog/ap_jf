// ////// 操作公用方法//////////////
var sfycjhh=true;
copyright=cosog.string.copy+"&nbsp;<a href='"+cosog.string.linkaddress+"' target='_blank'>"+cosog.string.linkshow+"</a> ";
graghMinWidth = 300;
defaultWellComboxSize=10000;
comboxPagingStatus=0;//0-不分页  大于0分页
isShowMap=true;//是否显示地图 true-显示   false-不显示
recordCount=1000;//后台电子表格总行数
//定时器
var realtimeInterval,realtimeGraphicalInterval;
var MonitorRATast=Ext.TaskManager.newTask({
	interval: 1000,
	run: function () {
		var activeId = Ext.getCmp("frame_center_ids").getActiveTab().id;
		if (activeId == "monitorRA_MonitorRAPanel") {
			Ext.create('AP.store.monitorRA.MonitorRAAnalysisDataStore');
		}
	}
});
createPageBbar=function(store){
	     //分页工具栏
 var bbar = new Ext.PageNumberToolbar({
					    store:store,
						pageSize :defaultPageSize,	
						displayInfo : true,
						displayMsg : cosog.string.currentRecord,
						emptyMsg : cosog.string.nodataDisplay,
						prevText : cosog.string.lastPage,
						nextText : cosog.string.nextPage,
						refreshText : cosog.string.refresh,
						lastText : cosog.string.finalPage,
						firstText : cosog.string.firstPage,
						beforePageText : cosog.string.currentPage,
						afterPageText :cosog.string.gong
					});	
			return  bbar;
}
/**
 * xx.trim()
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * text:specialkey 回车事件 e:文本对象 name:刷新对象
 */
RefreshEnter = function(e, name) {
	if (e.getKey() == Ext.EventObject.ENTER) {
		reFreshg(name);
	}
	return false;
};

// 处理Tree树递归取值
var selectresult = [];
function selectEachTreeFn(chlidArray) {
	var ch_length;
	var ch_node = chlidArray.childNodes;
	if (isNotVal(ch_node)) {
		ch_length = ch_node.length;
	} else {
		ch_length = chlidArray.length;
	}
	if (ch_length > 0) {
		if (!Ext.isEmpty(chlidArray)) {
			Ext.Array.each(chlidArray, function(childArrNode, index, fog) {
						var x_node_seId = fog[index].data.orgId;
						selectresult.push(x_node_seId);
						// 递归
						if (childArrNode.childNodes != null) {
							selectEachTreeFn(childArrNode.childNodes);
						}
					});
		}
	} else {
		if (isNotVal(chlidArray)) {
			var x_node_seId = chlidArray.data.orgId;
			selectresult.push(x_node_seId);
		}
	}
	return selectresult.join(",");
};

//处理Tree树text递归取值
var selectReeTextRsult = [];
function selectEachTreeText(chlidArray) {
	var ch_length;
	var ch_node = chlidArray.childNodes;
	if (isNotVal(ch_node)) {
		ch_length = ch_node.length;
	} else {
		ch_length = chlidArray.length;
	}
	if (ch_length > 0) {
		if (!Ext.isEmpty(chlidArray)) {
			Ext.Array.each(chlidArray, function(childArrNode, index, fog) {
						var x_node_seId = fog[index].data.text;
						selectReeTextRsult.push(""+x_node_seId+"");
						// 递归
						if (childArrNode.childNodes != null) {
							selectEachTreeText(childArrNode.childNodes);
						}
					});
		}
	} else {
		if (isNotVal(chlidArray)) {
			var x_node_seId = chlidArray.data.text;
			selectReeTextRsult.push(""+x_node_seId+"");
		}
	}
	return selectReeTextRsult.join(",");
};

getNoilTabId = function() {
	var tab_ = Ext.getCmp("frame_center")
	var tab_s = tab_.getActiveTab();
	return tab_s.id;
}
ExtDelspace_ObjectInfo=function(space,grid_id,row,data_id,action_name){	
           // 删除条件
        var deletejson = [];
      
		Ext.Array.each(row, function(name, index, countriesItSelf) {
			deletejson.push(row[index].get(data_id));
		}) 
		var delparamsId=""+deletejson.join(","); 
		 
        // AJAX提交方式
		Ext.Ajax.request({
					url : context+'/'+space+'/'+action_name+'',					
					method : "POST",
					// 提交参数
					params : {
						paramsId : delparamsId
					},
					success :  function(response) {					 
						var result =  Ext.JSON.decode(response.responseText);
						if(result.flag ==true){ 
							//刷新Grid
							var g_spl=grid_id.split(",");
							if(isNotBank(g_spl)){
							 for(var g=0;g<g_spl.length;g++){
							    Ext.getCmp(g_spl[g]).getStore().load();
							 } 
							} 
					 	    Ext.Msg.alert('提示', "【<font color=blue>成功删除</font>】，" + row.length + "条数据信息。");
						}
					 	if(result.flag ==false){		 		 
					 		Ext.Msg.msg('提示', "<font color=red>SORRY！删除失败。</font>");
					 	}
					 	  
					},
					failure : function() {
						    Ext.Msg.alert("提示", "【<font color=red>异常抛出 </font>】：请与管理员联系！");			    
					}
				});
	  return false;
    };
/**
 * 判断是否为空值
 */
isNullVal = function(val) {
	var result = "";
	if (val == "" || val == "null" || val == "undefined" || val == undefined || val == null) {
		result = '';
	} else {
		result = val;
	}
	return result;
}
/**
 * 是否为空值
 */
isNotVal = function(val) {
	var result = false;
	if (val == "" || val == "null" || val == "undefined" || val == undefined || val == null) {
		result = false;
	} else {
		result = true;
	}
	return result;
}

/**
 * 是否为数值
 */
isNumber = function(val) {
	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }
}
function isNumber2(val) {
	return !isNaN(Number(val))
}
/**
 * 判断字符串是否已特定字符结尾
 */
function stringEndWith(sourceStr,endStr){
    var d=sourceStr.length-endStr.length;
    return (d>=0&&sourceStr.lastIndexOf(endStr)==d);
}

/**
 * object 转 stirng
 * 
 * @param o
 * @return
 */
function obj2str(o) {
	var r = [];
	if (typeof o == "string" || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{"
			for (var i in o) {
				r[r.length] = i;
				r[r.length] = ":";
				r[r.length] = obj2str(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "}"
		} else {
			r[0] = "["
			for (var i = 0; i < o.length; i++) {
				r[r.length] = obj2str(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "]"
		}
		return r.join("");
	}
	return o.toString();
}
/**
 * string 转 object
 * 
 * @param json
 * @return
 */
function strToObj(json) {
	return eval("(" + json + ")");
}

/**
 * 对复选框的树，返回选中的节点
 * 
 * @param {Object}
 *            tree 选择的树
 * @param {Object}
 *            from 返回值的节点属性
 * @param {Object}
 *            split 分割字符串
 * @return {TypeName}
 */
function getChecked(tree, from, split) {
	var records = tree.getView().getChecked();
	names = [];
	Ext.Array.each(records, function(rec) {
				names.push(rec.get(from));
			});
	return names.join(split);
}
/**
 * 得到选中的节点数
 * 
 * @param {Object}
 *            tree
 * @return {TypeName}
 */
function getCheckedCount(tree) {
	var returnValue = 0;
	var records = tree.getView().getChecked();
	Ext.Array.each(records, function(rec) {
				returnValue++;
			});
	return returnValue;
}
/**
 * 判断是否为叶子节点
 * 
 * @param {Object}
 *            rec
 * @return {TypeName}
 */
function isLeaf(rec) {
	return rec.get('leaf');
}
/**
 * 得到父节点
 * 
 * @param {Object}
 *            rec
 * @param {Object}
 *            from
 * @return {TypeName}
 */
function getParentNode(rec, from) {
	return rec.parentNode.get(from);
}
/**
 * 得到选中节点的一级节点
 * 
 * @param {Object}
 *            rec
 * @param {Object}
 *            from
 * @param {Object}
 *            split
 * @return {TypeName}
 */
function getSonNode(rec, from, split) {
	var records = rec.childNodes;
	results = [];
	Ext.Array.each(records, function(rec) {
				results.push(rec.get(from));
			});
	return results.join(split);
}

// 验证对象不能空值
// 解决对象信息空值不存等情况
isNotBank = function(val) {
	if (val != null && val != "" && val != "null") {
		return true;
	} else {
		return false;
	}
};

// 将时间转化为 2011-08-20 00:00:00 格式
// 解决Ext4的formPanel通过grid的store查询问题
function dateFormat(value) {
	var val = "";
	// value='2013-11-04 08:40:01';
	if (value != null) {
		if (Ext.isIE) {
			return value;
		} else {
			return Ext.Date.format(new Date(value), 'Y-m-d H:i:s');
		}
	} else {
		return val;
	}
};
function dateTimeFormat(value) {
	var val = "";
	// value='2013-11-04 08:40:01';
	if (value != null) {
		if (Ext.isIE) {
		return	Ext.Date.format(new Date(value), 'Y-m-d H:i:s');
			//return value;
		} else {
			return Ext.Date.format(new Date(value), 'Y-m-d H:i:s');
		}
	} else {
		return val;
	}
};
function dateFormatNotDa(value) {
	if (value != null) {
		return Ext.Date.format(new Date(value), 'Y-m-d');
	} else {
		return null;
	}
};
// 验证规则
Ext.form.VTypes["loginnum_z"] = /^[A-Za-z]{1,}$/;
Ext.form.VTypes["loginnum_x"] = /^[0-9]{1,}$/;
Ext.form.VTypes["loginnum_Val"] = /^[A-Za-z0-9]{6,}$/;
// 提示信息
Ext.form.VTypes["loginnum_Text"] = "密码必须是：数字和字符的组合,长度大于6~位。";
// 做验证时要执行的函数，根据函数的返回值来判断验证成功与否
Ext.form.VTypes["loginnum_"] = function(v) {
	if (!Ext.form.VTypes["loginnum_Val"].test(v)) {
		return false;
	}
	if (Ext.form.VTypes["loginnum_z"].test(v)) {
		return false;
	}
	if (Ext.form.VTypes["loginnum_x"].test(v)) {
		return false;
	}
	return true;
};
/**
 * 时间格式处理-不同浏览器时间显示问题
 * 
 * @param value
 * @returns {String}
 */
function getFormatDate(value) {
	var result = "";
	if (value != null && value != "" && value != "null") {

		if (Ext.isIE) {
			var ie_val = value.split(" ");
			result = ie_val[0];

		} else {
			var ie_val = dateFormatNotDa(value).split(" ");
			result = ie_val[0];

		}
	}
	return result;
}
// Window 公共关闭方法
closeWindow = function(o) {
	var winobj = Ext.getCmp(o.closewin);
	if (isNotBank(winobj)) {
		winobj.close();
	} else {
		Ext.Msg.alert("提示", "<font color=red>异常</font>：关闭WINDOW窗体,给出的对象不存在。")
	}
};

// GridPanel 公共刷新方法
// params :gridpanel_id 名称
reFreshg = function(grid_id) {
	Ext.getCmp(grid_id).getStore().load();
};

// 等待信息框
LoadingWin = function(msg) {
	Ext.MessageBox.show({
				msg : '<div style="padding-top:20px">' + msg + ', 请稍后...</div>',
				progressText : '加载中...',
				width : 300,
				wait : true,
				waitConfig : {
					interval : 200
				},
				icon : 'ext-mb-download'
			});
	setTimeout(function() {
				Ext.MessageBox.close();
			}, 3000);
}

// GridPanel 公共删除方法
// params :grid的Id,row 选中行,data_id 删除对象的Id,刷新的action 名称
ExtDel_ObjectInfo = function(grid_id, row, data_id, action_name) {
	// 删除条件
	var deletejson = [];
	Ext.Array.each(row, function(name, index, countriesItSelf) {
		if(row[index].get(data_id)>0){
			deletejson.push(row[index].get(data_id));
		}		
	});
	if(deletejson.length>0){
		var delparamsId = "" + deletejson.join(",");
		Ext.Ajax.request({
			url : action_name,
			method : "POST",
			params : {
				paramsId : delparamsId
			},
			success : function(response) {
				var result = Ext.JSON.decode(response.responseText);
				Ext.MessageBox.msgButtons['ok'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'"
						+ context
						+ "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
				if (result.flag == true) {
					Ext.Msg.alert('提示', "【<font color=blue>成功删除</font>】"+ row.length + "条数据信息。");
				}
				if (result.flag == false) {
					Ext.Msg.alert('提示', "<font color=red>SORRY！删除失败。</font>");
				}
				if(grid_id=="OrgInfoTreeGridView_Id"){
					var store=Ext.getCmp(grid_id).getStore()
	                store.proxy.extraParams.tid = 0;
	                store.load();
				}
				Ext.getCmp(grid_id).getStore().load();
			},
			failure : function() {
				Ext.Msg.alert("提示", "【<font color=red>异常抛出 </font>】：请与管理员联系！");
			}
		});
	}else{
		Ext.Msg.alert('提示', "<font color=red>所选属性无效，删除失败。</font>");
	}
	return false;
};

var clearOrgHiddenValue = function() {
	var obj = Ext.getCmp("orgName_Parent_Id");
	if (obj != undefined) {
		obj.setValue("0");
	}
	var obj_module = Ext.getCmp("mdName_Parent_Id");
	if (obj_module != undefined) {
		obj_module.setValue("0");
	}
}

function createNewPanel(panelUrl) {
	var panelUrl = Ext.create(panelUrl);
	return panelUrl;
}

function showPanel(o) {
	var tabPanel = Ext.getCmp("frame_center_ids");// 获取到中央面板对象
	tabPanel.removeAll();// 清除掉以前的grid，
	var uss_ = Ext.create(o);
	tabPanel.add(uss_);// 重新添加一个新的grid
}

iconHistoryQueryDetailsData = function(value, e, o) {
	var recordId=o.data.id;
	var wellName=o.data.wellName;
	var deviceId=o.data.deviceId;
	var resultstring="<a href=\"javascript:void(0)\" style=\"text-decoration:none;\" onclick=callBackHistoryData(\""+recordId+"\",\""+deviceId+"\",\""+wellName+"\")>详细...</a>";
	return resultstring;
}

iconDiagnoseTotalCurve = function(value, e, o) {
	var itemCode = o.data.itemCode;
	var item=o.data.item;
	var index=o.internalId%2;
	var resultstring = "<img src='"
			+ context
			+ "/images/icon/curvetest"+index+".png' style='cursor:pointer' onclick=callBackTotalHistoryData(\""+item+"\",\""+itemCode+"\") />";
	return resultstring;
}

var callBackGraphical = function(type,id) {
    Ext.getCmp('graphicalOnclickType_Id').setValue(type);
    Ext.getCmp('graphicalOnclick_Id').setValue(id);
    var GraphicalOnclickWindow=Ext.create("AP.view.graphicalQuery.GraphicalOnclickWindow", {
				    html:'<div id='+type+id+' style="width:100%;height:100%;"></div>' // 图形类型+数据id作为div的id
			   });
    GraphicalOnclickWindow.show();
}

var callBackHistoryData = function(recordId,deviceId,wellName) {
	var HistoryQueryDataDetailsWindow = Ext.create("AP.view.historyQuery.HistoryQueryDataDetailsWindow");
	Ext.getCmp("HistoryQueryDataDetailsWindowRecord_Id").setValue(recordId);
	Ext.getCmp("HistoryQueryDataDetailsWindowDeviceId_Id").setValue(deviceId);
	Ext.getCmp("HistoryQueryDataDetailsWindowDeviceName_Id").setValue(wellName);
	HistoryQueryDataDetailsWindow.show();
}

function openExcelWindow(url) {
	// window.navigate(url);
	document.location.href = url;
}
function exportExcelWindow(url) {
	var appWindow = window.open(url); // 调action得到数据生成execl格式的数据，response发往前台
	appWindow.focus();
}

function exportGridPanelExcelData(gridId,url,fileName,title){
	var store=Ext.getCmp(gridId).getStore();
	var total=store.getCount();
	var jsonArray = [];
	for(var i=0;i<total;i++){
		jsonArray.push(store.getAt(i).data);
	}
	var data=JSON.stringify(jsonArray);
    var fields = "";
    var heads = "";
    var gridPanel = Ext.getCmp(gridId);
    var items_ = gridPanel.items.items;
    if(items_.length==1){//无锁定列时
    	var columns_ = gridPanel.columns;
    	Ext.Array.each(columns_, function (name,
                index, countriesItSelf) {
                var locks = columns_[index];
                if (index > 0 && locks.hidden == false) {
                    fields += locks.dataIndex + ",";
                    heads += locks.text + ",";
                }
            });
    }else{
    	Ext.Array.each(items_, function (name, index,
                countriesItSelf) {
                var datas = items_[index];
                var columns_ = datas.columns;
                if (index == 0) {
                    Ext.Array.each(columns_, function (name,
                        index, countriesItSelf) {
                        var locks = columns_[index];
                        if (index > 0 && locks.hidden == false) {
                            fields += locks.dataIndex + ",";
                            heads += locks.text + ",";
                        }
                    });
                } else {
                    Ext.Array.each(columns_, function (name,
                        index, countriesItSelf) {
                        var headers_ = columns_[index];
                        if (headers_.hidden == false) {
                            fields += headers_.dataIndex + ",";
                            heads += headers_.text + ",";
                        }
                    });
                }
            });
    }
    if (isNotVal(fields)) {
        fields = fields.substring(0, fields.length - 1);
        heads = heads.substring(0, heads.length - 1);
    }
    fields = "id," + fields;
    heads = "序号," + heads;
    var param = "&heads=" + heads +"&fields=" + fields+"&data=" + data+"&fileName=" + fileName+"&title=" + title;
    param=param.replace(/#/g,"%23").replace(/%/g,"%25");
    openExcelWindow(url+'?flag=true&' + param);
}

onEnterKeyDownFN = function(field, e, panelId) {
	if (e.getKey() == e.ENTER) {
		// var filed_ = field.rawValue;
		Ext.getCmp(panelId).getStore().load();
		field.collapse();
	}
}
onTreeEnterKeyDownFN = function(field, e, panelId) {
	if (e.getKey() == e.ENTER) {
		// var filed_ = field.rawValue;
		Ext.getCmp(panelId).store.load();
		// field.collapse();
	}
}

var mychart = "";
function initCurveChartFn(catagories, series, tickInterval, divId, title, ytitle, ytitle1) {
	mychart = new Highcharts.Chart({
				chart : {
					type : 'spline',
					renderTo : divId,
					shadow : true,
					borderWidth : 0,
					zoomType : 'xy'
				},
				credits : {
					enabled : false
				},
				title : {
					text : title,
					x : -20
				},
				xAxis : {
					categories : catagories,
					tickInterval : tickInterval,
					title : {
						text : cosog.string.date
					}
				},
				yAxis : [{
							lineWidth : 1,
							min:0,
							title : {
								text : ytitle,
								style : {
									color : '#000000',
									fontWeight : 'bold'
								}
							},
							labels : {
								formatter : function() {
									return Highcharts.numberFormat(this.value,
											2);
								}
							},
							plotLines : [{
										value : 0,
										width : 1,
										zIndex:2,
										color : '#808080'
									}]
						}, {
							lineWidth : 1,
							min:0,
							max:100,
							opposite : true,
							labels : {
								formatter : function() {
									return Highcharts.numberFormat(this.value,
											2);
								}
							},
							title : {
								text : ytitle1,
								style : {
									color : '#000000',
									fontWeight : 'bold'
								}
							}
						}],
				tooltip : {
					crosshairs : true,
					enabled : true,
					style : {
						color : '#333333',
						fontSize : '12px',
						padding : '8px'
					},
					formatter : function() {
						return '<b>' + this.series.name + '</b><br/>' + this.x
								+ ': ' + this.y;
					},
					valueSuffix : ''
				},
//				  exporting: {
//			            buttons: {
//			                contextButton: {
//			                    menuItems: [{
//			                        separator: true
//			                    }]
//			                    .concat(Highcharts.getOptions().exporting.buttons.contextButton.menuItems)
//			                    .concat([{
//			                        separator: true
//			                    }
//			                    ])
//			                }
//			            }
//			        },
				exporting:{    
                    enabled:true,    
                    filename:'class-booking-chart',    
                    url:context + '/exportHighcharsPicController/export'
               },
				plotOptions : {
					 spline: {  
				            lineWidth: 1,  
				            fillOpacity: 0.3,  
				             marker: {  
				             enabled: true,  
				              radius: 3,  //曲线点半径，默认是4
				                states: {  
				                   hover: {  
				                        enabled: true,  
				                        radius: 6
				                    }  
				                }  
			            },  
			            shadow: true  
			        } 
				},
				legend : {
					layout : 'vertical',
					align : 'right',
					verticalAlign : 'middle',
					borderWidth : 1
				},
				series : series
			});
}
function initCurveChartFn1(catagories, series, tickInterval, divId, title, ytitle, ytitle1) {
	mychart = new Highcharts.Chart({
				chart : {
					type : 'spline',
					renderTo : divId,
					shadow : true,
					borderWidth : 0,
					zoomType : 'xy'
				},
				credits : {
					enabled : false
				},
				title : {
					text : title,
					x : -20
				},
				xAxis : {
					categories : catagories,
					tickInterval : tickInterval,
					title : {
						text : cosog.string.date
					}
				},
				yAxis : [{
							lineWidth : 1,
							min:0,
							title : {
								text : ytitle,
								style : {
									color : '#000000',
									fontWeight : 'bold'
								}
							},
							labels : {
								formatter : function() {
									return Highcharts.numberFormat(this.value,
											2);
								}
							},
							plotLines : [{
										value : 0,
										width : 1,
										zIndex:2,
										color : '#808080'
									}]
						}, {
							lineWidth : 1,
							min:0,
							max:1,
							opposite : true,
							labels : {
								formatter : function() {
									return Highcharts.numberFormat(this.value,
											2);
								}
							},
							title : {
								text : ytitle1,
								style : {
									color : '#000000',
									fontWeight : 'bold'
								}
							}
						}],
				tooltip : {
					crosshairs : true,
					enabled : true,
					style : {
						color : '#333333',
						fontSize : '12px',
						padding : '8px'
					},
					formatter : function() {
						return '<b>' + this.series.name + '</b><br/>' + this.x
								+ ': ' + this.y;
					},
					valueSuffix : ''
				},
//				  exporting: {
//			            buttons: {
//			                contextButton: {
//			                    menuItems: [{
//			                        separator: true
//			                    }]
//			                    .concat(Highcharts.getOptions().exporting.buttons.contextButton.menuItems)
//			                    .concat([{
//			                        separator: true
//			                    }
//			                    ])
//			                }
//			            }
//			        },
				exporting:{    
                    enabled:true,    
                    filename:'class-booking-chart',    
                    url:context + '/exportHighcharsPicController/export'
               },
				plotOptions : {
					 spline: {  
				            lineWidth: 1,  
				            fillOpacity: 0.3,  
				             marker: {  
				             enabled: true,  
				              radius: 3,  //曲线点半径，默认是4
				                states: {  
				                   hover: {  
				                        enabled: true,  
				                        radius: 6
				                    }  
				                }  
			            },  
			            shadow: true  
			        } 
				},
				legend : {
					layout : 'vertical',
					align : 'right',
					verticalAlign : 'middle',
					borderWidth : 1
				},
				series : series
			});
}

// 生产曲线初始化函数
function initCurveChart(years, values, tickInterval, divId) {
	mychart = new Highcharts.Chart({
				chart : {
					renderTo : divId,
					type : 'spline',
					shadow : true,
					//alignTicks: false,
					borderWidth : 0,
					zoomType : 'xy'
				},
				credits : {
					enabled : false
				},
				title : {
					text :cosog.string.clqx,
					x : -20
					// center
				},
				colors : ['#800000',// 红
						'#008C00',// 绿
						'#000000',// 黑
						'#0000FF',// 蓝
						'#F4BD82',// 黄
						'#FF00FF'// 紫
				],
				xAxis : {
					categories : years,
					tickInterval : tickInterval,
					title : {
						text : cosog.string.date
					}
				},
				yAxis : [{
							lineWidth : 1,
							min:0,
							//max:200,
							title : {
								text : cosog.string.cl,
								style : {
									color : '#000000',
									fontWeight : 'bold'
								}
							},
							labels : {
								formatter : function() {
									return Highcharts.numberFormat(this.value,
											2);
								}
							},
							plotLines : [{
										value : 0,
										width : 1,
										zIndex:2,
										color : '#808080'
									}]
						}, {
							lineWidth : 1,
							min:0,
							max:100,
							opposite : true,
							labels : {
								formatter : function() {
									return Highcharts.numberFormat(this.value,
											2);
								}
							},
							title : {
								text : cosog.string.hsl,
								style : {
									color : '#000000',
									fontWeight : 'bold'
								}
							}
						}],
				tooltip : {
					crosshairs : true,
					enabled : true,
					style : {
						color : '#333333',
						fontSize : '12px',
						padding : '8px'
					},
					formatter : function() {
						return '<b>' + this.series.name + '</b><br/>' + this.x
								+ ': ' + this.y;
					},
					valueSuffix : ''
				},
//				  exporting: {
//			            buttons: {
//			                contextButton: {
//			                    menuItems: [{
//			                        separator: true
//			                    }]
//			                    .concat(Highcharts.getOptions().exporting.buttons.contextButton.menuItems)
//			                    .concat([{
//			                        separator: true
//			                    }
//			                    ])
//			                }
//			            }
//			        },
				exporting:{    
                    enabled:true,    
                    filename:'class-booking-chart',    
                    url:context + '/exportHighcharsPicController/export'
               },
				plotOptions : {
					 spline: {  
				            lineWidth: 1,  
				            fillOpacity: 0.3,  
				             marker: {  
				             enabled: true,  
				              radius: 3,  //曲线点半径，默认是4
                             //symbol: 'triangle' ,//曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
				                states: {  
				                   hover: {  
				                        enabled: true,  
				                        radius: 6
				                    }  
				                }  
			            },  
			            shadow: true  
			        } 
				},
				legend : {
					layout : 'vertical',
					align : 'right',
					verticalAlign : 'middle',
					borderWidth : 1
				},
				series : values
			});
}
/**
 * Curve chart
 */
CurveVFnChartFn = function(store, divId) {
	var items = store.data.items;
	var tickInterval = 1;
	tickInterval = Math.floor(items.length / 4) + 1;
	var catagories = "[";
	for (var i = 0; i < items.length; i++) {
		catagories += "\"" + getFormatDate(items[i].data.jssj) + "\"";
		if (i < items.length - 1) {
			catagories += ",";
		}
	}
	catagories += "]";
	var legendName = [cosog.string.rpzsl, cosog.string.sjrzsl];
	var series = "[";
	for (var i = 0; i < legendName.length; i++) {
		series += "{\"name\":\"" + legendName[i] + "\",";
		series += "\"data\":[";
		for (var j = 0; j < items.length; j++) {
			if (i == 0) {
				series += items[j].data.rpzrl;
			} else if (i == 1) {
				series += items[j].data.sjrzrl;
			}
			if (j != items.length - 1) {
				series += ",";
			}
		}
		series += "]}";
		if (i != legendName.length - 1) {
			series += ",";
		}
	}
	series += "]";
	var cat = Ext.JSON.decode(catagories);
	var ser = Ext.JSON.decode(series);
	initWaterCurveChart(cat, ser, tickInterval, divId);
}

// 后台退出函数
function backLoginOut() {
	Ext.MessageBox.msgButtons['yes'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'"
			+ context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
	Ext.MessageBox.msgButtons['no'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'"
			+ context + "/images/zh_CN/cancel.png'/>&nbsp;&nbsp;&nbsp;取消";
	Ext.Msg.confirm("提示", "是否确定退出后台管理系统？", function(btn) {
		if (btn == "yes") {
			LoadingWin("正在退出");
			// 动态返回当前用户拥有哪些角色信息
			// 动态返回当前用户拥有哪些角色信息
			Ext.Ajax.request({
						method : 'POST',
						url : context
								+ '/userLoginManagerController/userExit',
						success : function(response, opts) {
							// 处理后
							var obj = Ext.decode(response.responseText);
							if (isNotVal(obj)) {
								if (obj.flag) {
									window.location.href = context
											+ "/login/toBackLogin";
								}

							}
						},
						failure : function(response, opts) {
							Ext.Msg.alert("信息提示", "后台获取数据失败！");
						}
					});
		}
	});
}

var userLoginOut = function() {
	Ext.MessageBox.msgButtons['yes'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'"
			+ context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
	Ext.MessageBox.msgButtons['no'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'"
			+ context + "/images/zh_CN/cancel.png'/>&nbsp;&nbsp;&nbsp;取消";
	Ext.Msg.confirm("提示", "是否确定退出本系统？", function(btn) {
		if (btn == "yes") {
			LoadingWin("正在退出");
			// 动态返回当前用户拥有哪些角色信息
			Ext.Ajax.request({
						method : 'POST',
						url : context+ '/userLoginManagerController/userExit',
						success : function(response, opts) {
							// 处理后
							var obj = Ext.decode(response.responseText);
							if (isNotVal(obj)) {
								if (obj.flag) {
									window.location.href = context+ "/login/toLogin";
								}

							}
						},
						failure : function(response, opts) {
							Ext.Msg.alert("信息提示", "后台获取数据失败！");
						}
					});
		}
	});
}


function senfe(o, a, b, c, d) {
	var tab = document.getElementById(o);
	var t = tab.getElementsByTagName("tr");
	for (var i = 0; i < t.length; i++) {
		t[i].style.backgroundColor = (t[i].sectionRowIndex % 2 == 0) ? a : b;
		t[i].onclick = function() {
			if (this.x != "1") {
				this.x = "1";// 本来打算直接用背景色判断，FF获取到的背景是RGB值，不好判断
				this.style.backgroundColor = d;
			} else {
				this.x = "0";
				this.style.backgroundColor = (this.sectionRowIndex % 2 == 0)
						? a
						: b;
			}
		}
		t[i].onmouseover = function() {
			if (this.x != "1")
				this.style.backgroundColor = c;
		}
		t[i].onmouseout = function() {
			if (this.x != "1")
				this.style.backgroundColor = (this.sectionRowIndex % 2 == 0)
						? a
						: b;
		}
	}
}

// 报警设置铃铛的切换
alarmSetType = function(val) {
	if (val == 0) {
		return '<img src="' + context
				+ '/images/icon/alarm-greed.png" style="cursor:pointer"/>';
	} else {
		return '<img src="' + context
				+ '/images/icon/alarm-red.png" style="cursor:pointer"/>';
	}
}
alarmType = function(val) {
	// alert(val);
	if (val == 0) {
		return "<img src='" + context
				+ "/images/icon/normal.png' style='cursor:pointer'/>";
	} else {
		return "<img src='" + context
				+ "/images/icon/exception.png' style='cursor:pointer'/>";
	}
}

alarmLevelColor = function(val) {
	// alert(val);
	if (val == 0) {
		return "<img src='" + context
				+ "/images/icon/alarmcolor/exception0.png' style='cursor:pointer'/>";
	}else if(val==100){
		return "<img src='" + context
		+ "/images/icon/alarmcolor/exception1.png' style='cursor:pointer'/>";
	}else if(val==200){
		return "<img src='" + context
		+ "/images/icon/alarmcolor/exception2.png' style='cursor:pointer'/>";
	}else if(val==300){
		return "<img src='" + context
		+ "/images/icon/alarmcolor/exception3.png' style='cursor:pointer'/>";
	} 
	else {
		return "<img src='" + context
		+ "/images/icon/alarmcolor/exception4.png' style='cursor:pointer'/>";
	}
}

// 保留2为小数
function changeTwoDecimal(x) {
	var f_x = x;
	if (isNaN(f_x)) {
		// alert('function:changeTwoDecimal->parameter error');
		return "";
	}
	if (f_x === "") {
		f_x = "";
	} else {
		var f_x = Math.round(x * 100) / 100;
	}
	return f_x;
}
// 取值判空后返回值
function obtainParams(id) {
	var result = Ext.getCmp(id);
	if (!Ext.isEmpty(result)) {
		result = result.getValue();
	}
	return result;
}
// 拼接标准功图及功图id
function constructLayerIDs(idStr_, bzgtbhs_) {
	var ids_ = "";
	var firstId_ = idStr_.split(",");
	if (isNotVal(bzgtbhs_) && bzgtbhs_[0] != firstId_[0]) {
		ids_ = bzgtbhs_[0] + ',' + idStr_;
	} else {
		ids_ = idStr_;
	}
	return ids_;
}

// 字符串去重
function distinctGTBHStr(val) {
	var datas = val.split(",");
	var str = datas[0];
	for (var i = 1; i < datas.length; i++) {
		if (datas[i] != datas[0]) {
			str += "," + datas[i];
		}
	}
	return str;
}
// 级联
treeComBox = function(node, checked) {
	if (!checked) {

		// 展开选中的节点
		node.expand();
		// 设置节点选中
		node.checked = false;
		// 设置选择节点下所有子节点
		node.eachChild(function(child) {
					child.set('checked', false);
					var childArray = child.childNodes;
					childTree(childArray, false);
				});
		// 如果所有的子节点被选中，父节点也应该被选中
		parentTree(node, false);

	} else {
		// 展开选中的节点
		node.expand();
		// 设置节点选中
		node.checked = true;
		// 设置选择节点下所有子节点
		node.eachChild(function(child) {
					child.set('checked', true);
					var childArray = child.childNodes;
					childTree(childArray, true);
				});
		// 如果所有的子节点被选中，父节点也应该被选中
		parentTree(node, true);

	};
};
// 递归子节点
function childTree(chlidArray, checked) {
	if (!Ext.isEmpty(chlidArray)) {
		Ext.Array.each(chlidArray, function(childArrNode, index, fog) {
					childArrNode.set('checked', checked);
					if (childArrNode.childNodes != null) {
						childTree(childArrNode.childNodes, checked);
					}
				});
	}
};
// 递归父节点
function parentTree(rootTree, checked) {
	var node = rootTree.parentNode;
	if (node.raw != null && node.raw != null) {
		if (!Ext.isEmpty(node) && node.data.mdId != "0") {
			// 当前节点是否选择状态，响效父节点
			if (checked) {
				node.data.checked = checked;
				// node.set('checked', checked);
				// node('checked', true);
				// node.set({checked:checked});
				// node.set({checked:checked});
				// node.set('checked', true);
				node.set('loaded', true);
				if (node != null) {
					parentTree(node, checked);
				}
			} else {
				var falsestr = [];
				var arr = node.childNodes;
				Ext.Array.each(arr, function(arrNode, index, fog) {
							var chfalse = arr[index].data.checked;
							if (!chfalse) {
								falsestr.push(chfalse);
							}
						});
				if (falsestr.length == arr.length) {
					node.data.checked = checked;
					// node.set('checked', checked);
					// node('checked', true);
					// node.set('checked', true);
					// node.set({checked:checked});
					node.set('loaded', true);
					if (node != null) {
						parentTree(node, checked);
					}
				}
			}
		}
	}
};

function checkedNode(node, checked) {
	node.expand();
	node.checked = checked;
	node.eachChild(function(child) {
				child.set('checked', checked);
				checkedNode(child, checked);
				child.fireEvent('checkchange', child, checked);
			});
}

// 添加监听 设置树的节点选择的级联关系
var listenerCheck = function(node, checked) {
	childHasChecked(node, checked);
	var parentNode = node.parentNode;
	if (parentNode != null) {
//		parentCheck(parentNode, checked);
	}
};
// 级联选中父节点
var parentCheck = function(node, checked) {
	var childNodes = node.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		if (childNodes[i].get('checked')) {
			node.set('checked', checked);
			continue;
		} else {
			node.set('checked', false);
			break;
		}
	};
	var parentNode = node.parentNode;
	if (parentNode != null) {
		parentCheck(parentNode, checked);
	}
}
// 级联选择子节点
var childHasChecked = function(node, checked) {
	node.cascadeBy(function(child) {
				child.set("checked", checked)
			});
}

color16ToRgba = function(sColor,Opacity){
    var sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return "rgba(" + sColorChange.join(",") + ","+Opacity+")";
    }
    return sColor;
};


 adviceColor = function(val,o,p,e) {
// 	alert(p.data.bjbz);o.style='background-color:#FF0000;color:#FFFFFF;';
	if(val==undefined||val=="undefined"){
		 val="";
	}
	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue());
 	var alarmLevel=p.data.resultAlarmLevel;
 	var tipval=val;
 	if(p.data.resultString!=undefined&&p.data.resultString!=''){
 		tipval=p.data.resultString;
 	}
 	var BackgroundColor='#FFFFFF';
 	var Colorr='#000000';
 	var Opacity=1;
 	if (alarmLevel == 0) {
 		BackgroundColor='#'+AlarmShowStyle.Data.Normal.BackgroundColor;
 		Colorr='#'+AlarmShowStyle.Data.Normal.Color;
 		Opacity=AlarmShowStyle.Data.Normal.Opacity;
	}else if (alarmLevel == 100) {
		BackgroundColor='#'+AlarmShowStyle.Data.FirstLevel.BackgroundColor;
 		Colorr='#'+AlarmShowStyle.Data.FirstLevel.Color;
 		Opacity=AlarmShowStyle.Data.FirstLevel.Opacity;
	}else if (alarmLevel == 200) {
		BackgroundColor='#'+AlarmShowStyle.Data.SecondLevel.BackgroundColor;
 		Colorr='#'+AlarmShowStyle.Data.SecondLevel.Color;
 		Opacity=AlarmShowStyle.Data.SecondLevel.Opacity;
	}else if (alarmLevel == 300) {
		BackgroundColor='#'+AlarmShowStyle.Data.ThirdLevel.BackgroundColor;
 		Colorr='#'+AlarmShowStyle.Data.ThirdLevel.Color;
 		Opacity=AlarmShowStyle.Data.ThirdLevel.Opacity;
	}
 	var rgba=color16ToRgba(BackgroundColor,Opacity);
 	o.style='background-color:'+rgba+';color:'+Colorr+';';
	return '<span data-qtip="'+tipval+'" data-dismissDelay=10000>'+val+'</span>';
}
 
 adviceTimeFormat = function(val,o,p,e) {
	 	var reslut="";
	 	val=val.split(".")[0];
	 	var reslut=val;
	    return '<span data-qtip="'+reslut+'">'+reslut+'</span>';
	}
 
 adviceStatTableCommStatusColor = function(val,o,p,e) {
	 	var itemCode=p.data.itemCode;
	 	var tipval=val;
	 	var alarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue());
	 	var backgroundColor='#FFFFFF';
	 	var color='#000000';
	 	var opacity=1;
	 	var alarmLevel=0;
	 	if(itemCode.toUpperCase()=='offline'.toUpperCase()){
	 		alarmLevel=100;
	 	}
	 	if (alarmLevel == 100) {
	 		backgroundColor='#'+alarmShowStyle.Statistics.FirstLevel.BackgroundColor;
	 		color='#'+alarmShowStyle.Statistics.FirstLevel.Color;
	 		opacity=alarmShowStyle.Statistics.FirstLevel.Opacity
		}else if (alarmLevel == 200) {
	 		backgroundColor='#'+alarmShowStyle.Statistics.SecondLevel.BackgroundColor;
	 		color='#'+alarmShowStyle.Statistics.SecondLevel.Color;
	 		opacity=alarmShowStyle.Statistics.SecondLevel.Opacity
		}else if (alarmLevel == 300) {
	 		backgroundColor='#'+alarmShowStyle.Statistics.ThirdLevel.BackgroundColor;
	 		color='#'+alarmShowStyle.Statistics.ThirdLevel.Color;
	 		opacity=alarmShowStyle.Statistics.ThirdLevel.Opacity
		}
	 	var rgba=color16ToRgba(backgroundColor,opacity);
	 	o.style='background-color:'+rgba+';color:'+color+';';
	 	return '<span data-qtip="'+tipval+'" data-dismissDelay=10000>'+val+'</span>';
	}
 
 adviceCommStatusColor = function(val,o,p,e) {
	 	var commStatus=p.data.commStatus;
	 	var tipval=val;
	 	var alarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue());
	 	var alarmLevel=p.data.commAlarmLevel;
	 	var backgroundColor='#FFFFFF';
	 	var color='#000000';
	 	var opacity=1;
	 	if (commStatus == 0) {
	 		backgroundColor='#'+alarmShowStyle.Comm.offline.BackgroundColor;
	 		color='#'+alarmShowStyle.Comm.offline.Color;
	 		opacity=alarmShowStyle.Comm.offline.Opacity
		}else if (commStatus == 1) {
			backgroundColor='#'+alarmShowStyle.Comm.online.BackgroundColor;
	 		color='#'+alarmShowStyle.Comm.online.Color;
	 		opacity=alarmShowStyle.Comm.online.Opacity
		}
	 	var rgba=color16ToRgba(backgroundColor,opacity);
	 	o.style='background-color:'+rgba+';color:'+color+';';
//		if (commStatus == 1) {
//			return '<span data-qtip="在线">在线</span>';
//		} else {
//			return '<span data-qtip="离线">离线</span>';
//		}
	 	return '<span data-qtip="'+tipval+'" data-dismissDelay=10000>'+val+'</span>';
	}
 
 adviceRunStatusColor = function(val,o,p,e) {
	 	var commStatus=p.data.commStatus;
	 	var runStatus=p.data.runStatus;
	 	var tipval=val;
	 	var alarmLevel=p.data.runAlarmLevel;
	 	var alarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue());
		if (commStatus == 0) {
//			o.css='pendingColor';
			return '';
		} else {
			var backgroundColor='#FFFFFF';
		 	var color='#000000';
		 	var opacity=1;
		 	if (alarmLevel == 0) {
		 		backgroundColor='#'+alarmShowStyle.Data.Normal.BackgroundColor;
		 		color='#'+alarmShowStyle.Data.Normal.Color;
		 		opacity=alarmShowStyle.Data.Normal.Opacity
			}else if (alarmLevel == 100) {
				backgroundColor='#'+alarmShowStyle.Data.FirstLevel.BackgroundColor;
				color='#'+alarmShowStyle.Data.FirstLevel.Color;
				opacity=alarmShowStyle.Data.FirstLevel.Opacity
			}else if (alarmLevel == 200) {
				backgroundColor='#'+alarmShowStyle.Data.SecondLevel.BackgroundColor;
				color='#'+alarmShowStyle.Data.SecondLevel.Color;
				opacity=alarmShowStyle.Data.SecondLevel.Opacity
			}else if (alarmLevel == 300) {
				backgroundColor='#'+alarmShowStyle.Data.ThirdLevel.BackgroundColor;
				color='#'+alarmShowStyle.Data.ThirdLevel.Color;
				opacity=alarmShowStyle.Data.ThirdLevel.Opacity
			}
		 	var rgba=color16ToRgba(backgroundColor,opacity);
		 	o.style='background-color:'+rgba+';color:'+color+';';
//			if(runStatus==1){
//				return '<span data-qtip="运行">运行</span>';
//			}else{
//				return '<span data-qtip="停止">停止</span>';
//			}
		 	return '<span data-qtip="'+tipval+'" data-dismissDelay=10000>'+val+'</span>';
		}
	}
 adviceDataColor = function(val,o,p,e) {
	 	var alarmInfo=p.data.alarmInfo;
	 	if(val==undefined){
	 		val='';
	 	}
	 	var tipval=val;
	 	var alarmLevel=p.data.runAlarmLevel;
	 	var alarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue());
	 	var column=o.column.dataIndex;
	 	var alarmLevel=0;
	 	if(isNotVal(alarmInfo)&&alarmInfo.length>0){
	 		for(var i=0;i<alarmInfo.length;i++){
	 			if(column.toUpperCase()==alarmInfo[i].item.toUpperCase()){
	 				var backgroundColor='#FFFFFF';
	 			 	var color='#000000';
	 			 	var opacity=1;
	 			 	alarmLevel=alarmInfo[i].alarmLevel;
	 			 	if (alarmLevel == 0) {
	 			 		backgroundColor='#'+alarmShowStyle.Data.Normal.BackgroundColor;
	 			 		color='#'+alarmShowStyle.Data.Normal.Color;
	 			 		opacity=alarmShowStyle.Data.Normal.Opacity
	 				}else if (alarmLevel == 100) {
	 					backgroundColor='#'+alarmShowStyle.Data.FirstLevel.BackgroundColor;
	 					color='#'+alarmShowStyle.Data.FirstLevel.Color;
	 					opacity=alarmShowStyle.Data.FirstLevel.Opacity
	 				}else if (alarmLevel == 200) {
	 					backgroundColor='#'+alarmShowStyle.Data.SecondLevel.BackgroundColor;
	 					color='#'+alarmShowStyle.Data.SecondLevel.Color;
	 					opacity=alarmShowStyle.Data.SecondLevel.Opacity
	 				}else if (alarmLevel == 300) {
	 					backgroundColor='#'+alarmShowStyle.Data.ThirdLevel.BackgroundColor;
	 					color='#'+alarmShowStyle.Data.ThirdLevel.Color;
	 					opacity=alarmShowStyle.Data.ThirdLevel.Opacity
	 				}
	 			 	if(alarmLevel>0){
	 			 		var rgba=color16ToRgba(backgroundColor,opacity);
		 			 	o.style='background-color:'+rgba+';color:'+color+';';
	 			 	}
	 				break;
	 			}
	 		}
	 	}
	 	if(alarmLevel==0){
	    	var backgroundColor = '#' + alarmShowStyle.Data.Normal.BackgroundColor;
	    	var color = '#' + alarmShowStyle.Data.Normal.Color;
	    	var opacity = alarmShowStyle.Data.Normal.Opacity;
	    	var rgba = color16ToRgba(backgroundColor, opacity);
            o.style = 'background-color:' + rgba + ';color:' + color + ';';
	    }
	 	return '<span data-qtip="'+tipval+'" data-dismissDelay=10000>'+val+'</span>';
	}
 
 adviceRealtimeMonitoringDataColor = function (val, o, p, e) {
	    var alarmInfo = p.data.alarmInfo;
	    var alarmLevel=0;
	    var alarmShowStyle = Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue());
	    var column = o.column.dataIndex;
	    if (isNotVal(alarmInfo) && alarmInfo.length > 0) {
	        for (var i = 0; i < alarmInfo.length; i++) {
	            if (column.toUpperCase() == alarmInfo[i].item.toUpperCase()) {
	                if(alarmInfo[i].alarmType==2){//数据量报警
	                	if(val!=undefined){
	                		var backgroundColor = '#FFFFFF';
	    	                var color = '#000000';
	    	                var opacity = 1;
	    	                alarmLevel=0;
	    	                if(parseFloat(val)>(parseFloat(alarmInfo[i].upperLimit)+parseFloat(alarmInfo[i].hystersis))
	    	                		|| parseFloat(val)<(parseFloat(alarmInfo[i].lowerLimit)-parseFloat(alarmInfo[i].hystersis))){
	    	                	alarmLevel = alarmInfo[i].alarmLevel;
	    	                }
	    	                if (alarmLevel == 0) {
	    	                    backgroundColor = '#' + alarmShowStyle.Data.Normal.BackgroundColor;
	    	                    color = '#' + alarmShowStyle.Data.Normal.Color;
	    	                    opacity = alarmShowStyle.Data.Normal.Opacity;
	    	                } else if (alarmLevel == 100) {
	    	                    backgroundColor = '#' + alarmShowStyle.Data.FirstLevel.BackgroundColor;
	    	                    color = '#' + alarmShowStyle.Data.FirstLevel.Color;
	    	                    opacity = alarmShowStyle.Data.FirstLevel.Opacity;
	    	                } else if (alarmLevel == 200) {
	    	                    backgroundColor = '#' + alarmShowStyle.Data.SecondLevel.BackgroundColor;
	    	                    color = '#' + alarmShowStyle.Data.SecondLevel.Color;
	    	                    opacity = alarmShowStyle.Data.SecondLevel.Opacity;
	    	                } else if (alarmLevel == 300) {
	    	                    backgroundColor = '#' + alarmShowStyle.Data.ThirdLevel.BackgroundColor;
	    	                    color = '#' + alarmShowStyle.Data.ThirdLevel.Color;
	    	                    opacity = alarmShowStyle.Data.ThirdLevel.Opacity;
	    	                }
	    	                if(alarmLevel>0){
	    	 			 		var rgba=color16ToRgba(backgroundColor,opacity);
	    		 			 	o.style='background-color:'+rgba+';color:'+color+';';
	    	 			 	}
	                	}
	                	break;
	                }else if(alarmInfo[i].alarmType==1){//枚举量报警
	                	if(val!=undefined){
	                		var backgroundColor = '#FFFFFF';
	    	                var color = '#000000';
	    	                var opacity = 1;
	    	                alarmLevel=0;
	    	                if(val==alarmInfo[i].alarmValue || val==alarmInfo[i].alarmValueMeaning){
	    	                	alarmLevel = alarmInfo[i].alarmLevel;
	    	                	if (alarmLevel == 0) {
		    	                    backgroundColor = '#' + alarmShowStyle.Data.Normal.BackgroundColor;
		    	                    color = '#' + alarmShowStyle.Data.Normal.Color;
		    	                    opacity = alarmShowStyle.Data.Normal.Opacity;
		    	                } else if (alarmLevel == 100) {
		    	                    backgroundColor = '#' + alarmShowStyle.Data.FirstLevel.BackgroundColor;
		    	                    color = '#' + alarmShowStyle.Data.FirstLevel.Color;
		    	                    opacity = alarmShowStyle.Data.FirstLevel.Opacity;
		    	                } else if (alarmLevel == 200) {
		    	                    backgroundColor = '#' + alarmShowStyle.Data.SecondLevel.BackgroundColor;
		    	                    color = '#' + alarmShowStyle.Data.SecondLevel.Color;
		    	                    opacity = alarmShowStyle.Data.SecondLevel.Opacity;
		    	                } else if (alarmLevel == 300) {
		    	                    backgroundColor = '#' + alarmShowStyle.Data.ThirdLevel.BackgroundColor;
		    	                    color = '#' + alarmShowStyle.Data.ThirdLevel.Color;
		    	                    opacity = alarmShowStyle.Data.ThirdLevel.Opacity;
		    	                }
	    	                	if(alarmLevel>0){
	    		 			 		var rgba=color16ToRgba(backgroundColor,opacity);
	    			 			 	o.style='background-color:'+rgba+';color:'+color+';';
	    		 			 	}
		    	                break;
	    	                }
	                	}
	                }
	            }
	        }
	    }
	    if(alarmLevel==0){
	    	var backgroundColor = '#' + alarmShowStyle.Data.Normal.BackgroundColor;
	    	var color = '#' + alarmShowStyle.Data.Normal.Color;
	    	var opacity = alarmShowStyle.Data.Normal.Opacity;
	    	var rgba = color16ToRgba(backgroundColor, opacity);
            o.style = 'background-color:' + rgba + ';color:' + color + ';';
	    }
	    if (val == undefined) {
	        val = '';
	    }
	    var tipval = val;
	    return '<span data-qtip="' + tipval + '" data-dismissDelay=10000>' + val + '</span>';
	}

 adviceHistoryWellDataColor = function(val,o,p,e) {
	 	//alert(val);
	 	var bjjb=p.data.bjjb;
		if (bjjb != 0) {
			return '<font style="color:red;">'+val+'</font>';
		} else {
			return '<font style="color:black;">'+val+'</font>';
		}
	}
	
 getBackgroundColor = function(val,o,p,e) {
	 return '<div style="background:'+p.data.bjys+';">'+val+'</div>';
	}

  var onStoreSizeChange=function (v,o,conId) {
	  var cmp=Ext.getCmp(conId);
	  if(isNotVal(cmp)){
		  cmp.update({count: v.getTotalCount()});
	  }
  }
  
  var updateTotalRecords=function (total,conId) {
	  var cmp=Ext.getCmp(conId);
	  if(isNotVal(cmp)){
		  cmp.update({count: total});
	  }
  }
      
  
  var onLabelSizeChange=function (v,o,conId) {
      //Ext.getCmp(conId).update({count: v.getTotalCount()});
      document.getElementById(conId).innerText=v.getTotalCount();
     
    }

//刷新grid数据信息
autoRefreshPanelView=function(panelId){
	var jqzRealTimePanel_Id=Ext.getCmp(panelId);
	var tree_store=jqzRealTimePanel_Id.getStore();
	if(!tree_store.isLoading()){
		tree_store.load();
	}
}

// 生成Grid-Fields
createGridPanelColumn = function(columnInfo) {
	var myArr = columnInfo;
	var myColumns = "[";
	for (var i = 0; i < myArr.length; i++) {
		var attr = myArr[i];
		var width_="";
		var lock_="";
		var hidden_="";
		if(isNotVal(attr.lock)){
//			lock_=",locked:"+attr.lock;
		}
		if(isNotVal(attr.hidden==true)){
			hidden_=",hidden:"+attr.hidden;
		}
		if(isNotVal(attr.width)){
			width_=",width:"+attr.width;
		}
		myColumns += "{text:'" + attr.header + "'";
		if (attr.dataType == 'timestamp') {
			myColumns +=lock_+width_+ ",sortable : false,align:'center'" + ",dataIndex:'" + attr.dataIndex+ "',renderer:function(value){return dateFormat(value);}";
		} else if (attr.dataIndex == 'id'||attr.dataIndex=="jh as id") {
			myColumns += lock_+width_+",xtype: 'rownumberer',sortable : false,align:'center'";
		} else {
			myColumns +=hidden_+lock_+width_+ ",sortable : false,align:'center',dataIndex:'"+ attr.dataIndex + "'";
		}
		myColumns += "}";
		if (i < myArr.length - 1) {
			myColumns += ",";
		}
	}
	myColumns += "]";
	return myColumns;
}
//生成Grid-Fields 创建grid 的columns信息
createDiagStatisticsColumn = function(columnInfo) {
	var myArr = columnInfo;
	var myColumns = "[";
	for (var i = 0; i < myArr.length; i++) {
		var attr = myArr[i];
		var width_="";
		var flex_ = "";
		var lock_="";
		var hidden_="";
		if(isNotVal(attr.lock)){
//			lock_=",locked:"+attr.lock;
		}
		if(isNotVal(attr.hidden==true)){
			hidden_=",hidden:"+attr.hidden;
		}
		if(isNotVal(attr.width)){
			width_=",width:"+attr.width;
		}
		if (isNotVal(attr.flex)) {
        	flex_ = ",flex:" + attr.flex;
        }
		myColumns +="{text:'" + attr.header + "'"+width_+flex_;
		 if (attr.dataIndex=='id'){
		  myColumns +=",xtype: 'rownumberer',sortable:false,align:'center',locked:false" ;
		}else if(attr.dataIndex=='gtcjsj'||"updatetime"==attr.dataIndex){
			myColumns +=hidden_+lock_+",sortable : false,align:'center',dataIndex:'"+attr.dataIndex+"',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')";
		}else if(attr.dataIndex=='gxrq'){
			myColumns +=hidden_+lock_+",sortable : false,align:'center',dataIndex:'"+attr.dataIndex+"',renderer:Ext.util.Format.dateRenderer('Y-m-d')";
		}else {
			myColumns +=hidden_+lock_+",align:'center',dataIndex:'"+attr.dataIndex+"'";
		}
		myColumns += "}";
		if (i < myArr.length - 1) {
			myColumns += ",";
		}
	}
	myColumns +="]";
	return myColumns;
}

//生成可编辑表格表头
createEditGridColumn = function(columnInfo) {
	var myArr = columnInfo;
	var myColumns = "[";
	for (var i = 0; i < myArr.length; i++) {
		var attr = myArr[i];
		var width_="";
		var lock_="";
		var hidden_="";
		if(isNotVal(attr.lock)){
//			lock_=",locked:"+attr.lock;
		}
		if(isNotVal(attr.hidden==true)){
			hidden_=",hidden:"+attr.hidden;
		}
		if(isNotVal(attr.width)){
			width_=",width:"+attr.width;
		}
		myColumns +="{text:'" + attr.header + "'";
		 if (attr.dataIndex=='id'){
		  myColumns +=",width:"+attr.width+",xtype: 'rownumberer',sortable:false,align:'center',locked:false" ;
		}else if(attr.dataIndex=='gtcjsj'||"updatetime"==attr.dataIndex){
			myColumns +=hidden_+lock_+width_+",sortable : false,align:'center',dataIndex:'"+attr.dataIndex+"',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')";
		}else if(attr.dataIndex=='gxrq'){
			myColumns +=hidden_+lock_+width_+",sortable : false,align:'center',dataIndex:'"+attr.dataIndex+"',renderer:Ext.util.Format.dateRenderer('Y-m-d')";
		}else {
			myColumns +=hidden_+lock_+width_+",align:'center',dataIndex:'"+attr.dataIndex+"',"+"editor:{allowBlank:false}";
		}
		myColumns += "}";
		if (i < myArr.length - 1) {
			myColumns += ",";
		}
	}
	myColumns +="]";
	return myColumns;
}

//生成树形treepanel 的Grid-Fields columns数据信息
createTreeHeadColumns = function(columnInfo) {
	var myArr = columnInfo;
	var myColumns ="[";
	for (var i = 0; i < myArr.length; i++) {
		var attr = myArr[i];
		myColumns += "{ header:'" + attr.header + "'";
		if (attr.dataIndex=='text'){
			myColumns +=",xtype: 'treecolumn',dataIndex:'"+attr.dataIndex+"'";
		}else {
			myColumns +=",dataIndex:'"+attr.dataIndex+"'";
		}
		myColumns +="}";
		if (i < myArr.length - 1) {
			myColumns += ",";
		}
	}
	myColumns +="]";
	
	return myColumns;
};

function trim(str){   
    str = str.replace(/^(\s|\u00A0)+/,'');   
    for(var i=str.length-1; i>=0; i--){   
        if(/\S/.test(str.charAt(i))){   
            str = str.substring(0, i+1);   
            break;   
        }   
    }   
    return str;   
}
/*** 
  * 对 特殊字符进行重新编码 
  * **/ 
function URLencode(sStr){
	return encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F').replace(/\#/g,'%23'); 
}

function initContinuousDiagramChart(pointdata, divid,title,subtitle,xtext,ytext,color) {
	mychart = new Highcharts.Chart({
				chart: {                                                                             
		            type: 'scatter',     // 散点图   
		            renderTo : divid,
		            borderWidth : 0,
		            zoomType: 'xy',
		            reflow: true
		        },                                                                                   
		        title: {
		        	text: title          
		        },                                                                                   
		        subtitle: {
		        	text: subtitle                                                      
		        },
		        credits: {
		            enabled: false
		        },
		        xAxis: {                                                                             
		            title: {                                                                         
		                text: xtext,    // 坐标+显示文字
		                useHTML: false,
		                margin:5,
                        style: {
                        	fontSize: '12px',
                            padding: '5px'
                        }
		            }, 
		            startOnTick: false,      //是否强制轴线在标线处开始
		            endOnTick: false,        //是否强制轴线在标线处结束                                                        
		            showLastLabel: true,
		            allowDecimals: false,    // 刻度值是否为小数
//		            min:0,
		            minorTickInterval: ''    // 最小刻度间隔
		        },                                                                                   
		        yAxis: {                                                                             
		            title: {                                                                         
		                text: ytext   // 载荷（kN） 
                    },
		            allowDecimals: false,    // 刻度值是否为小数
		            minorTickInterval: ''   // 不显示次刻度线
//		            min: 0                  // 最小值
		        },
		        exporting:{
                    enabled:true,    
                    filename:'class-booking-chart',    
                    url:context + '/exportHighcharsPicController/export'
               },
		        legend: {
		        	itemStyle:{
		        		fontSize: '8px'
		        	},
		            enabled: false,
		            layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: 0,
					y: 55,
					floating: true
		        },                                                                                   
		        plotOptions: {                                                                       
		            scatter: {                                                                       
		                marker: {                                                                    
		                    radius: 0,                                                               
		                    states: {                                                                
		                        hover: {                                                             
		                            enabled: true,                                                   
		                            lineColor: '#646464'                                    
		                        }                                                                    
		                    }                                                                        
		                },                                                                           
		                states: {                                                                    
		                    hover: {                                                                 
		                        marker: {                                                            
		                            enabled: false                                                   
		                        }                                                                    
		                    }                                                                        
		                },                                                                           
		                tooltip: {                                                                   
		                    headerFormat: '',                                
		                    pointFormat: '{point.x},{point.y}'                                
		                }                                                                            
		            }                                                                                
		        },
		        series: [{                                                                           
		            name: '',                                                                  
		            color: color,   
		            lineWidth:3,
		            data:  pointdata                                                                                  
		        }]
	});
}

function SetEveryOnePointColor(chart) {      // 设置每一个数据点的颜色横向渐变
	var colors = chart.options.colors;
	var pointsList = chart.series[0].points;         //获得第一个序列的所有数据点
    for (var i = 0; i < pointsList.length; i++) {    //遍历设置每一个数据点颜色
        chart.series[0].points[i].update({
            color: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },     //横向渐变效果 如果将x2和y2值交换将会变成纵向渐变效果
                stops: [
                            [0, Highcharts.Color(colors[i*2]).setOpacity(1).get('rgba')],
//                            [0.5, 'rgb(255, 255, 255)'],
//                            [0.5, Highcharts.Color(colors[i*2]).setOpacity(1).get('rgba')],
                            [1, Highcharts.Color(colors[i*2+1]).setOpacity(1).get('rgba')]
                        ]  
            }
        });
    }
}

function getScrollWidth() { // 获取系统滚动条的宽度
	var noScroll, scroll, oDiv = document.createElement("DIV");
	oDiv.style.cssText = "margin:0px;padding:0px;border:0px;position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
	noScroll = document.body.appendChild(oDiv).clientWidth;
	oDiv.style.overflowY = "scroll";
	scroll = oDiv.clientWidth;
	document.body.removeChild(oDiv);
	return noScroll-scroll;
}

//显示历史查询-图形查询
function showHistoryGraphicalQueryView(panelId) {
	var HistoryDiagramQuery = Ext.getCmp("HistoryDiagramQuery_Id");// 获取到显示产量数据表的panel
	if (HistoryDiagramQuery != undefined) {
		HistoryDiagramQuery.removeAll();// 清除掉以前的grid，
		uss_ = Ext.create(panelId);
		HistoryDiagramQuery.add(uss_);// 重新添加一个新的grid
	}
}


function loadElectricAnalysisData() {
	var tabpanel=Ext.getCmp("ElectricWellDataAnalysisPanel_Id");
	if(!Ext.isEmpty(tabpanel)){
		if(tabpanel.activeTab.id=="ElectricCurveDataAnalysisPanel_Id"){
			var timelistobj=Ext.getCmp("ElectricWorkStatusTimeListGrid_Id");
            if(isNotVal(timelistobj)){
            	timelistobj.getStore().load();
            }else{
            	Ext.create('AP.store.diagnose.ElectricWorkStatusTimeListStore');
            }
            Ext.create("AP.store.diagnose.CorrelationCoefficientCurveStore");
		}else if(tabpanel.activeTab.id="ElectricDiscreteDataAnalysisPanel_Id"){
			//alert("离散数据分析");
			var gridobj=Ext.getCmp("ElectricDiscreteDataAnalysisTableGrid_Id");
            if(isNotVal(gridobj)){
            	gridobj.getStore().load();
            }else{
            	Ext.create('AP.store.diagnose.ElectricDiscreteDataAnalysisTableStore');
            }
		}
	}
}

showRealtimeWorkStastPieChart = function(store, divid,title,name) {
	var list=store.proxy.reader.rawData.list;
	var series = "[";
	if(list!=undefined && list.length>0){
		for(var i=0;i<list.length;i++){
			if(i==0){
				series+="{name:'"+list[i].gkmc+"',y:"+list[i].total+",sliced:true,selected:true}";
			}else{
				series+="['"+list[i].gkmc+"',"+list[i].total+"]";
			}
			if(i!=list.length-1){
				series+=",";
			}
		}
	}
	series += "]";
	var data = Ext.JSON.decode(series);
	initRealtimeWorkStastPieChart(title, name, data, divid);
	return false;
}

//将grid数据导出到Excel
function exportGridExcelData(gridId,url,fileName,title){
	var store=Ext.getCmp(gridId).getStore();
	var total=store.getCount();
	var jsonArray = [];
	for(var i=0;i<total;i++){
		jsonArray.push(store.getAt(i).data);
	}
	var data=JSON.stringify(jsonArray);
    var fields = "";
    var heads = "";
    var gridPanel = Ext.getCmp(gridId);
    var items_ = gridPanel.items.items;
    if(items_.length==1){//无锁定列时
    	var columns_ = gridPanel.columns;
    	Ext.Array.each(columns_, function (name,
                index, countriesItSelf) {
                var locks = columns_[index];
                if (index > 0 && locks.hidden == false) {
                    fields += locks.dataIndex + ",";
                    heads += locks.text + ",";
                }
            });
    }else{
    	Ext.Array.each(items_, function (name, index,
                countriesItSelf) {
                var datas = items_[index];
                var columns_ = datas.columns;
                if (index == 0) {
                    Ext.Array.each(columns_, function (name,
                        index, countriesItSelf) {
                        var locks = columns_[index];
                        if (index > 0 && locks.hidden == false) {
                            fields += locks.dataIndex + ",";
                            heads += locks.text + ",";
                        }
                    });
                } else {
                    Ext.Array.each(columns_, function (name,
                        index, countriesItSelf) {
                        var headers_ = columns_[index];
                        if (headers_.hidden == false) {
                            fields += headers_.dataIndex + ",";
                            heads += headers_.text + ",";
                        }
                    });
                }
            });
    }
    if (isNotVal(fields)) {
        fields = fields.substring(0, fields.length - 1);
        heads = heads.substring(0, heads.length - 1);
    }
    fields = "id," + fields;
    heads = "序号," + heads;
    var param = "&heads=" + heads +"&fields=" + fields+"&data=" + data+"&fileName=" + fileName+"&title=" + title;
    openExcelWindow(url+'?flag=true&' + param);
};

function handsontableDataCheck_Org(val, callback,row,col,handsontableHelper){
	var leftOrg_Name=Ext.getCmp("leftOrg_Name").getValue();
	var orgArr=leftOrg_Name.split(",");
	var orgCount=isExist(orgArr,val);
	if(orgCount!=1){
		var cell = handsontableHelper.hot.getCell(row, col);  
        cell.style.background = "#f09614";
		return callback(false);
	}else{
		return callback(true);
	}
};

function handsontableDataCheck_Num(val, callback,row,col,handsontableHelper){
	var pattern=/^[0-9]*$/;
	if(isNotVal(val) && !isNaN(val)){
		return callback(true);
	}else{
		var cell = handsontableHelper.hot.getCell(row, col);  
        cell.style.background = "#f09614";
		return callback(false);
	}
};

function handsontableDataCheck_Num_Nullable(val, callback,row,col,handsontableHelper){
	var pattern=/^[0-9]*$/;
	if(val==='' || !isNaN(val)){
		return callback(true);
	}else{
		var cell = handsontableHelper.hot.getCell(row, col);  
        cell.style.background = "#f09614";
		return callback(false);
	}
};

function handsontableDataCheck_NotNull(val, callback,row,col,handsontableHelper){
	if(isNotVal(val)){
		return callback(true);
	}else{
		var cell = handsontableHelper.hot.getCell(row, col);  
        cell.style.background = "#f09614";
		return callback(false);
	}
};

function handsontableDataCheck_PumpGrade(val, callback,row,col,handsontableHelper){
	if(val==1 || val==2 || val==3 || val==4 || val==5){
		return callback(true);
	}else{
		var cell = handsontableHelper.hot.getCell(row, col);  
        cell.style.background = "#f09614";
		return callback(false);
	}
};

function handsontableDataCheck_RodGrade(val, callback,row,col,handsontableHelper){
	if(val==''
		||val.toUpperCase()=='A'||val.toUpperCase()=='B'
		||val.toUpperCase()=='C'||val.toUpperCase()=='K'
		||val.toUpperCase()=='D'||val.toUpperCase()=='KD'
		||val.toUpperCase()=='HL'||val.toUpperCase()=='HY'){
		return callback(true);
	}else{
		var cell = handsontableHelper.hot.getCell(row, col);  
        cell.style.background = "#f09614";
		return callback(false);
	}
};

function getBaseUrl(){
	var curWwwPath=window.document.location.href;
	//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName=window.document.location.pathname;
	var pos=curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8083
	var localhostPaht=curWwwPath.substring(0,pos);
	//获取带"/"的项目名，如：/uimcardprj
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	var baseRoot = localhostPaht+projectName;
	return baseRoot;
};

function initTimeAndDataCurveChartFn(series, tickInterval, divId, title, subtitle, xtitle, ytitle, color,legend,timeFormat) {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var mychart = new Highcharts.Chart({
        chart: {
            renderTo: divId,
            type: 'spline',
            shadow: true,
            borderWidth: 0,
            zoomType: 'xy'
        },
        credits: {
            enabled: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        colors: color,
        xAxis: {
            type: 'datetime',
            title: {
                text: xtitle
            },
            tickPixelInterval: tickInterval,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat(timeFormat, this.value);
                },
                rotation: 0, //倾斜度，防止数量过多显示不全  
                step: 2
            }
        },
        yAxis: [{
            lineWidth: 1,
            title: {
                text: ytitle,
                style: {
                    color: '#000000',
                    fontWeight: 'bold'
                }
            },
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 2);
                }
            }
      }],
        tooltip: {
            crosshairs: true, //十字准线
            style: {
                color: '#333333',
                fontSize: '12px',
                padding: '8px'
            },
            dateTimeLabelFormats: {
                millisecond: '%Y-%m-%d %H:%M:%S.%L',
                second: '%Y-%m-%d %H:%M:%S',
                minute: '%Y-%m-%d %H:%M',
                hour: '%Y-%m-%d %H',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        exporting: {
            enabled: true,
            filename: 'class-booking-chart',
            url: context + '/exportHighcharsPicController/export'
        },
        plotOptions: {
            spline: {
                lineWidth: 1,
                fillOpacity: 0.3,
                marker: {
                    enabled: true,
                    radius: 3, //曲线点半径，默认是4
                    //                            symbol: 'triangle' ,//曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
                    states: {
                        hover: {
                            enabled: true,
                            radius: 6
                        }
                    }
                },
                shadow: true
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            enabled: legend,
            borderWidth: 0
        },
        series: series
    });
};

function isExist(arr,data){
	var r=0;
	if(isNotVal(arr) && arr.length>0){
		for(var i=0;i<arr.length;i++){
			if(arr[i]===data){
				r+=1;
			}
		}
	}
	return r;
};
function foreachAndSearchOrgAbsolutePath(orgStoreData, orgId) {
	var rtnArr=[];
	var rtnStr="";
	const foreachAndSearchOrgAbsolutePathname=function(storeData, id) {
		if(storeData){
			for(let record of storeData){
				if(record.data.orgId===id){
					if(record.parentNode){
						foreachAndSearchOrgAbsolutePathname(storeData,record.parentNode.data.orgId);
					}
					rtnArr.push(record.data.text);
				}else{
//					if(record.childNodes){
//						foreachAndSearchOrgAbsolutePathname(record.childNodes,orgId);
//					}
				}
			}
		}
	};
	foreachAndSearchOrgAbsolutePathname(orgStoreData, orgId);
	for(var i=0;i<rtnArr.length;i++){
		rtnStr+=rtnArr[i];
		if(i<rtnArr.length-1){
			rtnStr+="/";
		}
	}
	return rtnStr;
}

function foreachAndSearchOrgAbsolutePathId(orgStoreData, orgId) {
	var rtnArr=[];
	var rtnStr="";
	const foreachAndSearchOrgAbsolutePathId=function(storeData, id) {
		if(storeData){
			for(let record of storeData){
				if(record.data.orgId===id){
					if(record.parentNode){
						foreachAndSearchOrgAbsolutePathId(storeData,record.parentNode.data.orgId);
					}
					rtnArr.push(record.data.orgId);
				}else{
				}
			}
		}
	};
	foreachAndSearchOrgAbsolutePathId(orgStoreData, orgId);
	rtnStr = "" + rtnArr.join(",");
	return rtnStr;
}

function foreachAndSearchOrgChildId(rec) {
	var rtnArr=[];
	const recursionOrgChildId=function(chlidArray) {
		var ch_length;
		var ch_node = chlidArray.childNodes;
		if (isNotVal(ch_node)) {
			ch_length = ch_node.length;
		} else {
			ch_length = chlidArray.length;
		}
		if (ch_length > 0) {
			if (!Ext.isEmpty(chlidArray)) {
				Ext.Array.each(chlidArray, function(childArrNode, index, fog) {
							var x_node_seId = fog[index].data.orgId;
							rtnArr.push(x_node_seId);
							// 递归
							if (childArrNode.childNodes != null) {
								recursionOrgChildId(childArrNode.childNodes);
							}
						});
			}
		} else {
			if (isNotVal(chlidArray)) {
				var x_node_seId = chlidArray.data.orgId;
				rtnArr.push(x_node_seId);
			}
		}
	};
	recursionOrgChildId(rec);
	return rtnArr.join(",");
};

function getDateAndTime(dateStr,h,m,s){
	if(!isNotVal(dateStr)){
		return '';
	}
	if(!isNotVal(h)){
		h=0
	}
	if(!isNotVal(m)){
		m=0
	}
	if(!isNotVal(s)){
		s=0
	}
	var hStr=h+'';
	var mStr=m+'';
	var sStr=s+'';
	if(hStr.length==1){
		hStr='0'+hStr;
	}
	if(mStr.length==1){
		mStr='0'+mStr;
	}if(sStr.length==1){
		sStr='0'+sStr;
	}
	return dateStr+' '+hStr+":"+mStr+':'+sStr;
};
