$(function () {
    let form = layui.form
    let Id = localStorage.getItem('id')
    console.log(Id)
    // 发起ajax请求获取文章内容
    $.ajax({
        method: 'GET',
        url: '/my/article/' + Id,
        success: function (res) {
            console.log(res);
            // 渲染页面
            form.val('form-pub', res.data)
            setTimeout(function () {
                $("[name=cate_id]").find(`option[value=${res.data.cate_id}]`).prop("selected", true)
                form.render()
            }, 1000)

        }
    })
    // 获取文章类别

})