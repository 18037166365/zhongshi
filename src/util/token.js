const TOKEN_KEY = '_token_';

export function getToken() {
    let TOKEN = sessionStorage.getItem(TOKEN_KEY);
    if (!TOKEN) {
        let _href = location.href;
        let theRequest = {};
        let arr = _href.split(/[?#]/);
        let str;
        arr.some(item => item.indexOf('token=') > -1 && (str = item))
        if (str) {
            let validStr = str.split('&')
            for (var i = 0; i < validStr.length; i++) {
                theRequest[validStr[i].split('=')[0]] = decodeURIComponent(validStr[i].split('=')[1])
            }
            theRequest.token && sessionStorage.setItem(TOKEN_KEY, JSON.stringify(theRequest))
        }
        TOKEN = theRequest
        // if (!theRequest.token) {
        //     alert('返回参数错误')
        //     return
        // }

        // let { href } = window.location;
        // let newHref = href;
        // let reg = /\?token=\S+\&?/;
        // if (reg.test(newHref)) {
        //     newHref = newHref.replace(reg, '')
        // }
        // if (newHref !== href) {
        //     location.replace(newHref)
        // }
    }
    return typeof TOKEN === 'object' ? TOKEN : JSON.parse(TOKEN)
}
