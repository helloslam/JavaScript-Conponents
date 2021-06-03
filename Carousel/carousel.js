window.onload = function() {
    var box = document.getElementById("box"); //轮播屏幕显示区
    var pictureList = document.getElementById("pictureList"); //需要改变的left的长胶片
    var pictureArr = document.getElementsByTagName("img"); //获取全部图片存入数组
    var nav = document.getElementById("nav"); //导航点的盒子
    var as = document.getElementsByTagName("a"); //获取全部导航点
    var buttonDiv = document.getElementById("buttonDiv"); //按钮的盒子
    var buttonArr = document.getElementsByTagName("button"); //获取全部按钮

    //1020为图片的1000+边距20，乘图片数等于胶片总长
    //这个设置避免ul由于宽度限制无法横向浮动
    pictureList.style.width = pictureArr.length * 1020 + "px";
    //定时器预处理
    timer1 = null;
    //图片首尾两张图片为冗余部分，主要为无缝切换的处理服务
    //因此初始索引为1，显示img1图片，第一个超链接选中样式
    var index = 1;
    as[0].style.backgroundColor = "white";
    //为导航点锁死居中定位，随导航点个数的增减自适应
    nav.style.left = (box.offsetWidth - nav.offsetWidth) / 2 + "px";
    //按钮初始设置为隐藏
    buttonDiv.style.display = "none";

    //判断ul距离左测的位置------offsetLeft

    //鼠标悬停，关闭动画，显示按钮
    pictureList.addEventListener("mouseover", function() {
        //清除定时器
        clearInterval(timer1);
        //显示按钮
        buttonDiv.style.display = "block";
    });
    //为避免鼠标移入buttonDiv时按钮消失的人工智障现象，给buttonDiv也设置悬停事件
    buttonDiv.addEventListener("mouseover", function() {
        //清除定时器
        clearInterval(timer1);
        //显示按钮
        buttonDiv.style.display = "block";
    });

    //鼠标移出，开启动画
    pictureList.addEventListener("mouseout", function() {
        //开启动画前先清除定时器，确保同时只有一个定时器在运行
        clearInterval(timer1);
        //开启动画
        autoChange();
        //隐藏按钮
        buttonDiv.style.display = "none";
    });

    //单击左侧按钮切换图片
    buttonArr[0].addEventListener("click", function() {
        clearInterval(timer1);
        var leftindex = index;
        leftindex--;
        if (leftindex < 0) {
            leftindex = pictureArr.length;
        }
        move(pictureList, "left", -1020 * leftindex, 60, function() {
            if (leftindex <= 0) {
                index = pictureArr.length - 2;
                pictureList.style.left = -1020 * index + "px";
            } else {
                index = leftindex;
            }
            //导航点修正
            setA();
        });
        autoChange();
    });

    buttonArr[1].addEventListener("click", function() {
        clearInterval(timer1);
        var rightindex = index;
        rightindex++;
        rightindex %= pictureArr.length;
        move(pictureList, "left", -1020 * rightindex, 60, function() {
            if (rightindex >= pictureArr.length - 1) {
                index = 1;
                pictureList.style.left = -1020 * index + "px";
            } else {
                index = rightindex;
            }
            //导航点修正
            setA();
        });
    })

    //单击超链接切换图片
    //for循环给a标签的数组做遍历
    for (var i = 0; i < as.length; i++) {
        //因为单击事件是在遍历后执行，所以为了分辨a标签，给其添加新属性tag
        as[i].tag = i;
        //导航点加入单击事件
        as[i].addEventListener("click", function() {
            //清除定时器避免手动切换图片时的动画与轮播图自动播放的动画互相干扰
            clearInterval(timer1);
            //取出行为导航点的tag赋值给aindex
            //注意此处不直接使用index的原因是当在点击事件中直接改变img索引会导致图片秒切
            var aindex = this.tag;
            //考虑到img0为前置溢出图，因此tag0需要对应img1，索引加1
            aindex++;
            //由于第一张图为用于无缝切换效果的溢出图，因此索引+1，超链接[0]绑定给img[1]
            move(pictureList, "left", -1020 * aindex, 60, function() {
                //当单击导航点切换图片的动画执行完后，改变全局图片索引
                index = aindex;
                //修正导航点选中效果
                //此处上下句顺序不能颠倒，因为setA基于index的值进行处理，所以需要先修正index
                setA();
            });
            //开启自动轮播动画
            autoChange();
        });
    };

    //导航点样式的设置
    function setA() {
        //遍历全部导航点
        for (var i = 0; i < as.length; i++) {
            //所有导航点的颜色设置
            as[i].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        }
        //被选中导航点的颜色设置，同样是考虑到溢出图的问题，所以索引-1
        as[index - 1].style.backgroundColor = "white";
    };

    autoChange();
    var timer1;

    //自动轮播效果函数
    function autoChange() {
        //此时函数刚开始执行，index为初始值1，越过左侧溢出处理图，正常显示第一张图片
        pictureList.style.left = -1020 * index + "px";
        //设置轮播定时器Timer1
        timer1 = setInterval(function() {
            //每个3000毫秒切换到下一张
            index++;
            //给index对数组长度取余，限制索引数量与图片数量对应，防止跑飞
            index %= pictureArr.length;
            //做切换
            move(pictureList, "left", -1020 * index, 40, function() {
                //轮播图的播放是一直同向的
                //当换到最后一张准备好的右侧溢出图时，秒切index到第一张图片
                //偷梁换柱实现无缝切换
                if (index >= pictureArr.length - 1) {
                    index = 1;
                    pictureList.style.left = -1020 * index + "px";
                };
                //导航点修正
                setA();
            });
        }, 3000);
    };
};