//图形文件
import createAnchor from '../item/anchor';

const NODE_ISSUES = 'node-inner-issues';
export default function (G6) {
  G6.registerNode('base-node', {
    drawShape(cfg, group) {
      const { shapeType } = this;
      const style = this.getShapeStyle(cfg);
      const shape = group.addShape(shapeType, {
        attrs: {
          ...style,
        },
      });
      if (cfg.issues && cfg.issues.length > 0) {
        const attrs = {
          x: style.x + this.options.issueStyle.left,
          y: style.y + this.options.issueStyle.top,
          width: this.options.issueStyle.width,
          height: this.options.issueStyle.height,
        };

        group.issue = group.addShape('image', {
          attrs: {
            img: '../../assets/警告.svg',
            ...attrs,
          },
        });

        group.issue.set('className', NODE_ISSUES);
      }
      this.drawAnchor(cfg, group);
      return shape;
    },
    afterUpdate(cfg, item) {
      const group = item.getContainer();

      group.removeChild(group.issue);
      if (cfg.issues && cfg.issues.length > 0) {
        const style = this.getShapeStyle(cfg);
        const attrs = {
          x: style.x + this.options.issueStyle.left,
          y: style.y + this.options.issueStyle.top,
          width: this.options.issueStyle.width,
          height: this.options.issueStyle.height,
        };

        group.issue = group.addShape('image', {
          attrs: {
            img: '../../assets/警告.svg',
            ...attrs,
          },
        });

        group.issue.set('className', NODE_ISSUES);
      } else {
        group.removeChild(group.issue);
      }
    },
  }, 'node');
}



//这个是behavior 的

// shape.get('hasError')) 是针对边上的处理

// shape.get('className') === NODE_ISSUES 是针对节点的处理

import Util from '@antv/util';

const NODE_ISSUES = 'node-inner-issues';
// const OFFSET = 12;
export default function (G6) {
  G6.registerBehavior('hoverItem', {
    getEvents() {
      return {
        'node:mouseenter': 'onMouseEnter',
        'node:mousemove': 'onMouseMove',
        'node:mouseleave': 'onMouseLeave',
        'edge:mouseenter': 'onMouseEnter',
        'edge:mouseleave': 'onMouseLeave',
      };
    },
    onMouseEnter(e) {
      const shape = e.target;
      if ((shape.get('hasError')) && this.get('toolTipShow') === false) {
        this.showTooltip(e, 'edge');
        this.currentTarget = e.item;
      }
    },
    onMouseLeave(e) {
      this.hideTooltip();
      this.currentTarget = null;
    },
    onMouseMove(e) {
      const shape = e.target;
      if (shape.get('className') === NODE_ISSUES && this.get('toolTipShow') === false) {
        this.showTooltip(e, 'node');
        this.currentTarget = e.item;
      }
    },
    showTooltip(e, type) {
      if (!e.item) {
        return;
      }
      const { issues } = e.item.get('model');
      if (!issues || issues.length === 0) {
        return;
      }

      let { container } = this;
      if (!container) {
        container = this._createTooltip(this.graph.get('canvas'));
        this.container = container;
      }
      const text = this.formatText(issues, e);
      container.innerHTML = text;
      this.updatePosition(e, type);
      Util.modifyCSS(this.container, { visibility: 'visible' });
      this.set('toolTipShow', true);
    },
    hideTooltip() {
      this.set('toolTipShow', false);
      Util.modifyCSS(this.container, {
        visibility: 'hidden',
      });
    },
    _createTooltip(canvas) {
      const el = canvas.get('el');
      el.style.position = 'relative';
      const container = Util.createDom(`<div class="g6-tooltip g6-${this.item}-tooltip"></div>`);
      el.parentNode.appendChild(container);
      Util.modifyCSS(container, {
        position: 'absolute',
        visibility: 'visible',
      });
      this.width = canvas.get('width');
      this.height = canvas.get('height');
      this.container = container;
      return container;
    },
    updatePosition(e, type) {
      let left = '';
      let top = '';
      if (type === 'node') {
        left = `${e.canvasX}px`;
        top = `${e.canvasY + 10}px`;
      } else {
        const { x, y } = this.graph.getCanvasByPoint(e.x, e.y);
        left = `${x}px`;
        top = `${y + 10}px`;
      }
      Util.modifyCSS(this.container, { left, top, visibility: 'visible' });
    },
    formatText(issues) {
      const tooltip = issues.map(issue => (
        `Error Code ${issue.code}-${issue.message}`
      ));
      return tooltip.join('<br />');
    },
  });
}