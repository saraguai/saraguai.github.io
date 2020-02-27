var VueApp, helper, orderModalApp, tracker;

helper = {
  getParameterByName: function(name, url) {
    var regex, results;
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
    results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
};

$(document).ready(function() {
  var counter, isTimeToUpdate, mouse, moveImg, moveImgS, onMouseEnterHandler, onMouseLeaveHandler, onMouseMoveHandler, perspectiveWall, update, updateRate, updateTransformStyle;
  perspectiveWall = document.getElementById('perspectiveWall');
  moveImg = document.getElementById('moveImg');
  moveImgS = document.getElementById('moveImgS');
  if (perspectiveWall) {
    mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function(event) {
        var e;
        e = event || window.event;
        this.x = e.clientX - this._x;
        return this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        return this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function() {
        return "(" + this.x + ", " + this.y + ")";
      }
    };
    mouse.setOrigin(perspectiveWall);
    counter = 0;
    updateRate = 10;
    isTimeToUpdate = function() {
      return counter++ % updateRate === 0;
    };
    onMouseEnterHandler = function(event) {
      return update(event);
    };
    onMouseLeaveHandler = function() {
      moveImg.style = "";
      return moveImgS.style = "";
    };
    onMouseMoveHandler = function(event) {
      if (isTimeToUpdate()) {
        return update(event);
      }
    };
    update = function(event) {
      mouse.updatePosition(event);
      return updateTransformStyle((mouse.y / moveImg.offsetHeight / 2).toFixed(2), (mouse.x / moveImg.offsetWidth / 2).toFixed(2));
    };
    updateTransformStyle = function(x, y) {
      var style, styleS;
      style = "translateX(" + (-37 * Number(x) * Number(y)) + "px) rotate(" + Number(x) * Number(y) + "deg)";
      styleS = "translateX(" + (37 * Number(x) * Number(y)) + "px) rotate(" + -Number(x) * Number(y) + "deg)";
      moveImg.style.transform = style;
      moveImg.style.webkitTransform = style;
      moveImg.style.mozTransform = style;
      moveImg.style.msTransform = style;
      moveImg.style.oTransform = style;
      moveImgS.style.transform = styleS;
      moveImgS.style.webkitTransform = styleS;
      moveImgS.style.mozTransform = styleS;
      moveImgS.style.msTransform = styleS;
      return moveImgS.style.oTransform = styleS;
    };
    perspectiveWall.onmouseenter = onMouseEnterHandler;
    perspectiveWall.onmouseleave = onMouseLeaveHandler;
    return perspectiveWall.onmousemove = onMouseMoveHandler;
  }
});

$(document).ready(function() {
  var arr, intervalId, mediaQuery, sassSwiper, swiper, swiperUI;
  $('#orderModal').on('show.bs.modal', function(event) {
    var button, data;
    button = $(event.relatedTarget);
    $('#myModal').removeData('bs.modal');
    data = {
      promotionsTerms: button.data('promotions'),
      price: button.data('price'),
      title: button.data('title'),
      paylink: button.data('paylink')
    };
    return orderModalApp.text = data;
  });
  swiper = new Swiper('.carousel-comic', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    effect: 'fade'
  });
  swiperUI = new Swiper('.carousel-ui', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 3,
    spaceBetween: 30,
    allowSlideNext: false,
    allowSlidePrev: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
        allowSlideNext: true,
        allowSlidePrev: true
      }
    }
  });
  arr = ['6F', '5F', '4F', '3F', '2F', '1F', 'B1'];
  sassSwiper = new Swiper('.sass-floor', {
    direction: 'vertical',
    initialSlide: 7,
    autoplay: {
      loop: true,
      delay: 3000,
      reverseDirection: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      renderBullet: function(index, className) {
        return '<span class="' + className + '">' + arr[index] + '</span>';
      }
    },
    on: {
      transitionEnd: function() {
        if (this.currentBreakpoint === '768') {
          if (this.activeIndex === 6 || this.activeIndex === 0) {
            return sassSwiper.allowTouchMove = false;
          }
        }
      }
    },
    breakpoints: {
      768: {
        autoplay: false,
        touchEventsTarget: 'wrapper',
        setWrapperSize: true,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
          renderBullet: function(index, className) {
            return '<span class="' + className + '">' + arr[arr.length - index - 1] + '</span>';
          }
        },
        mousewheelControl: false
      }
    }
  });
  mediaQuery = window.matchMedia("(min-width: 767px)");
  intervalId = '';
  $('.sass-slide').mouseover(function() {
    if (mediaQuery.matches) {
      return sassSwiper.autoplay.stop();
    }
  });
  $('.sass-slide').mouseout(function() {
    if (mediaQuery.matches) {
      return sassSwiper.autoplay.start();
    }
  });
  $(window).scroll(function() {
    return $('.sass-floor').each(function() {
      var scrollPos, target, targetHeight, targetPos;
      scrollPos = $(window).scrollTop();
      target = $(this);
      targetPos = $(target).offset().top;
      targetHeight = $(target).outerHeight();
      if (targetPos - 1 <= scrollPos && (targetPos + targetHeight) > scrollPos) {
        return sassSwiper.allowTouchMove = true;
      }
    });
  });
});

orderModalApp = new Vue({
  el: '#orderModal',
  data: {
    text: {}
  }
});

$(document).ready(function() {
  return $(window).scroll(function() {
    var navTarget, navtargetPos, scrollPos, windowHeight;
    scrollPos = $(window).scrollTop();
    windowHeight = $(window).height();
    navTarget = $('#thanks-2019-salary');
    if (navTarget.length > 0) {
      navtargetPos = $(navTarget).offset().top;
      if (navtargetPos - 200 <= scrollPos) {
        return $('.progress-bar').addClass('animate');
      }
    }
  });
});

Vue.component('slide-reviews', {
  template: "<div>\n  <div style=\"height: 250px; overflow: hidden;\" class=\"swiper-container slide-reviews\">\n    <div style=\"font-size: 1.5em;\" class=\"centered text-xs-center\"><span class=\"loading loading-primary\"></span></div>\n    <div class=\"swiper-pagination\"></div>\n    <div class=\"swiper-wrapper\">\n      <div v-for=\"(item, index) in courseData\" style=\"width: 98%;\" class=\"swiper-slide b-3\">\n        <div class=\"text-xs-left\">\n          <blockquote class=\"m-0\">\n            <div><strong>{{ item.user.display_name }}</strong><span class=\"text-warning ml-2\"><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i></span></div>\n            <div>{{ item.content }}</div>\n          </blockquote>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>",
  data: function() {
    return {
      data: {},
      courseData: {}
    };
  },
  methods: {
    getCourseData: function() {
      var vm;
      vm = this;
      vm.courseData = [];
      $.each(vm.data, function(key, courses) {
        if (courses.review.count) {
          return $.each(courses.review.results, function(i, review) {
            return vm.courseData.push(review);
          });
        }
      });
      return vm.renderReviewSwiper();
    },
    renderReviewSwiper: function() {
      return setTimeout(function() {
        var swiper;
        return swiper = new Swiper('.slide-reviews', {
          pagination: '.swiper-pagination',
          paginationType: 'progress',
          direction: 'vertical',
          mousewheelControl: true,
          spaceBetween: 15,
          slidesPerView: 'auto',
          autoplay: 2000,
          slideClass: 'swiper-slide',
          autoplayDisableOnInteraction: false
        });
      }, 1500);
    }
  },
  mounted: function() {
    var vm;
    vm = this;
    return vm.$parent.$on('slideReviewsData', function(data) {
      vm.data = data;
      return vm.getCourseData();
    });
  }
});

VueApp = new Vue({
  el: '#app',
  data: function() {
    return {
      courseData: {
        'bootstrap': {
          detail: {
            num_subscribers: 0
          }
        }
      },
      course: {}
    };
  },
  methods: {
    fetchData: function() {
      var vm;
      vm = this;
      $.getJSON('https://hexschool-api.herokuapp.com/api/udemydata/getCourseData', function(data) {
        vm.courseData = data;
        return vm.$emit('slideReviewsData', vm.courseData);
      }, function(response) {
        return console.log('error', response);
      });
      return $.getJSON('https://hexschool-api.herokuapp.com/api/udemydata/getCoursesBasicData', function(data) {
        return vm.course = data;
      }, function(response) {
        return console.log('error', response);
      });
    }
  },
  mounted: function() {
    return this.fetchData();
  }
});

tracker = {
  addDistinct_id: function(distinct_id) {
    if (distinct_id) {
      return $('[href*="herokuapp.com/order"]').each(function() {
        var newHref, thisHref;
        thisHref = $(this).attr('href');
        newHref = thisHref + "&distinct_id=" + distinct_id;
        $(this).attr('href', newHref);
        return $(this).attr('data-paylink', newHref);
      });
    }
  },
  addUTM: function() {
    var utm_campaignLink, utm_mediumLink, utm_sourceLink;
    utm_sourceLink = '';
    utm_mediumLink = '';
    utm_campaignLink = '';
    if ($.cookie('utm_source')) {
      utm_sourceLink = "&utm_source=" + ($.cookie('utm_source'));
    }
    if ($.cookie('utm_medium')) {
      utm_mediumLink = "&utm_medium=" + ($.cookie('utm_medium'));
    }
    if ($.cookie('utm_campaign')) {
      utm_campaignLink = "&utm_campaign=" + ($.cookie('utm_campaign'));
      return $('[href*="herokuapp.com/order"]').each(function() {
        var newHref, thisHref;
        thisHref = $(this).attr('href');
        newHref = "" + thisHref + utm_sourceLink + utm_mediumLink + utm_campaignLink;
        $(this).attr('href', newHref);
        return $(this).attr('data-paylink', newHref);
      });
    }
  }
};

$(document).ready(function() {
  var $win, ViewContentScrollTracking, adsource, dimensionValue, generate_callback, getUTM, mixpanelPageView, pageTitle, setCookie;
  setCookie = function(name, value) {
    return $.cookie(name, value, {
      expires: 1 / 24,
      path: '/'
    });
  };
  adsource = helper.getParameterByName('adsource');
  pageTitle = $('title').text();
  if (adsource && !$.cookie('adsource')) {
    setCookie('adsource', adsource);
  } else if ($.cookie('adsource') && !adsource) {
    adsource = $.cookie('adsource');
  }
  getUTM = function() {
    var utm_campaign, utm_medium, utm_source;
    utm_source = helper.getParameterByName('utm_source');
    utm_medium = helper.getParameterByName('utm_medium');
    utm_campaign = helper.getParameterByName('utm_campaign');
    if (utm_source) {
      setCookie('utm_source', utm_source);
    }
    if (utm_medium) {
      setCookie('utm_medium', utm_medium);
    }
    if (utm_campaign) {
      setCookie('utm_campaign', utm_campaign);
    }
    return tracker.addUTM();
  };
  getUTM();
  mixpanelPageView = function() {
    return mixpanel.track('PageView', {
      'adsource': adsource || '',
      'pageTitle': pageTitle
    });
  };
  mixpanelPageView();
  $('a.mp-click').click(function(event) {
    var link, title;
    link = $(this).attr('href');
    title = $(this).attr('title');
    return mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'adsource': adsource || '',
      'pageTitle': pageTitle
    });
  });
  $('.dropdown-course').one('mouseenter', function(e) {
    return mixpanel.track('openDropdown');
  });
  $('a.drop-click').click(function(event) {
    var link, title;
    link = $(this).attr('href');
    title = $(this).attr('title');
    return mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'target': 'dropdownLink'
    });
  });
  $('a.dropdown-clock-banner').click(function(event) {
    var link, title;
    link = $(this).attr('href');
    title = $(this).attr('title');
    return mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'target': 'dropdown-clock-banner'
    });
  });
  generate_callback = function(a) {
    return function() {
      window.location = a.attr('href');
    };
  };
  $('.tracking-link').on('click', function(e) {
    var dimensionValue, link, title;
    link = $(this).attr('href');
    title = $(this).attr('title') || '';
    dimensionValue = {
      'message': 'addToCart',
      'link': link,
      'title': title
    };
    fbq('track', 'AddToCart', dimensionValue);
    mixpanel.track('AddToCart', dimensionValue);
    return gtag('event', 'add_to_cart');
  });
  if ($('#orderSuccess').length) {
    dimensionValue = {
      'message': '支付 ' + helper.getParameterByName('msg') || '',
      'amount': helper.getParameterByName('amt') || '',
      'amountPaid': helper.getParameterByName('amountPaid') || '',
      'name': helper.getParameterByName('name') || '',
      'mail': helper.getParameterByName('mail') || '',
      'adsource': adsource || ''
    };
    fbq('track', 'Purchase', {
      content_type: 'product',
      value: helper.getParameterByName('amt') || 880,
      currency: 'TWD'
    });
    mixpanel.track('orderSuccess', dimensionValue);
    ga('set', 'dimension2', dimensionValue);
    $('#orderMsg').text(dimensionValue.message);
  }
  if ($('#orderFail').length) {
    dimensionValue = {
      'message': '支付失敗 ' + helper.getParameterByName('msg') || '',
      'amount': helper.getParameterByName('amt') || '',
      'name': helper.getParameterByName('name') || '',
      'mail': helper.getParameterByName('mail') || '',
      'adsource': adsource || ''
    };
    mixpanel.track('orderFail', dimensionValue);
    $('#orderMsg').text(dimensionValue.message);
  }
  ViewContentScrollTracking = false;
  if ($('.tracking-ViewContent').length) {
    $win = $(window).scroll(function(e) {
      var contentTop, winTop, windowHieght;
      windowHieght = $(window).height() / 2;
      winTop = $($win).scrollTop() + windowHieght;
      contentTop = $('.tracking-ViewContent').offset().top;
      if (winTop > contentTop && !ViewContentScrollTracking) {
        ViewContentScrollTracking = true;
        mixpanel.track('ViewContent', {
          'adsource': adsource || '',
          'pageTitle': pageTitle
        });
        fbq('track', 'ViewContent');
        return gtag('event', 'view_item');
      }
    });
  }
  ViewContentScrollTracking = false;
  if ($('.course-tracking-ViewContent').length) {
    $win = $(window).scroll(function(e) {
      var contentTop, winTop, windowHieght;
      windowHieght = $(window).height() / 2;
      winTop = $($win).scrollTop() + windowHieght;
      contentTop = $('.course-tracking-ViewContent').offset().top;
      if (winTop > contentTop && !ViewContentScrollTracking) {
        ViewContentScrollTracking = true;
        return fbq('track', 'ViewContent', {
          content_name: $('.course-tracking-ViewContent').data('name'),
          value: $('.course-tracking-ViewContent').data('price'),
          currency: 'TWD'
        });
      }
    });
  }
  $('.addToWishlist').on('click', function(e) {
    var eventName;
    eventName = $(this).data('wishlist');
    return fbq('track', 'AddToWishlist', {
      event_name: eventName
    });
  });
});

$(document).ready(function() {
  var timer;
  if ($('#footer-clock').length) {
    timer = $('#footer-clock').val();
    $('.clock').countdown(timer, function(event) {
      return $(this).html(event.strftime('%D天 %H時 %M分 %S秒'));
    });
  }
  if ($('[data-countdown-course]').length) {
    $('[data-countdown-course]').each(function(i, item) {
      var course;
      course = $(item).data('countdown-course');
      timer = $(item).val();
      return $('[data-course-countdown=' + course + ']').countdown(timer, function(event) {
        return $(this).html(event.strftime('%D天 %H時 %M分 %S秒'));
      });
    });
  }
});

$(document).ready(function() {
  var checkCourse, checkGodtohex, countPrice;
  $('#choeseCourse').on('click', function() {
    var coupon, leadCourse, param, selectedCourses, totalUrl, url;
    coupon = $(this).data('coupon');
    url = $(this).data('url');
    selectedCourses = [];
    leadCourse = '';
    $('#customCourses .selecedCourse:checked').each(function(i, item) {
      console.log(i, item, $(this).val());
      return selectedCourses.push($(this).val());
    });
    leadCourse = selectedCourses[0];
    selectedCourses.splice(0, 1);
    param = $.param({
      order: leadCourse,
      coupon_code: coupon,
      selectedCourses: selectedCourses
    });
    totalUrl = url + '?' + param;
    if (leadCourse) {
      return location.href = decodeURIComponent(totalUrl + '#addProducts');
    }
  });
  countPrice = function() {
    var conditionText, originTotal, total, value;
    total = 0;
    originTotal = 0;
    value = '';
    conditionText = '';
    $('#customCourses .selecedCourse:checked').each(function(i, item) {
      var originPrice, price;
      value = item.value;
      price = parseInt($(this).data('price'));
      originPrice = parseInt($(this).data('originprice'));
      total = total + price;
      return originTotal = originTotal + originPrice;
    });
    $('#selecedTotal').text(total);
    $('#selecedOriginTotal').text(originTotal - total);
    if (value === 'god2020year' || total > 5999) {
      $('#condition_false').hide();
      return $('#condition_true').show();
    } else {
      if (value !== 'god2020year') {
        $('#condition_false').hide();
        $('#condition_true').show();
      }
      if (total < 6000) {
        conditionText = 6000 - total;
      }
      $('#condition').html(conditionText);
      $('#condition_false').show();
      return $('#condition_true').hide();
    }
  };
  countPrice();
  $('#customCourses .selecedCourse').on('change', function() {
    return countPrice();
  });
  checkCourse = false;
  checkGodtohex = false;
  $('#select-all-course').on('click', function(e) {
    e.preventDefault();
    if (!checkCourse) {
      $('#main-course-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkCourse;
      });
      checkCourse = !checkCourse;
    } else {
      $('#main-course-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkCourse;
      });
      checkCourse = !checkCourse;
    }
    return countPrice();
  });
  return $('#select-all-godtohex').on('click', function(e) {
    e.preventDefault();
    if (!checkGodtohex) {
      $('#godtohex-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkGodtohex;
      });
      checkGodtohex = !checkGodtohex;
    } else {
      $('#godtohex-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkGodtohex;
      });
      checkGodtohex = !checkGodtohex;
    }
    return countPrice();
  });
});
