# 移动

## 迁移mysql

### 导出mysql数据

```bash
docker exec mysql_task_reports mysqldump -u root -p your_database_name > backup.sql
```

### 导出容器