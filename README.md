<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-03-03 20:07:32
 * @LastEditTime: 2019-11-18 11:11:48
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
# iview G6

>在每一次艰难的旅途中，别人给予我的帮助就像沙漠中的一杯水一样珍重，感谢那些帮助过我的好人，谢谢~

> 账号：admin 密码123

为了方便，还没有做全局路由钩子，因此可直接输入路由地址访问。
## 实现功能
- G6相关拓扑图的学习实例
- Echart相关拓扑的学习实例
- 用户管理：是我学习做前后端联调的记录，基本就是写增删改查

## 示例
![image](https://github.com/SaberInoryKiss/iview-G6/blob/master/src/assets/screenShots/1.png)
![image](https://github.com/SaberInoryKiss/iview-G6/blob/master/src/assets/screenShots/2.png)
![image](https://github.com/SaberInoryKiss/iview-G6/blob/master/src/assets/screenShots/3.png)
![image](https://github.com/SaberInoryKiss/iview-G6/blob/master/src/assets/screenShots/4.png)

## 说明模拟数据mock
现在项目中开启了模拟数据mock

实际打包时应该不引入mock,关闭mock（项目->main.js->18行）注释掉
```
//if (process.env.NODE_ENV !== 'production') require('@/mock')
```
 
## 配置调试地址本地或者线上测试
项目->config->index.js文件-21行到24行baseUrl）
```
  baseUrl: {
    dev: 'http://localhost:8080/', //dev:开发环境ajax地址
    pro: 'https://xxx.realDomain.com/' //pro：生产环境ajax地址
  },
 ```

## 构建步骤

需要安装nodejs 通过npm命令操作
``` bash
# 拷贝到本地
git clone https://github.com/SaberInoryKiss/iview-G6.git

# npm安装所有依赖
npm install  

# npm启用本地开发服务器
npm run dev  

# npm打包，生成的静态页面在项目的dist文件夹下
npm run build  
```

## 参考
- [iview-admin精简版本](https://github.com/hsj-xiaokang/iview-admin-simplify) 
- [iview](http://v1.iviewui.com/) 
- [G6官方文档](https://www.yuque.com/antv/g6/slulu0) 
- [Echart官方文档](https://www.echartsjs.com/zh/index.html) 

## License
[Echart官方文档](https://github.com/antvis/g6/blob/master/LICENSE) 