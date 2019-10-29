
PROJECT=$1
DEFAULT="cdn"
DATE=$(date +%Y%m%d%H%M)
BACKUP_FOLDER="tar"
DIST="cdn"

echo $1

if [ ! "$1" ]; then
  echo no args
  PROJECT=$DEFAULT
fi

rm -rf $PROJECT.tar.gz


# backup
if [ -d "$BACKUP_FOLDER" ]; then
    echo "folder exist"
else
    echo "folder not exist"
    mkdir $BACKUP_FOLDER
fi

cd cdn
tar -czvf ../$PROJECT.tar.gz *

tar -czf ../$BACKUP_FOLDER/$PROJECT.$DATE.tar.gz *

