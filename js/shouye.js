
var Head=utils.getByClass(document,'head')[0]
var oDiv = document.getElementById('box');
var Div = oDiv.getElementsByTagName('div')[0];
var oImgs = Div.getElementsByClassName('focus_img');
var oUl = document.getElementById('ul1');
var oLi = oUl.getElementsByTagName('li');
var oLeft = document.getElementById('btn_prev');
var oRriht = document.getElementById('prev_right');
var Denglu=utils.getByClass(document,'denglu')[0]
var Dengdiv1=utils.getByClass(document,'denglu1')[0]
var Dengdiv2=utils.getByClass(document,'denglu2')[0]
var Dengdiv3=utils.getByClass(document,'denglu3')[0]
var Dengqq=utils.getByClass(document,'qiuck_user')[0]
var Dengluqq=utils.getByClass(document,'dengluqq')[0]
var Dengluwx=utils.getByClass(document,'dengluwx')[0]
var Dengxiaochu=utils.getByClass(document,'dengguan')
var Dengluback=utils.getByClass(document,'dengluzheng')[0]
var LunboDiv=utils.getByClass(document,'luobodiv')[0];
var Lunbodiv=utils.children(LunboDiv,"div")
var Checked=utils.getByClass(document,'checked')[0];
var Ch=utils.getByClass(document,'ch')[0];
var Dengluspanq=utils.getByClass(document,'dengluspanq');
var Dengluspanw=utils.getByClass(document,'dengluspanw');
//导航消失F
window.onscroll=Headdisplay;
function Headdisplay(){
    if((document.documentElement.scrollTop||document.body.scrollTop)>(document.documentElement.clientHeight||document.body.clientHeight)){
        utils.css(Head,"display","none");
        utils.css(Backtop,"display","block");
    }else{
        utils.css(Head,"display","block");
        utils.css(Backtop,"display","none");
    }
}
//回到顶部
var Backtop=utils.getByClass(document,'backtop')[0];
Backtop.onclick=function(){
    utils.css(Backtop,'display','none');
    window.onscroll=null;
    var target=document.documentElement.scrollTop||document.body.scrollTop;
    var step=(target/500)*10;
    var timer=setInterval(function(){
        var curT=document.documentElement.scrollTop||document.body.scrollTop;
        if(curT<=0){
            clearInterval(timer);
            return
        }
        curT-=step;
        document.documentElement["scrollTop"]=document.body["scrollTop"]=curT;
        window.onscroll=Headdisplay;
    },10)
}
//登录账户样式
Dengqq.onclick=function(){
    utils.css(Denglu,"display","block");
    utils.css(Dengluback,"display","block");
}
for(var i=0;i<Dengxiaochu.length;i++){
    Dengxiaochu[i].onclick=function(){
        utils.css(Denglu,"display","none");
        utils.css(Dengluback,"display","none");
        utils.css(Dengdiv2,"display","none");
        utils.css(Dengdiv3,"display","none");
    }
}
Dengluqq.onclick=function(){
    utils.css(Dengdiv2,"display","block");
    utils.css(Dengdiv3,"display","none");
    console.log(1)
}
Dengluwx.onclick=function(){
    utils.css(Dengdiv3,"display","block");
    utils.css(Dengdiv2,"display","none");
}
utils.css(Checked,"display","block");
Checked.onclick=function(){
    utils.css(Checked,"display","none");
    utils.css(Ch,"display","block");
}
Ch.onclick=function(){
    utils.css(Checked,"display","block")
    utils.css(Ch,"display","none");
}
for(var i=0;i<Dengluspanq.length;i++){
    Dengluspanq[i].onclick=function(){
        utils.css(Dengdiv2,"display","block");
        utils.css(Dengdiv3,"display","none");
    }
}
for(var i=0;i<Dengluspanw.length;i++){
    Dengluspanw[i].onclick=function(){
        utils.css(Dengdiv3,"display","block");
        utils.css(Dengdiv2,"display","none");
    }
}
//登录拖拽
peiEvent.on(Denglu,'mousedown',down);
function down(ev){
    this["strX"]=ev.clientX;
    this["strY"]=ev.clientY;
    this["strL"]=this.offsetLeft;
    this["strT"]=this.offsetTop;
    if(this.setCapture){
        this.setCapture();
        on(this,'mousemove',move)
        on(this,'mouseup',up)
        return
    }
    this["MOVE"]=move.bind(this);
    this["UP"]=up.bind(this)
    peiEvent.on(document,'mousemove',this["MOVE"])
    peiEvent.on(document,'mouseup',this["UP"])
}
function move(ev){
    var curL=ev.clientX-this["strX"]+parseFloat(this["strL"])
    var curT=ev.clientY-this["strY"]+parseFloat(this["strT"])
    var maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    curL=curL<0?0:(curL>maxL?maxL:curL);
    curT=curT<0?0:(curT>maxT?maxT:curT);
    this.style.left=curL+'px';
    this.style.top=curT+'px';
}
function up(){
    if(this.releaseCapture){
        this.releaseCapture();
        peiEvent.off(this,"mousemove",move)
        peiEvent.off(this,"mouseup",up)
    }
    peiEvent.off(document,"mousemove",this["MOVE"])
    peiEvent.off(document,"mouseup",this["UP"])
}
//轮播图样式
utils.css(oImgs[0], "opacity", 1);
utils.css(Lunbodiv[0],"display","block")
utils.css(oImgs[0], "z-Index", 1)
var step = 0;
var timer = setInterval(automove, 2000);
function automove() {
    if (step >= oImgs.length - 1) {
        step = -1;
    }
    step++;
    banner();
}
function banner() {
    for(var i=0; i<oImgs.length; i++){
        var curDiv=oImgs[i];
        if(i==step){
            //当某张图片的索引等于step的时候，这张图片就是我们要显示的图片，让他的层级为1；同时让其他元素的层级为0
            utils.css(curDiv,'zIndex',1);
            //让层级为1的这个元素，透明度从0-1；运动结束后，让他兄弟元素透明度为0；
            Animate(curDiv,{opacity:1},600,function(){
                var siblings=utils.siblings(this);
                for(var i=0; i<siblings.length; i++){
                    utils.css(siblings[i],'opacity',0);
                }
            });
            continue;
        }
        utils.css(curDiv,'zIndex',0)//其他元素层级为0；
        change(step)
    }

//        for (var i = 0; i < oImgs.length; i++) {
//            if (i == step) {
//                for (var j = 0; j < oImgs.length; j++) {
//                    utils.css(oImgs[j], "opacity", 0);
//                    utils.css(oImgs[j], "z-Index", 0)
//                    console.log(1)
//                }
//                utils.css(oImgs[i], "z-Index", 1);
//                Animate(oImgs[i], {'opacity': 1},400);
//                change(step)
//            }
//        }
}
function change(n) {
    for (var i = 0; i < oLi.length; i++) {
        utils.removeClass(oLi[i], 'back');
        utils.css(oLi[i], "opacity", 0.5)
        utils.css(Lunbodiv[i], "display","none")
    }
    utils.addClass(oLi[n], 'back')
    utils.css(oLi[n], "opacity", 1)
    utils.css(Lunbodiv[n],"display","block")
}
stop()
function stop() {
    oDiv.onmouseover = function () {
        clearInterval(timer)
    }
    oDiv.onmouseleave = function () {
        timer = setInterval(automove, 2000);
    }
}
//    handchange()
//    var flag=1;
//    function handchange() {

handleChange();
function handleChange(){
    for(var i=0; i<oLi.length; i++){
        (function(index){
            var curLi=oLi[index];
            curLi.onmouseover=function(){
                step=index;
                banner();
            }
        })(i)
    }
}
//        for (var i = 0; i < oLi.length; i++) {
//            var sur = oLi[i];
//            sur.index = i;
//            sur.onclick = function () {
//                step = this.index;
//
//                banner();
//                flag=false;
//                window.setTimeout(function(){
//                    flag=false
//                })
//            }
//        }
//    }
oRriht.onclick = automove
oLeft.onclick =function () {
    if (step <=0) {
        step = oImgs.length;
    }
    step--;
    banner();
};
//点击图片显示大图片


function toMimute(){
    var dUl=utils.getByClass(document,'ad_spread_lists')[0];
    var Lis=utils.getByClass(document,'cs');

    var siblings=[];

    for(var i=0;i<Lis.length;i++){
        Lis[i].onmouseover=function(){

            var childlast=utils.lastChild(this);
            siblings=utils.siblings(this);
            var next=utils.next(this)||utils.prev(this);
            Animate(this,{'width':1000},100);
            Animate(childlast,{'width':750},100);
            for(var i=0;i<siblings.length;i++){
                Animate(siblings[i],{'width':0},100)
            }
            Animate(next,{'width':250},100)
        }

        Lis[i].onmouseout=function(){
            var childlast=utils.lastChild(this);
            siblings=utils.siblings(this)
            var next=utils.next(this)
            Animate(childlast,{'width':0},100)
            Animate(this,{'width':250},100)
            for(var i=0;i<siblings.length;i++){
                Animate(siblings[i],{'width':250},100)
            }
        }

    }
}

toMimute()



