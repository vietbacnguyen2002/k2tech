jQuery(document).ready(function ($) {
    $('.project-slider').slick({
        dots: false,          // Hiển thị chấm chỉ báo
        infinite: true,      // Lặp lại vô hạn
        speed: 500,          // Tốc độ chuyển slide
        slidesToShow: 5,     // Hiển thị 5 slide cùng lúc
        slidesToScroll: 1,   // Số slide cuộn mỗi lần (giảm xuống 1 để mượt mà hơn)
        arrows: true,        // Hiển thị nút mũi tên
        autoplay: true,      // Tự động chạy slide
        autoplaySpeed: 5000, // Thời gian chuyển đổi slide khi tự động chạy
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3, // Hiển thị 3 slide trên màn hình từ 1024px trở xuống
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1, // Hiển thị 1 slide trên màn hình từ 600px trở xuống
                    slidesToScroll: 1,
                },
            },
        ],
    });

    // Kiểm tra nếu slider có gặp vấn đề không hiển thị
    $('.project-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        console.log('Slide chuyển từ: ', currentSlide, 'đến', nextSlide);
    });
});
