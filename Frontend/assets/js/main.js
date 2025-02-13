
(function () {
  "use strict";
  /**
  * Template Name: FlexStart - v1.1.1
  * Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  */

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header'),selectHeaderTitle = select('#HeaderTitle'),selectHeaderImg = select('#HeaderLogo')
  let selectNavHomeText = select('#navHome'),selectNavTimetableText = select('#navTimetable'),selectNavMapText = select('#navMap'),selectNavMallText = select('#navMall'),selectNavCourseText = select('#navCourse'),selectNavForumText = select('#navForum')
  if (selectHeader && selectHeaderTitle) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        try {
          let userNameSelect = select('#userName')
          userNameSelect.classList.add('nav-text-scrolled')
        }catch (e){

        }
        selectHeader.classList.add('header-scrolled')
        selectNavHomeText.classList.add('nav-text-scrolled')
        selectNavMapText.classList.add('nav-text-scrolled')
        selectNavMallText.classList.add('nav-text-scrolled')
        selectNavCourseText.classList.add('nav-text-scrolled')
        selectNavForumText.classList.add('nav-text-scrolled')
        selectHeaderTitle.classList.add('color-change-scrolled')
        selectNavTimetableText.classList.add('nav-text-scrolled')
        selectHeaderImg.src = "./assets/img/logo_dark.png"
      } else {
        try {
          let userNameSelect = select('#userName')
          userNameSelect.classList.remove('nav-text-scrolled')
        }catch (e){

        }
        selectHeader.classList.remove('header-scrolled')
        selectHeaderTitle.classList.remove('color-change-scrolled')
        selectHeaderImg.src = "./assets/img/logo.png"
        selectNavHomeText.classList.remove('nav-text-scrolled')
        selectNavMapText.classList.remove('nav-text-scrolled')
        selectNavMallText.classList.remove('nav-text-scrolled')
        selectNavCourseText.classList.remove('nav-text-scrolled')
        selectNavForumText.classList.remove('nav-text-scrolled')
        selectNavTimetableText.classList.remove('nav-text-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */


})();

function aos_init() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });
}
window.addEventListener('load', () => {
  aos_init();
});

function errorToast(message, mode) {
  $("#error-toast-body").text(message)
  $("#error-toast").toast('show');

}

function successToast(message) {
  $("#success-toast-body").text(message)
  $("#success-toast").toast('show');
}

function logout(){
  localStorage.removeItem("intelli_campus_login_token");
  $.ajax({
    url: "http://111.230.253.94:8081/user/logout?token="+login_token, // 后端 API 地址
    method: "POST", // 请求类型
    dataType: "json", // 返回的数据类型
    success: function (data) {
      window.location.href = 'http://111.230.253.94';
    },
    error: function (e) {
      console.log(e)
    }
  });
}

let login_token = localStorage.getItem("intelli_campus_login_token");
console.log(login_token)
$.ajax({
  url: "http://111.230.253.94:8081/user/getUserInfo?token="+login_token, // 后端 API 地址
  method: "GET", // 请求类型
  dataType: "json", // 返回的数据类型
  success: function (data) {
    // 将后端返回的数据填充到页面中
    console.log(data);
    if (data.code == 0){
      document.getElementById("userArea").innerHTML = `
                    <div class="dropdown" style="width: 200px">
                            <img src="./assets/img/avatar.png" alt="用户头像" style="width: 36px;height: 36px;border-radius: 50%;cursor: pointer;margin-left: 5%" id="userAvatar">
                            <span style="margin-left: 10%;width: 100px;color: white" id="userName"></span>
                        <div class="dropdown-content">
                        <div><a href="./hub.html" id="userHub"style="font-weight: normal;">我的学习</a></div>
                        <div><a href="./user_center.html" id="userCenter"style="font-weight: normal;">我的账号</a></div>
                            <div><a href="#" id="logout" style="font-weight: normal;color: red" onclick="logout()">退出登录</a></div>
                        </div>
                    </div>
`;
      $("#userAvatar").attr("src", 'data:image/jpeg;base64,' + data.data.avatarBase64);
      $("#userName").text(data.data.uname);
      document.getElementById("userAvatar").addEventListener('click', () => {
        ////显示完整ID
        window.location.href = "./user_center.html"
      })
      $.ajax({
        url: "http://111.230.253.94:8081/user/getUserScheduleList?token="+login_token, // 后端 API 地址
        method: "GET", // 请求类型
        dataType: "json", // 返回的数据类型
        success: function (data) {
          // 将后端返回的数据填充到页面中
          console.log(data);
          if (data.code == 0) {

            $("#timetableTitle").text("您已导入课程表");
            $("#timetableText").text("立即查看课程表");
            $("#timetableTips").text("使用课程表功能更直观地查看您在内网系统的课程");
            $("#timetableBtnText").text("查看");
            $("#timetableBtn").attr('href','./timetable/index.html')
            document.getElementById("reimportBtn").style.display = "inline";
          }else if(data.code == 429){
            errorToast("刷新过于频繁，请稍后再试")
          }else if (data.code == 404) {
            $("#timetableTitle").text("您还未导入课程表");
            $("#timetableText").text("立即导入课程表");
            $("#timetableTips").text("使用课程表功能更直观地查看您在内网系统的课程");
            $("#timetableBtnText").text("导入");
            $("#timetableBtn").attr('href','./timetable_import.html')
          }

        },
        error: function (e) {
          if (e.status == 403) {
            errorToast("刷新过于频繁，请稍后再试")
          }

        }
      });
    }else if(data.code == 429){
      errorToast("刷新过于频繁，请稍后再试")
    }

  },
  error: function (e) {
    if (e.status == 403) {
      errorToast("刷新过于频繁，请稍后再试")
    }

  }
});
$('#reimportBtn').click(function () {
  window.location.href = "http://111.230.253.94/timetable_import.html"
})