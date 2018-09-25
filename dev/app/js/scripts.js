//= inc/jquery-3.3.1.min.js
//= inc/knockout-3.4.2.min.js
//= inc/chart.min.js
//= inc/chartjs-plugin-annotation.min.js
//= inc/chartjs-plugin-labels.min.js
//= inc/bindings.js


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
	pref_data = [15,60,25],
	new_pref_data = [20,40,40]

var aim_reached = 2;

var allo_cash = assetEarn.cash(),
	allo_bonds = assetEarn.bonds(), 
	allo_equities = assetEarn.equities(), 
	allo_real_estates = assetEarn.real_estates(), 
	allo_commodities = assetEarn.commodities(), 
	allo_modern = assetEarn.modern(), 
	allo_passion = assetEarn.passion();

	$(function () {
		mainNavMenu();
		unlockNextBtn();
		toggleInfo();
		getValues();
		slideToggleBlock();
		showRangeVal();
		showAimBlock();
		prefCheck();
		assetInputs();
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
				checkInput('.goal-own');
			} 
			else {
				disableBtn();
			}
		});

		
		// For investment Goal 2
		$('input').change(function() {
			if(parseInt($('.goal-amount').val()) > 0 && parseInt($('.goal-time').val()) > 0 ){
				enableBtn()
			} else{
				disableBtn()
			}
		})
		// For Asset Base 1
		$('input').keyup(function() {
			if(parseInt($('.asset-earn-over').text()) > 0){
				enableBtn()
			} else{
				disableBtn()
			}
		})
		// For asset Base 4
		$('input').change(function() {
			var investMonth = parseInt($('.asset-user-invest-month').val()),
				investYear = parseInt($('.asset-user-invest-year').val()),
				userInitial = parseInt($('.asset-user-initial').val())

			if(investMonth + investYear  + userInitial ){
				enableBtn()
			} else{
				disableBtn()
			}
		})
	}
	// Helper functions
	function enableBtn() {
		$('.box__next-btn').removeAttr('disabled').addClass('btn__success');
	}
	function disableBtn() {
		$('.box__next-btn').removeClass('btn__success').attr('disabled');
	}

	// // Sliders range val
	function showRangeVal(){
		
		$('.input-range').each(function() {
			var control = $(this),
			controlMin = control.attr('min'),
			controlMax = control.attr('max'),
			controlVal = control.val(),
			controlThumbWidth = 20;
			controlType = control.data('type')
		
			var range = controlMax - controlMin;
			
			var position = ((controlVal - controlMin) / range) * 100;
			var positionOffset = Math.round(controlThumbWidth * position / 100) - (controlThumbWidth / 2);
			var output = control.next('.range-val');
			
			output.css('left', 'calc(' + position + '% - ' + positionOffset + 'px)').text(controlVal + ' ' + controlType);				
		})
		$('.input-range').on('input', function() {
			var control = $(this),
			controlMin = control.attr('min'),
			controlMax = control.attr('max'),
			controlVal = control.val(),
			controlThumbWidth = 20;
			controlType = control.data('type')
		
			var range = controlMax - controlMin;
			
			var position = ((controlVal - controlMin) / range) * 100;
			var positionOffset = Math.round(controlThumbWidth * position / 100) - (controlThumbWidth / 2);
			var output = control.next('.range-val');
			
			output.css('left', 'calc(' + position + '% - ' + positionOffset + 'px)').text(controlVal + ' ' + controlType);			
		});
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
				$(this).find('.slide-trigger__text').text('less')
				$(this).find('.toggle-icon').removeClass('icon-arrow-down').addClass('icon-arrow-top')
			} else{
				$(this).find('.slide-trigger__text').text('more details')
				$(this).find('.toggle-icon').removeClass('icon-arrow-top').addClass('icon-arrow-down')
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

	// Redraw Pie if one of pref is checked
	function prefCheck() {
		$('.pref-check').change(function(){
			if($('.pref-check').is(':checked')){
				redrawPie(riskChart, new_pref_data)
			}
			else{
				redrawPie(riskChart, pref_data)
			}
		})
	}
	// Function of redrawing a Pie. 
	function redrawPie(chart, newData){
		chart.data.datasets[0].data = newData;
		chart.update();
	}

	// Asset Inputs 
	function assetInputs(){
		var assetInputs = $('.asset-input');
		var valuesSum = 0;
		calculateValuesSum();

		$('.asset-input').change(function(){
			redrawPie(investPortfolio, [allo_cash, allo_bonds, allo_equities, allo_real_estates, allo_commodities, allo_modern, allo_passion])
		});

		if(valuesSum === 100) {
			enableBtn()
		}

		assetInputs.change(function(){
			calculateValuesSum()
			if(valuesSum === 100) {
				enableBtn()
			}
			else{
				disableBtn()
			}
		});

		function calculateValuesSum(){
			valuesSum = 0;
			assetInputs.each(function(){
				valuesSum += +$(this).val()
			});
		};

	}

	var maxTotal = 100, 
    inputs = [].slice.call(document.getElementsByClassName('asset-input')),
    getTotal = function(){
        var sum = 0;
        inputs.forEach( function(input){
           sum += parseInt(input.value, 10); 
        });
        return sum;
    },
    maxReached = function(e){
        var sum = getTotal(), target;
        if(sum > maxTotal){
            target = e.target;
            target.value = target.value - (sum - maxTotal);

        }

    };

inputs.forEach( function(input){
    input.addEventListener('input', maxReached );
});


