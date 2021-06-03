function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, attr));

    //如果初始值比目标值大，则speed取负数
    //举例，初始位置在目标位置右边，则speed取负数，向左移动
    if (current > target) {
        speed = -speed;
    }

    obj.timer = setInterval(function() {
        //取出attr样式的参数转换为有效值赋给oldValue
        var oldValue = parseInt(getStyle(obj, attr));

        var newValue = oldValue + speed;

        //按右侧按钮时，假设初始值为-1020，则按下按钮后目标值为-2040，speed为40
        // 按左侧按钮时， 假设初始值为 - 1020， 则按下按钮后目标值为0， speed = -40，
        // if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
        //     newValue = target;
        // }

        if (Math.abs(target - newValue) > Math.abs(speed)) { //与目标的距离 > 每次移动的step
            obj.style[attr] = newValue + "px";
        } else { //马上到达目标了（与目标的距离 < step）
            clearInterval(obj.timer); //清理定时器
            obj.style[attr] = target + "px"; //直接到达目标位置
            callback && callback();
        }

        // obj.style[attr] = newValue + "px";
        // if (newValue == target) {
        //     clearInterval(obj.timer);
        //     callback && callback();
        // }


    }, 30)
}

//获取元素当前显示的样式
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    }
}


function animateMove(element, target) {
    //先清理定时器（为了保证每次调用的都是同一个定时器 或者说 无论点多少次按钮都只调用一个定时器）
    clearInterval(element.timeId);
    //启动一个定时器，定时器的Id值存储到了一个对象的属性中
    element.timeId = setInterval(function() {
        var current = element.offsetLeft; //获取当前ul的位置(数字类型)
        var step = 20;
        step = target - current > 0 ? step : -step; //决定左右移动方向
        current += step; //当前移动到的位置
        if (Math.abs(target - current) > Math.abs(step)) { //与目标的距离 > 每次移动的step
            element.style.left = current + "px";
        } else { //马上到达目标了（与目标的距离 < step）
            clearInterval(element.timeId); //清理定时器
            element.style.left = target + "px"; //直接到达目标位置
        }
    }, 10);
}