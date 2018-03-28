window.onload = function() {
			document.addEventListener("touchstart", function(ev) {
				ev = ev || event;
				ev.preventDefault();
			});
			!(function() {
				var headNode = document.querySelector("head");
				var styleNode = document.createElement("style");
				headNode.innerHTML += "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0\" />";
				var w = document.documentElement.offsetWidth / 16;
				styleNode.innerHTML = "html{font-size:" + w + "px !importent;}";
				document.head.appendChild(styleNode);
			})()
			tiaozhaun();

			function tiaozhaun() {
				var a = document.querySelectorAll(".tiaozhuan");
				var nav = document.querySelector("nav");
				for(var i = 0; i < a.length; i++) {
					a[i].addEventListener("touchend", function(ev) {
						location.href = this.href;
					})
				}
			}
			
		checked();
		function checked(){
			var check = document.querySelector("#checked");
			var flag = true;
			check.addEventListener("touchend",function(){
				Jason.removeClass(check,"chActive");
				if(flag){
					Jason.addClass(check,"chActive");
				}else{
					Jason.removeClass(check,"chActive");
				}
				flag = !flag;
			})
			
		}
		
		submit();
		function submit() {
			var check = true;
			var denglu = document.querySelector(".denglu");
			var indexhref = document.querySelector("#index");
			denglu.addEventListener("touchend", function() {
				mui(".submit").each(function() {
					//若当前input为空，则alert提醒 
					if(!this.value || this.value.trim() == "") {
						var label = this.getAttribute("placeholder");
						mui.toast(label + "不允许为空");
						check = false;
						return false;
					} else {
						check = true;
					}
				}); //校验通过，继续执行业务逻辑
				if(check) {
					mui.toast('登陆成功!');
					setTimeout(function() {
						location.href = indexhref.href;
						//location.href不止可以作用于a标签，只要获取到的a标签上有href属性就可以跳转
					}, 1000)
				}
			})
		}
		}