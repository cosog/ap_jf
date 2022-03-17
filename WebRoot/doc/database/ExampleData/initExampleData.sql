/*==============================================================*/
/* 初始化组织数据                                                 */
/*==============================================================*/
insert into TBL_ORG (ORG_ID, ORG_CODE, ORG_NAME, ORG_MEMO, ORG_PARENT, ORG_SEQ, ORG_FLAG, ORG_REALID, ORG_LEVEL, ORG_TYPE, ORG_COORDX, ORG_COORDY, SHOW_LEVEL)
values (2, '1000', '油田公司', '油田公司', 1, null, null, null, 0, 0, 0.000000, 0.000000, 1);

insert into TBL_ORG ( ORG_CODE, ORG_NAME, ORG_MEMO, ORG_PARENT, ORG_SEQ, ORG_FLAG, ORG_REALID, ORG_LEVEL, ORG_TYPE, ORG_COORDX, ORG_COORDY, SHOW_LEVEL)
select '100000','采油一厂','采油一厂',t2.org_id, null, null, null, 2, 2, 0.000000, 0.000000, 1 from TBL_ORG t2 where t2.org_code='1000';

insert into TBL_ORG ( ORG_CODE, ORG_NAME, ORG_MEMO, ORG_PARENT, ORG_SEQ, ORG_FLAG, ORG_REALID, ORG_LEVEL, ORG_TYPE, ORG_COORDX, ORG_COORDY, SHOW_LEVEL)
select '10000000','采油一队','采油一队',t2.org_id, null, null, null, 3, 3, 0.000000, 0.000000, 1 from TBL_ORG t2 where t2.org_code='100000';


/*==============================================================*/
/* 初始化设备数据                                              */
/*==============================================================*/
insert into TBL_WELLINFORMATION (ORGID, WELLNAME, SIGNINID, SLAVE, INSTANCECODE,ALARMINSTANCECODE, VIDEOURL, SORTNUM, DEVICETYPE, FACTORYNUMBER, MODEL, PRODUCTIONDATE, DELIVERYDATE, COMMISSIONINGDATE, CONTROLCABINETMODEL, PIPELINELENGTH)
select t2.org_id,'W_00000000175', '00000000175', '01', 'instance1', 'alarminstance1', null, 1001, 0, '001', 'XX', '2021-02-04', '2021-03-08', '2021-03-27', 'XXX', null from TBL_ORG t2 where t2.org_code='10000000';

insert into TBL_WELLINFORMATION (ORGID, WELLNAME, SIGNINID, SLAVE, INSTANCECODE,ALARMINSTANCECODE, VIDEOURL, SORTNUM, DEVICETYPE, FACTORYNUMBER, MODEL, PRODUCTIONDATE, DELIVERYDATE, COMMISSIONINGDATE, CONTROLCABINETMODEL, PIPELINELENGTH)
select t2.org_id,'00000000199', '00000000199', '01', 'instance4', 'alarminstance2', null, 1001, 1, 'XX', 'XX', null, null, null, null, 5000.00 from TBL_ORG t2 where t2.org_code='10000000';

insert into TBL_WELLINFORMATION (ORGID, WELLNAME, SIGNINID, SLAVE, INSTANCECODE,ALARMINSTANCECODE, VIDEOURL, SORTNUM, DEVICETYPE, FACTORYNUMBER, MODEL, PRODUCTIONDATE, DELIVERYDATE, COMMISSIONINGDATE, CONTROLCABINETMODEL, PIPELINELENGTH)
select t2.org_id,'W_00000000181', '00000000181', '01', 'instance1', 'alarminstance1', null, 1002, 0, '001', 'XX', '2021-02-04', '2021-03-08', '2021-03-27', 'XXX', null from TBL_ORG t2 where t2.org_code='10000000';

insert into TBL_WELLINFORMATION (ORGID, WELLNAME, SIGNINID, SLAVE, INSTANCECODE,ALARMINSTANCECODE, VIDEOURL, SORTNUM, DEVICETYPE, FACTORYNUMBER, MODEL, PRODUCTIONDATE, DELIVERYDATE, COMMISSIONINGDATE, CONTROLCABINETMODEL, PIPELINELENGTH)
select t2.org_id,'W_0034', '0034', '01', 'instance2', 'alarminstance1', null, 1003, 0, null, null, null, null, null, null, null from TBL_ORG t2 where t2.org_code='10000000';

insert into TBL_WELLINFORMATION (ORGID, WELLNAME, SIGNINID, SLAVE, INSTANCECODE,ALARMINSTANCECODE, VIDEOURL, SORTNUM, DEVICETYPE, FACTORYNUMBER, MODEL, PRODUCTIONDATE, DELIVERYDATE, COMMISSIONINGDATE, CONTROLCABINETMODEL, PIPELINELENGTH)
select t2.org_id,'sms1', '12345678901', null, 'smsinstance1', null, null, 1001, 2, null, null, null, null, null, null, null from TBL_ORG t2 where t2.org_code='10000000';

exit;