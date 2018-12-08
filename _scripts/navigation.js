$(document).ready( function(){
    
        var navigation = $(".main-nav");
        var navBg = $(".nav-bg");

        $(".menu-on-small").click(function(){
            $(".menu-responsive").toggleClass("open");
            if(navigation.hasClass("open")) {
                navigation.addClass("closed");
                navigation.removeClass("open");
            } else {
                navigation.addClass("open");
                navigation.removeClass("closed");
            };
            if(navBg.hasClass("open")) {
                navBg.addClass("closed");
                navBg.removeClass("open");
            } else {
                navBg.addClass("open");
                navBg.removeClass("closed");
            };
        })

        // Hide Header on on scroll down
        var didScroll = true;
        var lastScrollTop = 0;
        var delta = 5;
        var mediumDown;
        var navigationElem;
        var topnav = $('#topnav');
        var navWhite = $('.nav-white');
        var navbarHeight = $('#topnav').outerHeight();
    
        $(window).scroll(function(event){
            didScroll = true;
            if ($(".menu-responsive").css("display") == "block" ){
                mediumDown = true
                if ($(".menu-responsive").hasClass("open")) {
                    didScroll = false
                }
            }
        });
    
        setInterval(function() {
            if (didScroll) {
                hasScrolled(); 
                didScroll = false;
            }
        }, 250);
    
        function hasScrolled() {
            var st = $(this).scrollTop();
            

            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight){
                // Scroll Down
                if(mediumDown) {
                    $('.nav-white').removeClass('nav-down no-shadow').addClass('nav-up');
                } else {
                    $('#topnav').removeClass('nav-down no-shadow').addClass('nav-up');
                }
            } else {
                // Scroll Up
                if(st + $(window).height() < $(document).height()) {
                    if(mediumDown) {
                        $('.nav-white').removeClass('nav-up').addClass('nav-down');
                    } else {
                        $('#topnav').removeClass('nav-up').addClass('nav-down');
                    }
    
                    if (st <= 0) {
                        if(mediumDown) {
                            $('.nav-white').addClass('no-shadow');
                        } else {
                            $('#topnav').addClass('no-shadow');
                        }
                    }
                }
            }
            
            lastScrollTop = st;
        }
    
    });