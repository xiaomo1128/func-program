// Container 若一个对象内部能够持有一个值，就称为一个容器

class Container {
  constructor(value) {
    this.value = value;
  }
}

let container = new Container(5);
console.log(container.value); // 5

// Pointed Container 若容器中有of方法，就称为有指向的容器
// 函数式编程，使用的时候尽可能不要new对象
class PointedContainer {
  constructor(value) {
    this.value = value;
  }
  // 写一个类似静态工厂方法的of方法，返回生产的实例
  static of(value) {
    return new PointedContainer(value);
  }
}
let pointedContainer = PointedContainer.of(4);
console.log(pointedContainer.value); // 4
