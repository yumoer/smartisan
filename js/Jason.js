+(function(w){
	/*使用导航和无缝滑屏前请在你的less文件里引入component下的carousel.less和nav.less文件*/
	w.Jason = {};
	w.Jason.css=function (node,type,val){
        /*操作2d变换属性，两个参数为读取，三个参数为设置node:节点名 type:变换类型 val:值（不用带单位）px，deg*/
 			if(typeof node ==="object" && typeof node["transform"] ==="undefined" ){
				node["transform"]={};
			}
			
			if(arguments.length>=3){
				//设置
				var text ="";
				node["transform"][type] = val;
				
				for( item in node["transform"]){
                    switch (item){
                        case "translateX":
                        case "translateY":
                        case "translateZ":
                            text +=  item+"("+node["transform"][item]+"px)";
                            break;
                        case "scale":
                            text +=  item+"("+node["transform"][item]+")";
                            break;
                        case "rotate":
                            text +=  item+"("+node["transform"][item]+"deg)";
                            break;
                    }
                    if(node["transform"].hasOwnProperty(item)){
					}
				}
				node.style.transform = node.style.webkitTransform = text;
			}else if(arguments.length==2){
				//读取
				val =node["transform"][type];
				if(typeof val === "undefined"){
					switch (type){
						case "translateX":
						case "translateY":
						case "rotate":
							val =0;
							break;
						case "scale":
							val =1;
							break;
					}
				}
				return val;
			}
		};
	w.Jason.carousel=function (arr){
		/*滑屏：
         固定html结构：
        <div class="carousel-wrap" needAuto needCarousel>
         <div class="points-wrap"></div>
        </div>
        needAuto：是否自动滑屏
        needCarousel：是否无缝
       调用时需要传一个包含所有图片路径的数组：
       carousel();
        function carousel(){
          var arr=["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg"];
          Jason.carousel(arr);
        };
      */
				//布局
				var carouselWrap = document.querySelector(".carousel-wrap");
				if(carouselWrap){
					var pointslength = arr.length;
					
					//无缝
					var needCarousel = carouselWrap.getAttribute("needCarousel");
					needCarousel = needCarousel == null?false:true;
					if(needCarousel){
						arr=arr.concat(arr);
					}
					
					
					var ulNode = document.createElement("ul");
					Jason.css(ulNode,"translateZ",0);
					var styleNode = document.createElement("style");
					ulNode.classList.add("list");
					for(var i=0;i<arr.length;i++){
						ulNode.innerHTML+='<li><a href="javascript:;"><img src="'+arr[i]+'"/></a></li>';
					}
					styleNode.innerHTML=".carousel-wrap > .list > li{width: "+(1/arr.length*100)+"%;}.carousel-wrap > .list{width: "+arr.length+"00%}";
					carouselWrap.appendChild(ulNode);
					document.head.appendChild(styleNode);
					
					var imgNodes = document.querySelector(".carousel-wrap > .list > li > a >img");
					setTimeout(function(){
						carouselWrap.style.height=imgNodes.offsetHeight+"px";
					},100)
					var pointsWrap = document.querySelector(".carousel-wrap > .points-wrap");
					if(pointsWrap){
						for(var i=0;i<pointslength;i++){
							if(i==0){
								pointsWrap.innerHTML+='<span class="active"></span>';
							}else{
								pointsWrap.innerHTML+='<span></span>';
							}
						}
						var pointsSpan = document.querySelectorAll(".carousel-wrap > .points-wrap > span");
					}
					/*滑屏
					 * 	1.拿到元素一开始的位置
					 * 	2.拿到手指一开始点击的位置
					 * 	3.拿到手指move的实时距离
					 * 	4.将手指移动的距离加给元素
					 * */
					/*
					 * 防抖动
					 * 1.判断用户首次滑屏的方向
					 * 2.如果是x轴
					 * 		以后不管用户怎么滑都会抖动
					 * 3.如果是y轴
					 * 		以后不管用户怎么滑都不会抖动	
					 * */
					var index =0;
					//手指一开始的位置
					var startX = 0;
					var startY = 0;
					//元素一开始的位置
					var elementX = 0;
					var elementY = 0;
					//var translateX =0;
					//首次滑屏的方向
					var isX = true;
					var isFirst = true;
					carouselWrap.addEventListener("touchstart",function(ev){
						ev=ev||event;
						var TouchC = ev.changedTouches[0];
						ulNode.style.transition="none";
						//无缝
						if(needCarousel){
							var index = Jason.css(ulNode,"translateX")/document.documentElement.clientWidth;
							if(-index === 0){
								index = -pointslength;
							}else if(-index ==(arr.length-1)){
								index = -(pointslength-1)
							}
							Jason.css(ulNode,"translateX",index*document.documentElement.clientWidth)
						}
						startX=TouchC.clientX;
						startY=TouchC.clientY;
						elementX=Jason.css(ulNode,"translateX");
						elementY=Jason.css(ulNode,"translateY");
						//清楚定时器
						clearInterval(timer);
						isX = true;
						isFirst = true;
					})
					carouselWrap.addEventListener("touchmove",function(ev){
						//看门狗  二次以后的防抖动
						if(!isX){
							//咬住
							return;
						}
						ev=ev||event;
						var TouchC = ev.changedTouches[0];
						var nowX = TouchC.clientX;
						var nowY = TouchC.clientY;
					    var disX = nowX - startX;
					    var disY = nowY - startY;
					    //首次判断用户的方向
					    if(isFirst){
					    	isFirst = false;
					    	//判断用户的滑动方向
					    	//x ---> 放行
					    	//y ---> 首次狠狠的咬住，并且告诉兄弟 下次也给我咬住
					    	if(Math.abs(disY)>Math.abs(disX)){
						    	//y轴上滑
						    	isX = false;
						    	//首次防抖动
						    	return;
						    
						    }
					    }
						Jason.css(ulNode,"translateX",elementX+disX);
					})
					carouselWrap.addEventListener("touchend",function(ev){
						ev=ev||event;
					    index = Jason.css(ulNode,"translateX")/document.documentElement.clientWidth;
						index = Math.round(index);
						
						if(index>0){
							index=0;
						}else if(index<1-arr.length){
							index=1-arr.length;
						}
						xiaoyuandian(index);
						ulNode.style.transition=".5s transform";
						Jason.css(ulNode,"translateX",index*(document.documentElement.clientWidth));
						
						if(needAuto){
							auto();
						}
					})
					//自动轮播
					var timer =0;
					var needAuto = carouselWrap.getAttribute("needAuto");
					needAuto = needAuto == null?false:true;
					if(needAuto){
						auto();
					}
					function auto(){
						clearInterval(timer);
						timer=setInterval(function(){
							if(index == 1-arr.length){
								ulNode.style.transition="none";
								index = 1-arr.length/2;
								Jason.css(ulNode,"translateX",index*document.documentElement.clientWidth);
							}
							setTimeout(function(){
								index--;
								ulNode.style.transition="1s transform";
								xiaoyuandian(index);
								Jason.css(ulNode,"translateX",index*document.documentElement.clientWidth);
							},50)
						},2000)
					}
					
					function xiaoyuandian(index){
						if(!pointsWrap){
							return;
						}
						for(var i=0;i<pointsSpan.length;i++){
							pointsSpan[i].classList.remove("active");
						}
						pointsSpan[-index%pointslength].classList.add("active");
					}
				}
			};
	w.Jason.dragNav=function(){
		/*带橡皮筋快速滑屏效果的导航*/
		//滑屏区域
		var wrap = document.querySelector(".Jason-dragNav");
		//滑屏元素
		var item = document.querySelector(".Jason-dragNav .list");
		//元素一开始的位置  手指一开始的位置
		var startX=0;
		var elementX =0;
		var minX = wrap.clientWidth - item.offsetWidth;
		//快速滑屏的必要参数
		var lastTime =0;
		var lastPoint =0;
		var timeDis =1 ;
		var pointDis =0;
		wrap.addEventListener("touchstart",function(ev){
			ev=ev||event;
			var touchC = ev.changedTouches[0];
			startX = touchC.clientX;
			elementX = Jason.css(item,"translateX");
			item.style.transition="none";
			lastTime = new Date().getTime();
			lastPoint = touchC.clientX;
			//lastPoint = Jason.css(item,"translateX");
			//清除速度的残留
			pointDis=0;
			item.handMove = false;
		})
		wrap.addEventListener("touchmove",function(ev){
			ev=ev||event;
			var touchC = ev.changedTouches[0];
			var nowX = touchC.clientX;
			var disX = nowX - startX;
			var translateX = elementX+disX;
			var nowTime =new Date().getTime();
			var nowPoint = touchC.clientX;
			timeDis = nowTime - lastTime;
			pointDis = nowPoint - lastPoint;
			lastTime = nowTime;
			lastPoint = nowPoint;
			/*手动橡皮筋效果
			 * 
			 * 在move的过程中，每一次手指touchmove真正的有效距离慢慢变小，元素的滑动距离还是在变大
			 * 
			 * pointDis：整个手指touchmove真正的有效距
			 * 
			 * translateX = Jason.css(item,"translateX") + pointDis*scale;!!!
			 * 
			 * */
			if(translateX>0){
				item.handMove = true;
				var scale = document.documentElement.clientWidth/((document.documentElement.clientWidth+translateX)*1.5);
				translateX = Jason.css(item,"translateX") + pointDis*scale;
			}else if(translateX<minX){
				item.handMove = true;
				var over = minX - translateX;
				var scale = document.documentElement.clientWidth/((document.documentElement.clientWidth+over)*1.5);
				translateX = Jason.css(item,"translateX") + pointDis*scale;
			}
			Jason.css(item,"translateX",translateX);
		})
		wrap.addEventListener("touchend",function(ev){
			var translateX = Jason.css(item,"translateX");
			if(!item.handMove){
				//快速滑屏
				//速度越大  位移越远
				var speed = pointDis/timeDis;
				speed = Math.abs(speed)<0.5?0:speed;
				var targetX = translateX + speed*200;
				var time = Math.abs(speed)*0.2;
				time = time<0.8?0.8:time;
				time = time>2?2:time;
				//快速滑屏的橡皮筋效果
				var bsr="";
				if(targetX>0){
					targetX=0;
					bsr = "cubic-bezier(.26,1.51,.68,1.54)";
				}else if(targetX<minX){
					targetX = minX;
					bsr = "cubic-bezier(.26,1.51,.68,1.54)";
				}
				item.style.transition=time+"s "+bsr+" transform";
				Jason.css(item,"translateX",targetX);
			}else{
				//手动橡皮筋效果
				item.style.transition="1s transform";
				if(translateX>0){
					translateX=0;
					Jason.css(item,"translateX",translateX);
				}else if(translateX<minX){
					translateX = minX;
					Jason.css(item,"translateX",translateX);
				}
			}
		})
	};
    w.Jason.vMove=function(wrap,callBack){
		//滑屏区域
		//滑屏元素
		var item = wrap.children[0];
		damu.css(item,"translateZ",0.1);
		
		//元素一开始的位置  手指一开始的位置
		var start={};
		var element ={};
		var minY = wrap.clientHeight - item.offsetHeight;
		//快速滑屏的必要参数
		var lastTime =0;
		var lastPoint =0;
		var timeDis =1 ;
		var pointDis =0;
		
		var isY =true;
		var isFirst = true;
		
		//即点即停
		var animationTimer =0;
		var Tween = {
			Linear: function(t,b,c,d){ return c*t/d + b; },
			back: function(t,b,c,d,s){
	            if (s == undefined) s = 1.70158;
	            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        	}
		}
		wrap.addEventListener("touchstart",function(ev){
			ev=ev||event;
			var touchC = ev.changedTouches[0];
			
			start = {clientX:touchC.clientX,clientY:touchC.clientY};
			element.y = damu.css(item,"translateY");
			element.x= damu.css(item,"translateX");
			
			item.style.transition="none";
			
			lastTime = new Date().getTime();
			lastPoint = touchC.clientY;
			//lastPoint = damu.css(item,"translateY");
			
			//清除速度的残留
			pointDis=0;
			item.handMove = false;
			
			
			isY =true;
			isFirst = true;
			
			//即点即停
			window.cancelAnimationFrame(animationTimer);
			
			
			if(callBack&&typeof callBack["start"] === "function"){
				callBack["start"].call(item);
			}
		})
		
		wrap.addEventListener("touchmove",function(ev){
			if(!isY){
				return;
			}
			
			ev=ev||event;
			var touchC = ev.changedTouches[0];
			/*var nowY = touchC.clientY;
			var disY = nowY - startY;
			var translateY = elementY+disY;*/
			var now = touchC;
			var dis = {};
			dis.y = now.clientY - start.clientY;
			dis.x = now.clientX - start.clientX;
			var translateY = element.y+dis.y;
			
			if(isFirst){
				isFirst = false;
				if(Math.abs(dis.x)>Math.abs(dis.y)){
					isY = false;
					return;
				}
			}
			
			
			
			var nowTime =new Date().getTime();
			var nowPoint = touchC.clientY;
			timeDis = nowTime - lastTime;
			pointDis = nowPoint - lastPoint;
			
			lastTime = nowTime;
			lastPoint = nowPoint;
			
			/*手动橡皮筋效果
			 * 
			 * 在move的过程中，每一次手指touchmove真正的有效距离慢慢变小，元素的滑动距离还是在变大
			 * 
			 * pointDis：整个手指touchmove真正的有效距
			 * 
			 * translateY = damu.css(item,"translateY") + pointDis*scale;!!!
			 * 
			 * */
			if(translateY>0){
				item.handMove = true;
				var scale = document.documentElement.clientHeight/((document.documentElement.clientHeight+translateY)*1.5);
				translateY = damu.css(item,"translateY") + pointDis*scale;
			}else if(translateY<minY){
				item.handMove = true;
				var over = minY - translateY;
				var scale = document.documentElement.clientHeight/((document.documentElement.clientHeight+over)*1.5);
				translateY = damu.css(item,"translateY") + pointDis*scale;
			}
			damu.css(item,"translateY",translateY);
			
			if(callBack&&typeof callBack["move"] === "function"){
				callBack["move"].call(item);
			}
		})
		
		wrap.addEventListener("touchend",function(ev){
			var translateY = damu.css(item,"translateY");
			if(!item.handMove){
				//快速滑屏
				//速度越大  位移越远
				var speed = pointDis/timeDis;
				speed = Math.abs(speed)<0.5?0:speed;
				var targetY = translateY + speed*200;
				var time = Math.abs(speed)*0.2;
				time = time<0.8?0.8:time;
				time = time>2?2:time;
				//快速滑屏的橡皮筋效果
				console.log(targetY,time);
				//var bsr="";
				var type = "Linear";
				if(targetY>0){
					targetY=0;
					type = "back";
					//bsr = "cubic-bezier(.26,1.51,.68,1.54)";
				}else if(targetY<minY){
					targetY = minY;
					type = "back";
					//bsr = "cubic-bezier(.26,1.51,.68,1.54)";
				}
				/*item.style.transition=time+"s "+bsr+" transform";
				damu.css(item,"translateY",targetY);*/
				bsr(type,targetY,time);
			}else{
				//手动橡皮筋效果
                if(translateY>0){
                    translateY=0;
                }else if(translateY<minY){
                    translateY = minY;
                }
                bsr("Linear",translateY,1)


                if(callBack&&typeof callBack["handEnd"] === "function"){
                    callBack["handEnd"].call(item);
                }
            }
        })
		
		
		function bsr(type,targetY,time){
			//当前次数
			var t=0;
			//初始位置
			var b = damu.css(item,"translateY");
			//最终位置 - 初始位置
			var c = targetY -b;
			//总次数
			var d = time*1000 / (1000/60);
			
			
			function step() {
			 	t++;
				if(callBack&&typeof callBack["move"] === "function"){
					callBack["move"].call(item);
				}
				if(t>d){
					if(callBack&&typeof callBack["end"] === "function"){
						callBack["end"].call(item);
					}
					window.cancelAnimationFrame(animationTimer);
					return;
				}
				var point = Tween[type](t,b,c,d);
				damu.css(item,"translateY",point);
				animationTimer =window.requestAnimationFrame(step);
			}
			animationTimer = window.requestAnimationFrame(step);
		}
	}
/*	w.Jason.remAdaptive=function (flag) {
		/!*rem适配方案 flag为多少比例：16、10*!/
		document.addEventListener("touchstart",function (ev) {
			ev = ev||event;
			ev.preventDefault();
		});
		!(function (flag) {
            var headNode = document.querySelector("head");
            var styleNode = document.createElement("style");
            headNode.innerHTML+="<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0\" />";
            var w = document.documentElement.offsetWidth/flag;
            styleNode.innerHTML="html{font-size:"+w+"px !importent;}";
            document.head.appendChild(styleNode);
        })(flag)
    };
    w.Jason.viewportAdaptive=function (targetW) {
    	/!*viewport适配方案 targetW为设计图宽度*!/
		var headNode = document.querySelector("head");
		headNode.innerHTML+="<meta name=\"viewport\" content=\"width=device-width\"/>";
        !(function(targetW){
            var scale = document.documentElement.clientWidth/targetW;
            var meta = document.querySelector("meta[name='viewport']");
            meta.content="initial-scale="+scale+",minimum-scale="+scale+",maximum-scale="+scale+",user-scalable=no";
        })(targetW)
    };*/
    w.Jason.addClass=function (node,className){
    	/*为添加节点添加class属性 node节点名 className 类名*/
        var reg=new RegExp("\\b"+className+"\\b");
        if(!reg.test(node.className)){
            node.className +=(" "+className);
        }
    };
    w.Jason.removeClass=function (node,className){
        /*删除节点class属性 node节点名 className 类名*/
        if(node.className){
            var reg=new RegExp("\\b"+className+"\\b");
            var classes = node.className;
            node.className=classes.replace(reg,"");
            if(/^\s*$/g.test(node.className)){
                node.removeAttribute("class");
            }
        }else{
            node.removeAttribute("class");
        }
    }
    w.Jason.gesTure =function (node,callBack){
        //手指先触碰元素再触碰白色屏幕时无法触发gesturestart（ios不一样的地方）
        var startDis =0;
        node.addEventListener("touchstart",function(ev){
            node.hasStart =false;

            ev = ev||event;
            if(ev.touches.length>=2){
                node.hasStart =true;

                startDis  =  getDis(ev.touches[0],ev.touches[1]);
                startDeg  =  getDeg(ev.touches[0],ev.touches[1]);

                if(callBack&& typeof callBack["start"] === "function"){
                    callBack["start"].call(node);
                }
            }
        })
        node.addEventListener("touchmove",function(ev){
            ev = ev||event;
            if(ev.touches.length>=2){
                ev.scale = getDis(ev.touches[0],ev.touches[1]) / startDis;

                //为了兼容安卓方向不一致的问题
                ev.rotation = getDeg(ev.touches[0],ev.touches[1]) - startDeg;


                if(callBack&& typeof callBack["change"] === "function"){
                    callBack["change"].call(node,ev);
                }
            }
        })
        node.addEventListener("touchend",function(ev){
            ev = ev||event;
            //必须有node.hasStart的校验，如果没有单指操作时，gestureend逻辑也会被触发
            if(ev.touches.length<2 && node.hasStart){
                if(callBack&& typeof callBack["end"] === "function"){
                    callBack["end"].call(node);
                }
            }
        })
        //根据两个点拿到手指间的距离
        function getDis(p1,p2){
            var a = p1.clientY - p2.clientY;
            var b = p1.clientX - p2.clientX;

            return Math.sqrt(a*a+b*b);
        }
        //根据两个点拿到手指间线段与x轴正方向的夹角
        function getDeg (p1,p2){
            var a = p1.clientY - p2.clientY;
            var b = p1.clientX - p2.clientX;
            return Math.atan2(a,b)*180/Math.PI;
        }
    }
})(window);
