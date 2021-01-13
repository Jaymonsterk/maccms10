$(function () {
    if (document.cookie.match(new RegExp('(^| )PCA=([^;]*)(;|$)'))) {
        $('.cover,.weclcome_alert').hide();
    } else {
        $('.cover,.weclcome_alert').show();
        var exp = new Date(); //获得当前时间
        exp.setTime(exp.getTime() + 4 * 60 * 60 * 1000); //换成毫秒
        document.cookie = 'PCA=exist;expires=' + exp.toGMTString();
        console.log(exp);
    }
    $('#webUrl').val(window.location.hostname);
    $('#copyUrl').on('click', function () {
        $('#webUrl')[0].select();
        document.execCommand('Copy');
        alert('复制成功');
    });
    $('.alert_close').click(function() {
        $('.cover').css('display', 'none')
        $('.weclcome_alert').css('display', 'none')
    })
    $('.broadroll').rollCaster();
})