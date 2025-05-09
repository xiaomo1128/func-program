// 能过滤空值
class Maybe {
  constructor(value) {
    this.value = value;
  }
  // 写一个类似静态工厂方法的of方法，返回生产的实例
  static of(value) {
    return new Maybe(value);
  }
  // 若该类有 map方法，可接受一个函数，返回一个同类型的实例，这就是函子
  // 提供map方法，接入各种运算的逻辑，从而引起值的变形或变化
  map(fn) {
    return this.value ? new Maybe(fn(this.value)) : this;
  }
}
let r = Maybe.of(null).map((x) => x.toString());
console.log(r);