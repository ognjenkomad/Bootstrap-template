$(document).ready(function() {
    $(document).scroll(function () {
        var scroll = $(this).scrollTop();
        var topDist = 20;
        if (scroll > topDist) {
            $('.navbar-brand').addClass('brand-scrolled');
            $('nav').addClass('nav-scrolled');
            $('#myNavbar ul').addClass('li-scrolled');            
        } else {
            $('.navbar-brand').removeClass('brand-scrolled');
            $('nav').removeClass('nav-scrolled');
            $('#myNavbar ul').removeClass('li-scrolled');
        }
    });
    
    // SCROLL

    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({scrollTop: $(hash).offset().top}, 900, function(){
              window.location.hash = hash;
            });
        }
    });
    
    // FORM
    
    $('.form-group input, .form-group textarea').focusin(function(){
        $(this).removeClass('input-error');
    });
    
    $("#sendForm").on('click', function(){
        var name = $("#name").val();
        var surname = $("#surname").val();
        var email = $("#email").val();
        var message = $("#message").val();
        $('#success-message').detach();
        $.ajax({
            url: 'php/send_mail.php',
            type: 'post',
            data: {'name' : name, 'surname' : surname, 'email' : email, 'message' : message},
            dataType: 'json',
            cache: false,
            success: function(returned){
                if(!(returned.nameError === '')){
                   $("#name").addClass('input-error');  
                   $("#name").val(''); 
                   $("#name").attr('placeholder', returned.nameError);                   
                }
                if(!(returned.surnameError === '')){
                   $("#surname").addClass('input-error');   
                   $("#surname").val('');
                   $("#surname").attr('placeholder', returned.surnameError); 
                }
                if(!(returned.emailError === '')){
                   $("#email").addClass('input-error');
                   $("#email").val('');
                   $("#email").attr('placeholder', returned.emailError); 
                }
                if(!(returned.messageError === '')){
                   $("#message").addClass('input-error'); 
                   $("#message").val('');
                   $("#message").attr('placeholder', returned.messageError); 
                }
                if(!(returned.notSent === '') && typeof returned.notSent != 'undefined'){
                    $('.contact-header h4').after('<span id="success-message">' + returned.notSent + '</span>');
                }
                if(!(returned.notSet === '') && typeof returned.notSet != 'undefined'){
                    $('.contact-header h4').after('<span id="success-message">' + returned.notSet + '</span>');
                }
                if(!(returned.sent === '') && typeof returned.sent != 'undefined'){
                    $('.contact-header h4').after('<span id="success-message">' + returned.sent + '</span>');
                }
            },
            error: function(a, b, c){
                alert('not ' + a + b+ c);
            }
        });
    });
    
    // SERVICES
    $('.services .service-hover').on('click', function () {
        if(!$(this).hasClass('service-active')){
            $('.services .service-hover').removeClass('service-active');
            $(this).addClass('service-active');
            var contentInfo = '';
            var contentImg = '';
            if($(this).attr('id') == 'service-1'){
                contentInfo = '<h2><span>COOL</span>&nbsp;HEADING 2</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
                contentImg = '<div></div><img src="img/services-1.jpg">';
            } else if($(this).attr('id') == 'service-2'){
               contentInfo = '<h2><span>BE</span>&nbsp;VOLUNTEER</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
                contentImg = '<div></div><img src="img/services-2.jpg">';
            } else if($(this).attr('id') == 'service-3'){
                contentInfo = '<h2><span>GO ON</span>&nbsp;TRIPS</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
                contentImg = '<div></div><img src="img/services-3.jpg">';
            } else if($(this).attr('id') == 'service-4'){
                contentInfo = '<h2><span>DO</span>&nbsp;Marketing</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
                contentImg = '<div></div><img src="img/services-4.jpg">';
            }
            $('.service-info').animate({left:'-900px', opacity:'0.1'}, 500, 'swing', function(){
                $('.service-info').html(contentInfo);
                $('.service-info').animate({left: '0', opacity:'1'}, 500, 'swing');
            });
            $('.service-content .col-sm-5').animate({right:'-900px', opacity:'0.1'}, 500, 'swing', function(){
                $('.service-img').html(contentImg);
                $('.service-content .col-sm-5').animate({right: '0px', opacity:'1'}, 500, 'swing');
            });
        }
    });
    
    // COUNTS
     $(document).scroll(function () {
        var scroll = $(this).scrollTop();
        var spanPos = $('.counter-div').offset().top;
        spanPos -= 600;
        if (scroll > spanPos) {
            var cf = $('#counter-first').text();
            cf = parseInt(cf);
            var cs = $('#counter-second').text();
            cs = parseInt(cf);
            var ct = $('#counter-third').text();
            ct = parseInt(cf);
            var cfourth = $('#counter-fourth').text();
            cfourth = parseInt(cf);
            setInterval(function(){
                cf++;
                cs++;
                ct++;
                cfourth++;
                if(cf < 100){
                    $('#counter-first').text(cf);
                }   
                if(cs < 50){
                    $('#counter-second').text(cs);
                } 
                if(ct < 70){
                    $('#counter-third').text(ct);
                } 
                if(cfourth < 20){
                    $('#counter-fourth').text(cfourth);
                } 
            }, 20);  
        } 
     });
});

//LOADER

$(window).load(function() {    
    $('#loader').fadeOut('slow', function(){
        $('#loader').css('display', 'none');
        $('header, .main-content, footer').fadeIn(1200, function(){
            $('header').css('display', 'block');
            $('.main-content').css('display', 'block');
            $('footer').css('display', 'block');
        });
    });        
});