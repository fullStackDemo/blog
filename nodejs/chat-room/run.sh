

echo "chat_run_port=$1"
npm config set chat-room:port $1
node index.js