$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    let q = {
        pagenum: '1',
        pagesize: '2',
        cate_id: '',
        state: ''
    }
    initTable()
    // 初始化文章列表
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败！")
                }
                layer.msg("获取文章列表成功！")
                // 时间过滤器
                template.defaults.imports.dateFormat = function (data) {
                    let date = new Date(data)
                    let y = date.getFullYear()
                    let m = (date.getMonth() + 1).toString().padStart(2, '0')
                    let d = date.getDate().toString().padStart(2, '0')
                    let h = date.getHours().toString().padStart(2, '0')
                    let f = date.getMinutes().toString().padStart(2, '0')
                    let s = date.getSeconds().toString().padStart(2, '0')
                    return `${y}-${m}-${d} ${h}:${f}:${s}`
                }
                let htmlStr = template('list-tem', res);

                $("tbody").html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    // 初始化文章分类
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章分类列表失败！")
                }
                layer.msg("获取文章分类列表成功！")
                $('[name=cate_id]').html(template('tpl-cate', res))
                form.render()
            }
        })
    }
    // 筛选
    $("#form-search").on("submit", function (e) {
        // console.log(1111);
        e.preventDefault()
        let cate_id = $("[name=cate_id]").val()
        let state = $("[name=state]").val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    // 分页


    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            prev: '上一页',
            next: '下一页',
            skip: '',
            jump: function (obj, first) {
                q.pagenum = obj.curr
                //首次不执行
                if (!first) {
                    initTable()
                }
            }
        });
    }

})