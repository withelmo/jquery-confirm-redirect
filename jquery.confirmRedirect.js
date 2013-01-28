/**
 * jQuery.ConfirmRedirect
 * under MIT license.
 *
 * @projectDescription The confirmation before redirecting using jQuery.
 * @author withelmo()
 */

(function($){

    $.fn.confirmRedirect = function(option) {
	var settings = $.extend({
	    'message': 'このページから移動してもよろしいですか？',
	    'url': '/',
	    'data-msg-name': 'crmsg',
	    'data-url-name': 'crurl'
	}, option);

	return this.each(function() {
	    // @todo イベントリスナーで取得できるかもしれない
	    var onclick;
	    onclick = $(this).attr('onclick');
	    $(this).attr('onclick', '');

	    var href;
	    href = $(this).attr('href');
	    if (href !== '#') {
		$(this).attr({
		    'href': '#'
		}).data(settings['data-url-name'], href);
	    }

	    $(this).on('click', function() {
		var message, url;

		// set message for popup
		message = $(this).data(settings['data-msg-name']);
		if (!message) {
		    message = settings['message'];
		}

		// set URL for redirect
		url = $(this).data(settings['data-url-name']);
		if (!url) {
		    url = settings['url'];
		}

		// confirm
		if (confirm(message)) {
		    if (onclick) {
			// @todo セキュリティ的に問題があるかもしれない。使う場所に注意。
			eval(onclick)
		    } else {
			location.href = url;
		    }
		}
		return false;
	    });
	});
    };

})($);