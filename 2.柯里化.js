/**
 * 柯里化：让参数依次传递（类似分期付款）
 */

let _ = require("lodash");

function add(a, b, c) {
  return a + b + c;
}

function curry(func) {
  let argsLength = func.length; //形参个数 有闭包
  let curried = (...args) => {
    // 若传入的数组长度 < 实现需要参数长度
    if (args.length < argsLength) {
      return (...rest) => curried(...args, ...rest);
    }
    return func(...args);
  };
  return curried;
}

let curriedAdd = curry(add);
console.log(curriedAdd(1, 2, 3));
console.log(curriedAdd(1)(2, 3));
console.log(curriedAdd(1)(2)(3));
