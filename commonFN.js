var CommonFN = (function () {
    function CommonFN() {
        this.size = 18;
        this.defaultexpire = 1800;
    }
    /** TODO: 任意格式化时间
     *  @param data：传进来色时间 fmt：格式化模本
     *  @return fmt 格式化之后
     * */
    CommonFN.prototype.formatterDate = function (date, fmt) {
        var o = {
            "y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds() //毫秒
        };
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                if (k == "y+") {
                    fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
                }
                else if (k == "S+") {
                    var lens = RegExp.$1.length;
                    lens = lens == 1 ? 3 : lens;
                    fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
                }
                else {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
        }
        return fmt;
    };
    /**
     * TODO: 精确加
     * @Param: {
     *   arg1：加数
     *   arg2：被加数
     * }
     * @return: Number 和
     */
    CommonFN.prototype.accAdd = function (arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            }
            else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        }
        else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    };
    /**
     * TODO: 精确减
     * @Param: {
     *   arg1：减数
     *   arg2：被减数
     * }
     * @return: Number 差
     */
    CommonFN.prototype.accSub = function (arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    };
    /**
     * TODO: 精确乘
     * @Param: {
     *   arg1：乘数
     *   arg2：被乘数
     * }
     * @return: Number 积
     */
    CommonFN.prototype.accMul = function (arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    };
    /**
     * TODO: 精确除
     * @Param: {
     *   arg1：除数
     *   arg2：被除数
     * }
     * @return: Number 积
     */
    CommonFN.prototype.accDiv = function (arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    };
    /**
     * TODO: 创建弹窗
     * @Param: {
     *  domId: 弹窗ID
     *  obj：内容对象
     * }
     * @return: null
     */
    CommonFN.prototype.createPopup = function (domId, obj) {
        var w100 = '100%';
        var w50 = '50%';
        var body = document.getElementsByTagName('body')[0];
        var divMask = this.createTag('div');
        var popup = this.createTag('div');
        var header = this.createTag('div');
        var bodyC = this.createTag('div');
        divMask.id = "gl-mask";
        divMask.style.position = "fixed";
        divMask.style["z-index"] = 500;
        divMask.style.width = w100;
        divMask.style.height = w100;
        divMask.style.backgroundColor = "rgba(0,0,0,0.2)";
        body.appendChild(divMask);
        divMask.appendChild(popup);
        popup.appendChild(header);
        popup.appendChild(bodyC);
        popup.id = domId;
        popup.style.width = obj.width + 'px';
        popup.style.height = obj.height + 'px';
        popup.style.position = 'absolute';
        popup.style.left = w50;
        popup.style.top = w50;
        popup.style.marginLeft = -obj.width / 2 + 'px';
        popup.style.marginTop = -obj.height / 2 + 'px';
        popup.style.boxShadow = '0px 0px 10px #888';
        popup.style['border-radius'] = '5px';
        popup.style.backgroundColor = obj.backgroundColor ? obj.backgroundColor : '#fff';
        header.style.lineHeight = header.style.height = obj.header.height + 'px';
        header.style.paddingLeft = '20px';
        header.style.width = w100;
        header.style.borderBottom = obj.header['border'];
        header.innerHTML = '<span style="">' + obj.header.text + '</span><i onclick="common.hidePopup(' + domId + ')" class="fr cursor" style="padding-right: 20px">X</i>';
        bodyC.innerHTML = obj.body;
    };
    /**
     * TODO: 创建元素
     * @Param: tag 需要创建的标签
     * @return: Element 标签
     */
    CommonFN.prototype.createTag = function (tag) {
        return document.createElement(tag);
    };
    /**
     * TODO: 隐藏弹窗
     * @Param: domId;弹窗id
     * @return: null
     */
    CommonFN.prototype.hidePopup = function (domId) {
        domId.remove();
        document.getElementById('gl-mask').remove();
    };
    /**
     * TODO: 创建loading
     * @Param: null
     * @return: null
     */
    CommonFN.prototype.createLoadings = function () {
        var load = "<div class=\"loader\">\n                      <div class=\"dot\"></div>\n                      <div class=\"dot\"></div>\n                      <div class=\"dot\"></div>\n                      <div class=\"dot\"></div>\n                      <div class=\"dot\"></div>\n                    </div>";
        var body = document.getElementsByTagName('body')[0];
        body.innerHTML = load;
    };
    /**
     * TODO: cookies
     * @Param: null
     * @return: null
     */
    CommonFN.prototype.setCookies = function (key, value, time) {
        //获取当前时间
        var cur = new Date();
        //设置指定时间
        cur.setTime(cur.getTime() + time * 1000);
        //创建cookie  并且设置生存周期为GMT时间
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (!time ? '' : cur.toUTCString());
    };
    CommonFN.prototype.getCookies = function (key) {
        //获取cookie
        var data = document.cookie;
        //获取key第一次出现的位置    pwd=
        var startIndex = data.indexOf(key + '=');
        //  name=123;pwd=abc
        //如果开始索引值大于0表示有cookie
        if (startIndex > -1) {
            //key的起始位置等于出现的位置加key的长度+1
            startIndex = startIndex + key.length + 1;
            //结束位置等于从key开始的位置之后第一次;号所出现的位置
            var endIndex = data.indexOf(';', startIndex);
            //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
            endIndex = endIndex < 0 ? data.length : endIndex;
            return decodeURIComponent(data.substring(startIndex, endIndex));
        }
        else {
            return '';
        }
    };
    CommonFN.prototype.delCookies = function (key) {
        //获取cookie
        var data = this.getCookies(key);
        //如果获取到cookie则重新设置cookie的生存周期为过去时间
        if (data) {
            this.setCookies(key, data, -1);
        }
    };
    /**
     * TODO: 方法描述
     * @Param: null
     * @return: null
     */
    CommonFN.prototype.setLocalStorage = function (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    CommonFN.prototype.getLocalStorage = function (key) {
        window.localStorage.getItem(key);
    };
    CommonFN.prototype.removeLocalStorage = function (key) {
        window.localStorage.removeItem(key);
    };
    return CommonFN;
}());
var common = new CommonFN();
var fmt = common.formatterDate(new Date(), 'yyyy年MM月dd日 hh:mm:ss');
/*
common.createPopup("popup",{
    width:'400',
    height:'200',
    backgroundColor:'#fff',
    header:{
        text:'删除',
        height:'36',
        border:'1px solid #888'
    },
    body:'<div>2</div>'
});*/
common.createLoadings();
/**/
common.setCookies('ha', 1, 3);
console.log(common.getCookies('ha'));
/*common.setLocalStorage('KK',34,10);*/
/*
common.setLocalStorage("test",{value:10,time:new Date().getTime(),expire:10});*/
