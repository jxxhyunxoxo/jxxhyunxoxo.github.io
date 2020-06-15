/* 
	writer : onekwan 
	options 
	date : "yyyy-mm-dd hh:mm:ss",
	intervalTime : 1000,
	interval : function(){},
	finish : function(){}
*/

(function (window,$,undefined) {
	//var SECONDTOMICRO = 1;
	var SECONDTOMSC = 1000; //1黕� 1,000,000 諤�𦚯�禺�𨰰��
	var MINUTETOMSC = SECONDTOMSC * 60; //1賱�
	var HOURTOMSC=MINUTETOMSC * 60; //1��𨁈�
	var DAYTOMSC = HOURTOMSC * 24; //1�𦉘
	var KOREATIMEZONE = 540; 
	
	if(!window.countdown){
		window.countdown=function(options){
			if(options === undefined || null){ console.log("Insert options"); return false;}
			var instance = new CountDown(options);
			instance._init();
		};
	}
	
	var CountDown = function(options){
		this.options = options;
		this.dday;
		this.intervalTime = options.intervalTime || 1000;
		this.intervalID;
	};
	
	CountDown.prototype={
		_init:function(){
			var self=this;
			this.setDday();
			this.count();
			this.intervalId = setInterval(
				(function(self){
					return function(){
						self.count();
					};
				})(this),self.intervalTime); 
		},
		setDday:function(){
			var self=this;
			var date = new Date(this.options.date);
			var diff=(KOREATIMEZONE+new Date().getTimezoneOffset())*MINUTETOMSC;
			this.dday=date.getTime() - diff; 
		},
		count:function(){
			var self=this;
			var diff = this.dday - new Date().getTime();
			
			
			if(diff <= 0){
				if(this.options.finish){
					this.options.finish(this);
					clearInterval(this.intervalId);
					this.options.finish();
					return false;
				}
			}
			
			var days=Math.floor(diff/DAYTOMSC);
			days = new String(days);
			diff = diff - (days*DAYTOMSC);
			
			var hours = Math.floor(diff/HOURTOMSC);
			hours = this.formatTime(hours);
			diff=diff - (hours * HOURTOMSC);
			
			var minutes = Math.floor(diff/MINUTETOMSC);
			minutes = this.formatTime(minutes);
			diff=diff - (minutes * MINUTETOMSC);
			
			var seconds = Math.floor(diff/SECONDTOMSC);
			seconds = this.formatTime(seconds);
			diff = diff - (seconds * SECONDTOMSC);
			
			var micro = parseInt(diff/10);
			
			if(this.options.interval){
				this.options.interval(this,days,hours,minutes,seconds,micro);
			}
		},
		
		formatTime:function(time){ // ��𨰰�韒收�𦉘 窶趣黱 ��𪐴�� 0賱軤𦚯篣�
			if(!$.isNumeric(time)){ return false; }
			var str = new String(time);
			if(str.length <= 1){
				str="0"+str;
			}
			return str;
		}
		
	};
})(window, jQuery);