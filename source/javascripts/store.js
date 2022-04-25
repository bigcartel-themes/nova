var Store = {

  defaults: {
    cutoffWidth: 768
  },

  init: function(page, options) {
    var win = $(window);
    var width = $(document).width();

    if (page == 'home' || 'products' || 'product') {
      $('.product, #product, #gallery').each(function() {
        let item_container = $(this);
        $(this).imagesLoaded(function() {
          item_container.find('.spinner').remove();
          // Initialize galleries for images
          $('.product, #product').find('.product_images.galy').flexslider({
            animation: 'slide',
            easing: 'swing',
            animationSpeed: 500,
            directionNav: false,
            slideshow: false,
            smoothHeight: true
          });
          $('#gallery .product_images.galy').flexslider({
            animation: 'slide',
            easing: 'swing',
            animationSpeed: 500,
            directionNav: false,
            slideshow: true,
            smoothHeight: true
          });
          $(this).find('.slides img').attr('style','opacity: 1');
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
        event.stopPropagation();

        $('#product_sharing ul').fadeToggle();
      });

      $('#close_sharing').click(function(event) {
        event.preventDefault();
        event.stopPropagation();

        $('#product_sharing ul').fadeToggle();
      });

    }

    if (page == 'cart') {
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

$('.category-navigation-title').click(function(e) {
  $('.category-navigation-list').toggleClass('visible');
});
$('.category-navigation-title').on('keydown', function(e) {
  if (e.keyCode == 32) { // Spacebar
    e.preventDefault();
    $('.category-navigation-list').toggleClass('visible');
  }
});

var isGreaterThanZero = function(currentValue) {
  return currentValue > 0;
}

function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

function unique(item, index, array) {
  return array.indexOf(item) == index;
}

function cartesianProduct(a) {
  var i, j, l, m, a1, o = [];
  if (!a || a.length == 0) return a;
  a1 = a.splice(0, 1)[0];
  a = cartesianProduct(a);
  for (i = 0, l = a1.length; i < l; i++) {
    if (a && a.length) for (j = 0, m = a.length; j < m; j++)
      o.push([a1[i]].concat(a[j]));
    else
      o.push([a1[i]]);
  }
  return o;
}

Array.prototype.equals = function (array) {
  if (!array)
    return false;
  if (this.length != array.length)
    return false;
  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
}

// From https://github.com/kevlatus/polyfill-array-includes/blob/master/array-includes.js
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

Array.prototype.count = function(filterMethod) {
  return this.reduce((count, item) => filterMethod(item)? count + 1 : count, 0);
}
$('.product_option_select').on('change',function() {
  var option_price = $(this).find("option:selected").attr("data-price");
  enableAddButton(option_price);
});
function enableAddButton(updated_price) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  addButton.attr("disabled",false);
  if (updated_price) {
    priceTitle = ' - ' + Format.money(updated_price, true, true);
  }
  else {
    priceTitle = '';
  }
  addButton.html(addButtonTitle + priceTitle);
}

function disableAddButton(type) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  if (type == "sold-out") {
    var addButtonTitle = addButton.attr('data-sold-title');
  }
  if (!addButton.is(":disabled")) {
    addButton.attr("disabled","disabled");
  }
  addButton.html(addButtonTitle);
}

function enableSelectOption(select_option) {
  select_option.removeAttr("disabled");
  select_option.text(select_option.attr("data-name"));
  select_option.removeAttr("disabled-type");
  if ((select_option.parent().is('span'))) {
    select_option.unwrap();
  }
}
function disableSelectOption(select_option, type) {
  if (type === "sold-out") {
    disabled_text = select_option.parent().attr("data-sold-text");
    disabled_type = "sold-out";
    if (show_sold_out_product_options === 'false') {
      hide_option = true;
    }
    else {
      hide_option = false;
    }
  }
  if (type === "unavailable") {
    disabled_text = select_option.parent().attr("data-unavailable-text");
    disabled_type = "unavailable";
    hide_option = true;
  }
  if (select_option.val() > 0) {
    var name = select_option.attr("data-name");
    select_option.attr("disabled",true);
    select_option.text(name + ' ' + disabled_text);
    select_option.attr("disabled-type",disabled_type);
    if (hide_option === true) {
      if (!(select_option.parent().is('span'))) {
        select_option.wrap('<span>');
      }
    }
  }
}


