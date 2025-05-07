let { join, toUpper, split, flowRight } = require("lodash/fp");
let str = "click button"; // 转成 CLICK_BUTTON

// 按照过程思维
// lodash中的方法数据先行，先传数据，再传其它参数
// lodash/fp 是针对函数式编程设计的，数据放在最后

// let r1=_.split(str," ");
// console.log(r1);
// let r2=_.toUpper(r1);
// console.log(r2);
// let r3=_.split(r2,",");
// console.log(r3);
// let r4=_.join(r3,"_");
// console.log(r4); // CLICK_BUTTON

// 函数式编程思维
let composed = flowRight(join("_"), split(","), toUpper, split(" ")); // 组合函数
let r1 = composed(str);
console.log(r1); // CLICK_BUTTON
