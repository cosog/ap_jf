drop tablespace ap_fb_temp including contents and datafiles;
drop tablespace ap_fb_data including contents and datafiles;
drop user ap_fb cascade;
create temporary tablespace ap_fb_temp
TEMPFILE 'D:\oracle19c\oradata\ORCL\orclpdb\ap_fb_temp.dbf'
size 50m
autoextend on
next 50m maxsize unlimited
extent management local;
create tablespace ap_fb_data
logging
DATAFILE 'D:\oracle19c\oradata\ORCL\orclpdb\ap_fb_data.dbf'
size 350m
autoextend on
next 50m maxsize unlimited
extent management local;
create user ap_fb identified by ap123#
default tablespace ap_fb_data
temporary tablespace ap_fb_temp;
grant connect,resource,dba to ap_fb;
exit;
