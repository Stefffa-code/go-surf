$(function(){
    $(".header__slider").slick({
        infinite: true,
        fade: true,
        prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrow-left.svg" alt="arrow-left">',
        nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrow-right.svg" alt="arrow-right">',
        asNavFor: ".slider-dots",
        focusOnSelect: true,
    })

    $(".slider-dots").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        // variableWidth: true,
        asNavFor: ".header__slider",
        focusOnSelect: true,
        
    })

    $(".surf-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        // centerMode: true,
        prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrow-left.svg" alt="arrow-left">',
        nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrow-right.svg" alt="arrow-right">',
        asNavFor: ".map-slider",
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 1249,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ]
    })

    $(".map-slider").slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        asNavFor: ".surf-slider",
        arrows: false,
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 641,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              // centerMode: true,
            }
          },
        ]
    })

    $(".travel-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrow-left.svg" alt="arrow-left">',
        nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrow-right.svg" alt="arrow-right">',
        fade: true,
    })

    $(".sleep-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrow-left.svg" alt="arrow-left">',
        nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrow-right.svg" alt="arrow-right">',
        fade: true,
    })

    $(".shop-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrow-left.svg" alt="arrow-left">',
      nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrow-right.svg" alt="arrow-right">',
      fade: true,
    });

    let wow = new WOW({
      mobile:       false, 
    })
    wow.init();

// input в секции sleep
    $('<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="./img/plus.svg" alt="plus"></div><div class="quantity-button quantity-down"><img src="./img/minus.svg" alt="minus"></div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });



// Рфсчет итоговой суммы Sleep
    $('.quantity-button').on('click', function(){
      let $parent = $(this).parents('.sl-big-info');
      let $guests = $parent.find('.guests').val();
      let $nights = $parent.find('.nights').val();
      let summDom = $parent.find('.summ');

      let summ = ($guests * summDom.data('nights')) * $nights -1;

      summDom.html( summ );
    })

    let summ = ($('.guests').val() * $('.summ').data('nights')) * $('.nights').val() -1;
    $('.summ').html( summ );


// Smoothy scroll 
  let $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        $('.overlay').removeClass('active');
        $('body').removeClass('locked');
        $('.menu').removeClass('open');
        return false;
  });

// Меню
    $('#burger').on('click', function(){
      $(this).toggleClass('open');
      $('.menu').toggleClass('open');
      $('body').toggleClass('locked')
      $('.overlay').toggleClass('active')
    })
    $('.menu').on('click', function(){
      $('.overlay').removeClass('active')
      $('body').removeClass('locked')
      console.log('click menu');
    })

    
}) 


