# Start

1. 安装

  [下载](https://dev.mysql.com/downloads/mysql/)傻瓜式安装即可！

2. 配置环境变量

  首先找到配置文件
  /etc/profile
  在后面输入export路径
  export PATH=$PATH: /usr/local/mysql/bin

3. 执行source 命令

  ```bash
  source /etc/profile
  ```

4. zsh中每次启动都需要重新执行步骤3的解决

  在用户下找到
  .zshrc
  同样在最后一行添加
  export PATH=$PATH: /usr/local/mysql/bin

最后执行步骤3
结束！