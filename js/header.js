//	TAKEN FROM https://codepen.io/seanburke/pen/gMLeOX


function parallaxFade() {
	scrollPos = $(this).scrollTop();
	//	parallax
	$('#home').css({
		'background-position' : '50% ' + (-scrollPos/3)+"px"
	});
	//	header fade
	$('.head1').css({
		'margin-top': (scrollPos/6)+"px",
		'opacity': 1-(scrollPos/215)
	});
}
$(document).ready(function(){
	$(window).scroll(function() {
		parallaxFade();
	});
});