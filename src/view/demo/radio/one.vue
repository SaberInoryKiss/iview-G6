<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-12-02 15:49:55
 * @LastEditTime: 2019-12-09 14:53:28
 * @LastEditors: Please set LastEditors
 * @UpdateLogs: logs
 -->
<template>
    <div class="one">
        <p>{{this.defaultName}}</p>
        <p>{{this.scanPortValue}}</p>
    </div>
</template>
<script>
export default {
    props: ['defaultName'],
    data() {
        return {
            devicesMap: new Map(),
            scanPortValue:'',
        }
    },
    watch: {
        defaultName() {
            this.getData()
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.$axios({
                method: "GET",
                url: "api/api/underlay/v1/port/scanPort/172.20.1.151",
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4='
                }
            }).then((res) => {
            //    console.log(this.defaultName)
            const data =res.data
            for(let item of data){
                this.devicesMap.set(item.ifName, item);
            }
            // console.log(this.devicesMap)
            const scanPortValue = this.devicesMap.get(this.defaultName)
            this.scanPortValue = scanPortValue
            // console.log(scanPortValue)
            
            }).catch((error) => {
                console.log(error);
            });
        }
    },
}
</script>