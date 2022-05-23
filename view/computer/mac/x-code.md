# x-code

## ’npm i 模块‘的时候报警告

```
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
```

解决办法：

```
# 删除已经安装的CommandLineTools
sudo rm -rf $(xcode-select -p)

# 重新安装，此时git可能会自动提示安装
sudo xcode-select --install

# 同意条款选择同意，会提示系统更新一并同意
```
