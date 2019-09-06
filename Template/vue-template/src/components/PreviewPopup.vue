<template>
    <div>
        <!-- 预览窗口 -->
        <el-dialog :visible.sync="visible" :lock-scroll="lock" :center="center" :title="name" width="80%" top="20px" :fullscreen="fullscreen" @close="closeBtn" custom-class="doc_popup">
            <!-- <i class="dialog_screen sprite_ico sprite_ico_fangda" @click="handleClickFullScreen"></i> -->
            <div class="popup_content" v-loading="showLoading" element-loading-background="#404040" :style="{height: popup_height + 'px'}">
                <template v-if="type == 'pdf'">
                    <iframe :src="src" width="100%" height="100%"></iframe>
                </template>
                <template v-else>
                    <div class="excelContent"></div>
                </template>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import XLSX from 'xlsx';
// console.log('XLSX', XLSX);
export default {
    data() {
        const { url, type, name } = this.options;
        let pdf_url;
        if (type == 'excel') {
            this.readXlsx(url)
        } else {
            pdf_url = "pdf/web/view.html?file=/group1" + url.split('group1')[1];
        }

        return {
            fullscreen: false,
            popup_height: window.innerHeight * 0.8,
            numPages: '',
            src: pdf_url,
            type,
            name,
            lock: true,
            visible: true,
            center: true,
            showLoading: true
        }
    },
    props: {
        options: {
            type: Object,
            default: () => { },
        }
    },
    components: {
    },
    mounted() {
        window.addEventListener('resize', e => {
            this.popup_height = window.innerHeight * 0.8;
        }, false);
    },
    created() {
        setTimeout(() => {
            this.showLoading = false;
        }, 1000);
        // const { url, type, name } = this.options;
    },
    methods: {
        closeBtn() {
            this.$emit('closeEvent');
        },
        handleClickFullScreen() {
            this.fullscreen = false;
        },
        readXlsx(url) {
            const excel_url = "/group1" + url.split('group1')[1];
            /* set up an async GET request */
            var req = new XMLHttpRequest();
            req.open("GET", excel_url, true);
            req.responseType = "arraybuffer";

            req.onload = function (e) {
                /* parse the data when it is received */
                var data = new Uint8Array(req.response);
                var workbook = XLSX.read(data, { type: "array" });
                /* DO SOMETHING WITH workbook HERE */
                var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                var data = XLSX.utils.sheet_to_html(first_worksheet);
                // console.log("data", data);
                document.querySelector('.excelContent').innerHTML = data;
            };
            req.send();
        }
    }
}
</script>
<style lang="less" scope>
.doc_popup {
    background: #404040;
    padding: 5px;
    border-radius: 6px;

    iframe {
        border: none;
    }

    .el-dialog__body {
        padding: 10px 0 0 0;
    }

    .el-dialog__title {
        color: #fff;
    }

    .el-dialog__header {
        padding: 0;
    }

    .el-dialog__headerbtn {
        top: 9px;
    }

    .excelContent {
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 10px;
        overflow: auto;

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;

            * {
                font-size: 12px !important;
            }

            tr {
                border: 1px solid #e9e9e9;
                border-right: none;
                background: #f5f5f5;

                &:nth-child(odd) {
                    background: #f5f5f5;
                }

                &:nth-child(even) {
                    background: #fff;
                }

                td {
                    border-right: 1px solid #e9e9e9;
                    text-align: left;
                    white-space: nowrap;
                    padding: 6px;
                    line-height: 40px;
                    vertical-align: middle;
                    min-width: 4em;
                }
            }
        }
    }
}
</style>
