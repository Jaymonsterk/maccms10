$(function () { 
    $('.recommend .img').on('load', function () { 
        var wapper = $(this).closest('.img_post');
        var dom = $(this);
        if (dom.width() / dom.height() > wapper.width() / wapper.height()) {
            dom.css({ 'width': 'auto', 'height': '100%' });
        } else { 
            dom.css({ 'width': '100%', 'height': 'auto' });
        }
    })
    if ($('.album .img_post').length > 0) {
        var albumData = {
            portraits: $('.album .img'),
            showBox: $('.scale_layer'),
            showCase: $('.scale_layer .img_wapper'),
            index: null,
            urlParam:function () {
                var respond = {},
                    navUrl = window.location.search;
                if (navUrl.indexOf("?") != -1) {
                    var str = navUrl.substr(1);
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        respond[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return respond;
            },
            postImg: function (dom) { 
                if ($(dom).data('src')) {
                    albumData.showCase.html('<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
                    $(dom).attr('src', $(dom).data('src')).data('src',null);
                    $(dom).on('load', function () {
                        albumData.showCase.html($(dom).clone());
                    });
                } else { 
                    albumData.showCase.html($(dom).clone());
                } 
            },
            goNext:function() { 
                if (albumData.index < albumData.portraits.length - 1) {
                    if (albumData.index == albumData.portraits.length - 2) {
                        $('.scale_layer .icon_next').addClass('new_page');
                    } else {
                        $('.scale_layer .icon_next').removeClass('new_page');
                    }
                    $('.scale_layer .icon_prev').removeClass('new_page');
                    albumData.index++;
                    albumData.postImg(albumData.portraits[albumData.index]);
                    albumData.showBox.removeClass('hide');
                }
            },
            goPrev: function () { 
                if (albumData.index > 0) {
                    if (albumData.index == 1) {
                        $('.scale_layer .icon_prev').addClass('new_page');
                    } else {
                        $('.scale_layer .icon_prev').removeClass('new_page');
                    }
                    $('.scale_layer .icon_next').removeClass('new_page');
                    albumData.index--;
                    albumData.postImg(albumData.portraits[albumData.index]);
                    albumData.showBox.removeClass('hide');
                } 
            }
        }
        $('.album .img_post').on('click', function () {
            albumData.index = $(this).index();
            albumData.postImg(albumData.portraits[albumData.index]);
            albumData.showBox.removeClass('hide');
            $('html,body').css({ 'overflow': 'hidden' });
            if (albumData.index == 0) {
                $('.scale_layer .icon_next').removeClass('new_page');
                $('.scale_layer .icon_prev').addClass('new_page');
            }
            if (albumData.index == albumData.portraits.length - 1) { 
                $('.scale_layer .icon_next').addClass('new_page');
                $('.scale_layer .icon_prev').removeClass('new_page');
            }
        });
        $('body').on('click','.scale_layer .img',function () {
            if ($('.scale_layer').hasClass('zoom_up')) {
                $('.scale_layer').removeClass('zoom_up');
            } else { 
                $('.scale_layer').addClass('zoom_up');
            }
        });
        $('.scale_layer .icon_next').on('click', function () {
            $('.scale_layer').removeClass('zoom_up');
            albumData.goNext();
        });
        $('.scale_layer .icon_prev').on('click', function () {
            $('.scale_layer').removeClass('zoom_up');
            albumData.goPrev();
        });
        $('.scale_layer .icon_close').on('click', function () {
            albumData.showBox.addClass('hide');
            $('html,body').removeAttr('style');
        });
        $('.scale_layer').on('touchmove', function (event) {
            if (event.touches.length <= 1) { 
                event.preventDefault();
            }
        });
        $('.scale_layer').on('swipeUp', function () {
            albumData.goNext();
        });
        $('.scale_layer').on('swipeDown', function () {
            albumData.goPrev();
        });
        if (albumData.urlParam().openNext) { 
            $('.img_post').first().trigger('click');
        }
        if (albumData.urlParam().openPrev) { 
            $('.img_post').last().trigger('click');
        }
    }
})