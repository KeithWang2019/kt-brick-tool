# 积木工具集合

<img src="https://brick.cangsg.com/logo.png" alt="示意图" width="120" height="120">

项目定义了一个工具类 KtTool，主要实现了 **防抖（debounce）** 和 **节流（throttle）** 两种常用的函数控制功能，用于优化高频触发的事件（如滚动、输入、点击等）。

### 核心属性
类内部维护了两个 Map 结构，用于存储不同操作的计时器或时间戳：
- debounceTimerMap：存储防抖操作的定时器 ID，以 key 为标识区分不同的防抖任务。
- throttleTimerMap：存储节流操作的时间戳，以 key 为标识区分不同的节流任务。
### 核心方法
#### 1. 防抖（debounce）
**功能：** 当事件被频繁触发时，只有在最后一次触发后等待 wait 毫秒，才会执行回调函数。如果在等待期间再次触发，会重新计时。

**参数：**
- key：唯一标识，用于区分不同的防抖任务（避免多个防抖操作互相干扰）。
- callback：需要执行的回调函数。
- wait：等待时间（毫秒）。
##### 实现逻辑：
1. 从 debounceTimerMap 中获取当前 key 对应的定时器 timer。
2. 如果存在定时器，先清除该定时器并从 Map 中删除（重置计时）。
3. 重新创建一个定时器，等待 wait 毫秒后执行 callback，并将新的定时器 ID 存入 Map 中。
#### 2. 节流（throttle）
**功能：** 限制函数在一定时间内（wait 毫秒）只能执行一次，避免过于频繁的执行。

**参数：**
- key：唯一标识，用于区分不同的节流任务。
- callback：需要执行的回调函数。
- wait：时间间隔（毫秒）。
##### 实现逻辑：
1. 从 throttleTimerMap 中获取当前 key 对应的上一次执行时间戳 outTime。
2. 如果不存在 outTime（首次触发），直接执行 callback，并记录当前时间戳到 Map 中。
3. 如果存在 outTime，判断当前时间与 outTime 的差值是否大于等于 wait：
- 若是，则执行 callback，并更新 Map 中的时间戳为当前时间。
- 若否，则不执行回调（忽略本次触发）。
### 使用方式
通过实例化 KtTool 得到 tool 对象，直接调用其 debounce 或 throttle 方法即可，例如：
```js
// 防抖示例：输入框输入结束后 500ms 执行搜索
input.addEventListener('input', () => {
  tool.debounce('search', () => { console.log('执行搜索') }, 500);
});

// 节流示例：滚动事件每 100ms 最多执行一次
window.addEventListener('scroll', () => {
  tool.throttle('scroll', () => { console.log('处理滚动') }, 100);
});
```
### 总结
- **防抖** 适用于需要 “等待最后一次触发后执行” 的场景（如搜索输入、窗口 resize 等）。  
- **节流** 适用于需要 “固定时间间隔内只执行一次” 的场景（如滚动加载、高频点击等）。
- **两个方法** 通过 key 区分不同任务，避免了多个操作之间的冲突，增强了复用性。

## Installing

### Package manager

Using npm:

```bash
$ npm install kt-brick-tool
```

Using pnpm:

```bash
$ pnpm add kt-brick-tool
```

```js
import ktTool from "kt-brick-tool";

ktTool.throttle(
  "key-01",
  () => {
    console.log("key-01");
  },
  70
);

ktTool.debounce(
  "key-02",
  () => {
    console.log("key-02");
  },
  70
);
```

## License

[MIT](LICENSE)
