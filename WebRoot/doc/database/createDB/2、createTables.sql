/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     2021-10-20                                    */
/*==============================================================*/

/*==============================================================*/
/* Table: TBL_ACQ_GROUP_CONF                                  */
/*==============================================================*/
create table TBL_ACQ_GROUP_CONF
(
  id         NUMBER(10) not null,
  group_code VARCHAR2(50) not null,
  group_name VARCHAR2(50),
  acq_cycle  NUMBER(10) default 1,
  save_cycle NUMBER(10) default 5,
  protocol   VARCHAR2(50),
  type       NUMBER(1) default 0,
  remark     VARCHAR2(2000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_GROUP_CONF
  add constraint PK_ACQUISITIONGROUP primary key (ID)
/

/*==============================================================*/
/* Table: TBL_ACQ_UNIT_CONF                                  */
/*==============================================================*/
create table TBL_ACQ_UNIT_CONF
(
  id        NUMBER(10) not null,
  unit_code VARCHAR2(50) not null,
  unit_name VARCHAR2(50),
  protocol  VARCHAR2(50),
  remark    VARCHAR2(2000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_UNIT_CONF
  add constraint PK_T_ACQUISITIONUNIT primary key (ID)
/

/*==============================================================*/
/* Table: TBL_ACQ_ITEM2GROUP_CONF                                  */
/*==============================================================*/
create table TBL_ACQ_ITEM2GROUP_CONF
(
  id       NUMBER(10) not null,
  itemid   NUMBER(10),
  itemname VARCHAR2(100),
  itemcode VARCHAR2(100),
  groupid  NUMBER(10) not null,
  sort     NUMBER(10),
  bitindex NUMBER(3),
  showlevel NUMBER(10),
  realtimecurve NUMBER(10),
  historycurve NUMBER(10),
  realtimecurvecolor VARCHAR2(20),
  historycurvecolor  VARCHAR2(20),
  matrix   VARCHAR2(8)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_ITEM2GROUP_CONF
  add constraint PK_ACQ_GROUP_ITEM primary key (ID)
/

/*==============================================================*/
/* Table: TBL_ACQ_GROUP2UNIT_CONF                                    */
/*==============================================================*/
create table TBL_ACQ_GROUP2UNIT_CONF
(
  id      NUMBER(10) not null,
  groupid NUMBER(10) not null,
  unitid  NUMBER(10) not null,
  matrix  VARCHAR2(8) not null
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_GROUP2UNIT_CONF add constraint PK_ACQ_UNIT_GROUP primary key (ID)
/

/*==============================================================*/
/* Table: TBL_ALARM_UNIT_CONF                                    */
/*==============================================================*/
create table TBL_ALARM_UNIT_CONF
(
  id        NUMBER(10) not null,
  unit_code VARCHAR2(50) not null,
  unit_name VARCHAR2(50),
  protocol  VARCHAR2(50),
  remark    VARCHAR2(2000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ALARM_UNIT_CONF
  add constraint PK_TBL_ALARM_UNIT_CONF primary key (ID)
/

/*==============================================================*/
/* Table: TBL_ALARM_ITEM2UNIT_CONF                                    */
/*==============================================================*/
create table TBL_ALARM_ITEM2UNIT_CONF
(
  id            NUMBER(10) not null,
  unitid        NUMBER(10) not null,
  itemid        NUMBER(10),
  itemname      VARCHAR2(100),
  itemcode      VARCHAR2(100),
  itemaddr      NUMBER(10),
  value         NUMBER(10,3),
  upperlimit    NUMBER(10,3),
  lowerlimit    NUMBER(10,3),
  hystersis     NUMBER(10,3),
  delay         NUMBER(10),
  alarmlevel    NUMBER(3),
  alarmsign     NUMBER(1),
  type          NUMBER(1),
  bitindex      NUMBER(3),
  issendmessage NUMBER(1) default 0,
  issendmail    NUMBER(1) default 0
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ALARM_ITEM2UNIT_CONF add constraint PK_ALARM_ITEM2UNIT_CONF primary key (ID)
/

/*==============================================================*/
/* Table: TBL_CODE                                    */
/*==============================================================*/
create table TBL_CODE
(
  id        NUMBER(10) not null,
  itemcode  VARCHAR2(200),
  itemname  VARCHAR2(200),
  itemvalue VARCHAR2(20),
  tablecode VARCHAR2(200),
  state     NUMBER(10),
  remark    VARCHAR2(200)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_CODE
  add constraint PK_T_CODE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_DATAMAPPING                                    */
/*==============================================================*/
create table TBL_DATAMAPPING
(
  id              NUMBER(10) not null,
  name            VARCHAR2(50) not null,
  mappingcolumn   VARCHAR2(30) not null,
  protocoltype    NUMBER(1) not null,
  repetitiontimes NUMBER(2),
  mappingmode     NUMBER(1)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_DATAMAPPING
  add constraint PK_DATAMAPPING primary key (ID, NAME)
/

/*==============================================================*/
/* Table: TBL_DEVICEOPERATIONLOG                                    */
/*==============================================================*/
create table TBL_DEVICEOPERATIONLOG
(
  id         NUMBER(10) not null,
  wellname   VARCHAR2(20),
  createtime DATE,
  user_id    VARCHAR2(20),
  loginip    VARCHAR2(20),
  action     NUMBER(2),
  devicetype NUMBER(3),
  remark     VARCHAR2(200)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_DEVICEOPERATIONLOG
  add constraint PK_TBL_DEVICEOPERATIONLOG primary key (ID)
/

/*==============================================================*/
/* Table: TBL_SYSTEMLOG                                    */
/*==============================================================*/
create table TBL_SYSTEMLOG
(
  id         NUMBER(10) not null,
  createtime DATE,
  user_id    VARCHAR2(20),
  loginip    VARCHAR2(20),
  action     NUMBER(2),
  remark     VARCHAR2(200)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_SYSTEMLOG add constraint PK_TBL_SYSTEMLOG primary key (ID)
/

/*==============================================================*/
/* Table: TBL_DIST_NAME                                    */
/*==============================================================*/
create table TBL_DIST_NAME
(
  sysdataid  VARCHAR2(32) not null,
  tenantid   VARCHAR2(50),
  cname      VARCHAR2(50),
  ename      VARCHAR2(50),
  sorts      NUMBER,
  status     NUMBER,
  creator    VARCHAR2(50),
  updateuser VARCHAR2(50),
  updatetime DATE default sysdate not null,
  createdate DATE default sysdate
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_DIST_NAME add constraint PK_SYSTEMDATAINFO primary key (SYSDATAID)
/

/*==============================================================*/
/* Table: TBL_DIST_ITEM                                    */
/*==============================================================*/
create table TBL_DIST_ITEM
(
  dataitemid VARCHAR2(32) not null,
  tenantid   VARCHAR2(50),
  sysdataid  VARCHAR2(50),
  cname      VARCHAR2(50),
  ename      VARCHAR2(200),
  datavalue  VARCHAR2(200),
  sorts      NUMBER,
  status     NUMBER,
  creator    VARCHAR2(50),
  updateuser VARCHAR2(50),
  updatetime DATE default sysdate,
  createdate DATE default sysdate
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_DIST_ITEM
  add constraint PK_DATAITEMSINFO primary key (DATAITEMID)
/
alter table TBL_DIST_ITEM
  add constraint FK_PK_DATAITEMSINFO_SYSID foreign key (SYSDATAID)
  references TBL_DIST_NAME (SYSDATAID) on delete cascade
/

/*==============================================================*/
/* Table: TBL_MODULE                                    */
/*==============================================================*/
create table TBL_MODULE
(
  md_id       NUMBER(10) not null,
  md_parentid NUMBER(10) default 0 not null,
  md_name     VARCHAR2(100) not null,
  md_showname VARCHAR2(100),
  md_url      VARCHAR2(200),
  md_code     VARCHAR2(200),
  md_seq      NUMBER(20),
  md_level    NUMBER(10),
  md_flag     NUMBER(10),
  md_icon     VARCHAR2(100),
  md_type     NUMBER(1) default 0,
  md_control  VARCHAR2(100)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_MODULE add constraint P_MD primary key (MD_ID)
/

/*==============================================================*/
/* Table: TBL_ROLE                                    */
/*==============================================================*/
create table TBL_ROLE
(
  role_id     NUMBER(10) not null,
  role_name   VARCHAR2(40) not null,
  role_level NUMBER(3) default 1,
  role_flag   NUMBER(10),
  showlevel   NUMBER(10) default 0,
  remark      VARCHAR2(2000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ROLE
  add constraint PK_ROLE_ID primary key (ROLE_ID)
/

/*==============================================================*/
/* Table: TBL_MODULE2ROLE                                    */
/*==============================================================*/
create table TBL_MODULE2ROLE
(
  rm_id       NUMBER(10) not null,
  rm_moduleid NUMBER(10) not null,
  rm_roleid   NUMBER(10) not null,
  rm_matrix   VARCHAR2(8) not null
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_MODULE2ROLE add constraint PK_RM_ID primary key (RM_ID)
/
alter table TBL_MODULE2ROLE
  add constraint FK_ORG_MODULEID foreign key (RM_MODULEID)
  references TBL_MODULE (MD_ID) on delete cascade
/
alter table TBL_MODULE2ROLE
  add constraint FK_ORG_ROLEID foreign key (RM_ROLEID)
  references TBL_ROLE (ROLE_ID) on delete cascade
/

/*==============================================================*/
/* Table: TBL_ORG                                    */
/*==============================================================*/
create table TBL_ORG
(
  org_id     NUMBER(10) not null,
  org_code   VARCHAR2(20),
  org_name   VARCHAR2(100) not null,
  org_memo   VARCHAR2(4000),
  org_parent NUMBER(10) default 0 not null,
  org_seq    NUMBER(10)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/

/*==============================================================*/
/* Table: TBL_PROTOCOLALARMINSTANCE                                    */
/*==============================================================*/
create table TBL_PROTOCOLALARMINSTANCE
(
  id          NUMBER(10) not null,
  name        VARCHAR2(50),
  code        VARCHAR2(50),
  alarmunitid NUMBER(10),
  devicetype  NUMBER(1) default 0,
  sort        NUMBER(10)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PROTOCOLALARMINSTANCE add constraint PK_PROTOCOLALARMINSTANCE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PROTOCOLINSTANCE                                    */
/*==============================================================*/
create table TBL_PROTOCOLINSTANCE
(
  id               NUMBER(10) not null,
  name             VARCHAR2(50),
  code             VARCHAR2(50),
  acqprotocoltype  VARCHAR2(50),
  ctrlprotocoltype VARCHAR2(50),
  signinprefix     VARCHAR2(50),
  signinsuffix     VARCHAR2(50),
  heartbeatprefix  VARCHAR2(50),
  heartbeatsuffix  VARCHAR2(50),
  unitid           NUMBER(10),
  devicetype       NUMBER(1) default 0,
  sort             NUMBER(10)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PROTOCOLINSTANCE  add constraint PK_PROTOCOLINSTANCE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PROTOCOLSMSINSTANCE                                    */
/*==============================================================*/
create table TBL_PROTOCOLSMSINSTANCE
(
  id               NUMBER(10) not null,
  name             VARCHAR2(50),
  code             VARCHAR2(50),
  acqprotocoltype  VARCHAR2(50),
  ctrlprotocoltype VARCHAR2(50),
  sort             NUMBER(10)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PROTOCOLSMSINSTANCE add constraint PK_PROTOCOLSMSINSTANCE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_RESOURCEMONITORING                                    */
/*==============================================================*/
create table TBL_RESOURCEMONITORING
(
  id             NUMBER(10) not null,
  acqtime        DATE,
  apprunstatus   NUMBER(2),
  appversion     VARCHAR2(50),
  adrunstatus    NUMBER(2),
  adversion      VARCHAR2(50),
  cpuusedpercent VARCHAR2(50),
  memusedpercent NUMBER(8,2),
  tablespacesize NUMBER(10,2)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RESOURCEMONITORING add constraint PK_TBL_RESOURCEMONITORING primary key (ID)
/

/*==============================================================*/
/* Table: TBL_USER                                    */
/*==============================================================*/
create table TBL_USER
(
  user_no         NUMBER(10) not null,
  user_id         VARCHAR2(20) not null,
  user_pwd        VARCHAR2(50),
  user_name       VARCHAR2(40) not null,
  user_in_email   VARCHAR2(40),
  user_phone      VARCHAR2(40),
  user_type       NUMBER(10) default 1,
  user_orgid      NUMBER(10) default 0 not null,
  user_regtime    DATE,
  user_quicklogin NUMBER(1) default 0,
  user_enable      NUMBER(1) default 1,
  user_receivesms  NUMBER(10) default 0,
  user_receivemail NUMBER(10) default 0
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_USER add constraint PK_USER_NO primary key (USER_NO)
/

/*==============================================================*/
/* Table: TBL_RPCDEVICE                                    */
/*==============================================================*/
create table TBL_RPCDEVICE
(
  id                   NUMBER(10) not null,
  orgid                NUMBER(10) not null,
  wellname             VARCHAR2(200) not null,
  devicetype           NUMBER(3) default 101,
  applicationscenarios NUMBER(2) default 0,
  signinid             VARCHAR2(200),
  slave                VARCHAR2(200),
  instancecode         VARCHAR2(50),
  alarminstancecode    VARCHAR2(50),
  videourl             VARCHAR2(400),
  status               NUMBER(1) default 1,
  sortnum              NUMBER(10) default 9999
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCDEVICE
  add constraint PK_RPCDEVICE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PCPDEVICE                                    */
/*==============================================================*/
create table TBL_PCPDEVICE
(
  id                   NUMBER(10) not null,
  orgid                NUMBER(10) not null,
  wellname             VARCHAR2(200) not null,
  devicetype           NUMBER(3) default 201,
  applicationscenarios NUMBER(2),
  signinid             VARCHAR2(200),
  slave                VARCHAR2(200),
  instancecode         VARCHAR2(50),
  alarminstancecode    VARCHAR2(50),
  videourl             VARCHAR2(400),
  status               NUMBER(1) default 1,
  sortnum              NUMBER(10) default 9999
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPDEVICE
  add constraint PK_PCPDEVICE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_SMSDEVICE                                    */
/*==============================================================*/
create table TBL_SMSDEVICE
(
  id           NUMBER(10) not null,
  orgid        NUMBER(10),
  wellname     VARCHAR2(200) not null,
  signinid     VARCHAR2(200),
  instancecode VARCHAR2(50),
  sortnum      NUMBER(10) default 9999
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_SMSDEVICE
  add constraint PK_SMSDEVICE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_RPCDEVICEADDINFO                                    */
/*==============================================================*/
create table TBL_RPCDEVICEADDINFO
(
  id        NUMBER(10) not null,
  wellid    NUMBER(10) not null,
  itemname  VARCHAR2(200) not null,
  itemvalue VARCHAR2(200),
  itemunit  VARCHAR2(200)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCDEVICEADDINFO
  add constraint PK_RPCDEVICEADDINFO primary key (ID)
/

/*==============================================================*/
/* Table: TBL_RPCDEVICEGRAPHICSET                                    */
/*==============================================================*/
create table TBL_RPCDEVICEGRAPHICSET
(
  id           NUMBER(10) not null,
  wellid       NUMBER(10) not null,
  graphicstyle VARCHAR2(4000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCDEVICEGRAPHICSET
  add constraint PK_RPCDEVICEGRAPHICSET primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PCPDEVICEADDINFO                                    */
/*==============================================================*/
create table TBL_PCPDEVICEADDINFO
(
  id        NUMBER(10) not null,
  wellid    NUMBER(10) not null,
  itemname  VARCHAR2(200) not null,
  itemvalue VARCHAR2(200),
  itemunit  VARCHAR2(200)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPDEVICEADDINFO
  add constraint PK_PCPDEVICEADDINFO primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PCPDEVICEGRAPHICSET                                    */
/*==============================================================*/
create table TBL_PCPDEVICEGRAPHICSET
(
  id           NUMBER(10) not null,
  wellid       NUMBER(10) not null,
  graphicstyle VARCHAR2(4000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPDEVICEGRAPHICSET
  add constraint PK_PCPDEVICEGRAPHICSET primary key (ID)
/

/*==============================================================*/
/* Table: TBL_AUXILIARYDEVICE                                    */
/*==============================================================*/
create table TBL_AUXILIARYDEVICE
(
  id     NUMBER(10) not null,
  name   VARCHAR2(200),
  type   NUMBER(2) default 0,
  model  VARCHAR2(200),
  sort   NUMBER(10) not null,
  remark VARCHAR2(2000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_AUXILIARYDEVICE
  add constraint PK_AUXILIARYDEVICE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_AUXILIARY2MASTER                                    */
/*==============================================================*/
create table TBL_AUXILIARY2MASTER
(
  id          NUMBER(10) not null,
  masterid    NUMBER(10) not null,
  auxiliaryid NUMBER(10) not null,
  matrix      VARCHAR2(8) not null
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_AUXILIARY2MASTER
  add constraint PK_AUXILIARY2MASTER primary key (ID)
/

/*==============================================================*/
/* Table: TBL_RPCACQDATA_HIST                                    */
/*==============================================================*/
create table TBL_RPCACQDATA_HIST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCACQDATA_HIST
  add constraint PK_TBL_RPCACQDATA_HIST primary key (ID)
/

/*==============================================================*/
/* Table: TBL_RPCACQDATA_LATEST                                    */
/*==============================================================*/
create table TBL_RPCACQDATA_LATEST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCACQDATA_LATEST
  add constraint PK_TBL_RPCACQDATA_LATEST primary key (ID)
/

/*==============================================================*/
/* Table: TBL_RPCACQRAWDATA                                    */
/*==============================================================*/
create table TBL_RPCACQRAWDATA
(
  id      NUMBER(10) not null,
  wellid  NUMBER(10) not null,
  acqtime DATE not null,
  rawdata VARCHAR2(4000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCACQRAWDATA
  add constraint PK_RPCACQRAWDATA primary key (ID)
/

/*==============================================================*/
/* Table: TBL_RPCALARMINFO_HIST                               */
/*==============================================================*/
create table TBL_RPCALARMINFO_HIST
(
  id            NUMBER(10) not null,
  wellid        NUMBER(10),
  alarmtime     DATE,
  itemname      VARCHAR2(100),
  alarmtype     NUMBER(1),
  alarmvalue    NUMBER(10,3),
  alarminfo     VARCHAR2(100),
  alarmlimit    NUMBER(10,3),
  hystersis     NUMBER(10,3),
  alarmlevel    NUMBER(3),
  issendmessage NUMBER(1) default 0,
  issendmail    NUMBER(1) default 0,
  recoverytime  DATE
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCALARMINFO_HIST
  add constraint PK_RPCALARMINFO_HIST primary key (ID)
/


/*==============================================================*/
/* Table: TBL_RPCALARMINFO_LATEST                                  */
/*==============================================================*/
create table TBL_RPCALARMINFO_LATEST
(
  id            NUMBER(10) not null,
  wellid        NUMBER(10),
  alarmtime     DATE,
  itemname      VARCHAR2(100),
  alarmtype     NUMBER(1),
  alarmvalue    NUMBER(10,3),
  alarminfo     VARCHAR2(100),
  alarmlimit    NUMBER(10,3),
  hystersis     NUMBER(10,3),
  alarmlevel    NUMBER(3),
  issendmessage NUMBER(1) default 0,
  issendmail    NUMBER(1) default 0,
  recoverytime  DATE
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RPCALARMINFO_LATEST
  add constraint PK_RPCALARMINFO_LATEST primary key (ID)
/


/*==============================================================*/
/* Table: TBL_PCPACQDATA_HIST                                    */
/*==============================================================*/
create table TBL_PCPACQDATA_HIST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPACQDATA_HIST
  add constraint PK_TBL_PCPACQDATA_HIST primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PCPACQDATA_LATEST                                    */
/*==============================================================*/
create table TBL_PCPACQDATA_LATEST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPACQDATA_LATEST
  add constraint PK_TBL_PCPACQDATA_LATEST primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PCPACQRAWDATA                                    */
/*==============================================================*/
create table TBL_PCPACQRAWDATA
(
  id      NUMBER(10) not null,
  wellid  NUMBER(10) not null,
  acqtime DATE not null,
  rawdata VARCHAR2(4000)
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPACQRAWDATA
  add constraint PK_PCPACQRAWDATA primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PCPALARMINFO_HIST                               */
/*==============================================================*/
create table TBL_PCPALARMINFO_HIST
(
  id            NUMBER(10) not null,
  wellid        NUMBER(10),
  alarmtime     DATE,
  itemname      VARCHAR2(100),
  alarmtype     NUMBER(1),
  alarmvalue    NUMBER(10,3),
  alarminfo     VARCHAR2(100),
  alarmlimit    NUMBER(10,3),
  hystersis     NUMBER(10,3),
  alarmlevel    NUMBER(3),
  issendmessage NUMBER(1) default 0,
  issendmail    NUMBER(1) default 0,
  recoverytime  DATE
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPALARMINFO_HIST
  add constraint PK_PCPALARMINFO_HIST primary key (ID)
/


/*==============================================================*/
/* Table: TBL_PCPALARMINFO_LATEST                                  */
/*==============================================================*/
create table TBL_PCPALARMINFO_LATEST
(
  id            NUMBER(10) not null,
  wellid        NUMBER(10),
  alarmtime     DATE,
  itemname      VARCHAR2(100),
  alarmtype     NUMBER(1),
  alarmvalue    NUMBER(10,3),
  alarminfo     VARCHAR2(100),
  alarmlimit    NUMBER(10,3),
  hystersis     NUMBER(10,3),
  alarmlevel    NUMBER(3),
  issendmessage NUMBER(1) default 0,
  issendmail    NUMBER(1) default 0,
  recoverytime  DATE
)
tablespace AP_JF_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PCPALARMINFO_LATEST
  add constraint PK_PCPALARMINFO_LATEST primary key (ID)
/

/*==============================================================*/
/* Database package: MYPACKAGE                                  */
/*==============================================================*/
create or replace package MYPACKAGE as
   type MY_CURSOR is REF CURSOR;
end MYPACKAGE;
/

create or replace package body MYPACKAGE as
   
end MYPACKAGE;
/