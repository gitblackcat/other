$(function(){
	var o = new Obj();
	o.init();
})

function Obj(){
	this.picArr = [
		'img/onePunch.jpg',
		'img/onePunch2.jpg',
		'img/onePunch3.jpg',
		'img/onePunch4.jpg'
	];
	this.len = this.picArr.length;
	this.picList = '';
	this.picItem = 400;
	this.index = 0;
	this.left = $('.left');
	this.right = $('.right');
	this.oUl = $('ul');
}

Obj.prototype.init = function(){
	this.FlowAndPaint();
	this.clickPrev();
	this.clickNext();
}

Obj.prototype.FlowAndPaint = function(){
	var self = this;

	$.each(self.picArr,function(i,v){
		self.picList += '<li><img src=' + v + '></li>';
	})

	this.oUl.css({"width": self.picItem * self.len + 'px'})

	this.oUl.html(self.picList);
}

Obj.prototype.clickPrev = function(){
	var self = this;

	this.left.click(function() {
		self.index++;

		if(self.index == self.len){
			self.picPrevCopy();
		}else{
			self.oUl.stop().animate({
				"left": -self.picItem * self.index
			}, 600,'linear')
		}
	});
}

Obj.prototype.picPrevCopy = function(){
	var self = this,
		firstLi = $('li').first().clone();

	this.oUl.append(firstLi).css({"width": self.picItem * (self.len + 1) + 'px'});

	this.oUl.stop().animate({
		"left": -self.picItem * self.index
	}, 600,'linear',function(){
		self.index = 0;
		self.oUl.css({
			"width": self.picItem * self.len + 'px',
			"left": 0
		});

		$('li').last().remove();

	})

}

Obj.prototype.clickNext = function(){
	var self = this;
	this.right.click(function(){
		self.index--;

		if(self.index == -1){
			self.picNextCopy();
		}else{
			self.oUl.stop().animate({
				"left": -self.picItem * self.index
			}, 600,'linear')
		}
	})
}

Obj.prototype.picNextCopy = function(){
	var self = this,
		lastLi = $('li').last().clone();

	this.oUl.prepend(lastLi).css({
		"width": self.picItem * (self.len + 1) + 'px',
		"left": -self.picItem
		// 在最前面加一个元素,那么会自动跑到最前面去的
	});

	this.oUl.stop().animate({
		"left": 0
	}, 600,'linear',function(){
		self.index = self.len - 1;
		self.oUl.css({
			"width": self.picItem * self.len + 'px',
			"left": -self.picItem * (self.len - 1) + 'px'
		});

		$('li').first().remove();

	})

}