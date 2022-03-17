/*==============================================================*/
/* 初始化tbl_dist_name数据                                          */
/*==============================================================*/
insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('7f13446d19b4497986980fa16a750f95', null, '抽油机实时概览', 'rpcRealTimeOverview', 11101, 0, '系统管理员', '系统管理员', to_date('25-11-2021 19:40:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-11-2021 19:40:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('e0f5f3ff8a1f46678c284fba9cc113e8', null, '螺杆泵实时概览', 'pcpRealTimeOverview', 11102, 0, '系统管理员', '系统管理员', to_date('25-11-2021 19:45:26', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-11-2021 19:45:26', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('cd7b24562b924d19b556de31256e22a1', null, '抽油机历史查询', 'rpcHistoryQuery', 12101, 0, '系统管理员', '系统管理员', to_date('25-11-2021 19:45:32', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-11-2021 19:45:32', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('fb7d070a349c403b8a26d71c12af7a05', null, '螺杆泵历史查询', 'pcpHistoryQuery', 12102, 0, '系统管理员', '系统管理员', to_date('25-11-2021 19:45:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-11-2021 19:45:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('ad646d19fcaa4fbd9077dbf7a826b107', 'system', '设备操作日志', 'deviceOperationLog', 13101, 0, '系统管理员', '系统管理员', to_date('07-09-2021 17:05:31', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:05:31', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('167aeb3aca384afda8655d63aedee484', 'system', '系统日志', 'SystemLog', 13102, 0, '系统管理员', '系统管理员', to_date('07-09-2021 19:04:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 19:04:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('cdd198534d5849b7a27054e0f2593ff3', null, '通信状态报警', 'commStatusAlarm', 14101, 0, '系统管理员', '系统管理员', to_date('02-11-2021 15:20:57', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-11-2021 15:20:57', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('e2924366ab174d4b9a096be969934985', 'system', '数值量报警', 'numericValueAlarm', 14102, 0, '系统管理员', '系统管理员', to_date('16-09-2021 13:50:40', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:50:40', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b09082f4272e4768994db398e14bc3f2', 'system', '枚举量报警', 'enumValueAlarm', 14103, 0, '系统管理员', '系统管理员', to_date('07-10-2021 19:07:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-10-2021 19:07:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b71c1a2c9d574fe482080a56c7c780a9', null, '开关量报警', 'switchingValueAlarm', 14104, 0, '系统管理员', '系统管理员', to_date('07-10-2021 19:06:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-10-2021 19:06:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('8ab792e089494533be910699d426c7d5', null, '单位管理', 'orgManage', 21101, 0, '系统管理员', '系统管理员', to_date('24-12-2021 09:33:43', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 09:33:43', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('5ba761c1383f498f9ac97c9a8ab6d847', null, '用户管理', 'userMange', 21102, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:45:52', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:45:52', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('220c349e246e47a39a818023f1c97a63', null, '角色管理', 'roleManage', 21103, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:46:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:46:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('87808f225d7240f68c2ab879347d818a', null, '抽油机管理', 'rpcDeviceManager', 22102, 0, '系统管理员', '系统管理员', to_date('21-12-2021 08:47:31', 'dd-mm-yyyy hh24:mi:ss'), to_date('21-12-2021 08:47:31', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b14377621d74442eb1127de094dfc903', null, '螺杆泵管理', 'pcpDeviceManager', 22103, 0, '系统管理员', '系统管理员', to_date('21-12-2021 17:41:33', 'dd-mm-yyyy hh24:mi:ss'), to_date('21-12-2021 17:41:33', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('2b4cd8cb8c6844769c66b038246c27bf', null, '短信设备管理', 'SMSDeviceManager', 22104, 0, '系统管理员', '系统管理员', to_date('21-12-2021 20:19:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('21-12-2021 20:19:30', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('1404100741bc42799be5b7cbebf4b649', 'system', '辅件设备管理', 'auxiliaryDeviceManager', 22105, 0, '系统管理员', '系统管理员', to_date('10-11-2021 14:12:00', 'dd-mm-yyyy hh24:mi:ss'), to_date('10-11-2021 14:12:00', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b6ef8f3a49094768b3231d5678fc9cbc', null, '模块配置', 'moduleManage', 23101, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:47:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:47:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b8a408839dd8498d9a19fc65f7406ed4', null, '字典配置', 'dataDictionary', 23102, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:47:49', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:47:49', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('2afd86cc6dae4b87abe4aa5c49cb3a88', null, '统计配置', 'statSet', 23103, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:47:58', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:47:58', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('9439b5be24c04491aa8c353e7c65a0ea', null, '报警配置', 'alarmSet', 23104, 0, '系统管理员', '系统管理员', to_date('29-09-2019 09:37:53', 'dd-mm-yyyy hh24:mi:ss'), to_date('29-09-2019 09:37:53', 'dd-mm-yyyy hh24:mi:ss'));

/*==============================================================*/
/* 初始化tbl_dist_item数据                                          */
/*==============================================================*/
insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122454', null, '1404100741bc42799be5b7cbebf4b649', '序号', 'id', 'width:50', 1, 1, null, null, to_date('10-11-2021 14:21:46', 'dd-mm-yyyy hh24:mi:ss'), to_date('10-11-2021 14:21:46', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122455', null, '1404100741bc42799be5b7cbebf4b649', '设备名称', 'name', null, 2, 1, 'sys', null, to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122456', null, '1404100741bc42799be5b7cbebf4b649', '类型', 'type', null, 3, 1, 'sys', null, to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122457', null, '1404100741bc42799be5b7cbebf4b649', '规格型号', 'model', null, 4, 1, null, null, to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122458', null, '1404100741bc42799be5b7cbebf4b649', '备注', 'remark', null, 5, 1, null, null, to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122459', null, '1404100741bc42799be5b7cbebf4b649', '排序编号', 'sort', null, 6, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119379', null, '167aeb3aca384afda8655d63aedee484', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119380', null, '167aeb3aca384afda8655d63aedee484', '操作用户', 'user_id', 'flex:1', 2, 1, null, '超级管理员', to_date('05-01-2022 10:43:15', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:43:15', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119381', null, '167aeb3aca384afda8655d63aedee484', '登录IP', 'loginIp', 'flex:1', 3, 1, null, '超级管理员', to_date('05-01-2022 10:43:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:43:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119382', null, '167aeb3aca384afda8655d63aedee484', '操作', 'actionName', 'flex:1', 4, 1, null, '超级管理员', to_date('05-01-2022 10:43:22', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:43:22', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119383', null, '167aeb3aca384afda8655d63aedee484', '备注', 'remark', 'flex:1', 5, 1, null, '超级管理员', to_date('05-01-2022 10:43:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:43:30', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119384', null, '167aeb3aca384afda8655d63aedee484', '操作时间', 'to_char(createTime@''yyyy-mm-dd hh24:mi:ss'') as createTime', 'flex:1', 6, 1, null, '超级管理员', to_date('05-01-2022 10:43:26', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:43:26', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114886', null, '220c349e246e47a39a818023f1c97a63', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114854', 'sys', '220c349e246e47a39a818023f1c97a63', '角色名称', 'roleName', null, 2, 1, 'sys', '系统管理员', to_date('18-06-2014 09:59:26', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 09:59:26', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128641', null, '220c349e246e47a39a818023f1c97a63', '角色等级', 'roleLevel', null, 3, 1, null, null, to_date('27-12-2021 11:00:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-12-2021 11:00:21', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122399', null, '220c349e246e47a39a818023f1c97a63', '数据显示级别', 'showLevel', null, 4, 1, null, null, to_date('08-11-2021 16:09:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('08-11-2021 16:09:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116763', null, '220c349e246e47a39a818023f1c97a63', '设备控制权限', 'roleFlagName', null, 5, 1, null, '系统管理员', to_date('28-12-2021 17:23:13', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-12-2021 17:23:13', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114856', null, '220c349e246e47a39a818023f1c97a63', '角色描述', 'remark', 'width:200', 6, 1, null, '系统管理员', to_date('17-09-2021 14:17:05', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-09-2021 14:17:05', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116088', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '序号', 'id', 'width:50', 1, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116089', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '统计级别', 'statitem', null, 2, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116091', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '下限', 'downlimit', null, 3, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116090', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '上限', 'uplimit', null, 4, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119915', null, '2b4cd8cb8c6844769c66b038246c27bf', '序号', 'id', 'width:50', 1, 1, null, null, to_date('17-09-2021 18:29:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-09-2021 18:29:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120375', 'sys', '2b4cd8cb8c6844769c66b038246c27bf', '单位名称', 'orgName', null, 2, 0, null, '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119916', null, '2b4cd8cb8c6844769c66b038246c27bf', '设备名称', 'wellName', null, 3, 1, null, '系统管理员', to_date('13-10-2021 20:47:50', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-10-2021 20:47:50', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119917', null, '2b4cd8cb8c6844769c66b038246c27bf', '短信设备实例', 'instanceName', 'width:120', 4, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119918', null, '2b4cd8cb8c6844769c66b038246c27bf', '注册包ID', 'signInId', null, 5, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119919', null, '2b4cd8cb8c6844769c66b038246c27bf', '排序编号', 'sortNum', null, 6, 1, null, null, to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114885', null, '5ba761c1383f498f9ac97c9a8ab6d847', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114845', null, '5ba761c1383f498f9ac97c9a8ab6d847', '用户名称', 'userName', null, 2, 1, null, '系统管理员', to_date('24-12-2021 13:39:27', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 13:39:27', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114847', null, '5ba761c1383f498f9ac97c9a8ab6d847', '用户账号', 'userId', null, 3, 1, null, '系统管理员', to_date('24-12-2021 13:39:31', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 13:39:31', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114849', null, '5ba761c1383f498f9ac97c9a8ab6d847', '角色', 'userTypeName', null, 4, 1, null, '系统管理员', to_date('24-12-2021 13:39:34', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 13:39:34', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114850', null, '5ba761c1383f498f9ac97c9a8ab6d847', '电话', 'userPhone', null, 5, 1, null, '系统管理员', to_date('24-12-2021 19:53:43', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 19:53:43', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114851', null, '5ba761c1383f498f9ac97c9a8ab6d847', '邮箱', 'userInEmail', null, 6, 1, null, '系统管理员', to_date('24-12-2021 19:53:15', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 19:53:15', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116092', null, '5ba761c1383f498f9ac97c9a8ab6d847', '快捷登录', 'userQuickLoginName', null, 7, 1, null, '系统管理员', to_date('24-12-2021 19:13:10', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 19:13:10', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128635', null, '5ba761c1383f498f9ac97c9a8ab6d847', '接收报警短信', 'receiveSMSName', null, 8, 1, null, '系统管理员', to_date('24-12-2021 19:13:10', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 19:13:10', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128636', null, '5ba761c1383f498f9ac97c9a8ab6d847', '接收报警邮件', 'receiveMailName', null, 9, 1, null, '系统管理员', to_date('24-12-2021 19:13:10', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 19:13:10', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128604', null, '5ba761c1383f498f9ac97c9a8ab6d847', '状态', 'userEnableName', null, 10, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128599', null, '5ba761c1383f498f9ac97c9a8ab6d847', '创建时间', 'userRegtime', 'width:150', 11, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118836', null, '7f13446d19b4497986980fa16a750f95', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118837', null, '7f13446d19b4497986980fa16a750f95', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118838', null, '7f13446d19b4497986980fa16a750f95', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118931', null, '7f13446d19b4497986980fa16a750f95', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 4, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128173', null, '7f13446d19b4497986980fa16a750f95', '设备类型', 'deviceTypeName', null, 5, 1, null, null, to_date('09-12-2021 22:25:35', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:25:35', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127905', null, '7f13446d19b4497986980fa16a750f95', '设备型号标识位', 'addr0', null, 6, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127906', null, '7f13446d19b4497986980fa16a750f95', '变频器运行状态', 'addr2', null, 7, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127907', null, '7f13446d19b4497986980fa16a750f95', '变频器故障代码', 'addr4', null, 8, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127908', null, '7f13446d19b4497986980fa16a750f95', 'A相电压(V)', 'addr6', null, 9, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127909', null, '7f13446d19b4497986980fa16a750f95', 'A相电流(A)', 'addr8', null, 10, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127910', null, '7f13446d19b4497986980fa16a750f95', 'B相电压(V)', 'addr10', null, 11, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127911', null, '7f13446d19b4497986980fa16a750f95', 'B相电流(A)', 'addr12', null, 12, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127912', null, '7f13446d19b4497986980fa16a750f95', 'C相电压(V)', 'addr14', null, 13, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127913', null, '7f13446d19b4497986980fa16a750f95', 'C相电流(A)', 'addr16', null, 14, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127914', null, '7f13446d19b4497986980fa16a750f95', '平均电压(V)', 'addr18', null, 15, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127915', null, '7f13446d19b4497986980fa16a750f95', '平均电流(A)', 'addr20', null, 16, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127916', null, '7f13446d19b4497986980fa16a750f95', '总功率(kW)', 'addr22', null, 17, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127917', null, '7f13446d19b4497986980fa16a750f95', '合计功率因数(%)', 'addr24', null, 18, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127918', null, '7f13446d19b4497986980fa16a750f95', '总频率(Hz)', 'addr26', null, 19, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127919', null, '7f13446d19b4497986980fa16a750f95', '总电能(kWh)', 'addr28', null, 20, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127920', null, '7f13446d19b4497986980fa16a750f95', '总累计时间(d)', 'addr30', null, 21, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127921', null, '7f13446d19b4497986980fa16a750f95', '井口温度(℃)', 'addr32', null, 22, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127922', null, '7f13446d19b4497986980fa16a750f95', '井口压力(MPa)', 'addr34', null, 23, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127923', null, '7f13446d19b4497986980fa16a750f95', '井下温度(℃)', 'addr36', null, 24, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127924', null, '7f13446d19b4497986980fa16a750f95', '井下压力(MPa)', 'addr38', null, 25, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127925', null, '7f13446d19b4497986980fa16a750f95', '套管压力(MPa)', 'addr40', null, 26, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127926', null, '7f13446d19b4497986980fa16a750f95', '柜内温度(℃)', 'addr42', null, 27, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127927', null, '7f13446d19b4497986980fa16a750f95', '自制井下温度(℃)', 'addr48', null, 28, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127928', null, '7f13446d19b4497986980fa16a750f95', '自制井下压力(MPa)', 'addr50', null, 29, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127929', null, '7f13446d19b4497986980fa16a750f95', '自制故障码', 'addr52', null, 30, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127930', null, '7f13446d19b4497986980fa16a750f95', '保护开关', 'addr54', null, 31, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127931', null, '7f13446d19b4497986980fa16a750f95', '保护执行状态', 'addr56', null, 32, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127932', null, '7f13446d19b4497986980fa16a750f95', '欠压保护值(V)', 'addr58', null, 33, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127933', null, '7f13446d19b4497986980fa16a750f95', '欠压延时值(s)', 'addr60', null, 34, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127934', null, '7f13446d19b4497986980fa16a750f95', '过压保护值(V)', 'addr62', null, 35, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127935', null, '7f13446d19b4497986980fa16a750f95', '过压延时值(s)', 'addr64', null, 36, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127936', null, '7f13446d19b4497986980fa16a750f95', '欠载保护值(A)', 'addr66', null, 37, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127937', null, '7f13446d19b4497986980fa16a750f95', '欠载延时值(s)', 'addr68', null, 38, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127938', null, '7f13446d19b4497986980fa16a750f95', '过载保护值(A)', 'addr70', null, 39, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127939', null, '7f13446d19b4497986980fa16a750f95', '过载延时值(s)', 'addr72', null, 40, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127940', null, '7f13446d19b4497986980fa16a750f95', '电压不平衡保护值(%)', 'addr74', null, 41, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127941', null, '7f13446d19b4497986980fa16a750f95', '电压不平衡延时值(s)', 'addr76', null, 42, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127942', null, '7f13446d19b4497986980fa16a750f95', '电流不平衡保护值(%)', 'addr78', null, 43, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127943', null, '7f13446d19b4497986980fa16a750f95', '电流不平衡延时值(s)', 'addr80', null, 44, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127944', null, '7f13446d19b4497986980fa16a750f95', '井口温度保护值(℃)', 'addr82', null, 45, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127945', null, '7f13446d19b4497986980fa16a750f95', '井口温度保护延时值(s)', 'addr84', null, 46, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127946', null, '7f13446d19b4497986980fa16a750f95', '井口压力保护值(MPa)', 'addr86', null, 47, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127947', null, '7f13446d19b4497986980fa16a750f95', '井口压力保护延时值(s)', 'addr88', null, 48, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127948', null, '7f13446d19b4497986980fa16a750f95', '井下温度保护值(℃)', 'addr90', null, 49, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127949', null, '7f13446d19b4497986980fa16a750f95', '井下温度保护延时值(s)', 'addr92', null, 50, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127950', null, '7f13446d19b4497986980fa16a750f95', '内置井下温度保护值(℃)', 'addr94', null, 51, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127951', null, '7f13446d19b4497986980fa16a750f95', '内置井下温度保护延时值(s)', 'addr96', null, 52, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127952', null, '7f13446d19b4497986980fa16a750f95', '井下压力保护值(MPa)', 'addr98', null, 53, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127953', null, '7f13446d19b4497986980fa16a750f95', '井下压力保护延时值(s)', 'addr100', null, 54, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127954', null, '7f13446d19b4497986980fa16a750f95', '自制井下压力保护值(MPa)', 'addr102', null, 55, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127955', null, '7f13446d19b4497986980fa16a750f95', '自制井下压力保护延时值(s)', 'addr104', null, 56, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127956', null, '7f13446d19b4497986980fa16a750f95', '液面保护值(m)', 'addr106', null, 57, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127957', null, '7f13446d19b4497986980fa16a750f95', '液面保护延时值(s)', 'addr108', null, 58, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127958', null, '7f13446d19b4497986980fa16a750f95', '自制液面保护值(m)', 'addr110', null, 59, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127959', null, '7f13446d19b4497986980fa16a750f95', '自制液面保护延时值(s)', 'addr112', null, 60, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127960', null, '7f13446d19b4497986980fa16a750f95', '运行模式', 'addr114', null, 61, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127961', null, '7f13446d19b4497986980fa16a750f95', '间歇运行时间(min)', 'addr116', null, 62, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127962', null, '7f13446d19b4497986980fa16a750f95', '间歇停机时间(min)', 'addr118', null, 63, 0, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127963', null, '7f13446d19b4497986980fa16a750f95', '目标井下压力(MPa)', 'addr120', null, 64, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127964', null, '7f13446d19b4497986980fa16a750f95', '自制目标井下压力(MPa)', 'addr122', null, 65, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127965', null, '7f13446d19b4497986980fa16a750f95', '目标液面深度(m)', 'addr124', null, 66, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127966', null, '7f13446d19b4497986980fa16a750f95', '自制目标液面深度(m)', 'addr126', null, 67, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127967', null, '7f13446d19b4497986980fa16a750f95', '程序版本号', 'addr128', null, 68, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127968', null, '7f13446d19b4497986980fa16a750f95', '气体压力(KPa)', 'addr130', null, 69, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127969', null, '7f13446d19b4497986980fa16a750f95', '气体瞬时流量(m3/h)', 'addr132', null, 70, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127970', null, '7f13446d19b4497986980fa16a750f95', '气体累计流量(m3)', 'addr134', null, 71, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127971', null, '7f13446d19b4497986980fa16a750f95', '瞬时排量(m3/d)', 'addr138', null, 72, 1, null, null, to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114888', null, '87808f225d7240f68c2ab879347d818a', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114865', 'sys', '87808f225d7240f68c2ab879347d818a', '单位名称', 'orgName', null, 2, 0, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114867', 'sys', '87808f225d7240f68c2ab879347d818a', '井名', 'wellName', null, 3, 1, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122495', null, '87808f225d7240f68c2ab879347d818a', '应用场景', 'applicationScenariosName', null, 4, 1, null, null, to_date('15-11-2021 17:39:28', 'dd-mm-yyyy hh24:mi:ss'), to_date('15-11-2021 17:39:28', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116688', null, '87808f225d7240f68c2ab879347d818a', '采控实例', 'instanceName', 'width:120', 5, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119811', null, '87808f225d7240f68c2ab879347d818a', '报警实例', 'alarmInstanceName', 'width:120', 6, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114915', null, '87808f225d7240f68c2ab879347d818a', '注册包ID', 'signInId', null, 7, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114916', null, '87808f225d7240f68c2ab879347d818a', '设备从地址', 'slave', null, 8, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('132518', null, '87808f225d7240f68c2ab879347d818a', '状态', 'statusName', null, 9, 1, null, null, to_date('09-02-2022 10:21:53', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-02-2022 10:21:53', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116923', null, '87808f225d7240f68c2ab879347d818a', '排序编号', 'sortNum', null, 10, 1, null, null, to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114832', null, '8ab792e089494533be910699d426c7d5', '单位名称', 'text', 'flex:2', 1, 1, null, '系统管理员', to_date('24-12-2021 09:46:32', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 09:46:32', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114836', null, '8ab792e089494533be910699d426c7d5', '单位说明', 'orgMemo', 'flex:3', 2, 1, null, '系统管理员', to_date('24-12-2021 09:46:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 09:46:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114834', null, '8ab792e089494533be910699d426c7d5', '排序编号', 'orgSeq', 'flex:1', 3, 1, null, '系统管理员', to_date('24-12-2021 11:09:36', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-12-2021 11:09:36', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114889', null, '9439b5be24c04491aa8c353e7c65a0ea', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114880', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警类型', 'alarmtypename', null, 2, 1, null, '系统管理员', to_date('13-11-2018 17:26:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-11-2018 17:26:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114879', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警项', 'resultname', null, 3, 1, null, '系统管理员', to_date('13-11-2018 17:26:28', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-11-2018 17:26:28', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114881', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警级别', 'alarmlevelname', null, 4, 1, null, '系统管理员', to_date('24-06-2014 15:52:52', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-06-2014 15:52:52', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114882', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警开关', 'alarmsign', null, 5, 1, null, '系统管理员', to_date('15-11-2018 10:06:54', 'dd-mm-yyyy hh24:mi:ss'), to_date('15-11-2018 10:06:54', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114883', 'sys', '9439b5be24c04491aa8c353e7c65a0ea', '备注', 'remark', null, 7, 0, 'sys', '系统管理员', to_date('20-06-2014 10:27:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('20-06-2014 10:27:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119371', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119372', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '井名', 'wellName', 'flex:3', 2, 1, null, '超级管理员', to_date('05-01-2022 10:41:43', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:41:43', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119373', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '设备类型', 'deviceTypeName', 'flex:2', 3, 1, null, '超级管理员', to_date('05-01-2022 10:41:35', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:41:35', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119374', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '操作用户', 'user_id', 'flex:2', 4, 1, null, '超级管理员', to_date('05-01-2022 10:41:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:41:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119375', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '登录IP', 'loginIp', 'flex:3', 5, 1, null, '超级管理员', to_date('05-01-2022 10:41:22', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:41:22', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119376', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '操作', 'actionName', 'flex:2', 6, 1, null, '超级管理员', to_date('05-01-2022 10:41:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:41:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119377', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '备注', 'remark', 'flex:10', 7, 1, null, '超级管理员', to_date('05-01-2022 10:40:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:40:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119378', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '操作时间', 'to_char(createTime@''yyyy-mm-dd hh24:mi:ss'') as createTime', 'flex:5', 8, 1, null, '超级管理员', to_date('05-01-2022 10:41:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 10:41:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120115', null, 'b09082f4272e4768994db398e14bc3f2', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120116', null, 'b09082f4272e4768994db398e14bc3f2', '井名', 'wellName', 'flex:2', 2, 1, null, '超级管理员', to_date('05-01-2022 14:18:53', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:18:53', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120118', null, 'b09082f4272e4768994db398e14bc3f2', '报警时间', 'alarmTime', 'flex:3', 3, 1, null, '超级管理员', to_date('05-01-2022 14:18:58', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:18:58', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('121868', null, 'b09082f4272e4768994db398e14bc3f2', '报警项', 'itemName', 'flex:2', 4, 1, null, '超级管理员', to_date('05-01-2022 14:19:04', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:04', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120119', null, 'b09082f4272e4768994db398e14bc3f2', '报警信息', 'alarmInfo', 'flex:2', 5, 1, null, '超级管理员', to_date('05-01-2022 14:19:07', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:07', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120120', null, 'b09082f4272e4768994db398e14bc3f2', '报警级别', 'alarmLevelName', 'flex:2', 6, 1, null, '超级管理员', to_date('05-01-2022 14:19:10', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:10', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120121', null, 'b09082f4272e4768994db398e14bc3f2', '恢复时间', 'recoveryTime', 'flex:3', 7, 0, null, '超级管理员', to_date('05-01-2022 14:19:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118801', null, 'b14377621d74442eb1127de094dfc903', '序号', 'id', 'width:50', 1, 1, null, null, to_date('19-08-2021 14:25:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 14:25:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118802', 'sys', 'b14377621d74442eb1127de094dfc903', '单位名称', 'orgName', null, 2, 0, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118803', 'sys', 'b14377621d74442eb1127de094dfc903', '井名', 'wellName', null, 3, 1, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('122496', null, 'b14377621d74442eb1127de094dfc903', '应用场景', 'applicationScenariosName', null, 4, 1, null, null, to_date('15-11-2021 17:54:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('15-11-2021 17:54:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118804', null, 'b14377621d74442eb1127de094dfc903', '采控实例', 'instanceName', 'width:120', 5, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119812', null, 'b14377621d74442eb1127de094dfc903', '报警实例', 'alarmInstanceName', 'width:120', 6, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118806', null, 'b14377621d74442eb1127de094dfc903', '注册包ID', 'signInId', null, 7, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118807', null, 'b14377621d74442eb1127de094dfc903', '设备从地址', 'slave', null, 8, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('132519', null, 'b14377621d74442eb1127de094dfc903', '状态', 'statusName', null, 9, 1, null, null, to_date('09-02-2022 10:22:45', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-02-2022 10:22:45', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118816', null, 'b14377621d74442eb1127de094dfc903', '排序编号', 'sortNum', null, 10, 1, null, null, to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114837', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块名称', 'text', null, 1, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114838', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块简介', 'mdShowname', null, 2, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114839', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块编码', 'mdCode', null, 3, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114840', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块视图', 'mdUrl', null, 4, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114841', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块控制器', 'mdControl', null, 5, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114842', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块图标', 'mdIcon', null, 6, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114843', null, 'b6ef8f3a49094768b3231d5678fc9cbc', '模块类别', 'mdTypeName', null, 7, 1, null, '系统管理员', to_date('23-06-2014 11:12:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('23-06-2014 11:12:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114844', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块排序', 'mdSeq', null, 8, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119870', null, 'b71c1a2c9d574fe482080a56c7c780a9', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119871', null, 'b71c1a2c9d574fe482080a56c7c780a9', '井名', 'wellName', 'flex:2', 2, 1, null, '超级管理员', to_date('05-01-2022 14:19:26', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:26', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119873', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警时间', 'alarmTime', 'flex:3', 3, 1, null, '超级管理员', to_date('05-01-2022 14:19:31', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:31', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('121869', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警项', 'itemName', 'flex:2', 4, 1, null, '超级管理员', to_date('05-01-2022 14:19:35', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:35', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119874', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警信息', 'alarmInfo', 'flex:2', 5, 1, null, '超级管理员', to_date('05-01-2022 14:19:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119875', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警级别', 'alarmLevelName', 'flex:2', 6, 1, null, '超级管理员', to_date('05-01-2022 14:19:43', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:43', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119876', null, 'b71c1a2c9d574fe482080a56c7c780a9', '恢复时间', 'recoveryTime', 'flex:3', 7, 0, null, '超级管理员', to_date('05-01-2022 14:19:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:19:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114884', null, 'b8a408839dd8498d9a19fc65f7406ed4', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114827', null, 'b8a408839dd8498d9a19fc65f7406ed4', '字典模块名称', 'cname', null, 2, 1, null, '系统管理员', to_date('13-09-2014 16:10:31', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-09-2014 16:10:31', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114828', null, 'b8a408839dd8498d9a19fc65f7406ed4', '字典模块代码', 'ename', null, 3, 1, null, '系统管理员', to_date('13-09-2014 16:10:40', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-09-2014 16:10:40', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114829', 'sys', 'b8a408839dd8498d9a19fc65f7406ed4', '字典顺序', 'sorts', null, 4, 1, 'sys', '系统管理员', to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114830', 'sys', 'b8a408839dd8498d9a19fc65f7406ed4', '创建人', 'creator', null, 5, 1, 'sys', '系统管理员', to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114831', 'sys', 'b8a408839dd8498d9a19fc65f7406ed4', '创建时间', 'updatetime', null, 6, 1, 'sys', '系统管理员', to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119190', null, 'cd7b24562b924d19b556de31256e22a1', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119191', null, 'cd7b24562b924d19b556de31256e22a1', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119192', null, 'cd7b24562b924d19b556de31256e22a1', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119193', null, 'cd7b24562b924d19b556de31256e22a1', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 4, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127972', null, 'cd7b24562b924d19b556de31256e22a1', '设备型号标识位', 'addr0', null, 6, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127973', null, 'cd7b24562b924d19b556de31256e22a1', '变频器运行状态', 'addr2', null, 7, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127974', null, 'cd7b24562b924d19b556de31256e22a1', '变频器故障代码', 'addr4', null, 8, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127975', null, 'cd7b24562b924d19b556de31256e22a1', 'A相电压(V)', 'addr6', null, 9, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127976', null, 'cd7b24562b924d19b556de31256e22a1', 'A相电流(A)', 'addr8', null, 10, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127977', null, 'cd7b24562b924d19b556de31256e22a1', 'B相电压(V)', 'addr10', null, 11, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127978', null, 'cd7b24562b924d19b556de31256e22a1', 'B相电流(A)', 'addr12', null, 12, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127979', null, 'cd7b24562b924d19b556de31256e22a1', 'C相电压(V)', 'addr14', null, 13, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127980', null, 'cd7b24562b924d19b556de31256e22a1', 'C相电流(A)', 'addr16', null, 14, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127981', null, 'cd7b24562b924d19b556de31256e22a1', '平均电压(V)', 'addr18', null, 15, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127982', null, 'cd7b24562b924d19b556de31256e22a1', '平均电流(A)', 'addr20', null, 16, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127983', null, 'cd7b24562b924d19b556de31256e22a1', '总功率(kW)', 'addr22', null, 17, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127984', null, 'cd7b24562b924d19b556de31256e22a1', '合计功率因数(%)', 'addr24', null, 18, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127985', null, 'cd7b24562b924d19b556de31256e22a1', '总频率(Hz)', 'addr26', null, 19, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127986', null, 'cd7b24562b924d19b556de31256e22a1', '总电能(kWh)', 'addr28', null, 20, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127987', null, 'cd7b24562b924d19b556de31256e22a1', '总累计时间(d)', 'addr30', null, 21, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127988', null, 'cd7b24562b924d19b556de31256e22a1', '井口温度(℃)', 'addr32', null, 22, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127989', null, 'cd7b24562b924d19b556de31256e22a1', '井口压力(MPa)', 'addr34', null, 23, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127990', null, 'cd7b24562b924d19b556de31256e22a1', '井下温度(℃)', 'addr36', null, 24, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127991', null, 'cd7b24562b924d19b556de31256e22a1', '井下压力(MPa)', 'addr38', null, 25, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127992', null, 'cd7b24562b924d19b556de31256e22a1', '套管压力(MPa)', 'addr40', null, 26, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127993', null, 'cd7b24562b924d19b556de31256e22a1', '柜内温度(℃)', 'addr42', null, 27, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127994', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下温度(℃)', 'addr48', null, 28, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127995', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下压力(MPa)', 'addr50', null, 29, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127996', null, 'cd7b24562b924d19b556de31256e22a1', '自制故障码', 'addr52', null, 30, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127997', null, 'cd7b24562b924d19b556de31256e22a1', '保护开关', 'addr54', null, 31, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127998', null, 'cd7b24562b924d19b556de31256e22a1', '保护执行状态', 'addr56', null, 32, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('127999', null, 'cd7b24562b924d19b556de31256e22a1', '欠压保护值(V)', 'addr58', null, 33, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128000', null, 'cd7b24562b924d19b556de31256e22a1', '欠压延时值(s)', 'addr60', null, 34, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128001', null, 'cd7b24562b924d19b556de31256e22a1', '过压保护值(V)', 'addr62', null, 35, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128002', null, 'cd7b24562b924d19b556de31256e22a1', '过压延时值(s)', 'addr64', null, 36, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128003', null, 'cd7b24562b924d19b556de31256e22a1', '欠载保护值(A)', 'addr66', null, 37, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128004', null, 'cd7b24562b924d19b556de31256e22a1', '欠载延时值(s)', 'addr68', null, 38, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128005', null, 'cd7b24562b924d19b556de31256e22a1', '过载保护值(A)', 'addr70', null, 39, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128006', null, 'cd7b24562b924d19b556de31256e22a1', '过载延时值(s)', 'addr72', null, 40, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128007', null, 'cd7b24562b924d19b556de31256e22a1', '电压不平衡保护值(%)', 'addr74', null, 41, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128008', null, 'cd7b24562b924d19b556de31256e22a1', '电压不平衡延时值(s)', 'addr76', null, 42, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128009', null, 'cd7b24562b924d19b556de31256e22a1', '电流不平衡保护值(%)', 'addr78', null, 43, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128010', null, 'cd7b24562b924d19b556de31256e22a1', '电流不平衡延时值(s)', 'addr80', null, 44, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128011', null, 'cd7b24562b924d19b556de31256e22a1', '井口温度保护值(℃)', 'addr82', null, 45, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128012', null, 'cd7b24562b924d19b556de31256e22a1', '井口温度保护延时值(s)', 'addr84', null, 46, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128013', null, 'cd7b24562b924d19b556de31256e22a1', '井口压力保护值(MPa)', 'addr86', null, 47, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128014', null, 'cd7b24562b924d19b556de31256e22a1', '井口压力保护延时值(s)', 'addr88', null, 48, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128015', null, 'cd7b24562b924d19b556de31256e22a1', '井下温度保护值(℃)', 'addr90', null, 49, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128016', null, 'cd7b24562b924d19b556de31256e22a1', '井下温度保护延时值(s)', 'addr92', null, 50, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128017', null, 'cd7b24562b924d19b556de31256e22a1', '内置井下温度保护值(℃)', 'addr94', null, 51, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128018', null, 'cd7b24562b924d19b556de31256e22a1', '内置井下温度保护延时值(s)', 'addr96', null, 52, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128019', null, 'cd7b24562b924d19b556de31256e22a1', '井下压力保护值(MPa)', 'addr98', null, 53, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128020', null, 'cd7b24562b924d19b556de31256e22a1', '井下压力保护延时值(s)', 'addr100', null, 54, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128021', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下压力保护值(MPa)', 'addr102', null, 55, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128022', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下压力保护延时值(s)', 'addr104', null, 56, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128023', null, 'cd7b24562b924d19b556de31256e22a1', '液面保护值(m)', 'addr106', null, 57, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128024', null, 'cd7b24562b924d19b556de31256e22a1', '液面保护延时值(s)', 'addr108', null, 58, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128025', null, 'cd7b24562b924d19b556de31256e22a1', '自制液面保护值(m)', 'addr110', null, 59, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128026', null, 'cd7b24562b924d19b556de31256e22a1', '自制液面保护延时值(s)', 'addr112', null, 60, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128027', null, 'cd7b24562b924d19b556de31256e22a1', '运行模式', 'addr114', null, 61, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128028', null, 'cd7b24562b924d19b556de31256e22a1', '间歇运行时间(min)', 'addr116', null, 62, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128029', null, 'cd7b24562b924d19b556de31256e22a1', '间歇停机时间(min)', 'addr118', null, 63, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128030', null, 'cd7b24562b924d19b556de31256e22a1', '目标井下压力(MPa)', 'addr120', null, 64, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128031', null, 'cd7b24562b924d19b556de31256e22a1', '自制目标井下压力(MPa)', 'addr122', null, 65, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128032', null, 'cd7b24562b924d19b556de31256e22a1', '目标液面深度(m)', 'addr124', null, 66, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128033', null, 'cd7b24562b924d19b556de31256e22a1', '自制目标液面深度(m)', 'addr126', null, 67, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128034', null, 'cd7b24562b924d19b556de31256e22a1', '程序版本号', 'addr128', null, 68, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128035', null, 'cd7b24562b924d19b556de31256e22a1', '气体压力(KPa)', 'addr130', null, 69, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128036', null, 'cd7b24562b924d19b556de31256e22a1', '气体瞬时流量(m3/h)', 'addr132', null, 70, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128037', null, 'cd7b24562b924d19b556de31256e22a1', '气体累计流量(m3)', 'addr134', null, 71, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128038', null, 'cd7b24562b924d19b556de31256e22a1', '瞬时排量(m3/d)', 'addr138', null, 72, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119852', null, 'cdd198534d5849b7a27054e0f2593ff3', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119853', null, 'cdd198534d5849b7a27054e0f2593ff3', '井名', 'wellName', 'flex:2', 2, 1, null, '超级管理员', to_date('05-01-2022 14:16:43', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:16:43', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119855', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警时间', 'alarmTime', 'flex:3', 3, 1, null, '超级管理员', to_date('05-01-2022 14:16:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:16:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('121867', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警项', 'itemName', 'flex:2', 4, 1, null, '超级管理员', to_date('05-01-2022 14:16:46', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:16:46', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119856', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警信息', 'alarmInfo', 'flex:2', 5, 1, null, '超级管理员', to_date('05-01-2022 14:16:50', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:16:50', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119857', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警级别', 'alarmLevelName', 'flex:2', 6, 1, null, '超级管理员', to_date('05-01-2022 14:17:05', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:17:05', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119858', null, 'cdd198534d5849b7a27054e0f2593ff3', '恢复时间', 'recoveryTime', 'flex:3', 7, 0, null, '超级管理员', to_date('05-01-2022 14:17:00', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:17:00', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118932', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118933', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118934', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118935', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 4, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128174', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '设备类型', 'deviceTypeName', null, 5, 1, null, null, to_date('09-12-2021 22:25:35', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:25:35', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128039', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '设备型号标识位', 'addr0', null, 6, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128040', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '变频器运行状态', 'addr2', null, 7, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128041', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '变频器故障代码', 'addr4', null, 8, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128042', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'A相电压(V)', 'addr6', null, 9, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128043', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'A相电流(A)', 'addr8', null, 10, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128044', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'B相电压(V)', 'addr10', null, 11, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128045', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'B相电流(A)', 'addr12', null, 12, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128046', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'C相电压(V)', 'addr14', null, 13, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128047', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'C相电流(A)', 'addr16', null, 14, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128048', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '平均电压(V)', 'addr18', null, 15, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128049', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '平均电流(A)', 'addr20', null, 16, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128050', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总功率(kW)', 'addr22', null, 17, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128051', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '合计功率因数(%)', 'addr24', null, 18, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128052', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总频率(Hz)', 'addr26', null, 19, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128053', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总电能(kWh)', 'addr28', null, 20, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128054', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总累计时间(d)', 'addr30', null, 21, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128055', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口温度(℃)', 'addr32', null, 22, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128056', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口压力(MPa)', 'addr34', null, 23, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128057', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下温度(℃)', 'addr36', null, 24, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128058', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下压力(MPa)', 'addr38', null, 25, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128059', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '套管压力(MPa)', 'addr40', null, 26, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128060', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '柜内温度(℃)', 'addr42', null, 27, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128061', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下温度(℃)', 'addr48', null, 28, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128062', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下压力(MPa)', 'addr50', null, 29, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128063', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制故障码', 'addr52', null, 30, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128064', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '保护开关', 'addr54', null, 31, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128065', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '保护执行状态', 'addr56', null, 32, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128066', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠压保护值(V)', 'addr58', null, 33, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128067', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠压延时值(s)', 'addr60', null, 34, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128068', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过压保护值(V)', 'addr62', null, 35, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128069', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过压延时值(s)', 'addr64', null, 36, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128070', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠载保护值(A)', 'addr66', null, 37, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128071', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠载延时值(s)', 'addr68', null, 38, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128072', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过载保护值(A)', 'addr70', null, 39, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128073', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过载延时值(s)', 'addr72', null, 40, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128074', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电压不平衡保护值(%)', 'addr74', null, 41, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128075', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电压不平衡延时值(s)', 'addr76', null, 42, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128076', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电流不平衡保护值(%)', 'addr78', null, 43, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128077', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电流不平衡延时值(s)', 'addr80', null, 44, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128078', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口温度保护值(℃)', 'addr82', null, 45, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128079', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口温度保护延时值(s)', 'addr84', null, 46, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128080', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口压力保护值(MPa)', 'addr86', null, 47, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128081', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口压力保护延时值(s)', 'addr88', null, 48, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128082', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下温度保护值(℃)', 'addr90', null, 49, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128083', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下温度保护延时值(s)', 'addr92', null, 50, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128084', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '内置井下温度保护值(℃)', 'addr94', null, 51, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128085', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '内置井下温度保护延时值(s)', 'addr96', null, 52, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128086', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下压力保护值(MPa)', 'addr98', null, 53, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128087', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下压力保护延时值(s)', 'addr100', null, 54, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128088', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下压力保护值(MPa)', 'addr102', null, 55, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128089', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下压力保护延时值(s)', 'addr104', null, 56, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128090', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '液面保护值(m)', 'addr106', null, 57, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128091', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '液面保护延时值(s)', 'addr108', null, 58, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128092', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制液面保护值(m)', 'addr110', null, 59, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128093', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制液面保护延时值(s)', 'addr112', null, 60, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128094', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '运行模式', 'addr114', null, 61, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128095', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '间歇运行时间(min)', 'addr116', null, 62, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128096', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '间歇停机时间(min)', 'addr118', null, 63, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128097', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '目标井下压力(MPa)', 'addr120', null, 64, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128098', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制目标井下压力(MPa)', 'addr122', null, 65, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128099', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '目标液面深度(m)', 'addr124', null, 66, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128100', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制目标液面深度(m)', 'addr126', null, 67, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128101', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '程序版本号', 'addr128', null, 68, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128102', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '气体压力(KPa)', 'addr130', null, 69, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128103', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '气体瞬时流量(m3/h)', 'addr132', null, 70, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128104', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '气体累计流量(m3)', 'addr134', null, 71, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128105', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '瞬时排量(m3/d)', 'addr138', null, 72, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119859', null, 'e2924366ab174d4b9a096be969934985', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119860', null, 'e2924366ab174d4b9a096be969934985', '井名', 'wellName', 'flex:2', 2, 1, null, '超级管理员', to_date('05-01-2022 14:17:52', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:17:52', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119862', null, 'e2924366ab174d4b9a096be969934985', '报警时间', 'alarmTime', 'flex:3', 3, 1, null, '超级管理员', to_date('05-01-2022 14:17:48', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:17:48', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119866', null, 'e2924366ab174d4b9a096be969934985', '报警项', 'itemName', 'flex:2', 4, 1, null, '超级管理员', to_date('05-01-2022 14:17:55', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:17:55', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119863', null, 'e2924366ab174d4b9a096be969934985', '报警信息', 'alarmInfo', 'flex:2', 5, 1, null, '超级管理员', to_date('05-01-2022 14:17:58', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:17:58', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119867', null, 'e2924366ab174d4b9a096be969934985', '报警值', 'alarmValue', 'flex:2', 6, 1, null, '超级管理员', to_date('05-01-2022 14:18:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:18:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119868', null, 'e2924366ab174d4b9a096be969934985', '报警限值', 'alarmLimit', 'flex:2', 7, 1, null, '超级管理员', to_date('05-01-2022 14:18:04', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:18:04', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119869', null, 'e2924366ab174d4b9a096be969934985', '回差', 'hystersis', 'flex:2', 8, 1, null, '超级管理员', to_date('05-01-2022 14:18:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:18:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119864', null, 'e2924366ab174d4b9a096be969934985', '报警级别', 'alarmLevelName', 'flex:2', 9, 1, null, '超级管理员', to_date('05-01-2022 14:18:13', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:18:13', 'dd-mm-yyyy hh24:mi:ss'));

insert into tbl_dist_item (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119865', null, 'e2924366ab174d4b9a096be969934985', '恢复时间', 'recoveryTime', 'flex:3', 10, 0, null, '超级管理员', to_date('05-01-2022 14:18:20', 'dd-mm-yyyy hh24:mi:ss'), to_date('05-01-2022 14:18:20', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119194', null, 'fb7d070a349c403b8a26d71c12af7a05', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119195', null, 'fb7d070a349c403b8a26d71c12af7a05', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119196', null, 'fb7d070a349c403b8a26d71c12af7a05', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119197', null, 'fb7d070a349c403b8a26d71c12af7a05', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 3, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128106', null, 'fb7d070a349c403b8a26d71c12af7a05', '设备型号标识位', 'addr0', null, 6, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128107', null, 'fb7d070a349c403b8a26d71c12af7a05', '变频器运行状态', 'addr2', null, 7, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128108', null, 'fb7d070a349c403b8a26d71c12af7a05', '变频器故障代码', 'addr4', null, 8, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128109', null, 'fb7d070a349c403b8a26d71c12af7a05', 'A相电压(V)', 'addr6', null, 9, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128110', null, 'fb7d070a349c403b8a26d71c12af7a05', 'A相电流(A)', 'addr8', null, 10, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128111', null, 'fb7d070a349c403b8a26d71c12af7a05', 'B相电压(V)', 'addr10', null, 11, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128112', null, 'fb7d070a349c403b8a26d71c12af7a05', 'B相电流(A)', 'addr12', null, 12, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128113', null, 'fb7d070a349c403b8a26d71c12af7a05', 'C相电压(V)', 'addr14', null, 13, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128114', null, 'fb7d070a349c403b8a26d71c12af7a05', 'C相电流(A)', 'addr16', null, 14, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128115', null, 'fb7d070a349c403b8a26d71c12af7a05', '平均电压(V)', 'addr18', null, 15, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128116', null, 'fb7d070a349c403b8a26d71c12af7a05', '平均电流(A)', 'addr20', null, 16, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128117', null, 'fb7d070a349c403b8a26d71c12af7a05', '总功率(kW)', 'addr22', null, 17, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128118', null, 'fb7d070a349c403b8a26d71c12af7a05', '合计功率因数(%)', 'addr24', null, 18, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128119', null, 'fb7d070a349c403b8a26d71c12af7a05', '总频率(Hz)', 'addr26', null, 19, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128120', null, 'fb7d070a349c403b8a26d71c12af7a05', '总电能(kWh)', 'addr28', null, 20, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128121', null, 'fb7d070a349c403b8a26d71c12af7a05', '总累计时间(d)', 'addr30', null, 21, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128122', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口温度(℃)', 'addr32', null, 22, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128123', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口压力(MPa)', 'addr34', null, 23, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128124', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下温度(℃)', 'addr36', null, 24, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128125', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下压力(MPa)', 'addr38', null, 25, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128126', null, 'fb7d070a349c403b8a26d71c12af7a05', '套管压力(MPa)', 'addr40', null, 26, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128127', null, 'fb7d070a349c403b8a26d71c12af7a05', '柜内温度(℃)', 'addr42', null, 27, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128128', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下温度(℃)', 'addr48', null, 28, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128129', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下压力(MPa)', 'addr50', null, 29, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128130', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制故障码', 'addr52', null, 30, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128131', null, 'fb7d070a349c403b8a26d71c12af7a05', '保护开关', 'addr54', null, 31, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128132', null, 'fb7d070a349c403b8a26d71c12af7a05', '保护执行状态', 'addr56', null, 32, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128133', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠压保护值(V)', 'addr58', null, 33, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128134', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠压延时值(s)', 'addr60', null, 34, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128135', null, 'fb7d070a349c403b8a26d71c12af7a05', '过压保护值(V)', 'addr62', null, 35, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128136', null, 'fb7d070a349c403b8a26d71c12af7a05', '过压延时值(s)', 'addr64', null, 36, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128137', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠载保护值(A)', 'addr66', null, 37, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128138', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠载延时值(s)', 'addr68', null, 38, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128139', null, 'fb7d070a349c403b8a26d71c12af7a05', '过载保护值(A)', 'addr70', null, 39, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128140', null, 'fb7d070a349c403b8a26d71c12af7a05', '过载延时值(s)', 'addr72', null, 40, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128141', null, 'fb7d070a349c403b8a26d71c12af7a05', '电压不平衡保护值(%)', 'addr74', null, 41, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128142', null, 'fb7d070a349c403b8a26d71c12af7a05', '电压不平衡延时值(s)', 'addr76', null, 42, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128143', null, 'fb7d070a349c403b8a26d71c12af7a05', '电流不平衡保护值(%)', 'addr78', null, 43, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128144', null, 'fb7d070a349c403b8a26d71c12af7a05', '电流不平衡延时值(s)', 'addr80', null, 44, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128145', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口温度保护值(℃)', 'addr82', null, 45, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128146', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口温度保护延时值(s)', 'addr84', null, 46, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128147', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口压力保护值(MPa)', 'addr86', null, 47, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128148', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口压力保护延时值(s)', 'addr88', null, 48, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128149', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下温度保护值(℃)', 'addr90', null, 49, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128150', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下温度保护延时值(s)', 'addr92', null, 50, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128151', null, 'fb7d070a349c403b8a26d71c12af7a05', '内置井下温度保护值(℃)', 'addr94', null, 51, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128152', null, 'fb7d070a349c403b8a26d71c12af7a05', '内置井下温度保护延时值(s)', 'addr96', null, 52, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128153', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下压力保护值(MPa)', 'addr98', null, 53, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128154', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下压力保护延时值(s)', 'addr100', null, 54, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128155', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下压力保护值(MPa)', 'addr102', null, 55, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128156', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下压力保护延时值(s)', 'addr104', null, 56, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128157', null, 'fb7d070a349c403b8a26d71c12af7a05', '液面保护值(m)', 'addr106', null, 57, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128158', null, 'fb7d070a349c403b8a26d71c12af7a05', '液面保护延时值(s)', 'addr108', null, 58, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128159', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制液面保护值(m)', 'addr110', null, 59, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128160', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制液面保护延时值(s)', 'addr112', null, 60, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128161', null, 'fb7d070a349c403b8a26d71c12af7a05', '运行模式', 'addr114', null, 61, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128162', null, 'fb7d070a349c403b8a26d71c12af7a05', '间歇运行时间(min)', 'addr116', null, 62, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128163', null, 'fb7d070a349c403b8a26d71c12af7a05', '间歇停机时间(min)', 'addr118', null, 63, 0, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128164', null, 'fb7d070a349c403b8a26d71c12af7a05', '目标井下压力(MPa)', 'addr120', null, 64, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128165', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制目标井下压力(MPa)', 'addr122', null, 65, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128166', null, 'fb7d070a349c403b8a26d71c12af7a05', '目标液面深度(m)', 'addr124', null, 66, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128167', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制目标液面深度(m)', 'addr126', null, 67, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128168', null, 'fb7d070a349c403b8a26d71c12af7a05', '程序版本号', 'addr128', null, 68, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128169', null, 'fb7d070a349c403b8a26d71c12af7a05', '气体压力(KPa)', 'addr130', null, 69, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128170', null, 'fb7d070a349c403b8a26d71c12af7a05', '气体瞬时流量(m3/h)', 'addr132', null, 70, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128171', null, 'fb7d070a349c403b8a26d71c12af7a05', '气体累计流量(m3)', 'addr134', null, 71, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('128172', null, 'fb7d070a349c403b8a26d71c12af7a05', '瞬时排量(m3/d)', 'addr138', null, 72, 1, null, null, to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('09-12-2021 22:22:19', 'dd-mm-yyyy hh24:mi:ss'));