/**
 * 纯函数 可缓存 可测试
 * 相同参数会产生相同输出
 * 
 */

let _ = require("lodash");

function add(a, b) {
  console.log("执行计算");
  return a + b;
}

const resolver = (...args) => JSON.stringify(args);

function memorize(func, resolver) {
  let cache = {}; //缓存对象，存放参数和结果的对应关系
  return (...args) => {
    const key = resolver(...args);
    if (cache[key]) return cache[key];
    else return (cache[key] = func(...args));
  };
}

const memorizeAdd = memorize(add, resolver);
console.log(memorizeAdd(1, 2)); // 执行计算
console.log(memorizeAdd(1, 2)); // 不执行计算
console.log(memorizeAdd(4, 1)); // 执行计算
