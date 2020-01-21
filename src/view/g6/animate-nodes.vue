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
    <h2>解释：本实例添加了节点动画以及线动画</h2>
    <div id="mountNode" style="background:#fff"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import img from "@/assets/images/gatewayOn.png";
import Util from "@antv/util";
export default {
  name: "start",
  created() {
    //不能在created方法中初始化
    //this.initG6()
  },
  mounted() {
    this.initG6();
  },
  methods: {
    initG6() {
      const Util = G6.Util;

      //绘制节点
      // 放大、变小动画
      G6.registerNode(
        "circle-animate",
        {
          afterDraw(cfg, group) {
            // 获取该节点上的第一个图形
            const shape = group.get("children")[0];
            // console.log(shape);
            const size = cfg.size;
            const width = size[0] - 12;
            const height = size[1] - 12;
            const image = group.addShape("image", {
              attrs: {
                x: (-2 * width) / 2,
                y: (-2 * height) / 2,
                width: 2 * width,
                height: 2 * height,
                img: cfg.img
              }
            });
            // 该图形的动画
            shape.animate(
              {
                // 动画重复
                repeat: true,
                // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                onFrame(ratio) {
                  // 先变大、再变小
                  const diff = ratio <= 0.5 ? ratio * 18 : (1 - ratio) * 18;
                  let radius = cfg.size;
                  if (isNaN(radius)) radius = radius[0];
                  // 返回这一帧需要变化的参数集，这里只包含了半径
                  return {
                    r: (1.5 * radius) / 2 + diff
                  };
                }
              },
              3000,
              "easeCubic"
            ); // 一次动画持续的时长为 3000，动画效果为 'easeCubic'
          }
        },
        "circle"
      ); // 该自定义节点继承了内置节点 'circle'，除了被复写的 afterDraw 方法外，其他按照 'circle' 里的函数执行。

      G6.registerNode(
        "background-animate",
        {
          afterDraw(cfg, group) {
            const size = cfg.size;
            const width = size[0] - 12;
            const height = size[1] - 12;
            const image = group.addShape("image", {
              attrs: {
                x: (-2 * width) / 2,
                y: (-2 * height) / 2,
                width: 2 * width,
                height: 2 * height,
                img: cfg.img
              }
            });

            let r = cfg.size / 2;
            if (isNaN(r)) {
              r = cfg.size[0] / 2;
            }
            // 第一个背景圆
            const back1 = group.addShape("circle", {
              zIndex: -3,
              attrs: {
                x: 0,
                y: 0,
                r,
                fill: cfg.color,
                opacity: 0
              }
            });
            // 第二个背景圆
            const back2 = group.addShape("circle", {
              zIndex: -2,
              attrs: {
                x: 0,
                y: 0,
                r,
                fill: "blue", // 为了显示清晰，随意设置了颜色
                opacity: 0
              }
            });
            // 第三个背景圆
            const back3 = group.addShape("circle", {
              zIndex: -1,
              attrs: {
                x: 0,
                y: 0,
                r,
                fill: "green",
                opacity: 0
              }
            });
            group.sort(); // 排序，根据 zIndex 排序

            // 第一个背景圆逐渐放大，并消失
            back1.animate(
              {
                r: r + 20,
                opacity: 0.1,
                repeat: true // 循环
              },
              3000,
              "easeCubic",
              null,
              0
            ); // 无延迟

            // 第二个背景圆逐渐放大，并消失
            back2.animate(
              {
                r: r + 20,
                opacity: 0.1,
                repeat: true // 循环
              },
              3000,
              "easeCubic",
              null,
              1000
            ); // 1 秒延迟

            // 第三个背景圆逐渐放大，并消失
            back3.animate(
              {
                r: r + 20,
                opacity: 0.1,
                repeat: true // 循环
              },
              3000,
              "easeCubic",
              null,
              2000
            ); // 2 秒延迟
          }
        },
        "circle"
      );



    //   const NODE_ISSUES = 'node-inner-issues';
      // const OFFSET = 12;
      G6.registerBehavior("hoverItem", {
        getEvents() {
          return {
            "node:mouseenter": "onMouseEnter",
            "node:mousemove": "onMouseMove",
            "node:mouseleave": "onMouseLeave",
            "edge:mouseenter": "onMouseEnter",
            "edge:mouseleave": "onMouseLeave"
          };
        },
        onMouseEnter(e) {
          const shape = e.target;
        //   console.log(e)
        //   if (shape.get("hasError") && this.get("toolTipShow") === false) {
            this.showTooltip(e, "edge");
            this.currentTarget = e.item;
        //   }
        },
        onMouseLeave(e) {
            // console.log(this)
          this.hideTooltip();
          this.currentTarget = null;
        },
        onMouseMove(e) {
          const shape = e.target;
        //   if (
        //     shape.get("className") === NODE_ISSUES &&
        //     this.get("toolTipShow") === false
        //   ) {
            this.showTooltip(e, "node");
            this.currentTarget = e.item;
        //   }
        },
        showTooltip(e, type) {
          if (!e.item) {
            return;
          }
          const { issues } = e.item.get("model");
          if (!issues || issues.length === 0) {
            return;
          }

          let { container } = this;
          if (!container) {
            container = this._createTooltip(this.graph.get("canvas"));
            
            this.container = container;
          }
          const text = this.formatText(issues, e);
          container.innerHTML = text;
          this.updatePosition(e, type);
          Util.modifyCSS(this.container, { visibility: "visible" });
          this.set("toolTipShow", true);
          console.log(this)
        },
        hideTooltip() {
          this.set("toolTipShow", false);
          Util.modifyCSS(this.container, {
            visibility: "hidden"
          });
        },
        _createTooltip(canvas) {
          const el = canvas.get("el");
          el.style.position = "relative";
          const container = Util.createDom(
            `<div class="g6-tooltip g6-${this.item}-tooltip"></div>`
          );
          el.parentNode.appendChild(container);
          Util.modifyCSS(container, {
            position: "absolute",
            visibility: "visible"
          });
          this.width = canvas.get("width");
          this.height = canvas.get("height");
          this.container = container;
          return container;
        },
        updatePosition(e, type) {
          let left = "";
          let top = "";
          if (type === "node") {
            left = `${e.canvasX}px`;
            top = `${e.canvasY + 10}px`;
          } else {
            const { x, y } = this.graph.getCanvasByPoint(e.x, e.y);
            left = `${x}px`;
            top = `${y + 10}px`;
          }
          Util.modifyCSS(this.container, { left, top, visibility: "visible" });
        },
        formatText(issues) {
          const tooltip = issues.map(
            issue => `Error Code ${issue.code}-${issue.message}`
          );
          return tooltip.join("<br />");
        }
      });

      G6.registerBehavior('activate-node', {
        getDefaultCfg() {
            return {
            multiple: true
            };
        },
        getEvents() {
            return {
            'node:click': 'onNodeClick',
            'canvas:click': 'onCanvasClick'
            };
        },
        onNodeClick(e) {
            const graph = this.graph;
            const item = e.item;
            if (item.hasState('active')) {
            graph.setItemState(item, 'active', false);
            return;
            }
            // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
            if (!this.multiple) {
            this.removeNodesState();
            }
            // 置点击的节点状态为active
            graph.setItemState(item, 'active', true);
        },
        onCanvasClick(e) {
            // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
            if (this.shouldUpdate(e)) {
            removeNodesState();
            }
        },
        removeNodesState() {
            graph.findAllByState('active').forEach(node => {
                graph.setItemState(node, 'active', false);
            });
        }  
});

      G6.registerNode(
        "inner-animate",
        {
          afterDraw(cfg, group) {
            const size = cfg.size;
            const width = size[0] - 12;
            const height = size[1] - 12;
            const image = group.addShape("image", {
              attrs: {
                x: (-2 * width) / 2,
                y: (-2 * height) / 2,
                width: 2 * width,
                height: 2 * height,
                img: cfg.img
              }
            });

            image.animate(
              {
                onFrame(ratio) {
                  // 旋转通过矩阵来实现
                  const matrix = Util.mat3.create();
                  const toMatrix = Util.transform(matrix, [
                    ["r", ratio * Math.PI * 2]
                  ]);
                  return {
                    matrix: toMatrix
                  };
                },
                repeat: true
              },
              3000,
              "easeCubic"
            );
          }
        },
        "circle"
      );

      //绘制边
      G6.registerEdge(
        "circle-running",
        {
          afterDraw(cfg, group) {
            // console.log(cfg)
            const shape = group.get("children")[0];
            const startPoint = shape.getPoint(0);
            // 添加红色圆点
            const circle = group.addShape("marker", {
              attrs: {
                x: startPoint.x,
                y: startPoint.y,
                fill: "blue",
				r: 3,
				// symbol: 'triangle'
				symbol: function(x, y, r) {
					return [['M', x, y], ['L', x - 2 * r, y - r], ['L', x - 2 * r , y + r], ['L', x , y],
					// ['M', x + 2 * r, y], ['L', x + 4 * r, y + r], ['L', x + 4 * r, y - r], ['Z']
					];

				},
              }
            });

            // 对红色圆点添加动画
            circle.animate(
              {
                repeat: true,
                onFrame(ratio) {
                  const tmpPoint = shape.getPoint(ratio);
                  return {
                    x: tmpPoint.x,
                    y: tmpPoint.y
                  };
                }
              },
              3000
            );
          }
        },
        "cubic"
      );

      // lineDash 的差值，可以在后面提供 util 方法自动计算
      const dashArray = [
        [0, 1],
        [0, 2],
        [1, 2],
        [0, 1, 1, 2],
        [0, 2, 1, 2],
        [1, 2, 1, 2],
        [2, 2, 1, 2],
        [3, 2, 1, 2],
        [4, 2, 1, 2]
      ];

      const lineDash = [4, 2, 1, 2];
      const interval = 9; // lineDash 的和
      G6.registerEdge(
        "line-dash",
        {
          afterDraw(cfg, group) {
            const shape = group.get("children")[0];
            const length = shape.getTotalLength();
            let totalArray = [];
            // 计算出整条线的 lineDash
            for (var i = 0; i < length; i += interval) {
              totalArray = totalArray.concat(lineDash);
            }

            let index = 0;
            shape.animate(
              {
                onFrame(ratio) {
                  const cfg = {
                    lineDash: dashArray[index].concat(totalArray)
                  };
                  index = (index + 1) % interval;
                  return cfg;
                },
                repeat: true
              },
              3000
            );
          }
        },
        "cubic"
      );

      G6.registerEdge(
        "line-growth",
        {
          afterDraw(cfg, group) {
            const shape = group.get("children")[0];
            const length = shape.getTotalLength();
            console.log(length);
            shape.animate(
              {
                onFrame(ratio) {
                  const startLen = ratio * length;
                  // 计算线的lineDash
                  const cfg = {
                    lineDash: [startLen, length - startLen]
                  };
                  return cfg;
                },
                repeat: true
              },
              2000
            );
          }
        },
        "cubic"
      );

      //自定义直线箭头
      // G6.registerEdge("line-arrow", {
      //     itemType: "edge",
      //     draw: function draw(cfg, group) {
      //         //定义起点终点
      //         var startPoint = cfg.startPoint,
      //             endPoint = cfg.endPoint;
      //         //绘制图形
      //         var keyShape = group.addShape("path", {
      //             attrs: {
      //                 path: [
      //                     ["M", startPoint.x, startPoint.y],
      //                     ["L", endPoint.x, endPoint.y]
      //                 ],
      //                 stroke: "#0CC",
      //                 lineWidth: 1,
      //                 // startArrow: {
      //                 //     path: "M 10,0 L -10,-10 L -10,10 Z",
      //                 //     d: 30
      //                 // },
      //                 endArrow: {
      //                     path: "M 5,0 L -5,-5 L -5,5 Z",
      //                     d: 25
      //                 }
      //             }
      //         });
      //         return keyShape;
      //     }
      // });

      var graph = new G6.Graph({
        container: "mountNode",
        width: 1500,
        height: 750,
        linkCenter: true,
        defaultNode: {
          size: [40, 40],
          labelCfg: {
            autoRotate: true,
            refY: -10
          }
        },
        defaultEdge: {
          shape: "arc",
          labelCfg: {
            autoRotate: true,
            refY: -10
          },
          style: {
            stroke: "#088",
            endArrow: false,
            lineAppendWidth: 12
          }
        },
        modes: {
          // 支持的 behavior
          default: ["drag-node", "hoverItem",'activate-node','drag-canvas', 'zoom-canvas']
        }
      });

      const data = {
        nodes: [
          {
            id: "node0",
            x: 100,
            y: 350,
            shape: "base-node"
          },
          {
            id: "node1",
            x: 400,
            y: 350,
            shape: "circle-animate",
            img: img,
            style: {
              stroke: "#000",
              lineWidth: 0
            }
          },
          {
            id: "node2",
            x: 700,
            y: 350,
            style: {
              fill: "red",
              opacity: 0
            },
            shape: "background-animate",
            img: img
          },
          {
            id: "node3",
            x: 700,
            y: 150,
            shape: "inner-animate",
            img: img,
            style: {
              fill: "#fff",
              stroke: "#fff", //外框线颜色
              lineWidth: 1 //外框线宽度
            }
          },
          {
            id: "node4",
            x: 1000,
            y: 350
          }
        ],
        edges: [
          {
            source: "node0",
            target: "node1",
            shape: "circle-running"
            // style: {
            //     startArrow:true,
            //     endArrow: true
            // },
          },
          {
            source: "node1",
            target: "node2",
            shape: "line-dash"
          },
          {
            source: "node3",
            target: "node2",
            shape: "line-growth"
          },
          {
            source: "node2",
            target: "node4",
            label: "curveOffset = 20",
            curveOffset: 20,
            style: {
              startArrow: true,
              endArrow: true
            }
          },
          {
            source: "node2",
            target: "node4",
            label: "curveOffset = 0",
            curveOffset: 50,
            // shape: 'line-arrow',
            style: {
              endArrow: true
            }
          },
          {
            source: "node2",
            target: "node4",
            label: "curveOffset = -20",
            curveOffset: -20
          },
          {
            source: "node2",
            target: "node4",
            label: "curveOffset = -50",
            curveOffset: -50
          }
        ]
      };

      graph.data(data);
      graph.render();

      // 鼠标进入节点
    //   graph.on("node:mouseenter", e => {
    //     const nodeItem = e.item; // 获取鼠标进入的节点元素对象
    //     graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
    //   });

    //   // 鼠标离开节点
    //   graph.on("node:mouseleave", e => {
    //     const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    //     graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
    //   });
    }
  }
};
</script>

