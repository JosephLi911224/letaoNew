/**
 * Created by Administrator on 2018/6/28.
 */

$(function(){
  var currentPage = 1;
  var pageSize =5 ;
  render();
  function render (){
    $.ajax({
      type:'get',
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("tpl",info);
        $("tbody").html(htmlStr);


        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();




          }
        })
      }

    })
  }


  $('#addBtn').click(function(){
    $('#addModal').modal("show");

    //ajax  获取数据  进行渲染
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("dropdownTpl",info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })


  //3给dropdown 注册委托事件  让 a 可以被点击
  $('.dropdown-menu').on('click','a',function(){
    //获取 文本内容  赋予给按钮内容
    var txt = $(this).text();
    console.log(txt);
    $('#dropdownTxt').text(txt);

    //获取ID  设置给name="categoryId" 的input框
    var id =$(this).data("id");
    $('[name="categoryId"]').val(id);

    //用户选择了一级分类后,需要将 name = "categoryId" input 框的效验状态重置成 VALID
    //参数  1 字段名  2 设置成什么状态  3 回调
    $("#form").data('bootstrapValidator').updateStatus("categoryId","VALID");
  });

  //4  进行 fileupload 实例化 配置  fileupload  回调函数
$("#fileupload").fileupload({      dataType:"json",      //e：事件对象      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址    
done:function (e, data) {      
  console.log(data.result.picAddr);
    var picUrl = data.result.picAddr;
     $('#imgBox img').attr('src',picUrl); 

        //将图片地址存在 name = "brandLogo" 的input 框中
    $('[name="brandLogo"]') .val(picUrl);


  //用户选择了一级分类后,需要将 name = "brandLogo" input 框的效验状态重置成 VALID
  //参数  1 字段名  2 设置成什么状态  3 回调
  $("#form").data('bootstrapValidator').updateStatus("brandLogo","VALID");
}});



  //5 表单校验初始化
  $('#form').bootstrapValidator({
    //5.1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //excluded:[]; 效验所有隐藏域
    excluded: [],


    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },


    fields: {
      categoryId: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "请选择一级分类名称"
          },
         }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请选择二级分类名称"
          },
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          },
        }
      },
    }


  })


  //6 阻止表单校验成功事件  在组织默认提交  通过ajax提交
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          //重置表单内容
          $("#form").data('bootstrapValidator').resetForm(true);
          currentPage = 1;
          render();

          //下拉框  和 图片  不属于 表单  所以要手动重置
          $("#dropdownTxt").text("请选择一级分类");
          $("#imgBox img").attr("src","images/none.png");
        }
      }
    })

  })

})