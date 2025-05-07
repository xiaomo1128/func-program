/**
 * redux 中的 compose函数 与 lodash 中的 flowRight 函数 是一样的
 */

let _ = require("lodash");
let str = "a";

function add1(str) {
  return str + "1";
}
function add2(str) {
  return str + "2";
}
function add3(str) {
  return str + "3";
}

// let r1 = add3(add2(add1(str)));
// console.log(r1); // a123

// 从左向右
function flow(...fns) {
  if (fns.length === 1) return fns[0];

  return fns.reduceRight(
    // reduceRight 从右向左执行
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

// 从右往左
function flowRight(...fns) {
  if (fns.length === 1) return fns[0];

  return fns.reduce(
    // reduce 从左向右执行
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
let flowed = flowRight(add1, add2, add3);
let r1 = flowed(str);
console.log(r1); // a123
