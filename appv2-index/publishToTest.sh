folder="publish"

# step 1 检查文件是否存在
cd "$folder";

if [ -e *.tar ]; then
  	echo 'exist tar file'
else 
    echo 'not exist tar file'
fi

tar -xf statics.test.1470186395771.tar

# step2 登录测试服务器
# sftp -s:e:/ftp.txt 192.168.19.22


#!/bin/sh   
# HOST=192.168.19.22
# USER=root    
# PASS=hylehu2015    
# echo "Starting to sftp..."  
# lftp -u ${USER},${PASS} sftp://${HOST} <<EOF   
# cd /mnt/apps/lehu-app-back/html5/app/test
# mput index/*
# bye    
# EOF
# echo "done"  

#!/usr/bin/expect -f  
HOST=192.168.19.22
USER=root    
PASS=hylehu2015  
set timeout 10                   //设置超时时间  
spawn ssh $USER@$HOST       //发送ssh请滶  
expect {                 //返回信息匹配  
"*yes/no" { send "yes\r"; exp_continue}  //第一次ssh连接会提示yes/no,继续  
"*password:" { send "$password\r" }      //出现密码提示,发送密码  
}  
interact          //交互模式,用户会停留在远程服务器上面. 