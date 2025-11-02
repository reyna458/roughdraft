$(document).ready(function () {


    $(window).on("scroll", function handler() {
        let scrollScore = $(window).scrollTop();
       

        if (scrollScore >= 100) {
             console.log(scrollScore)

            $('html, body').animate({
                scrollTop: $("#bighead").offset().top - 50
            }, 800);

            $('.intro-graf p').css("opacity", "1")

            $(window).off("scroll", handler);
        }
    });

    $(window).on("scroll", function handler() {
        let scrollScore = $(window).scrollTop();
       

        if (scrollScore >= 1000) {
             console.log(scrollScore)

            $('html, body').animate({
                scrollTop: $(".data-viz-box").offset().top - 200
            }, 800);

            $('.bluebox').css("opacity", "1")
            $('.graybox').css("opacity", "1")

            $(window).off("scroll", handler);
        }
    });

     $(window).on("scroll", function handler() {
        let scrollScore = $(window).scrollTop();
       

        if (scrollScore >= 1500) {
             console.log(scrollScore)

            $('html, body').animate({
                scrollTop: $("#widgets").offset().top - 200
            }, 800);

            $('.widget').css("opacity", "1")
            $('.imagewidget').css("opacity", "1")

            $(window).off("scroll", handler);
        }
    });
});
