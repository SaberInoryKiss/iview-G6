<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-06 09:56:58
 * @LastEditTime: 2019-11-13 16:20:12
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>
    <!--
    
      ref="myechart"定义该div也就是画布的名字，在this.$echarts.init(this.$refs.myechart) 图表初始化的时候使用
    
      this.$refs.myechart 也可以替换为 document.getElementById('main') 或者 document.getElementByClassName('echart-box')
    
      -->
    
    <div class="echart">
    
        <div class="HelloWorld echart-box" ref="myechart" id="main"></div>
    
    </div>
</template>

<script>
export default {
    name: 'Ecahrt',
    data() {
        return {
            option: {
        //backgroundColor: '#000F1F',
        tooltip: {//弹窗
            /*trigger: 'item',
            formatter: function(params) {
                //根据值是否为空判断是点还是线段
                if(!isEmpty(params.data.source)){//如果鼠标移动到线条

                }else{//如果鼠标移动到点
                    if(params.data.type == "zone"){
                        return params.data.name + "：<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "配置状态：启用";
                    }else if(params.data.type == "cluster"){
                        return params.data.name + "：<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "配置状态：启用";
                    }else if(params.data.type == "host"){
                        var msg = "";
                        msg += params.data.name + "：<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "配置状态：启用" + "<br>";
                        if(!isEmpty(params.data.connectStatus)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "连接状态：" + params.data.connectStatus + "<br>";
                        }
                        if(!isEmpty(params.data.roleName)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "宿主角色：" + params.data.roleName + "<br>";
                        }
                        msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "业务数量：" + params.data.businessCnt + "<br>";
                        if(!isEmpty(params.data.hostCpuCoreNum)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "CPU核心数：" + params.data.hostCpuCoreNum + "核<br>";
                        }
                        if(!isEmpty(params.data.hostRamSize)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "内存总容量：" + (params.data.hostRamSize/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.hostRamUsedSize)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "内存已用量：" + (params.data.hostRamUsedSize/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.hostRamAvailableSize)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "内存可用量：" + (params.data.hostRamAvailableSize/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.hostRamUsed)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "内存占用百分比：" + (params.data.hostRamUsed*100).toFixed(2) + "%<br>";
                        }
                        if(!isEmpty(params.data.hostDiskTotalCapacityKB)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "磁盘总容量：" + (params.data.hostDiskTotalCapacityKB/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.hostDiskUsedKB)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "磁盘已用量：" + (params.data.hostDiskUsedKB/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.hostDiskAvailableKB)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "硬盘可用量：" + (params.data.hostDiskAvailableKB/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.hostDiskUsed)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "硬盘可用量：" + (params.data.hostDiskAvailableKB/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.hostDiskUsed)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "磁盘占用百分比：" + (params.data.hostDiskUsed*100).toFixed(2) + "%<br>";
                        }
                        return msg;
                    }else if(params.data.type == "vm"){
                        var msg = "";
                        msg += params.data.name + "：<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "配置状态：启用" + "<br>";
                        if(!isEmpty(params.data.instanceName)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "实例名称：" + params.data.instanceName + "<br>";
                        }
                        if(!isEmpty(params.data.comment)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "说明：" + params.data.comment + "<br>";
                        }
                        if(!isEmpty(params.data.applicationName)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "归属应用：" + params.data.applicationName + "<br>";
                        }
                        if(!isEmpty(params.data.vmCpuCoreNum)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "CPU核心数：" + params.data.vmCpuCoreNum + "核<br>";
                        }
                        if(!isEmpty(params.data.vmRam)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "内存大小：" + (params.data.vmRam/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.vmTotalDiskCapacity)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "磁盘总容量：" + (params.data.vmTotalDiskCapacity/1024/1024).toFixed(2) + "GB<br>";
                        }
                        if(!isEmpty(params.data.systemType)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "系统：" + params.data.systemType + "<br>";
                        }
                        if(!isEmpty(params.data.state)){
                            msg += "&nbsp;&nbsp;&nbsp;&nbsp;" + "电源状态："  + params.data.state + "<br>";
                        }
                        return msg;
                    }
                }
            }*/
        },
        color:['#09022C',
            '#040193',
            '#073CFE',
            '#0065C2'],
        legend: { //=========小图标，圖表控件
            show:true,
            data: [{
                    name: '区域',
                    icon: 'diamond' //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    //icon:'image://./images/icon1.png'  //如果用图片img，格式为'image://+icon文件地址'，其中image::后的//不能省略
                },
                {
                    name: '集群',
                    icon: 'rect'
                }, {
                    name: '宿主机',

                    icon: 'roundRect'
                }, {
                    name: '云主机',
                    icon: 'circle'
                }
            ]
        },
        series : [ {//图片配置
            type : 'graph', //关系图
            //name : "拓扑图", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            layout : 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
            legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation : true,//是否开启鼠标悬停节点的显示动画
            coordinateSystem : null,//坐标系可选
            xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
            yAxisIndex : 0, //y轴坐标
            force: {
                repulsion: 450,//相距距离
                edgeLength: [150, 200],
                layoutAnimation: true
            },
            /*force : { //力引导图基本配置
                //initLayout: ,//力引导的初始化布局，默认使用xy轴的标点
                repulsion : 200,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                gravity : 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                edgeLength :80,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                layoutAnimation : true
                //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
            },*/
            roam : true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            nodeScaleRatio : 0.6,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
            draggable : true,//节点是否可拖拽，只在使用力引导布局的时候有用。
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
            //symbol:'roundRect',//关系图节点标记的图形。ECharts 提供的标记类型包括 'circle'(圆形), 'rect'（矩形）, 'roundRect'（圆角矩形）, 'triangle'（三角形）, 'diamond'（菱形）, 'pin'（大头针）, 'arrow'（箭头）  也可以通过 'image://url' 设置为图片，其中 url 为图片的链接。'path:// 这种方式可以任意改变颜色并且抗锯齿
            //symbolSize:10 ,//也可以用数组分开表示宽和高，例如 [20, 10] 如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数：(value: Array|number, params: Object) => number|Array
            //symbolRotate:,//关系图节点标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
            //symbolOffset:[0,0],//关系图节点标记相对于原本位置的偏移。[0, '50%']
            edgeSymbol : [ 'none', 'arrow' ],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
            symbolSize: 50,//图形大小
            edgeSymbolSize : 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
            itemStyle : {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                normal : { //默认样式
                    label : {
                        show : true
                    },
                    //borderType : 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    //borderColor : 'rgba(255,215,0,0.4)', //设置图形边框为淡金色,透明度为0.4
                    //borderWidth : 2, //图形的描边线宽。为 0 时无描边。
                    // opacity : 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5

                },
                emphasis : {//高亮状态

                }
            },
            lineStyle : { //==========关系边的公用线条样式。
                normal : {
                    color : '#31354B',
                    width : '1',
                    type : 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                    curveness : 0, //线条的曲线程度，从0到1
                    opacity : 1
                    // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                },
                emphasis : {//高亮状态

                }
            },
            label : { //=============图形上的文本标签
                normal : {
                    show : true,//是否显示标签。
                    position : 'bottom',//标签的位置。['50%', '50%'] [x,y]   'inside'
                    textStyle : { //标签的字体样式
                        color : '#2D2F3B', //字体颜色
                        fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight : 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily : 'sans-serif', //文字的字体系列
                        fontSize : 12, //字体大小
                    }
                },
                emphasis : {//高亮状态

                }
            },
            edgeLabel : {//==============线条的边缘标签
                normal : {
                    show : false
                },
                emphasis : {//高亮状态

                }
            },
            //别名为nodes   name:影响图形标签显示,value:影响选中后值得显示,category:所在类目的index,symbol:类目节点标记图形,symbolSize:10图形大小
            //label:标签样式。
            //数据
            data : [{"id":0,"name":"f0120","category":0,"symbol":"diamond","symbolSize":80,"type":"zone","itemStyle":{"normal":{"color":"#09022C"}}},{"id":1,"name":"私有云研发测试环境","category":1,"symbol":"rect","symbolSize":50,"type":"cluster","itemStyle":{"normal":{"color":"#040193"}}},{"id":2,"name":"存储01","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":4,"hostCpuUsed":0.34,"hostCpuLost":1.58,"hostRamSize":16417088,"hostRamUsedSize":6689704,"hostRamAvailableSize":9727384,"hostRamUsed":0.4075,"hostDiskTotalCapacityKB":2927493120,"hostDiskUsedKB":50399692,"hostDiskAvailableKB":2877093428,"hostDiskUsed":0.0172,"roleName":"存储节点","businessCnt":0,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":3,"name":"存储02","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":4,"hostCpuUsed":0.18,"hostCpuLost":3.57,"hostRamSize":16417088,"hostRamUsedSize":8065364,"hostRamAvailableSize":8351724,"hostRamUsed":0.4913,"hostDiskTotalCapacityKB":2927493120,"hostDiskUsedKB":6261212,"hostDiskAvailableKB":2921231908,"hostDiskUsed":0.0021,"roleName":"存储节点","businessCnt":0,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":4,"name":"存储03","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":4,"hostCpuUsed":0.38,"hostCpuLost":5.58,"hostRamSize":16417088,"hostRamUsedSize":6858004,"hostRamAvailableSize":9559084,"hostRamUsed":0.4177,"hostDiskTotalCapacityKB":3512991744,"hostDiskUsedKB":7236532,"hostDiskAvailableKB":3505755212,"hostDiskUsed":0.0021,"roleName":"存储节点","businessCnt":0,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":5,"name":"计算01","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":24,"hostCpuUsed":0.01,"hostCpuLost":1.3,"hostRamSize":263398136,"hostRamUsedSize":46815664,"hostRamAvailableSize":216582472,"hostRamUsed":0.1777,"hostDiskTotalCapacityKB":292968750,"hostDiskUsedKB":223103180,"hostDiskAvailableKB":69865570,"hostDiskUsed":0.7615,"roleName":"计算节点","businessCnt":15,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":6,"name":"ceph测试","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":2,"vmRam":2097152,"vmTotalDiskCapacity":104857600,"instanceName":"KcwUVhhZJKF3","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":7,"name":"ceph测试","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":2,"vmRam":2097152,"vmTotalDiskCapacity":41943040,"instanceName":"KkNVVhS8p3Ft","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":8,"name":"测试多ceph兼容","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":2,"vmRam":2097152,"vmTotalDiskCapacity":41943040,"instanceName":"KsbWVhRHOXaV","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":9,"name":"混合存储模式测试03","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":"系统盘和数据盘分别使用不同的存储","systemType":"Linux","applicationName":"运维测试","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":104857600,"instanceName":"KCRnVhusAfcs","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":10,"name":"混合存储模式测试03","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"运维测试","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":41943040,"instanceName":"K2WnVheVQHIy","state":"开机","itemStyle":{"normal":{"color":"#0065C2"}}},{"id":11,"name":"混合存储模式测试03","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"运维测试","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":41943040,"instanceName":"KkenVh2NN7pN","state":"开机","itemStyle":{"normal":{"color":"#0065C2"}}},{"id":12,"name":"混合存储兼容测试01","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":41943040,"instanceName":"KQsnVhNgLa7Q","state":"开机","itemStyle":{"normal":{"color":"#0065C2"}}},{"id":13,"name":"混合存储兼容测试01","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":41943040,"instanceName":"KKGoVhyqYmu7","state":"开机","itemStyle":{"normal":{"color":"#0065C2"}}},{"id":14,"name":"混合存储兼容测试03","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":null,"instanceName":"KScoVhXKFOax","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":15,"name":"混合存储兼容测试03","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":146800640,"instanceName":"KieoVhCZfE7H","state":"开机","itemStyle":{"normal":{"color":"#0065C2"}}},{"id":16,"name":"测试1111","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":null,"instanceName":"KmlpVhGB4I6k","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":17,"name":"测试申请111","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":null,"instanceName":"KD7sVhXoldal","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":18,"name":"混合存储兼容测试05","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":null,"instanceName":"Kj4uVhpwoBt8","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":19,"name":"测试开通001","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":"测试开通001","systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":null,"instanceName":"KINvVhyg0jLa","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":20,"name":"asfas009","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":"asfasf009","systemType":"Windows","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":2097152,"instanceName":"K0LAZhCinIcn","state":"开机","itemStyle":{"normal":{"color":"#0065C2"}}},{"id":21,"name":"计算02","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":24,"hostCpuUsed":0,"hostCpuLost":2.63,"hostRamSize":263578028,"hostRamUsedSize":61417000,"hostRamAvailableSize":202161028,"hostRamUsed":0.233,"hostDiskTotalCapacityKB":922114350,"hostDiskUsedKB":164727852,"hostDiskAvailableKB":715170642,"hostDiskUsed":0.1786,"roleName":"计算节点,存储节点","businessCnt":8,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":22,"name":"多ceph存储测试","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"运维测试","vmCpuCoreNum":2,"vmRam":2097152,"vmTotalDiskCapacity":null,"instanceName":null,"state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":23,"name":"混合存储兼容测试05","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":83886080,"instanceName":"KnrvVhwZOPgg","state":"开机","itemStyle":{"normal":{"color":"#0065C2"}}},{"id":24,"name":"test0531yan123","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":41943040,"instanceName":"KOJXWhWm2uDc","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":25,"name":"test0531yan12345","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":1,"vmRam":1048576,"vmTotalDiskCapacity":41943040,"instanceName":"KHlXWhxUSr2u","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":26,"name":"灾备控制机","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"云灾备测试","vmCpuCoreNum":4,"vmRam":4194304,"vmTotalDiskCapacity":null,"instanceName":"KkzxXhFmeOqe","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":27,"name":"灾备控制机","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"云灾备测试","vmCpuCoreNum":4,"vmRam":4194304,"vmTotalDiskCapacity":null,"instanceName":"Ko2yXhPSnlnU","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":28,"name":"灾备控制机","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"云灾备测试","vmCpuCoreNum":4,"vmRam":4194304,"vmTotalDiskCapacity":null,"instanceName":"KwDyXhpn6NXU","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":29,"name":"灾备控制机","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":null,"systemType":"Linux","applicationName":"云灾备测试","vmCpuCoreNum":4,"vmRam":4194304,"vmTotalDiskCapacity":null,"instanceName":"KVJyXh822qDK","state":"关机","itemStyle":{"normal":{"color":"#c22900"}}},{"id":30,"name":"f0120机柜集群02","category":1,"symbol":"rect","symbolSize":50,"type":"cluster","itemStyle":{"normal":{"color":"#040193"}}},{"id":31,"name":"ceph_13_01","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":4,"hostCpuUsed":0.12,"hostCpuLost":2.76,"hostRamSize":16413752,"hostRamUsedSize":13411772,"hostRamAvailableSize":3001980,"hostRamUsed":0.8171,"hostDiskTotalCapacityKB":3515088896,"hostDiskUsedKB":30268576,"hostDiskAvailableKB":3484820320,"hostDiskUsed":0.0086,"roleName":"存储节点","businessCnt":0,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":32,"name":"ceph_13_02","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":4,"hostCpuUsed":0.04,"hostCpuLost":0.16,"hostRamSize":16413752,"hostRamUsedSize":6855632,"hostRamAvailableSize":9558120,"hostRamUsed":0.4177,"hostDiskTotalCapacityKB":2927493120,"hostDiskUsedKB":6256616,"hostDiskAvailableKB":2921236504,"hostDiskUsed":0.0021,"roleName":"存储节点","businessCnt":0,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":33,"name":"ceph_13_03","category":2,"symbol":"roundRect","symbolSize":40,"type":"host","hostCpuCoreNum":4,"hostCpuUsed":0.13,"hostCpuLost":0.63,"hostRamSize":32928816,"hostRamUsedSize":8822440,"hostRamAvailableSize":24106376,"hostRamUsed":0.2679,"hostDiskTotalCapacityKB":2927493120,"hostDiskUsedKB":13823104,"hostDiskAvailableKB":2913670016,"hostDiskUsed":0.0047,"roleName":"存储节点","businessCnt":1,"connectStatus":"在线","itemStyle":{"normal":{"color":"#073CFE"}}},{"id":34,"name":"测试ceph","category":3,"symbol":"circle","symbolSize":30,"type":"vm","comment":"1","systemType":"Linux","applicationName":"测试应用名1","vmCpuCoreNum":2,"vmRam":2097152,"vmTotalDiskCapacity":null,"instanceName":null,"state":"关机","itemStyle":{"normal":{"color":"#c22900"}}}],
            links : [{"source":0,"target":1},{"source":1,"target":2},{"source":1,"target":3},{"source":1,"target":4},{"source":1,"target":5},{"source":5,"target":6},{"source":5,"target":7},{"source":5,"target":8},{"source":5,"target":9},{"source":5,"target":10},{"source":5,"target":11},{"source":5,"target":12},{"source":5,"target":13},{"source":5,"target":14},{"source":5,"target":15},{"source":5,"target":16},{"source":5,"target":17},{"source":5,"target":18},{"source":5,"target":19},{"source":5,"target":20},{"source":1,"target":21},{"source":21,"target":22},{"source":21,"target":23},{"source":21,"target":24},{"source":21,"target":25},{"source":21,"target":26},{"source":21,"target":27},{"source":21,"target":28},{"source":21,"target":29},{"source":0,"target":30},{"source":30,"target":31},{"source":30,"target":32},{"source":30,"target":33},{"source":4,"target":34}],//edges是其别名代表节点间的关系数据。
            categories: [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
                {
                    name: '区域',
                    symbol: 'diamond',
                    label: { //标签样式
                    }
                }, {
                    name: '集群',
                    symbol: 'rect'
                }, {
                    name: '宿主机',
                    symbol: 'roundRect'
                }, {
                    name: '云主机',
                    symbol: 'circle'
                }
            ]
        } ]
    }

    // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);


        }
    },
    mounted: function() {
        // console.log(this.$echarts)
        let myechart = this.$echarts.init(this.$refs.myechart) //初始化一个echarts
        myechart.setOption(this.option) //setOption 用this.option中的数据开始作图
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echart {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    /*定义echart的元素垂直居中*/
    justify-content: center;
    /*定义echart的里的元素水平居中*/
}

.HelloWorld {
    width: 1700px;
    height: 800px;
    background: #cce6f0;
}
</style>