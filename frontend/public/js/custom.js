$('.dropdown-container').on('click', '#filter-button1', function() {
		var rgbcolor = $(this).css('backgroundColor');
		var color = hexc(rgbcolor);
		if(color == "#2c3576"){
			$(this).css("background-color", "#3581df");
			$( '#x1' ).removeClass( "fa-caret-down" ).addClass( "fa-caret-right" );
		}
		if(color == "#3581df"){
			$(this).css("background-color", "#2c3576");
			$( '#x1' ).removeClass( "fa-caret-right" ).addClass( "fa-caret-down" );
		}
		$(this).siblings('#dropdown-list1').toggle();
	})
	.on('change', '[type="radio"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="radio"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});
	
$('.dropdown-container').on('click', '#filter-button2', function() {
		var rgbcolor = $(this).css('backgroundColor');
		var color = hexc(rgbcolor);
		if(color == "#2c3576"){
			$(this).css("background-color", "#3581df");
			$( '#x2' ).removeClass( "fa-caret-down" ).addClass( "fa-caret-right" );
		}
		if(color == "#3581df"){
			$(this).css("background-color", "#2c3576");
			$( '#x2' ).removeClass( "fa-caret-right" ).addClass( "fa-caret-down" );
		}
		$(this).siblings('#dropdown-list2').toggle();
	})
	.on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});
	
$('.dropdown-container').on('click', '#filter-button3', function() {
		var rgbcolor = $(this).css('backgroundColor');
		var color = hexc(rgbcolor);
		if(color == "#2c3576"){
			$(this).css("background-color", "#3581df");
			$( '#x3' ).removeClass( "fa-caret-down" ).addClass( "fa-caret-right" );
		}
		if(color == "#3581df"){
			$(this).css("background-color", "#2c3576");
			$( '#x3' ).removeClass( "fa-caret-right" ).addClass( "fa-caret-down" );
		}
		$(this).siblings('#dropdown-list3').toggle();
	})
	.on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});
	
$('.dropdown-container').on('click', '#filter-button4', function() {
		var rgbcolor = $(this).css('backgroundColor');
		var color = hexc(rgbcolor);
		if(color == "#2c3576"){
			$(this).css("background-color", "#3581df");
			$( '#x4' ).removeClass( "fa-caret-down" ).addClass( "fa-caret-right" );
		}
		if(color == "#3581df"){
			$(this).css("background-color", "#2c3576");
			$( '#x4' ).removeClass( "fa-caret-right" ).addClass( "fa-caret-down" );
		}
		$(this).siblings('#dropdown-list4').toggle();
	})
	.on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});

$('.dropdown-container').on('click', '#filter-button5', function() {
		var rgbcolor = $(this).css('backgroundColor');
		var color = hexc(rgbcolor);
		if(color == "#2c3576"){
			$(this).css("background-color", "#3581df");
			$( '#x5' ).removeClass( "fa-caret-down" ).addClass( "fa-caret-right" );
		}
		if(color == "#3581df"){
			$(this).css("background-color", "#2c3576");
			$( '#x5' ).removeClass( "fa-caret-right" ).addClass( "fa-caret-down" );
		}
		$(this).siblings('#dropdown-list5').toggle();
	})
	.on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});
	
$('.dropdown-container').on('click', '#filter-button6', function() {
		var rgbcolor = $(this).css('backgroundColor');
		var color = hexc(rgbcolor);
		if(color == "#2c3576"){
			$(this).css("background-color", "#3581df");
			$( '#x6' ).removeClass( "fa-caret-down" ).addClass( "fa-caret-right" );
		}
		if(color == "#3581df"){
			$(this).css("background-color", "#2c3576");
			$( '#x6' ).removeClass( "fa-caret-right" ).addClass( "fa-caret-down" );
		}
		$(this).siblings('#dropdown-list6').toggle();
	})
	.on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});
	
	var internalfilter1 = [
		{ name: 'Voyage', abbreviation: 'VP'},
		{ name: 'Port', abbreviation: 'VP'}
	];
	
	var internalfilter2 = [
		{ name: '30 Days', abbreviation: 'DC'},
		{ name: '90 Days', abbreviation: 'DC'},
		{ name: 'Since Dry Dock', abbreviation: 'DC'},
		{ name: 'Prediction', abbreviation: 'DC'}
	];
	
	var internalfilter3 = [
		{ name: 'Solo', abbreviation: 'SS'},
		{ name: 'With Sisters', abbreviation: 'SS'}
	];
	
	var internalfilter4 = [
		{ name: 'HFO', abbreviation: 'HFO'},
		{ name: 'LHFO', abbreviation: 'LHFO'},
		{ name: 'DO', abbreviation: 'DO'}
	];
	
	var internalfilter5 = [
		{ name: 'Voyage', abbreviation: 'VG'},
		{ name: 'Port', abbreviation: 'PT'}
	];
	
	var internalfilter6 = [
		{ name: 'Voyage', abbreviation: 'VG'},
		{ name: 'Port', abbreviation: 'PT'}
	];

	var stateTemplate = _.template(
		'<li>' +
			'<input name="<%= abbreviation %>" type="radio">' +
			'<label for="<%= abbreviation %>"><%= capName %></label>' +
		'</li>'
	);
	
	var stateTemplate1 = _.template(
		'<li>' +
			'<input name="<%= abbreviation %>" type="checkbox">' +
			'<label for="<%= abbreviation %>" value="<%= capName %>"><%= capName %></label>' +
		'</li>'
	);

	_.each(internalfilter1, function(s) {
		s.capName = s.name;
		$('#filter-ul1').append(stateTemplate(s));
	});
	
	_.each(internalfilter2, function(s) {
		s.capName = s.name;
		$('#filter-ul2').append(stateTemplate(s));
	});
	
	_.each(internalfilter3, function(s) {
		s.capName = s.name;
		$('#filter-ul3').append(stateTemplate(s));
	});
	
	_.each(internalfilter4, function(s) {
		s.capName = s.name;
		$('#filter-ul4').append(stateTemplate1(s));
	});
	
	_.each(internalfilter5, function(s) {
		s.capName = s.name;
		$('#filter-ul5').append(stateTemplate(s));
	});
	
	_.each(internalfilter6, function(s) {
		s.capName = s.name;
		$('#filter-ul6').append(stateTemplate(s));
	});
	
	function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    var color = '#' + parts.join('');
	return color;
	}

