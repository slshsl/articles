# 小例子之主页面中嵌入 iframe 子页面情况下 DOMContentLoaded 与 load 事件

## 执行顺序

1. 主页面 DOMContentLoaded
2. 子页面 DOMContentLoaded
3. 子页面 load
4. 主页面 load

## 结论

1. iframe 会延迟主页面的 load 事件触发，必须子页面的所有资源加载完成之后才会触发
2. iframe 不会延主页面的 DOMContentLoaded 事件触发
