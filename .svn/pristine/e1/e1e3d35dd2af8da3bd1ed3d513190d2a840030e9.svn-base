import moment from 'moment/moment'
import api from '../service/api'
import { Toast } from 'mint-ui';
/*
* 时间格式化
*/
export const moments = (value) => {
    moment.locale('zh-cn');
    return moment(value).format('YYYY-MM-DD');
}

/*
* 时间格式化 Y-M-d H:m
*/
export const momentsHm = (value) => {
    moment.locale('zh-cn');
    return moment(value).format('YYYY/MM/DD HH:mm');
}
/*
* 时间格式化 Y/M/d
*/
export const momentsYHm = (value) => {
    moment.locale('zh-cn');
    return moment(value).format('MM月DD');
}

export const getMyScoreList = (value) => {

    let list = [];
    for (let i = 0; i < value.length; i++) {
        let ScorePoints = parseInt(value[i].ScorePoints);
        if (ScorePoints < 0 && (value[i].ChangeType=="直播门票" ||value[i].ChangeType=="直播发言" ||value[i].ChangeType=="直播报名") ){
            
            console.log("afsdf"+ScorePoints,ScorePoints < 0 && value[i].ChangeType=="直播门票" ||value[i].ChangeType=="直播发言" ||value[i].ChangeType=="直播报名");
            list.push(value[i]);
        }
    }
    return list;
}
/*
* 时间格式化 yyyy年mm月dd日
*/
export const momentsYMD = (value) => {
    moment.locale('zh-cn');
    return moment(value).format('YYYY年MM月DD日');
}

/*
* 时间格式化 mm月dd日
*/
export const momentsmMD = (value) => {
    moment.locale('zh-cn');
    return moment(value).format('MM.DD');
}
/*
    年份加1年
*/

export const momentsAdd = (value) => {

    var m = moment(value); // the day before DST in the US
    m.months(); // 5
    m.add(12, 'months').months();
    m.locale('zh-cn');
    return moment(m).format('YYYY-MM-DD');
}
/*
    天数加1
*/
export const momentsAddDay = (value) => {

    var m = moment(value); // the day before DST in the US
    m.days(); // 5
    m.add(1, 'days').days();
    m.locale('zh-cn');
    return moment(m).format('YYYY-MM-DD');
}


/*
    时间减1年
*/
export const momentsSubtract = (value) => {

    var m = moment(value); // the day before DST in the US
    m.months(); // 5
    m.subtract(12, 'months').months();
    m.locale('zh-cn');
    return moment(m).format('YYYY-MM-DD');
}
/**
 * 校验登录
 */
export const checkLogin = bool => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (!userInfo || userInfo == undefined) {
        return false;
    }
    return true;
}


/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    var resData = localStorage.getItem(name);
    if (!resData) return;
    resData = JSON.parse(resData)
    return resData;
    // return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
   校验手机号
 */
export const checkMobile = mobile => {
    if (!mobile) return false;
    // var re = /^1\d{10}$/;
    var re = /^1[34578]\d{9}$/;
    if (re.test(mobile)) {
        return true;
    } else {
        return false
    }
}

/**
  是否包含某个字符 //nancy
 */

export const containStr = (a, obj) => {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return i;
        }
    }
    return -1;
}

/**
   数组是否包含某个元素 //nancy
 */

export const contains = (a, obj) => {
    for (var i = 0; i < a.length; i++) {
        if (a[i].secucode == obj.secucode) {
            return i;
        }
    }
    return -1;
}

export const containAnswer = (a, obj) => {
    for (var i = 0; i < a.length; i++) {
        if (a[i].questionId == obj.s_id) {
            return i;
        }
    }
    return -1;
}

/**
   校验数组是否为空或者不存在 //nancy
 */
export const isArrayValid = array => {
    if (array == undefined || array == null || array == "") {
        return false;
    }
    return true;
}

//校验是否为空数组
export const isEmptyArray = array => {
    if (array == undefined || array == null || array == "" || array == []) {
        return true;
    }
    return false;

}
export const checkValue = str => {
    if (str == undefined || str == null || str == "") {
        return false
    }
    return true;
}
/**
   校验字典是否为空或者不存在 
 */
export const isDicValid = dic => {
    if (dic == undefined || dic == null || dic.length == 0 || dic == {}) {
        return false;
    }
    return true;

}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}


/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll', () => {
        showBackFun();
    }, false)
    document.addEventListener('touchstart', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchmove', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    }, { passive: true })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            } else {
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        } else {
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    } else if (duration instanceof String) {
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") {
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        } else {
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
        } else {
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch (mode) {
                case 'ease-out':
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration * 20 / 400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch (mode) {
                case 'ease-out':
                    status = iCurrent != target[attr];
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr];
            }

            if (status) {
                flag = false;
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                } else {
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}
