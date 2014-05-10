require 'dugway'

options = {}

# Use data from any store to make sure your theme looks great with all sorts of products, pages,
# categories, and more. Just give us the subdomain. Default is "dugway" for dugway.bigcartel.com.
# manyhands

#  options[:store] = 'askalice'
#  options[:store] = 'thisispaper'
#  options[:store] = 'windandwillowhome'
#  options[:store] = 'lunatheme'
#  options[:store] = 'rothirsch'
#  options[:store] = 'pelledesigns'
#	 options[:store] = 'unmarkedmx'
#  options[:store] = 'dahlhausart'
#  options[:store] = 'ohmykids'
#  options[:store] = 'herriottgrace'
#  options[:store] = 'unmarkedmx'

  
# Simulate the customization done by store owners by passing values to different variables.
# Default values are based on the "default" for each setting in your settings.json.

options[:customization] = {
#   :logo => {
#     :url => 'http://placehold.it/200x50/000000/ffffff&text=My+Logo',
#     :width => 200,
#     :height => 50http://images.cdn.bigcartel.com/bigcartel/product_images/114125334/max_h-1000+max_w-1000/HEL_WD86_1_1000x1000.jpg
#   },
#     :background_color => '#111111',
#    :border_color => '#333333',
#    :background_secondary_color => '#333333',  
#    :text_color => '#cccccc',
#    :text_secondary_color => '#aaaaaa',
#    :link_color => '#007aff',
#    :hover_color => '#FF6157',
#		:products_per_page => '12',
		:product_list_layout => 'stacked',
#    :show_search => true,
		:share_buttons => true,
		:show_inventory_bars => true,
#		:tumblr_link => 'http://tumblr.com/',
#		:twitter_link => 'http://twitter.com/',
#		:facebook_link => 'http://facebook.com/',		
#	:welcome_text => 'What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.',
 }

run Dugway.application(options)

