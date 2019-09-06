
directory="cdn"
project="xlsx"

echo "$project 进行压缩成tar"

CURRENTDATE=`date +"%Y-%m-%d&%H_%M_%S"`
echo $CURRENTDATE

# 删除 tar.gz
if [ -f $project.tar.gz ];then
    rm -rf $project.tar.gz
fi

if [ -d $directory ];then
    echo "cdn 存在";
    rm -rf $directory
    yarn build
    cd $directory
    rm -rf $directory.tar.gz
    tar -zcf ../$directory.tar.gz *
else
    echo "cdn 不存在";
    # 重新打包
    yarn build
    cd $directory
    tar -zcf ../$directory.tar.gz *
fi

# tar 整个项目
cd ../
tar -zcf ./$project.tar.gz --exclude=node_modules --exclude=tar *

cp ./$project.tar.gz ./tar/$project$CURRENTDATE.tar.gz

