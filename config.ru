require 'dugway'

options = {}

# Use data from any store to make sure your theme looks great with all sorts of products, pages,
# categories, and more. Just give us the subdomain. Default is "dugway" for dugway.bigcartel.com.

options[:store] = 'wintercabincollection'

# Simulate the customization done by store owners by passing values to different variables.
# Default values are based on the "default" for each setting in your settings.json.

options[:customization] = {
#   :logo => {
#     :url => 'http://placehold.it/200x50/000000/ffffff&text=My+Logo',
#     :width => 200,
#     :height => 50
#   },
#   :background_color => '#CCCCCC',
    :show_search => true,
#   :twitter_username => 'mytwitter'
		:show_inventory_bars => true,
#		:tumblr_link => 'http://tumblr.com/',
#		:twitter_link => 'http://twitter.com/',
#		:facebook_link => 'http://facebook.com/',		
		:welcome_text => 'What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.',
 }

run Dugway.application(options)

