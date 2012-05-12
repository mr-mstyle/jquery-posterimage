/**
 * jQuery.posterimage - Put a posterimage in front of your video.
 * Copyright (c) 2012 Elevating.nl - mr.mstyle(at)gmail(dot)com | http://www.elevating.nl
 * Dual licensed under MIT and GPL.
 * Date: 02/14/2012
 * Released: 23/12/2012
 * @author mr.mstyle(at)gmail(dot)com | http://www.elevating.nl
 * @version 1.0.0
 **/
(function($) {
    $.fn.extend({
        posterimage: function(options) {
		
			var defaults = {
				image: '',
				title: 'Click to view the video',
				title_color: '#fff',
				title_backgroundcolor: '#222',
				autoplay: false
            };
            var options = $.extend(defaults, options);


			return this.each(function() {

                var obj = $(this);
				var vid_iframe = obj.find("iframe");
				

				if(vid_iframe.css("display")=='none') return false;
				
				// if iframe
				var vid_src = vid_iframe.attr("src");
				var width = vid_iframe.attr('width');
				var height = vid_iframe.attr('height');


				if(width=='' || width=='undefined'){
					alert('No width has been given.')
				}
				if(height=='' || height=='undefined'){
					alert('No height has been given.')
				}

				
				// if autoplay is 'true' then add it. 
				// There should be better checking for the autoplay variable
				// but by default most sites have autoplay off.
				if(options.autoplay == true) {
					var sep = "?";
					var v_uri = vid_src.split(sep);

					if(v_uri[1]!=='' && v_uri[1]!==undefined) {
						sep = "&";
					}
					vid_iframe.attr("src", vid_src + sep + "autoplay=1");
				}			
				vid_iframe.hide();
				

				// Generate a unique poster_ID
				var poster_id = "poster_" + Math.floor(Math.random()*999);				
				
				// Create the video DIV
				var vid_div = $('<div/>', {
   					id: poster_id,
   					css: {
        				overflow: 'hidden',
        				backgroundColor: options.title_color,
        				width: width,
        				height: height
    					}
					}).attr("title", options.title);


				// create the parapgraph to display the title text
				// (would plain HTML not been better?)
				var vid_p = $('<p/>', {
   					css: {
        				lineHeight: '20px',
        				fontSize: '12px',
						margin:0,
						fontFamily: 'lucida sans, sans-serif',
        				marginTop: (height - 70) + 'px',
        				padding: '15px',
        				color: options.title_color,
        				backgroundColor: options.title_backgroundcolor,
        				position: 'absolute',
        				zIndex: '2'
    					}
					}).html("&#9658; " + options.title);
				vid_p.appendTo(vid_div);


				// if we have an image put that in there as well.
				if(options.image !== '') {
					$('<img src="' + options.image + '" width="' + width + '" height="' + height + '" />')
						.appendTo(vid_div);
				}
				if(options.credits !== false) {
					$('<p style="font-size:10px;color:#aaa;">Powered by posterimage</p>').appendTo('#' + obj.attr('id'));
				}

				obj.prepend(vid_div);

				
                //Create a reference to the control
				$("#" + poster_id).bind('click', function() {
					$(this).hide();
					vid_iframe.show();					
                }).css('cursor', 'pointer');				
				
            });		
        }
    });
})(jQuery);