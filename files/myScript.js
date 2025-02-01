//Copyright 2025 ENGRARE. All Rights Reserved.
var ismenuopen = false;
var st;
var window_height, window_width, old_active_index = 0;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;


var website_data_obj;

fetch('https://raw.githubusercontent.com/eylulberil/engrare-data/main/data.json')
  .then(response => response.json())
  .then(myObj => {
	website_data_obj = myObj;
	var objlen = website_data_obj.website.corner.length;
//console.log(objlen);
	$( '#fixed_menu_but_0 p').multiline(website_data_obj.website.slide.name);
	for(var i = 0; i < objlen; i++) {
		if(i > 0) {
			$( '#main_container_' + (i - 1)).clone().insertAfter( '#main_container_' + (i - 1) ).prop('id', 'main_container_' + i);
		}
		$( '#fixed_menu_but_' + (i)).clone().insertAfter('#fixed_menu_but_' + i ).prop('id', 'fixed_menu_but_' + (i + 1)).children("p").multiline(website_data_obj.website.corner[i].name).parent().removeClass("fixed_menu_button_selected").attr("onclick", "topMenuGo(" + (i + 1) + ")");
		
		$('#main_container_' + i + " .main_container_2_text_part .text_part_inner_cont .header_part_txt").multiline(website_data_obj.website.corner[i].header);
		$('#main_container_' + i + " .main_container_2_text_part .text_part_inner_cont .content_part_txt").multiline(website_data_obj.website.corner[i].text);
		$('#main_container_' + i + " .main_container_2_bg_photo_part .main_container_2_bg_photo").attr("id", "sliding_photo_" + i);
		if(website_data_obj.website.corner[i].buttontext == "") {
			
			$('#main_container_' + i + " .main_container_2_text_part .text_part_inner_cont .go_furniture_detail_a").css("display", "none");
			$('#main_container_' + i + " .main_container_2_text_part .sponsorship_form_iframe").attr("src", "");
		}
		else {
			$('#main_container_' + i + " .main_container_2_text_part .text_part_inner_cont .go_furniture_detail_a").css("display", "block");
			$('#main_container_' + i + " .main_container_2_text_part .text_part_inner_cont .go_furniture_detail_a .go_furniture_detail_txt").multiline(website_data_obj.website.corner[i].buttontext);
			if(website_data_obj.website.corner[i].formheight != "") {
				$('#main_container_' + i + " .main_container_2_text_part .go_furniture_detail_a").attr("onclick", "OpenCloseForm(" + i + ")");
				$('#main_container_' + i + " .main_container_2_text_part .text_part_inner_cont .go_furniture_detail_a").attr("onclick", "OpenCloseForm(" + i + ")");
				$('#main_container_' + i + " .main_container_2_text_part .sponsorship_form_iframe").attr("src", website_data_obj.website.corner[i].btnlink);
				$('#main_container_' + i + " .main_container_2_text_part .sponsorship_form_iframe").css("height", website_data_obj.website.corner[i].formheight + "px");
				
			}
		}
		$('#main_container_' + i + " .main_container_2_bg_photo_part .main_container_2_bg_photo").attr("src", website_data_obj.website.corner[i].bgimglink);
			
		
		$( '#fixed_menu_but_' + (objlen)).clone().insertAfter('#fixed_menu_but_' + (objlen) ).prop('id', 'fixed_menu_but_' + (objlen+1)).attr("onclick", "topMenuGo(" + (objlen + 1) + ")").children("p").text("İletişim");

		
	}
	objlen = website_data_obj.website.slide.content.length;
	
	
	for(var i = 0; i < objlen; i++) {
			//$( '#main_container_' + (i - 1)).clone().appendTo( ".main_div" ).prop('id', 'main_container_' + i);
		
		//$('#main_container_' + i).children( ".search_result_div" ).children( ".user_username" ).text(myObj[i].username);
		
		$('.swiper-slide:eq(' + i + ') .swiper_slide_img').attr("src", website_data_obj.website.slide.content[i].bgimglink);
		$('.swiper-slide:eq(' + i + ') .go_furniture_detail .go_furniture_detail_cont_1 .img_slogan_cont .img_slogan_txt').multiline(website_data_obj.website.slide.content[i].header);
		$('.swiper-slide:eq(' + i + ') .go_furniture_detail .go_furniture_detail_cont_1 .go_furniture_detail_a .go_furniture_detail_cont_2 .go_furniture_detail_txt').multiline(website_data_obj.website.slide.content[i].buttontext);
		$('.swiper-slide:eq(' + i + ') .go_furniture_detail .go_furniture_detail_cont_1 .go_furniture_detail_a').attr("onclick", "ScrollPart(" + website_data_obj.website.slide.content[i].gocorner + ")");
		
	}

	//websiteJSON.website.slide.content.length
	
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
  });



//for(let i = 0; i < website_data_obj.corner.length())


function topMenuGo(num) {
	$('html, body').stop();
	ScrollPart(num);

	if(ismenuopen)
		openLeftMenu();
}


$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
}


$( document ).ready(function() {
	var mySwiper = new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		autoplay: {
			delay: 3000, // change delay as needed
		},
		/*on: {
			slideNextTransitionEnd: (swiper) => {
				//console.log('SWIPED RIGHT');
				if(!trans_click_pressed) {
					if(current_active_index == mySwiper.slides.length - 1)
						current_active_index = 0;
					else
						current_active_index++;
				}
				trans_click_pressed = false;
				//new_active_index = current_active_index;//mySwiper.activeIndex;
				changeTransClick(old_active_index, current_active_index);
				old_active_index = current_active_index;
			},
			slidePrevTransitionEnd: (swiper) => {
				//console.log('SWIPED LEFT');
				if(!trans_click_pressed) {
					if(current_active_index == 0)
						current_active_index = mySwiper.slides.length - 1;
					else
						current_active_index--;
				}
				trans_click_pressed = false;
				//new_active_index = current_active_index;//mySwiper.activeIndex;
				changeTransClick(old_active_index, current_active_index);
				old_active_index = current_active_index;
			}
		},*/
		loop: true,
	});
	
	/*$( ".left_right_buttons_swipper" ).hover(function() {
		$(this).css({"-webkit-transform": "translateY(-5px)"});
		$(this).addClass("swiper_button_hover");
	}, function() {
		$(this).css({"-webkit-transform": "translateY(0px)"});
		$(this).removeClass("swiper_button_hover");
	});
	*/
	$( ".fixed_menu_right_cont" ).hover(
  function() {
    $( ".settings_button_top" ).addClass( "fa-spin" );
  }, function() {
    $( ".settings_button_top" ).removeClass( "fa-spin" );
  }
);
	
	


	
	/*
	$(".fixed_menu_button").on('click', function(){
		$('html, body').stop();
		var button_index = $(this).attr('id').slice(15, 16);
		ScrollPart(button_index);
		//console.log($(".main_container_2:eq(" + (button_index) + ")").offset().top);
		
		if(ismenuopen)
			openLeftMenu();
		//console.log($(this).eq(1));
	});*/
	
	$("#fixed_menu_but_0").on('click', function(){
		mySwiper.slideToLoop(0);
	});
	

	
	function changeTransClick(old_index, new_index) {
		var elementID = "transClick_";
		document.getElementById(elementID + old_index).className = "trans_click";
		document.getElementById(elementID + new_index).className = "trans_click trans_active";
	}
	
	$(".left_right_buttons_swipper").on('click', function(){
		setTimeout(function() { mySwiper.autoplay.start();}, 6000);
	});
	
	
	
	
	$(".trans_click").on('click', function(){
		var index = $(this).attr('id').slice(11, 12);
		if(index == mySwiper.realIndex)
			return;
		mySwiper.slideToLoop(index);
	});
	
	beReadyPage();
	
	
	/*
	// Define the function to go to the last slide from the first slide
	function goToLastSlide() {
		mySwiper.slideTo(mySwiper.slides.length - 1);
	}

	// Define the function to go to the first slide from the last slide
	function goToFirstSlide() {
		mySwiper.slideTo(0);
	}

// Add a click event listener to the first slide to go to the last slide
	var firstSlide = document.querySelector('.swiper-slide:first-of-type');
	firstSlide.addEventListener('click', function() {
		if (mySwiper.activeIndex == 0) {
			for(var i = 0; i < mySwiper.slides.length - 1; i++)
				mySwiper.slideNext(i*30);
			current_active_index = 3;
			alert(mySwiper.activeIndex);
		}
	});

	// Add a click event listener to the last slide to go to the first slide
	var lastSlide = document.querySelector('.swiper-slide:last-of-type');
	lastSlide.addEventListener('click', function() {
		if (mySwiper.activeIndex == mySwiper.slides.length - 1) {
			goToFirstSlide();
			current_active_index = 0;
		}
	});*/
	
	$(window).scroll(function(event){
		if($(this).scrollTop() > window_height) {
			mySwiper.autoplay.stop();
		}
		else {
			mySwiper.autoplay.start();
		}
	});
	
	var mySwiper = $(".swiper-container")[0].swiper;
	//mySwiper.autoplay.stop();
	mySwiper.autoplay.start();
	$('.go_furniture_detail_a').mouseenter(function() {
		mySwiper.autoplay.stop();
	}).mouseleave(function() {
		mySwiper.autoplay.start();
	})
	
	mySwiper.on('slideChange', function () {
		if (mySwiper.autoplay.running) {
			//console.log('Slide changed automatically');
		} else {
			mySwiper.autoplay.stop();
			setTimeout(function() { mySwiper.autoplay.start();}, 6000);
			//console.log('Slide changed by user');
		}
		
		mySwiper.slideToLoop(mySwiper.realIndex);
		changeTransClick(old_active_index, mySwiper.realIndex);
		old_active_index = mySwiper.realIndex;
			
	});
});


	function ScrollPart(index) {
		$('html, body').animate({scrollTop: $(".main_container_2:eq(" + index + ")").offset().top - $(".fixed_menu_top").height()}, 400);
	}



	function OpenCloseForm(num) {
		//console.log($('#main_container_' + num + ' .main_container_2_text_part .text_part_inner_cont').css("display") == "none");
		if($('#main_container_' + num + ' .main_container_2_text_part .text_part_inner_cont').css("display") == "none") {

			$('#main_container_' + num).css("height", "");
			$('#main_container_' + num + ' .main_container_2_text_part .text_part_inner_cont').css("display", "");
			$('#main_container_' + num + ' .main_container_2_text_part .sponsorship_form_iframe_outer').fadeOut(500);

		} else {
			$('#main_container_' + num).css("height", "auto");
			$('#main_container_' + num + ' .main_container_2_text_part .text_part_inner_cont').css("display", "none");
			$('#main_container_' + num + ' .main_container_2_text_part .sponsorship_form_iframe_outer').fadeIn(500);
			$('#main_container_' + num + ' .main_container_2_text_part .sponsorship_form_iframe_outer').css("display", "flex");
		}
}


function GoToSettingsPage() {
	//window.location.href = window.location.href + "../settings/set.html";
	
}

//if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
	$(window).scroll(function(event){
		st = $(this).scrollTop();
		let objlennn = website_data_obj.website.corner.length;
		//$(".main_container_2_bg_photo").css("top", (st*(150.0/(window_height*2))-150));
		//st - $("#sliding_photo_1").offset().top
		for(let i = 0; i < objlennn; i++) {
			$("#sliding_photo_" + i).css('transform', 'translate3d(0px, ' + (-75*(st/(window_height-$(".fixed_menu_top").height())-i)) + 'px, 0px)');
		}
		
		var lastbtnindex = 0, newbtnindex = 0;
		//console.log($(".main_container_2").length);
		while(st - $(".main_container_2:eq(" + newbtnindex + ")").offset().top + $(".fixed_menu_top").height() >= -1) {
			newbtnindex++;
			if($(".main_container_2").length == newbtnindex)
				break;
		}
		//newbtnindex = Math.floor(st/(window_height - 60)) + 1;
		
		if(lastbtnindex != newbtnindex) {
			$(".fixed_menu_button").removeClass("fixed_menu_button_selected");
			$(".fixed_menu_button:eq( " + newbtnindex + " )").addClass("fixed_menu_button_selected");
			lastbtnindex = newbtnindex;
		}
		
		
	});


//}

/*$(window).scroll(function(event){
	st = $(this).scrollTop();
	$(".main_container_2_bg_photo").css("top", (st*(150.0/(window_height*2))-150));
});*/



$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
});



function beReadyPage() {
	window_height = parseInt($( window ).height());
	window_width = parseInt($( window ).width());
	if(ismenuopen) 
		$(".menu_closer").css("display", window_width > 1086 ? "none" : "block");
	$(".swiper-container-wrapper").css("height", window_height - parseInt($( ".fixed_menu_top" ).height()));
	//$(".main_container_2").css("height", window_height);
	$(".main_container_2_bg_photo").css("height", window_height + 150);
	//$(".main_container_2_bg_photo").css("height", window_width);
	
	st = $(window).scrollTop();
	$(".main_container_2_bg_photo").css('transform', 'translate3d(0px, ' + (st*(150.0/(window_height*2))-150) + 'px, 0px)');
		$("#map1").css("height", window_height - $(".social_and_text_part").outerHeight( true ) - $(".copywrite_part").outerHeight( true ) - $(".fixed_menu_top").height() - 40);
	
	if(window_width < 620) { 
		//$(".mapouter").css("width", window_width - 20);
		//$(".gmap_iframe").css("width", window_width - 20);
		//$(".gmap_canvas").css("width", window_width - 20);
		//document.getElementById('map1').style.width = ((window_width - 20) + "px");
		$("#map1").css("width", window_width - 20);
		
	} else {
		//$(".mapouter").css("width", 600);
		//$(".gmap_iframe").css("width", 600);
		//$(".gmap_canvas").css("width", 600);
		$("#map1").css("width", window_width - 300);
	}
	//$(window).scroll();
}

function openLeftMenu() {
	$(".fixed_menu_all_buttons_cont").stop();
	$(".menu_closer").stop();
	$('.fixed_menu_all_buttons_cont').animate(
		{ left: ismenuopen ? -200 : 0 }, 200);
	if(ismenuopen) {
		$(".menu_closer").fadeOut(200);
		$(".menu_opener").addClass('fa-bars');
		$(".menu_opener").addClass('fa');
		
		$(".menu_opener").removeClass('fa-regular');
		$(".menu_opener").removeClass('fa-solid');
		$(".menu_opener").removeClass('fa-xmark');
		
		$("html body").css("overflow-y", "auto");
		if(!is_mobile_phone) {
			$(".main_div").css("width", "100%");
			$(".fixed_menu_right_cont").css("width", parseInt($( ".fixed_menu_right_cont" ).width()) - 14);
		}
		//console.log(is_mobile_phone);
	}
	else {
		$(".menu_closer").fadeIn(200);
		$(".menu_opener").removeClass('fa-bars');
		$(".menu_opener").removeClass('fa');
		
		$(".menu_opener").addClass('fa-regular');
		$(".menu_opener").addClass('fa-solid');
		$(".menu_opener").addClass('fa-xmark');
		
		$("html body").css("overflow-y", "hidden");
		if(!is_mobile_phone) {
			$(".main_div").css("width", "calc(100% - 14px)");
			$(".fixed_menu_right_cont").css("width", parseInt($( ".fixed_menu_right_cont" ).width()) + 14.5);
		}
	}
	//fa-regular fa-solid fa-xmark

	ismenuopen = !ismenuopen;

	//overflow: hidden;
}

/*setTimeout(function() { changeImgg(); }, 5000);

function changeImgg() {
	if(is_change_on_going && !is_trans_button_clicked)
		transImg(transNum+1);
	is_trans_button_clicked = false;
	setTimeout(function() { changeImgg(); }, 5000);
}*/

setTimeout(function() { beReadyPage();}, 200);
setTimeout(function() { beReadyPage();}, 500);
