<!--
 * @Author: your name
 * @Date: 2019-12-05 13:28:09
 * @LastEditTime: 2019-12-09 15:00:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workplace\MyLearning\iview-G6\src\view\demo\radio\index.vue
 -->
<template>
    <div class="content">
        <RadioGroup v-model="defaultName">
            <Radio v-for="(label, i) of name" :key="`label-${i}`" :label="label"></Radio>
        </RadioGroup>
        <p>{{defaultName}}</p>
        <!-- <p>{{devicesMap.get(defaultName)}}</p> -->

        <Tabs @on-click="clickTab">
            <TabPane v-for="(label, i) of nameArr" :key="`label-${i}`" :label="label"></TabPane>
        </Tabs>
        <keep-alive>
            <component :is="currView" :defaultName="defaultName"></component>
        </keep-alive> 
    </div>
</template>

<script>
import One from './one'
import Two from './two'
import Three from './three'

export default {
    components: {
        One,
        Two,
        Three
    },
    data() {
        return {
            name:[],
            defaultName: this.defaultName,
            allData: [],
            everyData: [],
            devicesMap: new Map(),
            nameArr: ['概况', '接口图表', '监视器'],
            currView: 'one'
            
        }
    },
    created(){
        this.getData();
    },
    methods: {
        clickTab(val) {
            const viewMap = {
                0: 'one',
                1: 'two',
                2: 'three'
            }
            this.currView = viewMap[val]
        },
        getData() {
            this.$axios({
                method: "GET",
                url: "api/api/underlay/v1/port/scanPort/172.20.1.151",
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4='
                }
            }).then((res) => {
                // console.log(this)
                const data = res.data
                let arr = [];
                let allData = []
                data.map(item => {  
                    arr.push(item.ifName)
                    allData.push(item)
                })
                this.name = arr
                this.defaultName = arr[0]
                this.allData = allData
                
                for (let item of this.allData) {
                    this.devicesMap.set(item.ifName, item);
                }
                this.everyData = Array.from(allData) 
                // console.log(this.everyData)
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style lang="css" scoped>
.content {
    background: #fff;
}
.content p {
    color:#b3b3b3;
}
</style>