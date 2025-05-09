class Ap {
  constructor(value) {
    this.value = value;
  }
  // 写一个类似静态工厂方法的of方法，返回生产的实例
  static of(value) {
    return new Ap(value);
  }
  ap(fn) {
    return Ap.of(this.value(fn.value));
  }
}
let A = Ap.of((x) => x + 1);
let B = Ap.of(4);

let result = A.ap(B);
console.log(result.value);
