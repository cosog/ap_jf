drop tablespace ap_jf_temp including contents and datafiles;
drop tablespace ap_jf_data including contents and datafiles;
drop user ap_jf cascade;
create temporary tablespace ap_jf_temp
TEMPFILE 'D:\oracle11g\oradata\orcl\ap_jf_temp.dbf'
size 50m reuse
autoextend on
next 50m maxsize unlimited
extent management local;
create tablespace ap_jf_data
logging
DATAFILE 'D:\oracle11g\oradata\orcl\ap_jf_data.dbf'
size 350m reuse
autoextend on
next 50m maxsize unlimited
extent management local;
create user ap_jf identified by ap123#
default tablespace ap_jf_data
temporary tablespace ap_jf_temp;
grant connect,resource,dba to ap_jf;
exit;
