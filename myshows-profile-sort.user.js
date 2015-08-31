// ==UserScript==
// @name        MyShows: sort serials
// @namespace   https://github.com/elartix/userjs-myshows
// @description Sort serials in alphabetic order on myshows.me
// @include     http://myshows.me/profile/
// @match       http://myshows.me/profile/
// @downloadURL https://github.com/elartix/userjs-myshows/raw/master/myshows-profile-sort.user.js
// @updateURL   https://github.com/elartix/userjs-myshows/raw/master/myshows-profile-sort.user.js
// @version     3.1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function(){
	'use strict';

	function sort_shows(){
		// sort lists at right panel
		$('ul.firmList').html(function(){
			return $(this).children().sort(function(a,b){
				return $(a).text() < $(b).text() ? -1 : 1;
			});
		});
		// sort main content
		$('main').html(function(){
			return $(this).children(':first-child').nextUntil('h2').andSelf().add(
				$(this).find('h2').map(function(){
					return $(this).nextUntil('h2').andSelf();
				}).sort(function(a,b){
					return a.first().find('a').text() < b.first().find('a').text() ? -1 : 1;
				}).map(function(){
					return this.map(function(){
						// .add() above re-order
						// added items if they're
						// jQuery/DOM objects, map
						// them to strings to
						// keep current order
						return this.outerHTML;
					}).get();
				})
			).get();
		});
		// ... and move AD to the end
		$('main hr').prevUntil('.seasonBlock, p, h2, h1').andSelf().remove().appendTo('main');
	}
	
	function applyCustomColors(){
		$('.showHeaderName a').css('color', '#b00000');
	}

	var rate_handler = jQuery._data($('.rate-episode').get(0)).events.click[0].handler;
	sort_shows();
	applyCustomColors();
	$('.rate-episode').bind('click', rate_handler);
	// from document.ready handler
	$('div.seasonBlock').each(function () {
		siteSeasonBlock = new SeasonBlock();
		siteSeasonBlock.init($(this));
	});

}, false);
