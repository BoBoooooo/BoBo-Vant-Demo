import { Dialog } from 'vant';

/**
 * 确认提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 标题
 * @param {*} cancelFn 取消回调函数
 */
export function confirm(message, title = '提示', cancelFn = () => {}) {
  return (target, name, descriptor) => {
    const originFn = descriptor.value;
    descriptor.value = async (...rest) => {
      try {
        await Dialog.confirm({
          message,
          title,
        });
        originFn.apply(this, rest);
      } catch (error) {
        if (cancelFn) {
          cancelFn(error);
        }
      }
    };
  };
}

/**
 * 提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 提示标题
 */
export function alert(message, title = '提示') {
  return (target, name, descriptor) => {
    const originFn = descriptor.value;
    descriptor.value = async (...rest) => {
      await Dialog.confirm({
        message,
        title,
      });
      originFn.apply(this, rest);
    };
  };
}
