// alert("hello");
// 对于元素的获取，类名的获取及增删操作可各自独立封装成函数
//获取单个元素
var getElement = function(selector){
    return document.querySelector(selector);
}
//获取多个元素
var getAllElement = function(selector){
    return document.querySelectorAll(selector);
}
//获取元素类名
var getCls = function(element){
    return element.getAttribute("class");
}
//设置元素类名
var setCls = function(element,cls){
    return element.setAttribute("class",cls);
}
//为元素添加类名
var addCls = function(element,cls){
    var baseCls = getCls(element);
    // 判断是否存在要添加的类名
    if(baseCls.indexOf(cls) === -1){
    	// 注意用空格连接类名
        setCls(element,baseCls+" "+cls);
    }
}
//为元素删除类名
var delCls = function(element,cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls) !== -1){
    	// 字符串的分解，拼接，替换操作以及正则表达式 \s匹配空白字符 +至少一次
        setCls(element,baseCls.split(cls).join(" ").replace(/\s+/g," "));
    }
}
// 所有需要动画效果的元素 用对象字面量表示
var screenAnimateElements = {
    ".screen-1":[
        ".header",
        ".screen-1__heading",
        ".screen-1__subheading"
    ],
    ".screen-2":[
        ".screen-2__heading",
        ".screen-2__line",
        ".screen-2__subheading",
        ".screen-2__person",
        ".screen-2__rocket"
    ],
    ".screen-3":[
        ".screen-3__left",
        ".screen-3__heading",
        ".screen-3__line",
        ".screen-3__subheading",
        ".screen-3__type"
    ],
    ".screen-4":[
        ".screen-4__heading",
        ".screen-4__line",
        ".screen-4__subheading",
        ".screen-4__features__item_1",
        ".screen-4__features__item_2",
        ".screen-4__features__item_3",
        ".screen-4__features__item_4"
    ],
    ".screen-5":[
        ".screen-5__img",
        ".screen-5__heading",
        ".screen-5__line",
        ".screen-5__subheading"
    ]
}

// 初始化样式,将所有样式都变为init
var setScreenAnimateInit=function(screenCls){
	// var screen=document.querySelector(screenCls);
	// animateElements是一个数组，每一屏需要设置动画的元素的类名
	var animateElements=screenAnimateElements[screenCls];
	for(var i=0;i<animateElements.length;i++){
		// 先获取到每个需要设置动画的元素，即上述对象字面量的每一个数组中的类名对应的元素
		var element=document.querySelector(animateElements[i]);
		// 获取元素类名
		var baseCls=element.getAttribute("class");
		// 为每个需要动画的元素添加init样式，即增加新的类名
		element.setAttribute("class", baseCls+" "+animateElements[i].substr(1)+"_animate_init");
		// 字符串的 substr()用法 用于去掉类名前面的"."
	}
}
// 元素样式从init变为done  形式同上 代码重复量较多
var setScreenAnimateDone = function(screenCls){
    // var screen = document.querySelector(screenCls);
    var animateElements = screenAnimateElements[screenCls];
    for(var i=0;i<animateElements.length;i++){
            //先获取到每个需要动画的元素,即screenAnimateElements中的每个数组对象中的值
            var element = document.querySelector(animateElements[i]);
            //再获取每个元素的类名
            var baseCls = element.getAttribute("class");
            //将元素名改成done
            element.setAttribute("class",baseCls.replace("_animate_init","_animate_done"));
    }
}
// 页面加载是初始化样式
window.onload=function(){
	for(var k in screenAnimateElements){
		if(k===".screen-1"){
			continue;
		}
		setScreenAnimateInit(k);
	}
}
// 第一屏在页面加载时就自动开始动画了
setTimeout(function(){
	setScreenAnimateDone('.screen-1')
},10);

// 导航项和侧边栏项的哪一个处于激活状态，红色滑条处于相应位置
var tip = getElement(".header__nav__tip");
var switchNavItemsActive=function(idx){
    // 先重置，再添加类名样式
    //清除头部导航项当前样式
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],"header__nav__item_active");
        tip.style.left = 0+"px";
    }
    addCls(navItems[idx],"header__nav__item_active");
    tip.style.left = (idx*99)+"px";
    //清除右边导航样式
    for(var i=0;i<outlineItems.length;i++){
        delCls(outlineItems[i],"outline_status_back_active");
        tip.style.left = 0+"px";
    }
    addCls(outlineItems[idx],"outline_status_back_active");
    tip.style.left = (idx*99)+"px";
}

// 鼠标滑动滚动条，页面依次发生动画
window.onscroll=function(){
	// 获取滚动条高度值，依次为依据来判断何时出发动画 兼容性问题
	var top=document.body.scrollTop||document.documentElement.scrollTop;
	if(top > 60){
		// 当滚动条大于60时，导航条变化，侧边栏也显现出来，即添加相应的类名
		addCls(getElement(".header"),"header_status_back");
        addCls(getElement(".outline"),"outline_status_back");
	}else{
		// 否则回复初始
		delCls(getElement(".header"),"header_status_back");
        delCls(getElement(".outline"),"outline_status_back");
	}
	if(top >= 0){
        setScreenAnimateDone(".screen-1");
        switchNavItemsActive(0);
    }
    if(top > 1*640-120){
        // 给火箭增加动画
        var rocket = getElement(".screen-2__rocket");
        addCls(rocket,"screen-2__rocket_animation");
        setScreenAnimateDone(".screen-2");
        switchNavItemsActive(1);
    }
    if(top > 2*640-110){
        // 给小圆标增加动画
        var type = getElement(".screen-3__type");
        addCls(type,"screen-3__type_animation");
        setScreenAnimateDone(".screen-3");
        switchNavItemsActive(2);
    }
    if(top > 3*640-110){
        setScreenAnimateDone(".screen-4");
        switchNavItemsActive(3);
    }
    if(top > 4*640-110){
        setScreenAnimateDone(".screen-5");
        switchNavItemsActive(4);
    }
}

// 将头部导航和侧边栏导航与每一屏相关联，点击导航即刻跳转到相应屏
// 获取导航相应的DOM元素
var navItems=getAllElement(".header__nav__item");
var outlineItems=getAllElement(".outline__item");
var setNavJump=function(i,lib){
	// lib即为导航元素数组 为数组中的每一个元素绑定点击事件
	lib[i].onclick=function(){
		document.documentElement.scrollTop=i*640;
	}
}
for(var i=0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
	setNavJump(i,outlineItems);
}


//鼠标滑过头部导航是滑动效果
var index = 0;
var setTip = function(idx){
    // 为导航项绑定鼠标事件
    navItems[idx].onmousemove = function(){
        tip.style.left = (idx*99)+"px";
    }
    // 鼠标滑出时判断哪一项处于激活状态，滑动条便移到相应位置
    navItems[idx].onmouseout = function(){
        for(var i=0;i<navItems.length;i++){
            if(getCls(navItems[i]).indexOf("header__nav__item_active") !== -1){
                break;
            }
            index = i;
        }
        tip.style.left = (i*99)+"px";
    }
}
for(var i=0;i<navItems.length-1;i++){
    setTip(i);
}

