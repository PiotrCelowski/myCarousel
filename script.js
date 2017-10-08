$(function(){
	var carouselList = $('#carousel ul');
	var playCarousel = setInterval(nextSlide, 4000);

	function nextSlide(){
		if (carouselList.is(':animated')) {
			nextSlide();
		} else {
		carouselList.animate({'marginLeft':-400}, 500, moveFirstSlide);
		clearInterval(playCarousel);
		playCarousel = setInterval(nextSlide, 4000);
		};
	};

	function backSlide(){
		if (carouselList.is(':animated')) {
			backSlide();
		} else {
			moveLastSlide(); //przesuwanie obrazka na poczatek listy
			carouselList.animate({'marginLeft':0}, 500); //zmiana marginesu z -400 na 0
			clearInterval(playCarousel); // resetowanie timera interwalu
			playCarousel = setInterval(nextSlide, 4000); //resetowanie timer cd.
		};
	};

	function moveFirstSlide(){
		var firstItem = carouselList.find("li:first"),
			lastItem = carouselList.find("li:last");

		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
	};

	function moveLastSlide(){
		var firstItem = carouselList.find("li:first"),
			lastItem = carouselList.find("li:last");

		carouselList.css({marginLeft:-400});
		firstItem.before(lastItem);
	};



	var buttonNext = $('.controler[data-slide="next"]'),
		buttonPrev = $('.controler[data-slide="prev"]');

	buttonNext.on('click', nextSlide);
	buttonPrev.on('click', backSlide); //przycisk do przesuwania obrazkow w prawo (tutaj jest problem z animacja)


	/* Monitoring changes and updating dots background color*/
	var checkPosition = setInterval(checkDotNum, 100);

	var carouselElement = $('li');
	i=5;
	carouselElement.each(function(index, element){
		$(element).attr('number', i);
		i--;
	});
	var dotsList = $('.dots a');

	function checkDotNum(){
		var firstItem = carouselList.find("li:first")
		var lastItem = carouselList.find("li:last")

		/* add .active to first element on the list and remove .active from last element */
		firstItem.addClass('active');
		lastItem.removeClass('active');
		/* get attribute 'number' of the active element (first on the list) */
		var activePhoto = $('.active').attr('number');
		/* select dot which has index equal to img number attribute*/
		var selectedDot = dotsList.eq(activePhoto);
		/* add class filled to this one dot */
		selectedDot.addClass('filled');
		/* remove filled class from other attributes */
		for (i=0; i<dotsList.length; i++) {
			if (i==activePhoto) {
				
			} else {
				dotsList.eq(i).removeClass('filled');
			}
		};
	};
	/* end of monitoring function */
	/* click event for dots */
	$('.pointer').click(function(){
		var activePhoto = parseInt($('.active').attr('number'));
			//currentIndx = parseInt( )

		var positionDiff = $(this).index() - activePhoto;
		
		if (Math.abs(positionDiff) > 0) {
			checkDiff(positionDiff);
		};
		
		function checkDiff(diff) {
				if (diff > 0){
					for(i=0 ;i<diff; i++){
						backSlideQuick();

					}
				} else if (diff < 0) {
					for(i=0 ;i<Math.abs(diff); i++){
						nextSlideQuick();
					}
				};
		};
		function nextSlideQuick(){
			carouselList.animate({'marginLeft':-400}, 0, moveFirstSlide);
			clearInterval(playCarousel);
			playCarousel = setInterval(nextSlide, 4000);
		};
		
		function backSlideQuick(){
			moveLastSlide();
			carouselList.animate({'marginLeft':0}, 0);
			clearInterval(playCarousel);
			playCarousel = setInterval(nextSlide, 4000);
		};

	});
});