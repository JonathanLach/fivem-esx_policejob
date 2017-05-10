(function(){

	let DefaultTpl = 
		'<div class="head">{{title}}</div>' +
			'<div class="menu-items">' + 
				'{{#items}}<div class="menu-item" data-value="{{value}}">{{label}}</div>{{/items}}' +
			'</div>'+
		'</div>'
	;

	let DefaultWithTypeAndCountTpl = 
		'<div class="head">{{title}}</div>' +
			'<div class="menu-items">' + 
				'{{#items}}<div class="menu-item" data-value="{{value}}" data-remove-on-select="{{removeOnSelect}}" data-type="{{type}}" data-count="{{count}}">{{label}}</div>{{/items}}' +
			'</div>'+
		'</div>'
	;

	let menus = {

		cloakroom : {
		  title     : 'Vestiaire',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: true,
		 	template  : DefaultTpl,

		  items: [
		  	{label: 'Tenue civil',    value: 'civilian_wear'},
		  	{label: 'Tenue policier', value: 'policeman_wear'}
		  ]
		},

		armory : {
		  title     : 'Armurerie',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: true,
		 	template  : DefaultTpl,
		 	
		  items : [
					{label: 'Matraque',             value: 'weapon_nightstick'},
					{label: 'Pistolet de combat',   value: 'weapon_combatpistol'},
					{label: 'Fusil d\'assaut',      value: 'weapon_assaultrifle'},
					{label: 'Fusil à pompe',        value: 'weapon_pumpshotgun'},
					{label: 'Taser',                value: 'weapon_stungun'},
					{label: 'Lampe de poche',       value: 'weapon_flashlight'},
					{label: 'Extincteur',           value: 'weapon_fireextinguisher'},
					{label: 'Pistolet de détresse', value: 'weapon_flaregun'},
					{label: 'Bombe collante',       value: 'weapon_stickybomb'},
					{label: 'Parachute',            value: 'gadget_parachute'}
		  ]
		},

		vehiclespawner : {
		  title     : 'Véhicule de fonction',
		  visible   : false,
		 	current   : 0,
		 	template  : DefaultTpl,

		  items : [
				{label: 'Véhicule de patrouille 1', value: 'police'},
				{label: 'Véhicule de patrouille 2', value: 'police2'},
				{label: 'Véhicule de patrouille 3', value: 'police3'},
				{label: 'Véhicule civil',           value: 'police4'},
				{label: 'Moto',                     value: 'policeb'},
				{label: 'Van de transport',         value: 'policet'}
		  ]
		},

		police_actions : {
		  title     : 'Police',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultTpl,
		 	
		  items : [
		  	{label: 'Interaction citoyen',  value: 'citizen_interaction'},
		  	{label: 'Interaction véhicule', value: 'vehicle_interaction'}
		  ]
		},

		citizen_interaction : {
		  title     : 'Interaction citoyen',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultTpl,
		 	
		  items : [
				{label: 'Carte d\'identité',     value: 'identity_card'},
				{label: 'Fouiller',              value: 'body_search'},
				{label: 'Menotter / Démenotter', value: 'handcuff'},
				{label: 'Mettre dans véhicule',  value: 'put_in_vehicle'},
				{label: 'Amende',                value: 'fine'}
		  ]
		},

		identity_card : {
		  title     : 'Carte d\'identité',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultTpl,
		 	
		  items : [
		  	{label: 'name',  value: null},
		  	{label: 'job',   value: null}
		  ]
		},

		body_search : {
		  title     : 'Fouille',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultWithTypeAndCountTpl,
		 	
		  items : []
		},

		vehicle_interaction : {
		  title     : 'Interaction véhicule',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultTpl,
		 	
		  items : [
		  	{label: 'Infos véhicule',      value: 'vehicle_infos'},
		  	{label: 'Crocheter véhicule',  value: 'hijack_vehicle'},
		  ]
		},

		vehicle_infos : {
		  title     : 'Infos véhicule',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultTpl,
		 	
		  items : []
		},

		fine : {
		  title     : 'Amende',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultTpl,
		 	
		  items : [
		  	{label: 'Code de la route', value: 0},
		  	{label: 'Délit mineur',     value: 1},
		  	{label: 'Délit moyen',      value: 2},
		  	{label: 'Délit grave',      value: 3}
		  ]
		},

		fine_data : {
		  title     : 'Amende',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultTpl,
		 	
		  items : []
		},

		fine_list : {
		  title     : 'Amendes reçues',
		 	visible   : false,
		 	current   : 0,
		 	hasControl: false,
		 	template  : DefaultWithTypeAndCountTpl,
		 	
		  items : []
		}
	}

	let renderMenus = function(){
		for(let k in menus){

			let elem = $('#menu_' + k);

			elem.html(Mustache.render(menus[k].template, menus[k]));

			if(menus[k].visible)
				elem.show();
			else
				elem.hide();

		}
	}

	let showMenu = function(menu){

		currentMenu = menu;

		for(let k in menus)
			menus[k].visible = false;

		menus[menu].visible = true;

		renderMenus();

		if(menus[currentMenu].items.length > 0){

			$('#menu_' + currentMenu + ' .menu-item').removeClass('selected');
			$('#menu_' + currentMenu + ' .menu-item:eq(0)').addClass('selected');

			menus[currentMenu].current = 0;
			currentVal                 = menus[currentMenu].items[menus[currentMenu].current].value;
			currentType                = $('#menu_' + currentMenu + ' .menu-item:eq(0)').data('type');
			currentCount               = $('#menu_' + currentMenu + ' .menu-item:eq(0)').data('count');
		}

		$('#ctl_return').show();

		isMenuOpen        = true
		isShowingControls = false
	}

	let hideMenus = function(){
		
		for(let k in menus)
			menus[k].visible = false;

		renderMenus();
		isMenuOpen = false;
	}

	let showControl = function(control){

		hideControls();
		$('#ctl_' + control).show();
		isShowingControls = true;
	}

	let hideControls = function(){

		for(let k in menus)
			$('#ctl_' + k).hide();

		$('#ctl_return').hide();

		isShowingControls = false;
	}

	let isMenuOpen        = false
	let isShowingControls = false;
	let currentMenu       = null;
	let currentVal        = null;
	let currentType       = null;
	let currentCount      = null;

	renderMenus();

	window.onData = function(data){

		if(data.showControls === true){
			currentMenu = data.controls;
			showControl(data.controls);
		}

		if(data.showControls === false){
			hideControls();
		}

		if(data.showMenu === true){
			hideControls();

			if(data.items)
				menus[data.menu].items = data.items

			showMenu(data.menu);
		}

		if(data.showMenu === false){
			hideMenus();
		}

		if(data.move && isMenuOpen){

			if(data.move == 'UP'){
				if(menus[currentMenu].current > 0)
					menus[currentMenu].current--;
			}

			if(data.move == 'DOWN'){
				
				let max = $('#menu_' + currentMenu + ' .menu-item').length;

				if(menus[currentMenu].current < max - 1)
					menus[currentMenu].current++;
			}

			$('#menu_' + currentMenu + ' .menu-item').removeClass('selected');
			$('#menu_' + currentMenu + ' .menu-item:eq(' + menus[currentMenu].current + ')').addClass('selected');

			currentVal   = menus[currentMenu].items[menus[currentMenu].current].value;
			currentType  = $('#menu_' + currentMenu + ' .menu-item:eq(' + menus[currentMenu].current + ')').data('type');
			currentCount = $('#menu_' + currentMenu + ' .menu-item:eq(' + menus[currentMenu].current + ')').data('count');
		}

		if(data.enterPressed){

			if(isShowingControls){

				hideControls();
				showMenu(currentMenu);
			
			} else if(isMenuOpen) {
				
				if(currentMenu == 'police_actions'){
						
					if(currentVal == 'citizen_interaction'){

						showMenu('citizen_interaction')

					}else if(currentVal == 'vehicle_interaction'){

						showMenu('vehicle_interaction')
					}

				} else {

					$.post('http://esx_policejob/select', JSON.stringify({
						menu : currentMenu,
						val  : currentVal,
						type : currentType,
						count: currentCount
					}))

					let elem = $('#menu_' + currentMenu + ' .menu-item.selected')

					if(elem.data('remove-on-select') == true){
						
						elem.remove();

						menus[currentMenu].items.splice(menus[currentMenu].current, 1)
						menus[currentMenu].current = 0;

						$('#menu_' + currentMenu + ' .menu-item').removeClass('selected');
						$('#menu_' + currentMenu + ' .menu-item:eq(0)').addClass('selected');
						
						currentVal   = menus[currentMenu].items[0].value;
						currentType  = $('#menu_' + currentMenu + ' .menu-item:eq(0)').data('type');
						currentCount = $('#menu_' + currentMenu + ' .menu-item:eq(0)').data('count');
					}
				}

			} 

		}

		if(data.backspacePressed){

			if(isMenuOpen && currentMenu == 'cloakroom'){
				hideMenus();
				showControl('cloakroom');
			}

			if(isMenuOpen && currentMenu == 'armory'){
				hideMenus();
				showControl('armory');
			}

			if(isMenuOpen && currentMenu == 'vehiclespawner'){
				hideMenus();
				showControl('vehiclespawner');
			}

			if(isMenuOpen && currentMenu == 'police_actions'){
				hideMenus();
				$('#ctl_return').hide();
			}

			if(isMenuOpen && currentMenu == 'citizen_interaction'){
				showMenu('police_actions')
			}

			if(isMenuOpen && currentMenu == 'vehicle_interaction'){
				showMenu('police_actions')
			}

			if(isMenuOpen && currentMenu == 'identity_card'){
				showMenu('citizen_interaction')
			}

			if(isMenuOpen && currentMenu == 'body_search'){
				showMenu('citizen_interaction')
			}

			if(isMenuOpen && currentMenu == 'fine'){
				showMenu('citizen_interaction')
			}

			if(isMenuOpen && currentMenu == 'fine_data'){
				showMenu('fine')
			}

			if(isMenuOpen && currentMenu == 'fine_list'){
				hideMenus();
				$('#ctl_return').hide();
			}

			if(isMenuOpen && currentMenu == 'vehicle_infos'){
				showMenu('vehicle_interaction')
			}
		}

	}

	window.onload = function(e){ window.addEventListener('message', function(event){ onData(event.data) }); }

})()