# clamav

## 2023-09-20

> 目标：根据检测出的恶意名称获取规则体

### 本地调试

```bash
docker pull clamav/clamav
clamscan file_path # 检测
```

### 查询签名库（规则库）

```bash
cd /var/liv/clamav
sigtool -i main.cvd # 查看签名库信息
sigtool --unpack main.cvd # 解压签名库
# COPYING main.crb main.fp main.hdb main.hsb main.info main.mdb main.msb main.ndb main.sfp

# 签名文件后缀名	                  签名类型
# *.hdb                           基于md5 hash的签名
# *.hsb                           基于sha1和sha256 hash的签名
# *.mdb                           基于PE section hash的签名
# *.db                            Body-based的基本签名
# *.ndb                           Body-based的扩展签名
# *.ldb                           Body-based的逻辑签名
# *.idb                           PE文件的图标签名
# *.ndb                           PE文件版本信息元数据签名
# .crb, .crtdb                    信任和撤销的证书签名
# *.cdb                           容器元数据签名
# .zmd(zip)和*.rmd(rar)           只基于ZIP/RAR元数据的签名
# .fp（md5）和.sfp（sha1和sha256）  白名单数据库
# *.pdb                           钓鱼url/host签名
# *.gdb                           钓鱼URL hash签名
# *.wdb                           钓鱼URL白名单签名


# https://docs.clamav.net/manual/Signatures/SignatureNames.html
# new official signatures published by Cisco-Talos in the daily, main, and bytecode signature databases follow this format:
# 规则名 {platform}.{category}.{name}-{signature id}-{revision}

# 关键词查询 Win.Adware.Somoto-4
vi daily.cld # not found
vi main.mdb # found
# 29184:33e8227bf6edbf3997e3d0895494668e:Win.Adware.Somoto-4


# 查询规则体
/var/lib # grep -r "Win.Adware.Somoto" clamav

# clamav/main.mdb:29184:33e8227bf6edbf3997e3d0895494668e:Win.Adware.Somoto-4
# clamav/main.mdb:38912:d3c979ced6fca2d7be6b1371b4130a69:Win.Adware.Somoto-5
# clamav/main.ndb:Win.Adware.#Somoto-1:0:*:5c496e7374616c6c00fd9a80005b52414e444f4d5f535452494e475d2e377a00377a612e65786500fd9a805c6e73457865632e646c6c00377a612e6578652065202d79202d7022{32}22205b52414e444f4d5f535452494e475d2e377a0045786563546f537461636b00fda0800022fd9a805c696e7374616c6c(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)2e6578652220fda08000637370726f64756374005555494400574d494320fd81802047657420fd8280202f464f524d41543a7465787476616c75656c6973742e78736c002f4f454d0020000d000a00090031303234

# clamav/main.ndb:Win.Adware.Somoto-2:0:*:5c496e7374616c6c00fd9a80005b52414e444f4d5f535452494e475d2e72617200556e5241522e65786500fd9a805c6e73457865632e646c6c00556e5261722e6578652065202d6870{4}2f{2}2f{2}2d{2}3a{2}3a{2}205b52414e444f4d5f535452494e475d2e7261720045786563546f537461636b00556e5261722e65786500fda0800022fd9a805c696e7374616c6c(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)2e6578652220fda08000637370726f64756374005555494400574d494320fd81802047657420fd8280202f464f524d41543a7465787476616c75656c6973742e78736c002f4f454d0020000d000a00090031303234002f7575696420fd80800062696f730053657269616c4e756d626572:74

# clamav/main.ndb:Win.Adware.Somoto-3:0:*:5c496e7374616c6c00fd9a8000{3}(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)2e65786500fd9a805c6e73457865632e646c6c00{3}(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)2e657865202d79202d7022{32}220045786563546f537461636b00fda0800022fd9a805c696e7374616c6c(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)(30|31|32|33|34|35|36|37|38|39)2e6578652220fda08000637370726f64756374005555494400574d494320fd81802047657420fd8280202f464f524d41543a7465787476616c75656c6973742e78736c002f4f454d0020000d000a00090031303234002f7575696420fd80800062696f730053657269616c4e756d626572

# clamav/main.hsb:523261074b5adff7d719f88b83d0ec6a:216184:Win.Adware.Somoto-25:73

# ^C


# 统计数量
wc -l main.mdb # 4058809    PE切片hash规则
wc -l main.ndb # 101634     Body-based的扩展签名

```

### 指标内置恶意代码规则200万验证

```
用例步骤：
1、登录服务器，找到规则库对应位置
docker clamav
cd /var/lib/clamav

2、命令查询对应规则库文件规则数量，统计超200万
wc -l main.mdb # 4058809    PE切片hash规则
wc -l main.ndb # 101634     Body-based的扩展签名
```
