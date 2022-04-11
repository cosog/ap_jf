package com.cosog.dao;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.Map.Entry;

import javax.annotation.Resource;

import jxl.write.WritableImage;
import jxl.write.WritableSheet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import oracle.jdbc.OracleConnection;
import oracle.jdbc.internal.OracleClob;
import oracle.sql.BLOB;
import oracle.sql.CLOB;
import redis.clients.jedis.Jedis;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.springframework.orm.hibernate5.SessionFactoryUtils;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cosog.model.AlarmShowStyle;
import com.cosog.model.DisplayUnit;
import com.cosog.model.KeyParameter;
import com.cosog.model.Org;
import com.cosog.model.User;
import com.cosog.model.calculate.CommResponseData;
import com.cosog.model.calculate.TimeEffResponseData;
import com.cosog.model.calculate.TimeEffTotalResponseData;
import com.cosog.model.calculate.WellAcquisitionData;
import com.cosog.model.drive.AcquisitionGroupResolutionData;
import com.cosog.model.drive.AcquisitionItemInfo;
import com.cosog.model.drive.KafkaConfig;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.model.gridmodel.PumpingModelHandsontableChangedData;
import com.cosog.model.gridmodel.CalculateManagerHandsontableChangedData;
import com.cosog.model.gridmodel.ElecInverCalculateManagerHandsontableChangedData;
import com.cosog.model.gridmodel.InverOptimizeHandsontableChangedData;
import com.cosog.model.gridmodel.ProductionOutGridPanelData;
import com.cosog.model.gridmodel.ResProHandsontableChangedData;
import com.cosog.model.gridmodel.ReservoirPropertyGridPanelData;
import com.cosog.model.gridmodel.WellGridPanelData;
import com.cosog.model.gridmodel.WellHandsontableChangedData;
import com.cosog.model.gridmodel.WellProHandsontableChangedData;
import com.cosog.model.gridmodel.WellringGridPanelData;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.task.MemoryDataManagerTask;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.LicenseMap;
import com.cosog.utils.OracleJdbcUtis;
import com.cosog.utils.Page;
import com.cosog.utils.SerializeObjectUnils;
import com.cosog.utils.StringManagerUtils;
import com.cosog.utils.LicenseMap.License;
/**
 * <p>
 * 描述：核心服务dao处理接口类
 * </p>
 * 
 * @author gao 2014-06-04
 * @since 2013-08-08
 * @version 1.0
 * 
 */
@SuppressWarnings({ "unused", "unchecked", "rawtypes", "deprecation" })
@Repository("baseDao")
public class BaseDao extends HibernateDaoSupport {
	private static Log log = LogFactory.getLog(BaseDao.class);
	private Session session = null;
	public static String ConvertBLOBtoString(Blob BlobContent) {
		byte[] msgContent = null;
		try {
			msgContent = BlobContent.getBytes(1, (int) BlobContent.length());
		} catch (SQLException e1) {
			e1.printStackTrace();
		} // BLOB转换为字节数组
		String newStr = ""; // 返回字符串
		long BlobLength; // BLOB字段长度
		try {
			BlobLength = BlobContent.length(); // 获取BLOB长度
			if (msgContent == null || BlobLength == 0) // 如果为空，返回空值
			{
				return "";
			} else // 处理BLOB为字符串
			{
				newStr = new String(BlobContent.getBytes(1, 900), "gb2312"); // 简化处理，只取前900字节
				return newStr;
			}
		} catch (Exception e) // oracle异常捕获
		{
			e.printStackTrace();
		}
		return newStr;
	}

	/**
	 * @param dataSheet
	 * @param col
	 * @param row
	 * @param width
	 * @param height
	 * @param imgFile
	 */
	public static void insertImg(WritableSheet dataSheet, int col, int row, int width, int height, File imgFile) {
		WritableImage img = new WritableImage(col, row, width, height, imgFile);
		dataSheet.addImage(img);
	}

	@Transactional
	public <T> Serializable addObject(T clazz) {

		return this.save(clazz);
	}


	/**
	 * <p>
	 * 描述：批量删除对象信息
	 * </p>
	 * 
	 * @param hql
	 * @throws Exception
	 * 
	 * @author gao 2014-06-06
	 * 
	 */
	@Transactional
	public void bulkObjectDelete(final String hql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		query.executeUpdate();
	}

	/**
	 * <p>
	 * 描述：根据传入的对象类型，删除该对象的一条记录
	 * </p>
	 * 
	 * @param obj
	 *            传入的对象
	 * @return
	 */
	public Serializable delectObject(Object obj) {
		Session session = getSessionFactory().getCurrentSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			session.delete(obj);
			tx.commit();
		} catch (Exception e) {
			tx.rollback();
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 存储过程调用删除 传入数组String[] ->删除(带占位符的)
	 * 
	 * @param callSql
	 * @param values
	 * @return
	 */
	public void deleteCallParameter(final String callSql, final Object... values) {
		Query query = getSessionFactory().getCurrentSession().createQuery(callSql);
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
		query.executeUpdate();
	}

	public Object deleteCallSql(final String sql, final Object... values) {
		Session session = getSessionFactory().getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				for (int i = 0; i < values.length; i++) {
					query.setParameter(i, values[i]);
				}
				return query.executeUpdate();
	}

	public int deleteObject(final String hql) {
		Session session = getSessionFactory().getCurrentSession();
				SQLQuery query = session.createSQLQuery(hql);
				return query.executeUpdate();
	}

	public <T> void deleteObject(T clazz) {
		this.getHibernateTemplate().delete(clazz);
	}

	/**
	 * 传入数组String[] ->删除(带占位符的) (批量)
	 * 
	 * @param queryString
	 * @param parametName
	 * @param parametValue
	 * @return
	 */
	public Query deleteQueryParameter(String queryString, String parametName, Object[] parametValue, Object... values) {
		Query query = getSessionFactory().getCurrentSession().createQuery(queryString);
		query.setParameterList(parametName, parametValue);
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
		return query;
	}

	/**
	 * 修改一个对象
	 * 
	 * @param object
	 */
	@Transactional
	public void edit(Object object) {
		getSessionFactory().getCurrentSession().update(object);
	}

	/**
	 * 执行一个SQL，update或insert
	 * 
	 * @param sql
	 * @return update或insert的记录数
	 */
	public int executeSqlUpdate(String sql) {
		int n = 0;
		Statement stat = null;
		Connection conn=null;
		PreparedStatement ps=null;
		try {
			conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			ps=conn.prepareStatement(sql);
			n=ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (stat != null) {
					stat.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return n;
	}
	
	/**
	 * 执行一个SQL，update或insert
	 * 
	 * @param sql
	 * @return update或insert的记录数
	 */
	public int executeSqlUpdateClob(String sql,List<String> values) {
		int n = 0;
		Connection conn=null;
		PreparedStatement ps=null;
		try {
			conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			ps=conn.prepareStatement(sql);
			for(int i=0;i<values.size();i++){
				CLOB clob   = oracle.sql.CLOB.createTemporary(conn, false,oracle.sql.CLOB.DURATION_SESSION);  
				clob.putString(1,  values.get(i)); 
				ps.setClob(i+1, clob);  
			}
			n=ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return n;
	}

	/**
	 * HQL查询
	 * 
	 * @param queryString
	 *            HQL语句
	 * @param values
	 *            HQL参数
	 * @return
	 */
	public List find(String queryString, Object... values) {
		Query query = getSessionFactory().getCurrentSession().createQuery(queryString);
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
		return query.list();
	}
	
	/**
	 * <p>
	 * 描述：根据传入的hql语句返回一个List数据集合
	 * </p>
	 * 
	 * @author gao 2014-06-04
	 * @param hql
	 *            传入的hql语句
	 * @return List<T>
	 */
//	public <T> List<T> getObjects(String hql) {
//		Session session=getSessionFactory().getCurrentSession();
//		return (List<T>) this.getHibernateTemplate().find(hql);
//	}

	/**
	 * sql调用查询
	 * 
	 * @param queryString
	 *            callSql语句
	 * @param values
	 *            callSql参数
	 * @author qiands
	 * @return List<?>
	 */
	public List<?> findCallSql(final String callSql, final Object... values) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(callSql);
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
		return query.list();
	}

	public List<Org> findChildOrg(Integer parentId) {
		String queryString = "SELECT u FROM Org u where u.orgParent=" + parentId + " order by u.orgId ";
		return find(queryString);
	}

	/**
	 * 根据ID获取一个对象，如果查不到返回null
	 * 
	 * @param entityClass
	 * @param id
	 *            :查询对象的id
	 * @return <T>
	 */
	public <T> T get(Class<T> entityClass, Serializable id) {
		return (T) getSessionFactory().getCurrentSession().get(entityClass, id);
	}

	public <T> List<T> getAllObjects(Class<T> clazz) {
		return this.getHibernateTemplate().loadAll(clazz);
	}

	/**
	 * HQL Hibernate分页
	 * 
	 * @param hql
	 *            HSQL 查询语句
	 * @param page
	 *            分页条件信息
	 * @return List<T> 查询结果集
	 */
	public <T> List<T> getAllPageByHql(final String hql, final Page page) {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		ScrollableResults scrollableResults = query.scroll(ScrollMode.SCROLL_SENSITIVE);
		scrollableResults.last();
		query.setFirstResult(page.getStart());
		query.setMaxResults(page.getLimit());
		page.setTotalCount(scrollableResults.getRowNumber() + 1);
		return query.list();
	}

	/**
	 * 返回当前页的数据信息,执行的是sql查询操作
	 * 
	 * @author gao 2014-05-08
	 * @param sql
	 *            查询的sql语句
	 * @param pager
	 *            分页信息
	 * @param values动态参数
	 * @return list 数据结果集合
	 */
	public <T> List<T> getAllPageBySql(final String sql, final Page pager, final Object... values) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		/****
		* 为query对象参数赋值操作
		 * */
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
		query.setFirstResult(pager.getStart());// 设置起始位置
		query.setMaxResults(pager.getLimit());// 设置分页条数
		int totals = getTotalCountRows(sql, values);//设置数据表中的总记录数
		pager.setTotalCount(totals);
		return query.list();
	}
	public <T> List<T> getMyCustomPageBySql(final String sqlAll,final String sql, final Page pager, final Object... values) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		for (int i = 0; i < values.length; i++) {
			values[i] = values[i].toString().replace("@", ",");
			query.setParameter(i, values[i]);
		}
		int totals = getTotalCountRows(sqlAll, values);//设置数据表中的总记录数
		pager.setTotalCount(totals);
		return query.list();
	}

	/***
	 * *************************************begin
	 * 
	 * @author qiands
	 */
	/**
	 * 分页方法
	 * 
	 * @param sql
	 * @param pager
	 * @return
	 * @author qiands
	 */
	public <T> List<T> getAllPageBySql(final String sql, final Page pager, final Vector<String> v) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		int index = -1;
		String data = "";
		for (int i = 0; i < v.size(); i++) {
			if (!"".equals(v.get(i)) && null != v.get(i) && v.get(i).length() > 0) {
				index += 1;
				data = v.get(i);
				query.setParameter(index, data);
			}
		}
		ScrollableResults scrollableResults = query.scroll(ScrollMode.SCROLL_SENSITIVE);
		scrollableResults.last();
		query.setFirstResult(pager.getStart());
		query.setMaxResults(pager.getLimit());
		pager.setTotalCount(scrollableResults.getRowNumber() + 1);
		return query.list();
	}

	public void getChildrenList(List parentitem, Integer orgid) {
		List childlist = null;
		try {
			childlist = findChildOrg(orgid.intValue());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (childlist != null && childlist.size() > 0) {
			for (int i = 0; i < childlist.size(); i++) {
				Org bean = (Org) childlist.get(i);
				parentitem.add(bean.getOrgId());
				getChildrenList(parentitem, bean.getOrgId());
			}
		}
	}

	/**
	 * 
	 * @param sql
	 * @return
	 */
	public Integer getCountRows(String sql) {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createSQLQuery(sql);
		Integer rows = (Integer) query.list().size();
		return rows;
	}

	/**
	 * <p>
	 * 描述：查询数据库中的记录总数
	 * </p>
	 * 
	 * @param sql
	 * @return
	 */
	public Integer getCountSQLRows(String sql) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		BigDecimal obj = (BigDecimal) query.uniqueResult();
		return obj.intValue();
	}
	
	public <T> List<T> getListAndTotalCountForPage(final Page pager, final String hql, final String allhql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		ScrollableResults scrollableResults = query.scroll(ScrollMode.SCROLL_SENSITIVE);
		scrollableResults.last();
		int totals = scrollableResults.getRowNumber()+1;
		pager.setTotalCount(totals);
		query.setFirstResult(pager.getStart());
		query.setMaxResults(pager.getLimit());
		List<T> list = query.list();
		return list;
	}

	public <T> List<T> getListAndTotalForPage(final Page pager, final String hql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		int total = query.list().size();
		pager.setTotalCount(total);
		query.setFirstResult(pager.getStart());
		query.setMaxResults(pager.getLimit());
		List<T> list = query.list();
		return list;
	}

	/**
	 * <p>
	 * 描述：获取记录数据库中的总记录数
	 * </p>
	 * 
	 * @param o
	 * @return
	 */
	public Long getListCountRows(final String o) {
		final String hql = "select count(*) from  " + o;
		Long result = null;
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		return (Long) query.uniqueResult();
	}

	protected <T> List<T> getListForPage(final Class<T> clazz, final Criterion[] criterions, final int offset, final int length) {
		Session session=getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(clazz);
		for (int i = 0; i < criterions.length; i++) {
			criteria.add(criterions[i]);
		}
		criteria.setFirstResult(offset);
		criteria.setMaxResults(length);
		return criteria.list();
	}
	
	public <T> List<T> getListForPage(final int offset, final int pageSize,final String hql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		query.setFirstResult(offset);
		query.setMaxResults(pageSize);
		List<T> list = query.list();
		return list;

	}

	public <T> List<T> getListForPage(final int offset, final int pageSize, final String hql, final List<KeyParameter> params) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		for (int i = 0; i < params.size(); i++) {
			KeyParameter p = params.get(i);
			if (p.getParamType().equalsIgnoreCase("String")) {
				query.setString(i, "%" + p.getStrParamValue() + "%");
			} else if (p.getParamType().equalsIgnoreCase("Integer")) {
				query.setInteger(i, p.getIntParamValue());
			} else if (p.getParamType().equalsIgnoreCase("Date")) {
				query.setDate(i, p.getDateParamValue());
			} else if (p.getParamType().equalsIgnoreCase("Timestamp")) {
				query.setTimestamp(i, p.getTimeParamValue());
			}
		}
		query.setFirstResult(offset - 1);
		query.setMaxResults(pageSize);
		List<T> list = query.list();
		return list;
	}

	/**
	 * @param offset
	 * @param pageSize
	 * @param pager
	 * @param hql
	 * @param o
	 *            出入当前的 实体类对象
	 * @return 返回分页后的数据集合
	 * @throws Exception
	 */
	public <T> List<T> getListForPage(final Page pager, final String hql, final String o) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		pager.setTotalCount(Integer.parseInt(getMaxCountValue(o) + ""));
		query.setFirstResult(pager.getStart());
		query.setMaxResults(pager.getLimit());
		List<T> list = query.list();
		return list;
	}

	public <T> List<T> getListForReportPage(final int offset, final int pageSize, final String hql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createSQLQuery(hql);
		query.setFirstResult(offset);
		query.setMaxResults(pageSize);
		List<T> list = query.list();
		return list;
	}

	/**
	 * <p>
	 * 描述：hql查询分页方法
	 * </p>
	 * 
	 * @param offset
	 *            数据偏移量
	 * @param pageSize
	 *            分页大小
	 * @param hql
	 *            查询语句
	 * @return
	 * @throws Exception
	 */
	public <T> List<T> getListPage(final int offset, final int pageSize, final String hql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createSQLQuery(hql);
		query.setFirstResult(offset);
		query.setMaxResults(pageSize);
		List<T> list = query.list();
		return list;
	}

	public Long getMaxCountValue(final String o) {
		Session session=getSessionFactory().getCurrentSession();
		final String hql = "select count(*) from " + o;
		Query query = session.createQuery(hql);
		return (Long) query.uniqueResult();
	}

	public <T> T getObject(Class<T> clazz, Serializable id) {
		return this.getHibernateTemplate().get(clazz, id);
	}

	
	
	public <T> List<T> getSqlToHqlOrgObjects(String sql) {
		Session session=getSessionFactory().getCurrentSession();
		return (List<T>) session.createSQLQuery(sql).addEntity("Org", Org.class).list();
	}

	
	public <T> List<T> getSQLObjects(final String sql) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		List list = query.list();
		return (List<T>) list;
	}

	public Integer getRecordCountRows(String hql) {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		Integer rows = (Integer) query.list().size();
		return rows;
	}

	/**
	 * <p>根据传入的SQL语句来分页查询List集合</p>
	 * 
	 * @param offset
	 * @param pageSize
	 * @param hql
	 * @return
	 * @throws Exception
	 */
	public <T> List<T> getSQLListForPage(final int offset, final int pageSize, final String hql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createSQLQuery(hql);
		query.setFirstResult(offset);
		query.setMaxResults(pageSize);
		List<T> list = query.list();
		return list;
	}

	/**
	 * <p>
	 * 描述：根据普通的sql来查询一个结果List集合
	 * </p>
	 * 
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	public <T> List<T> getSQLList(final String sql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createSQLQuery(sql);
		List<T> list = query.list();
		return list;
	}

	public Integer getTotalCountRows(String sql, final Object... values) {
		String allsql="";
		if(sql.trim().indexOf("count(1)")>0||sql.trim().indexOf("count(*)")>0){
			allsql=sql;
		}else{
			if(sql.indexOf("distinct")>0||sql.indexOf("group")>0){
				allsql = "select count(1)  from  (" + sql + ")";
			}else{
				String strarr[]=sql.split("from");
				if(strarr.length>1){
					allsql="select count(1) ";
					for(int i=1;i<strarr.length;i++){
						allsql+="from "+strarr[i];
					}
				}else{
					allsql = "select count(1)  from  (" + sql + ")";
				}
			}
		}
		Integer rows =0;
			SQLQuery query = getSessionFactory().getCurrentSession().createSQLQuery(allsql);
			for (int i = 0; i < values.length; i++) {
				values[i] = values[i].toString().replace("@", ",");
				query.setParameter(i, values[i]);
			}
			rows= Integer.parseInt(query.uniqueResult() + "");
		return rows;
	}

	public Long getTotalCountValue(final String o) {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(o);
		return (Long) query.uniqueResult();
	}

	public Integer getTotalSqlCountRows(String sql, final Object... values) {
		String allsql = "select count(*)  from  (" + sql + ")";
		Query query = getSessionFactory().getCurrentSession().createSQLQuery(allsql);
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
		List<BigDecimal> list = query.list();
		int count = list.get(0).intValue();
		return count;
	}

	/**
	 * @param orgId
	 * @return 递归取出当前组织Id下的所有Id字符串集合
	 */
	public String getUserOrgIds(int orgId) {
		List childOrgList = new ArrayList();
		String orgIds = orgId + ",";
		getChildrenList(childOrgList, orgId);
		for (int i = 0; i < childOrgList.size(); i++) {
			orgIds = orgIds + childOrgList.get(i) + ",";
		}
		orgIds = orgIds.substring(0, orgIds.length() - 1);
		return orgIds;
	}

	public <T> List<T> getWellListForPage(final int offset, final int pageSize, final String hql, final int orgId) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		query.setInteger("orgId", orgId);
		query.setFirstResult(offset);
		query.setMaxResults(pageSize);
		List<T> list = query.list();
		return list;
	}

	public Serializable insertObject(Object obj) {
		Session session=getSessionFactory().getCurrentSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			session.save(obj);
			tx.commit();
		} catch (Exception e) {
			tx.rollback();
			e.printStackTrace();
		}
		return null;
	}

	public Serializable modifyByObject(String hql) {
		Session session=getSessionFactory().getCurrentSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			Query query = session.createQuery(hql);
			query.executeUpdate();
			tx.commit();
		} catch (Exception e) {
			tx.rollback();
			e.printStackTrace();
		}
		return null;
	}

	public Serializable modifyObject(Object obj) {
		Session session=getSessionFactory().getCurrentSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			session.update(obj);
			tx.commit();
		} catch (Exception e) {
			tx.rollback();
			e.printStackTrace();
		}
		return null;
	}

	public List MonthJssj(final String sql) {
		Session session=getSessionFactory().getCurrentSession();
				Query query = session.createSQLQuery(sql);
				List list = query.list();
				return list;
	}

	public Integer queryProObjectTotals(String sql) throws SQLException {
		ResultSet rs = null;
		PreparedStatement ps = null;
		int total = 0;
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		try {
			ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			rs = ps.executeQuery();
			while (rs.next()) {
				total = rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			try {
				if(rs!=null){
					rs.close();
				}
				if(ps!=null){
					ps.close();
				}
				if(conn!=null){
					conn.close();
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return total;
	}

	/**
	 * 新增一个对象
	 * 
	 * @param object
	 */
	@Transactional
	public Serializable save(Object object) {
		return getSessionFactory().getCurrentSession().save(object);
	}

	public <T> void saveOrUpdateObject(T clazz) {
		this.getHibernateTemplate().saveOrUpdate(clazz);
	}

	public int updateOrDeleteBySql(String sql) throws SQLException{
		Connection conn=null;
		PreparedStatement ps=null;
		int result=0;
		try {
			conn = SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			ps=conn.prepareStatement(sql);
			result=ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			StringManagerUtils.printLog(sql);
		} finally{
			if(ps!=null){
				ps.close();
			}
			if(conn!=null){
				conn.close();
			}
		}
		
		return result;
	}
	
	@SuppressWarnings("resource")
	public List<WellHandsontableChangedData.Updatelist> saveRPCDeviceData(WellHandsontableChangedData wellHandsontableChangedData,String orgId,int deviceType,User user) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		PreparedStatement ps=null;
		List<String> initWellList=new ArrayList<String>();
		List<String> updateWellList=new ArrayList<String>();
		List<String> addWellList=new ArrayList<String>();
		List<String> deleteWellList=new ArrayList<String>();
		List<String> disableWellIdList=new ArrayList<String>();
		List<WellHandsontableChangedData.Updatelist> collisionList=new ArrayList<WellHandsontableChangedData.Updatelist>();
		
		License license=LicenseMap.getMapObject().get(LicenseMap.SN);
		try {
			cs = conn.prepareCall("{call prd_update_rpcdevice(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			if(wellHandsontableChangedData.getUpdatelist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getUpdatelist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getUpdatelist().get(i).getStatusName())){
							status=0;
							disableWellIdList.add(wellHandsontableChangedData.getUpdatelist().get(i).getId());
						}
						cs.setString(1, wellHandsontableChangedData.getUpdatelist().get(i).getId());
						cs.setString(2, wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getUpdatelist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getUpdatelist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getUpdatelist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getUpdatelist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getUpdatelist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getUpdatelist().get(i).getSlave());
						
						cs.setString(10, wellHandsontableChangedData.getUpdatelist().get(i).getVideoUrl());
						
						cs.setInt(11, status);
						
						cs.setString(12, wellHandsontableChangedData.getUpdatelist().get(i).getSortNum());
						cs.registerOutParameter(13, Types.INTEGER);
						cs.registerOutParameter(14,Types.VARCHAR);
						cs.executeUpdate();
						
						int saveSign=cs.getInt(13);
						String saveResultStr=cs.getString(14);
						wellHandsontableChangedData.getUpdatelist().get(i).setSaveSign(saveSign);
						wellHandsontableChangedData.getUpdatelist().get(i).setSaveStr(saveResultStr);
						collisionList.add(wellHandsontableChangedData.getUpdatelist().get(i));
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						}
					}
				}
			}
			if(wellHandsontableChangedData.getInsertlist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getInsertlist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getInsertlist().get(i).getStatusName())){
							status=0;
							disableWellIdList.add(wellHandsontableChangedData.getInsertlist().get(i).getId());
						}
						cs.setString(1, wellHandsontableChangedData.getInsertlist().get(i).getId());
						cs.setString(2, wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getInsertlist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getInsertlist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getInsertlist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getInsertlist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getInsertlist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getInsertlist().get(i).getSlave());
						
						cs.setString(10, wellHandsontableChangedData.getInsertlist().get(i).getVideoUrl());
						
						cs.setInt(11, status);
						
						cs.setString(12, wellHandsontableChangedData.getInsertlist().get(i).getSortNum());
						cs.registerOutParameter(13, Types.INTEGER);
						cs.registerOutParameter(14,Types.VARCHAR);
						cs.executeUpdate();
						
						int saveSign=cs.getInt(13);
						String saveResultStr=cs.getString(14);
						wellHandsontableChangedData.getInsertlist().get(i).setSaveSign(saveSign);
						wellHandsontableChangedData.getInsertlist().get(i).setSaveStr(saveResultStr);
						collisionList.add(wellHandsontableChangedData.getInsertlist().get(i));
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						}
					}
				}
			}
			if(disableWellIdList.size()>0){
				EquipmentDriverServerTask.initRPCDriverAcquisitionInfoConfigById(disableWellIdList,"delete");
			}
			if(wellHandsontableChangedData.getDelidslist()!=null&&wellHandsontableChangedData.getDelidslist().size()>0){
				String delIds="";
				String delSql="";
				String queryDeleteWellSql="";
				for(int i=0;i<wellHandsontableChangedData.getDelidslist().size();i++){
					delIds+=wellHandsontableChangedData.getDelidslist().get(i);
					if(i<wellHandsontableChangedData.getDelidslist().size()-1){
						delIds+=",";
					}
				}
				queryDeleteWellSql="select wellname from tbl_rpcdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+")"
						+ " and t.orgid in("+orgId+")";
				delSql="delete from tbl_rpcdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+") "
						+ " and t.orgid in("+orgId+")";
				List<?> list = this.findCallSql(queryDeleteWellSql);
				for(int i=0;i<list.size();i++){
					deleteWellList.add(list.get(i)+"");
				}
				if(deleteWellList.size()>0){
					EquipmentDriverServerTask.initRPCDriverAcquisitionInfoConfigById(wellHandsontableChangedData.getDelidslist(),"delete");
				}
				ps=conn.prepareStatement(delSql);
				int result=ps.executeUpdate();
			}
			saveDeviceOperationLog(updateWellList,addWellList,deleteWellList,deviceType,user);
			
			if(initWellList.size()>0){
				EquipmentDriverServerTask.initRPCDriverAcquisitionInfoConfig(initWellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(ps!=null){
				ps.close();
			}
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return collisionList;
	}
	
	@SuppressWarnings("resource")
	public List<WellHandsontableChangedData.Updatelist> batchAddRPCDevice(WellHandsontableChangedData wellHandsontableChangedData,String orgId,int deviceType,String isCheckout,User user) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		PreparedStatement ps=null;
		List<String> initWellList=new ArrayList<String>();
		List<String> updateWellList=new ArrayList<String>();
		List<String> addWellList=new ArrayList<String>();
		List<String> deleteWellList=new ArrayList<String>();
		List<String> disableWellIdList=new ArrayList<String>();
		List<WellHandsontableChangedData.Updatelist> collisionList=new ArrayList<WellHandsontableChangedData.Updatelist>();
		
//		License license=LicenseMap.getMapObject().get(LicenseMap.SN);
		try {
			cs = conn.prepareCall("{call prd_save_rpcdevice(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			if(wellHandsontableChangedData.getUpdatelist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getUpdatelist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getUpdatelist().get(i).getStatusName())){
							status=0;
						}
						cs.setString(1, orgId);
						cs.setString(2, wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getUpdatelist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getUpdatelist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getUpdatelist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getUpdatelist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getUpdatelist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getUpdatelist().get(i).getSlave());
						cs.setString(10, wellHandsontableChangedData.getUpdatelist().get(i).getVideoUrl());
						cs.setInt(11, status);
						
						cs.setString(12, wellHandsontableChangedData.getUpdatelist().get(i).getSortNum());
						cs.setInt(13, StringManagerUtils.stringToInteger(isCheckout));
						cs.registerOutParameter(14, Types.INTEGER);
						cs.registerOutParameter(15,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(14);
						String saveResultStr=cs.getString(15);
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						}else{//保存失败，数据冲突或者超出限制
							wellHandsontableChangedData.getUpdatelist().get(i).setSaveSign(saveSign);
							wellHandsontableChangedData.getUpdatelist().get(i).setSaveStr(saveResultStr);
							collisionList.add(wellHandsontableChangedData.getUpdatelist().get(i));
						}
					}
				}
			}
			if(wellHandsontableChangedData.getInsertlist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getInsertlist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getInsertlist().get(i).getStatusName())){
							status=0;
						}
						cs.setString(1, orgId);
						cs.setString(2, wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getInsertlist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getInsertlist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getInsertlist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getInsertlist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getInsertlist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getInsertlist().get(i).getSlave());
						cs.setString(10, wellHandsontableChangedData.getInsertlist().get(i).getVideoUrl());
						cs.setInt(11, status);
						
						cs.setString(12, wellHandsontableChangedData.getInsertlist().get(i).getSortNum());
						cs.setInt(13, StringManagerUtils.stringToInteger(isCheckout));
						cs.registerOutParameter(14, Types.INTEGER);
						cs.registerOutParameter(15,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(14);
						String saveResultStr=cs.getString(15);
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						}else{
							wellHandsontableChangedData.getInsertlist().get(i).setSaveSign(saveSign);
							wellHandsontableChangedData.getInsertlist().get(i).setSaveStr(saveResultStr);
							collisionList.add(wellHandsontableChangedData.getInsertlist().get(i));
						}
					}
				}
			}
			if(wellHandsontableChangedData.getDelidslist()!=null&&wellHandsontableChangedData.getDelidslist().size()>0){
				String delIds="";
				String delSql="";
				String queryDeleteWellSql="";
				for(int i=0;i<wellHandsontableChangedData.getDelidslist().size();i++){
					delIds+=wellHandsontableChangedData.getDelidslist().get(i);
					if(i<wellHandsontableChangedData.getDelidslist().size()-1){
						delIds+=",";
					}
				}
				queryDeleteWellSql="select wellname from tbl_rpcdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+")"
						+ " and t.orgid in("+orgId+")";
				delSql="delete from tbl_rpcdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+") "
						+ " and t.orgid in("+orgId+")";
				List<?> list = this.findCallSql(queryDeleteWellSql);
				for(int i=0;i<list.size();i++){
					deleteWellList.add(list.get(i)+"");
				}
				ps=conn.prepareStatement(delSql);
				int result=ps.executeUpdate();
			}
			saveDeviceOperationLog(updateWellList,addWellList,deleteWellList,deviceType,user);
			
			if(initWellList.size()>0){
				EquipmentDriverServerTask.initRPCDriverAcquisitionInfoConfig(initWellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(ps!=null){
				ps.close();
			}
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return collisionList;
	}
	
	@SuppressWarnings("resource")
	public List<WellHandsontableChangedData.Updatelist> savePCPDeviceData(WellHandsontableChangedData wellHandsontableChangedData,String orgId,int deviceType,User user) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		PreparedStatement ps=null;
		List<String> initWellList=new ArrayList<String>();
		List<String> updateWellList=new ArrayList<String>();
		List<String> addWellList=new ArrayList<String>();
		List<String> deleteWellList=new ArrayList<String>();
		List<String> disableWellIdList=new ArrayList<String>();
		List<WellHandsontableChangedData.Updatelist> collisionList=new ArrayList<WellHandsontableChangedData.Updatelist>();
		
		License license=LicenseMap.getMapObject().get(LicenseMap.SN);
		try {
			cs = conn.prepareCall("{call prd_update_pcpdevice(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			if(wellHandsontableChangedData.getUpdatelist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getUpdatelist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getUpdatelist().get(i).getStatusName())){
							status=0;
							disableWellIdList.add(wellHandsontableChangedData.getUpdatelist().get(i).getId());
						}
						cs.setString(1, wellHandsontableChangedData.getUpdatelist().get(i).getId());
						cs.setString(2, wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getUpdatelist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getUpdatelist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getUpdatelist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getUpdatelist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getUpdatelist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getUpdatelist().get(i).getSlave());
						
						cs.setString(10, wellHandsontableChangedData.getUpdatelist().get(i).getVideoUrl());
						
						cs.setInt(11, status);
						
						cs.setString(12, wellHandsontableChangedData.getUpdatelist().get(i).getSortNum());
						cs.registerOutParameter(13, Types.INTEGER);
						cs.registerOutParameter(14,Types.VARCHAR);
						cs.executeUpdate();
						
						int saveSign=cs.getInt(13);
						String saveResultStr=cs.getString(14);
						wellHandsontableChangedData.getUpdatelist().get(i).setSaveSign(saveSign);
						wellHandsontableChangedData.getUpdatelist().get(i).setSaveStr(saveResultStr);
						collisionList.add(wellHandsontableChangedData.getUpdatelist().get(i));
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						}
					}
				}
			}
			if(wellHandsontableChangedData.getInsertlist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getInsertlist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getInsertlist().get(i).getStatusName())){
							status=0;
							disableWellIdList.add(wellHandsontableChangedData.getInsertlist().get(i).getId());
						}
						cs.setString(1, wellHandsontableChangedData.getInsertlist().get(i).getId());
						cs.setString(2, wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getInsertlist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getInsertlist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getInsertlist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getInsertlist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getInsertlist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getInsertlist().get(i).getSlave());
						
						cs.setString(10, wellHandsontableChangedData.getInsertlist().get(i).getVideoUrl());
						
						cs.setInt(11, status);
						
						cs.setString(12, wellHandsontableChangedData.getInsertlist().get(i).getSortNum());
						cs.registerOutParameter(13, Types.INTEGER);
						cs.registerOutParameter(14,Types.VARCHAR);
						cs.executeUpdate();
						
						int saveSign=cs.getInt(13);
						String saveResultStr=cs.getString(14);
						wellHandsontableChangedData.getInsertlist().get(i).setSaveSign(saveSign);
						wellHandsontableChangedData.getInsertlist().get(i).setSaveStr(saveResultStr);
						collisionList.add(wellHandsontableChangedData.getInsertlist().get(i));
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						}
					}
				}
			}
			if(disableWellIdList.size()>0){
				EquipmentDriverServerTask.initPCPDriverAcquisitionInfoConfigById(disableWellIdList,"delete");
			}
			if(wellHandsontableChangedData.getDelidslist()!=null&&wellHandsontableChangedData.getDelidslist().size()>0){
				String delIds="";
				String delSql="";
				String queryDeleteWellSql="";
				for(int i=0;i<wellHandsontableChangedData.getDelidslist().size();i++){
					delIds+=wellHandsontableChangedData.getDelidslist().get(i);
					if(i<wellHandsontableChangedData.getDelidslist().size()-1){
						delIds+=",";
					}
				}
				queryDeleteWellSql="select wellname from tbl_pcpdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+")"
						+ " and t.orgid in("+orgId+")";
				delSql="delete from tbl_pcpdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+") "
						+ " and t.orgid in("+orgId+")";
				List<?> list = this.findCallSql(queryDeleteWellSql);
				for(int i=0;i<list.size();i++){
					deleteWellList.add(list.get(i)+"");
				}
				if(deleteWellList.size()>0){
					EquipmentDriverServerTask.initPCPDriverAcquisitionInfoConfigById(wellHandsontableChangedData.getDelidslist(),"delete");
				}
				ps=conn.prepareStatement(delSql);
				int result=ps.executeUpdate();
			}
			saveDeviceOperationLog(updateWellList,addWellList,deleteWellList,deviceType,user);
			
			if(initWellList.size()>0){
				EquipmentDriverServerTask.initPCPDriverAcquisitionInfoConfig(initWellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(ps!=null){
				ps.close();
			}
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return collisionList;
	}
	
	@SuppressWarnings("resource")
	public List<WellHandsontableChangedData.Updatelist> batchAddPCPDevice(WellHandsontableChangedData wellHandsontableChangedData,String orgId,int deviceType,String isCheckout,User user) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		PreparedStatement ps=null;
		List<String> initWellList=new ArrayList<String>();
		List<String> updateWellList=new ArrayList<String>();
		List<String> addWellList=new ArrayList<String>();
		List<String> deleteWellList=new ArrayList<String>();
		List<String> disableWellIdList=new ArrayList<String>();
		List<WellHandsontableChangedData.Updatelist> collisionList=new ArrayList<WellHandsontableChangedData.Updatelist>();
//		License license=LicenseMap.getMapObject().get(LicenseMap.SN);
		try {
			cs = conn.prepareCall("{call prd_save_pcpdevice(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			if(wellHandsontableChangedData.getUpdatelist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getUpdatelist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getUpdatelist().get(i).getStatusName())){
							status=0;
						}
						cs.setString(1, orgId);
						cs.setString(2, wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getUpdatelist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getUpdatelist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getUpdatelist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getUpdatelist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getUpdatelist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getUpdatelist().get(i).getSlave());
						
						cs.setString(10, wellHandsontableChangedData.getUpdatelist().get(i).getVideoUrl());
						cs.setInt(11, status);
						cs.setString(12, wellHandsontableChangedData.getUpdatelist().get(i).getSortNum());
						cs.setInt(13, StringManagerUtils.stringToInteger(isCheckout));
						cs.registerOutParameter(14, Types.INTEGER);
						cs.registerOutParameter(15,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(14);
						String saveResultStr=cs.getString(15);
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						}else{//保存失败，数据冲突或者超出限制
							wellHandsontableChangedData.getUpdatelist().get(i).setSaveSign(saveSign);
							wellHandsontableChangedData.getUpdatelist().get(i).setSaveStr(saveResultStr);
							collisionList.add(wellHandsontableChangedData.getUpdatelist().get(i));
						}
					}
				}
			}
			if(wellHandsontableChangedData.getInsertlist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getInsertlist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getWellName())){
						int status=1;
						if("失效".equalsIgnoreCase(wellHandsontableChangedData.getInsertlist().get(i).getStatusName())){
							status=0;
						}
						cs.setString(1, orgId);
						cs.setString(2, wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						cs.setString(3, deviceType+"");
						cs.setString(4, wellHandsontableChangedData.getInsertlist().get(i).getApplicationScenariosName());
						cs.setString(5, wellHandsontableChangedData.getInsertlist().get(i).getInstanceName());
						cs.setString(6, wellHandsontableChangedData.getInsertlist().get(i).getDisplayInstanceName());
						cs.setString(7, wellHandsontableChangedData.getInsertlist().get(i).getAlarmInstanceName());
						cs.setString(8, wellHandsontableChangedData.getInsertlist().get(i).getSignInId());
						cs.setString(9, wellHandsontableChangedData.getInsertlist().get(i).getSlave());
						
						cs.setString(10, wellHandsontableChangedData.getInsertlist().get(i).getVideoUrl());
						cs.setInt(11, status);
						cs.setString(12, wellHandsontableChangedData.getInsertlist().get(i).getSortNum());
						cs.setInt(13, StringManagerUtils.stringToInteger(isCheckout));
						cs.registerOutParameter(14, Types.INTEGER);
						cs.registerOutParameter(15,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(14);
						String saveResultStr=cs.getString(15);
						
						if(saveSign==0||saveSign==1){//保存成功
							if(saveSign==0){//添加
								addWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}else if(saveSign==1){//更新
								updateWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
							}
							initWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						}else{
							wellHandsontableChangedData.getInsertlist().get(i).setSaveSign(saveSign);
							wellHandsontableChangedData.getInsertlist().get(i).setSaveStr(saveResultStr);
							collisionList.add(wellHandsontableChangedData.getInsertlist().get(i));
						}
					}
				}
			}
			if(wellHandsontableChangedData.getDelidslist()!=null&&wellHandsontableChangedData.getDelidslist().size()>0){
				String delIds="";
				String delSql="";
				String queryDeleteWellSql="";
				for(int i=0;i<wellHandsontableChangedData.getDelidslist().size();i++){
					delIds+=wellHandsontableChangedData.getDelidslist().get(i);
					if(i<wellHandsontableChangedData.getDelidslist().size()-1){
						delIds+=",";
					}
				}
				queryDeleteWellSql="select wellname from tbl_pcpdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+")"
						+ " and t.orgid in("+orgId+")";
				delSql="delete from tbl_pcpdevice t "
						+ " where t.devicetype="+deviceType+" "
						+ " and t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+") "
						+ " and t.orgid in("+orgId+")";
				List<?> list = this.findCallSql(queryDeleteWellSql);
				for(int i=0;i<list.size();i++){
					deleteWellList.add(list.get(i)+"");
				}
				ps=conn.prepareStatement(delSql);
				int result=ps.executeUpdate();
			}
			saveDeviceOperationLog(updateWellList,addWellList,deleteWellList,deviceType,user);
			
			if(initWellList.size()>0){
				EquipmentDriverServerTask.initPCPDriverAcquisitionInfoConfig(initWellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(ps!=null){
				ps.close();
			}
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return collisionList;
	}
	
	@SuppressWarnings("resource")
	public Boolean saveSMSDeviceData(WellHandsontableChangedData wellHandsontableChangedData,String orgId,int deviceType,User user) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		PreparedStatement ps=null;
		List<String> initWellList=new ArrayList<String>();
		List<String> updateWellList=new ArrayList<String>();
		List<String> addWellList=new ArrayList<String>();
		List<String> deleteWellList=new ArrayList<String>();
		try {
			cs = conn.prepareCall("{call prd_update_smsdevice(?,?,?,?,?)}");
			if(wellHandsontableChangedData.getUpdatelist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getUpdatelist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getWellName())){
						cs.setString(1, wellHandsontableChangedData.getUpdatelist().get(i).getId());
						cs.setString(2, wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						cs.setString(3, wellHandsontableChangedData.getUpdatelist().get(i).getInstanceName());
						cs.setString(4, wellHandsontableChangedData.getUpdatelist().get(i).getSignInId());
						cs.setString(5, wellHandsontableChangedData.getUpdatelist().get(i).getSortNum());
						cs.executeUpdate();
						updateWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getWellName())
								&&StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getSignInId())
								&&StringManagerUtils.isNotNull(wellHandsontableChangedData.getUpdatelist().get(i).getInstanceName()) 
								){
							initWellList.add(wellHandsontableChangedData.getUpdatelist().get(i).getWellName());
						}
					}
				}
			}
			if(wellHandsontableChangedData.getInsertlist()!=null){
				for(int i=0;i<wellHandsontableChangedData.getInsertlist().size();i++){
					if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getWellName())){
						cs.setString(1, wellHandsontableChangedData.getInsertlist().get(i).getId());
						cs.setString(2, wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						cs.setString(3, wellHandsontableChangedData.getInsertlist().get(i).getInstanceName());
						cs.setString(4, wellHandsontableChangedData.getInsertlist().get(i).getSignInId());
						cs.setString(5, wellHandsontableChangedData.getInsertlist().get(i).getSortNum());
						cs.executeUpdate();
						addWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						if(StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getWellName())
								&&StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getSignInId()) 
								&&StringManagerUtils.isNotNull(wellHandsontableChangedData.getInsertlist().get(i).getInstanceName()) 
								){
							initWellList.add(wellHandsontableChangedData.getInsertlist().get(i).getWellName());
						}
					}
				}
			}
			if(wellHandsontableChangedData.getDelidslist()!=null&&wellHandsontableChangedData.getDelidslist().size()>0){
				String delIds="";
				String delSql="";
				String queryDeleteWellSql="";
				for(int i=0;i<wellHandsontableChangedData.getDelidslist().size();i++){
					delIds+=wellHandsontableChangedData.getDelidslist().get(i);
					if(i<wellHandsontableChangedData.getDelidslist().size()-1){
						delIds+=",";
					}
				}
				queryDeleteWellSql="select wellname from tbl_smsdevice t "
						+ " where  t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+")"
						+ " and t.orgid in("+orgId+")";
				delSql="delete from tbl_smsdevice t "
						+ " where t.id in ("+StringUtils.join(wellHandsontableChangedData.getDelidslist(), ",")+") "
						+ " and t.orgid in("+orgId+")";
				List<?> list = this.findCallSql(queryDeleteWellSql);
				for(int i=0;i<list.size();i++){
					deleteWellList.add(list.get(i)+"");
				}
				
				
				ps=conn.prepareStatement(delSql);
				int result=ps.executeUpdate();
			}
			saveDeviceOperationLog(updateWellList,addWellList,deleteWellList,300,user);
			
			if(initWellList.size()>0){
				EquipmentDriverServerTask.initSMSDevice(initWellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(ps!=null){
				ps.close();
			}
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}
	
	@SuppressWarnings("resource")
	public List<PumpingModelHandsontableChangedData.Updatelist> savePumpingModelHandsontableData(PumpingModelHandsontableChangedData pumpingModelHandsontableChangedData) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		PreparedStatement ps=null;
		List<PumpingModelHandsontableChangedData.Updatelist> collisionList=new ArrayList<PumpingModelHandsontableChangedData.Updatelist>();
		try {
			cs = conn.prepareCall("{call prd_update_pumpingmodel(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			if(pumpingModelHandsontableChangedData.getUpdatelist()!=null){
				for(int i=0;i<pumpingModelHandsontableChangedData.getUpdatelist().size();i++){
					if(StringManagerUtils.isNotNull(pumpingModelHandsontableChangedData.getUpdatelist().get(i).getManufacturer())){
						cs.setString(1, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getId());
						cs.setString(2, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getManufacturer());
						cs.setString(3, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getModel());
						cs.setString(4, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getStroke());
						cs.setString(5, "顺时针".equals(pumpingModelHandsontableChangedData.getUpdatelist().get(i).getCrankRotationDirection())?"Clockwise":"Anticlockwise");
						cs.setString(6, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getOffsetAngleOfCrank());
						cs.setString(7, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getCrankGravityRadius());
						cs.setString(8, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getSingleCrankWeight());
						cs.setString(9, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getSingleCrankPinWeight());
						cs.setString(10, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getStructuralUnbalance());
						cs.setString(11, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getBalanceWeight());
						cs.registerOutParameter(12, Types.INTEGER);
						cs.registerOutParameter(13,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(12);
						String saveResultStr=cs.getString(13);
						pumpingModelHandsontableChangedData.getUpdatelist().get(i).setSaveSign(saveSign);
						pumpingModelHandsontableChangedData.getUpdatelist().get(i).setSaveStr(saveResultStr);
						collisionList.add(pumpingModelHandsontableChangedData.getUpdatelist().get(i));
					}
				}
			}
			if(pumpingModelHandsontableChangedData.getInsertlist()!=null){
				for(int i=0;i<pumpingModelHandsontableChangedData.getInsertlist().size();i++){
					if(StringManagerUtils.isNotNull(pumpingModelHandsontableChangedData.getInsertlist().get(i).getManufacturer())){
						cs.setString(1, pumpingModelHandsontableChangedData.getInsertlist().get(i).getId());
						cs.setString(2, pumpingModelHandsontableChangedData.getInsertlist().get(i).getManufacturer());
						cs.setString(3, pumpingModelHandsontableChangedData.getInsertlist().get(i).getModel());
						cs.setString(4, pumpingModelHandsontableChangedData.getInsertlist().get(i).getStroke());
						cs.setString(5, "顺时针".equals(pumpingModelHandsontableChangedData.getInsertlist().get(i).getCrankRotationDirection())?"Clockwise":"Anticlockwise");
						cs.setString(6, pumpingModelHandsontableChangedData.getInsertlist().get(i).getOffsetAngleOfCrank());
						cs.setString(7, pumpingModelHandsontableChangedData.getInsertlist().get(i).getCrankGravityRadius());
						cs.setString(8, pumpingModelHandsontableChangedData.getInsertlist().get(i).getSingleCrankWeight());
						cs.setString(9, pumpingModelHandsontableChangedData.getInsertlist().get(i).getSingleCrankPinWeight());
						cs.setString(10, pumpingModelHandsontableChangedData.getInsertlist().get(i).getStructuralUnbalance());
						cs.setString(11, pumpingModelHandsontableChangedData.getInsertlist().get(i).getBalanceWeight());
						cs.registerOutParameter(12, Types.INTEGER);
						cs.registerOutParameter(13,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(12);
						String saveResultStr=cs.getString(13);
						pumpingModelHandsontableChangedData.getInsertlist().get(i).setSaveSign(saveSign);
						pumpingModelHandsontableChangedData.getInsertlist().get(i).setSaveStr(saveResultStr);
						collisionList.add(pumpingModelHandsontableChangedData.getInsertlist().get(i));
					}
				}
			}
			if(pumpingModelHandsontableChangedData.getDelidslist()!=null){
				String delSql="delete from tbl_pumpingmodel t where t.id in ("+StringUtils.join(pumpingModelHandsontableChangedData.getDelidslist(), ",")+")";
				ps=conn.prepareStatement(delSql);
				int result=ps.executeUpdate();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(ps!=null){
				ps.close();
			}
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return collisionList;
	}
	
	@SuppressWarnings("resource")
	public List<PumpingModelHandsontableChangedData.Updatelist> batchAddPumpingModel(PumpingModelHandsontableChangedData pumpingModelHandsontableChangedData,int isCheckout) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		PreparedStatement ps=null;
		List<PumpingModelHandsontableChangedData.Updatelist> collisionList=new ArrayList<PumpingModelHandsontableChangedData.Updatelist>();
		try {
			cs = conn.prepareCall("{call prd_save_pumpingmodel(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			if(pumpingModelHandsontableChangedData.getUpdatelist()!=null){
				for(int i=0;i<pumpingModelHandsontableChangedData.getUpdatelist().size();i++){
					if(StringManagerUtils.isNotNull(pumpingModelHandsontableChangedData.getUpdatelist().get(i).getManufacturer())){
						cs.setString(1, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getManufacturer());
						cs.setString(2, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getModel());
						cs.setString(3, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getStroke());
						cs.setString(4, "顺时针".equals(pumpingModelHandsontableChangedData.getUpdatelist().get(i).getCrankRotationDirection())?"Clockwise":"Anticlockwise");
						cs.setString(5, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getOffsetAngleOfCrank());
						cs.setString(6, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getCrankGravityRadius());
						cs.setString(7, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getSingleCrankWeight());
						cs.setString(8, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getSingleCrankPinWeight());
						cs.setString(9, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getStructuralUnbalance());
						cs.setString(10, pumpingModelHandsontableChangedData.getUpdatelist().get(i).getBalanceWeight());
						cs.setInt(11, isCheckout);
						cs.registerOutParameter(12, Types.INTEGER);
						cs.registerOutParameter(13,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(12);
						String saveResultStr=cs.getString(13);
						if(saveSign!=0&&saveSign!=1){
							pumpingModelHandsontableChangedData.getUpdatelist().get(i).setSaveSign(saveSign);
							pumpingModelHandsontableChangedData.getUpdatelist().get(i).setSaveStr(saveResultStr);
							collisionList.add(pumpingModelHandsontableChangedData.getUpdatelist().get(i));
						}
					}
				}
			}
			if(pumpingModelHandsontableChangedData.getInsertlist()!=null){
				for(int i=0;i<pumpingModelHandsontableChangedData.getInsertlist().size();i++){
					if(StringManagerUtils.isNotNull(pumpingModelHandsontableChangedData.getInsertlist().get(i).getManufacturer())){
						cs.setString(1, pumpingModelHandsontableChangedData.getInsertlist().get(i).getManufacturer());
						cs.setString(2, pumpingModelHandsontableChangedData.getInsertlist().get(i).getModel());
						cs.setString(3, pumpingModelHandsontableChangedData.getInsertlist().get(i).getStroke());
						cs.setString(4, "顺时针".equals(pumpingModelHandsontableChangedData.getInsertlist().get(i).getCrankRotationDirection())?"Clockwise":"Anticlockwise");
						cs.setString(5, pumpingModelHandsontableChangedData.getInsertlist().get(i).getOffsetAngleOfCrank());
						cs.setString(6, pumpingModelHandsontableChangedData.getInsertlist().get(i).getCrankGravityRadius());
						cs.setString(7, pumpingModelHandsontableChangedData.getInsertlist().get(i).getSingleCrankWeight());
						cs.setString(8, pumpingModelHandsontableChangedData.getInsertlist().get(i).getSingleCrankPinWeight());
						cs.setString(9, pumpingModelHandsontableChangedData.getInsertlist().get(i).getStructuralUnbalance());
						cs.setString(10, pumpingModelHandsontableChangedData.getInsertlist().get(i).getBalanceWeight());
						cs.setInt(11, isCheckout);
						cs.registerOutParameter(12, Types.INTEGER);
						cs.registerOutParameter(13,Types.VARCHAR);
						cs.executeUpdate();
						int saveSign=cs.getInt(12);
						String saveResultStr=cs.getString(13);
						if(saveSign!=0&&saveSign!=1){
							pumpingModelHandsontableChangedData.getInsertlist().get(i).setSaveSign(saveSign);
							pumpingModelHandsontableChangedData.getInsertlist().get(i).setSaveStr(saveResultStr);
							collisionList.add(pumpingModelHandsontableChangedData.getInsertlist().get(i));
						}
					}
				}
			}
			if(pumpingModelHandsontableChangedData.getDelidslist()!=null){
				String delSql="delete from tbl_pumpingmodel t where t.id in ("+StringUtils.join(pumpingModelHandsontableChangedData.getDelidslist(), ",")+")";
				ps=conn.prepareStatement(delSql);
				int result=ps.executeUpdate();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(ps!=null){
				ps.close();
			}
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return collisionList;
	}
	
	public boolean saveDeviceOperationLog(List<String> updateWellList,List<String> addWellList,List<String> deleteWellList,int deviceType,User user) throws SQLException{
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		try {
			cs = conn.prepareCall("{call prd_save_deviceOperationLog(?,?,?,?,?,?,?)}");
			String currentTiem=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
			for(int i=0;addWellList!=null && i<addWellList.size();i++){
				cs.setString(1, currentTiem);
				cs.setString(2, addWellList.get(i));
				cs.setInt(3, deviceType);
				cs.setInt(4, 0);
				cs.setString(5, user.getUserId());
				cs.setString(6, user.getLoginIp());
				cs.setString(7, "");
				cs.executeUpdate();
			}
			for(int i=0;updateWellList!=null && i<updateWellList.size();i++){
				cs.setString(1, currentTiem);
				cs.setString(2, updateWellList.get(i));
				cs.setInt(3, deviceType);
				cs.setInt(4, 1);
				cs.setString(5, user.getUserId());
				cs.setString(6, user.getLoginIp());
				cs.setString(7, "");
				cs.executeUpdate();
			}
			for(int i=0;deleteWellList!=null && i<deleteWellList.size();i++){
				cs.setString(1, currentTiem);
				cs.setString(2, deleteWellList.get(i));
				cs.setInt(3, deviceType);
				cs.setInt(4, 2);
				cs.setString(5, user.getUserId());
				cs.setString(6, user.getLoginIp());
				cs.setString(7, "");
				cs.executeUpdate();
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}finally{
			
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}
	
	
	public boolean saveDeviceControlLog(String deviceId,String wellName,String deviceType,String title,String value,User user) throws SQLException{
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		try {
			cs = conn.prepareCall("{call prd_save_deviceOperationLog(?,?,?,?,?,?,?)}");
			String currentTiem=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
			cs.setString(1, currentTiem);
			cs.setString(2, wellName);
			cs.setInt(3, StringManagerUtils.stringToInteger(deviceType));
			cs.setInt(4, 3);
			cs.setString(5, user.getUserId());
			cs.setString(6, user.getLoginIp());
			cs.setString(7, "控制项:"+title+",写入值:"+value);
			cs.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}finally{
			
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}
	
	public boolean saveSystemLog(User user) throws SQLException{
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		try {
			cs = conn.prepareCall("{call prd_save_systemLog(?,?,?,?,?)}");
			String currentTiem=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
			cs.setString(1, currentTiem);
			cs.setInt(2, 0);
			cs.setString(3, user.getUserId());
			cs.setString(4, user.getLoginIp());
			cs.setString(5, "用户登录");
			cs.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}finally{
			
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}
	
	
	
	public Boolean editRPCDeviceName(String oldWellName,String newWellName,String orgid) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		try {
			cs = conn.prepareCall("{call prd_change_rpcdevicename(?,?,?)}");
			cs.setString(1,oldWellName);
			cs.setString(2, newWellName);
			cs.setString(3, orgid);
			cs.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}
	
	public Boolean editPCPDeviceName(String oldWellName,String newWellName,String orgid) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		try {
			cs = conn.prepareCall("{call prd_change_pcpdevicename(?,?,?)}");
			cs.setString(1,oldWellName);
			cs.setString(2, newWellName);
			cs.setString(3, orgid);
			cs.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}
	
	public Boolean editSMSDeviceName(String oldWellName,String newWellName,String orgid) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		try {
			cs = conn.prepareCall("{call prd_change_smsdevicename(?,?,?)}");
			cs.setString(1,oldWellName);
			cs.setString(2, newWellName);
			cs.setString(3, orgid);
			cs.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}

	/**
	 * 注入sessionFactory
	 */
	@Resource(name = "sessionFactory")
	public void setSuperSessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}

	public int updatealarmmessage(final String sql) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		return query.executeUpdate();

	}

	public int updateBySQL(final String sql, final List pl) throws Exception {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		if (pl != null && !pl.isEmpty()) {
			for (int i = 0; i < pl.size(); i++) {
				query.setParameter(i, pl.get(i));
			}
			return query.executeUpdate();
		}
		return 0;
	}

	/**
	 * 跟新当前传入的数据信息
	 * 
	 * @author ding
	 * @param sql
	 * @return 
	 */
	public Object updateObject(final String sql) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		return query.executeUpdate();
	}

	/**
	 * <p>
	 * 更新当前对象的数据信息
	 * </p>
	 * 
	 * @author gao 2014-06-04
	 * @param clazz
	 *            传入的对象
	 */
	public <T> void updateObject(T clazz) {
		this.getHibernateTemplate().update(clazz);
	}

	public int updateWellorder(final String hql) {
		Session session=getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(hql);
		return query.executeUpdate();
	}

	public void callProcedureByCallName() {
		String callName = "{Call proc_test(?,?)}";
		ResultSet rs = null;
		CallableStatement call=null;
		Connection conn=null;
		try {
			conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			call=conn.prepareCall(callName);
			call.setString(1, "");
			call.registerOutParameter(2, Types.VARCHAR);
			rs = call.executeQuery();
		}catch (HibernateException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				if(rs!=null){
					rs.close();
				}
				if(call!=null){
					call.close();
				}
				if(conn!=null){
					conn.close();
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public Boolean setAlarmColor(AlarmShowStyle alarmShowStyle) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		try {
			cs = conn.prepareCall("{call prd_save_alarmcolor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			cs.setString(1, alarmShowStyle.getData().getNormal().getBackgroundColor());
			cs.setString(2, alarmShowStyle.getData().getFirstLevel().getBackgroundColor());
			cs.setString(3, alarmShowStyle.getData().getSecondLevel().getBackgroundColor());
			cs.setString(4, alarmShowStyle.getData().getThirdLevel().getBackgroundColor());
			cs.setString(5, alarmShowStyle.getData().getNormal().getColor());
			cs.setString(6, alarmShowStyle.getData().getFirstLevel().getColor());
			cs.setString(7, alarmShowStyle.getData().getSecondLevel().getColor());
			cs.setString(8, alarmShowStyle.getData().getThirdLevel().getColor());
			cs.setString(9, alarmShowStyle.getData().getNormal().getOpacity());
			cs.setString(10, alarmShowStyle.getData().getFirstLevel().getOpacity());
			cs.setString(11, alarmShowStyle.getData().getSecondLevel().getOpacity());
			cs.setString(12, alarmShowStyle.getData().getThirdLevel().getOpacity());
			
			cs.setString(13, alarmShowStyle.getComm().getOnline().getBackgroundColor());
			cs.setString(14, alarmShowStyle.getComm().getOffline().getBackgroundColor());
			cs.setString(15, alarmShowStyle.getComm().getOnline().getColor());
			cs.setString(16, alarmShowStyle.getComm().getOffline().getColor());
			cs.setString(17, alarmShowStyle.getComm().getOnline().getOpacity());
			cs.setString(18, alarmShowStyle.getComm().getOffline().getOpacity());
			cs.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(cs!=null){
				cs.close();
			}
			conn.close();
		}
		return true;
	}
	public Boolean saveRPCAlarmInfo(String wellName,String deviceType,String acqTime,List<AcquisitionItemInfo> acquisitionItemInfoList) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		
		try {
			cs = conn.prepareCall("{call prd_save_rpcalarminfo(?,?,?,?,?,?,?,?,?,?,?,?)}");
			for(int i=0;i<acquisitionItemInfoList.size();i++){
				if(acquisitionItemInfoList.get(i).getAlarmLevel()>0){
					cs.setString(1, wellName);
					cs.setString(2, deviceType);
					cs.setString(3, acqTime);
					cs.setString(4, acquisitionItemInfoList.get(i).getTitle());
					cs.setInt(5, acquisitionItemInfoList.get(i).getAlarmType());
					cs.setString(6, acquisitionItemInfoList.get(i).getRawValue());
					cs.setString(7, acquisitionItemInfoList.get(i).getAlarmInfo());
					cs.setString(8, acquisitionItemInfoList.get(i).getAlarmLimit()+"");
					cs.setString(9, acquisitionItemInfoList.get(i).getHystersis()+"");
					cs.setInt(10, acquisitionItemInfoList.get(i).getAlarmLevel());
					cs.setInt(11, acquisitionItemInfoList.get(i).getIsSendMessage());
					cs.setInt(12, acquisitionItemInfoList.get(i).getIsSendMail());
					cs.executeUpdate();
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(cs!=null)
				cs.close();
			conn.close();
		}
		return true;
	}
	
	public Boolean savePCPAlarmInfo(String wellName,String deviceType,String acqTime,List<AcquisitionItemInfo> acquisitionItemInfoList) throws SQLException {
		Connection conn=SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		CallableStatement cs=null;
		
		try {
			cs = conn.prepareCall("{call prd_save_pcpalarminfo(?,?,?,?,?,?,?,?,?,?,?,?)}");
			for(int i=0;i<acquisitionItemInfoList.size();i++){
				if(acquisitionItemInfoList.get(i).getAlarmLevel()>0){
					cs.setString(1, wellName);
					cs.setString(2, deviceType);
					cs.setString(3, acqTime);
					cs.setString(4, acquisitionItemInfoList.get(i).getTitle());
					cs.setInt(5, acquisitionItemInfoList.get(i).getAlarmType());
					cs.setString(6, acquisitionItemInfoList.get(i).getRawValue());
					cs.setString(7, acquisitionItemInfoList.get(i).getAlarmInfo());
					cs.setString(8, acquisitionItemInfoList.get(i).getAlarmLimit()+"");
					cs.setString(9, acquisitionItemInfoList.get(i).getHystersis()+"");
					cs.setInt(10, acquisitionItemInfoList.get(i).getAlarmLevel());
					cs.setInt(11, acquisitionItemInfoList.get(i).getIsSendMessage());
					cs.setInt(12, acquisitionItemInfoList.get(i).getIsSendMail());
					cs.executeUpdate();
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(cs!=null)
				cs.close();
			conn.close();
		}
		return true;
	}
}
