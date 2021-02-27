import $ from "jquery";
import "slick-carousel";

$(".feedbacks__slider").slick({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 200000,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            },
        },
    ],
});
