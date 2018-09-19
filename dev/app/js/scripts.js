//= inc/jquery-3.3.1.min.js
//= inc/rangeslider.min.js
//= inc/knockout-3.4.2.min.js
//= inc/chart.min.js

var goal_name,
	goal_own,
	goal_time,
	goal_amount,
	goal_q1,
	goal_q2,
	goal_q3;

var	asset_earn_month,
	asset_earn_year,
	asset_earn_annual,
	asset_expends_month,
	asset_expends_year,
	asset_expends_annual,
	asset_user_invest_month,
	asset_user_invest_year,
	asset_user_initial;

var philo_skill,
	philo_time;

var pref_a1,
	pref_a2,
	pref_a3,
	pref_com = false,
	pref_modern = false,
	pref_passion = false;

var aim_reached = 2;


	// Asset Earn binding
	var assetEarnModel = function() {
		var self = this;
		self.monthly = ko.observable(0);
		self.yearly = ko.observable(0);
	 
		self.result = ko.pureComputed(function() {
			return +self.monthly() * 12  + +self.yearly();
			console.log(ass1)
		});
	};
	var assetEarn = new assetEarnModel();
	ko.applyBindings(assetEarn); // This makes Knockout get to work

	$(function () {
		mainNavMenu();
		unlockNextBtn();
		rangeSliderInit();
		toggleInfo();
		getValues();
		slideToggleBlock();
		showAimBlock();
		prefCheck();
	});

	// Main Nav Menu
	function mainNavMenu() {
		$('.fader').on('click touchmove', function() {
			$('html').removeClass('push');
		});
		$('.btn-menu').on('click', function(e) {
			$('html').toggleClass('push');
			e.preventDefault();
		});
		$('.main-nav__close').on('click', function(e) {
			$('html').removeClass('push');
			e.preventDefault();
		});
	}

	// For unlocking Next btn
	function unlockNextBtn() {
		// For investment-goal-1
		$('.choose').change(function() {

			if($('.choose').not('.own-goal').is(':checked')) {
				enableBtn();
			} 
			else if($('.choose.own-goal').is(':checked')){
				disableBtn();
				checkInput('.box__box-input');
			} 
			else {
				disableBtn();
			}
		});

		// For investment-goal-2
		checkInput('.input-earn__input');

		// Helper functions
		function enableBtn() {
			$('.box__next-btn').removeAttr('disabled').addClass('btn__success');
		}

		function disableBtn() {
			$('.box__next-btn').removeClass('btn__success').attr('disabled');
		}

		function checkInput(classname) {
			$(classname).keyup(function (e) { 
				if($(this).val().length) {
					enableBtn();
				} else {
					disableBtn();
				}
			});
		}
	}

	// Show info message
	function toggleInfo() {
		$('.info-block').hover(function () {
				showInfo();
			}, function () {
				hideInfo();
			}
		);
		function showInfo() {
			$('.info-block__inner').fadeIn();
		}
		function hideInfo() {
			$('.info-block__inner').fadeOut();
		}
	}

	// Range slider init
	function rangeSliderInit(){
		$(document).on('input', 'input[type="range"]', function(e) {
			$(this).next('.rangeslider').find('.range-block__value').text($(this).val())
		});
		$('input[type="range"]').rangeslider({
			polyfill: false,

			onInit: function() {
				$('.rangeslider__handle').append(`<div class='range-block'><span class="range-block__value">0</span> ${$('.input-range').data('type')}</div>`);
			},
			onSlide: function(position, value) {
				$(this).find('range-block').css("left", position)
			},
		});
	}

	function getValues() {
		$('.goal-name').change(function() {
			goal_name = $(this).val();
		});
		$('.goal-own').keyup(function(e) {
			goal_own = $(this).val();
		});
		$('.goal-amount').keyup(function(e) {
			goal_amount = $(this).val();
		});
		$('.goal-time').change(function() {
			goal_time = $(this).val();
		});
		$('.goal-q1').change(function() {
			goal_q1 = $(this).val();
		});
		$('.goal-q2').change(function() {
			goal_q2 = $(this).val();
		});
		$('.goal-q3').change(function() {
			goal_q3 = $(this).val();
		});
		$('.asset-earn-year').keyup(function(e) {
			asset_earn_year = $(this).val();
		});
		$('.asset-earn-month').keyup(function(e) {
			asset_earn_month = $(this).val();
		});
		assetEarn.result.subscribe( (newVal) => {
			asset_earn_annual = newVal;
		});
		$('.asset-expends-year').keyup(function(e) {
			asset_earn_year = $(this).val();
		});
		$('.asset-expends-month').keyup(function(e) {
			asset_earn_month = $(this).val();
		});
		$('.asset-user-invest-month').change(function() {
			asset_user_invest_month = $(this).val();
		});
		$('.asset-user-invest-year').change(function() {
			asset_user_invest_year = $(this).val();
		});
		$('.asset-user-initial').keyup(function(e) {
			asset_user_initial = $(this).val();
		});
		$('.philo-skill').change(function() {
			philo_skill = $(this).val();
		});
		$('.philo-skill').change(function() {
			philo_skill = $(this).val();
		});
		$('.philo-time').change(function() {
			philo_time = $(this).val();
		});
		$('.pref-a1').change(function() {
			pref_a1 = $(this).val();
		});
		$('.pref-a2').change(function() {
			pref_a2 = $(this).val();
		});
		$('.pref-a3').change(function() {
			pref_a3 = $(this).val();
		});
		$('.pref-com').change(function() {
			pref_com = true;
		});
		$('.pref-modern').change(function() {
			pref_modern = true;
		});
		$('.pref-passion').change(function() {
			pref_passion = true;
		});
	}

	function slideToggleBlock(){
		$('.slide-trigger').click(function (e) { 
			var target =  $(this).data('target');
			$(`.${target}`).slideToggle().toggleClass('no-visible');
			if($(`.${target}`).hasClass('no-visible')){
				$(this).find('.slide-trigger__text').text('more details')
				$(this).find('.toggle-icon').removeClass('icon-arrow-top').addClass('icon-arrow-down')
			} else{
				$(this).find('.slide-trigger__text').text('less')
				$(this).find('.toggle-icon').removeClass('icon-arrow-down').addClass('icon-arrow-top')
			}
		});
	}
	function showAimBlock(){
		if(aim_reached === 0) {
			$('.aim__not-reached').show();
			$('.investment-portfolio').addClass('investment-portfolio_not-successful');
		} 
		else if(aim_reached === 1) {
			$('.aim__can-reached').show();
			$('.investment-portfolio').addClass('investment-portfolio_not-successful');
		}
		else{
			$('.aim__should-reached').show();
			$('.investment-portfolio').addClass('investment-portfolio_success');
		}
	}

	// Draw percentage on Pie Chart
	function drawPercentage(){
		var self = this,
		chartInstance = this.chart,
		ctx = chartInstance.ctx;
		
		ctx.font = "normal 12px Montserrat,sans-serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "#ffffff";
		
		Chart.helpers.each(self.data.datasets.forEach(function (dataset, datasetIndex) {
		var meta = self.getDatasetMeta(datasetIndex),
			total = 0, //total values to compute fraction
			labelxy = [],
			offset = Math.PI / 2, //start sector from top
			radius,
			centerx,
			centery, 
			lastend = 0; //prev arc's end line: starting with 0
		
		for (var val of dataset.data) { total += val; } 
		
		Chart.helpers.each(meta.data.forEach( function (element, index) {
			radius = 0.9 * element._model.outerRadius - element._model.innerRadius;
			centerx = element._model.x;
			centery = element._model.y;
			var thispart = dataset.data[index],
				arcsector = Math.PI * (2 * thispart / total);
			if (element.hasValue() && dataset.data[index] > 0) {
			labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
			}
			else {
			labelxy.push(-1);
			}
			lastend += arcsector;
		}), self)
		
		var lradius = radius * 3 / 4.5;
		for (var idx in labelxy) {
		if (labelxy[idx] === -1) continue;
		var langle = labelxy[idx],
			dx = centerx + lradius * Math.cos(langle),
			dy = centery + lradius * Math.sin(langle),
			val = Math.round(dataset.data[idx] / total * 100);
		ctx.fillText(val + '%', dx, dy);
		}
		
		}), self);
	}
	// Redraw Pie if one of pref is checked
	function prefCheck() {
		$('.pref-check').change(function(){
			redrawPie(riskChart, [10,20,30])
		})
	}
	// Function of redrawing a Pie. 
	function redrawPie(chart, newData){
		chart.data.datasets[0].data = newData;
		chart.update();
	}



