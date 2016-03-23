var countk = 0;
var count = 0;
var i = 0

$(document).on('keydown', function (e) {
    var windowWidth = $(window).width();
    if (windowWidth >= 768) {
        if (e.keyCode === 68) { // 68 is the letter D on the keyboard
            count++;
            if (count % 2 == 0 && countk < 10) {
                $('.sprite1').removeClass('walk');
                $('.sprite1').removeClass('iddle');
                $('.sprite2').removeClass('walkk');
                $('.sprite2').removeClass('iddlek');
                $('.knight').css({'z-index': '1000'});
                $('.orc').css({'z-index': '998'});
                $('.sprite1').addClass('hurt');
                $('.sprite2').addClass('attackk');
                setTimeout(function () {
                    $('.sprite1').removeClass('hurt');
                    $('.sprite2').removeClass('attackk');
                }, 150);
            }
            if (count % 2 == 0 && countk > 10) {
                $('.sprite1').removeClass('walk');
                $('.sprite1').removeClass('iddle');
                $('.sprite1').addClass('defend');
                setTimeout(function () {
                    $('.sprite1').removeClass('defend');
                }, 150);
            }
            if (count % 2 == 1 && countk < 10) {
                $('.sprite1').removeClass('walk');
                $('.sprite1').removeClass('iddle');
                $('.sprite2').removeClass('walkk');
                $('.sprite2').removeClass('iddlek');
                $('.knight').css({'z-index': '1000'});
                $('.orc').css({'z-index': '998'});
                $('.sprite1').addClass('defend');
                $('.sprite2').addClass('attackk');
                setTimeout(function () {
                    $('.sprite1').removeClass('defend');
                    $('.sprite2').removeClass('attackk');
                }, 150);
            }
        }
        if (e.keyCode === 65) { // 65 is the letter A on the keyboard
            countk++;
            if (countk % 2 == 0 && countk < 10) {
                $('.sprite1').removeClass('walk');
                $('.sprite1').removeClass('iddle');
                $('.sprite2').removeClass('walkk');
                $('.sprite2').removeClass('iddlek');
                $('.knight').css({'z-index': '998'});
                $('.orc').css({'z-index': '1000'});
                $('.sprite1').addClass('attack');
                $('.sprite2').addClass('hurtk');
                setTimeout(function () {
                    $('.sprite1').removeClass('attack');
                    $('.sprite2').removeClass('hurtk');
                }, 150);
            }
            if (countk % 2 == 1 && countk < 10) {
                $('.sprite1').removeClass('walk');
                $('.sprite1').removeClass('iddle');
                $('.sprite2').removeClass('walkk');
                $('.sprite2').removeClass('iddlek');
                $('.knight').css({'z-index': '998'});
                $('.orc').css({'z-index': '1000'});
                $('.sprite1').addClass('attack');
                $('.sprite2').addClass('defendk');
                setTimeout(function () {
                    $('.sprite1').removeClass('attack');
                    $('.sprite2').removeClass('defendk');
                }, 150);
            }
            if (countk % 2 == 1 && countk > 10) {
                $('.sprite1').removeClass('walk');
                $('.sprite1').removeClass('iddle');
                $('.sprite1').addClass('attack');
                setTimeout(function () {
                    $('.sprite1').removeClass('attack');
                }, 150);
            }
            if (countk == 10 && i == 0) {
                i++;
                $('.sprite2').removeClass('walkk');
                $('.sprite2').removeClass('iddlek');
                $('.sprite2').addClass('deadk');
                setTimeout(function () {
                    $('.knight').css({'z-index': '998'});
                    $('.orc').css({'z-index': '1000'});
                    $('.knight').hide();
                }, 350);
            }
        }
    }
});

$(document).ready(function () {
    $('.a').hide()
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    if (windowWidth < 768) {
        $('body').height(windowHeight);
    }
});

$(window).resize(function () {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    if (windowWidth < 768) {
        $('body').height(windowHeight);
    }
});

$(window).bind('scroll', function (e) {
    var windowWidth = $(window).width();
    if (windowWidth >= 768) {
        parallaxScroll();
    }
});

$(window).scroll(function () {
    var windowWidth = $(window).width();
    if (windowWidth >= 768) {
        $('.knight').css({'z-index': '998'});
        $('.orc').css({'z-index': '1000'});
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
            $('.sprite1').removeClass('walk');
            $('.sprite1').addClass('iddle');
            $('.sprite2').removeClass('walkk');
            $('.sprite2').addClass('iddlek');
            console.log("Haven't scrolled in 200ms!");
        }, 1000));
        $.data(this, 'scrollTimer', setTimeout(function () {
            $('.sprite1').removeClass('iddle');
            $('.sprite2').removeClass('iddlek');
            console.log("Haven't scrolled in 4000ms!");
        }, 2000));
    }
});

function parallaxScroll() {
    var scrolled = $(window).scrollTop();
    if (scrolled) {
        console.log('walk')
        var pos = $('#tf_pos').val()
        var adv = scrolled - pos;
        console.log('before:' + pos + ' after:' + scrolled + ' diff:' + adv)
        if (adv > 0) {
            $('.sprite1').addClass('walk');
            $('.sprite1').removeClass('iddle');
            $('.sprite2').addClass('walkk');
            $('.sprite2').removeClass('iddlek');
        }
        if (adv == 0) {
            $('.sprite1').removeClass('walk');
            $('.sprite2').removeClass('walkk');
        }
        if (adv < 0) {
            $('.sprite1').addClass('walk');
            $('.sprite1').removeClass('iddle');
            $('.sprite2').addClass('walkk');
            $('.sprite2').removeClass('iddlek');
        }
        $('#tf_pos').val(scrolled)
    } else {
        $('.sprite1').removeClass('walk');
        $('.sprite1').addClass('iddle');
        $('.sprite2').removeClass('walkk');
        $('.sprite2').addClass('iddlek');
    }
}

$.jInvertScroll(['.scroll'], {
    height: 'auto',
    onScroll: function (percent) {
        //code
    }
});
