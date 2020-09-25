$(window).load(function () {
    $("#intro-loader").delay(500).fadeOut();
    $(".mask").delay(500).fadeOut("slow");
});
$(document).ready(function () {
    $('.item_top').each(function () {
        $(this).appear(function () {
            $(this).delay(300).animate({
                opacity: 1,
                top: "0px"
            }, 500);
        });
    });
    $('.item_bottom').each(function () {
        $(this).appear(function () {
            $(this).delay(300).animate({
                opacity: 1,
                bottom: "0px"
            }, 500);
        });
    });
    $('.item_left').each(function () {
        $(this).appear(function () {
            $(this).delay(300).animate({
                opacity: 1,
                left: "0px"
            }, 500);
        });
    });
    $('.item_right').each(function () {
        $(this).appear(function () {
            $(this).delay(300).animate({
                opacity: 1,
                right: "0px"
            }, 500);
        });
    });
    $('.item_fade_in').each(function () {
        $(this).appear(function () {
            $(this).delay(300).animate({
                opacity: 1,
                right: "0px"
            }, 500);
        });
    });

    $('.nav-toggle').hover(function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(250);
    }, function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(250)
    });


    $(".mobile-nav-button").click(function () {
        $(".inner div.nav-menu").slideToggle("medium", function () {});
    });
    $('.inner div.nav-menu ul.nav li a').click(function () {
        if ($(window).width() < 1000) {
            $(".nav-menu").slideToggle("2000")
        }
    });

    $('body').scrollspy({
        target: '.nav-menu',
        offset: 95
    })
    processLine.init();
    $('.section-content .media-container').fitVids();
    $("#left_scroll a").attr({href: 'javascript:slide("left");', });
    $("#right_scroll a").attr({href: 'javascript:slide("right");', });
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('.clients').waypoint(function () {
            $('#carousel_ul').children().each(function (index) {
                $(this).delay(200 * index).animate({opacity: "1", marginTop: "0"}, 300);
            });
        }, {offset: "85%"});
    } else {
        $('.clients #carousel_ul').children().css({opacity: "1", marginTop: "0"});
    }

    $('.flexslider').flexslider({animation: "slide"});
    $('.slider_container').flexslider({directionNav: true, controlNav: false});

    var portfolio = portfolio || {},
            $portfolioItems = $('#portfolio-items'),
            $filtrable = $('#portfolio-filter');

    portfolio.fullWidth = function () {
        $(window).load(function () {
            $portfolioItems.isotope({
                animationEngine: 'best-available',
                animationOptions: {
                    duration: 250,
                    easing: 'easeInOutSine',
                    queue: false
                }
            });
        });
        $filtrable.find('a').click(function (e) {
            var currentOption = $(this).data('cat');
            $filtrable.find('a').removeClass('active');
            $(this).addClass('active');
            if (currentOption !== '*') {
                currentOption = '.' + currentOption;
            }
            $portfolioItems.isotope({
                filter: currentOption
            });
            return false;
        });
    };

    portfolio.ajax = function () {
        function portfolioInit() {
            var newHash = "",
                    $mainContent = $("#portfolio-ajax"),
                    $pageWrap = $("#portfolio-wrap"),
                    root = '#!products/',
                    rootLength = root.length,
                    url;
            $portfolioItems.find(".full-page").click(function () {
                window.location.hash = $(this).attr("href");
                $(document.body).addClass('noscroll');
                return false;
            });
            $("#portfolio-wrap").bind("keydown", function (e) {
                if (e.keyCode == 37) {
                    $('.single-portfolio').remove();
                    window.location.hash = $("#portfolio-items .current").next().find('.full-page').attr("href");
                    return false;
                } else if (e.keyCode == 39) {
                    $('.single-portfolio').remove();
                    window.location.hash = $("#portfolio-items .current").prev().find('.full-page').attr("href");
                    return false;
                } else if (e.keyCode == 27) {
                    $('#portfolio-wrap').fadeOut('100', function () {
                        $('.single-portfolio').remove();
                    });
                    history.pushState('', document.title, window.location.pathname);
                    window.location.hash = '#_';
                    return false;
                }
            });
            $(window).bind('hashchange', function () {
                newHash = window.location.hash;
                url = newHash.replace(/[#\!]/g, '');
                if (newHash.substr(0, rootLength) == root) {
                    if ($pageWrap.is(':hidden')) {
                        $pageWrap.slideDown('3000', function () {});
                    }
                    $pageWrap.niceScroll({
                        cursorcolor: "#666",
                        cursorwidth: 6,
                        cursorborder: 0,
                        cursorborderradius: 0
                    });
                    $pageWrap.append('<div id="preloader"></div>');
                    $mainContent.load(url + " .single-portfolio", function (xhr, statusText, request) {
                        if (statusText == "success") {
                            setTimeout(function () {
                                $(".slider_container").flexslider({
                                    directionNav: true,
                                    controlNav: false
                                });
                                $('.single-portfolio .media-container').fitVids();
                                $pageWrap.find('#preloader').remove();
                            }, 300);
                        }
                        if (statusText == "error") {
                            $mainContent.html('<div class="row pad-top pad-bottom"><div class="col-md-12 pad-top pad-bottom"><div class="alert-message error"><p>The Content cannot be loaded.</p></div></div></div>');
                            $pageWrap.find('#preloader').remove();
                        }
                        closeProject();
                        nextProject();
                        prevProject();
                    });
                    $("#portfolio-items article").removeClass("current");
                    $("#portfolio-items .full-page[href='" + newHash + "']").parent().addClass("current");
                    var projectIndex = $('#portfolio-items').find('article.current').index();
                    var projectLength = $('#portfolio-items article').length - 1;
                    if (projectIndex == projectLength) {
                        jQuery('#next-project').addClass('disabled');
                        jQuery('#prev-project').removeClass('disabled');
                    } else if (projectIndex == 0) {
                        jQuery('#prev-project').addClass('disabled');
                        jQuery('#next-project').removeClass('disabled');
                    } else {
                        jQuery('#prev-project, #next-project').removeClass('disabled');
                    }
                } else if (newHash == '') {
                    $('#portfolio-wrap').fadeOut('100', function () {
                        $('.single-portfolio').remove();
                    });
                }
            });
            $(window).trigger('hashchange');
        }

        function closeProject() {
            $('#close-project').on('click', function () {
                $('#portfolio-wrap').fadeOut('100', function () {
                    $('.single-portfolio').remove();
                });
                history.pushState('', document.title, window.location.pathname);
                window.location.hash = '#_';
                $(document.body).removeClass('noscroll');
                return false;
            });
        }

        function nextProject() {
            $("#next-project").on("click", function () {
                $('.single-portfolio').remove();
                window.location.hash = $("#portfolio-items .current").next().find('.full-page').attr("href");
                return false;
            });
        }

        function prevProject() {
            $("#prev-project").on("click", function () {
                $('.single-portfolio').remove();
                window.location.hash = $("#portfolio-items .current").prev().find('.full-page').attr("href");
                return false;
            });
        }
        if ($portfolioItems.length) {
            portfolioInit();
        }
    };

    function initColorBox() {
        $(".cb-img").colorbox({rel: 'cb-img', transition: "fade", width: "80%", height: "80%"});
        $(".ajax").colorbox();
        $(".cb-youtube").colorbox({iframe: true, innerWidth: "80%", innerHeight: "80%"});
        $(".cb-vimeo").colorbox({iframe: true, innerWidth: "80%", innerHeight: "80%"});
        $(".cb-iframe").colorbox({iframe: true, width: "80%", height: "80%"});
        $(".callbacks").colorbox({
            onOpen: function () {
                alert('onOpen: colorbox is about to open');
            },
            onLoad: function () {
                alert('onLoad: colorbox has started to load the targeted content');
            },
            onComplete: function () {
                alert('onComplete: colorbox has displayed the loaded content');
            },
            onCleanup: function () {
                alert('onCleanup: colorbox has begun the close process');
            },
            onClosed: function () {
                alert('onClosed: colorbox has completely closed');
            }
        });
    }

    function initColorBoxs() {
        $(".cb-images").colorbox({rel: 'cb-images', transition: "fade", width: "80%", height: "80%"});
        $(".callbacks").colorbox({
            onOpen: function () {
                alert('onOpen: colorbox is about to open');
            },
            onLoad: function () {
                alert('onLoad: colorbox has started to load the targeted content');
            },
            onComplete: function () {
                alert('onComplete: colorbox has displayed the loaded content');
            },
            onCleanup: function () {
                alert('onCleanup: colorbox has begun the close process');
            },
            onClosed: function () {
                alert('onClosed: colorbox has completely closed');
            }
        });
    }
    
    function initColorBoxst() {
        $(".cb-imagest").colorbox({rel: 'cb-imagest', transition: "fade", width: "80%", height: "80%"});
        $(".callbacks").colorbox({
            onOpen: function () {
                alert('onOpen: colorbox is about to open');
            },
            onLoad: function () {
                alert('onLoad: colorbox has started to load the targeted content');
            },
            onComplete: function () {
                alert('onComplete: colorbox has displayed the loaded content');
            },
            onCleanup: function () {
                alert('onCleanup: colorbox has begun the close process');
            },
            onClosed: function () {
                alert('onClosed: colorbox has completely closed');
            }
        });
    }
    portfolio.fullWidth();
    portfolio.ajax();
    initColorBox();
    initColorBoxs();
    initColorBoxst();

    $(function () {
        $('.chart').appear(function () {
            $('.chart').easyPieChart({
                easing: 'easeOutBounce',
                barColor: "#99b748",
                size: "150",
                lineWidth: 15,
                animate: 1000,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        });
    });

    $('.skillBar li').each(function () {
        var b = $(this).find("span").attr("data-width");
        $(this).find("span").css({
            width: b + "%"
        })
    });

    

    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200);
        } else {
            $("#back-top").fadeOut(200);
        }
    });
    $('#back-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
    });
});

$(function () {
    $('.nav-menu li a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(function () {
    $('a.scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});

if ($("#header-title").length) {
    var owl = $("#header-title");
    owl.owlCarousel({
        navigation: true,
        singleItem: true,
        slideSpeed: 200,
        paginationSpeed: 800,
        touchDrag: false,
        mouseDrag: false,
        autoPlay: 5000,
        stopOnHover: false,
        transitionStyle: "backSlide"
    });
}

$(window).bind('load', function () {
    parallaxInit();
});

function parallaxInit() {
    $('#number').parallax("50%", 0.3);
    $('#skill').parallax("50%", 0.3);
    $('#clients').parallax("50%", 0.3);
}
var onMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    onMobile = true;
}

$(function () {
    "use strict";
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var count = $(this).attr('data-to');
            $(this).delay(4000).countTo({
                from: 20,
                to: count,
                speed: 3000,
                refreshInterval: 50,
            });
        });
    });
});

var mySwiper = new Swiper('.swiper-about', {
    mode: 'horizontal',
    loop: true,
    speed: 400,
    autoplay: 2000,
    autoResize: true,
    pagination: '.pagination-about',
    paginationClickable: true
})
var mySwiper = new Swiper('.swiper-testimonial', {
    mode: 'horizontal',
    loop: true,
    speed: 400,
    autoplay: 2000,
    autoResize: true,
    pagination: '.pagination-testimonial',
    paginationClickable: true
})
var auto_slide = 1;
var hover_pause = 1;
var key_slide = 1;
var auto_slide_seconds = 3000;
$('#carousel_ul li:first').before($('#carousel_ul li:last'));
if (auto_slide == 1) {
    var timer = setInterval('slide("right")', auto_slide_seconds);
    $('#hidden_auto_slide_seconds').val(auto_slide_seconds);
}
if (hover_pause == 1) {
    $('#carousel_ul').hover(function () {
        clearInterval(timer)
    }, function () {
        timer = setInterval('slide("right")', auto_slide_seconds);
    });
}
if (key_slide == 1) {
    $(document).bind('keypress', function (e) {
        if (e.keyCode == 37) {
            slide('left');
        } else if (e.keyCode == 39) {
            slide('right');
        }
    });
}

function slide(where) {
    var item_width = $('#carousel_ul li').outerWidth();
    if (where == 'left') {
        var left_indent = parseInt($('#carousel_ul').css('left')) + item_width;
    } else {
        var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;
    }
    $('#carousel_ul:not(:animated)').animate({
        'left': left_indent
    }, 1500, 'easeInOutCubic', function () {
        if (where == 'left') {
            $('#carousel_ul li:first').before($('#carousel_ul li:last'));
        } else {
            $('#carousel_ul li:last').after($('#carousel_ul li:first'));
        }
        $('#carousel_ul').css({
            'left': '-249px'
        });
    });
}
var processLine = {
    el: ".process-node",
    init: function () {
        processLine.bind();
    },
    bind: function () {
        $(window).scroll(function () {
            processLine.check();
        });
    },
    check: function () {
        $(processLine.el).each(function () {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 200) {
                $(this).closest("li").addClass("active").find(".line").addClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).closest("li").removeClass("active").find(".line").removeClass("active");
            }
        });
    }
}
