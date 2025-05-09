/**
 * Monad 单子 不可分割的实体，没有嵌套
 * 它有一个flatMap方法，与map方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况
 */

class Functor {
  constructor(value) {
    this.value = value;
  }
  // 写一个类似静态工厂方法的of方法，返回生产的实例
  static of(value) {
    return new Functor(value);
  }
  // 若该类有 map方法，可接受一个函数，返回一个同类型的实例，这就是函子
  // 提供map方法，接入各种运算的逻辑，从而引起值的变形或变化
  map(fn) {
    return new Functor(fn(this.value));
  }
}
// 若fn返回值是一个函子，就会出现 递归嵌套的情况，计算和取值都很麻烦
let functor = Functor.of("a")
  .map((x) => Functor.of(x + 1))
  .map((x) => Functor.of(x.value + 2))
  .map((x) => Functor.of(x.value + 3));
console.log("functor ->", functor.value.value);

let f1 = Functor.of(Functor.of(Functor.of(3)));
console.log("f1 ->", f1.value.value.value);

let a1 = [1, 2, 3].map((item) => [item + 1]);
console.log("a1 ->", a1);

let a2 = [1, 2, 3].flatMap((item) => [item + 1]);
console.log("a2 ->", a2);

/** ******************************************************* */

class Monad {
  constructor(value) {
    this.value = value;
  }
  // 写一个类似静态工厂方法的of方法，返回生产的实例
  static of(value) {
    return new Monad(value);
  }
  map(fn) {
    return new Monad(fn(this.value));
  }
  join() {
    return this.value;
  }
  // 本来是函子的值 是一个函子，把值取出来返回
  flatMapp(fn) {
    // Functor.value=Functor.of(x+1)=Functor.of('a1')
    return this.map(fn).join();
  }
}
let r1 = Monad.of("a")
  .flatMapp((x) => Monad.of(x + 1)) // Functor.of('a1')
  .flatMapp((x) => Monad.of(x + 2)) // Functor.of('a12')
  .flatMapp((x) => Monad.of(x + 3)); // Functor.of('a123')
console.log(r1.value);
