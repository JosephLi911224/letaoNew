/**
 * Created by Administrator on 2018/6/26.
 */



/*
 * 5. 登入拦截  若没登入  拦截到  登入页面
 * 需要将登入页  排除在外
 * */
if(location.href.indexOf("login.html")===-1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",

    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.error===400){
        location.href="login.html";
      }
      if(info.success){

      }
    }
  });
}





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


//公共功能
$(function(){
    //1左侧二级菜单切换显示
       $('.lt_aside .category').click(function(){
         $('.lt_aside .child').stop().slideToggle();
       });
    //2.左侧侧边栏显示隐藏
      $('.lt_topbar .icon_menu').click(function(){
        $('.lt_aside').toggleClass("hidemenu");
        $('.lt_main').toggleClass("hidemenu");
        $('.lt_topbar').toggleClass("hidemenu");
        //console.log('lzs');
      })
    //3.点击头部退出按钮  显示模态框

  $('.lt_topbar .icon_logout').click(function(){
    $('#logoutModal').modal('show');
  })


  /*
   * 4. 点击模态框退出键, 退出至登入页  用ajax  清除登入状态
   * */
  $('#logoutBtn').click(function(){
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.success){
            location.href="login.html";
          }
        }
      })
  })

});