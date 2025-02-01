//Copyright 2025 ENGRARE. All Rights Reserved.
var ismenuopen = false;
var st;
var window_height, window_width, old_active_index = 0;


$( document ).ready(function() {
	let imagePath = "files/photos/"; // Resimlerin olduğu klasör
	let index = 1;

	function loadImage() {
		let img = new Image();
		img.src = imagePath + index + ".jpg";

		img.onload = function () {
			$('.swiper-slide:eq(' + index + ') .swiper_slide_img').attr("src", img.src);
			$('.swiper-slide:eq(' + index + ') .go_furniture_detail .go_furniture_detail_cont_1 .img_slogan_cont .img_slogan_txt').multiline(img.src);
			$("#gallery").append(`<img src="${img.src}" alt="Resim ${index}">`);
			index++;
			loadImage(); // Sonraki resmi yükle
		};

		img.onerror = function () {
			console.log("Tüm resimler yüklendi.");
		};
	}
	
	
	
	var mySwiper = new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		autoplay: {
			delay: 3000, // change delay as needed
		},
		loop: true,
	});
	$( ".fixed_menu_right_cont" ).hover(
  function() {
    $( ".settings_button_top" ).addClass( "fa-spin" );
  }, function() {
    $( ".settings_button_top" ).removeClass( "fa-spin" );
  }
);
	
	
	
	
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
