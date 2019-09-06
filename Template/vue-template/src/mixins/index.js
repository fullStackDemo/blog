// 消息提醒 封装统一方法
export default {
    methods: {
        showMessage(params) {
            const {type, message } = params;
            this.$message({
                type,
                message,
                offset: 200,
                center: true,
                customClass: 'popup_message'
            });
        }
    }
};
