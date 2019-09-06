<template>
    <div class="excel_content">
        <Excel :options="options" />
    </div>
</template>
<script>
import Excel from "./Excel";
import { getSearch } from '@/utils';
export default {
    data() {
        const url = getSearch('file');
        return {
            options: {
                url: url
            }
        }
    },
    components: {
        Excel
    }
}
</script>
