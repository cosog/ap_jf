@echo off
@echo 创建例子数据.....
sqlplus ap_fb/ap123#@orcl @initExampleData.sql>initExampleData.txt

@pause 