# Docker

> [ubuntu 22.04 安装原文](https://zhuanlan.zhihu.com/p/143156163)

一、在 Ubuntu 20.04 上安装 Docker

在 Ubuntu 上安装 Docker 非常直接。我们将会启用 Docker 软件源，导入 GPG key，并且安装软件包。

首先，更新软件包索引，并且安装必要的依赖软件，来添加一个新的 HTTPS 软件源：

sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
使用下面的 curl 导入源仓库的 GPG key：

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
将 Docker APT 软件源添加到你的系统：

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
现在，Docker 软件源被启用了，你可以安装软件源中任何可用的 Docker 版本。

01.想要安装 Docker 最新版本，运行下面的命令。如果你想安装指定版本，跳过这个步骤，并且跳到下一步。

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
02.想要安装指定版本，首先列出 Docker 软件源中所有可用的版本：

sudo apt update
apt list -a docker-ce
可用的 Docker 版本将会在第二列显示。在写作这篇文章的时候，在官方 Docker 软件源中只有一个 Docker 版本（5:19.03.9~3-0~ubuntu-focal）可用：

docker-ce/focal 5:19.03.9~3-0~ubuntu-focal amd64
通过在软件包名后面添加版本=<VERSION>来安装指定版本：

sudo apt install docker-ce=<VERSION> docker-ce-cli=<VERSION> containerd.io
一旦安装完成，Docker 服务将会自动启动。你可以输入下面的命令，验证它：

sudo systemctl status docker
输出将会类似下面这样：

● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2020-05-21 14:47:34 UTC; 42s ago
...
当一个新的 Docker 发布时，你可以使用标准的sudo apt update && sudo apt upgrade流程来升级 Docker 软件包。

如果你想阻止 Docker 自动更新，锁住它的版本：

sudo apt-mark hold docker-ce
二、以非 Root 用户身份执行 Docker

默认情况下，只有 root 或者 有 sudo 权限的用户可以执行 Docker 命令。

想要以非 root 用户执行 Docker 命令，你需要将你的用户添加到 Docker 用户组，该用户组在 Docker CE 软件包安装过程中被创建。想要这么做，输入：

sudo usermod -aG docker $USER
$USER是一个环境变量，代表当前用户名。

登出，并且重新登录，以便用户组会员信息刷新。

三、验证安装过程

想要验证 Docker 是否已经成功被安装，你可以执行docker命令，前面不需要加`sudo, 我们将会运行一个测试容器:

docker container run hello-world
如果本地没有该镜像，这个命令将会下载测试镜像，在容器中运行它，打印出 “Hello from Docker”，并且退出。

输出看起来应该像这样：


这个容器将会在打印消息后停止运行，因为它没有任何长期运行的进程。

默认情况下，Docker 从 Docker Hub 拉取镜像。它是一个云端服务，主要用来储存 公有和私有源中的 Docker 镜像。

四、卸载 Docker

在卸载 Docker 之前，你最好 移除所有的容器，镜像，卷和网络。

运行下面的命令停止所有正在运行的容器，并且移除所有的 docker 对象：

docker container stop $(docker container ls -aq)
docker system prune -a --volumes
现在你可以使用apt像卸载其他软件包一样来卸载 Docker：

sudo apt purge docker-ce
sudo apt autoremove