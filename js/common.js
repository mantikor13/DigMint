$(document).ready(function () {

    initShowModalForm();
    modalForm();
    mobileMenu();
    initSecondMenu();
    initSmoothTransition();
    hdrImgSlide();
    web();
    portfolio();
    mediaProduction();
    initMagnific();

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

    $(".web__item:first").children("p").show();
});

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

    $('.modal-form__exit').click(function () {

        $('#modal-form').slideUp("slow");
        modalConsistCounter = 0;

    });

    $('.show-modal-form_second').click(function () {

        $('#modal-form').slideDown("slow");
        modalConsistCounter = 1;

        $('body, html').animate({scrollTop: 0}, 1500);

    });
};

function modalForm(){
    //---Lable move---//
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
};

function initSecondMenu() {

    let offset = $('#web').offset().top + 50;
    let headerHeight = $(".second-menu").height();

    $(window).scroll(function () {


        if ($(this).scrollTop() > offset) {

            $('.second-menu').css("top", "0");

        }else{

            $('.second-menu').css("top", -headerHeight);

        }
    });
};

function mobileMenu() {
    let i = 0;

    let mobileHeight = $("#header").height() + $("#main").height();

    $(".nav_mobile-wrap").height(mobileHeight);

    $(window).resize(function(){
        mobileHeight = $("#header").height() + $("#main").height();
        $(".nav_mobile-wrap").height(mobileHeight);
    });

    $(".nav-btn").click(function(){

        if(i == 0){
            $(".nav-btn").addClass("nav-btn-active");
            $(".nav_mobile-wrap").addClass("nav_mobile-active");
            i = 1;
        }else{
            $(".nav-btn").removeClass("nav-btn-active");
            $(".nav_mobile-wrap").removeClass("nav_mobile-active");
            i = 0;
        }

    });
};

function initSmoothTransition() {

    $('header a[href^="#"], header *[data-href^="#"], .second-menu a[href^="#"]').on('click', function (e) {

        e.preventDefault();

        var t = 1000;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({scrollTop: $(d).offset().top}, t);
    });
};

function hdrImgSlide(){

    let imgWrap = $(".main__img-slide img");

    let i = 0;

    function go() {

        imgWrap[i].classList.add("inside");

        i++;
    }

    let timer = setInterval(function(){

        go();

        if(i >= imgWrap.length){
            clearInterval(timer);
        }
        }, 500);

};

function web(){

    $(".web__item").click(function(){

        $(".web__item").removeClass("active-list-item");
        $(".web__item").children("p").slideUp();

        $(this).addClass("active-list-item");
        $(this).children("p").slideDown();

        $(".web__content img").removeClass("active-img-web");
        let data = $(this).attr("data-web-item");
        $("img[data-web-img=" + data + "]").addClass("active-img-web");

    });
    
};

function portfolio(){

    let margin = parseInt($(".port__site").css("margin-right"));

    let minWidth = ($(".port__sites_wrap").width() - margin*3)/3;// Ширина слайдов без margin, именно минимальная из-за flexbox

    if($(window).width() < 993){
        minWidth = $(".port__sites_wrap").width() - margin; 
    }
    $(".port__site").css("min-width", minWidth); 
    
    let scrollWidth = -($(".port__site").outerWidth(true)); // То на сколько нужно смещать все слайды за одно нажатие. Отрицательное, для простоты использования со счетчиком в дальшнейшем   


    $(window).resize(function(){

        let minWidth = ($(".port__sites_wrap").width() - margin*3)/3;

        if($(window).width() < 993){
            minWidth = $(".port__sites_wrap").width() - margin; 
        }
        $(".port__site").css("min-width", minWidth); 

        scrollWidth = -($(".port__site").outerWidth(true));

    });

    let left; // Смещение за все нажатия присваивается сюда
    let i = 0; // Счетчик нажатий на кнопки

    let rightBorder = $(".port__sites_wrap-scroll").width();
    let sitesArray = $(".port__site").length; // кол-во слайдов
    let containSlides = rightBorder/Math.abs(scrollWidth); // кол-во видимых слайдов

    $(".port__controls_right").click(function(){
        if(i + containSlides < sitesArray){
            i++;
            left = i * scrollWidth;
            $(".port__sites_wrap-scroll").css("left", left);
        }
    });

    $(".port__controls_left").click(function(){
        if(i > 0){
            i--;
            left = i * scrollWidth;
            $(".port__sites_wrap-scroll").css("left", left);
        }
    });

};

function mediaProduction(){

    let margin = parseInt($(".md-pd__video").css("margin-right"));

    console.log(margin);

    let minWidth = ($(".md-pd__slides-wrap").width() - margin*8)/4;// Ширина слайдов без margin, именно минимальная из-за flexbox

    $(".md-pd__video").css("min-width", minWidth); 

    if($(window).width() < 993){
        minWidth = ($(".md-pd__slides-wrap").width() - margin*4)/2; 
        $(".md-pd__video").css("min-width", minWidth); 
    }
    
    let scrollWidth = -($(".md-pd__video").outerWidth(true));

    let left; // Смещение за все нажатия присваивается сюда
    let i = 0; // Счетчик нажатий на кнопки

    let rightBorder = $(".md-pd__slides-wrap-scroll").width();

    let sitesArray = $(".md-pd__video").length; // кол-во слайдов
    let containSlides = rightBorder/minWidth; // кол-во видимых слайдов

    $(".md-pd__control-right").click(function(){
        if(i + containSlides < sitesArray){
            i++;
            left = i * scrollWidth;
            $(".md-pd__slides-wrap-scroll").css("left", left);
        }
    });

    $(".md-pd__control-left").click(function(){
        if(i > 0){
            i--;
            left = i * scrollWidth;
            $(".md-pd__slides-wrap-scroll").css("left", left);
        }
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
};


