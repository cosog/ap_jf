/*==============================================================*/
/* 初始化tbl_org数据                                          */
/*==============================================================*/
insert into tbl_org (ORG_ID, ORG_CODE, ORG_NAME, ORG_MEMO, ORG_PARENT, ORG_SEQ)
values (1, '0000', '组织根节点', '组织根节点', 0, null);

/*==============================================================*/
/* 初始化tbl_code数据                                          */
/*==============================================================*/
insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (862, 'ACTION', '添加设备', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (863, 'ACTION', '修改设备', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (864, 'ACTION', '删除设备', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (865, 'ACTION', '控制设备', null, null, '3', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1022, 'APPLICATIONSCENARIOS', '煤层气井', '应用场景', null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1023, 'APPLICATIONSCENARIOS', '油井', '应用场景', null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (475, 'BJJB', '正常', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (259, 'BJJB', '一级报警', null, null, '100', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (260, 'BJJB', '二级报警', null, null, '200', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (261, 'BJJB', '三级报警', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (506, 'BJJB', '离线', null, null, '400', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (250, 'BJLX', '通信报警', null, null, '100', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (251, 'BJLX', '采集报警', null, null, '200', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (252, 'BJLX', '视频和RFID报警', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (253, 'BJLX', '视频报警', null, null, '301', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (254, 'BJLX', 'RFID报警', null, null, '302', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (255, 'BJLX', '视频和RFID报警', null, null, '303', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (256, 'BJLX', '工况报警', null, null, '400', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (257, 'BJLX', '平衡报警', null, null, '500', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (258, 'BJLX', '设备报警', null, null, '600', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (81, 'BJLX', '载荷传感器报警', null, null, '601', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (82, 'BJLX', '压力传感器报警', null, null, '602', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (83, 'BJLX', '温度传感器报警', null, null, '603', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (61, 'BJLX', '波动报警', null, null, '700', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (735, 'BJLX', '电参报警', null, null, '800', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (795, 'BJLX', '运行状态报警', null, null, '900', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (796, 'BJQJYS', '000000', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (797, 'BJQJYS', 'dc2828', null, null, '100', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (798, 'BJQJYS', 'f09614', null, null, '200', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (799, 'BJQJYS', 'fae600', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (476, 'BJYS', '00ff00', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (477, 'BJYS', 'dc2828', null, null, '100', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (478, 'BJYS', 'f09614', null, null, '200', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (479, 'BJYS', 'fae600', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (507, 'BJYS', '#808080', null, null, '400', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (804, 'BJYSTMD', '0', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (805, 'BJYSTMD', '0', null, null, '100', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (806, 'BJYSTMD', '0', null, null, '200', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (807, 'BJYSTMD', '0', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (984, 'BJYSTMD3', '0', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (985, 'BJYSTMD3', '0', null, null, '100', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (986, 'BJYSTMD3', '0', null, null, '200', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (987, 'BJYSTMD3', '0', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (271, 'BJZT', '正常', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (272, 'BJZT', '报警', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (882, 'DEVICETYPE', '隔膜泵', null, null, '101', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (883, 'DEVICETYPE', '螺杆泵', null, null, '102', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (922, 'DEVICETYPE', '直线电机泵', null, null, '103', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1042, 'DEVICETYPE', '电潜泵', null, null, '104', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1043, 'DEVICETYPE', '射流泵', null, null, '105', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1044, 'DEVICETYPE', '加热管', null, null, '201', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1045, 'DEVICETYPE', '采水管', null, null, '202', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1046, 'DEVICETYPE', '集输管', null, null, '203', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1047, 'DEVICETYPE', '短信设备', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (838, 'JSBZ', '请求数据读取失败', null, null, '-44', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (837, 'JSBZ', '请求数据解码失败', null, null, '-55', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (836, 'JSBZ', '井数许可超限', null, null, '-66', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (835, 'JSBZ', '计算异常', null, null, '-77', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (839, 'JSBZ', '相应数据编码失败', null, null, '-88', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (265, 'JSBZ', '数据校验错误', null, null, '-99', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (263, 'JSBZ', '未计算', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (264, 'JSBZ', '计算成功', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (179, 'LiftingType', '自喷', null, null, '100', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (180, 'LiftingType', '泡排', null, null, '101', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (181, 'LiftingType', '抽油机', null, null, '200', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (182, 'LiftingType', '常规抽油机', null, null, '201', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (183, 'LiftingType', '异相型抽油机', null, null, '202', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (184, 'LiftingType', '双驴头抽油机', null, null, '203', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (185, 'LiftingType', '下偏杠铃抽油机', null, null, '204', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (186, 'LiftingType', '调径变矩抽油机', null, null, '205', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (187, 'LiftingType', '立式皮带机', null, null, '206', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (188, 'LiftingType', '立式链条机', null, null, '207', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (189, 'LiftingType', '直线驱抽油机', null, null, '208', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (190, 'LiftingType', '电潜泵', null, null, '300', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (191, 'LiftingType', '螺杆泵', null, null, '400', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (192, 'LiftingType', '地面驱螺杆泵', null, null, '401', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (193, 'LiftingType', '井下驱螺杆泵', null, null, '402', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (194, 'LiftingType', '水力活塞泵', null, null, '500', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (195, 'LiftingType', '水力射流泵', null, null, '600', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (196, 'LiftingType', '气举', null, null, '700', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (197, 'LiftingType', '柱塞气举', null, null, '701', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (311, 'LiftingType', '其他', null, null, '800', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (391, 'MD_TYPE', '启用模块', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (393, 'MD_TYPE', '备用模块', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (371, 'ORG_TYPE', '集团', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (372, 'ORG_TYPE', '局级', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (373, 'ORG_TYPE', '厂级', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (374, 'ORG_TYPE', '矿级', null, null, '3', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (375, 'ORG_TYPE', '队级', null, null, '4', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (376, 'ORG_TYPE', '工区', null, null, '5', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (377, 'ORG_TYPE', '集气站', null, null, '6', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (378, 'ORG_TYPE', '其他', null, null, '7', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (860, 'PROTOCOL', 'modbus-tcp', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (861, 'PROTOCOL', 'modbus-rtu', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (431, 'ROLE_FLAG', '集团', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (432, 'ROLE_FLAG', '下属部门', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (884, 'SYSTEMACTION', '用户登录', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (885, 'SYSTEMACTION', '用户退出', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1064, 'TXBJQJYS', 'dc2828', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1065, 'TXBJQJYS', '00ff00', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1062, 'TXBJYS', 'dc2828', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1063, 'TXBJYS', '00ff00', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1066, 'TXBJYSTMD', '0', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1067, 'TXBJYSTMD', '0', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1002, 'USER_TITLE', '中控室', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1003, 'USER_TITLE', '工况巡检一组', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1004, 'USER_TITLE', '工况巡检二组', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1005, 'USER_TITLE', '工况巡检三组', null, null, '3', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1006, 'USER_TITLE', '工况巡检四组', null, null, '4', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1007, 'USER_TITLE', '其他', null, null, '5', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (411, 'USER_TYPE', '数据分析员', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (412, 'USER_TYPE', '系统管理员', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (413, 'USER_TYPE', '数据管理员', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (902, 'alarmType', '通信状态报警', null, null, '0', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (903, 'alarmType', '数值量报警', null, null, '1', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (942, 'alarmType', '枚举量报警', null, null, '2', null);

insert into TBL_CODE (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (943, 'alarmType', '开关量报警', null, null, '3', null);
