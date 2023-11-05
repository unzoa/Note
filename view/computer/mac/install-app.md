# 安装APP

## 解决Mac安装软件的“已损坏，无法打开。 您应该将它移到废纸篓”问题

一、允许“任何来源”开启

```bash
sudo spctl  --master-disable
```

接着打开【系统偏好设置】，选择【安全性与隐私】，选择【通用】，可以看到【任何来源】已经选定。


二、发现还是显示“已损坏，无法打开。 您应该将它移到废纸篓”，不急，接下来用这种方法：

```bash
sudo xattr -r -d com.apple.quarantine /Applications/WebStrom.app
```

接着重新打开安装软件，就可以正常安装了。