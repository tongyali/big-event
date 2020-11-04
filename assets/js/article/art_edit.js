$(function () {
    // 富文本初始化
    initEditor()
    initCata()
    let layer = layui.layer
    let form = layui.form
    let Id = localStorage.getItem('id')
    console.log(Id)
    // 获取文章分类
    function initCata() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                layer.msg('获取文章分类成功！')
                $("[name=cate_id]").html(template('art-tem', res))
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

    // 点击按钮选择封面

    $("#select-btn").click(function () {
        $("#file-btn").click()
    })
    // 监听上传文件改变事件
    $("#file-btn").on("change", function (e) {
        let files = e.target.files
        if (files.length === 0) {
            return
        }
        let newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    // 定义状态变量 默认已发布
    let art_state = '已发布'
    // 点击存为草稿状态变为草稿
    $("#draft").click(function () {
        art_state = '草稿'
    })
    // 监听表单的提交事件
    $("#form-pub").on("submit", function (e) {
        // console.log(1111);
        e.preventDefault()

        //    创建FormData对象 获取表单内容  
        let fd = new FormData($(this)[0]) //将jquery对象转为dom对象
        // 将文件状态添加到FormData对象中
        fd.append('state', art_state)
        // 将裁剪后的图片输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将裁剪的图片文件添加到FormData中
                fd.append("cover_img", blob)
                publishArticle(fd)

            })
    })
    // 发表修改文章
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("修改文章失败")
                }
                layer.msg("修改文章成功!")
                location.href = "/article/art_list.html"
            }
        })
    }


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

            $("#image").prop("src", "http://ajax.frontend.itheima.net" + res.data.cover_img)
            // 图片裁剪
            // 1. 初始化图片裁剪器
            var $image = $('#image');
            // 2. 裁剪选项
            var options = {
                aspectRatio: 400 / 280,
                preview: '.img-preview'
            };
            // 3. 初始化裁剪区域
            $image.cropper(options);
            localStorage.removeItem("id")
        }
    })
})