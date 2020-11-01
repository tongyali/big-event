$(function () {
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value == $("[name=oldpassword]").val()) {
                return '原密码与新密码相同'
            }
        },
        samePwd: function (value) {
            if (value !== $("[name=newpassword]").val()) {
                return '两次输入密码不相同'
            }
        }
    })
})