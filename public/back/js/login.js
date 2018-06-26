/**
 * Created by Jepson on 2018/6/25.
 */


/*
 * 1. 进行表单校验配置
 *    校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
 * */


$(function(){



  //1表单效验初始化
  $("#form").bootstrapValidator({

    //配置图片
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },


    //指定校验字段
    fields:{
      username:{
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在 2-6位"
          },

          callback:{
            message:"用户名不存在"
          }
        }
      },


      password: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在 6-12位"
          },

          //定制一个专门用于响应毁掉的效验规则
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });

//2
  $("#form").on("success.form.bv",function(e){
   //阻止默认表单事件提交
    e.preventDefault();
    console.log( "阻止了默认的提交, 通过 ajax提交");
    $.ajax({
      type:"POST",
      url:"/employee/employeeLogin",
      //表单序列化 快速手机表单提交内容  进行提交  input  必须设置  name  属性
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        //分三种情况  成功  用户名错误  密码错误
        if(info.success){
          location.href="index.html";
        }

        if(info.error===1000){
          //alert("用户名不存在");
          $('#form').data("bootstrapvalidator").updateStatus("username","INVALID","callback");

        }

        if(info.error===1001){
          //alert("密码错误");
          $('#form').data("bootstrapvalidator").updateStatus("password","INVALID","callback");
        }

      }
    })
  });

  /*
   * 3. 重置表单bug, 重置表单不仅要重置内容, 还要重置校验状态
   * */
  $('[type="reset"]').click(function(){
    //不加true  resetForm(true)  只重置效验状态  传true都会重置   调用插件提供的方法
      $('#form').data("bootstrapVaildator").resetForm();
  });




});