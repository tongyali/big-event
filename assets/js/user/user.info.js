$(function () {
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1-6位'
            }
        }
    })

    let layer = layui.layer
    // let form = layui.form
    initUserInfo()
    // 渲染用户信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val("formUser", res.data)
            }
        })
    }
    // 重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserinfo()
            }

        })
    })
})