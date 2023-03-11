import("app1/Button").then(({ Button }) => {
  document.body.appendChild(Button("我挂载了一个远程的的组件!"));
});
