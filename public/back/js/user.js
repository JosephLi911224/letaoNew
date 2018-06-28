/**
 * Created by Administrator on 2018/6/27.
 */


$(function(){
var currentPage =1;
  var pageSize =5;
  //声明标记  ,标记当前选中项
  var currentId;
  var isDelete;

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

//2 启用  禁用功能
$('tbody').on('click','.btn',function(){
  $("#userModal").modal("show");

    currentId = $(this).parent().data("id");
  isDelete=$(this).hasClass("btn-danger") ? 0: 1;
})

  //点击确定按钮  更改用户状态   根据 isDelect  id  发送ajax请求
  $('#submitBtn').click(function(){
    console.log(currentId);
    console.log(isDelete);
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(info){
        //alert(1);
        console.log(info);
        //1关闭模态框
        $('#userModal').modal("hide");
        //2重新渲染
        render();
      }
    })
  })
})