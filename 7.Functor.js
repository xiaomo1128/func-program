
/**
 * 函子有点像函数
 * 函数其实就是一个映射关系，可以把参数映射返回值
 * map也是映射的意思，可把老的实例映射为一个新的实例
 * 也可以是 把一个老的值，映射为一个新的值
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
let functor = Functor.of(1)
  .map((x) => x + 1)
  .map((x) => x + 4);
console.log(functor);
