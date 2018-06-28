/**
 * Created by Administrator on 2018/6/28.
 */


$(function() {
  //1.页面渲染
  var currentPage = 1;//当前页
  var pageSize = 2;//每页条数

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);


        var htmlStr = template("tpl", info);
        $('tbody').html(htmlStr);


        //分页初始化
        $("#paginator").bootstrapPaginator({
          //指定版本号
          bootstrapMajorVersion: 3,
          //指定总页数
          totalPages: Math.ceil(info.total / info.size),
          //指定当前数
          currentPage: info.page,

          //按钮添加点击事件
          onPageClicked: function (a, b, c, page) {
            //更新当前页
            currentPage = page;
            //重新渲染
            render();
          }

        })

      }
    })
  }

  //2添加分类模态框
  $("#addBtn").click(function () {
    $("#addModal").modal("show");
  })

  //3表单校验的实现
  $('#form').bootstrapValidator({
    //配置图片
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    //配置字段
    fields: {
      categoryName: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "一级分类名称不能为空"
          }

        }
      }
    }

  })



  //4注册表单效验成功事件  阻止默认提交  以ajax进行提交
  $('#form').on("success.form.bv",function( e ){

    e.preventDefault();
    $.ajax({

      type:"post",
      url:'/category/addTopCategory',
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if( info.success ){
          $('#addModal').modal("hide");
          currentPage = 1;
          render();

          //3重置表单  传true  重置所有内容
          $("#form").data("bootstrapValidator").resetForm(true);

        }
      }

    })




  })










})