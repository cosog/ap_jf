package com.cosog.utils;

import java.util.List;

public class ConfigFile {
	
	private Server server;

    private Spring spring;

    private ViewInformation viewInformation;
    
    private DriverConfig driverConfig;
    
    private Email email;

    private Others others;

    public void setServer(Server server){
        this.server = server;
    }
    public Server getServer(){
        return this.server;
    }
    public void setSpring(Spring spring){
        this.spring = spring;
    }
    public Spring getSpring(){
        return this.spring;
    }
    public void setViewInformation(ViewInformation viewInformation){
        this.viewInformation = viewInformation;
    }
    public ViewInformation getViewInformation(){
        return this.viewInformation;
    }
    public void setOthers(Others others){
        this.others = others;
    }
    public Others getOthers(){
        return this.others;
    }
	public DriverConfig getDriverConfig() {
		return driverConfig;
	}
	public void setDriverConfig(DriverConfig driverConfig) {
		this.driverConfig = driverConfig;
	}
	public Email getEmail() {
		return email;
	}
	public void setEmail(Email email) {
		this.email = email;
	}
	
	public static class Server
	{
	    private String accessPath;
	    
	    public void setAccessPath(String accessPath){
	        this.accessPath = accessPath;
	    }
	    public String getAccessPath(){
	        return this.accessPath;
	    }
	}
	
	public static class Datasource
	{
	    private String driverUrl;

	    private String driver;

	    private String dialect;

	    private String user;

	    private String password;

	    public void setDriverUrl(String driverUrl){
	        this.driverUrl = driverUrl;
	    }
	    public String getDriverUrl(){
	        return this.driverUrl;
	    }
	    public void setDriver(String driver){
	        this.driver = driver;
	    }
	    public String getDriver(){
	        return this.driver;
	    }
	    public void setDialect(String dialect){
	        this.dialect = dialect;
	    }
	    public String getDialect(){
	        return this.dialect;
	    }
	    public void setUser(String user){
	        this.user = user;
	    }
	    public String getUser(){
	        return this.user;
	    }
	    public void setPassword(String password){
	        this.password = password;
	    }
	    public String getPassword(){
	        return this.password;
	    }
	}
	
	public static class Spring
	{
	    private Datasource datasource;

	    public void setDatasource(Datasource datasource){
	        this.datasource = datasource;
	    }
	    public Datasource getDatasource(){
	        return this.datasource;
	    }
	}
	
	public static class ViewInformation
	{
	    private String title;

	    private String profile;

	    private String copy;

	    private String linkaddress;

	    private String linkshow;

	    public void setTitle(String title){
	        this.title = title;
	    }
	    public String getTitle(){
	        return this.title;
	    }
	    public void setProfile(String profile){
	        this.profile = profile;
	    }
	    public String getProfile(){
	        return this.profile;
	    }
	    public void setCopy(String copy){
	        this.copy = copy;
	    }
	    public String getCopy(){
	        return this.copy;
	    }
	    public void setLinkaddress(String linkaddress){
	        this.linkaddress = linkaddress;
	    }
	    public String getLinkaddress(){
	        return this.linkaddress;
	    }
	    public void setLinkshow(String linkshow){
	        this.linkshow = linkshow;
	    }
	    public String getLinkshow(){
	        return this.linkshow;
	    }
	}
	
	public static class DriverProbe{
		private String init;
		private String app;
		private String mem;
		private String disk;
		private String host;
		private String cpu;
		public String getInit() {
			return init;
		}
		public void setInit(String init) {
			this.init = init;
		}
		public String getMem() {
			return mem;
		}
		public void setMem(String mem) {
			this.mem = mem;
		}
		public String getDisk() {
			return disk;
		}
		public void setDisk(String disk) {
			this.disk = disk;
		}
		public String getHost() {
			return host;
		}
		public void setHost(String host) {
			this.host = host;
		}
		public String getCpu() {
			return cpu;
		}
		public void setCpu(String cpu) {
			this.cpu = cpu;
		}
		public String getApp() {
			return app;
		}
		public void setApp(String app) {
			this.app = app;
		}
	}
	
	public static class DriverConfig{
		private String server;
		private String protocol;
		private String instance;
		private String id;
		private String SMS;
		private String readAddr;
		private String writeAddr;
		private String writeSMS;
		private DriverProbe probe;
		public String getServer() {
			return server;
		}
		public void setServer(String server) {
			this.server = server;
		}
		public String getProtocol() {
			return protocol;
		}
		public void setProtocol(String protocol) {
			this.protocol = protocol;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public DriverProbe getProbe() {
			return probe;
		}
		public void setProbe(DriverProbe probe) {
			this.probe = probe;
		}
		public String getReadAddr() {
			return readAddr;
		}
		public void setReadAddr(String readAddr) {
			this.readAddr = readAddr;
		}
		public String getWriteAddr() {
			return writeAddr;
		}
		public void setWriteAddr(String writeAddr) {
			this.writeAddr = writeAddr;
		}
		public String getInstance() {
			return instance;
		}
		public void setInstance(String instance) {
			this.instance = instance;
		}
		public String getSMS() {
			return SMS;
		}
		public void setSMS(String sMS) {
			SMS = sMS;
		}
		public String getWriteSMS() {
			return writeSMS;
		}
		public void setWriteSMS(String writeSMS) {
			this.writeSMS = writeSMS;
		}
	}
	
	public static class mailAccount{
		private String account;
		private String password;
		private String smtpHost;
		private String smtpPort;
		public String getAccount() {
			return account;
		}
		public void setAccount(String account) {
			this.account = account;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getSmtpHost() {
			return smtpHost;
		}
		public void setSmtpHost(String smtpHost) {
			this.smtpHost = smtpHost;
		}
		public String getSmtpPort() {
			return smtpPort;
		}
		public void setSmtpPort(String smtpPort) {
			this.smtpPort = smtpPort;
		}
	}
	
	public static class Email{
		private mailAccount snedAccount;

		public mailAccount getSnedAccount() {
			return snedAccount;
		}

		public void setSnedAccount(mailAccount snedAccount) {
			this.snedAccount = snedAccount;
		}
	}
	
	public static class Others
	{
	    private boolean cache;

	    private String language;

	    private int pageSize;

	    private boolean syncOrAsync;

	    private boolean expandedAll;

	    private int defaultComboxSize;

	    private int defaultGraghSize;
	    
	    private int productionUnit;
	    
	    private int dataSaveMode;
	    
	    private boolean showLogo;
	    
	    private boolean printLog;

		private String serialnumber;

	    public void setCache(boolean cache){
	        this.cache = cache;
	    }
	    public boolean getCache(){
	        return this.cache;
	    }
	    public void setLanguage(String language){
	        this.language = language;
	    }
	    public String getLanguage(){
	        return this.language;
	    }
	    public void setPageSize(int pageSize){
	        this.pageSize = pageSize;
	    }
	    public int getPageSize(){
	        return this.pageSize;
	    }
	    public void setSyncOrAsync(boolean syncOrAsync){
	        this.syncOrAsync = syncOrAsync;
	    }
	    public boolean getSyncOrAsync(){
	        return this.syncOrAsync;
	    }
	    public void setExpandedAll(boolean expandedAll){
	        this.expandedAll = expandedAll;
	    }
	    public boolean getExpandedAll(){
	        return this.expandedAll;
	    }
	    public void setDefaultComboxSize(int defaultComboxSize){
	        this.defaultComboxSize = defaultComboxSize;
	    }
	    public int getDefaultComboxSize(){
	        return this.defaultComboxSize;
	    }
	    public void setDefaultGraghSize(int defaultGraghSize){
	        this.defaultGraghSize = defaultGraghSize;
	    }
	    public int getDefaultGraghSize(){
	        return this.defaultGraghSize;
	    }
	    public void setSerialnumber(String serialnumber){
	        this.serialnumber = serialnumber;
	    }
	    public String getSerialnumber(){
	        return this.serialnumber;
	    }
		public int getProductionUnit() {
			return productionUnit;
		}
		public void setProductionUnit(int productionUnit) {
			this.productionUnit = productionUnit;
		}
		public int getDataSaveMode() {
			return dataSaveMode;
		}
		public void setDataSaveMode(int dataSaveMode) {
			this.dataSaveMode = dataSaveMode;
		}
		public boolean getShowLogo() {
			return showLogo;
		}
		public void setShowLogo(boolean showLogo) {
			this.showLogo = showLogo;
		}
		public boolean getPrintLog() {
			return printLog;
		}
		public void setPrintLog(boolean printLog) {
			this.printLog = printLog;
		}
	}
}
