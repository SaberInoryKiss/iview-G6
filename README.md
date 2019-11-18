## 说明模拟数据mock
现在项目中开启了模拟数据mock
实际打包时应该不引入mock,关闭mock（项目->main.js->18行）注释掉
  if (process.env.NODE_ENV !== 'production') require('@/mock')

## 配置调试地址本地或者线上测试
项目->config->index.js文件-21行到24行baseUrl）
  baseUrl: {
    dev: 'http://localhost:8080/', //dev:开发环境ajax地址
    pro: 'https://xxx.realDomain.com/' //pro：生产环境ajax地址
  },

## Getting started
```bush
# clone the project
git clone https://github.com/iview/iview-admin.git

//使用淘宝镜像加速
npm install -g cnpm --registry=https://registry.npm.taobao.org

// install dependencies
cnpm install

// develop
cnpm run dev
```

## Build-打包成功在dist目录
```bush
cnpm run build
```

