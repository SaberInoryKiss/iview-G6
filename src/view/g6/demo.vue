
<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-15 11:45:31
 * @LastEditTime: 2019-12-20 09:12:23
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
import Util from "@antv/util";
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
		const Util = G6.Util;
      	const OFFSET = 20;
     	G6.registerBehavior("hoverItem", {
			getDefaultCfg() {
				return {
				item: 'node',
				formatText(model) { return model.label; }
				};
			},
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
				const self = this;
				if (!self.shouldBegin(e)) {
				return;
				}
				const item = e.item;
				self.currentTarget = item;
				self.showTooltip(e);
				self.graph.emit('tooltipchange', { item: e.item, action: 'show' });
			},
			onMouseMove(e) {
				if (!this.shouldUpdate(e)) {
				this.hideTooltip();
				return;
				}
				if (!this.currentTarget || e.item !== this.currentTarget) {
				return;
				}
				this.updatePosition(e);
			},
			onMouseLeave(e) {
				if (!this.shouldEnd(e)) {
				return;
				}
				this.hideTooltip();
				this.graph.emit('tooltipchange', { item: this.currentTarget, action: 'hide' });
				this.currentTarget = null;
			},
			showTooltip(e) {
				const self = this;
				if (!e.item) {
				return;
				}
				let container = self.container;
				if (!container) {
				container = self._createTooltip(self.graph.get('canvas'));
				self.container = container;
				}
				const text = self.formatText(e.item.get('model'), e);
				container.innerHTML = text;
				this.updatePosition(e);
				Util.modifyCSS(this.container, { visibility: 'visible' });
			},
			hideTooltip() {
				Util.modifyCSS(this.container, {
				visibility: 'hidden'
				});
			},
			updatePosition(e,type) {
				let left = "";
					let top = "";
					const { x, y } = this.graph.getCanvasByPoint(e.x, e.y);
					left = `${x + 20}px`;
					top = `${y + 10}px`;
					Util.modifyCSS(this.container, { left, top, visibility: "visible" });
			},
			_createTooltip(canvas) {
				const el = canvas.get('el');
				el.style.position = 'relative';
				const container = Util.createDom('<div class="g6-tooltip g6-' + this.item + '-tooltip"></div>');
				el.parentNode.appendChild(container);
				Util.modifyCSS(container, {
				position: 'absolute',
				visibility: 'visible'
				});
				this.width = canvas.get('width');
				this.height = canvas.get('height');
				this.container = container;
				return container;
			}
      	});

      G6.registerBehavior("activate-node", {
        getDefaultCfg() {
          return {
            multiple: true
          };
        },
        getEvents() {
          return {
            "node:click": "onNodeClick",
            "canvas:click": "onCanvasClick"
          };
        },
        onNodeClick(e) {
          const graph = this.graph;
          const item = e.item;
          if (item.hasState("active")) {
            graph.setItemState(item, "active", false);
            return;
          }
          // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
          if (!this.multiple) {
            this.removeNodesState();
          }
          // 置点击的节点状态为active
          graph.setItemState(item, "active", true);
        },
        onCanvasClick(e) {
          // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
          if (this.shouldUpdate(e)) {
            removeNodesState();
          }
        },
        removeNodesState() {
          graph.findAllByState("active").forEach(node => {
            graph.setItemState(node, "active", false);
          });
        }
      });
      G6.registerNode("customNode", {
        intersectBox: "circle" // 'circle', 'rect'
      });

      const data = {
        nodes: [
          {
            id: "node1",
            x: 500,
            y: 400,
            label: "node1"
          },
          {
            id: "node2",
            x: 900,
            y: 400,
            label: "node2"
          }
        ],
        edges: [
          {
            source: "node1",
            target: "node2",
            label: "边文本"
          }
        ]
      };

      const graph = new G6.Graph({
        container: "mountNode",
        width: 1500,
        height: 750,
        defaultNode: {
          size: [60, 60]
        },
        defaultEdge: {
          shape: "quadratic",
          style: {
            stroke: "#b5b5b5"
          }
        },
        modes: {
          default: ["drag-node", "zoom-canvas", "drag-canvas", "hoverItem"]
        }
      });
      graph.data(data);
      graph.render();
    }
  }
};
</script>
