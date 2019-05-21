

argument=$1;
echo "$argument"
if [ -n "$argument" ]; then
  echo "wechat_run_port=$1"
  npm config set wechat:port $1
fi
node app.js