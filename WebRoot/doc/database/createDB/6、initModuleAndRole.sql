/*==============================================================*/
/* 初始化tbl_module数据                                          */
/*==============================================================*/
insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (9999, 0, '功能导航', '功能导航', '#', 'Root', 1, null, null, 'function', 0, '#');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (1998, 9999, '实时监控', '实时监控', 'AP.view.realTimeMonitoring.RealTimeMonitoringInfoView', 'DeviceRealTimeMonitoring', 1010010, null, null, 'realtime', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2018, 9999, '历史查询', '历史查询', 'AP.view.historyQuery.HistoryQueryInfoView', 'DeviceHistoryQuery', 1020010, null, null, 'history', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2058, 9999, '故障查询', '故障查询', 'AP.view.alarmQuery.AlarmQueryInfoView', 'AlarmQuery', 1030010, null, null, 'alarm', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2038, 9999, '日志查询', '日志查询', 'AP.view.log.LogInfoView', 'LogQuery', 1040010, null, null, 'log', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (27, 9999, '权限管理', '权限管理', '#', 'right_Ids', 2030000, null, null, 'right', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (24, 27, '组织用户', '组织用户', 'AP.view.orgAndUser.OrgAndUserInfoView', 'org_OrgInfoTreeGridView', 2030100, null, null, 'org', 0, 'AP.controller.orgAndUser.OrgAndUserInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (29, 27, '角色管理', '角色管理', 'AP.view.role.RoleInfoView', 'role_Ids', 2030300, null, null, 'role', 0, 'AP.controller.role.RoleInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (31, 9999, '设备管理', '设备管理', '#', 'dataConfig', 2040000, null, null, 'dataConfig', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (34, 31, '抽油机', '抽油机', 'AP.view.well.RPCDeviceInfoPanel', 'RPCDeviceManager', 2040100, null, null, 'wellInformation', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2098, 31, '螺杆泵', '螺杆泵管理', 'AP.view.well.PCPDeviceInfoPanel', 'PCPDeviceManager', 2040200, null, null, 'pipelineDevice', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2118, 31, '辅件设备', '辅件设备', 'AP.view.well.AuxiliaryDeviceInfoPanel', 'AuxiliaryDeviceManager', 2040300, null, null, 'auxiliaryDevice', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2078, 31, '短信设备', '短信设备管理', 'AP.view.well.SMSDeviceInfoView', 'SMSDeviceManager', 2040400, null, null, 'smsDevice', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (1777, 9999, '驱动配置', '驱动配置', 'AP.view.acquisitionUnit.ProtocolConfigInfoView', 'DataSource', 2040100, null, null, 'driverConfig', 0, 'AP.controller.acquisitionUnit.AcquisitionUnitInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (23, 9999, '系统配置', '系统配置', '#', 'SystemManageent', 2090000, null, null, 'system', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (26, 23, '模块配置', '模块配置', 'AP.view.module.ModuleInfoView', 'ModuleConfig', 2090100, null, null, 'module', 0, 'AP.controller.module.ModuleInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (894, 23, '字典配置', '字典配置', 'AP.view.data.SystemdataInfoView', 'DataDictionary', 2090200, null, null, 'dictionary', 0, 'AP.controller.data.SystemdataInfoControl');

/*==============================================================*/
/* 初始化tbl_role数据                                          */
/*==============================================================*/
insert into TBL_ROLE (ROLE_ID, ROLE_NAME, ROLE_FLAG, REMARK, SHOWLEVEL, ROLE_LEVEL)
values (1, '超级管理员', 1, '全部权限', 1, 1);

insert into TBL_ROLE (ROLE_ID, ROLE_NAME, ROLE_FLAG, REMARK, SHOWLEVEL, ROLE_LEVEL)
values (2, '软件管理员', 1, '数据查询、编辑、权限管理', 2, 2);

insert into TBL_ROLE (ROLE_ID, ROLE_NAME, ROLE_FLAG, REMARK, SHOWLEVEL, ROLE_LEVEL)
values (3, '应用分析员', 0, '数据查询', 3, 3);

/*==============================================================*/
/* 初始化tbl_module2role数据                                          */
/*==============================================================*/
insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (9999, '0,0,0', 1, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1998, '0,0,0', 2, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2018, '0,0,0', 3, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2058, '0,0,0', 4, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2038, '0,0,0', 5, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (27, '0,0,0', 6, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (24, '0,0,0', 7, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (29, '0,0,0', 9, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (31, '0,0,0', 10, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (34, '0,0,0', 11, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2098, '0,0,0', 12, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2078, '0,0,0', 13, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2118, '0,0,0', 14, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1777, '0,0,0', 15, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (23, '0,0,0', 16, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (26, '0,0,0', 17, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (894, '0,0,0', 18, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1998, '0,0,0', 46, 3);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2018, '0,0,0', 47, 3);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2058, '0,0,0', 48, 3);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2038, '0,0,0', 49, 3);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (9999, '0,0,0', 50, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1998, '0,0,0', 51, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2018, '0,0,0', 52, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2058, '0,0,0', 53, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2038, '0,0,0', 54, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (27, '0,0,0', 55, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (24, '0,0,0', 56, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (29, '0,0,0', 58, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (31, '0,0,0', 59, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (34, '0,0,0', 60, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2098, '0,0,0', 61, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2118, '0,0,0', 62, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2078, '0,0,0', 63, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1777, '0,0,0', 64, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (23, '0,0,0', 65, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (26, '0,0,0', 66, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (894, '0,0,0', 67, 2);

/*==============================================================*/
/* 初始化tbl_user数据                                          */
/*==============================================================*/
insert into TBL_USER (USER_NO, USER_ID, USER_PWD, USER_NAME, USER_IN_EMAIL, USER_PHONE, USER_TYPE, USER_ORGID, USER_REGTIME, USER_QUICKLOGIN, USER_ENABLE, USER_RECEIVESMS, USER_RECEIVEMAIL)
values (1, 'system', '91742dcf6ee79059583f6af36e37d9ff', '超级管理员', null, null, 1, 1, sysdate, 0, 1, 0, 0);

insert into TBL_USER (USER_NO, USER_ID, USER_PWD, USER_NAME, USER_IN_EMAIL, USER_PHONE, USER_TYPE, USER_ORGID, USER_REGTIME, USER_QUICKLOGIN, USER_ENABLE, USER_RECEIVESMS, USER_RECEIVEMAIL)
values (2, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '超级管理员', null, null, 1, 1, sysdate, 0, 1, 0, 0);