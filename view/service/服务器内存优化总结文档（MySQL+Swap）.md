# 服务器内存优化总结文档（MySQL\+Swap）

# 一、优化背景

服务器配置：总物理内存约1\.7GB（1690MB），初始无Swap交换分区，运行MySQL服务及4个Node\.js业务服务（含PM2管理进程）。

优化前问题：MySQL进程占用内存过高（415MB，占比24%），叠加Node\.js服务内存占用，导致系统空闲内存极低（仅65MB），无Swap兜底，存在内存耗尽触发OOM（内存溢出）、杀死业务进程的风险。

# 二、优化目标

- 降低MySQL内存占用，释放冗余内存资源；

- 配置Swap交换分区，兜底内存溢出风险；

- 保证MySQL、Node\.js等所有业务服务正常运行，不影响业务可用性；

- 提升服务器内存利用率，实现长期稳定运行。

# 三、核心优化操作（按执行顺序）

## 3\.1 MySQL内存优化（核心步骤）

通过修改MySQL配置文件，限制内存占用，关闭无用功能，将MySQL从“高内存消耗”调整为“轻量适配模式”。

### 3\.1\.1 配置修改命令

```bash
cat >> /etc/mysql/my.cnf << EOF
[mysqld]
performance_schema = OFF
innodb_buffer_pool_size = 64M
innodb_log_buffer_size = 8M
key_buffer_size = 16M
max_connections = 50
EOF
```

### 3\.1\.2 重启MySQL生效

```bash
systemctl restart mysql
```

### 3\.1\.3 配置说明（通俗解读）

- performance\_schema = OFF：关闭MySQL性能监控功能（日常业务无需使用，可节省100MB\+内存）；

- innodb\_buffer\_pool\_size = 64M：限制MySQL核心缓存（表数据、索引）的最大内存占用（原默认值过高，64M适配小内存服务器\+低访问量业务）；

- innodb\_log\_buffer\_size = 8M：调整日志缓冲大小，适配小业务场景，避免冗余内存占用；

- key\_buffer\_size = 16M：优化MyISAM索引缓存（业务几乎不使用，无需分配过多内存）；

- max\_connections = 50：限制MySQL最大同时连接数（默认150\+，减少连接占用的内存，50足够小型业务使用）。

## 3\.2 Swap交换分区配置（兜底保障）

创建1GB Swap分区，当物理内存耗尽时，系统会使用Swap临时缓冲，避免直接杀死进程，保障服务稳定性。

### 3\.2\.1 完整执行命令

```bash
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
```

### 3\.2\.2 生效验证

执行命令 `free \-h`，查看Swap行显示为“1\.0G 0B 1\.0G”，即表示Swap创建并启用成功（本次执行已确认生效，输出正常配置信息）。

# 四、优化效果对比（核心数据）

## 4\.1 MySQL内存优化效果

|优化阶段|内存占用|内存占比|优化幅度|
|---|---|---|---|
|优化前|415MB|24\.0%|\-|
|优化后|154MB|8\.9%|下降261MB，占比降低15\.1%|

## 4\.2 服务器整体内存状态

- 优化后总可用内存大幅提升，彻底解决“空闲内存过低”问题；

- MySQL内存稳定在150MB左右，不再是内存负担；

- 4个Node\.js服务（含PM2）合计内存占用约350MB，运行正常；

- 1GB Swap分区兜底，杜绝OOM杀进程风险。

# 五、优化结论

本次优化已完全达成目标，核心成果如下：

1. MySQL内存优化成功，冗余内存释放260MB\+，适配小内存服务器运行；

2. Swap交换分区配置生效，构建内存兜底机制，提升服务器稳定性；

3. 所有业务服务（MySQL、Node\.js）正常运行，无任何业务影响；

4. 服务器内存利用率合理，可长期稳定运行，无需担心内存溢出导致的服务宕机。

# 六、后续建议

- 定期执行 `free \-h` 查看内存状态，监控MySQL、Node\.js内存占用是否异常；

- 定期执行 `ps aux \-\-sort \-%mem \| head \-10`，排查异常高内存占用进程；

- 若后续业务扩容，可考虑将服务器内存升级至2GB\+，进一步提升运行流畅度；

- 保留本次优化配置命令，便于后续服务器迁移、重建时复用。

> （注：文档部分内容可能由 AI 生成）
