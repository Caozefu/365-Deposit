/*
* 发起jsonp请求
* @params url 请求url
* @params callback 请求回调函数
* */
export function fetchJsonp(url, callback) {
    if (!callback || typeof callback !== 'function') return;
    if (!window.cb) window.cb = callback;

    const tag = document.createElement('script');
    tag.src = url;
    document.body.appendChild(tag);
    document.body.removeChild(tag);
}
