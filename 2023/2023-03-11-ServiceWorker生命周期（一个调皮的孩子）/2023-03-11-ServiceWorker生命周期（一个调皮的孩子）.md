![avatar](./assets/banner.png)

# 前言

本文主要讲`ServiceWorker`的生命周期，以解决在阅读 MDN 官网上描述[Registering your worker](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FService_Worker_API%2FUsing_Service_Workers%23registering_your_worker "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#registering_your_worker")的示例中碰到的一点疑惑，以及为什么`ServiceWorker`多了一个`waiting`状态；请大家指正。

# ServiceWorker 三剑客

本段主要通过注册`ServiceWorker`来引出`ServiceWorkerContainer`、`ServiceWorkerRegistration`、`ServiceWorker`这 3 个接口。
假如通过一个`register.js`文件来注册`ServiceWorker`，代码如下（下面的代码主要是为了更好的观察`serviceWorker`的状态变化）：

```javascript {.line-numbers}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then((registration) => {
    registration.addEventListener("updatefound", () => {
      let curUpdateWorker = registration.installing;
      console.log(
        `当前更新的serviceWorker目前的状态为${curUpdateWorker.state}`
      );
      curUpdateWorker.addEventListener("statechange", (e) => {
        console.log(`当前更新的serviceWorker目前的状态变更为${e.target.state}`);
        if (e.target.state === "actived") {
          console.log("更新完成，已接管页面.");
        }
      });
    });
  });
} else {
  console.error("Service worker are not supported!");
}
```

在上面代码中`navigator.serviceWorker`是一个`ServiceWorkerContainer`的实例，可以简单理解为`serviceWorker`的容器或者工厂，以下用`swC`来表示它的实例。

通过`swC`的`register`方法注册一个`ServiceWorker`,该方法返回一个`promise`,该`promise resolve`的返回值是一个`ServiceWorkerRegistration`的实例，对应上面代码中的`registration`，以下就用`swR`来表示`ServiceWorkerRegistration`的实例。
`ServiceWorker`是一个继承[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)的类。以下用`sw`来表示它的实例。我们可以从`swC.controller`（当前页面激活的 sw）或者`swR.installing`、`swR.waiting`、`swR.activate`来获得处于不同状态的`sw`。

# 注册过程

先简单说一下`sw`的几个状态，以方便讲解其注册过程，详细的状态后面会提到；`sw`的`state`属性保存了`sw`的状态，主要有：

- `installing`：正在安装
- `installed`：安装完成
- `activated`：已激活

  当第一次注册的过程中会触发 `swR`的`updatefound`事件，在该事件中，我们可以从`swR.installing`拿到正在安装的`sw`（该`sw`此时状态为`installing`）并注册该`sw`的`stateChange`事件；此时`swR.waiting`、`swR.activate`都为`null`；观察`sw`状态最后变为`activated`（先暂时不描述状态变化的详细过程），此时`swR.installing`、`swR.waiting`都为`null`,`swR.activate`为我们之拿到的`sw`。

  **概述来讲，注册的`sw`会随着它的状态的变化，不断的在`swR`的`installing`、`waiting`、`activate`这三个属性中擦肩而过；当`sw.state`为`installing`时，它跑到了`swR.installing`这里，当`sw.state`为`installed`时，它跑到了`swR.waiting`那里，当`sw.state`为`activated`时，停在了`swR.activate`；就像一个调皮的孩子玩累了回到了家。这时该`sw`已经控制了后续的事件。**

> 在 MDN web 官网上描述[Registering your worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#registering_your_worker)的部分是我想写这篇文章的原因，当我看到它的示例代码时，代码如下：

```javascript {.line-numbers}
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
// …
registerServiceWorker();
```

上面的代码容易让人觉得这三个属性的值不会同时存在，也许官网以此例子来讲解`sw`的状态变化；至于如何注册`sw`，在 MDN web 官网上描述[ServiceWorkerContainer](<https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer#:~:text=if%20(%22serviceWorker,)%3B%0A%7D>)中给出的注册`sw`更为合适,代码如下：

```javascript {.line-numbers}
if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service worker registration succeeded:", registration);
      // At this point, you can optionally do something
      // with registration. See https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
    })
    .catch((error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
  // Independent of the registration, let's also display
  // information about whether the current page is controlled
  // by an existing service worker, and when that
  // controller changes.
  // First, do a one-off check if there's currently a
  // service worker in control.
  if (navigator.serviceWorker.controller) {
    console.log(
      "This page is currently controlled by:",
      navigator.serviceWorker.controller
    );
  }
  // Then, register a handler to detect when a new or
  // updated service worker takes control.
  navigator.serviceWorker.oncontrollerchange = () => {
    console.log(
      "This page is now controlled by",
      navigator.serviceWorker.controller
    );
  };
} else {
  console.log("Service workers are not supported.");
}
```

可能是我又较真了，人家不就是给个例子嘛；是的，所以不要在意，正好也借此深入了解。

# 更新过程

在第一次注册完成后，当前存在`activated`的`sw`；此时，假设我们改变了注册的`sw.js`文件中的内容，[这时浏览器在拿到新的 sw.js 文件后，内部去 diff 是否需要更新 sw](<https://web.dev/learn/pwa/service-workers/#:~:text=Service%20workers%20get%20updated%20when%20the%20browser%20detects%20that%20the%20service%20worker%20currently%20controlling%20the%20client%20and%20the%20new%20(from%20your%20server)%20version%20of%20the%20same%20file%20are%20byte%2Ddifferent.>)。更新过程也会触发`swR`的`updatefound`事件。与第一次注册过程中不同的是，新的`sw`的状态变化到`installed`(安装完成)后，就一直等待，因为当前存在`activated`的`sw`，无法进入下面的状态。
**这时`swR.waiting`、`swR.activate`上都有值，`swR.waiting`对应着新的`sw`，`swR.activate`对应着老的`sw`。**
然后需要关闭该页面（此时刷新页面没有用，原因后面或则下一篇文章会提到，也可以参考下[web.dev 中 Service workers 这篇文章的这个段落](https://web.dev/learn/pwa/service-workers/#:~:text=After%20a%20successful,for%20more%20information.)，简单来讲就是浏览器从一个旧的过渡到新的`sw`是平滑的过度），然后再打开，新的`sw`才会过渡到`activated`状态，接管后续的事件。

> 当然有解决方案可以实现刷新页面就可以使新的`sw`激活（通过`self.skipWaiting()`与`swC`的`controllerchange`事件回调实现），也有解决方案可以实现不刷新页面也可以使新的`sw`激活(通过`self.skipWaiting()`与`clients.claim()`实现）；后续也许会单独出一章节来详细讲解。本篇文章主要讲解`sw`在其生命周期里状态变化的过程中，`swR.installing`、`swR.waiting`、`swR.activate`的三个属性值的变化情况。
> **以上主要说明`swR.installing`、`swR.waiting`、`swR.activate`会出现两个同时有值，且对应不同的`sw`，目前个人理解以上三个属性不会出现同时有值的逻辑。**

# ServiceWorker 实例

`sw`的`state`属性一共有以下 6 个取值：

- `parsed`：永远不会被`sw`的`stateChange`事件监听到
- `installing`：表示该`sw`正在安装
- `installed`：表示该`sw`安装完成，此状态经常被称为`waiting`状态

  > [The service worker in this state is considered a waiting worker.](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state#:~:text=The%20service%20worker%20in%20this%20state%20is%20considered%20a%20waiting%20worker.)
  > 这里需要强调一下，网上看了许多`PWA`的文章，主要描述`sw`在安装成功后一直处于`waiting`状态，这里就比较模糊，需要特殊说明一下，这个`waiting`状态实际上是`installed`状态。之所以也可以称为`waiting`状态，是因为`swR`中用`waiting`属性会保存`installed`状态的`sw`的引用。这也是我写这篇文章的另一个原因，网上大部分的文章都提到`sw`会有可能一直处于`waiting`的状态，这是为什么呢？[官网上给出的状态没有这个 waiting 状态](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker/state#:~:text=ServiceWorker%20%E6%8E%A5%E5%8F%A3%E7%9A%84%E8%BF%99%E4%B8%AA%E5%8F%AA%E8%AF%BB%E7%9A%84state%E5%B1%9E%E6%80%A7%E8%BF%94%E5%9B%9E%E4%B8%80%E4%B8%AA%E4%BB%A3%E8%A1%A8%20service%20worker%20%E5%BD%93%E5%89%8D%E7%8A%B6%E6%80%81%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%E3%80%82%E5%80%BC%E5%8F%AF%E4%BB%A5%E6%98%AF%E4%BB%A5%E4%B8%8B%E8%BF%99%E4%BA%9B%EF%BC%9Ainstalling%2C%20installed%2C%20activating%2C%20activated%EF%BC%8C%E6%88%96%E8%80%85%E6%98%AF%20redundant.)，所以仔细阅读了官网，给出了上面的解释，希望能帮到同样困惑的小伙伴。

- `activating`：表示该`sw`正在激活中
- `activated`：该状态表示当前`sw`已经准备好接管事件（`fetch`等）
- `redundant`：表示该`sw`已被丢弃。发生的场景一般有三个：
  1. 当前的`sw`安装失败
  2. 当前存在`activated`的`sw`，也存在`waiting`状态的`sw`（此场景比较好解释，比如第一次注册成功后，假设改变了注册的`sw.js`文件中的内容，触发`sw`第一次更新（假设没有通过`self.skipWaiting()`使其跳过`installed`状态，一直处于`waiting`状态），此时又接着改变`sw.js`文件中的内容，触发`sw`的第二次更新，则之前第一次更新后一直处于`waiting`状态的`sw`状态变为`redundant`
  3. 当前存在`activated`状态的`sw`，不存在`waiting`状态的`sw`（此场景也比较好解释，比如，假设改变了注册的`sw.js`文件中的内容，触发`sw`第一次更新，并且使用了`self.skipWaiting()`使其跳过`waiting`,通过刷新页面或者`clients.claim()`使其进入`activated`状态，则之前活跃的`sw`被丢弃）。

# ServiceWorker 生命周期

- `install`：此时`sw`状态处于`installing`,该回调只发生一次。

  > [The install event is the first event a service worker gets, and it only happens once.](https://web.dev/service-worker-lifecycle/#:~:text=The%20install%20event%20is%20the%20first%20event%20a%20service%20worker%20gets%2C%20and%20it%20only%20happens%20once.)
  > 一般来处理预加载哪些资源缓存到`cache storage`中；也可以在该回调内执行`self.skipWaiting()`使其跳过`waiting`状态。

  ```javascript {.line-numbers}
  self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.addAll(REQUESTS_EXPECTED_CACHE))
    );
  });
  ```

- `activate`：此时`sw`状态处于`activating`。  
  一般来清理旧版本`sw`缓存的资源，也可以在该回调内执行`clients.claim()`使其不刷新页面就可以接管页面（此处可能会有一些问题，暂不展开）。

  ```javascript {.line-numbers}
  self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (CACHE_NAME !== key) {
              return caches.delete(key);
            } else {
              return caches
                .open(CACHE_NAME)
                .then((cache) => cache.addAll(REQUESTS_EXPECTED_CACHE));
            }
          })
        );
      })
    );
    event.waitUntil(clients.claim());
  });
  ```

- `fetch`：此时`sw`状态处于`activated`。
  监听请求事件，有多种策略可以选择，这里不作过多的描述。

  ```javascript {.line-numbers}
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response !== undefined) {
          return response;
        } else {
          return fetch(event.request)
            .then((response) => {
              let responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            .catch(() => {
              return new Response("", { status: 404 });
            });
        }
      })
    );
  });
  ```

# ServiceWorker 生命周期过程中的状态变化完整代码

- `register.js`：采用通知用户有新数据更新，将是否更新交给用户来决定

  ```javascript {.line-numbers}
  if ("serviceWorker" in navigator) {
    // 数据有更新，需要通知用户，来触发skipWaiting
    function postSkipWaiting(curWaitingWorker) {
      console.log("提示用户更新");
      if (window.confirm("站点数据有更新，请手动刷新!")) {
        curWaitingWorker.postMessage("skipWaiting");
      }
    }
    navigator.serviceWorker.register("./sw.js").then((registration) => {
      //当前活跃的serviceWorker
      let curActiveWorker = navigator.serviceWorker.controller;
      //上次更新，已安装完成，处于installed状态，一直等待激活的serviceWorker
      let curWaitingWorker = registration.waiting;

      // 如果用户在第一次更新提示没有选择更新，而是手动刷新页面，则再次弹出提示
      if (
        curWaitingWorker &&
        curActiveWorker &&
        curWaitingWorker !== curActiveWorker // 只是逻辑洁癖，如果两个都存在，应该不相等
      ) {
        postSkipWaiting(curWaitingWorker);
      }
      // 有serviceWorker更新发生
      registration.addEventListener("updatefound", () => {
        // 下面三个变量不可能同时存在,curUpdateWorker一定存在
        // 当前更新的serviceWorker
        let curUpdateWorker = registration.installing;
        // 当前活跃的serviceWorker
        curActiveWorker = registration.active;
        // 上次更新，已安装完成，处于installed状态，一直等待激活的serviceWorker
        curWaitingWorker = registration.waiting;
        console.log(
          `当前更新的serviceWorker目前的状态为${curUpdateWorker.state}`
        );
        if (curWaitingWorker && curWaitingWorker !== curUpdateWorker) {
          curWaitingWorker.addEventListener("statechange", (e) => {
            // 当前安装新的serviceWorker时,如果存在上次更新未最后激活的而一直处于waiting状态的serviceWoker
            // 那么这个之前处于waiting状态的serviceWoker应该被标记为多余状态redundant
            console.log(
              `上次更新未最后激活的而一直处于waiting状态的serviceWoker被标记为${e.target.state}`
            );
          });
        }
        curUpdateWorker.addEventListener("statechange", (e) => {
          // 监听状态改变
          console.log(
            `当前更新的serviceWorker目前的状态变更为${e.target.state}`
          );
          // 当前存在活跃的serviceWorker，当前更新的serviceWorker已安装完毕处于installed,可以提示用户更新
          if (
            curActiveWorker &&
            curActiveWorker !== e.target &&
            e.target.state === "installed" //注意这里不要写成了waiting
          ) {
            postSkipWaiting(e.target);
          }
          if (e.target.state === "actived") {
            // 当前更新的serviceWorker变为活跃的，已接管页面与事件
            console.log("当前更新的serviceWorker已完成.");
          }
        });
      });
    });
  } else {
    console.error("Service worker are not supported!");
  }
  ```

- `sw.js`：采用了无刷新接管页面

  ```javascript {.line-numbers}
  // 一般来处理预加载哪些请求的资源作为缓存到 cache storage 中
  self.addEventListener("install", function (event) {
    // 以下可自行添加预加载资源代码
    // .......
  });
  // 在对应回调中一般来清理旧版本 serverWorker 缓存的资源
  self.addEventListener("activate", function (event) {
    // 以下可自行添加清理旧版本资源代码
    // .......
    // 无刷新接管页面
    event.waitUntil(clients.claim());
  });
  // 当前有新的 serviceWork 正处在 handled 状态，一直在等待更新，需要接受用户的通知来决定是否跳过等待
  self.addEventListener("message", (event) => {
    if (event.data === "skipWaiting") {
      self.skipWaiting();
    }
  });
  // 监听请求事件
  self.addEventListener("fetch", (event) => {
    // 以下可自行添加缓存策略相关代码
    // .......
  });
  ```

  如果采用刷新页面的方式来接管页面，先删除`sw.js`里注册的`activate`事件中的`event.waitUntil(clients.claim())`这句代码；然后在`register.js`中添加给`swC`注册`controllerchange`事件的代码，如下：

  ```javascript {.line-numbers}
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
  ```

  以上代码主要是为了观察`sw`的状态变化。

# 总结

大体描述了`sw`生命周期中的事件及其状态的变化，里面没有讲到`self.skipWaiting()`，`clients.claim()`详细的使用方式；没有讲到为什么要使用`waitUntil`;也没有讲到`Cache Storage`；后续有时间会再写篇文章单独讲解，欢迎大家留言指正。

# 参考文献

- [Service Worker API - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API))
- [The service worker lifecycle (web.dev)](https://web.dev/service-worker-lifecycle/)

> 本文发布内容来自个人对于**MDN**和**web.dev**网站关于**Service Worker**的阅读及实践后的理解，文章未经授权禁止任何形式的转载。
