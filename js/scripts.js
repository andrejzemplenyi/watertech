$(document).ready( function(){
    // Select FORM element
    var contactForm = $('form#form-contact');

    // Success message
    var successContent = "<div class=\"form-success\"> <h3 class=\"successful\">Váš formulár bol úspešne odoslaný!<\/h3> <img src=\"http:\/\/obchod.octopusenergi.sk/pub/static/frontend/Alothemes/milano6/sk_SK/images/success.svg\" width=\"200px\" alt=\"Váš formulár bol úspešne odoslaný!\" class=\"hero-image\">  <p class=\"no-margin\">Na Váš email sa budeme snažiť odpovedať čo najskôr. Ďakujeme!</p></div>"

        //Show error message
        function showError(elem, message) {
            elem.parent().addClass('invalid-input');
            elem.siblings('.error-message').html(message);
        };

        //Hide error message
        function hideError(elem) {
            elem.parent().removeClass('invalid-input');
            elem.siblings('.error-message').html('');
        };

        //Delete White-Space and find out if input is empty
        function isEmpty(elem) {
            return $.trim(elem.val())
        };

        //Check if input value matches pattern  
        function checkPattern(elem, pattern, message) {
            if(!elem.val().match(pattern)) {
                showError(elem, message);
            } else {
                hideError(elem);
            }
        };

        function checkFirst() {
            var patternName = /^[a-zA-ZÀ-ž]{2,20}$/g;
            var $this = $('#firstName');
            
            if ( isEmpty($this) ) {
                checkPattern($this, patternName, "Zadaná hodnota má nesprávny tvar");
            } else {
                showError($this, "Toto pole je povinné");
            }
        };
        
        function checkFirst() {
            var patternName = /^[a-zA-ZÀ-ž]{2,20}$/g;
            var $this = $('#firstName');
            
            if ( isEmpty($this) ) {
                checkPattern($this, patternName, "Zadaná hodnota má nesprávny tvar");
            } else {
                showError($this, "Toto pole je povinné");
            }
        };
        
                function checkLast() {
                    var patternName = /^[a-zA-ZÀ-ž]{2,20}$/g;
                    var $this = $('#lastName');
                    
                    if ( isEmpty($this) ) {
                        checkPattern($this, patternName, "Zadaná hodnota má nesprávny tvar");
                    } else {
                        showError($this, "Toto pole je povinné");
                    }
                };


        function checkPhone() {
            var patternPhone = /^[+]?[()/0-9. -]{9,}$/;
            var $this = $('#phone');
            
            if ( isEmpty($this) ) {
                    checkPattern($this, patternPhone, "Čislo musí byť vo formáte +421 xxx xxx xxx alebo 09xx xxx xxx");
                } else {
                    showError($this, "Toto pole je povinné");
                }
        };


        function checkEmail() {
            var patternEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            var $this = $('#email');
            
            if ( isEmpty($this) ) {
                checkPattern($this, patternEmail, "Zadaný email má nesprávny tvar");
            } else {
                showError($this, "Toto pole je povinné");
            }
        };


        function checkArea() {
            var patternArea = /^.{0,500}$/;
            var $this = $('#message');
            
            if ( isEmpty($this) ) {
                checkPattern($this, patternArea, "Zadaná hodnota má nesprávny tvar");
            } else {
                showError($this, "Toto pole je povinné");
            }
        };

        $('#firstName').keyup(checkFirst);
        $('#lastName').keyup(checkLast);
        $('#phone').keyup(checkPhone);
        $('#email').keyup(checkEmail);
        $('#message').keyup(checkArea);

    // ON SUBMIT FORM

    function submitForm() {

        console.log("checkerrors")

        checkFirst();
        checkLast();
        checkEmail();
        checkPhone();
        checkArea();

        if($('.error-message').text()) {

            $('.not-sent').html("Je nám to ľúto, email sa nepodarilo odoslať, nakoľko niektoré polia nie sú vyplnené správne... Skúste to znova.")
            
        } else {

            console.log("no error");

            var table = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(), 
                email: $('#email').val(), 
                phone: $('#phone').val(), 
                message: $('#message').val()
            };
            //AJAX call
            $.ajax({
                type: 'POST',
                url: '../contact-form.php',
                data: table,
                success: function(response) {
                    if(response != "success") {
                        $('.sent').html("Email bol úspešne odoslaný!");
                        console.log(response);
                        

                        $('#firstName').val("");
                        $('#lastName').val("");
                        $('#email').val("");
                        $('#phone').val("");
                        $('#message').val("");
                    } else {
                        $('.not-sent').html(response);
                        console.log(response);
                    }
                }
            });

        }
    };
    
        contactForm.submit(function(e){
            console.log("submitted");
            e.preventDefault();
            submitForm();
        });
});

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
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

/* HOVER DROPDOWN */
  $('body').on('mouseenter mouseleave','.dropdown',function(e){
    var _d=$(e.target).closest('.dropdown');
    if (e.type === 'mouseenter')_d.addClass('show');
    setTimeout(function(){
      _d.toggleClass('show', _d.is(':hover'));
      $('[data-toggle="dropdown"]', _d).attr('aria-expanded',_d.is(':hover'));
    },300);
  });
  
  /* this is not needed, just prevents page reload when a dd link is clicked */
  $('.dropdown a').on('click tap', e => e.preventDefault())