const { compose } = require("lodash/fp");

let localStorage = {
  getItem(key) {
    if (key === "data") {
      return `{"code":0, "userId":"1"}`; // 服务器返回的数据
    } else if (key === "1") {
      return `{"userId":"1", "name":"张三", "age":18}`; // 用户id详情
    }
  },
};
// 先按过程式编程
function printUser() {
  let response = localStorage.getItem("data"); // 输入是一个副作用，依赖外部事件，不可控
  let data = JSON.parse(response);
  const userId = data.userId;
  const user = localStorage.getItem(userId);
  console.log("user ->", user); // 输出： 把信息输出到控制台，控制台可能没有，output不可控
}
// printUser();

// 函数式编程思维，把纯逻辑收集封装起来，然后把不纯的副作用操作交给用户处理
class IO {
  constructor(value) {
    this.value = value;
  }
  map(fn) {
    // compose 把 this.value + fn 组合成一个新的函数 （没有执行 函数柯里化？）
    // compose(parseJSON, () => localStorage.getItem(key)) 组合后，返回新函数
    return new IO(compose(fn, this.value));
  }
  flatMap(fn) {
    return new IO(compose((x) => x.value(), fn, this.value));
  }
  start(callback) {
    callback(this.value());
  }
}
const readByKey = (key) => new IO(() => localStorage.getItem(key)); //输入 有副作用
const parseJSON = (str) => JSON.parse(str); // 纯函数
const write = console.log; // 输出 有副作用
// IO函子通过推迟执行的方式 实现副作用的管理和隔离
// 函数本身是纯的，但是函数IO执行是不纯的
let r1 = readByKey("data")
  .map(parseJSON) // 累加收集、排练操作 还不能执行（到此为止，没有副作用）
  .map((x) => x.userId)
  .flatMap(readByKey)
  .map(parseJSON)
  .start(write); // 把执行进行了延迟，什么时候调用 start 什么时候执行
// console.log("r1 ->", r1.value()); // { code: 0, userId: '1' }
