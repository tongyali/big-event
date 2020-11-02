$(function () {
    // let layer = layui.layer
    initArtCateList()
    // 获取数据 渲染分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return ('获取文章分类失败')
                }
                $("tbody").html(template("art-tem", res))
            }
        })
    }
    let layer = layui.layer
    let addindex = null
    // 点击添加分类
    $("#btnAddCate").on("click", function () {
        // 弹出新增层
        addindex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html(),
        });
    })
    // 新增文章分类
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $("#form-add").serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                layer.msg('新增分类成功！')
                // 重新获取数据渲染页面
                initArtCateList()
                // 关掉弹出层
                layer.close(addindex)
            }

        })
    })
    // 点击编辑事件
    let editindex = null
    let form = layui.form
    $('tbody').on("click", ".btn-edit", function () {
        // 编辑弹出框
        editindex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html(),
        })
        let id = $(this).attr("data-id")
        // console.log(id);
        $.ajax({
            method: "GET",
            url: `/my/article/cates/${id}`,
            success: function (res) {
                console.log(res);
                form.val("form-edit", res.data)
            }
        })
    })
    // 编辑表单提交事件
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章分类失败！')
                }
                layer.msg('更细文章分类成功!')
                layer.close(editindex)
                initArtCateList()
            }
        })
    })
    // 点击删除
    $("tbody").on('click', ".btn-delete", function () {
        // console.log(1111);
        let id = $(this).attr("data-id")
        layer.confirm('确认删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败!')
                    }
                    layer.msg('删除文章分类成功!')
                    initArtCateList()
                }
            })

            layer.close(index);
        });
    })
})