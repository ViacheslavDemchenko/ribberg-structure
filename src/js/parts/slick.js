/* Slick slider carousel */

(function (){

    $('#slick').slick({
      dots: false,
      infinite: false,
      speed: 1000,
      touchMove: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      pauseOnHover: true,
      prevArrow: '<button type="button" class="slick-arrow slick-prev"><span>Previous</span></button>',
      nextArrow: '<button type="button" class="slick-arrow slick-next"><span>Next</span></button>',
      responsive: [
          {
            breakpoint: 600,
            settings: {
              arrows: false
          }
        }
      ]
    });
    
})();