class CommonFN{
    size:number = 18;
    defaultexpire:number = 1800;
    constructor(){

    }
    /** TODO: 任意格式化时间
     *  @param data：传进来色时间 fmt：格式化模本
     *  @return fmt 格式化之后
     * */
    formatterDate(date:Date,fmt:string):string{
        let o = {
            "y+": date.getFullYear(),
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S+": date.getMilliseconds()             //毫秒
        };
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)){
                if(k == "y+"){
                    fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
                }
                else if(k=="S+"){
                    let lens = RegExp.$1.length;
                    lens = lens==1?3:lens;
                    fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
                }
                else{
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
        }
        return fmt;
    }
   /**
    * TODO: 精确加
    * @Param: {
    *   arg1：加数
    *   arg2：被加数
    * }
    * @return: Number 和
    */
    accAdd(arg1:number, arg2:number):number{
       if (isNaN(arg1)) {
           arg1 = 0;
       }
       if (isNaN(arg2)) {
           arg2 = 0;
       }
       arg1 = Number(arg1);
       arg2 = Number(arg2);
       let r1, r2, m, c;
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
           let cm = Math.pow(10, c);
           if (r1 > r2) {
               arg1 = Number(arg1.toString().replace(".", ""));
               arg2 = Number(arg2.toString().replace(".", "")) * cm;
           } else {
               arg1 = Number(arg1.toString().replace(".", "")) * cm;
               arg2 = Number(arg2.toString().replace(".", ""));
           }
       } else {
           arg1 = Number(arg1.toString().replace(".", ""));
           arg2 = Number(arg2.toString().replace(".", ""));
       }
       return (arg1 + arg2) / m;

    }
    /**
     * TODO: 精确减
     * @Param: {
     *   arg1：减数
     *   arg2：被减数
     * }
     * @return: Number 差
     */
    accSub(arg1:number, arg2:number):number{
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        let r1, r2, m, n;
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
    }
    /**
     * TODO: 精确乘
     * @Param: {
     *   arg1：乘数
     *   arg2：被乘数
     * }
     * @return: Number 积
     */
    accMul(arg1:number, arg2:number):number{
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
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
    }
    /**
     * TODO: 精确除
     * @Param: {
     *   arg1：除数
     *   arg2：被除数
     * }
     * @return: Number 积
     */
    accDiv(arg1:number, arg2:number):number{
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        let t1 = 0, t2 = 0, r1, r2;
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
    }
    /**
     * TODO: 创建元素
     * @Param: tag 需要创建的标签
     * @return: Element 标签
     */
    createTag(tag){
        return document.createElement(tag);
    }
    /**
     * TODO: 隐藏弹窗
     * @Param: domId;弹窗id
     * @return: null
     */
    hidePopup(domId){
        domId.remove();
        document.getElementById('gl-mask').remove();
    }
    /**
     * TODO: 创建loading
     * @Param: null
     * @return: null
     */
    createLoadings():void{
        let load = `<div class="loader">
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                    </div>`;
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML = load;
    }

    /**
     * TODO: cookies
     * @Param: null
     * @return: null
     */
    setCookies(key:string,value:any,time:number):void{
        //获取当前时间
        let cur = new Date();
        //设置指定时间
        cur.setTime(cur.getTime()+time*1000);
        //创建cookie  并且设置生存周期为GMT时间
        document.cookie = key+'='+encodeURIComponent(value)+';expires='+(!time?'':cur.toUTCString());
    }
    getCookies(key:string):any{
        //获取cookie
        let data = document.cookie;
        //获取key第一次出现的位置    pwd=
        let startIndex = data.indexOf(key+'=');
        //  name=123;pwd=abc
        //如果开始索引值大于0表示有cookie
        if(startIndex>-1) {
            //key的起始位置等于出现的位置加key的长度+1
            startIndex = startIndex+key.length+1;
            //结束位置等于从key开始的位置之后第一次;号所出现的位置
            let endIndex = data.indexOf(';',startIndex);
            //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
            endIndex = endIndex<0 ? data.length:endIndex;
            return decodeURIComponent(data.substring(startIndex,endIndex));
        }else {
            return '';
        }
    }
    delCookies(key):void{
        //获取cookie
        let data = this.getCookies(key);
        //如果获取到cookie则重新设置cookie的生存周期为过去时间
        if(data){
            this.setCookies(key,data,-1);

        }
    }

    /**
     * TODO: LocalStorage 本地持久化储存
     * @Param: null
     * @return: null
     */
    setLocalStorage(key,value){
        window.localStorage.setItem(key,JSON.stringify(value));
    }
    getLocalStorage(key){
        window.localStorage.getItem(key);
    }
    removeLocalStorage(key){
        window.localStorage.removeItem(key);
    }

    /**
     * TODO: 滚动条离左右的距离 调用 scroll().top window.onscroll = function(){}
     * @Param: null
     * @return: {top , left}
     */
    scroll():object{
        if(window.pageXOffset){
            return {
                top:window.pageYOffset,
                left:window.pageXOffset
            }
        }else if(document.compatMode === 'CSS1Compat'){
            return {
                top: document.documentElement.scrollTop,
                left: document.documentElement.scrollLeft
            }
        }
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }

    /**
     * TODO: 获取可视区宽度高度 调用 viewClient().width
     * @Param: null
     * @return: {width , height}
     */
    viewClient():object{
        if(window.innerWidth){
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }else if(document.compatMode === 'CSS1Compat'){
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }

    /**
     * TODO: 阻止冒泡
     * @Param: event
     * @return: null
     */
    stopPropagation(event):void{
        let e  = event || window.event;
        if(e && e.stopPropagation){
            e.stopPropagation();
        }else { //ie
            e.cancelBubble = true;
        }
    }

}
let common = new CommonFN();

