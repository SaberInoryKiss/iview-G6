<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-15 11:45:31
 * @LastEditTime: 2019-12-18 17:21:18
 * @LastEditors: Please set LastEditors
 * @UpdateLogs: logs
 -->
<style>
.g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>
 
<template>
    <div>
        <div id="mountNode" style="background:#fff"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
import img from "@/assets/images/gatewayOn.png"
export default {
    name: "start",
    created() {
        //不能在created方法中初始化
        //this.initG6()
    },
    mounted() {
        // img.onload = function() {
            this.initG6();
        // }
    },
    methods: {
        initG6() {
            // 设置锚点
            G6.registerNode('customNode', {
                intersectBox: 'circle', // 'circle', 'rect'
            });

            const data = {
                nodes: [{
                    id: 'node5',
                    x: 100,
                    y: 150,
                    label: '5',
                    size: 80
                },{
                    id: 'node6',
                    x: 400,
                    y: 150,
                    label: '6',
                    size: 50
                },{
                    id: 'node7',
                    x: 600,
                    y: 450,
                    label: '7',
                    size: 200
                }],
                edges: [{
                    source: 'node6',
                    target: 'node5',
                    shape: 'arc-edge',
                    edgeOffset: -50,
                    style: {
                        lineWidth: 10
                    }
                },
                {
                    source: 'node6',
                    target: 'node5',
                    shape: 'arc-edge',
                    edgeOffset: 50,
                    style: {
                        lineWidth: 10
                    }
                },
                {
                    source: 'node6',
                    target: 'node5',
                    shape: 'arc-edge',
                    edgeOffset: 30,
                    style: {
                        lineWidth: 10
                    }
                },
                {
                    source: 'node6',
                    target: 'node5',
                    shape: 'arc-edge',
                    edgeOffset: 10,
                    style: {
                        lineWidth: 10
                    }
                },
                {
                    source: 'node5',
                    target: 'node6',
                    shape: 'arc-edge',
                    edgeOffset: 100,
                    style: {
                        lineWidth: 5
                    }
                },
                {
                    source: 'node5',
                    target: 'node7',
                    shape: 'arc-edge',
                    edgeOffset: 1,
                    style: {
                        lineWidth: 1
                    }
                },
                {
                    source: 'node5',
                    target: 'node7',
                    shape: 'arc-edge',
                    edgeOffset: 1,
                    style: {
                        lineWidth: 1
                    }
                },
                {
                    source: 'node5',
                    target: 'node7',
                    shape: 'arc-edge',
                    edgeOffset: 1,
                    style: {
                        lineWidth: 1
                    }
                },
                {
                    source: 'node5',
                    target: 'node7',
                    shape: 'arc-edge',
                    edgeOffset: 1,
                    style: {
                        lineWidth: 1
                    }
                },
                {
                    source: 'node5',
                    target: 'node7',
                    shape: 'arc-edge',
                    edgeOffset: 1,
                    style: {
                        lineWidth: 1
                    }
                }]
            };

            const edges = data.edges
            let count = 0;
                edges.forEach(e => {
                if (e.source === 'node5' && e.target === 'node7') count++;
            });
                const edgeOffsetsFor57 = getOffsets(count, [-100, 100]);
                let osIndex = 0;
                edges.forEach(e => {
                if (e.source === 'node5' && e.target === 'node7') {
                e.edgeOffset = edgeOffsetsFor57[osIndex];
                osIndex++;
                }
            });

            // customize the edge
            G6.registerEdge('arc-edge', {
                itemType: 'edge',
                draw(cfg, group) {
                    let startPoint = cfg.startPoint;
                    let endPoint = cfg.endPoint;
                    const lineWidth = cfg.style.lineWidth;
                    const arrowLength = lineWidth * 2 + 5;
                    const arrowheight = lineWidth * 2 + 3;
                    const edgeOffset = cfg.edgeOffset;
                    const edgeOffsetSign = edgeOffset > 0 ? 1 : -1;
                    const midPoint = {
                    'x': (startPoint.x + endPoint.x) / 2, 
                    'y': (startPoint.y + endPoint.y) / 2
                    };
                    const vec = {
                    'x': endPoint.x - startPoint.x,
                    'y': endPoint.y - startPoint.y
                    };
                    const edgeAngle = Math.atan2(vec.y, vec.x);
                    const arcPoint = {
                    'x': edgeOffset * Math.cos((-Math.PI / 2 + edgeAngle)) + midPoint.x,
                    'y': edgeOffset * Math.sin((-Math.PI / 2 + edgeAngle)) + midPoint.y
                    }
                    const center = getCircleCenterByPoints(startPoint, arcPoint, endPoint);
                    const radius = length(startPoint, center);

                    const perimeter = 2 * Math.PI * radius;
                    const offsetArc = 10;
                    const startOffsetAngle = Math.PI * 2 * (cfg.sourceNode.getModel().size / 2 + offsetArc) / perimeter;
                    const endArrowOffsetAngle = Math.PI * 2 * (cfg.targetNode.getModel().size / 2 + offsetArc) / perimeter;
                    const endOffsetAngle = Math.PI * 2 * (cfg.targetNode.getModel().size / 2 + offsetArc + 0.8 * arrowLength) / perimeter;
                    const startAngle = Math.atan2(startPoint.y - center.y, startPoint.x - center.x);
                    const endAngle = Math.atan2(endPoint.y - center.y, endPoint.x - center.x);
                    const newStartAngle = startAngle + edgeOffsetSign * startOffsetAngle;
                    const newEndArrowAngle = endAngle - edgeOffsetSign * endArrowOffsetAngle; // the end point of arror
                    const newEndAngle = endAngle - edgeOffsetSign * endOffsetAngle; // the end point of the arc
                    // startPoint = {
                    //   'x': radius * Math.cos(newStartAngle) + center.x,
                    //   'y': radius * Math.sin(newStartAngle) + center.y
                    // }
                    const endArrowPoint = {
                    'x': radius * Math.cos(newEndArrowAngle) + center.x,
                    'y': radius * Math.sin(newEndArrowAngle) + center.y
                    }
                    endPoint = {
                    'x': radius * Math.cos(newEndAngle) + center.x,
                    'y': radius * Math.sin(newEndAngle) + center.y
                    }
                    let flag = 1;
                    if (edgeOffset < 0) flag = 0;
                    console.log(cfg.style.stroke);
                    const arc = group.addShape('path', {
                    attrs: {
                        stroke: '#aaa',
                        lineWidth,
                        path: [
                        [ 'M', startPoint.x, startPoint.y ],
                        [ 'A', radius, radius, 0, 0, flag, 
                        endPoint.x, endPoint.y]
                        ]
                    }
                    });
                    console.log(arc);
                    // arrow
                    let arrowAngle = (newEndAngle + newEndArrowAngle) / 2 - Math.PI / 2 ;
                    if (edgeOffsetSign > 0) arrowAngle = arrowAngle + Math.PI;
                    const upper = {
                    'x': -arrowLength * Math.cos(arrowAngle) - 0.5 * arrowheight * Math.sin(arrowAngle) + endArrowPoint.x,
                    'y': -arrowLength * Math.sin(arrowAngle) + 0.5 * arrowheight * Math.cos(arrowAngle) + endArrowPoint.y
                    }
                    const down = {
                    'x': -arrowLength * Math.cos(arrowAngle) + 0.5 * arrowheight * Math.sin(arrowAngle) + endArrowPoint.x,
                    'y': -arrowLength * Math.sin(arrowAngle) - 0.5 * arrowheight * Math.cos(arrowAngle) + endArrowPoint.y,
                    }
                    const endArrow = group.addShape('path', {
                    attrs: {
                        fill: '#aaa',
                        path: [
                        [ 'M', endArrowPoint.x, endArrowPoint.y ],
                        [ 'L', upper.x, upper.y],
                        [ 'L', down.x, down.y],
                        [ 'Z' ]
                        ],
                    }
                    });
                    console.log(group);
                    return arc;
                }
            });

            
            
            const graph = new G6.Graph({
                container: 'mountNode',
                width: 1500,
                height: 600,
                linkCenter: true,
                modes: {
                default: ['drag-canvas', 'zoom-canvas',"drag-node"]
                },
                // defaultEdge: {
                //   style: {
                //     lineWidth: 10,
                //     stroke: '#aaa',
                //     opacity: 1
                //   }
                // }
            });
            graph.data(data);
            graph.render();

              function getCircleCenterByPoints(p1, p2, p3) {
                const a = p1.x - p2.x;
                const b = p1.y - p2.y;
                const c = p1.x - p3.x;
                const d = p1.y - p3.y;
                const e = (p1.x * p1.x - p2.x * p2.x - p2.y * p2.y + p1.y * p1.y) / 2;
                const f = (p1.x * p1.x - p3.x * p3.x - p3.y * p3.y + p1.y * p1.y) / 2;
                const denominator = b * c - a * d;
                return {
                'x': -(d * e - b * f) / denominator,
                'y': -(a * f - c * e) / denominator
                }
            }
            function length(p1, p2) {
                const vx = p1.x - p2.x;
                const vy = p1.y - p2.y;
                return Math.sqrt(vx * vx + vy * vy);
            }

            function getOffsets(edgeNum, range) {
                const r = range[1] - range[0];
                const unit = r / edgeNum;
                const offsets = [];
                for (let i = 0; i < edgeNum; i++) {
                offsets.push(range[0] + i * unit);
                }
                return offsets;
            }
        }
    }
};


// import createAnchor from '../item/anchor';

// const NODE_ISSUES = 'node-inner-issues';
// export default function (G6) {
//   G6.registerNode('base-node', {
//     drawShape(cfg, group) {
//       const { shapeType } = this;
//       const style = this.getShapeStyle(cfg);
//       const shape = group.addShape(shapeType, {
//         attrs: {
//           ...style,
//         },
//       });
//       if (cfg.issues && cfg.issues.length > 0) {
//         const attrs = {
//           x: style.x + this.options.issueStyle.left,
//           y: style.y + this.options.issueStyle.top,
//           width: this.options.issueStyle.width,
//           height: this.options.issueStyle.height,
//         };

//         group.issue = group.addShape('image', {
//           attrs: {
//             img: '../../assets/警告.svg',
//             ...attrs,
//           },
//         });

//         group.issue.set('className', NODE_ISSUES);
//       }
//       this.drawAnchor(cfg, group);
//       return shape;
//     },
//     afterUpdate(cfg, item) {
//       const group = item.getContainer();

//       group.removeChild(group.issue);
//       if (cfg.issues && cfg.issues.length > 0) {
//         const style = this.getShapeStyle(cfg);
//         const attrs = {
//           x: style.x + this.options.issueStyle.left,
//           y: style.y + this.options.issueStyle.top,
//           width: this.options.issueStyle.width,
//           height: this.options.issueStyle.height,
//         };

//         group.issue = group.addShape('image', {
//           attrs: {
//             img: '../../assets/警告.svg',
//             ...attrs,
//           },
//         });

//         group.issue.set('className', NODE_ISSUES);
//       } else {
//         group.removeChild(group.issue);
//       }
//     },
//   }, 'node');
// }
</script>
