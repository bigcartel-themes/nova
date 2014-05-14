var Store = {
  
  defaults: {
    cutoffWidth: 768
  },
  
  init: function(page, options) {
    var inPreview = (/\/admin\/design/.test(top.location.pathname));
    var win = $(window);
    var width = $(document).width();
    
    options = $.extend(this.defaults, options);
    
    // Mobile menu
    
    $('').click(function() { 
      $('#nav_primary').slideToggle('slow');
    });  
    
    
    if(page == 'home' || 'products' || 'product') {
      
      $('.product, #product, #gallery').each(function() {
        $(this).imagesLoaded(function() {

          $(this).find('.spinner').fadeOut();         
          $(this).find('.slides').show();
            
          // Initialize galleries for product images
      
          $(this).find('.product_images.galy').flexslider({
            animation: 'slide',
            easing: 'swing',
            animationSpeed: 500,
            directionNav: false,
            slideshow: false,
            smoothHeight: true
            //useCSS: false //temp css transition fix
          }); 
        });
      });     
      
      // Setup click to advance slideshow (not on mobile)
      
      if ('ontouchstart' in document.documentElement) {
        //
      } else {
        $('.product_images.galy').click(function(event) {
          event.preventDefault();
          $(this).flexslider('next'); //Go to next slide
        }); 
      } 

      // Setup masonry grid
      var $productGrid = $('#products_page .canvas.grid #products');
      $($productGrid).imagesLoaded(function() {

        $productGrid.isotope({
          itemSelector : '.product',
          layoutMode : 'fitRows',
          resizable: true, 
        });
      });         
      
      // Dropdowns 
      
      $('#options_button, #cat_button').on('click', function(event){
        event.preventDefault();
        event.stopPropagation();        
        
        $(this).addClass('selected');
        $(this).parent().children('#options_menu').show();
        $(this).children('span.label').text('Select an Option');
        $('#options_button').children('span.arrow').toggle();
      });
      
      $('#product_sharing > a').click(function(event) {
        event.preventDefault();
        
        $('#product_sharing ul').fadeToggle();
      });

      $('#close_sharing').click(function(event) {
        event.preventDefault();
        
        $('#product_sharing ul').fadeToggle();
      });     
    
      // Close dropdown menus on click outside of menu
      
      $('html, #options_menu').on('click', function() {

        $('#options_button.selected').children('span.label').text('Buy Now');         
        $('#options_button.selected').children('span.arrow').toggle();       
        $('#options_button').removeClass('selected');             
        $('#options_menu').hide();
      });
      
      // Grabs option id and submits add to cart button
      
      $('#product #options_menu li').on('click', function(){
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
