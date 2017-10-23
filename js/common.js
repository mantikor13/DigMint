$(document).ready(function () {

    initSecondMenu();
    initSmoothTransition();
    initMediaBackground();
    initMagnific();
    initSliders();
    initShowModalForm()
    initCloseModalFormButtons()
    initCloseModalForm();

    $("#form").submit(function () {

        $.ajax({
            type: "POST",
            url: "/mail.php",
            data: $(this).serialize()

        }).done(function () {

            $(this).find("input").val("");
            $("#form").trigger("reset");
            $(window).trigger("closeModalForm");
        });

        return false;
    });

    $('#modal-form').hide();

});


function initSmoothTransition() {

    $('header a[href^="#"], header *[data-href^="#"], .pushy a[href^="#"], .pushy *[data-href^="#"]').on('click', function (e) {

        e.preventDefault();

        var t = 1000;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({scrollTop: $(d).offset().top - 124}, t);
    });
}

function initMediaBackground() {

    $('#media-production').vide({
        mp4: '/video/production',
        webm: '/video/production',
        ogv: '/video/production',
        poster: '/img/media.jpg'
    });
}

function initMagnific() {

    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
}

function initSecondMenu() {

    var headerHeight = $('#header').outerHeight()

    var mainHeight = $('#main').outerHeight();

    var showMenu = false

    $(window).scroll(function () {

        if (!showMenu) {

            if ($(this).scrollTop() >= headerHeight + mainHeight) {


                showMenu = true;

                $('.header').addClass('header_fix').animate({ //выбираем класс menu и метод animate
                    top: 0
                }, 300);
            }
        } else {

            if ($(this).scrollTop() <= headerHeight + mainHeight) {


                showMenu = false

                $('.header').animate({ //выбираем класс menu и метод animate
                    top: -headerHeight
                }, 300, function () {

                    $('.header').removeClass('header_fix')
                });
            }
        }
    });
}

function initSliders() {

    var monitorSlider = $('#monitor-slider').pgwSlider();
    var phoneSlider = $('#phone-slider').pgwSlider();

    monitorSlider.reload({
        displayList: false,
        autoSlide: true,
        maxHeight: '100%',
        intervalDuration: 4000,
        transitionEffect: 'sliding',
        transitionDuration: 600
    });

    phoneSlider.reload({
        displayList: false,
        autoSlide: true,
        maxHeight: '100%',
        intervalDuration: 4000,
        transitionEffect: 'sliding',
        transitionDuration: 300,
    });

    $('#accordion').on("click", '.accordion__label', function () {

        phoneSlider.stopSlide();

        monitorSlider.stopSlide();

        phoneSlider.displaySlide($(this).data('number'));

        monitorSlider.displaySlide($(this).data('number'));

        setTimeout(function () {

            phoneSlider.startSlide();

            monitorSlider.startSlide();

        }, 4000)
    })
}

let modalConsistCounter = 0;

    function initShowModalForm() {

        $('.show-modal-form').click(function () {

            if(modalConsistCounter == 1){
                $('#modal-form').slideUp("slow");
                modalConsistCounter = 0;
            }else{
                $('#modal-form').slideDown("slow");
                modalConsistCounter = 1;
            };

        });
    };


    function initCloseModalFormButtons() {
    
        $('.modal-overlay').click(function(){
    
            $(window).trigger("closeModalForm");
        })
    
        $('.modal-form__exit').click(function(){
    
            $(window).trigger("closeModalForm");
        })
    
    };
    
    function initCloseModalForm() {
    
        $(window).on('closeModalForm', function(){
    
            $('#modal-form').slideUp("slow");
            modalConsistCounter = 0;
        });
    };

(function modalLabelMove(){

    $(".contact-form__input, .contact-form__textarea").click(function(event){

        let target = event.currentTarget;
        let label = target.previousElementSibling;

        label.classList.add("active");

            target.onblur = function(){
                if(target.value == ""){
                    label.classList.remove("active");
                }
            };

    });

})();

(function slider(){

    let icons = $(".menuIcon");

    let slide = $(".slideView");
    let controlLeft = $(".viewControlLeft");
    let controlRight = $(".viewControlRight");

    let iconsWidth = icons.css("width");
    icons.css("height", iconsWidth);

    icons.click(function(event){

        let target = event.currentTarget;

        icons.removeClass("activeSlide");
        target.classList.add("activeSlide");

        let slideContent = window.getComputedStyle(target).backgroundColor;

        slide.css("background-color", slideContent);
    });

    controlRight.click(function(){

        if(icons.last().hasClass("activeSlide")){
            
        } else {

        let nextIcon = $(".activeSlide").next();

        icons.removeClass("activeSlide");
        nextIcon.addClass("activeSlide");

        let slideContent = nextIcon.css("background-color");

        slide.css("background-color", slideContent);
        };
    });

    controlLeft.click(function(){

        if(icons.first().hasClass("activeSlide")){
            
        } else {

        let prevIcon = $(".activeSlide").prev();

        icons.removeClass("activeSlide");
        prevIcon.addClass("activeSlide");

        let slideContent = prevIcon.css("background-color");

        slide.css("background-color", slideContent);
        };
    });

})();

(function web(){

    let btn = $(".accordion__label");
    btn[0].style.backgroundColor="#FD8D00";

    let webInterval = setInterval(function(){

        for(i=0; i < btn.length; i++){
            if(btn[i].classList.contains("collapsed") == false){

                el = btn[i + 1];
                break;
            };
        };

        btn.css("background-color", "#2FC1DF");

        if(el === undefined){
            el = btn[0];
        };

        el.click();
        el.style.backgroundColor="#FD8D00";
        console.log("a");

        btn.click(function(event){

            let target = event.currentTarget;
            btn.css("background-color", "#2FC1DF");
            target.style.backgroundColor="#FD8D00";
            console.log("b");

            setTimeout("", 2000);

        });

    }, 4000);

    //btn.click(function(){

        //clearTimeout(webInterval);

        //setTimeout(webInterval, 1000);

    //});

})();
