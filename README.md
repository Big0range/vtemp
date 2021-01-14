# vtemp 说明文档

## GitHub repository

[vtemp](https://github.com/Big0range/vtemp)

[vue-template](https://github.com/Big0range/vue-template)

有意见或者建议请提 issues

## 安装

yarn:

```
yarn add  vtemp
```

npm:

```
npm install vtemp
```

## 创建项目

目前仅支持vue+typescript, 后续可能支持创建非typescript的vue项目

```yaml
vtemp create  <project>   # 例如 vtemp create my-vtemp
```



**目录结构**

├─public  html模板以及ico
├─src
│  ├─api  接口请求assets
│  ├─assets  静态资源目录components
│  ├─components   公共组件
│  ├─router 自动化处理路由配置文件
│  ├─store  vuex-store
│  ├─view 页面目录

## 项目开发

项目开发目前提供如下功能：

- 创建Vue组件 默认目录 src/components   

- 创建Vue页面，并配置路由  默认目录 src/views

- 创建Axios封装模块(request) 默认目录 src/utils

- 创建Api(request接口请求模板) 默认目录 src/api

可选参数:

```yaml
-d --dest <dest>                       create path (文件创建地址)
-t --type <type>                       create type , js or ts (文件创建类型, js或者ts)
```



### 创建Vue组件：

  ```yaml
vtemp component <componentName> # 例如vtemp component NavBar，默认会存放到src/components文件夹中
  ```

### 创建Vue页面，并配置路由

```yaml
vtemp page <filename> # vtemp page Home，默认会放到src/pages/Home/Home.vue中，并且会创建src/views/Home/router.js
vtemp page <filename> -d src/views2 -t ts # 也可以指定文件夹和类型，但指定文件夹需要手动集成路由
```

**注意:**

组件以及页面指定类型js或ts需统一

如果您选择的是js(默认), 需要去`src/router/index.ts`中做如下修改

![](https://pic.rmb.bdstatic.com/bjh/241f9d3b29193acb79f591cc0636a4f0.png)

### 创建Axios封装模块(request)

```yaml
vtemp request # 例如 vtemp request，默认会放到src/utils中
vtemp request -d src/axios # 也可以指定文件夹
```

### 创建Api(request接口请求模板)

```yaml
vtemp api <filename> # 例如 vtemp api Home，默认会放到src/api中,生成Home.js文件
vtemp api <filename> -d ./api -t ts # 也可以指定文件夹和类型
```

## 历史版本

### 1.0.0

第一版,勉强能用 创建api指定类型存在问题

### 1.0.1

修复第一版的bug, 并且顺手写了个文档



# English Documentation

阿巴阿巴阿巴~

## I don't know English

**I don't know English, thanks~**