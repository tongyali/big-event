$(function () {
    getUserinfo()
    // 退出
    let layer = layui.layer
    $("#btnlogout").click(function () {
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })
})
// 获取用户数据
function getUserinfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // localStorage.removeItem('token')
        //         localStorae.removeItem('token')
        //         location.href = '/login.html'
        //     }

        // }

    })
}
// 渲染头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $(".welcome").html(`欢迎${name}`)
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()

    } else {
        $(".layui-nav-img").hide()
        $(".text-avatar").html(name[0].toUpperCase()).show()

    }
}