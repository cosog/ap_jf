Ext.define("AP.view.acquisitionUnit.DisplayUnitInfoWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.displayUnitInfoWindow',
    layout: 'fit',
    iframe: true,
    id: 'displayUnit_editWin_Id',
    closeAction: 'destroy',
    width: 330,
    shadow: 'sides',
    resizable: false,
    collapsible: true,
    constrain: true,
    maximizable: false,
    plain: true,
    bodyStyle: 'padding:5px;background-color:#D9E5F3;',
    modal: true,
    border: false,
    initComponent: function () {
        var me = this;
        var modbusProtocolStore = new Ext.data.SimpleStore({
        	fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
			proxy : {
				url : context+ '/acquisitionUnitManagerController/getModbusProtoclCombList',
				type : "ajax",
				actionMethods: {
                    read: 'POST'
                },
                reader: {
                	type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
			},
			autoLoad : true,
			listeners : {
				beforeload : function(store, options) {
					var new_params = {
					};
					Ext.apply(store.proxy.extraParams,new_params);
				}
			}
		});
        
        var modbusProtocolComb = Ext.create(
				'Ext.form.field.ComboBox', {
					fieldLabel :  '协议名称<font color=red>*</font>',
					id : 'formDisplayUnitProtocolComb_Id',
					anchor : '100%',
					store: modbusProtocolStore,
					queryMode : 'remote',
					typeAhead : true,
					autoSelect : false,
					allowBlank : false,
					triggerAction : 'all',
					editable : false,
					displayField : "boxval",
					valueField : "boxkey",
					listeners : {
						select: function (v,o) {
							Ext.getCmp("formDisplayUnitProtocol_Id").setValue(this.value);
	                    }
					}
				});
        
        var ProtocolAndAcqUnitTreeStore=Ext.create('Ext.data.TreeStore', {
            fields: ['orgId', 'text', 'leaf'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: context + '/acquisitionUnitManagerController/modbusProtocolAndAcqUnitTreeData',
                reader: 'json'
            },
            root: {
                expanded: true,
                text: 'orgName'
            },
            listeners: {
            	beforeload: function (store, options) {
            		var protocolObj=Ext.getCmp('formDisplayUnitProtocolComb_Id');
            		var protocol='';
            		if(isNotVal(protocolObj)){
            			protocol=protocolObj.getValue();
            		}
            		var new_params = {
            				protocol:protocol
    					};
    					Ext.apply(store.proxy.extraParams,new_params);
            	}
            }
        });
        
        var protocolAndAcqUnitTree=Ext.create('AP.view.well.TreePicker',{
        	id:'formDisplayUnitProtocolAndAcqUnit_Id',
        	anchor: '100%',
        	fieldLabel: '采控单元<font color=red>*</font>',
            emptyText: '请选择采控单元...',
            blankText: '请选择采控单元...',
            displayField: 'text',
            autoScroll:true,
            forceSelection : true,// 只能选择下拉框里面的内容
            rootVisible: false,
            allowBlank: false,
            store:ProtocolAndAcqUnitTreeStore,
            listeners: {
            	expand: function (sm, selections) {
            		protocolAndAcqUnitTree.getStore().load();
                },
            	select: function (picker,record,eOpts) {
                	if(record.data.classes==1){
                		Ext.Msg.alert('info', "<font color=red>当前选中为协议，请选择采控单元！</font>");
                	}else{
                		Ext.getCmp("formDisplayUnitAcqUnit_Id").setValue(record.data.id);
                	}
                }
            }
        });
        
        var postDisplayUnitEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            defaultType: 'textfield',
            items: [{
                xtype: "hidden",
                fieldLabel: '序号',
                id: 'formDisplayUnit_Id',
                anchor: '100%',
                name: "displayUnit.id"
            },{
				xtype : "hidden",
				id : 'formDisplayUnitProtocol_Id',
				value:'',
				name : "displayUnit.protocol"
			},modbusProtocolComb, {
                id: 'formDisplayUnitName_Id',
                name: "displayUnit.unitName",
                fieldLabel: '单元名称<font color=red>*</font>',
                allowBlank: false,
                anchor: '100%',
                value: '',
                listeners: {
                    blur: function (t, e) {
                        var value_ = t.getValue();
                        if(value_!=''){
                        	var protocolName=Ext.getCmp("formDisplayUnitProtocol_Id").getValue();
                        	Ext.Ajax.request({
                                method: 'POST',
                                params: {
                                	protocolName:protocolName,
                                	unitName: t.value
                                },
                                url: context + '/acquisitionUnitManagerController/judgeAcqUnitExistOrNot',
                                success: function (response, opts) {
                                    var obj = Ext.decode(response.responseText);
                                    var msg_ = obj.msg;
                                    if (msg_ == "1") {
                                    	Ext.Msg.alert(cosog.string.ts, "<font color='red'>【采控单元已存在】</font>,请确认！", function(btn, text){
                                    	    if (btn == 'ok'){
                                    	    	t.focus(true, 100);
                                    	    }
                                    	});
                                    }
                                },
                                failure: function (response, opts) {
                                    Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                                }
                            });
                        }
                    }
                }
            },protocolAndAcqUnitTree,{
				xtype : "hidden",
				id : 'formDisplayUnitAcqUnit_Id',
				value:'',
				name : "displayUnit.acqUnitId"
			}, {
                id: 'formDisplayUnitCode_Id',
                name: "displayUnit.unitCode",
                fieldLabel: '单元编码',
                hidden:true,
                anchor: '100%',
                value: ''
            }, {
            	id: 'displayUnitRemark_Id',
            	name: "displayUnit.remark",
                fieldLabel: '单元描述',
                anchor: '100%',
                value: '',
                xtype: 'textareafield'
            }],
            buttons: [{
            	xtype: 'button',
            	id: 'addFormDisplayUnit_Id',
            	text: cosog.string.save,
                iconCls: 'save',
                handler: function () {
                	SaveDisplayUnitSubmitBtnForm();
                }
            }, {
                xtype: 'button',
                id: 'updateFormaAquisitionUnit_Id',
                text: cosog.string.update,
                hidden: true,
                iconCls: 'edit',
                handler: function () {
                	UpdateDisplayUnitDataInfoSubmitBtnForm();
                }
            }, {
        	 	xtype: 'button',   
        	 	text: cosog.string.cancel,
                iconCls: 'cancel',
                handler: function () {
                    Ext.getCmp("displayUnit_editWin_Id").close();
                }
            }]
        });
        Ext.apply(me, {
            items: postDisplayUnitEditForm
        });
        me.callParent(arguments);
    }

});