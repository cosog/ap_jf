**敏捷生产 V7.6**

**数据库手册**

**北京科斯奇石油科技有限公司 制作**

**目 录**

[一、表	1](#_Toc93496285)

>   [1.1 概览	1](#_Toc93496286)

>   [1.2 详述	3](#_Toc93496287)

>   [1.2.1 tbl_org	3](#_Toc93496288)

>   [1.2.2 tbl_user	4](#_Toc93496289)

>   [1.2.3 tbl_role	5](#_Toc93496290)

>   [1.2.4 tbl_module	5](#_Toc93496291)

>   [1.2.5 tbl_module2role	6](#_Toc93496292)

>   [1.2.6 tbl_dist_name	6](#_Toc93496293)

>   [1.2.7 tbl_dist_item	7](#_Toc93496294)

>   [1.2.8 tbl_code	8](#_Toc93496295)

>   [1.2.9 tbl_datamapping	8](#_Toc93496296)

>   [1.2.10 tbl_acq_unit_conf	8](#_Toc93496297)

>   [1.2.11 tbl_acq_group_conf	9](#_Toc93496298)

>   [1.2.12 tbl_acq_item2group_conf	9](#_Toc93496299)

>   [1.2.13 tbl_acq_group2unit_conf	10](#_Toc93496300)

>   [1.2.14 tbl_alarm_unit_conf	10](#_Toc93496301)

>   [1.2.15 tbl_alarm_item2unit_conf	11](#_Toc93496302)

>   [1.2.16 tbl_protocolinstance	12](#_Toc93496303)

>   [1.2.17 tbl_protocolalarminstance	12](#_Toc93496304)

>   [1.2.18 tbl_protocolsmsinstance	13](#_Toc93496305)

>   [1.2.19 tbl_pumpdevice	14](#_Toc93496306)

>   [1.2.20 tbl_pipelinedevice	15](#_Toc93496307)

>   [1.2.21 tbl_smsdevice	16](#_Toc93496308)

>   [1.2.22 tbl_auxiliarydevice	17](#_Toc93496309)

>   [1.2.23 tbl_auxiliary2master	17](#_Toc93496310)

>   [1.2.24 tbl_pumpdeviceaddinfo	18](#_Toc93496311)

>   [1.2.25 tbl_pipelinedeviceaddinfo	18](#_Toc93496312)

>   [1.2.26 tbl_pumpacqdata_latest	19](#_Toc93496313)

>   [1.2.27 tbl_pumpacqdata_hist	19](#_Toc93496314)

>   [1.2.28 tbl_pumpacqrawdata	20](#_Toc93496315)

>   [1.2.29 tbl_pumpalarminfo_latest	21](#_Toc93496316)

>   [1.2.30 tbl_pumpalarminfo_hist	21](#_Toc93496317)

>   [1.2.31 tbl_pumpdevicegraphicset	21](#_Toc93496318)

>   [1.2.32 tbl_pipelineacqdata_latest	22](#_Toc93496319)

>   [1.2.33 tbl_pipelineacqdata_hist	22](#_Toc93496320)

>   [1.2.34 tbl_pipelineacqrawdata	23](#_Toc93496321)

>   [1.2.35 tbl_pipelinealarminfo_latest	24](#_Toc93496322)

>   [1.2.36 tbl_pipelinealarminfo_hist	24](#_Toc93496323)

>   [1.2.37 tbl_pipelinedevicegraphicset	24](#_Toc93496324)

>   [1.2.38 tbl_deviceoperationlog	25](#_Toc93496325)

>   [1.2.39 tbl_systemlog	25](#_Toc93496326)

>   [1.2.40 tbl_resourcemonitoring	26](#_Toc93496327)

[二、视图	27](#_Toc93496328)

>   [2.1 概览	27](#_Toc93496329)

>   [2.2 详述	28](#_Toc93496330)

>   [2.2.1 viw_org	28](#_Toc93496331)

>   [2.2.2 viw_pumpdevice	29](#_Toc93496332)

>   [2.2.3 viw_pipelinedevice	29](#_Toc93496333)

>   [2.2.4 viw_sysdevice	30](#_Toc93496334)

>   [2.2.5 viw_pumpacqrawdata	31](#_Toc93496335)

>   [2.2.6 viw_pipelineacqrawdata	31](#_Toc93496336)

>   [2.2.7 viw_pumpalarminfo_latest	32](#_Toc93496337)

>   [2.2.8 viw_pumpalarminfo_hist	32](#_Toc93496338)

>   [2.2.9 viw_pipelinealarminfo_latest	33](#_Toc93496339)

>   [2.2.10 viw_pipelinealarminfo_hist	33](#_Toc93496340)

>   [2.2.11 viw_deviceoperationlog	34](#_Toc93496341)

>   [2.2.12 viw_systemlog	34](#_Toc93496342)

[三、存储过程	35](#_Toc93496343)

[四、触发器	36](#_Toc93496344)

# 一、表

## 1.1 概览

表1-1 表概览

| **序号** | **名称**                      | **描述**                |
|----------|-------------------------------|-------------------------|
| 1        | tbl_org                       | 组织数据表              |
| 2        | tbl_user                      | 用户数据表              |
| 3        | tbl_role                      | 角色数据表              |
| 4        | tbl_module                    | 模块数据表              |
| 5        | tbl_module2role               | 模块角色关系表          |
| 6        | tbl_dist_name                 | 字典名称表              |
| 7        | tbl_dist_item                 | 字典数据项表            |
| 8        | tbl_code                      | 代码表                  |
| 9        | tbl_datamapping               | 字段映射表              |
| 10       | tbl_acq\_unit\_conf           | 采控单元表              |
| 11       | tbl_acq_group_conf            | 采控组表                |
| 12       | tbl_acq_item2group_conf       | 采控组和采控项关系表    |
| 13       | tbl_acq_group2unit_conf       | 采控单元和采控组关系表  |
| 14       | tbl_alarm_unit_conf           | 报警单元表              |
| 15       | tbl_alarm_item2unit_conf      | 报警单元和报警项关系表  |
| 16       | tbl_protocolinstance          | 采控实例表              |
| 17       | tbl_protocolalarminstance     | 报警实例表              |
| 18       | tbl_protocolsmsinstance       | 短信实例表              |
| 19       | tbl\_pumpdevice               | 泵设备信息表            |
| 20       | tbl\_pipelinedevice           | 管设备信息表            |
| 21       | tbl\_smsdevice                | 短信设备信息表          |
| 22       | tbl_auxiliarydevice           | 辅件设备表              |
| 23       | tbl_auxiliary2master          | 主设备和辅助设备对应 表 |
| 24       | tbl_pumpdeviceaddinfo         | 泵附加信息表            |
| 25       | tbl_pipelinedeviceaddinfo     | 管附加信息表            |
| 26       | tbl_pumpacqdata_latest        | 泵设备实时数据表        |
| 27       | tbl_pumpacqdata_hist          | 泵设备历史数据表        |
| 28       | tbl_pumpacqrawdata            | 泵设备原始采集数据表    |
| 29       | tbl_pumpalarminfo_latest      | 泵设备报警实时数据表    |
| 30       | tbl_pumpalarminfo_hist        | 泵设备报警历史数据表    |
| 31       | tbl_pumpdevicegraphicset      | 泵设备图形设置表        |
| 32       | tbl_pipelineacqdata_latest    | 管设备实时数据表        |
| 33       | tbl_pipelineacqdata\_ hist    | 管设备历史数据表        |
| 34       | tbl_pipelineacqrawdata        | 管设备原始采集数据表    |
| 35       | tbl\_pipelinealarminfo_latest | 管设备报警实时数据表    |
| 36       | tbl\_pipelinealarminfo_hist   | 管设备报警历史数据表    |
| 37       | tbl_pipelinedevicegraphicset  | 管设备图形设置表        |
| 38       | tbl_deviceoperationlog        | 设备操作日志表          |
| 39       | tbl_systemlog                 | 系统日志表              |
| 40       | tbl_resourcemonitoring        | 资源监测数据表          |

## 1.2 详述

### 1.2.1 tbl\_org

表1-2 组织数据表

| **序号** | **代码**   | **名称**     | **类型**       | **单位** | **为空** | **键** | **备注** |
|----------|------------|--------------|----------------|----------|----------|--------|----------|
| 1        | ORG_ID     | 单位序号     | NUMBER(10)     |          | N        | 主键   |          |
| 2        | ORG_CODE   | 单位编码     | VARCHAR2(20)   |          | Y        |        |          |
| 3        | ORG_NAME   | 单位名称     | VARCHAR2(100)  |          | N        |        |          |
| 4        | ORG_MEMO   | 单位说明     | VARCHAR2(4000) |          | Y        |        |          |
| 5        | ORG_PARENT | 父级单位编号 | NUMBER(10)     |          | N        |        |          |
| 6        | ORG_SEQ    | 单位排序     | NUMBER(10)     |          | Y        |        |          |

### 1.2.2 tbl\_user

表1-3 用户数据表

| **序号** | **代码**         | **名称**         | **类型**     | **单位** | **为空** | **键** | **备注**                    |
|----------|------------------|------------------|--------------|----------|----------|--------|-----------------------------|
| 1        | USER_NO          | 用户序号         | NUMBER(10)   |          | N        | 主键   |                             |
| 2        | USER_ID          | 用户账号         | VARCHAR2(20) |          | N        |        |                             |
| 3        | USER_PWD         | 用户密码         | VARCHAR2(20) |          | Y        |        |                             |
| 4        | USER_NAME        | 用户名称         | VARCHAR2(40) |          | N        |        |                             |
| 5        | USER_IN_EMAIL    | 内部邮箱         | VARCHAR2(40) |          | Y        |        |                             |
| 6        | USER_PHONE       | 用户电话         | VARCHAR2(40) |          | Y        |        |                             |
| 7        | USER_TYPE        | 用户类型         | NUMBER(10)   |          | Y        |        | 对应tbl_role表中role_id字段 |
| 8        | USER_ORGID       | 用户所属组织     | NUMBER(10)   |          | N        |        | 对应tbl_org表中org_id字段   |
| 9        | USER_REGTIME     | 用户注册时间     | DATE         |          | Y        |        |                             |
| 10       | USER_QUICKLOGIN  | 是否快捷登录     | NUMBER(1)    |          | Y        |        | 0-不是 1-是                 |
| 11       | USER_ENABLE      | 使能或者失效     | NUMBER(1)    |          |          |        | 0-失效 1-使能               |
| 12       | USER_RECEIVESMS  | 是否接收报警短信 | NUMBER(10)   |          |          |        | 0-否，1-是                  |
| 13       | USER_RECEIVEMAIL | 是否接收报警邮件 | NUMBER(10)   |          |          |        | 0-否，1-是                  |

### 1.2.3 tbl\_role

表1-4 角色数据表

| **序号** | **代码**   | **名称**     | **类型**       | **单位** | **为空** | **键** | **备注**   |
|----------|------------|--------------|----------------|----------|----------|--------|------------|
| 1        | ROLE_ID    | 角色序号     | NUMBER(10)     |          | N        | 主键   |            |
| 3        | ROLE_NAME  | 角色名称     | VARCHAR2(40)   |          | N        |        |            |
| 4        | ROLE_FLAG  | 控制权限     | NUMBER(10)     |          | Y        |        | 0-无，1-是 |
| 5        | ROLE_LEVEL | 角色级别     | NUMBER(3)      |          | Y        |        |            |
| 6        | SHOWLEVEL  | 数据显示级别 | NUMBER(10)     |          | Y        |        |            |
| 7        | REMARK     | 角色描述     | VARCHAR2(2000) |          | Y        |        |            |

### 1.2.4 tbl\_module

表1-5 模块数据表

| **序号** | **代码**    | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注**               |
|----------|-------------|--------------|---------------|----------|----------|--------|------------------------|
| 1        | MD_ID       | 模块序号     | NUMBER(10)    |          | N        | 主键   |                        |
| 2        | MD_PARENTID | 父级模块序号 | NUMBER(10)    |          | N        |        |                        |
| 3        | MD_NAME     | 模块名称     | VARCHAR2(100) |          | N        |        |                        |
| 4        | MD_SHOWNAME | 模块简介     | VARCHAR2(100) |          | Y        |        |                        |
| 5        | MD_URL      | 模块URL      | VARCHAR2(200) |          | Y        |        |                        |
| 6        | MD_CODE     | 模块编码     | VARCHAR2(200) |          | Y        |        |                        |
| 7        | MD_SEQ      | 模块排序     | NUMBER(20)    |          | Y        |        |                        |
| 8        | MD_LEVEL    | 模块级别     | NUMBER(10)    |          | Y        |        |                        |
| 9        | MD_FLAG     | 模块标志     | NUMBER(10)    |          | Y        |        |                        |
| 10       | MD_ICON     | 模块图标     | VARCHAR2(100) |          | Y        |        |                        |
| 11       | MD_TYPE     | 模块类型     | NUMBER(1)     |          | Y        |        | 0-启用模块，2-备用模块 |
| 12       | MD_CONTROL  | 模块控制器   | VARCHAR2(100) |          | Y        |        |                        |

### 1.2.5 tbl\_module2role

表1-6 模块角色关系表

| **序号** | **代码**    | **名称** | **类型**    | **单位** | **为空** | **键** | **备注**                    |
|----------|-------------|----------|-------------|----------|----------|--------|-----------------------------|
| 1        | RM_ID       | 序号     | NUMBER(10)  |          | N        | 主键   |                             |
| 2        | RM_ROLEID   | 角色编号 | NUMBER(10)  |          | N        |        | 对应tbl_role表中role_id字段 |
| 3        | RM_MODULEID | 模块序号 | NUMBER(10)  |          | N        |        | 对应module表中md_id字段     |
| 4        | RM_MATRIX   | 权限矩阵 | VARCHAR2(8) |          | N        |        |                             |

### 1.2.6 tbl_dist_name

表1-7 字典名称表

| **序号** | **代码**   | **名称** | **类型**     | **单位** | **为空** | **键** | **备注**       |
|----------|------------|----------|--------------|----------|----------|--------|----------------|
| 1        | SYSDATAID  | 字典编码 | VARCHAR2(32) |          | N        | 主键   |                |
| 2        | TENANTID   | 组织编号 | VARCHAR2(50) |          | Y        |        |                |
| 3        | CNAME      | 中文名称 | VARCHAR2(50) |          | Y        |        |                |
| 4        | ENAME      | 英文名称 | VARCHAR2(50) |          | Y        |        |                |
| 5        | SORTS      | 排序     | NUMBER       |          | Y        |        |                |
| 6        | STATUS     | 显示状态 | NUMBER       |          | Y        |        | 0-显示，1-隐藏 |
| 7        | CREATOR    | 创建人   | VARCHAR2(50) |          | Y        |        |                |
| 8        | UPDATEUSER | 修改人   | VARCHAR2(50) |          | Y        |        |                |
| 9        | UPDATETIME | 创建时间 | DATE         |          | Y        |        | SYSDATE        |
| 10       | CREATEDATE | 修改时间 | DATE         |          | N        |        | SYSDATE        |

### 1.2.7 tbl_dist_item

表1-8 字典数据项表

| **序号** | **代码**   | **名称**   | **类型**      | **单位** | **为空** | **键** | **备注**       |
|----------|------------|------------|---------------|----------|----------|--------|----------------|
| 1        | DATAITEMID | 数据项编码 | VARCHAR2(32)  |          | N        | 主键   |                |
| 2        | TENANTID   | 组织编号   | VARCHAR2(50)  |          | Y        |        |                |
| 3        | SYSDATAID  | 字典编码   | VARCHAR2(50)  |          | Y        |        |                |
| 4        | CNAME      | 中文名称   | VARCHAR2(50)  |          | Y        |        |                |
| 5        | ENAME      | 英文名称   | VARCHAR2(200) |          | Y        |        |                |
| 6        | DATAVALUE  | 数据项值   | VARCHAR2(200) |          | Y        |        |                |
| 7        | SORTS      | 排序       | NUMBER        |          | Y        |        |                |
| 8        | STATUS     | 显示状态   | NUMBER        |          | Y        |        | 0-显示，1-隐藏 |
| 9        | CREATOR    | 创建人     | VARCHAR2(50)  |          | Y        |        |                |
| 10       | UPDATEUSER | 修改人     | VARCHAR2(50)  |          | Y        |        |                |
| 11       | UPDATETIME | 创建时间   | DATE          |          | Y        |        | SYSDATE        |
| 12       | CREATEDATE | 修改时间   | DATE          |          | Y        |        | SYSDATE        |

### 1.2.8 tbl_code

表1-9 代码表

| **序号** | **代码**  | **名称**   | **类型**      | **单位** | **为空** | **键** | **备注** |
|----------|-----------|------------|---------------|----------|----------|--------|----------|
| 1        | ID        | 记录编号   | NUMBER(10)    |          | N        | 主键   |          |
| 2        | TABLECODE | 数据表代码 | VARCHAR2(200) |          | Y        |        |          |
| 3        | ITEMCODE  | 数据项代码 | VARCHAR2(200) |          | Y        |        |          |
| 4        | ITEMVALUE | 代码       | VARCHAR2(20)  |          | Y        |        |          |
| 5        | ITEMNAME  | 名称       | VARCHAR2(200) |          | Y        |        |          |
| 6        | STATE     | 状态       | NUMBER(10)    |          | Y        |        |          |
| 7        | REMARK    | 备注       | VARCHAR2(200) |          | Y        |        |          |

### 1.2.9 tbl_datamapping

表1-10 字段映射表

| **序号** | **代码**        | **名称**       | **类型**     | **单位** | **为空** | **键** | **备注**                  |
|----------|-----------------|----------------|--------------|----------|----------|--------|---------------------------|
| 1        | ID              | 记录编号       | NUMBER(10)   |          | N        | 主键   |                           |
| 2        | NAME            | 协议采控项名称 | VARCHAR2(50) |          | Y        |        |                           |
| 3        | MAPPINGCOLUMN   | 映射字段       | VARCHAR2(30) |          | Y        |        |                           |
| 4        | PROTOCOLTYPE    | 协议类型       | NUMBER(1)    |          | Y        |        | 0-泵设备协议 1-管设备协议 |
| 5        | REPETITIONTIMES | 重复次数       | NUMBER(2)    |          | Y        |        |                           |
| 6        | MAPPINGMODE     | 映射模式       | NUMBER(1)    |          | Y        |        | 0-以地址为准 1-以名称为准 |

### 1.2.10 tbl_acq_unit_conf

表1-11 采控单元名称表

| **序号** | **代码**  | **名称** | **类型**       | **单位** | **为空** | **键** | **备注** |
|----------|-----------|----------|----------------|----------|----------|--------|----------|
| 1        | ID        | 记录编号 | NUMBER(10)     |          | N        | 主键   |          |
| 2        | UNIT_CODE | 单元代码 | VARCHAR2(50)   |          | N        |        |          |
| 3        | UNIT_NAME | 单元名称 | VARCHAR2(50)   |          | Y        |        |          |
| 4        | PROTOCOL  | 协议     | VARCHAR2(50)   |          | Y        |        |          |
| 5        | REMARK    | 单元描述 | VARCHAR2(2000) |          | Y        |        |          |

### 1.2.11 tbl_acq_group_conf

表1-12 采控组名称表

| **序号** | **代码**   | **名称** | **类型**       | **单位** | **为空** | **键** | **备注**          |
|----------|------------|----------|----------------|----------|----------|--------|-------------------|
| 1        | id         | 记录编号 | NUMBER(10)     |          | N        | 主键   |                   |
| 2        | GROUP_CODE | 组代码   | VARCHAR2(50)   |          | N        |        |                   |
| 3        | GROUP_NAME | 组名称   | VARCHAR2(50)   |          | Y        |        |                   |
| 4        | ACQ_CYCLE  | 采集周期 | NUMBER(10)     | 秒       | Y        |        |                   |
| 5        | SAVE_CYCLE | 保存周期 | NUMBER(10)     | 秒       | Y        |        |                   |
| 6        | PROTOCOL   | 协议     | VARCHAR2(50)   |          | Y        |        |                   |
| 7        | TYPE       | 类型     | NUMBER(1)      |          | Y        |        | 0-采集组 1-控制组 |
| 8        | REMARK     | 组描述   | VARCHAR2(2000) |          | Y        |        |                   |

### 1.2.12 tbl_acq_item2group_conf

表1-13 采控组和采集项关系表

| **序号** | **代码**           | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注**         |
|----------|--------------------|--------------|---------------|----------|----------|--------|------------------|
| 1        | ID                 | 记录编号     | NUMBER(10)    |          | N        | 主键   |                  |
| 2        | GROUPID            | 采控组编号   | NUMBER(10)    |          | N        |        |                  |
| 3        | ITEMID             | 采控项编号   | NUMBER(10)    |          | Y        |        |                  |
| 4        | ITEMCODE           | 采控项代码   | VARCHAR2(100) |          | Y        |        |                  |
| 5        | ITEMNAME           | 采控项名称   | VARCHAR2(100) |          | Y        |        |                  |
| 6        | SORT               | 排序序号     | NUMBER(10)    |          | Y        |        |                  |
| 7        | BITINDEX           | 位索引       | NUMBER(10)    |          | Y        |        | 位数组中的位索引 |
| 8        | SHOWLEVEL          | 显示级别     | NUMBER(10)    |          | Y        |        |                  |
| 9        | REALTIMECURVE      | 实时曲线顺序 | NUMBER(10)    |          | Y        |        | 为空不显示曲线   |
| 10       | HISTORYCURVE       | 历史曲线顺序 | NUMBER(10)    |          | Y        |        | 为空不显示曲线   |
| 11       | REALTIMECURVECOLOR | 实时曲线颜色 | VARCHAR2(20)  |          | Y        |        |                  |
| 12       | HISTORYCURVECOLOR  | 历史曲线颜色 | VARCHAR2(20)  |          | Y        |        |                  |
| 13       | MATRIX             | 阵列         | VARCHAR2(8)   |          | Y        |        |                  |

### 1.2.13 tbl_acq_group2unit_conf

表1-14 采控单元和采集采控组关系表

| **序号** | **代码** | **名称**     | **类型**    | **单位** | **为空** | **键** | **备注**                          |
|----------|----------|--------------|-------------|----------|----------|--------|-----------------------------------|
| 1        | ID       | 记录编号     | NUMBER(10)  |          | N        | 主键   |                                   |
| 2        | UNITID   | 采控单元编号 | NUMBER(10)  |          | N        |        | 对应tbl_acq\_unit\_conf表中id字段 |
| 3        | GROUPID  | 采控组编号   | NUMBER(10)  |          | N        |        | 对应tbl_acq_group_conf表中id字段  |
| 4        | MATRIX   | 阵列         | VARCHAR2(8) |          | N        |        |                                   |

### 1.2.14 tbl\_alarm\_unit_conf

表1-15 报警单元名称表

| **序号** | **代码**  | **名称** | **类型**       | **单位** | **为空** | **键** | **备注** |
|----------|-----------|----------|----------------|----------|----------|--------|----------|
| 1        | ID        | 记录编号 | NUMBER(10)     |          | N        | 主键   |          |
| 2        | UNIT_CODE | 单元代码 | VARCHAR2(50)   |          | N        |        |          |
| 3        | UNIT_NAME | 单元名称 | VARCHAR2(50)   |          | Y        |        |          |
| 4        | PROTOCOL  | 协议     | VARCHAR2(50)   |          | Y        |        |          |
| 5        | REMARK    | 单元描述 | VARCHAR2(2000) |          | Y        |        |          |

### 1.2.15 tbl_alarm_item2unit_conf

表1-16 报警单元和报警项关系表

| **序号** | **代码**      | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注**       |
|----------|---------------|--------------|---------------|----------|----------|--------|----------------|
| 1        | ID            | 记录编号     | NUMBER(10)    |          | N        | 主键   |                |
| 2        | UNITID        | 单元编号     | NUMBER(10)    |          | N        |        |                |
| 3        | ITEMID        | 项编号       | NUMBER(10)    |          | Y        |        |                |
| 4        | ITEMNAME      | 项名称       | VARCHAR2(100) |          | Y        |        |                |
| 5        | ITEMCODE      | 项代码       | VARCHAR2(100) |          | Y        |        |                |
| 6        | ITEMADDR      | 项地址       | NUMBER(10)    |          | Y        |        |                |
| 7        | UPPERLIMIT    | 报警上限     | NUMBER(10,3)  |          | Y        |        |                |
| 8        | LOWERLIMIT    | 报警下线     | NUMBER(10,3)  |          | Y        |        |                |
| 9        | HYSTERSIS     | 回差         | NUMBER(10,3)  |          | Y        |        |                |
| 10       | DELAY         | 延时         | NUMBER(10)    |          | Y        |        |                |
| 11       | ALARMLEVEL    | 报警级别     | NUMBER(3)     |          | Y        |        |                |
| 12       | ALARMSIGN     | 报警使能     | NUMBER(1)     |          | Y        |        |                |
| 13       | TYPE          | 报警类型     | NUMBER(1)     |          | Y        |        |                |
| 14       | VALUE         | 报警值       | NUMBER(10,3)  |          | Y        |        |                |
| 15       | BITINDEX      | 位索引       | NUMBER(3)     |          | Y        |        | 位数组的位索引 |
| 16       | ISSENDMESSAGE | 是否发送短信 | NUMBER(1)     |          | Y        |        | 0-否 1-是      |
| 17       | ISSENDMAIL    | 是否发送邮件 | NUMBER(1)     |          | Y        |        | 0-否 1-是      |

### 1.2.16 tbl_protocolinstance

表1-17 采控实例表

| **序号** | **代码**         | **名称**     | **类型**     | **单位** | **为空** | **键** | **备注**          |
|----------|------------------|--------------|--------------|----------|----------|--------|-------------------|
| 1        | ID               | 记录编号     | NUMBER(10)   |          | N        | 主键   |                   |
| 2        | NAME             | 实例名称     | VARCHAR2(50) |          | Y        |        |                   |
| 3        | CODE             | 实例代码     | VARCHAR2(50) |          | Y        |        |                   |
| 4        | ACQPROTOCOLTYPE  | 采集实例类型 | VARCHAR2(50) |          | N        |        |                   |
| 5        | CTRLPROTOCOLTYPE | 控制实例类型 | VARCHAR2(50) |          | Y        |        |                   |
| 6        | SIGNINPREFIX     | 注册包前缀   | VARCHAR2(50) |          | Y        |        |                   |
| 7        | SIGNINSUFFIX     | 注册包后缀   | VARCHAR2(50) |          | Y        |        |                   |
| 8        | HEARTBEATPREFIX  | 心跳包前缀   | VARCHAR2(50) |          | Y        |        |                   |
| 9        | HEARTBEATSUFFIX  | 心跳包后缀   | VARCHAR2(50) |          | Y        |        |                   |
| 10       | UNITID           | 采控单元编号 | NUMBER(10)   |          | Y        |        |                   |
| 11       | DEVICETYPE       | 设备类型     | NUMBER(1)    |          | Y        |        | 0-泵设备 1-管设备 |
| 12       | SORT             | 排序编号     | NUMBER(10)   |          | Y        |        |                   |

### 1.2.17 tbl_protocolalarminstance

表1-18 报警实例表

| **序号** | **代码**    | **名称**     | **类型**     | **单位** | **为空** | **键** | **备注**          |
|----------|-------------|--------------|--------------|----------|----------|--------|-------------------|
| 1        | ID          | 记录编号     | NUMBER(10)   |          | N        | 主键   |                   |
| 2        | NAME        | 实例名称     | VARCHAR2(50) |          | Y        |        |                   |
| 3        | CODE        | 实例代码     | VARCHAR2(50) |          | Y        |        |                   |
| 4        | ALARMUNITID | 报警单元编号 | NUMBER(10)   |          | N        |        |                   |
| 5        | DEVICETYPE  | 设备类型     | NUMBER(1)    |          | Y        |        | 0-泵设备 1-管设备 |
| 6        | SORT        | 排序编号     | NUMBER(10)   |          | Y        |        |                   |

### 1.2.18 tbl_protocolsmsinstance

表1-19 短信实例表

| **序号** | **代码**         | **名称**     | **类型**     | **单位** | **为空** | **键** | **备注** |
|----------|------------------|--------------|--------------|----------|----------|--------|----------|
| 1        | ID               | 记录编号     | NUMBER(10)   |          | N        | 主键   |          |
| 2        | NAME             | 实例名称     | VARCHAR2(50) |          | Y        |        |          |
| 3        | CODE             | 实例代码     | VARCHAR2(50) |          | Y        |        |          |
| 4        | ACQPROTOCOLTYPE  | 采集协议类型 | VARCHAR2(50) |          | N        |        |          |
| 5        | CTRLPROTOCOLTYPE | 控制协议类型 | VARCHAR2(50) |          | Y        |        |          |
| 6        | SORT             | 排序编号     | NUMBER(10)   |          | Y        |        |          |

### 1.2.19 tbl\_pumpdevice

表1-20 泵设备信息表

| **序号** | **代码**             | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注**      |
|----------|----------------------|--------------|---------------|----------|----------|--------|---------------|
| 1        | ID                   | 记录编号     | NUMBER(10)    |          | N        | 主键   |               |
| 2        | ORGID                | 单位编号     | NUMBER(10)    |          | Y        |        |               |
| 3        | WELLNAME             | 设备名称     | VARCHAR2(200) |          | Y        |        |               |
| 4        | DEVICETYPE           | 设备类型     | NUMBER(1)     |          | Y        |        |               |
| 5        | APPLICATIONSCENARIOS | 应用场景     | NUMBER(2)     |          | Y        |        |               |
| 6        | SIGNINID             | 注册包ID     | VARCHAR2(200) |          | N        |        |               |
| 7        | SLAVE                | 设备从地址   | VARCHAR2(200) |          | Y        |        |               |
| 8        | INSTANCECODE         | 采控实例代码 | VARCHAR2(50)  |          | Y        |        |               |
| 9        | ALARMINSTANCECODE    | 报警实例代码 | VARCHAR2(50)  |          | Y        |        |               |
| 10       | VIDEOURL             | 视频地址     | VARCHAR2(400) |          | Y        |        |               |
| 11       | STATUS               | 状态         | NUMBER(1)     |          | Y        |        | 0-失效 1-使能 |
| 12       | SORTNUM              | 排序编号     | NUMBER(10)    |          | Y        |        |               |

### 1.2.20 tbl\_pipelinedevice

表1-21 管设备信息表

| **序号** | **代码**             | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注**      |
|----------|----------------------|--------------|---------------|----------|----------|--------|---------------|
| 1        | ID                   | 记录编号     | NUMBER(10)    |          | N        | 主键   |               |
| 2        | ORGID                | 单位编号     | NUMBER(10)    |          | Y        |        |               |
| 3        | WELLNAME             | 设备名称     | VARCHAR2(200) |          | Y        |        |               |
| 4        | DEVICETYPE           | 设备类型     | NUMBER(1)     |          | Y        |        |               |
| 5        | APPLICATIONSCENARIOS | 应用场景     | NUMBER(2)     |          | Y        |        |               |
| 6        | SIGNINID             | 注册包ID     | VARCHAR2(200) |          | N        |        |               |
| 7        | SLAVE                | 设备从地址   | VARCHAR2(200) |          | Y        |        |               |
| 8        | INSTANCECODE         | 采控实例代码 | VARCHAR2(50)  |          | Y        |        |               |
| 9        | ALARMINSTANCECODE    | 报警实例代码 | VARCHAR2(50)  |          | Y        |        |               |
| 10       | VIDEOURL             | 视频地址     | VARCHAR2(400) |          | Y        |        |               |
| 11       | STATUS               | 状态         | NUMBER(1)     |          | Y        |        | 0-失效 1-使能 |
| 12       | SORTNUM              | 排序编号     | NUMBER(10)    |          | Y        |        |               |

### 1.2.21 tbl\_smsdevice

表1-22 短信设备信息表

| **序号** | **代码**     | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注** |
|----------|--------------|--------------|---------------|----------|----------|--------|----------|
| 1        | ID           | 记录编号     | NUMBER(10)    |          | N        | 主键   |          |
| 2        | ORGID        | 单位编号     | NUMBER(10)    |          | Y        |        |          |
| 3        | WELLNAME     | 设备名称     | VARCHAR2(200) |          | Y        |        |          |
| 4        | SIGNINID     | 注册包ID     | VARCHAR2(200) |          | N        |        |          |
| 5        | INSTANCECODE | 短信实例代码 | VARCHAR2(50)  |          | Y        |        |          |
| 6        | SORTNUM      | 排序编号     | NUMBER(10)    |          | Y        |        |          |

### 1.2.22 tbl_auxiliarydevice

表1-23 辅件设备信息表

| **序号** | **代码** | **名称** | **类型**       | **单位** | **为空** | **键** | **备注**          |
|----------|----------|----------|----------------|----------|----------|--------|-------------------|
| 1        | ID       | 记录编号 | NUMBER(10)     |          | N        | 主键   |                   |
| 2        | NAME     | 名称     | VARCHAR2(200)  |          | Y        |        |                   |
| 3        | TYPE     | 类型     | NUMBER(2)      |          | Y        |        | 0-泵辅件 1-管辅件 |
| 4        | MODEL    | 规格型号 | VARCHAR2(200)  |          | N        |        |                   |
| 5        | REMARK   | 备注     | VARCHAR2(2000) |          | Y        |        |                   |
| 6        | SORT     | 排序序号 | NUMBER(10)     |          | Y        |        |                   |

### 1.2.23 tbl_auxiliary2master

表1-24 主设备辅件设备关系表

| **序号** | **代码**    | **名称**     | **类型**    | **单位** | **为空** | **键** | **备注** |
|----------|-------------|--------------|-------------|----------|----------|--------|----------|
| 1        | ID          | 记录编号     | NUMBER(10)  |          | N        | 主键   |          |
| 2        | MASTERID    | 主设备编号   | NUMBER(10)  |          | Y        |        |          |
| 3        | AUXILIARYID | 辅件设备编号 | NUMBER(10)  |          | Y        |        |          |
| 4        | MATRIX      | 阵列         | VARCHAR2(8) |          | Y        |        |          |

### 1.2.24 tbl_pumpdeviceaddinfo

表1-25 泵设备附加信息表

| **序号** | **代码**  | **名称** | **类型**      | **单位** | **为空** | **键** | **备注** |
|----------|-----------|----------|---------------|----------|----------|--------|----------|
| 1        | ID        | 记录编号 | NUMBER(10)    |          | N        | 主键   |          |
| 2        | WELLID    | 设备编号 | NUMBER(10)    |          | Y        |        |          |
| 3        | ITEMNAME  | 参数名称 | VARCHAR2(200) |          | Y        |        |          |
| 4        | ITEMVALUE | 参数值   | VARCHAR2(200) |          | Y        |        |          |
| 5        | ITEMUNIT  | 参数单位 |               |          |          |        |          |

### 1.2.25 tbl\_pipelinedeviceaddinfo

表1-26 管设备附加信息表

| **序号** | **代码**  | **名称** | **类型**      | **单位** | **为空** | **键** | **备注** |
|----------|-----------|----------|---------------|----------|----------|--------|----------|
| 1        | ID        | 记录编号 | NUMBER(10)    |          | N        | 主键   |          |
| 2        | WELLID    | 设备编号 | NUMBER(10)    |          | Y        |        |          |
| 3        | ITEMNAME  | 参数名称 | VARCHAR2(200) |          | Y        |        |          |
| 4        | ITEMVALUE | 参数值   | VARCHAR2(200) |          | Y        |        |          |
| 5        | ITEMUNIT  | 参数单位 |               |          |          |        |          |

### 1.2.26 tbl_pumpacqdata_latest

表1-27 泵设备实时数据表

| **序号** | **代码**           | **名称** | **类型**     | **单位** | **为空** | **键** | **备注**               |
|----------|--------------------|----------|--------------|----------|----------|--------|------------------------|
| 1        | ID                 | 记录编号 | NUMBER(10)   |          | N        | 主键   |                        |
| 2        | WELLID             | 设备编号 | NUMBER(10)   |          | N        |        |                        |
| 3        | ACQTIME            | 采集时间 | DATE         |          | Y        |        |                        |
| 4        | COMMSTATUS         | 通信状态 | NUMBER(2)    |          | Y        |        | 0-离线 1-在线          |
| 5        | COMMTIME           | 在线时间 | NUMBER(8,2)  |          | Y        |        |                        |
| 6        | COMMTIMEEFFICIENCY | 在线时率 | NUMBER(10,4) |          | Y        |        |                        |
| 7        | COMMRANGE          | 在线区间 | CLOB         |          | Y        |        |                        |
| 8        | RUNSTATUS          | 运行状态 | NUMBER(2)    |          | Y        |        |                        |
| 9        | RUNTIMEEFFICIENCY  | 运行时率 | NUMBER(8,2)  |          | Y        |        |                        |
| 10       | RUNTIME            | 运行时间 | NUMBER(10,4) |          | Y        |        |                        |
| 11       | RUNRANGE           | 运行区间 | CLOB         |          | Y        |        |                        |
| …        | …                  | …        |              |          | Y        |        | 根据驱动自动生成的字段 |
| …        | …                  | …        |              |          | Y        |        |                        |

### 1.2.27 tbl_pumpacqdata_hist

同tbl\_pumpacqdata\_latest

### 1.2.28 tbl_pumpacqrawdata

表1-28 泵设备原始采集数据表

| **序号** | **代码** | **名称** | **类型**       | **单位** | **为空** | **键** | **备注**                               |
|----------|----------|----------|----------------|----------|----------|--------|----------------------------------------|
| 1        | ID       | 记录编号 | NUMBER(10)     |          | N        | 主键   |                                        |
| 2        | WELLID   | 设备编号 | NUMBER(10)     |          | N        |        |                                        |
| 3        | ACQTIME  | 采集时间 | DATE           |          | Y        |        |                                        |
| 4        | RAWDATA  | 原始数据 | VARCHAR2(4000) |          | Y        |        | 设备采集的未解析原始数据，16进制字符串 |

### 1.2.29 tbl\_pumpalarminfo_latest

表1-29 泵设备报警实时数据表

| **序号** | **代码**      | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注**                                        |
|----------|---------------|--------------|---------------|----------|----------|--------|-------------------------------------------------|
| 1        | ID            | 记录编号     | NUMBER(10)    |          | N        | 主键   |                                                 |
| 2        | WELLID        | 设备编号     | NUMBER(10)    |          | N        |        |                                                 |
| 3        | ALARMTIME     | 报警时间     | DATE          |          | Y        |        |                                                 |
| 4        | ITEMNAME      | 报警项       | VARCHAR2(100) |          | Y        |        |                                                 |
| 5        | ALARMTYPE     | 报警类型     | NUMBER(1)     |          | Y        |        | 0-通信报警 1-限值报警 2-枚举量报警 3-开关量报警 |
| 6        | ALARMVALUE    | 报警值       | NUMBER(10,3)  |          | Y        |        |                                                 |
| 7        | ALARMINFO     | 报警信息     | VARCHAR2(100) |          | Y        |        |                                                 |
| 8        | ALARMLIMIT    | 报警限值     | NUMBER(10,3)  |          | Y        |        |                                                 |
| 9        | HYSTERSIS     | 回差         | NUMBER(10,3)  |          | Y        |        |                                                 |
| 10       | ALARMLEVEL    | 报警级别     | NUMBER(3)     |          | Y        |        | 100-一级报警 200-二级报警 300-三级报警          |
| 11       | RECOVERYTIME  | 恢复时间     | DATE          |          | Y        |        |                                                 |
| 12       | ISSENDMESSAGE | 是否发送短信 | NUMBER(1)     |          | Y        |        | 0-否 1-是                                       |
| 13       | ISSENDMAIL    | 是否发送邮件 | NUMBER(1)     |          | Y        |        | 0-否 1-是                                       |

### 1.2.30 tbl_pumpalarminfo_hist

同tbl\_pumpalarminfo_latest

### 1.2.31 tbl_pumpdevicegraphicset

表1-30 泵设备图形设置表

| **序号** | **代码**     | **名称**     | **类型**       | **单位** | **为空** | **键** | **备注**       |
|----------|--------------|--------------|----------------|----------|----------|--------|----------------|
| 1        | ID           | 记录编号     | NUMBER(10)     |          | N        | 主键   |                |
| 2        | WELLID       | 设备编号     | NUMBER(10)     |          | N        |        |                |
| 3        | GRAPHICSTYLE | 图形设置内容 | VARCHAR2(4000) |          | Y        |        | json格式字符串 |

### 1.2.32 tbl\_pipelineacqdata_latest

表1-31 管设备实时数据表

| **序号** | **代码**           | **名称** | **类型**     | **单位** | **为空** | **键** | **备注**               |
|----------|--------------------|----------|--------------|----------|----------|--------|------------------------|
| 1        | ID                 | 记录编号 | NUMBER(10)   |          | N        | 主键   |                        |
| 2        | WELLID             | 设备编号 | NUMBER(10)   |          | N        |        |                        |
| 3        | ACQTIME            | 采集时间 | DATE         |          | Y        |        |                        |
| 4        | COMMSTATUS         | 通信状态 | NUMBER(2)    |          | Y        |        | 0-离线 1-在线          |
| 5        | COMMTIME           | 在线时间 | NUMBER(8,2)  |          | Y        |        |                        |
| 6        | COMMTIMEEFFICIENCY | 在线时率 | NUMBER(10,4) |          | Y        |        |                        |
| 7        | COMMRANGE          | 在线区间 | CLOB         |          | Y        |        |                        |
| 8        | RUNSTATUS          | 运行状态 | NUMBER(2)    |          | Y        |        |                        |
| 9        | RUNTIMEEFFICIENCY  | 运行时率 | NUMBER(8,2)  |          | Y        |        |                        |
| 10       | RUNTIME            | 运行时间 | NUMBER(10,4) |          | Y        |        |                        |
| 11       | RUNRANGE           | 运行区间 | CLOB         |          | Y        |        |                        |
| …        | …                  | …        |              |          | Y        |        | 根据驱动自动生成的字段 |
| …        | …                  | …        |              |          | Y        |        |                        |

### 1.2.33 tbl_pipelineacqdata_hist

同tbl\_pipelineacqdata\_latest

### 1.2.34 tbl\_pipelineacqrawdata

表1-32 管设备原始采集数据表

| **序号** | **代码** | **名称** | **类型**       | **单位** | **为空** | **键** | **备注**                               |
|----------|----------|----------|----------------|----------|----------|--------|----------------------------------------|
| 1        | ID       | 记录编号 | NUMBER(10)     |          | N        | 主键   |                                        |
| 2        | WELLID   | 设备编号 | NUMBER(10)     |          | N        |        |                                        |
| 3        | ACQTIME  | 采集时间 | DATE           |          | Y        |        |                                        |
| 4        | RAWDATA  | 原始数据 | VARCHAR2(4000) |          | Y        |        | 设备采集的未解析原始数据，16进制字符串 |

### 1.2.35 tbl\_pipelinealarminfo_latest

表1-33 泵设备报警实时数据表

| **序号** | **代码**      | **名称**     | **类型**      | **单位** | **为空** | **键** | **备注**                                        |
|----------|---------------|--------------|---------------|----------|----------|--------|-------------------------------------------------|
| 1        | ID            | 记录编号     | NUMBER(10)    |          | N        | 主键   |                                                 |
| 2        | WELLID        | 设备编号     | NUMBER(10)    |          | N        |        |                                                 |
| 3        | ALARMTIME     | 报警时间     | DATE          |          | Y        |        |                                                 |
| 4        | ITEMNAME      | 报警项       | VARCHAR2(100) |          | Y        |        |                                                 |
| 5        | ALARMTYPE     | 报警类型     | NUMBER(1)     |          | Y        |        | 0-通信报警 1-限值报警 2-枚举量报警 3-开关量报警 |
| 6        | ALARMVALUE    | 报警值       | NUMBER(10,3)  |          | Y        |        |                                                 |
| 7        | ALARMINFO     | 报警信息     | VARCHAR2(100) |          | Y        |        |                                                 |
| 8        | ALARMLIMIT    | 报警限值     | NUMBER(10,3)  |          | Y        |        |                                                 |
| 9        | HYSTERSIS     | 回差         | NUMBER(10,3)  |          | Y        |        |                                                 |
| 10       | ALARMLEVEL    | 报警级别     | NUMBER(3)     |          | Y        |        | 100-一级报警 200-二级报警 300-三级报警          |
| 11       | RECOVERYTIME  | 恢复时间     | DATE          |          | Y        |        |                                                 |
| 12       | ISSENDMESSAGE | 是否发送短信 | NUMBER(1)     |          | Y        |        | 0-否 1-是                                       |
| 13       | ISSENDMAIL    | 是否发送邮件 | NUMBER(1)     |          | Y        |        | 0-否 1-是                                       |

### 1.2.36 tbl\_pipelinealarminfo_hist

同tbl\_pipelinealarminfo_latest

### 1.2.37 tbl\_pipelinedevicegraphicset

表1-34 管设备图形设置表

| **序号** | **代码**     | **名称**     | **类型**       | **单位** | **为空** | **键** | **备注**       |
|----------|--------------|--------------|----------------|----------|----------|--------|----------------|
| 1        | ID           | 记录编号     | NUMBER(10)     |          | N        | 主键   |                |
| 2        | WELLID       | 设备编号     | NUMBER(10)     |          | N        |        |                |
| 3        | GRAPHICSTYLE | 图形设置内容 | VARCHAR2(4000) |          | Y        |        | json格式字符串 |

### 1.2.38 tbl_deviceoperationlog

表1-35 设备操作日志表

| **序号** | **代码**   | **名称**     | **类型** | **单位** | **为空** | **键** | **备注**                                    |
|----------|------------|--------------|----------|----------|----------|--------|---------------------------------------------|
| 1        | ID         | 记录编号     | NUMBER   |          | N        | 主键   |                                             |
| 2        | WELLNAME   | 设备名称     | VARCHAR2 |          | Y        |        |                                             |
| 3        | CREATETIME | 创建时间     | DATE     |          | Y        |        |                                             |
| 4        | USER_ID    | 操作用户账号 | VARCHAR2 |          | Y        |        |                                             |
| 5        | LOGINIP    | 用户登录IP   | VARCHAR2 |          | Y        |        |                                             |
| 6        | ACTION     | 操作         | NUMBER   |          | Y        |        | 0-添加设备 1-修改设备 2-删除设备 3-控制设备 |
| 7        | DEVICETYPE | 设备类型     | NUMBER   |          | Y        |        | 0-泵设备 1-管设备                           |
| 8        | REMARK     | 备注         | VARCHAR2 |          | Y        |        |                                             |

### 1.2.39 tbl_systemlog

表1-36 系统日志表

| **序号** | **代码**   | **名称** | **类型**      | **单位** | **为空** | **键** | **备注**              |
|----------|------------|----------|---------------|----------|----------|--------|-----------------------|
| 1        | ID         | 记录编号 | NUMBER(10)    |          | N        | 主键   |                       |
| 2        | CREATETIME | 创建时间 | DATE          |          | N        |        |                       |
| 3        | USER_ID    | 用户账号 | VARCHAR2(20)  |          | Y        |        |                       |
| 4        | LOGINIP    | 登录IP   | VARCHAR2(20)  | m        | Y        |        |                       |
| 5        | ACTION     | 操作     | NUMBER(2)     | 次/min   | Y        |        | 0-用户登录 1-用户退出 |
| 6        | REMARK     | 备注     | VARCHAR2(200) | kN       | Y        |        |                       |

### 1.2.40 tbl_resourcemonitoring

表1-37 资源监测数据表

| **序号** | **代码**       | **名称**         | **类型**     | **单位** | **为空** | **键** | **备注** |
|----------|----------------|------------------|--------------|----------|----------|--------|----------|
| 1        | ID             | 记录编号         | NUMBER(10)   |          | N        | 主键   |          |
| 2        | ACQTIME        | 采集时间         | DATE         |          | Y        |        |          |
| 3        | APPRUNSTATUS   | AC运行状态       | NUMBER(2)    |          | Y        |        |          |
| 4        | APPVERSION     | AC版本信息       | VARCHAR2(50) |          | Y        |        |          |
|          | ADRUNSTATUS    | 驱动程序运行状态 | NUMBER(2)    |          | Y        |        |          |
|          | ADVERSION      | 驱动程序版本信息 | VARCHAR2(50) |          | Y        |        |          |
| 5        | CPUUSEDPERCENT | CPU使用率        | VARCHAR2(50) | %        | Y        |        |          |
| 6        | MEMUSEDPERCENT | 内存使用率       | NUMBER(8,2)  | %        | Y        |        |          |
| 7        | TABLESPACESIZE | 数据库表空间大小 | NUMBER(10,2) | Mb       | Y        |        |          |

# 二、视图

## 2.1 概览

表2-1 视图概览

| **序号** | **名称**                     | **描述**               |
|----------|------------------------------|------------------------|
| 1        | viw_org                      | 单位组织视图           |
| 2        | viw_pumpdevice               | 泵设备信息视图         |
| 3        | viw_pipelinedevice           | 管设备信息视图         |
| 4        | viw_smsdevice                | 短信设备信息视图       |
| 5        | viw_pumpacqrawdata           | 泵设备原始采集数据视图 |
| 6        | viw_pipelineacqrawdata       | 管设备原始采集数据视图 |
| 7        | viw_pumpalarminfo_latest     | 泵设备实时报警信息视图 |
| 8        | viw_pumpalarminfo_hist       | 泵设备历史报警信息视图 |
| 9        | viw_pipelinealarminfo_latest | 管设备实时报警信息视图 |
| 10       | viw_pipelinealarminfo_hist   | 管设备历史报警信息视图 |
| 11       | viw_deviceoperationlog       | 设备操作日志视图       |
| 12       | viw_systemlog                | 系统日志视图           |

## 2.2 详述

### 2.2.1 viw\_org

表2-1 单位组织视图

| **序号** | **代码**   | **名称**     | **类型** | **备注** |
|----------|------------|--------------|----------|----------|
| 1        | ORG_ID     | 单位序号     | NUMBER   |          |
| 2        | ORG_CODE   | 单位编码     | VARCHAR2 |          |
| 3        | ORG_NAME   | 单位名称     | VARCHAR2 |          |
| 4        | ORG_MEMO   | 单位说明     | VARCHAR2 |          |
| 5        | ORG_PARENT | 父级单位编号 | NUMBER   |          |
| 6        | ORG_SEQ    | 单位排序     | NUMBER   |          |
| 7        | ALLPATH    | 组织全路径   | VARCHAR2 |          |

### 2.2.2 viw_pumpdevice

表2-2 泵设备信息视图

| **序号** | **代码**                 | **名称**     | **类型** | **备注**      |
|----------|--------------------------|--------------|----------|---------------|
| 1        | ID                       | 记录编号     | NUMBER   |               |
| 2        | ORGNAME                  | 组织名称     | VARCHAR2 |               |
| 3        | ORGID                    | 组织编号     | NUMBER   |               |
| 4        | WELLNAME                 | 设备名称     | VARCHAR2 |               |
| 5        | APPLICATIONSCENARIOS     | 应用场景     | NUMBER   |               |
| 6        | APPLICATIONSCENARIOSNAME | 应用场景名称 | VARCHAR2 |               |
| 7        | DEVICETYPE               | 设备类型     | NUMBER   |               |
| 8        | DEVICETYPENAME           | 设备类型名称 | VARCHAR2 |               |
| 9        | SIGNINID                 | 注册包ID     | VARCHAR2 |               |
| 10       | SLAVE                    | 设备从地址   | VARCHAR2 |               |
| 11       | VIDEOURL                 | 视频路径     | VARCHAR2 |               |
| 12       | INSTANCECODE             | 采控实例编码 | VARCHAR2 |               |
| 13       | INSTANCENAME             | 采控实例名称 | VARCHAR2 |               |
| 14       | ALARMINSTANCECODE        | 短信实例编码 | VARCHAR2 |               |
| 15       | ALARMINSTANCENAME        | 短信实例名称 | VARCHAR2 |               |
| 16       | STATUS                   | 状态         | NUMBER   | 0-失效 1-使能 |
| 17       | STATUSNAME               | 状态名称     | VARCHAR2 | 失效或使能    |
| 18       | SORTNUM                  | 排序编号     | NUMBER   |               |

### 2.2.3 viw\_pipelinedevice

表2-3 管设备信息视图

| **序号** | **代码**                 | **名称**     | **类型** | **备注**      |
|----------|--------------------------|--------------|----------|---------------|
| 1        | ID                       | 记录编号     | NUMBER   |               |
| 2        | ORGNAME                  | 组织名称     | VARCHAR2 |               |
| 3        | ORGID                    | 组织编号     | NUMBER   |               |
| 4        | WELLNAME                 | 设备名称     | VARCHAR2 |               |
| 5        | APPLICATIONSCENARIOS     | 应用场景     | NUMBER   |               |
| 6        | APPLICATIONSCENARIOSNAME | 应用场景名称 | VARCHAR2 |               |
| 7        | DEVICETYPE               | 设备类型     | NUMBER   |               |
| 8        | DEVICETYPENAME           | 设备类型名称 | VARCHAR2 |               |
| 9        | SIGNINID                 | 注册包ID     | VARCHAR2 |               |
| 10       | SLAVE                    | 设备从地址   | VARCHAR2 |               |
| 11       | VIDEOURL                 | 视频路径     | VARCHAR2 |               |
| 12       | INSTANCECODE             | 采控实例编码 | VARCHAR2 |               |
| 13       | INSTANCENAME             | 采控实例名称 | VARCHAR2 |               |
| 14       | ALARMINSTANCECODE        | 短信实例编码 | VARCHAR2 |               |
| 15       | ALARMINSTANCENAME        | 短信实例名称 | VARCHAR2 |               |
| 16       | STATUS                   | 状态         | NUMBER   | 0-失效 1-使能 |
| 17       | STATUSNAME               | 状态名称     | VARCHAR2 | 失效或使能    |
| 18       | SORTNUM                  | 排序编号     | NUMBER   |               |

### 2.2.4 viw\_sysdevice

表2-4 短信设备信息视图

| **序号** | **代码**     | **名称**     | **类型** | **备注** |
|----------|--------------|--------------|----------|----------|
| 1        | ID           | 记录编号     | NUMBER   |          |
| 2        | ORGNAME      | 组织名称     | VARCHAR2 |          |
| 3        | ORGID        | 组织编号     | NUMBER   |          |
| 4        | WELLNAME     | 设备名称     | VARCHAR2 |          |
| 5        | SIGNINID     | 注册包ID     | VARCHAR2 |          |
| 6        | INSTANCECODE | 短信实例编码 | VARCHAR2 |          |
| 7        | INSTANCENAME | 短信实例名称 | VARCHAR2 |          |
| 8        | SORTNUM      | 排序编号     | NUMBER   |          |

### 2.2.5 viw_pumpacqrawdata

表2-5 泵设备原始采集数据视图

| **序号** | **代码**       | **名称**       | **类型** | **备注**                                       |
|----------|----------------|----------------|----------|------------------------------------------------|
| 1        | ID             | 记录编号       | NUMBER   |                                                |
| 2        | WELLID         | 设备编号       | NUMBER   |                                                |
| 3        | WELLNAME       | 设备名称       | VARCHAR2 |                                                |
| 4        | DEVICETYPE     | 设备类型       | NUMBER   |                                                |
| 5        | DEVICETYPENAME | 设备类型名称   | VARCHAR2 |                                                |
| 6        | SIGNINID       | 设备注册包ID   | VARCHAR2 |                                                |
| 7        | SLAVE          | 设备从地址     | VARCHAR2 |                                                |
| 8        | ACQTIME        | 采集时间       | DATE     |                                                |
| 9        | RAWDATA        | 原始数据       | VARCHAR2 | 采集的设备上传的未解析的原始数据，16进制字符串 |
| 10       | ORGID          | 设备组织编号   | NUMBER   |                                                |
| 11       | ALLPATH        | 设备组织全路径 | VARCHAR2 |                                                |

### 2.2.6 viw_pipelineacqrawdata

表2-6 管设备原始采集数据视图

| **序号** | **代码**       | **名称**       | **类型** | **备注**                                       |
|----------|----------------|----------------|----------|------------------------------------------------|
| 1        | ID             | 记录编号       | NUMBER   |                                                |
| 2        | WELLID         | 设备编号       | NUMBER   |                                                |
| 3        | WELLNAME       | 设备名称       | VARCHAR2 |                                                |
| 4        | DEVICETYPE     | 设备类型       | NUMBER   |                                                |
| 5        | DEVICETYPENAME | 设备类型名称   | VARCHAR2 |                                                |
| 6        | SIGNINID       | 设备注册包ID   | VARCHAR2 |                                                |
| 7        | SLAVE          | 设备从地址     | VARCHAR2 |                                                |
| 8        | ACQTIME        | 采集时间       | DATE     |                                                |
| 9        | RAWDATA        | 原始数据       | VARCHAR2 | 采集的设备上传的未解析的原始数据，16进制字符串 |
| 10       | ORGID          | 设备组织编号   | NUMBER   |                                                |
| 11       | ALLPATH        | 设备组织全路径 | VARCHAR2 |                                                |

### 2.2.7 viw\_pumpalarminfo_latest

表2-7 泵设备报警实时数据视图

| **序号** | **代码**       | **名称**     | **类型** | **备注**                                      |
|----------|----------------|--------------|----------|-----------------------------------------------|
| 1        | ID             | 记录编号     | NUMBER   |                                               |
| 2        | WELLID         | 设备编号     | NUMBER   |                                               |
| 3        | WELLNAME       | 设备名称     | VARCHAR2 |                                               |
| 4        | DEVICETYPE     | 设备类型     | NUMBER   | 0或1                                          |
| 5        | DEVICETYPENAME | 设备类型名称 | VARCHAR2 | 泵设备或管设备                                |
| 6        | ALARMTIME      | 报警时间     | DATE     |                                               |
| 7        | ITEMNAME       | 报警项       | VARCHAR2 |                                               |
| 8        | ALARMTYPE      | 报警类型     | NUMBER   | 0、1、2、3                                    |
| 9        | ALARMTYPENAME  | 报警类型名称 | VARCHAR2 | 通信报警、数值量报警、 枚举量报警、开关量报警 |
| 10       | ALARMVALUE     | 报警值       | NUMBER   |                                               |
| 11       | ALARMINFO      | 报警信息     | VARCHAR2 |                                               |
| 12       | ALARMLIMIT     | 报警限值     | NUMBER   |                                               |
| 13       | HYSTERSIS      | 回差         | NUMBER   |                                               |
| 14       | ALARMLEVEL     | 报警级别     | NUMBER   | 100、200、300                                 |
| 15       | ALARMLEVELNAME | 报警级别名称 | VARCHAR2 | 一级报警、二级报警、三级报警                  |
| 16       | ISSENDMESSAGE  | 是否发送短信 | NUMBER   |                                               |
| 17       | ISSENDMAIL     | 是否发送邮件 | NUMBER   |                                               |
| 18       | RECOVERYTIME   | 恢复时间     | DATE     |                                               |
| 19       | ORGID          | 组织编号     | NUMBER   |                                               |

### 2.2.8 viw\_pumpalarminfo\_hist

同viw\_pumpalarminfo_latest

### 2.2.9 viw\_pipelinealarminfo_latest

表2-8 管设备报警实时数据视图

| **序号** | **代码**       | **名称**     | **类型** | **备注**                                      |
|----------|----------------|--------------|----------|-----------------------------------------------|
| 1        | ID             | 记录编号     | NUMBER   |                                               |
| 2        | WELLID         | 设备编号     | NUMBER   |                                               |
| 3        | WELLNAME       | 设备名称     | VARCHAR2 |                                               |
| 4        | DEVICETYPE     | 设备类型     | NUMBER   | 0或1                                          |
| 5        | DEVICETYPENAME | 设备类型名称 | VARCHAR2 | 泵设备或管设备                                |
| 6        | ALARMTIME      | 报警时间     | DATE     |                                               |
| 7        | ITEMNAME       | 报警项       | VARCHAR2 |                                               |
| 8        | ALARMTYPE      | 报警类型     | NUMBER   | 0、1、2、3                                    |
| 9        | ALARMTYPENAME  | 报警类型名称 | VARCHAR2 | 通信报警、数值量报警、 枚举量报警、开关量报警 |
| 10       | ALARMVALUE     | 报警值       | NUMBER   |                                               |
| 11       | ALARMINFO      | 报警信息     | VARCHAR2 |                                               |
| 12       | ALARMLIMIT     | 报警限值     | NUMBER   |                                               |
| 13       | HYSTERSIS      | 回差         | NUMBER   |                                               |
| 14       | ALARMLEVEL     | 报警级别     | NUMBER   | 100、200、300                                 |
| 15       | ALARMLEVELNAME | 报警级别名称 | VARCHAR2 | 一级报警、二级报警、三级报警                  |
| 16       | ISSENDMESSAGE  | 是否发送短信 | NUMBER   |                                               |
| 17       | ISSENDMAIL     | 是否发送邮件 | NUMBER   |                                               |
| 18       | RECOVERYTIME   | 恢复时间     | DATE     |                                               |
| 19       | ORGID          | 组织编号     | NUMBER   |                                               |

### 2.2.10 viw\_pipelinealarminfo\_hist

同viw\_pipelinealarminfo_latest

### 2.2.11 viw_deviceoperationlog

表2-9 设备操作日志视图

| **序号** | **代码**       | **名称**     | **类型** | **备注**                               |
|----------|----------------|--------------|----------|----------------------------------------|
| 1        | ID             | 记录编号     | NUMBER   |                                        |
| 2        | DEVICETYPE     | 设备类型     | NUMBER   | 0或1                                   |
| 3        | DEVICETYPENAME | 设备类型名称 | VARCHAR2 | 泵设备或管设备                         |
| 4        | WELLNAME       | 设备名称     | VARCHAR2 |                                        |
| 5        | CREATETIME     | 创建时间     | DATE     |                                        |
| 6        | USER_ID        | 操作用户账号 | VARCHAR2 |                                        |
| 7        | LOGINIP        | 用户登录IP   | VARCHAR2 |                                        |
| 8        | ACTION         | 操作         | NUMBER   | 0、1、2、3                             |
| 9        | ACTIONNAME     | 操作名称     | VARCHAR2 | 添加设备、修改设备、删除设备、控制设备 |
| 10       | REMARK         | 备注         | VARCHAR2 |                                        |
| 11       | ORGID          | 组织编号     | NUMBER   |                                        |

### 2.2.12 viw_systemlog

表2-10 系统日志视图

| **序号** | **代码**   | **名称** | **类型** | **备注**           |
|----------|------------|----------|----------|--------------------|
| 1        | ID         | 记录编号 | NUMBER   |                    |
| 2        | CREATETIME | 创建时间 | DATE     |                    |
| 3        | USER_ID    | 用户账号 | VARCHAR2 |                    |
| 4        | LOGINIP    | 登录IP   | VARCHAR2 |                    |
| 5        | ACTION     | 操作     | NUMBER   | 0、1               |
| 6        | ACTIONNAME | 操作名称 | VARCHAR2 | 用户登录、用户退出 |
| 7        | REMARK     | 备注     | VARCHAR2 |                    |
| 8        | ORGID      | 组织编号 | NUMBER   |                    |

# 三、存储过程

表3-1 存储过程概览

| **序号** | **名称**                    | **描述**           | **备注**                                             |
|----------|-----------------------------|--------------------|------------------------------------------------------|
| 1        | PRD_RESET_SEQUENCE          | 重置序列           |                                                      |
| 2        | PRD_CLEAR_DATA              | 清理数据并重置序列 | 执行后将删除泵设备、管设备及相关配置数据和采集数据。 |
| 3        | PRD_SAVE_PUMPDEVICE         | 保存泵设备数据     |                                                      |
| 4        | PRD_SAVE_PIPELINEDEVICE     | 保存管设备数据     |                                                      |
| 5        | PRD_SAVE_SMSDEVICE          | 保存短信设备数据   |                                                      |
| 6        | PRD_SAVE_AUXILIARYDEVICE    | 保存辅件设备数据   |                                                      |
| 7        | PRD_SAVE_PUMPALARMINFO      | 保存泵设备报警数据 |                                                      |
| 8        | PRD_SAVE_PIPELINEALARMINFO  | 保存管设备报警数据 |                                                      |
| 9        | PRD_SAVE_ALARMCOLOR         | 保存报警等级颜色   |                                                      |
| 10       | PRD_SAVE_DEVICEOPERATIONLOG | 保存设备操作日志   |                                                      |
| 11       | PRD_SAVE_RESOURCEMONITORING | 保存资源监测数据   |                                                      |
| 12       | PRD_SAVE_SYSTEMLOG          | 保存系统日志数据   |                                                      |
| 13       | PRD_UPDATE_PUMPDEVICE       | 修改泵设备数据     |                                                      |
| 14       | PRD_UPDATE_PIPELINEDEVICE   | 修改管设备数据     |                                                      |
| 15       | PRD_UPDATE_SMSDEVICE        | 修改短信设备数据   |                                                      |
| 16       | PRD_UPDATE_AUXILIARYDEVICE  | 修改辅件设备数据   |                                                      |

# 四、触发器

表4-1 触发器概览

| **序号** | **名称**                          | **描述**                               |
|----------|-----------------------------------|----------------------------------------|
| 1        | TRG_B_ACQ_GROUP2UNIT_CONF_I       | 采控单元和采控组关系表插入数据前触发   |
| 2        | TRG_B_ACQ_GROUP_CONF_I            | 采控组表插入数据前触发                 |
| 3        | TRG_B_ACQ_ITEM2GROUP_CONF_I       | 采控组和采控项项关系表插入数据前触发   |
| 4        | TRG_B_ACQ_UNIT_CONF_I             | 采控单元表插入数据前触发               |
| 5        | TRG_B_ALARM_ITEM2UNIT_CONF_I      | 报警单元和报警项关系表插入数据前触发   |
| 6        | TRG_B_ALARM_UNIT_CONF_I           | 报警单元表插入数据前触发               |
| 7        | TRG_B_AUXILIARY2MASTER_I          | 主设备、辅件设备关系表插入数据前触发   |
| 8        | TRG_B_AUXILIARYDEVICE_I           | 辅件设备表插入数据前触发               |
| 9        | TRG_B_CODE_I                      | 代码表插入数据前触发                   |
| 10       | TRG_B_DATAMAPPING_I               | 字段映射表插入数据前触发               |
| 11       | TRG_B_DEVICEOPERATIONLOG_I        | 设备操作日志表插入数据前触发           |
| 12       | BEF_HIBERNATE_SEQUENCE_INSERT     | 数据字典项数据表插入数据前触发         |
| 13       | TRG_B_MODULE_I                    | 模块表插入数据前触发                   |
| 14       | TRG_B_MODULE2ROLE_I               | 模块和角色关系表插入数据前触发         |
| 15       | TRG_B_ORG_I_U                     | 组织表插入、修改数据前触发             |
| 16       | TRG_B_PIPELINEACQDATA_HIST_I      | 管设备历史数据表插入数据前触发         |
| 17       | TRG_B_PIPELINEACQDATA_LATEST_I    | 管设备实时数据表插入数据前触发         |
| 18       | TRG_B_PIPELINEACQRAWDATA_I        | 管设备原始采集数据表插入数据前触发     |
| 19       | TRG_B_PIPELINEALARMINFO_HIST_I    | 管设备报警历史数据表插入数据前触发触发 |
| 20       | TRG_B_PIPELINEALARMINFO_L_I       | 管设备报警实时数据表插入数据前触发触发 |
| 21       | TRG_A_PIPELINEDEVICE_I            | 管设备信息表插入数据前触发             |
| 22       | TRG_B_PIPELINEDEVICE_I            | 管设备信息表插入数据后触发             |
| 23       | TRG_B_PIPELINEDEVICEADDINFO_I     | 管设备附加信息数据表插入数据前触发     |
| 24       | TRG_B\_PIPELINEDEVICEGRAPHICSET_I | 管设备图形设置表插入数据前触发         |
| 25       | TRG_B_PROTOCOLALARMINSTANCE_I     | 报警实例表插入数据前触发               |
| 26       | TRG_B_PROTOCOLINSTANCE_I          | 采控实例表插入数据前触发               |
| 27       | TRG_B_PROTOCOLSMSINSTANCE_I       | 短信实例表插入数据前触发               |
| 28       | TRG_B_PUMPACQDATA_HIST_I          | 泵设备历史数据表插入数据前触发         |
| 29       | TRG_B_PUMPACQDATA_LATEST_I        | 泵设备实时数据表插入数据前触发         |
| 30       | TRG_B_PUMPACQRAWDATA_I            | 泵设备原始采集数据表插入数据前触发     |
| 31       | TRG_B_PUMPALARMINFO_HIST_I        | 泵设备报警历史数据表插入数据前触发触发 |
| 32       | TRG_B_PUMPALARMINFO_LATEST_I      | 泵设备报警实时数据表插入数据前触发触发 |
| 33       | TRG_A_PUMPDEVICE_I                | 泵设备信息表插入数据前触发             |
| 34       | TRG_B_PUMPDEVICE_I                | 泵设备信息表插入数据后触发             |
| 35       | TRG_B_PUMPDEVICEADDINFO_I         | 泵设备附加信息数据表插入数据前触发     |
| 36       | TRG_B_PUMPDEVICEGRAPHICSET_I      | 泵设备图形设置表插入数据前触发         |
| 37       | TRG_B_RESOURCEMONITORING_I        | 资源监测表插入数据前触发               |
| 38       | TRG_B_ROLE_I                      | 角色表插入数据前触发                   |
| 39       | TRG_B_SMSDEVICE_I                 | 短信设备信息表插入数据后触发           |
| 40       | TRG_B_SYSTEMLOG_I                 | 系统日志表插入数据前触发               |
| 41       | TRG_B_USER_I                      | 用户表插入数据前触发                   |
