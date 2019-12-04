<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-12-02 14:04:07
 * @LastEditTime: 2019-12-02 16:08:45
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>
    <div class="container">
        <Tabs @on-click="clickTab">
            <TabPane v-for="(label, i) of nameArr" :key="`label-${i}`" :label="label"></TabPane>
        </Tabs>
        <keep-alive>
            <component :is="currView"></component>
        </keep-alive> 
    </div>
</template>
<script>
import One from './one'
import Two from './two'
import Three from './three'
    export default {
        name: 'tabs',
        components: {
            One,
            Two,
            Three
        },
        data() {
            return {
                nameArr: ['标签一', '标签二', '标签三'],
                currView: 'one'
            }
        },
        methods: {
            clickTab(val) {
                const viewMap = {
                    0: 'one',
                    1: 'two',
                    2: 'three'
                }
                this.currView = viewMap[val]
            }
        }
    }
</script>

<style>
.container {
    background: #fff;
}
</style>
