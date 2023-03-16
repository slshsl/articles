# 前言

不久前写过一个优惠券的样式，主要涉及了内圆角及圆形锯齿；如下图所示;
![coupon.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c67b34fb8fc44ab785a05078900add66~tplv-k3u1fbpfcp-watermark.image?)
具体思路采用 before、after 伪元素实现；before 来实现内角边框，主要设置 border 加绝对定位实现；after 来实现锯齿，利用 background-image 加绝对定位实现；最近读到一篇关于 houdini 的文章，一时兴起，决定利用 houdini 实现一次。

## 实现内角边框

1. 假设内角半径为 r:10rpx,优惠券高度为 h;主要生成一个宽度为$2*r$，高度为$h+2*r$的伪元素，样式如下：

   ```css
   border-top: 20px dotted white;
   border-bottom: 20px dotted white;
   ```

2. 以优惠券左边区域为例，利用绝对定位，将伪元素移动到右边，样式如下：

   ```css
   top: -10px;
   right: -10px;
   ```

## 锯齿实现

1. 设置 background-image，利用径向渐变绘制小圆（3px）加一个间距(3px)，样式如下：

   ```css
   background-image: radial-gradient(
     3px at 3px 6px,
     transparent,
     transparent,
     transparent,
     transparent,
     #ff9500
   );
   ```

2. 设置 background-position、background-size、background-repeat，重复背景，样式如下：

   ```css
   background-position: 0px 0px;
   background-size: 3px 9px;
   background-repeat: repeat-y;
   ```

## Houdini 实现方式

## CSS Houdini 简介

Houdini 是一组底层 API，它们公开了 CSS 引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展 CSS。Houdini 是一组 API，它们使开发人员可以直接访问 CSS 对象模型（CSSOM），使开发人员可以编写浏览器可以解析为 CSS 的代码，从而创建新的 CSS 功能，而无需等待它们在浏览器中本地实现。
[CSS Houdini - Web 开发者指南 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Houdini)

## Paint API

### PaintWorklet

`PaintWorklet`可以对 css 的属性值期望是一个文件的 css 属性设置为通过编程的方式生成 image；通过 CSS 静态只读方法 paintWorklet 来访问这个接口。

1. 首先要通过`registerPaint()`注册一个 class,暂时先不管这个 class 如何定义，先关注如何访问这个接口
   PaintWorklet 继承 Worklet 接口，而 Worklet 是一种轻量的 Web Workers，所以和 Web Workers 一样，他需要一个独立的 js 文件，并通过`CSS.paintWorklet.addModule()`方法加载；
   该独立的 js 文件运行中的`globalThis`指向的是`PaintWorkletGlobalScope`，可以直接访问 registerPaint 方法。
2. 该 class 需要包含一个名称为`paint`的成员方法，该方法接受 3 个参数，context、geom、props;context 是一个类似 canvas 的渲染上下文对象，geom 是画布大小，props 是一个类似 map 的对象，里面存储自定义的 css 属性；接下来就可以利用 canvas 的知识来绘制该画布了
