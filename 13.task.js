/**
 * 函数式编程 new对象
 * static of 内部 也需要new对象
 * 类 和 new对象 都不是必须的
 * 还可通过闭包保存值 实现map
 * @param {*} url
 * @returns
 */
const Task = (execute) => ({
  execute,
  map: (fn) => Task((resolve) => execute((x) => resolve(fn(x)))),
  flatMap: (fn) => Task((resolve) => execute((x) => fn(x).execute(resolve))),
});

function get(url) {
  if (url === "data") {
    return Promise.resolve({ code: 0, userId: "1" }); // 服务器返回的数据
  } else {
    return Promise.resolve({ userId: "1", name: "xiaomo" });
  }
}
const request = (url) => Task((resolve) => get(url).then(resolve));
request("data")
  .map((x) => x.userId)
  // 递归内容:
  // (resolve) => execute((x) => resolve(fn(x)))
  // (resolve) => get(url).then(resolve)
  // (x) => resolve(fn(x))
  // resolve -> { code: 0, userId: "1" }
  // fn(x) -> x.userId
  // .execute((data) => console.log(data));
  .flatMap(request) // 平铺
  .map((x) => x.name)
  .execute((data) => console.log(data));
