/**
 * 把数据处理的过程，先定义成 一种与参数无关的合成运算 即PointFree
 *
 */

const { compose } = require("lodash/fp");

// Pointed 有指向的
let money = 500;
money -= 100; //买咖啡
money -= 100; //买面包

// PointFree 没有指向的
function buyCoffee(money) {
  return money - 100;
}
function buyBread(money) {
  return money - 100;
}

let r = compose(buyCoffee, buyBread)(money); // 300
console.log(r);
