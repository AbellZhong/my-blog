# JavaScript 异步编程全解析

在单线程的 JavaScript 世界里，异步是解决性能瓶颈的关键。本文从回调地狱到 Promise，再到 Async/Await，梳理异步编程的进化史。

## 回调地狱：金字塔式的噩梦
早期的异步操作主要依赖回调函数，但多层嵌套会导致代码可读性急剧下降：
```javascript
fetchDataA(function(a) {
  fetchDataB(a, function(b) {
    fetchDataC(b, function(c) {
      // 三层嵌套已经难以维护
    });
  });
});
```

这种 "回调地狱"（Callback Hell）本质上是控制流的线性表达与代码二维结构的矛盾。

## Promise：用链式调用重构控制流

ES6 引入的 Promise 将嵌套结构转化为链式调用：

```javascript
fetchDataA()
    .then(a => fetchDataB(a))
    .then(b => fetchDataC(b))
    .catch(error => console.error(error));
```