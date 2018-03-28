window.onload = function() {
			document.addEventListener("touchstart", function(ev) {
				ev = ev || event;
				ev.preventDefault();
			});
			!(function() {
				var styleNode = document.createElement("style");
				var w = document.documentElement.offsetWidth / 16;
				styleNode.innerHTML = "html{font-size:" + w + "px !importent;}";
				document.head.appendChild(styleNode);
			})()
			/*面包屑导航*/
			maskShow();
			function maskShow() {
				var mbx = document.querySelector(" header > a");
				mbx.addEventListener("touchend", function(ev) {
					ev = ev || event;
					ev.stopPropagation();
					ev.preventDefault();
					mui('.mui-off-canvas-wrap').offCanvas('show');
					maskLiClick();
				})
			}
			/*面包屑导航点击逻辑*/
			function maskLiClick() {
				var maskUl = document.querySelector(".mui-off-canvas-wrap .mui-inner-wrap .mui-off-canvas-left .mui-scroll-wrapper .mui-scroll  .Masklist");
				var maskLi = document.querySelectorAll(".mui-off-canvas-wrap .mui-inner-wrap .mui-off-canvas-left .mui-scroll-wrapper .mui-scroll  .Masklist li");
				maskUl.addEventListener("touchend", function(ev) {
					var touchC = ev.changedTouches[0];
					for(var i = 0; i < maskLi.length; i++) {
						//maskLi[i].index = i;
						Jason.removeClass(maskLi[i], "active");
					}
					Jason.addClass(touchC.target, "active");
				})
			}
			/*页面跳转逻辑*/
			tiaozhaun();
			function tiaozhaun() {
				var a = document.querySelectorAll(".tiaozhuan");
				var nav = document.querySelector("nav");
				 for(var i = 0; i<a.length; i++) {
						a[i].addEventListener("touchend", function(ev) {
							location.href = this.href;
						})
					}
			}
			/*分类页跳详情页逻辑*/
			tiaozhaunXq();
			function tiaozhaunXq() {
				
				var a = document.querySelectorAll(".contentOne a");
				
				 for(var i = 0; i<a.length; i++) {
						a[i].addEventListener("touchend", function(ev) {
							
							location.href = this.href;
						})
					}
				 var div = document.querySelectorAll(".four a");
				  for(var i = 0; i<div.length; i++) {
						div[i].addEventListener("touchend", function(ev) {
							location.href = this.href;
						})
					}
			}
		
			var gallery = mui('.mui-slider');
			gallery.slider({
		  		interval:4000
			});
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0009,
				startX: 0
			});
			var gallery1 = mui('.stop');
			gallery1.slider({
		  		interval:0
			});
					
		}

