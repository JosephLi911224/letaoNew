/**
 * Created by Administrator on 2018/6/27.
 */


$(function(){
var currentPage =1;
  var pageSize =5;
render();
 function render(){
   $.ajax({

     url:"/user/queryUser",
     data:{
       page:currentPage,
       pageSize:pageSize,
     },
     type:"get",
     dataType:"json",
     success:function(info){
       console.log(info);
       var htmlStr =template("tpl",info);
       console.log(htmlStr);
       $('tbody').html(htmlStr);

       $('#paginator').bootstrapPaginator({

         bootstrapMajorVersion:3, //需要定义版本号,在结构中使用ul
         //总页数
         totalPages:Math.ceil(info.total/info.size),
         //当前页
         currentPage:info.page,
         //配置点击事件,page表示当前点击的页面
         onPageClicked(a,b,c,page){
           console.log(page);
           //更新当前页
           currentPage=page;
           render();
         }

       })

     }
   })
 }



})