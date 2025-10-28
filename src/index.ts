class KtTool {
  private debounceTimerMap: Map<string, number>;
  private throttleTimerMap: Map<string, number>;

  constructor() {
    this.debounceTimerMap = new Map<string, number>();
    this.throttleTimerMap = new Map<string, number>();
  }

  /**
   * 防抖
   * @param key
   * @param callback
   * @param wait
   */
  debounce(key: string, callback: () => void, wait: number) {
    let timer = this.debounceTimerMap.get(key);
    if (timer) {
      clearTimeout(timer);
      this.debounceTimerMap.delete(key);
    }
    timer = setTimeout(function () {
      callback();
    }, wait);
    this.debounceTimerMap.set(key, timer);
  }

  /**
   * 节流
   * @param key
   * @param callback
   * @param wait
   */
  throttle(key: string, callback: () => void, wait: number) {
    const outTime = this.throttleTimerMap.get(key);
    let needCache = false;

    if (outTime) {
      if (Date.now() - outTime >= wait) {
        callback();
        needCache = true;
      }
    } else {
      callback();
      needCache = true;
    }
    if (needCache) {
      this.throttleTimerMap.set(key, Date.now());
    }
  }
}

const tool = new KtTool();

export default tool;
