const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require("tapable");

class Lesson {
  constructor() {
    this.hooks = {
      //同步容器，按注册事件顺序执行
      go: new SyncHook(["address"]),
      //同步容器，注册事件中如果有返回值，则停止执行后续回调函数
      goBail: new SyncBailHook(["address"]),
      //异步并行的容器
      goParallel: new AsyncParallelHook(["name", "age"]),
      //异步串行的容器
      goSeries: new AsyncSeriesHook(["name", "age"]),
    };
  }
  tap() {
    // 往hooks中go容器中注册事件/添加回调函数
    this.hooks.go.tap("calss0318", (address) => {
      console.log("class0318", address);
    });
    this.hooks.go.tap("calss0410", (address) => {
      console.log("calss0410", address);
    });

    // 往hooks中goBail容器中注册事件/添加回调函数
    this.hooks.goBail.tap("calss0510", (address) => {
      console.log("calss0510", address);
      return 111;
    });
    this.hooks.goBail.tap("calss0610", (address) => {
      console.log("calss0610", address);
    });

    // 往hooks中goParallel容器中注册事件/添加回调函数
    this.hooks.goParallel.tapAsync("calss0710", (name, age, cb) => {
      setTimeout(() => {
        console.log("calss0710", name, age);
        cb();
      }, 5000);
    });
    this.hooks.goParallel.tapPromise("calss0810", (name, age) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("calss0810", name, age);
          resolve();
        }, 2000);
      });
    });

    // 往hooks中goSeries容器中注册事件/添加回调函数
    this.hooks.goSeries.tapAsync("calss0910", (name, age, cb) => {
      setTimeout(() => {
        console.log("calss0910", name, age);
        cb();
      }, 5000);
    });
    this.hooks.goSeries.tapPromise("calss1010", (name, age) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("calss1010", name, age);
          resolve();
        }, 2000);
      });
    });
  }
  start() {
    //触发hooks
    this.hooks.go.call("go");
    this.hooks.goBail.call("goBail");
    this.hooks.goParallel.callAsync("leo", "18", function () {
      //代表所有goParallel容器中的钩子都执行完了
      console.log("goParallel~end");
    });
    this.hooks.goSeries.callAsync("leo", "18", function () {
      //代表所有goParallel容器中的钩子都执行完了
      console.log("goSeries~end");
    });
  }
}

const lesson = new Lesson();
lesson.tap();
lesson.start();
