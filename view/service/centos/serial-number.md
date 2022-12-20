# Linux 查询服务器序列号命令

1. 查看服务器型号：dmidecode | grep ‘Product Name’
2. 查看主板的序列号：dmidecode |grep ‘Serial Number’
3. 查看系统序列号：dmidecode -s system-serial-number
4. 查看内存信息：dmidecode -t memory
5. 查看OEM信息：dmidecode -t 11
6. 要列出有关每个GPU的某些详细信息，请尝试：nvidia-smi --query-gpu=index,name,uuid,serial --format=csv