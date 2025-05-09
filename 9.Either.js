// 内部有2个值，left值/right值
// left值 仅在 right值不存在时才会被使用
// Either函子可处理默认值
class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  // 写一个类似静态工厂方法的of方法，返回生产的实例
  static of(left, right) {
    return new Either(left, right);
  }
  // 若该类有 map方法，可接受一个函数，返回一个同类型的实例，这就是函子
  // 提供map方法，接入各种运算的逻辑，从而引起值的变形或变化
  map(fn) {
    return this.right
      ? Either.of(this.left, fn(this.right))
      : Either.of(fn(this.left), this.right);
  }
  get value() {
    return this.right ? this.right : this.left; 
  }
}
let response = { name: "zhangsan", gender: null };
let either = Either.of("nan", response.gender).map((x) => `性别：${x}`);
console.log(either.value);

function parseJSON(str) {
  try {
    return Either.of(null, JSON.parse(str));
  } catch (error) {
    return Either.of({ error: error.message }, null);
  }
}
console.log(parseJSON(`{"age":18}`).value);
console.log(parseJSON(`{age:18}`).value); // 异常
