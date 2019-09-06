<template>
    <div class="excel_content--detail" v-loading="showLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="excel_content--sheetHtml"></div>
    </div>
</template>
<script>
import XLSX from 'xlsx';
export default {
    data() {
        const { url } = this.options;
        return {
            url,
            showLoading: true
        }
    },
    props: {
        options: {
            type: Object,
            default: () => { }
        }
    },
    created() {
        this.readXlsx(this.url);
    },
    methods: {
        readXlsx(url) {
            this.showLoading = true;
            const excel_url = "/group1" + url.split('group1')[1];
            /* set up an async GET request */
            const req = new XMLHttpRequest();
            req.open("GET", excel_url, true);
            req.responseType = "arraybuffer";

            req.onload = e => {
                /* parse the data when it is received */
                const data = new Uint8Array(req.response);
                const workbook = XLSX.read(data, { type: "array" });
                /* DO SOMETHING WITH workbook HERE */
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const htmlData = XLSX.utils.sheet_to_html(first_worksheet);
                document.querySelector('.excel_content--sheetHtml').innerHTML = htmlData;
                this.showLoading = false;
            };
            req.send();
        }
    }

}
</script>

