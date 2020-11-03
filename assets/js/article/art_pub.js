$(function () {
    // 富文本初始化
    initEditor()
    let layer = layui.layer
    let form = layui.form
    // 获取文章的分类
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                layer.msg('获取文章分类成功！')
                $("[name=citycate_id]").html(template('art-tem', res))
                form.render()
            }
        })
    }
    // 图片裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 点击按钮选择封面
    $("#select-btn").on("click", function () {
        $("#file-btn").click()
    })
    // 上传图片 监听file的change事件
    $("#file-btn").on("change", function (e) {
        console.log(e);
        // 拿到用户选择的文件
        let files = e.target.files
        // 创建对应的url地址
        if (files.length === 0) {
            return
        }
        let newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

})