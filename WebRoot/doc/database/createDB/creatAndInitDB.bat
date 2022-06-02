@echo off
@echo 创建表格及初始化.....
sqlplus ap_jf/ap123#@orclpdb @createAndInitDB.sql>createAndInitDB.txt

@pause 