var Store = {
  
  defaults: {
    cutoffWidth: 768
  },
  
  init: function(page, options) {
    var inPreview = (/\/admin\/design/.test(top.location.pathname));
    var win = $(window);
    var width = $(document).width();
    
    options = $.extend(this.defaults, options);

		  
	  // Make sure the body height is always equal to the window height
	  /*
	  if($("body").height() < $(window).height()){
	  	$("body").height($(window).height());
	  };      
	  */
	  
	  $('#menu a').click(function() { 
		  $('#nav_primary').slideToggle('slow');
		  $('#menu').toggleClass('selected');
	  }); 
  
    $('#site_content').imagesLoaded(function() {
      setTimeout(function() {
      	
      	var $productGrid = $('#products.masonry');
      	
      	$productGrid.isotope({
		  		itemSelector : '.product',
		  		layoutMode : 'fitRows',
		  		resizable: true, 
				});
      	
      	$('.slides').show();
      	
			  // Initialize galleries for product images
    
			  $('.product_images.galy').flexslider({
			    animation: 'slide',
			    easing: 'swing',
			    animationSpeed: 500,
			    directionNav: false,
			    slideshow: false,
			    smoothHeight: true,
			    useCSS: false //temp css transition fix
			  });
			  
			  // Display certain elements on touch devices
			  
				if ('ontouchstart' in document.documentElement) {
					$('a.more_info, .product_images .flex-control-nav, .on_sale').css({'display':'block'});
				} else {
					$('.product_images.galy').click(function(event) {
				  	event.preventDefault();
				    $(this).flexslider('next'); //Go to next slide
				  }); 
				}	  
			   
      }, inPreview ? 50 : 0);
    });		        
    	  
		
		if(page == 'home' || 'products' || 'product') {
	
		  // Clicking on more info displays product overview
		  
		  $('.product_overview').hide();     		  
		  		  
			$('.more_info').on('click', function(){
			   $(this).parent().parent().children('.product_overview').fadeToggle().css({'display':'-webkit-box'}).height($(this).parent().parent().parent().children('.product_images').height());    
			   
			   $(this).toggleClass('selected')			   	
			   return false;
		  });		  
		  		  
		  $('.product_overview').click(function(){
		    $(this).fadeOut('slow');
			  $('.more_info.selected').toggleClass('selected')			   			    
		  });
		  
		  $('.product').mouseleave(function(){
		    $('.product_overview').fadeOut('slow');
			  $('.more_info.selected').toggleClass('selected')			   			    
		  });
		  
		  // Add to Cart button
		  
		  $('.options_button, #cat_button').on('click', function(event){
		  	event.preventDefault();
		  	
		    $(this).parent().children('.options_menu').toggle();
		    $(this).parent().children('span').toggle();
		    
		    event.stopPropagation();
		  });
		
			// Close dropdown menus on click outside of menu
			
		  $('html').on('click', function() {
		    $('.options_menu:visible').parent().children('span').toggle();          
		    $('.options_menu').hide();
		  });
		  
		  $('#products .options_menu li, #product .options_menu li').on('click', function(){
		    var option    = $(this).text();
		    var option_id = $(this).attr('id');
		  
		    $(this).parents('form').children('input[type="hidden"]').attr('value', option_id);
		    $(this).parents('form').children('#product-addtocart').click();
		  }); 
		}

    if(page == 'cart') {
      
      var cartForm = $('#cart-form');
		
      $('#checkout-btn').click(function(event) {
        event.preventDefault();
        cartForm.append('<input type="hidden" name="checkout" value="1">').submit();
      });
      		
			$('.remove_item').click(function(event) {
			  event.preventDefault();
			  $(this).closest('li').find('.quantity_input input').val(0);
			  cartForm.submit();
			});		      
	  }	  
  }
};
