<!--
 * @Author: your name
 * @Date: 2020-01-21 14:32:16
 * @LastEditTime : 2020-01-21 15:40:11
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workplace\MyLearning\iview-G6\src\view\Echart\3DGlobe2.vue
 -->
<template>
    <div class="earthmap" id="earth">
    </div>
</template>

<script>
    import echarts from 'echarts'
    import 'echarts/map/js/world.js'
    import 'echarts-gl'
    export default {
        data(){
            return{
                option :{
                        backgroundColor: '#000',
                        globe: {
                            baseTexture: require("@/assets/3DGlobe/earth.jpg"),
                            heightTexture: require("@/assets/3DGlobe/bathymetry_bw_composite_4k.jpg"),

                            displacementScale: 0.1,

                            shading: 'lambert',

                            environment: require("@/assets/3DGlobe/starfield.jpg"),

                            light: {
                                ambient: {
                                    intensity: 0.1
                                },
                                main: {
                                    intensity: 1.5
                                }
                            },

                            layers: [{
                                type: 'blend',
                                blendTo: 'emission',
                                texture: require("@/assets/3DGlobe/night.jpg")
                            }, 
                            {
                                type: 'overlay',
                                texture: require("@/assets/3DGlobe/clouds.png"),
                                shading: 'lambert',
                                distance: 5
                            }
                            ]
                        },
                    series: []
                },
            }
        },
        mounted(){
            this.initMap()
        },
        methods:{
             initMap(){
                 this.myChart = echarts.init(document.getElementById('earth'))

                 this.myChart.setOption(this.option);
             },
        }
    }

</script>


<style>
    .earthmap{
        width: 100%;
        height: 750px;
        background: rgba(16, 167, 202, 0.39);
    }


</style>