(function($){
jQuery.fn.mnplp = function(options){
	options = $.extend({
		sourse: 'playlist.json',
		volume: 50
	}, options);

	var make = function(){
		var $this = $(this);
		var content = false;
		var crt = 0;
		var cpl = 0;
		var $audio = $('<audio></audio>');
		$this.prepend($audio);

		$this.find('.mnpl_volume').slider({
			animate: true,
			range: 'min',
			value: options.volume,
			min: 0,
			max: 1,
			step: 0.01,
			slide: function(event, ui){
				$audio[0].volume = ui.value;
			}
		});
		
	
		function toMinit(val){
			var ost = Math.floor(val%60);
			if(ost < 10){ost = '0'+ost;}
			return Math.floor(val/60)+':'+ost;
		}
		
		function init_track(i){
			$audio.attr('src', content[i].mfile);

			cpl = i;
			crt = content[i].rating;
			$this.find('.mnpl_rating li').removeClass('active');
			$this.find('.mnpl_rating li:lt('+(crt)+')').addClass('active');
			$this.find('.mnpl_title').html(content[i].title);
			$this.find('.mnpl_current').html(toMinit(0));
			$audio[0].addEventListener("loadedmetadata", function(_event){
				$this.find('.mnpl_all').html(toMinit($audio[0].duration));

				$this.find('.mnpl_long').slider({
					animate: true,
					range: 'min',
					value: 0,
					min: 0,
					max: $audio[0].duration,
					step: 1,
					slide: function(event, ui){
						$audio[0].currentTime = ui.value;
					}
				});
				
				setInterval(function(){
					$this.find('.mnpl_long').slider({'value':$audio[0].currentTime});
					$this.find('.mnpl_current').html(toMinit($audio[0].currentTime));
					if($audio[0].currentTime == $audio[0].duration){$this.find('.mnpl_tlb_next').click();}
				}, 1000);
				
				if (i) {$this.find('.mnpl_tlb_stop').removeClass('isplay').click();}
				
			});
			
			$this.find('.mnpl_author').html(content[i].author);
			$this.find('.mbl_art_bg').css('backgroundImage', 'url('+content[i].background+')');
			$this.find('.mbl_cover').attr('src', content[i].cover);
		}

		content = options.playlist;
		init_track(cpl);
		for(i=0; i < content.length; i++){
			$this.find('.mbl_playlist').append('<span>'+content[i].author+' - '+content[i].title+'</span>');
		}
		
		$this.find('.mbl_playlist span').click(function(){
			init_track($(this).index());
		});

		$this.find('.mnpl_tlb_prev').click(function(){
			if(cpl){init_track(cpl-1);}
			return false;
		});
		
		$this.find('.mnpl_tlb_stop').click(function(){
			if($(this).hasClass('isplay')){
				$audio[0].pause();
				$(this).removeClass('isplay');
			}else{
				$audio[0].play();
				$(this).addClass('isplay');
			}
			return false;
		});
		
		$this.find('.mnpl_tlb_next').click(function(){
			if(cpl != content.length-1){init_track(cpl+1);}
			return false;
		});
	};
	return this.each(make); 
};
})(jQuery);
/*
     FILE ARCHIVED ON 21:51:20 Oct 26, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:05:12 Dec 08, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.datanode: 33.418 (4)
  LoadShardBlock: 25.17 (3)
  exclusion.robots.policy: 0.133
  esindex: 0.01
  CDXLines.iter: 16.234 (3)
  RedisCDXSource: 0.654
  captures_list: 47.858
  exclusion.robots: 0.145
  load_resource: 68.197
  PetaboxLoader3.resolve: 37.185
*/