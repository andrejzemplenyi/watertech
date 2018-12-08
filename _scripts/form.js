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
