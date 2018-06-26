/**
 * Created by Administrator on 2018/6/26.
 */

//实现精度条功能  （给ajax 请求加），注意需要给所有的ajax都加

//注册了全局事件，所有的ajax只要开始就会开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
});

//所有的ajax只要结束，setTimeOut 模拟延迟500毫秒，结束进度条
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);

});