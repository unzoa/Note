# VPN

## Prepare

> MacOS.Ventura 以下

```
vpnname
vpnpwd
hostIp
```

## Start

设置 -> 网络

## Step 1

左侧边栏底部，“+”新增，出现弹窗

```
接口   ：下拉选择VPN
VPN类型：L2TP/IPSec
服务名称：自定义名称，显示在侧边栏
```

点击“创建”

## Step 2

右侧

```
配置：默认
服务器地址：hostIp
帐户名称：vpnname
```
点击“认证设置”，出现弹窗，在“用户认证” -> 密码，输入 vpnpwd，点击弹窗底部 “好”

## Step 3

> 路由器做的L2TP vpn 没有共享密钥 需要添加mac的配置文件具体如下

1. /etc/ppp/ 下 创建 options 文件

```
sudo vim /etc/ppp/options
```

2. options 文件中 输入以下内容

```
plugin L2TP.ppp
l2tpnoipsec
```

## Step 4

最后点高级，配置clash的代理

```
“选项”tab下，把里面”通过VPN连接发送所有流量“钩上
“代理”tab下，“网页代理(HTTP)”、“SOCKS代理”中的代理服务器，ip、port填写Clash(其他vpn)的代理地址 127.0.0.1:7890
```
点击弹窗底部”好“

## Step 5

点击右侧底部“应用”，保证不在公司网络情况下，点击上方的“连接”，稍等片刻即可联通





