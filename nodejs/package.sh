
#!/bin/sh
argument=$1;
# 排除一些文件
excludeFolder="node_modules";

# 判断参数是否存在
if [ -n "$argument" ];then
  echo "**1**"
  echo "build project is $argument"
  
  # 根据参数先判断要构建的文件夹是否存在
  folderName=$argument
  if [[ -d "$folderName" ]];then
    echo "**2**"
    echo "Directory $folderName exists"
    buildDir="build";
    
    # 判断 build 文件夹是否存在
    if [[ -d "$buildDir" ]];then
      echo "**3**"
      echo "Directory $buildDir exists"
      tar --exclude=$excludeFolder -zcvf ./$buildDir/$argument.tar.gz ./$argument 
    else
      echo "**3**"
      echo "Directory $buildDir does not exists"
      mkdir $buildDir
      tar -zcf ./$buildDir/$argument.tar.gz ./$argument
    fi
    
    # 判断是否生成tar.gz
    gzFile="$buildDir/$argument.tar.gz";
    if [ -f "$gzFile" ];then
      echo "**finaly**"
      echo "$gzFile is generated successfully"
    else
      echo "**finaly**"
      echo "$gzFile is not generated successfully"
    fi
    
    
  else
    echo "**2**"
    echo "Directory $folderName does not exists, please mkdir it"
  fi
  
else
  echo "**1**"
  echo "build project is null, please add a argument"
fi