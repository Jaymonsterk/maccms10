$.fn.rollCaster = function () { 
    for (var i = 0, max = this.length; i < max; i++) { 
        this[i].rollCasterData = {
            self: $(this[i]),
            core: $(this[i]).find('.caster_roll'),
            begin:0,
            interval: null,
        };
        if (this[i].rollCasterData.core.length > 0){ 
            this[i].rollCasterData.self.append(this[i].rollCasterData.core.clone(true));
            var param = this[i];
            this[i].rollCasterData.interval = setInterval(function (obj) {
                obj.rollCasterData.begin -= 1;
                obj.rollCasterData.core.css({ 'margin-left': obj.rollCasterData.begin + 'px' });
                if (-obj.rollCasterData.begin >= obj.rollCasterData.core.width()) {
                    obj.rollCasterData.begin = 0;
                }
            }, 20, param); 
        }
    }
}
$(function () {
    var detecH=$(window).height();
    new function lazyLoad(){
        var slef=this;
        this.windowH=detecH;
        this.scrollTop=$(window).scrollTop();
        this.content=$('.img[data-src]');
        this.interval=null;
        this.excution=function(){
            slef.content=$('.img[data-src]');
            if(slef.content.length>0){
                slef.scrollTop=$(window).scrollTop();
                for(var i=0;i<slef.content.length;i++){
                    var item=slef.content.eq(i);
                    if(item.data('src')&&item.offset().top<(slef.windowH+slef.scrollTop+400)&&item.offset().top>(slef.scrollTop-200)){
                        item.attr('src',item.data('src')).removeAttr('data-src');
                    }
                }
            }else{
                clearInterval(this.interval);
            }
        }
        this.interval=setInterval(this.excution,50);
    };
    new QRCode(document.getElementById("codeImg"), {
        text:  configs.applink,
        width: 140,//document.body.clientWidth*0.5,
        height: 140,//document.body.clientWidth*0.5,
        colorDark : "#e03116",
        colorLight : "#fff",
        correctLevel : QRCode.CorrectLevel.H
    });
    $('.range .span').click(function () {
        $('#searchtypeval').val($(this).data('value'));
        $('.range .span').removeClass('active');
        $(this).addClass('active');
    });
    $('.range_wap .value').click(function () {
        $('.range_wap .options').css({ 'display':'block' });
    });
    $('.range_wap .options .span').click(function () {
        $('#searchtypeval').val($(this).data('value'));
        $('.range_wap .value').html($(this).text());
        $('.range_wap .options .span').removeClass('active');
        $(this).addClass('active');
        $('.range_wap .options').css({ 'display':'none' });
    });
    $('#search_form .search_submit').click(function () {
        $('#search_form').submit();
    });
    function addPropaganda(JQdom,data,canClose){
        var htmlString='',
            date=parseInt(new Date().getTime()/1000);
        $.each(data, function (keyName, valueOfElement) {
            if(date>=valueOfElement.stime&&date<=valueOfElement.etime){
                htmlString+='<a class="link" target="_blank" href="'+valueOfElement.url+'"><span class="img_wapper"><img class="img" src="'+valueOfElement.img+'?max-age=3600" /></span>'+(canClose?'<span class="close">一键关闭</span>':'')+'</a>';
            }
        });
        JQdom.html(htmlString);
        return htmlString;
    }
    function propaganda(json){
        var widthDetc=$(window).width();
        if(widthDetc>640){
            if(json.pc['2']){
                addPropaganda($('#propagandaLeft'),json.pc['2'],true);
                $('#propagandaLeft .img').on('load',function(){
                    $('.main').addClass('left_spare');
                });
            }
            if(json.pc['3']){
                addPropaganda($('#propagandaRight'),json.pc['3'],true);
                $('#propagandaRight .img').on('load',function(){
                    $('.main').addClass('right_spare');
                });
            }
            if(json.pc['1']){
                addPropaganda($('#propagandaInsert'),json.pc['1'],false);    
                $('#propagandaInsert').css({'display':'flex'});
                if($('#propagandaInsert .link').length%2!=0){
                    $('#propagandaInsert').append('<a class="link connect" target="_blank" href="tencent://message/?uin=123456&Menu=yes">JAV名女优馆广告招商QQ:123456</a>');
                }
            }
            // 播放器左侧广告
            if(json.pc['4']){
                // addPropaganda($('#sideAD_l_test'),json.pc['4'],false);
                // $('#sideAD_l').css({'display':'block'});
                // $('#sideAD_l_test').css({'display':'block'});

                // // 检测是否有广告图片，如果没有，则添加 招商信息
                // if($('#sideAD_l_test .img').length<=0){
                //     $('#sideAD_l_test').css({
                //         'display':'block',
                //         'background':'#ffc7bc',
                //         'color':'#ff6e53'
                //     });
                //     $('#sideAD_l_test').append('<a class="link fillblock" target="_blank" href="tencent://message/?uin=123456&Menu=yes">JAV名女优馆&nbsp;广告招商&nbsp;QQ:123456<br/>点我接洽</a>');
                //     $('#sideAD_l_test a').css({
                //         'writing-mode':'vertical-rl',
                //         'font-size':' 25px',
                //         'line-height': '74px',
                //         'text-align': 'center'
                //     });
                // }
            }
            // 播放器右侧广告
            if(json.pc['5']){
                // addPropaganda($('#sideAD_r_test'),json.pc['5'],false);
                // $('#sideAD_r').css({'display':'block'});
                // $('#sideAD_r_test').css({'display':'block'});
                // // console.log(json.pc['5']);

                // // 检测是否有广告图片，如果没有，则添加 招商信息
                // if($('#sideAD_r_test .img').length<=0){
                //     $('#sideAD_r_test').css({
                //         'display':'block',
                //         'background':'#ffc7bc',
                //         'color':'#ff6e53'
                //     });
                //     $('#sideAD_r_test').append('<a class="link fillblock" target="_blank" href="tencent://message/?uin=123456&Menu=yes">JAV名女优馆&nbsp;广告招商&nbsp;QQ:123456<br/>点我接洽</a>');
                //     $('#sideAD_r_test a').css({
                //         'writing-mode':'vertical-rl',
                //         'font-size':' 25px',
                //         'line-height': '74px',
                //         'text-align': 'center'
                //     });
                // }
            }
        }else{
            if(json.mb['10']){
                addPropaganda($('#propagandaLeft'),json.pc['2'],true);
                $('#propagandaLeft .img').on('load',function(){
                    $('.main').addClass('left_spare');
                });
            }
            if(json.mb['11']){
                addPropaganda($('#propagandaRight'),json.pc['3'],true);
                $('#propagandaRight .img').on('load',function(){
                    $('.main').addClass('right_spare');
                });
            }
            if(json.mb['9']){
                addPropaganda($('#propagandaInsert'),json.mb['9'],false);
                $('#propagandaInsert').css({'display':'flex'});
            }
        }
        if(json.pc['8']){
            addPropaganda($('#propagandaVideoM,#propagandaVideoPC'),json.pc['8'],false);
            if($('#propagandaVideoPC .link').length%2!=0){
                $('#propagandaVideoM,#propagandaVideoPC').append('<a class="link connect" target="_blank" href="tencent://message/?uin=123456&Menu=yes">JAV名女优馆广告招商QQ:123456</a>');
            }
        }
        if(json.pc['12']){
            var filter={},
                counter=0;
            $.each(json.pc['12'], function (keyName, valueOfElement) {
                if(counter<2){
                    filter[keyName]=valueOfElement;
                    counter++;
                }
            });
            addPropaganda($('#propagandaBottom'),filter,false);
            $('#propagandaBottom .img').on('load',function(){
                $('.main').addClass('bottom_spare');
                if($('#propagandaBottom .close').length<=0){
                    var link=$('#propagandaBottom .link').length>1 ? $('#propagandaBottom .link')[Math.random()>0.5?0:1].href : $('#propagandaBottom .link')[0].href;
                    $('#propagandaBottom .link').first().after('<a target="_blank" href='+link+' class="close">一键关闭</a>');
                }
                $('#propagandaBottom .close').click(function(){
                    $('.main').removeClass('bottom_spare');
                });
            });
        };
        if(json.pc['13']){
            var filter=[],
                counter=0;
            $.each(json.pc['13'], function (keyName, valueOfElement) {
                filter.push(valueOfElement);
            });
            if (filter.length > 4) { 
                filter.length = 4;
            }
            if (filter.length = 1) { 
                filter[3]= filter[2] =filter[1] = filter[0];
            }
            if (filter.length = 2) { 
                filter[3] = filter[1];
                filter[2] = filter[0];
            }
            if (filter.length = 3) { 
                filter[3] = filter[0];
            }
            if (filter.length > 0) { 
                var html=addPropaganda($('#propagandaBest'), filter, false);
                if (html) { 
                    $('.recomonde').addClass('show');
                }
            }
            // addPropaganda($('#propagandaBottom'),filter,false);
            // $('#propagandaBottom .img').on('load',function(){
            //     $('.main').addClass('bottom_spare');
            //     if($('#propagandaBottom .close').length<=0){
            //         var link=$('#propagandaBottom .link').length>1 ? $('#propagandaBottom .link')[Math.random()>0.5?0:1].href : $('#propagandaBottom .link')[0].href;
            //         $('#propagandaBottom .link').first().after('<a target="_blank" href='+link+' class="close">一键关闭</a>');
            //     }
            //     $('#propagandaBottom .close').click(function(){
            //         $('.main').removeClass('bottom_spare');
            //     });
            // });
        };
        $('body').on('sideIn',function(){
            if($('.main > .cross_line').length>0){
                var detecAdSide=$('.main > .cross_line').offset().top;
                $(window).on('scroll',function(){
                    if($(window).scrollTop()>=($(window).width()<=840?detecAdSide-76:detecAdSide)){
                        $('.main').addClass('nav_fixed');
                    }else{
                        $('.main').removeClass('nav_fixed');
                    }
                });
            }
            $('#propagandaLeft .close,#propagandaRight .close').on('click', function (e) {
                e.preventDefault();
                $('.main').removeClass('right_spare left_spare');
            });
            $(window).scroll();
        }); 
        $('body').trigger('sideIn'); 
    };
    $('.menu .nav').one('scroll',function(){
        $(this).removeClass('icon_slide');
    });
    document.addEventListener("error", function (e) {
        var dom = $(e.target),
            leftCount = parseInt(dom.data('reload'));
        if (leftCount > 0) {
            leftCount--;
            var reload=dom.attr('src');
            dom.attr('src','/template/imgs/posess.png?max-age=3600').data('src',reload).data('reload',leftCount);
        }
    },true)
    $.ajax({
        url:configs.propaganda,//目的php文件
        data:{},//传输的数据
        type:'get',//数据传送的方式get/post
        dataType:'json',//数据传输的格式是json
        success: function (response) {
           // setTimeout(function () { 
                propaganda(response);
           // },2000)
            
        } ,
        error:function(response){
            console.log(response);
        }
    }); 
});
function setView(target,temp,data){
    $(target).html(juicer($(temp).html(),data));
}

