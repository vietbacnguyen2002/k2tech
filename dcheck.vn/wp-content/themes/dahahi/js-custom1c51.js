// max hiehgt slide
jQuery(document).ready(function ($) {
    function equalizeDetailsHeight() {
        let maxHeight = 0;

        $('.project-slider .project-details').each(function () {
            const thisHeight = $(this).outerHeight();
            if (thisHeight > maxHeight) {
                maxHeight = thisHeight;
            }
        });

        $('.project-slider .project-details').css('height', maxHeight + 'px');
    }

    equalizeDetailsHeight();
    $(window).on('resize', function () {
        $('.project-slider .project-details').css('height', 'auto'); // Reset trước khi tính lại
        equalizeDetailsHeight();
    });
});

// // auto text sec home
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 120 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = 2500;
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }

  }

// quy trình sec
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.quy-trinh a');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault(); 

      const targetId = e.target.getAttribute('data-target');

      const contents = document.querySelectorAll('.content');
      contents.forEach(content => {
        content.classList.remove('active');
      });

      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
});





// tab danh muc
jQuery(document).ready(function ($) {
    $(".tab-button").on("click", function () {
        const tab = $(this).data("tab");
        const tabPanel = $(`#tab-${tab}`);
        const loadMoreButton = tabPanel.find(".load-more");
		
        $(".tab-button").removeClass("active");
        $(this).addClass("active");
        $(".tab-panel").addClass("hidden");
        tabPanel.removeClass("hidden");
		
        if (tabPanel.find(".project-item").length === 0 && tab !== "all") {
            const page = loadMoreButton.data("page");
            const maxPages = loadMoreButton.data("max");
            $.ajax({
                url: ajax_params.ajax_url,
                type: "POST",
                data: {
                    action: "load_more_projects",
                    page: page,
                    category: tab,
                },
                success: function (response) {
                    if (response.success) {
                        tabPanel.find(".row").append(response.data);
                        loadMoreButton.data("page", page + 1);
                    } else {
                        loadMoreButton.hide();
                    }
                },
                error: function () {
                    console.log("Lỗi khi tải nội dung tab.");
                },
            });
        }
    });
});




// hide display dự án
jQuery(document).ready(function ($) {
    $(".load-more").on("click", function () {
        const button = $(this);
        const tab = button.data("tab");
        const page = parseInt(button.data("page")) + 1;
        const maxPages = button.data("max");

        if (page > maxPages) {
            button.hide(); 
            return;
        }

        $.ajax({
            url: ajax_params.ajax_url,
            type: "POST",
            data: {
                action: "load_more_projects",
                page: page,
                category: tab,
            },
            beforeSend: function () {
                button.text("Đang tải...");
            },
            success: function (response) {
                if (response.success) {
                    $(`#projects-${tab} .row`).append(response.data); 
                    button.data("page", page).text("Xem thêm");

                    if (page >= maxPages) {
                        button.hide(); 
                    }
                } else {
                    button.hide();
                }
            },
            error: function () {
                button.text("Đã xảy ra lỗi");
            },
        });
    });
});




// chức năng script
jQuery(".ht-menu li").click(function () {
        jQuery(".ht-menu li").removeClass("active");
        jQuery(this).addClass("active");     
    });
jQuery(".custom.html_topbar_right a:nth-child(2)").addClass("active");
jQuery(".custom.html_topbar_right a").click(function () {
        jQuery(".custom.html_topbar_right a").removeClass("active");
        jQuery(this).addClass("active");     
    });

//  .ht-menu
if (jQuery(window).width() >= 1000) {
    var htMenuStickyTop = jQuery('.ht-menu .col-inner').offset().top;

    jQuery(window).scroll(function () {
        var windowTop = jQuery(window).scrollTop();
        var footerTop = jQuery('footer').offset().top;
        var menuHeight = jQuery('.ht-menu .col-inner').outerHeight();

        if (htMenuStickyTop < windowTop && (windowTop + menuHeight) < footerTop) {
            jQuery('.ht-menu .col-inner').addClass("affix");
        } else {
            jQuery('.ht-menu .col-inner').removeClass("affix");
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section'); 
    const navLinks = document.querySelectorAll('.sidebar ul li a'); 

    const updateActiveLink = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect(); 
            if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                currentSectionId = section.getAttribute('id'); 
            }
        });

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1); 
            if (targetId === currentSectionId) {
                link.parentElement.classList.add('active'); 
            } else {
                link.parentElement.classList.remove('active'); 
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start', 
                });
            }
        });
    });

    window.addEventListener('scroll', updateActiveLink);

    updateActiveLink();
});
jQuery(document).ready(function ($) {
    $('.project-order').on('change', function () {
        let postId = $(this).data('post-id');
        let order = $(this).val();

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'update_project_order',
                post_id: postId,
                order: order,
            },
            success: function (response) {
                if (response.success) {
                    alert('Cập nhật thành công!');
                } else {
                    alert('Lỗi: ' + response.data);
                }
            },
            error: function () {
                alert('Có lỗi xảy ra. Vui lòng thử lại!');
            },
        });
    });
});
