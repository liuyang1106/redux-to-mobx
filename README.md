## 项目描述

项目为 mobx 作为数据管理的项目。在使用了大量的 redux 之后，尝试在项目中使用 mobx 作为数据管理层。但是在使用 mobx 做开发的时候遇到了以下问题：

1. 当一个组件注入了多个 store 的时候比较难管理，发起不同的 action 需要 store1.fn(),store2.fn()去分发
2. store1 和 store2 是完全隔离的，在 store1 内部完全无法获取 store2 的数据（部分场景需要），这造成了数据内部交流障碍
3. 想要在全局顶层提供一个 store，以增强逻辑组件之间的联系
4. 纯 UI 组件需要派发多个 action 的时候困难

### 为什么要做这个 demo

1. 这个 demo 是为了熟悉 redux 的同学快速迁移到 mobx 开发，几乎无成本
2. 使用 mobx 作为状态管理的时候想要做一个模版在以后的项目中使用
3. 需要使用 mobx 中的架构问题（上面的问题）
4. 发现 vue + vuex = react + mobx，但是 vuex 很好用，想实现一个简单的 vuex 在 react + mobx 这种数据流中使用

### 这个项目解决了的问题

1. 提供了一个顶层 store 解决了各个逻辑组件的通信问题
2. 提供了 dispatch 方法派发 action 提升 UI 组件派发 action 能力
3. action 函数获得了整个 store 的顶层状态
4. 发挥 mobx 的精确更新的优势(autorun)，效率很高，无需 reselect 和 immutable（抛弃了 redux 哪一套带来的性能问题）。mobx 自始至终都只有一份数据
5. 实现了类似 redux 的 connect 方法的高阶组件，可以增加想要增强的类并且简化 store 的使用

### 项目启动

```bash
# windows 用户
npm install
npm start
# macOS
npm install || yarn install
npm start || yarn start
```
