CREATE OR REPLACE TRIGGER "BEF_HIBERNATE_SEQUENCE_INSERT"
BEFORE INSERT ON TBL_DIST_ITEM
FOR EACH ROW
BEGIN
  SELECT to_char(HIBERNATE_SEQUENCE.nextval)INTO :new.DATAITEMID FROM dual;
end;
/

CREATE OR REPLACE TRIGGER trg_a_pipelinedevice_i   after  insert or update  on tbl_pipelinedevice FOR EACH ROW
declare
  pipeline_RT   number(10);
begin
  select count(id) into pipeline_RT from tbl_pipelineacqdata_latest t where t.wellid = :new.id;
    if pipeline_RT = 0  then
       insert into tbl_pipelineacqdata_latest (wellId) (select :new.id from dual);
    end if;
end;
/

CREATE OR REPLACE TRIGGER trg_a_pumpdevice_i   after  insert or update  on tbl_pumpdevice FOR EACH ROW
declare
  pump_RT   number(10);
begin
  select count(id) into pump_RT from tbl_pumpacqdata_latest t where t.wellid = :new.id;
    if pump_RT = 0  then
       insert into tbl_pumpacqdata_latest (wellId) (select :new.id from dual);
    end if;
end;
/

create or replace trigger trg_b_acq_group2unit_conf_i   before  insert on TBL_ACQ_group2unit_conf FOR EACH ROW
BEGIN
  SELECT SEQ_ACQ_UNIT_GROUP.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER trg_b_acq_group_conf_i   before  insert on TBL_ACQ_GROUP_CONF FOR EACH ROW
BEGIN
  SELECT SEQ_ACQUISITIONGROUP.nextval,'group' || SEQ_ACQUISITIONGROUP.nextval INTO :new.id, :new.group_code FROM dual;
end;
/

create or replace trigger trg_b_acq_item2group_conf_i   before  insert on TBL_ACQ_ITEM2GROUP_CONF FOR EACH ROW
BEGIN
  SELECT SEQ_ACQ_GROUP_ITEM.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER trg_b_acq_unit_conf_i   before  insert on TBL_ACQ_UNIT_CONF FOR EACH ROW
BEGIN
  SELECT SEQ_ACQUISITIONUNIT.nextval,'unit' || SEQ_ACQUISITIONUNIT.nextval INTO :new.id, :new.unit_code FROM dual;
end;
/

CREATE OR REPLACE TRIGGER 
trg_b_alarm_item2unit_conf_i   before  insert on TBL_ALARM_ITEM2UNIT_CONF FOR EACH ROW
BEGIN
  SELECT seq_alarm_item2unit_conf.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER 
trg_b_alarm_unit_conf_i   before  insert on TBL_ALARM_UNIT_CONF FOR EACH ROW
BEGIN
  SELECT seq_alarm_unit_conf.nextval,'alarmunit' || seq_alarm_unit_conf.nextval INTO :new.id, :new.unit_code FROM dual;
end;
/

CREATE OR REPLACE TRIGGER 
trg_b_auxiliary2master_i   before  insert on TBL_AUXILIARY2MASTER FOR EACH ROW
BEGIN
  SELECT seq_auxiliary2master.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER 
trg_b_auxiliarydevice_i   before  insert on tbl_auxiliarydevice FOR EACH ROW
BEGIN
  SELECT seq_auxiliarydevice.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_code_i   before  insert on TBL_CODE FOR EACH ROW
BEGIN
  SELECT SEQ_code.nextval INTO :new.id FROM dual;
END;
/

create or replace trigger trg_b_datamapping_i   before  insert on tbl_datamapping FOR EACH ROW
BEGIN
  SELECT seq_datamapping.nextval INTO :new.id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER 
trg_b_deviceoperationlog_i   before  insert on TBL_DEVICEOPERATIONLOG FOR EACH ROW
BEGIN
  SELECT seq_deviceoperationlog.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_module2role_i   before  insert  on tbl_module2role FOR EACH ROW
BEGIN
       SELECT seq_role_module.nextval INTO :new.rm_id FROM dual;
END;
/

create or replace trigger trg_b_module_i   before  insert on TBL_MODULE FOR EACH ROW
BEGIN
  SELECT SEQ_MODULE.nextval INTO :new.MD_id FROM dual;
END;
/

create or replace trigger trg_b_org_i_u   before  insert or update  on TBL_ORG FOR EACH ROW
BEGIN
  case
       when inserting then
            SELECT SEQ_ORG.nextval INTO :new.ORG_ID FROM dual;
       when updating then
            update tbl_pumpdevice t set t.orgid=:new.org_id where t.orgid=:old.org_id;
            update tbl_pipelinedevice t set t.orgid=:new.org_id where t.orgid=:old.org_id;
            update tbl_smsdevice t set t.orgid=:new.org_id where t.orgid=:old.org_id;
  end case;
END;
/

CREATE OR REPLACE TRIGGER trg_b_pipelineacqdata_hist_i   before  insert on TBL_PIPELINEACQDATA_HIST FOR EACH ROW
BEGIN
  SELECT seq_pipelineacqdata_hist.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER trg_b_pipelineacqdata_latest_i   before  insert on TBL_PIPELINEACQDATA_LATEST FOR EACH ROW
BEGIN
  SELECT seq_pipelineacqdata_latest.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pumpacqdata_hist_i   before  insert on tbl_pumpacqdata_hist FOR EACH ROW
BEGIN
  SELECT seq_pumpacqdata_hist.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pipelinealarminfo_hist_i   before  update or insert on tbl_pipelinealarminfo_hist FOR EACH ROW
declare
    recordCount number(8,2) :=0;
BEGIN
  SELECT seq_pipelinealarminfo_hist.nextval INTO :new.id FROM dual;
  select count(1) into recordCount from tbl_pipelinealarminfo_latest t 
  where t.wellid=:new.wellid and t.alarmtype=:new.alarmtype and t.itemname=:new.itemname; 
  if recordCount=0 then
    insert into tbl_pipelinealarminfo_latest(
    wellid,alarmtime,itemname,alarmtype,alarmvalue,alarminfo,alarmlimit,
    hystersis,alarmlevel,recoverytime,issendmessage,issendmail
    )values(
    :new.wellid,:new.alarmtime,:new.itemname,:new.alarmtype,:new.alarmvalue,:new.alarminfo,:new.alarmlimit,
    :new.hystersis,:new.alarmlevel,:new.recoverytime,:new.issendmessage,:new.issendmail
    );
  else
    update tbl_pipelinealarminfo_latest t
    set t.alarmvalue=:new.alarmvalue,t.alarmtime=:new.alarmtime,
        t.alarminfo=:new.alarminfo,t.alarmlimit=:new.alarmlimit,
        t.hystersis=:new.hystersis,t.alarmlevel=:new.alarmlevel,t.recoverytime=:new.recoverytime,
        t.issendmessage=:new.issendmessage, t.issendmail=:new.issendmail
    where t.wellid=:new.wellid and t.alarmtype=:new.alarmtype and t.itemname=:new.itemname;  
  end if;
end;
/

create or replace trigger trg_b_pipelinealarminfo_l_i   before  insert on tbl_pipelinealarminfo_latest FOR EACH ROW
BEGIN
  SELECT seq_pipelinealarminfo_latest.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pipelinedevice_i   before  insert on tbl_pipelinedevice FOR EACH ROW
BEGIN
  SELECT seq_pipelinedevice.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pipelinedeviceaddinfo_i   before  insert on tbl_pipelinedeviceaddinfo FOR EACH ROW
BEGIN
  SELECT seq_pipelinedeviceaddinfo.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER 
trg_b_pipelinedevicegraphset_i   before  insert on tbl_pipelinedevicegraphicset FOR EACH ROW
BEGIN
  SELECT seq_pipelinedevicegraphicset.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER trg_b_protocolalarminstance_i   before  insert on tbl_protocolalarminstance FOR EACH ROW
BEGIN
  SELECT seq_protocolalarminstance.nextval,'alarminstance' || seq_protocolalarminstance.nextval INTO :new.id, :new.code FROM dual;
end;
/

CREATE OR REPLACE TRIGGER trg_b_protocolinstance_i   before  insert on tbl_protocolinstance FOR EACH ROW
BEGIN
  SELECT seq_protocolinstance.nextval,'instance' || seq_protocolinstance.nextval INTO :new.id, :new.code FROM dual;
end;
/

CREATE OR REPLACE TRIGGER trg_b_protocolsmsinstance_i   before  insert on tbl_protocolsmsinstance FOR EACH ROW
BEGIN
  SELECT seq_protocolsmsinstance.nextval,'smsinstance' || seq_protocolsmsinstance.nextval INTO :new.id, :new.code FROM dual;
end;
/

create or replace trigger trg_b_pumpacqdata_hist_i   before  insert on tbl_pumpacqdata_hist FOR EACH ROW
BEGIN
  SELECT seq_pumpacqdata_hist.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pumpacqdata_latest_i   before  insert on tbl_pumpacqdata_latest FOR EACH ROW
BEGIN
  SELECT seq_pumpacqdata_latest.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pumpacqrawdata_i   before  insert on tbl_pumpacqrawdata FOR EACH ROW
BEGIN
  SELECT seq_pumpacqrawdata.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pumpalarminfo_hist_i   before  update or insert on tbl_pumpalarminfo_hist FOR EACH ROW
declare
    recordCount number(8,2) :=0;
BEGIN
  SELECT seq_pumpalarminfo_hist.nextval INTO :new.id FROM dual;
  select count(1) into recordCount from tbl_pumpalarminfo_latest t 
  where t.wellid=:new.wellid and t.alarmtype=:new.alarmtype and t.itemname=:new.itemname; 
  if recordCount=0 then
    insert into tbl_pumpalarminfo_latest(
    wellid,alarmtime,itemname,alarmtype,alarmvalue,alarminfo,alarmlimit,
    hystersis,alarmlevel,recoverytime,issendmessage,issendmail
    )values(
    :new.wellid,:new.alarmtime,:new.itemname,:new.alarmtype,:new.alarmvalue,:new.alarminfo,:new.alarmlimit,
    :new.hystersis,:new.alarmlevel,:new.recoverytime,:new.issendmessage,:new.issendmail
    );
  else
    update tbl_pumpalarminfo_latest t
    set t.alarmvalue=:new.alarmvalue,t.alarmtime=:new.alarmtime,
        t.alarminfo=:new.alarminfo,t.alarmlimit=:new.alarmlimit,
        t.hystersis=:new.hystersis,t.alarmlevel=:new.alarmlevel,t.recoverytime=:new.recoverytime,
        t.issendmessage=:new.issendmessage, t.issendmail=:new.issendmail
    where t.wellid=:new.wellid and t.alarmtype=:new.alarmtype and t.itemname=:new.itemname;  
  end if;
end;
/

create or replace trigger trg_b_pumpalarminfo_latest_i   before  insert on tbl_pumpalarminfo_latest FOR EACH ROW
BEGIN
  SELECT seq_pumpalarminfo_latest.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pumpdevice_i   before  insert on tbl_pumpdevice FOR EACH ROW
BEGIN
  SELECT seq_pumpdevice.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_pumpdeviceaddinfo_i   before  insert on tbl_pumpdeviceaddinfo FOR EACH ROW
BEGIN
  SELECT seq_pumpdeviceaddinfo.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER 
trg_b_pumpdevicegraphicset_i   before  insert on tbl_pumpdevicegraphicset FOR EACH ROW
BEGIN
  SELECT seq_pumpdevicegraphicset.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_resourcemonitoring_i   before  insert on tbl_resourcemonitoring FOR EACH ROW
BEGIN
  SELECT seq_resourcemonitoring.nextval INTO :new.id FROM dual;
END;
/

create or replace trigger trg_b_role_i   before  insert  on TBL_ROLE FOR EACH ROW
BEGIN
       SELECT SEQ_ROLE.nextval INTO :new.ROLE_ID FROM dual;
END;
/

create or replace trigger trg_b_smsdevice_i   before  insert on tbl_smsdevice FOR EACH ROW
BEGIN
  SELECT seq_smsdevice.nextval INTO :new.id FROM dual;
end;
/

CREATE OR REPLACE TRIGGER 
trg_b_systemlog_i   before  insert on tbl_systemlog FOR EACH ROW
BEGIN
  SELECT seq_systemlog.nextval INTO :new.id FROM dual;
end;
/

create or replace trigger trg_b_user_i   before  insert on TBL_USER FOR EACH ROW
BEGIN
  SELECT SEQ_USER.nextval INTO :new.USER_NO FROM dual;
END;
/