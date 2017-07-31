import {httpJFX} from "../../base/mobilecall/callUpApp";
import {os} from "../../base/ua";
import {stat} from "../../base/fetchData";

/**
 * 拉起繁星客户端首页
 * @name jumpToFxHome
 * @module jumpFunc
 * @param {string} a test a
 * @param {string} b test b
 * @param {string} c test c
 * @param {string} d test d
 */
export function jumpToFxHome() {
    stat(8910);
    httpJFX(null, null, {
        isClick: true
    });
    if (os.android) {
        let fxAction = "fanxing://fanxing.kugou.com/";
        setTimeout(function() {
            location.href =
                "http://a.app.qq.com/o/simple.jsp?pkgname=com.kugou.fanxing&android_schema=" +
                encodeURIComponent(fxAction);
        }, 1000);
    }
}


/**
 *
 * test
 *
 */
export async function test(){
    console.log(123);
}
