$(function () {
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码
        repwd: value => {
            let pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) return '两次输入密码不一致'
        }
    })

    // let baseURL = 'http://ajax.frontend.itheima.net'
    let layer = layui.layer

    // 注册页面的ajax提交
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $("#link_login").click()
            }
        })
    })
    // 登录页面的ajax提交
    $("#form_login").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })


})