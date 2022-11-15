AOS.init({
    duration: 1200,
})
$(window).on('mousewheel', function() {
  $('html, body').stop();
});

$(document).ready(function(){
    $( "a.scrollLink" ).click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
    });
});
    
$(document).ready(function() {
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      console.log($(window).scrollTop())
    if ($(window).scrollTop() > 260) {
      $('nav').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 261) {
      $('nav').removeClass('navbar-fixed');
    }
  });
});

$(document).ready(function(){
	$('.nav-icon').click(function(){
		$(this).toggleClass('open');
		$('.drawer').fadeToggle();
    $('.wrapper').fadeToggle();
	});
});

//ArtWorks
$(function() {
    var selectedClass = "";
    $(".fil-cat").click(function(){ 
    $(".fil-cat").removeClass('selectedClass');
    selectedClass = $(this).attr("data-rel"); 
    console.log(selectedClass);
    if($(this).attr("data-rel")==selectedClass){
      $(this).addClass('selectedClass');
    }
    $("#portfolio").fadeTo(100, 0.1);
    $("#portfolio div").not("."+selectedClass).fadeOut().removeClass('scale-anm');

    setTimeout(function() {
      $("."+selectedClass).fadeIn().addClass('scale-anm');
      $("#portfolio").fadeTo(300, 1);
    }, 300);   
  });
});

//ArtWorks
$(function() {
    var p1 = "<img src='design_diary/p1.jpg' class='img-tab-content'>";
    var p2 = "<img src='design_diary/p2.jpg' class='img-tab-content'>";
    var p3 = "<img src='design_diary/p3.jpg' class='img-tab-content'>";
    var process1 = "Mostly, I observed designs of websites, mobile applications, and things that I often use by myself in daily life. I also asked other people’s opinions and challenges of using things in their experience and observation. Sometimes I just pick a environment and observed the using behavior of other people.";
    var process2 = "After I observed and detected the problem that I want to discuss about, I will define the analytical framing of the discussion. I read and research design principles and ux articles to find a theoretical support of the problem and introduce the concept/theory in the design diary as well.";
    var process3 = "The outcome of one design diary can be a re-design or design suggestions, I draw wireframes sketches on paper, and use Sketch to design the new version based on the old version of the design. In some cases, I not only change the design but also modify the user flow.";
    $(".dd-process-1").hover(function(){ 
      $(".tab-content").css("background-color", "#FFAAAA");
      $(".tab-content").html(p1+process1);
    });

    $(".dd-process-2").hover(function(){ 
      $(".tab-content").css("background-color", "#FFC276");
      $(".tab-content").html(p2+process2);
    });

    $(".dd-process-3").hover(function(){ 
      $(".tab-content").css("background-color", "#FFD326");
      $(".tab-content").html(p3+process3);
    });
});

//index
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

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
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid orange}";
        document.body.appendChild(css);
    };