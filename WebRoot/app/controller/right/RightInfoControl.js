Ext.define('AP.controller.right.RightInfoControl', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'rightInfoView',
        selector: 'rightInfoView'
   }],
    init: function () {
        this.control({})
    }
});
var addRoleInfo = function () {
    var right_panel = Ext.getCmp("RightRoleInfoGridPanel_Id");
    var right_model = right_panel.getSelectionModel();
    var _record = right_model.getSelection();
    var addUrl = context + '/rightManagerController/doRightSaveOrUpdate'
        // 添加条件
    var addjson = [];
    var userNo_ = Ext.getCmp("RightUserNo_Id").getValue();
    var oldCodes_ = Ext.getCmp("RightOldRoleCodes_Id").getValue();
    if (_record.length > 0) {
        Ext.Array.each(_record, function (name, index, countriesItSelf) {
            addjson.push(_record[index].get('roleCode'));
        })
        var addparamsId = "" + addjson.join(",");
        // AJAX提交方式
        Ext.Ajax.request({
            url: addUrl,
            method: "POST",
            // 提交参数
            params: {
                paramsId: addparamsId,
                oldCodes: oldCodes_,
                userNo: userNo_
            },
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.msg == true) {
                    Ext.Msg.alert(cosog.string.ts, "【<font color=blue>" + cosog.string.sucGrant + "</font>】" + _record.length + cosog.string.jgRole + "。");
                }
                if (result.msg == false) {
                    Ext.Msg.alert('info', "<font color=red>SORRY！" + cosog.string.grantFail + "。</font>");
                }
                // 刷新Grid
                Ext.getCmp("RightRoleInfoGridPanel_Id").getStore().load();
            },
            failure: function () {
                Ext.Msg
                    .alert("warn",
                        "【<font color=red>" + cosog.string.execption + " </font>】：" + cosog.string.contactadmin + "！");
            }
        });

    } else {
        Ext.Msg.alert(cosog.string.ts, '<font color=blue>' + cosog.string.pleaseChooseRole + '</font>');
    }
    return false;
}
var addModuleInfo = function () {
    var rightmodule_panel = Ext.getCmp("RightModuleTreeInfoGridPanel_Id");
    //var rightmodule_model = rightmodule_panel.getSelectionModel();
    var _record = rightmodule_panel.getChecked();
    var addUrl = context + '/moduleShowRightManagerController/doModuleSaveOrUpdate'
        // 添加条件
    var addjson = [];
    var matrixData = "";
    var matrixDataArr = "";
    Ext.MessageBox.msgButtons['ok'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'" + context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
    var roleCode = Ext.getCmp("RightBottomRoleCodes_Id").getValue();
    var RightOldModuleIds_Id = Ext.getCmp("RightOldModuleIds_Id").getValue();
    if (!isNotVal(roleCode)) {
        Ext.Msg.alert(cosog.string.ts, cosog.string.pleaseChooseRole);
        return false
    }
    if (_record.length > 0) {
        Ext.Array.each(_record, function (name, index, countriesItSelf) {
            var md_ids = _record[index].get('mdId')
            addjson.push(md_ids);
            var matrix_value = "";
            /*for (var i = 0; i < 3; i++) {
						var matrix_ = Ext.getDom(md_ids + "&" + i);
						if (matrix_.checked) {
							matrix_value += "1,";
						} else {
							matrix_value += "0,";
						}

					}*/
            matrix_value = '0,0,0,';
            if (matrix_value != "" || matrix_value != null) {
                matrix_value = matrix_value.substring(0,
                    matrix_value.length - 1);
            }
            matrixData += md_ids + ":" + matrix_value + "|";

        });

        matrixData = matrixData.substring(0, matrixData.length - 1);
        var addparamsId = "" + addjson.join(",");
        var matrixCodes_ = "" + matrixData;

        // AJAX提交方式
        Ext.Ajax.request({
            url: addUrl,
            method: "POST",
            // 提交参数
            params: {
                paramsId: addparamsId,
                oldModuleIds: RightOldModuleIds_Id,
                roleCode: roleCode,
                matrixCodes: matrixCodes_
            },
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.msg == true) {
                    Ext.Msg.alert(cosog.string.ts, "【<font color=blue>" + cosog.string.sucGrant + "</font>】" + _record.length + "" + cosog.string.jgModule + "。");
                }
                if (result.msg == false) {
                    Ext.Msg.alert('info', "<font color=red>SORRY！" + cosog.string.grandFail + "。</font>");
                }
                // 刷新Grid
                Ext.getCmp("RightModuleTreeInfoGridPanel_Id").getStore().load();
            },
            failure: function () {
                Ext.Msg.alert("warn", "【<font color=red>" + cosog.string.execption + " </font>】：" + cosog.string.contactadmin + "！");
            }
        });

    } else {
        Ext.Msg.alert(cosog.string.ts, '<font color=blue>' + cosog.string.chooseGrantModule + '！</font>');
    }
    return false;
}
var addActionInfo = function () {
    Ext.Msg.alert(cosog.string.ts, '<font color=blue>请您选择需要分配的动作！</font>');
}