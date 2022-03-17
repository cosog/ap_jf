/*==============================================================*/
/* View: viw_org                                         */
/*==============================================================*/
create or replace view viw_org as
select t.org_id,t.org_code,t.org_name,t.org_memo,t.org_parent,t.org_seq,
substr(sys_connect_by_path(t.org_name,'/'),2) as allpath
from tbl_org t
start with t.org_parent=0
connect by   t.org_parent= prior t.org_id;
/


/*==============================================================*/
/* View: viw_pumpdevice                                         */
/*==============================================================*/
create or replace view viw_pumpdevice as
select t.id,org.org_name as orgName,org.org_id as orgid,
t.wellname,
t.devicetype,c2.itemname as devicetypename,
t.applicationscenarios,c1.itemname as applicationScenariosName,
t.signinid,t.slave,
t.videourl,
t.instancecode,
decode(t.devicetype,2,t4.name,t2.name) as instancename,
t.alarminstancecode,t3.name as alarminstancename,
t.status,decode(t.status,1,'使能','失效') as statusName,
t.sortnum
from tbl_pumpdevice t
left outer join  tbl_org org  on t.orgid=org.org_id
left outer join tbl_protocolinstance t2 on t.instancecode=t2.code
left outer join tbl_protocolalarminstance t3 on t.alarminstancecode=t3.code
left outer join tbl_protocolsmsinstance t4 on t.instancecode =t4.code
left outer join tbl_code c1 on c1.itemcode='APPLICATIONSCENARIOS' and t.applicationscenarios=c1.itemvalue
left outer join tbl_code c2 on c2.itemcode='DEVICETYPE' and t.devicetype=c2.itemvalue;
/

/*==============================================================*/
/* View: viw_pipelinedevice                                         */
/*==============================================================*/
create or replace view viw_pipelinedevice as
select t.id,org.org_name as orgName,org.org_id as orgid,
t.wellname,
t.devicetype,c2.itemname as devicetypename,
t.applicationscenarios,c1.itemname as applicationScenariosName,
t.signinid,t.slave,
t.videourl,
t.instancecode,
decode(t.devicetype,2,t4.name,t2.name) as instancename,
t.alarminstancecode,t3.name as alarminstancename,
t.status,decode(t.status,1,'使能','失效') as statusName,
t.sortnum
from tbl_pipelinedevice t
left outer join  tbl_org org  on t.orgid=org.org_id
left outer join tbl_protocolinstance t2 on t.instancecode=t2.code
left outer join tbl_protocolalarminstance t3 on t.alarminstancecode=t3.code
left outer join tbl_protocolsmsinstance t4 on t.instancecode =t4.code
left outer join tbl_code c1 on c1.itemcode='APPLICATIONSCENARIOS' and t.applicationscenarios=c1.itemvalue
left outer join tbl_code c2 on c2.itemcode='DEVICETYPE' and t.devicetype=c2.itemvalue;
/

/*==============================================================*/
/* View: viw_smsdevice                             */
/*==============================================================*/
create or replace view viw_smsdevice as
select t.id,org.org_name as orgName,org.org_id as orgid,
t.wellname,
t.signinid,
t.instancecode,
t2.name as instancename,
t.sortnum
from tbl_smsdevice t
left outer join  tbl_org org  on t.orgid=org.org_id
left outer join tbl_protocolsmsinstance t2 on t.instancecode =t2.code;
/

/*==============================================================*/
/* View: viw_pumpacqrawdata                             */
/*==============================================================*/
create or replace view viw_pumpacqrawdata as
select t2.id,t2.wellid,t.wellname,t.devicetype,t3.itemname as deviceTypeName,t.signinid,t.slave,t2.acqtime,t2.rawdata,t.orgid,t4.allpath
from tbl_pumpdevice t,tbl_pumpacqrawdata t2,tbl_code t3,viw_org t4
where t.id=t2.wellid and t.orgid=t4.org_id
and t3.itemcode='DEVICETYPE' and t3.itemvalue=t.devicetype;
/

/*==============================================================*/
/* View: viw_pumpalarminfo_hist                           */
/*==============================================================*/
create or replace view viw_pumpalarminfo_hist as
select t2.id,t2.wellid,t.wellname,
t.devicetype,t4.itemname as deviceTypeName,
t2.alarmtime,t2.itemname,t2.alarmtype,t5.itemname as alarmTypeName,
t2.alarmvalue,t2.alarminfo,t2.alarmlimit,t2.hystersis,
t2.alarmlevel,t3.itemname as alarmLevelName,
t2.issendmessage,t2.issendmail,
t2.recoverytime,t.orgid
 from tbl_pumpdevice t,tbl_pumpalarminfo_hist t2 ,tbl_code t3,tbl_code t4,tbl_code t5
 where t2.wellid=t.id
 and t3.itemcode='BJJB' and t3.itemvalue=t2.alarmlevel
 and t4.itemcode='DEVICETYPE' and t4.itemvalue=t.devicetype
 and t5.itemcode='alarmType' and t5.itemvalue=t2.alarmtype;
/

/*==============================================================*/
/* View: viw_pumpalarminfo_latest                                  */
/*==============================================================*/
create or replace view viw_pumpalarminfo_latest as
select t2.id,t2.wellid,t.wellname,
t.devicetype,t4.itemname as deviceTypeName,
t2.alarmtime,t2.itemname,t2.alarmtype,t5.itemname as alarmTypeName,
t2.alarmvalue,t2.alarminfo,t2.alarmlimit,t2.hystersis,
t2.alarmlevel,t3.itemname as alarmLevelName,
t2.issendmessage,t2.issendmail,
t2.recoverytime,t.orgid
 from tbl_pumpdevice t,tbl_pumpalarminfo_latest t2 ,tbl_code t3,tbl_code t4,tbl_code t5
 where t2.wellid=t.id
 and t3.itemcode='BJJB' and t3.itemvalue=t2.alarmlevel
 and t4.itemcode='DEVICETYPE' and t4.itemvalue=t.devicetype
 and t5.itemcode='alarmType' and t5.itemvalue=t2.alarmtype;
/

/*==============================================================*/
/* View: viw_pipelineacqrawdata                             */
/*==============================================================*/
create or replace view viw_pipelineacqrawdata as
select t2.id,t2.wellid,t.wellname,t.devicetype,t3.itemname as deviceTypeName,t.signinid,t.slave,t2.acqtime,t2.rawdata,t.orgid,t4.allpath
from tbl_pipelinedevice t,tbl_pipelineacqrawdata t2,tbl_code t3,viw_org t4
where t.id=t2.wellid and t.orgid=t4.org_id
and t3.itemcode='DEVICETYPE' and t3.itemvalue=t.devicetype;
/

/*==============================================================*/
/* View: viw_pipelinealarminfo_hist                           */
/*==============================================================*/
create or replace view viw_pipelinealarminfo_hist as
select t2.id,t2.wellid,t.wellname,
t.devicetype,t4.itemname as deviceTypeName,
t2.alarmtime,t2.itemname,t2.alarmtype,t5.itemname as alarmTypeName,
t2.alarmvalue,t2.alarminfo,t2.alarmlimit,t2.hystersis,
t2.alarmlevel,t3.itemname as alarmLevelName,
t2.issendmessage,t2.issendmail,
t2.recoverytime,t.orgid
 from tbl_pipelinedevice t,tbl_pipelinealarminfo_hist t2 ,tbl_code t3,tbl_code t4,tbl_code t5
 where t2.wellid=t.id
 and t3.itemcode='BJJB' and t3.itemvalue=t2.alarmlevel
 and t4.itemcode='DEVICETYPE' and t4.itemvalue=t.devicetype
 and t5.itemcode='alarmType' and t5.itemvalue=t2.alarmtype;
/

/*==============================================================*/
/* View: viw_pumpalarminfo_latest                                  */
/*==============================================================*/
create or replace view viw_pipelinealarminfo_latest as
select t2.id,t2.wellid,t.wellname,
t.devicetype,t4.itemname as deviceTypeName,
t2.alarmtime,t2.itemname,t2.alarmtype,t5.itemname as alarmTypeName,
t2.alarmvalue,t2.alarminfo,t2.alarmlimit,t2.hystersis,
t2.alarmlevel,t3.itemname as alarmLevelName,
t2.issendmessage,t2.issendmail,
t2.recoverytime,t.orgid
 from tbl_pipelinedevice t,tbl_pipelinealarminfo_latest t2 ,tbl_code t3,tbl_code t4,tbl_code t5
 where t2.wellid=t.id
 and t3.itemcode='BJJB' and t3.itemvalue=t2.alarmlevel
 and t4.itemcode='DEVICETYPE' and t4.itemvalue=t.devicetype
 and t5.itemcode='alarmType' and t5.itemvalue=t2.alarmtype;
/

/*==============================================================*/
/* View: viw_deviceoperationlog                                  */
/*==============================================================*/
create or replace view viw_deviceoperationlog as
select t.id,t.devicetype,code1.itemname as deviceTypeName,
t.wellname,t.createtime,t.user_id,t.loginip,t.action,code2.itemname as actionname,t.remark ,
(case when t.devicetype>=100 and t.devicetype<200 then t2.orgid
      when t.devicetype>=200 and t.devicetype<300 then t3.orgid
      when t.devicetype>=300then t4.orgid end) as orgid
from tbl_deviceoperationlog t
left outer join tbl_pumpdevice t2 on t.wellname=t2.wellname and t.devicetype>=100 and t.devicetype<200
left outer join tbl_pipelinedevice t3 on t.wellname=t3.wellname and t.devicetype>=200 and t.devicetype<300
left outer join tbl_smsdevice t4 on t.wellname=t4.wellname and t.devicetype>=300
left outer join tbl_code code1 on t.devicetype=code1.itemvalue and upper(code1.itemcode)=upper('devicetype')
left outer join tbl_code code2 on t.action=code2.itemvalue and upper(code2.itemcode)=upper('action');
/

/*==============================================================*/
/* View: viw_systemlog                                  */
/*==============================================================*/
create or replace view viw_systemlog as
select t.id,t.createtime,t.user_id,t.loginip,t.action,t3.itemname as actionname,t.remark ,t2.user_orgid as orgid
from tbl_systemlog t,tbl_user t2,tbl_code t3
where t.user_id=t2.user_id
and t.action=t3.itemvalue and upper(t3.itemcode)=upper('systemAction');
/