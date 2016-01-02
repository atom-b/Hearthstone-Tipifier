var postDivClass = "md";
var cardRegex = /\[\[(.+?)\]\]/ig;
var baseURL = 'http://www.hearthhead.com/card=';
var HS_CardObj = loadCardData();

(function()
{
	var postDivs = document.getElementsByClassName(postDivClass);
	var paragraphs = [];
	for (var i = postDivs.length - 1; i >= 0; i--) {
		Array.prototype.push.apply(paragraphs, postDivs[i].getElementsByTagName("p"));
	};

	for (var i = paragraphs.length - 1; i >= 0; i--) {
		var paragraph = paragraphs[i];
		var textNodes = findTextNodes(paragraph);
        textNodes.forEach(function(element, index, array) {
        		processTextNode(element, cardRegex, createCardLink);
        	});
	};

	// add HearthHead tooltips after we've linkified all the card names
	addTooltips();
}());

function findTextNodes(element)
{
	var child, tag;
	var nodes = [];

	for (var i = element.childNodes.length - 1; i >= 0; i--) {
		child = element.childNodes[i];
		if (child.nodeType === 3) // text node
		{
			nodes.push(child);
		}
	}

	return nodes;
}

function processTextNode(node, regex, replaceFn)
{
	var match, 
		matches = [];
	
	while (match = regex.exec(node.data)) {
		matches.push(match);
	}

	// process matches in reverse to avoid invalidating match indexes when splitting nodes
	for (var i = matches.length - 1; i >= 0; i--) {
		var match = matches[i];
		var newNode = replaceFn(match[1]);
		
		if (newNode == null) continue;

		// isolate matched text in its own node, replace that node with newNode
		node.splitText(match.index);
        node.nextSibling.splitText(match[0].length);
        node.parentNode.replaceChild(newNode, node.nextSibling);
	};
}

function createCardLink(cardName)
{
	// find card object with name of card text
	var card = HS_CardObj[cardName.toLowerCase()];
	if (card == null) return;

	// construct HearthHead link
	var link = document.createElement('a');
	link.href = baseURL + card.whid;
	link.target = '_blank';
	link.innerHTML = cardName;

	return link;	
}

function addTooltips()
{
	var whScriptElement = document.createElement('script');
	whScriptElement.type = 'text/javascript';
	whScriptElement.src = 'https://static.wowhead.com/widgets/power.js';
	document.getElementsByTagName('head')[0].appendChild(whScriptElement);

	var whVarsElement = document.createElement('script');
	var whVarsText = document.createTextNode('var wowhead_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": false }');
	whVarsElement.appendChild(whVarsText);
	document.getElementsByTagName('head')[0].appendChild(whVarsElement);
}

function loadCardData()
{
	return {
		"abomination": {
			"name": "abomination",
			"whid": 440
		},
		"abusive sergeant": {
			"name": "abusive sergeant",
			"whid": 242
		},
		"acidic swamp ooze": {
			"name": "acidic swamp ooze",
			"whid": 906
		},
		"acidmaw": {
			"name": "acidmaw",
			"whid": 2633
		},
		"acolyte of pain": {
			"name": "acolyte of pain",
			"whid": 1659
		},
		"al'akir the windlord": {
			"name": "al'akir the windlord",
			"whid": 32
		},
		"alarm-o-bot": {
			"name": "alarm-o-bot",
			"whid": 1658
		},
		"aldor peacekeeper": {
			"name": "aldor peacekeeper",
			"whid": 1167
		},
		"alexstrasza": {
			"name": "alexstrasza",
			"whid": 581
		},
		"alexstrasza's champion": {
			"name": "alexstrasza's champion",
			"whid": 2758
		},
		"amani berserker": {
			"name": "amani berserker",
			"whid": 790
		},
		"ancestor's call": {
			"name": "ancestor's call",
			"whid": 1998
		},
		"ancestral healing": {
			"name": "ancestral healing",
			"whid": 149
		},
		"ancestral knowledge": {
			"name": "ancestral knowledge",
			"whid": 2514
		},
		"ancestral spirit": {
			"name": "ancestral spirit",
			"whid": 404
		},
		"ancient brewmaster": {
			"name": "ancient brewmaster",
			"whid": 186
		},
		"ancient mage": {
			"name": "ancient mage",
			"whid": 915
		},
		"ancient secrets": {
			"name": "ancient secrets",
			"whid": 209
		},
		"ancient shade": {
			"name": "ancient shade",
			"whid": 9081
		},
		"ancient teachings": {
			"name": "ancient teachings",
			"whid": 313
		},
		"ancient watcher": {
			"name": "ancient watcher",
			"whid": 605
		},
		"ancient of lore": {
			"name": "ancient of lore",
			"whid": 920
		},
		"ancient of war": {
			"name": "ancient of war",
			"whid": 1035
		},
		"angry chicken": {
			"name": "angry chicken",
			"whid": 1688
		},
		"anima golem": {
			"name": "anima golem",
			"whid": 2045
		},
		"animal companion": {
			"name": "animal companion",
			"whid": 437
		},
		"animated armor": {
			"name": "animated armor",
			"whid": 36111
		},
		"annoy-o-tron": {
			"name": "annoy-o-tron",
			"whid": 2053
		},
		"anodized robo cub": {
			"name": "anodized robo cub",
			"whid": 2096
		},
		"antique healbot": {
			"name": "antique healbot",
			"whid": 2037
		},
		"anub'ar ambusher": {
			"name": "anub'ar ambusher",
			"whid": 1810
		},
		"anub'arak": {
			"name": "anub'arak",
			"whid": 2586
		},
		"anubisath sentinel": {
			"name": "anubisath sentinel",
			"whid": 2933
		},
		"anyfin can happen": {
			"name": "anyfin can happen",
			"whid": 2898
		},
		"arathi weaponsmith": {
			"name": "arathi weaponsmith",
			"whid": 538
		},
		"arcane blast": {
			"name": "arcane blast",
			"whid": 2572
		},
		"arcane explosion": {
			"name": "arcane explosion",
			"whid": 447
		},
		"arcane golem": {
			"name": "arcane golem",
			"whid": 466
		},
		"arcane intellect": {
			"name": "arcane intellect",
			"whid": 555
		},
		"arcane missiles": {
			"name": "arcane missiles",
			"whid": 564
		},
		"arcane nullifier x-21": {
			"name": "arcane nullifier x-21",
			"whid": 2059
		},
		"arcane shot": {
			"name": "arcane shot",
			"whid": 877
		},
		"arcanite reaper": {
			"name": "arcanite reaper",
			"whid": 304
		},
		"arch-thief rafaam": {
			"name": "arch-thief rafaam",
			"whid": 2964
		},
		"archmage": {
			"name": "archmage",
			"whid": 525
		},
		"archmage antonidas": {
			"name": "archmage antonidas",
			"whid": 1080
		},
		"argent commander": {
			"name": "argent commander",
			"whid": 281
		},
		"argent horserider": {
			"name": "argent horserider",
			"whid": 2490
		},
		"argent lance": {
			"name": "argent lance",
			"whid": 2720
		},
		"argent protector": {
			"name": "argent protector",
			"whid": 1022
		},
		"argent squire": {
			"name": "argent squire",
			"whid": 757
		},
		"argent watchman": {
			"name": "argent watchman",
			"whid": 2505
		},
		"armor plating": {
			"name": "armor plating",
			"whid": 2151
		},
		"armor up": {
			"name": "armor up",
			"whid": 725
		},
		"armored warhorse": {
			"name": "armored warhorse",
			"whid": 2627
		},
		"armorsmith": {
			"name": "armorsmith",
			"whid": 596
		},
		"ashbringer": {
			"name": "ashbringer",
			"whid": 1730
		},
		"assassin's blade": {
			"name": "assassin's blade",
			"whid": 421
		},
		"assassinate": {
			"name": "assassinate",
			"whid": 345
		},
		"astral communion": {
			"name": "astral communion",
			"whid": 2785
		},
		"auchenai soulpriest": {
			"name": "auchenai soulpriest",
			"whid": 237
		},
		"avenge": {
			"name": "avenge",
			"whid": 1804
		},
		"avenging wrath": {
			"name": "avenging wrath",
			"whid": 1174
		},
		"aviana": {
			"name": "aviana",
			"whid": 2796
		},
		"axe flinger": {
			"name": "axe flinger",
			"whid": 2297
		},
		"azure drake": {
			"name": "azure drake",
			"whid": 825
		},
		"backstab": {
			"name": "backstab",
			"whid": 180
		},
		"baine bloodhoof": {
			"name": "baine bloodhoof",
			"whid": 318
		},
		"ball of spiders": {
			"name": "ball of spiders",
			"whid": 2483
		},
		"banana": {
			"name": "banana",
			"whid": 1694
		},
		"bane of doom": {
			"name": "bane of doom",
			"whid": 23
		},
		"baron geddon": {
			"name": "baron geddon",
			"whid": 336
		},
		"baron rivendare": {
			"name": "baron rivendare",
			"whid": 1915
		},
		"bash": {
			"name": "bash",
			"whid": 2729
		},
		"battle axe": {
			"name": "battle axe",
			"whid": 1707
		},
		"battle rage": {
			"name": "battle rage",
			"whid": 400
		},
		"bear form": {
			"name": "bear form",
			"whid": 99
		},
		"bear trap": {
			"name": "bear trap",
			"whid": 2641
		},
		"beneath the grounds": {
			"name": "beneath the grounds",
			"whid": 2587
		},
		"bestial wrath": {
			"name": "bestial wrath",
			"whid": 903
		},
		"betrayal": {
			"name": "betrayal",
			"whid": 282
		},
		"big game hunter": {
			"name": "big game hunter",
			"whid": 1657
		},
		"bite": {
			"name": "bite",
			"whid": 577
		},
		"black knight": {
			"name": "black knight",
			"whid": 1656
		},
		"blackwing corruptor": {
			"name": "blackwing corruptor",
			"whid": 2409
		},
		"blackwing technician": {
			"name": "blackwing technician",
			"whid": 2408
		},
		"blade flurry": {
			"name": "blade flurry",
			"whid": 1064
		},
		"blessed champion": {
			"name": "blessed champion",
			"whid": 1522
		},
		"blessing of kings": {
			"name": "blessing of kings",
			"whid": 943
		},
		"blessing of might": {
			"name": "blessing of might",
			"whid": 70
		},
		"blessing of wisdom": {
			"name": "blessing of wisdom",
			"whid": 1373
		},
		"blingtron 3000": {
			"name": "blingtron 3000",
			"whid": 2087
		},
		"blizzard": {
			"name": "blizzard",
			"whid": 457
		},
		"blood fury": {
			"name": "blood fury",
			"whid": 1660
		},
		"blood imp": {
			"name": "blood imp",
			"whid": 469
		},
		"blood knight": {
			"name": "blood knight",
			"whid": 755
		},
		"bloodfen raptor": {
			"name": "bloodfen raptor",
			"whid": 216
		},
		"bloodlust": {
			"name": "bloodlust",
			"whid": 1171
		},
		"bloodmage thalnos": {
			"name": "bloodmage thalnos",
			"whid": 749
		},
		"bloodsail corsair": {
			"name": "bloodsail corsair",
			"whid": 997
		},
		"bloodsail raider": {
			"name": "bloodsail raider",
			"whid": 999
		},
		"bluegill warrior": {
			"name": "bluegill warrior",
			"whid": 739
		},
		"boar": {
			"name": "boar",
			"whid": 298
		},
		"bolf ramshield": {
			"name": "bolf ramshield",
			"whid": 2595
		},
		"bolster": {
			"name": "bolster",
			"whid": 2754
		},
		"bolvar fordragon": {
			"name": "bolvar fordragon",
			"whid": 2031
		},
		"bomb lobber": {
			"name": "bomb lobber",
			"whid": 2067
		},
		"boneguard lieutenant": {
			"name": "boneguard lieutenant",
			"whid": 2495
		},
		"boom bot": {
			"name": "boom bot",
			"whid": 2235
		},
		"booty bay bodyguard": {
			"name": "booty bay bodyguard",
			"whid": 1140
		},
		"boulderfist ogre": {
			"name": "boulderfist ogre",
			"whid": 1686
		},
		"bouncing blade": {
			"name": "bouncing blade",
			"whid": 2018
		},
		"brann bronzebeard": {
			"name": "brann bronzebeard",
			"whid": 2949
		},
		"brave archer": {
			"name": "brave archer",
			"whid": 2642
		},
		"brawl": {
			"name": "brawl",
			"whid": 75
		},
		"buccaneer": {
			"name": "buccaneer",
			"whid": 2715
		},
		"burgle": {
			"name": "burgle",
			"whid": 2770
		},
		"burly rockjaw trogg": {
			"name": "burly rockjaw trogg",
			"whid": 2036
		},
		"burrowing mine": {
			"name": "burrowing mine",
			"whid": 2221
		},
		"cabal shadow priest": {
			"name": "cabal shadow priest",
			"whid": 272
		},
		"cairne bloodhoof": {
			"name": "cairne bloodhoof",
			"whid": 420
		},
		"call pet": {
			"name": "call pet",
			"whid": 2094
		},
		"captain greenskin": {
			"name": "captain greenskin",
			"whid": 456
		},
		"captain's parrot": {
			"name": "captain's parrot",
			"whid": 530
		},
		"captured jormungar": {
			"name": "captured jormungar",
			"whid": 2522
		},
		"cat form": {
			"name": "cat form",
			"whid": 63
		},
		"cenarius": {
			"name": "cenarius",
			"whid": 36
		},
		"charge": {
			"name": "charge",
			"whid": 344
		},
		"charged hammer": {
			"name": "charged hammer",
			"whid": 2617
		},
		"chicken": {
			"name": "chicken",
			"whid": 262
		},
		"chillmaw": {
			"name": "chillmaw",
			"whid": 2682
		},
		"chillwind yeti": {
			"name": "chillwind yeti",
			"whid": 90
		},
		"chromaggus": {
			"name": "chromaggus",
			"whid": 2280
		},
		"circle of healing": {
			"name": "circle of healing",
			"whid": 1362
		},
		"claw": {
			"name": "claw",
			"whid": 1050
		},
		"cleave": {
			"name": "cleave",
			"whid": 940
		},
		"clockwork giant": {
			"name": "clockwork giant",
			"whid": 2233
		},
		"clockwork gnome": {
			"name": "clockwork gnome",
			"whid": 2050
		},
		"clockwork knight": {
			"name": "clockwork knight",
			"whid": 2500
		},
		"cobalt guardian": {
			"name": "cobalt guardian",
			"whid": 2030
		},
		"cobra shot": {
			"name": "cobra shot",
			"whid": 2041
		},
		"coghammer": {
			"name": "coghammer",
			"whid": 2027
		},
		"cogmaster": {
			"name": "cogmaster",
			"whid": 1932
		},
		"cogmaster's wrench": {
			"name": "cogmaster's wrench",
			"whid": 1989
		},
		"cold blood": {
			"name": "cold blood",
			"whid": 268
		},
		"coldarra drake": {
			"name": "coldarra drake",
			"whid": 2544
		},
		"coldlight oracle": {
			"name": "coldlight oracle",
			"whid": 1016
		},
		"coldlight seer": {
			"name": "coldlight seer",
			"whid": 453
		},
		"coliseum manager": {
			"name": "coliseum manager",
			"whid": 2585
		},
		"commanding shout": {
			"name": "commanding shout",
			"whid": 1026
		},
		"competitive spirit": {
			"name": "competitive spirit",
			"whid": 2648
		},
		"conceal": {
			"name": "conceal",
			"whid": 990
		},
		"cone of cold": {
			"name": "cone of cold",
			"whid": 430
		},
		"confessor paletress": {
			"name": "confessor paletress",
			"whid": 2556
		},
		"confuse": {
			"name": "confuse",
			"whid": 2564
		},
		"consecration": {
			"name": "consecration",
			"whid": 476
		},
		"convert": {
			"name": "convert",
			"whid": 2563
		},
		"core hound": {
			"name": "core hound",
			"whid": 1687
		},
		"core rager": {
			"name": "core rager",
			"whid": 2263
		},
		"corruption": {
			"name": "corruption",
			"whid": 982
		},
		"counterspell": {
			"name": "counterspell",
			"whid": 113
		},
		"crackle": {
			"name": "crackle",
			"whid": 2006
		},
		"crazed alchemist": {
			"name": "crazed alchemist",
			"whid": 801
		},
		"crowd favorite": {
			"name": "crowd favorite",
			"whid": 2518
		},
		"cruel taskmaster": {
			"name": "cruel taskmaster",
			"whid": 285
		},
		"crush": {
			"name": "crush",
			"whid": 2020
		},
		"cult master": {
			"name": "cult master",
			"whid": 811
		},
		"curse of rafaam": {
			"name": "curse of rafaam",
			"whid": 2879
		},
		"cursed blade": {
			"name": "cursed blade",
			"whid": 35025
		},
		"cutpurse": {
			"name": "cutpurse",
			"whid": 2766
		},
		"dagger mastery": {
			"name": "dagger mastery",
			"whid": 730
		},
		"dalaran aspirant": {
			"name": "dalaran aspirant",
			"whid": 2549
		},
		"dalaran mage": {
			"name": "dalaran mage",
			"whid": 175
		},
		"damaged golem": {
			"name": "damaged golem",
			"whid": 471
		},
		"dancing swords": {
			"name": "dancing swords",
			"whid": 1913
		},
		"dark bargain": {
			"name": "dark bargain",
			"whid": 2632
		},
		"dark cultist": {
			"name": "dark cultist",
			"whid": 1807
		},
		"dark iron dwarf": {
			"name": "dark iron dwarf",
			"whid": 348
		},
		"dark iron skulker": {
			"name": "dark iron skulker",
			"whid": 2291
		},
		"dark peddler": {
			"name": "dark peddler",
			"whid": 2895
		},
		"dark wispers": {
			"name": "dark wispers",
			"whid": 2009
		},
		"darkbomb": {
			"name": "darkbomb",
			"whid": 2093
		},
		"darkscale healer": {
			"name": "darkscale healer",
			"whid": 582
		},
		"darnassus aspirant": {
			"name": "darnassus aspirant",
			"whid": 2782
		},
		"dart trap": {
			"name": "dart trap",
			"whid": 2893
		},
		"deadly poison": {
			"name": "deadly poison",
			"whid": 459
		},
		"deadly shot": {
			"name": "deadly shot",
			"whid": 1093
		},
		"death's bite": {
			"name": "death's bite",
			"whid": 1805
		},
		"deathlord": {
			"name": "deathlord",
			"whid": 1790
		},
		"deathwing": {
			"name": "deathwing",
			"whid": 834
		},
		"defender": {
			"name": "defender",
			"whid": 102
		},
		"defender of argus": {
			"name": "defender of argus",
			"whid": 763
		},
		"defias bandit": {
			"name": "defias bandit",
			"whid": 488
		},
		"defias ringleader": {
			"name": "defias ringleader",
			"whid": 201
		},
		"demigod's favor": {
			"name": "demigod's favor",
			"whid": 1145
		},
		"demolisher": {
			"name": "demolisher",
			"whid": 979
		},
		"demonfire": {
			"name": "demonfire",
			"whid": 1142
		},
		"demonfuse": {
			"name": "demonfuse",
			"whid": 2535
		},
		"demonheart": {
			"name": "demonheart",
			"whid": 1985
		},
		"demonwrath": {
			"name": "demonwrath",
			"whid": 2301
		},
		"desert camel": {
			"name": "desert camel",
			"whid": 2892
		},
		"devilsaur": {
			"name": "devilsaur",
			"whid": 332
		},
		"dire wolf alpha": {
			"name": "dire wolf alpha",
			"whid": 985
		},
		"dispel": {
			"name": "dispel",
			"whid": 321
		},
		"divine favor": {
			"name": "divine favor",
			"whid": 679
		},
		"divine spirit": {
			"name": "divine spirit",
			"whid": 1361
		},
		"djinni of zephyrs": {
			"name": "djinni of zephyrs",
			"whid": 2925
		},
		"doomguard": {
			"name": "doomguard",
			"whid": 631
		},
		"doomhammer": {
			"name": "doomhammer",
			"whid": 352
		},
		"doomsayer": {
			"name": "doomsayer",
			"whid": 138
		},
		"dr. boom": {
			"name": "dr. boom",
			"whid": 2078
		},
		"draenei totemcarver": {
			"name": "draenei totemcarver",
			"whid": 2613
		},
		"dragon consort": {
			"name": "dragon consort",
			"whid": 2299
		},
		"dragon egg": {
			"name": "dragon egg",
			"whid": 2278
		},
		"dragon's breath": {
			"name": "dragon's breath",
			"whid": 2284
		},
		"dragonhawk rider": {
			"name": "dragonhawk rider",
			"whid": 2533
		},
		"dragonkin sorcerer": {
			"name": "dragonkin sorcerer",
			"whid": 2306
		},
		"dragonling mechanic": {
			"name": "dragonling mechanic",
			"whid": 523
		},
		"drain life": {
			"name": "drain life",
			"whid": 919
		},
		"drakonid crusher": {
			"name": "drakonid crusher",
			"whid": 2257
		},
		"dread corsair": {
			"name": "dread corsair",
			"whid": 878
		},
		"dread infernal": {
			"name": "dread infernal",
			"whid": 1019
		},
		"dreadscale": {
			"name": "dreadscale",
			"whid": 2634
		},
		"dreadsteed": {
			"name": "dreadsteed",
			"whid": 2822
		},
		"dream": {
			"name": "dream",
			"whid": 808
		},
		"druid of the claw": {
			"name": "druid of the claw",
			"whid": 692
		},
		"druid of the fang": {
			"name": "druid of the fang",
			"whid": 2048
		},
		"druid of the flame": {
			"name": "druid of the flame",
			"whid": 2292
		},
		"druid of the saber": {
			"name": "druid of the saber",
			"whid": 2783
		},
		"dunemaul shaman": {
			"name": "dunemaul shaman",
			"whid": 2034
		},
		"duplicate": {
			"name": "duplicate",
			"whid": 1801
		},
		"dust devil": {
			"name": "dust devil",
			"whid": 618
		},
		"eadric the pure": {
			"name": "eadric the pure",
			"whid": 2727
		},
		"eaglehorn bow": {
			"name": "eaglehorn bow",
			"whid": 1662
		},
		"earth elemental": {
			"name": "earth elemental",
			"whid": 1141
		},
		"earth shock": {
			"name": "earth shock",
			"whid": 767
		},
		"earthen ring farseer": {
			"name": "earthen ring farseer",
			"whid": 1651
		},
		"echo of medivh": {
			"name": "echo of medivh",
			"whid": 1941
		},
		"echoing ooze": {
			"name": "echoing ooze",
			"whid": 1858
		},
		"edwin vancleef": {
			"name": "edwin vancleef",
			"whid": 306
		},
		"eerie statue": {
			"name": "eerie statue",
			"whid": 9107
		},
		"effigy": {
			"name": "effigy",
			"whid": 2541
		},
		"elemental destruction": {
			"name": "elemental destruction",
			"whid": 2620
		},
		"elise starseeker": {
			"name": "elise starseeker",
			"whid": 2951
		},
		"elite tauren chieftain": {
			"name": "elite tauren chieftain",
			"whid": 1754
		},
		"elven archer": {
			"name": "elven archer",
			"whid": 389
		},
		"emboldener 3000": {
			"name": "emboldener 3000",
			"whid": 52
		},
		"emerald drake": {
			"name": "emerald drake",
			"whid": 489
		},
		"emergency coolant": {
			"name": "emergency coolant",
			"whid": 2155
		},
		"emperor cobra": {
			"name": "emperor cobra",
			"whid": 1098
		},
		"emperor thaurissan": {
			"name": "emperor thaurissan",
			"whid": 2262
		},
		"enhance-o-mechano": {
			"name": "enhance-o-mechano",
			"whid": 2075
		},
		"enter the coliseum": {
			"name": "enter the coliseum",
			"whid": 2654
		},
		"entomb": {
			"name": "entomb",
			"whid": 3015
		},
		"equality": {
			"name": "equality",
			"whid": 756
		},
		"ethereal arcanist": {
			"name": "ethereal arcanist",
			"whid": 1737
		},
		"ethereal conjurer": {
			"name": "ethereal conjurer",
			"whid": 2875
		},
		"everyfin is awesome": {
			"name": "everyfin is awesome",
			"whid": 3007
		},
		"evil heckler": {
			"name": "evil heckler",
			"whid": 2752
		},
		"eviscerate": {
			"name": "eviscerate",
			"whid": 904
		},
		"excavated evil": {
			"name": "excavated evil",
			"whid": 2999
		},
		"excess mana": {
			"name": "excess mana",
			"whid": 1725
		},
		"execute": {
			"name": "execute",
			"whid": 785
		},
		"explorer's hat": {
			"name": "explorer's hat",
			"whid": 3001
		},
		"explosive sheep": {
			"name": "explosive sheep",
			"whid": 2044
		},
		"explosive shot": {
			"name": "explosive shot",
			"whid": 394
		},
		"explosive trap": {
			"name": "explosive trap",
			"whid": 585
		},
		"eydis darkbane": {
			"name": "eydis darkbane",
			"whid": 2519
		},
		"eye for an eye": {
			"name": "eye for an eye",
			"whid": 462
		},
		"faceless manipulator": {
			"name": "faceless manipulator",
			"whid": 531
		},
		"faerie dragon": {
			"name": "faerie dragon",
			"whid": 609
		},
		"fallen hero": {
			"name": "fallen hero",
			"whid": 2545
		},
		"fan of knives": {
			"name": "fan of knives",
			"whid": 667
		},
		"far sight": {
			"name": "far sight",
			"whid": 818
		},
		"fearsome doomguard": {
			"name": "fearsome doomguard",
			"whid": 2624
		},
		"feign death": {
			"name": "feign death",
			"whid": 1991
		},
		"fel cannon": {
			"name": "fel cannon",
			"whid": 1997
		},
		"fel reaver": {
			"name": "fel reaver",
			"whid": 1982
		},
		"felguard": {
			"name": "felguard",
			"whid": 517
		},
		"fen creeper": {
			"name": "fen creeper",
			"whid": 602
		},
		"fencing coach": {
			"name": "fencing coach",
			"whid": 2581
		},
		"feral spirit": {
			"name": "feral spirit",
			"whid": 238
		},
		"feugen": {
			"name": "feugen",
			"whid": 1797
		},
		"fierce monkey": {
			"name": "fierce monkey",
			"whid": 2894
		},
		"fiery war axe": {
			"name": "fiery war axe",
			"whid": 401
		},
		"finicky cloakfield": {
			"name": "finicky cloakfield",
			"whid": 2154
		},
		"finkle einhorn": {
			"name": "finkle einhorn",
			"whid": 1006
		},
		"fire elemental": {
			"name": "fire elemental",
			"whid": 189
		},
		"fireball": {
			"name": "fireball",
			"whid": 315
		},
		"fireblast": {
			"name": "fireblast",
			"whid": 807
		},
		"fireguard destroyer": {
			"name": "fireguard destroyer",
			"whid": 2290
		},
		"fist of jaraxxus": {
			"name": "fist of jaraxxus",
			"whid": 2628
		},
		"fjola lightbane": {
			"name": "fjola lightbane",
			"whid": 2748
		},
		"flame imp": {
			"name": "flame imp",
			"whid": 1090
		},
		"flame juggler": {
			"name": "flame juggler",
			"whid": 2580
		},
		"flame lance": {
			"name": "flame lance",
			"whid": 2539
		},
		"flame leviathan": {
			"name": "flame leviathan",
			"whid": 1939
		},
		"flame of azzinoth": {
			"name": "flame of azzinoth",
			"whid": 1751
		},
		"flamecannon": {
			"name": "flamecannon",
			"whid": 1927
		},
		"flamestrike": {
			"name": "flamestrike",
			"whid": 1004
		},
		"flametongue totem": {
			"name": "flametongue totem",
			"whid": 1008
		},
		"flamewaker": {
			"name": "flamewaker",
			"whid": 2275
		},
		"flare": {
			"name": "flare",
			"whid": 896
		},
		"flash heal": {
			"name": "flash heal",
			"whid": 2582
		},
		"flesheating ghoul": {
			"name": "flesheating ghoul",
			"whid": 397
		},
		"floating watcher": {
			"name": "floating watcher",
			"whid": 2068
		},
		"flying machine": {
			"name": "flying machine",
			"whid": 2052
		},
		"foe reaper 4000": {
			"name": "foe reaper 4000",
			"whid": 2081
		},
		"force of nature": {
			"name": "force of nature",
			"whid": 493
		},
		"force-tank max": {
			"name": "force-tank max",
			"whid": 2047
		},
		"forgotten torch": {
			"name": "forgotten torch",
			"whid": 2874
		},
		"forked lightning": {
			"name": "forked lightning",
			"whid": 299
		},
		"fossilized devilsaur": {
			"name": "fossilized devilsaur",
			"whid": 2945
		},
		"freezing trap": {
			"name": "freezing trap",
			"whid": 519
		},
		"frigid snobold": {
			"name": "frigid snobold",
			"whid": 2532
		},
		"frog": {
			"name": "frog",
			"whid": 548
		},
		"frost elemental": {
			"name": "frost elemental",
			"whid": 512
		},
		"frost giant": {
			"name": "frost giant",
			"whid": 2512
		},
		"frost nova": {
			"name": "frost nova",
			"whid": 587
		},
		"frost shock": {
			"name": "frost shock",
			"whid": 971
		},
		"frostbolt": {
			"name": "frostbolt",
			"whid": 662
		},
		"frostwolf grunt": {
			"name": "frostwolf grunt",
			"whid": 41
		},
		"frostwolf warlord": {
			"name": "frostwolf warlord",
			"whid": 496
		},
		"frothing berserker": {
			"name": "frothing berserker",
			"whid": 654
		},
		"gadgetzan auctioneer": {
			"name": "gadgetzan auctioneer",
			"whid": 932
		},
		"gadgetzan jouster": {
			"name": "gadgetzan jouster",
			"whid": 2818
		},
		"gahz'rilla": {
			"name": "gahz'rilla",
			"whid": 2017
		},
		"gallywix's coin": {
			"name": "gallywix's coin",
			"whid": 2277
		},
		"gang up": {
			"name": "gang up",
			"whid": 2304
		},
		"garrison commander": {
			"name": "garrison commander",
			"whid": 2517
		},
		"gazlowe": {
			"name": "gazlowe",
			"whid": 2085
		},
		"gelbin mekkatorque": {
			"name": "gelbin mekkatorque",
			"whid": 858
		},
		"gilblin stalker": {
			"name": "gilblin stalker",
			"whid": 2049
		},
		"gladiator's longbow": {
			"name": "gladiator's longbow",
			"whid": 311
		},
		"glaivezooka": {
			"name": "glaivezooka",
			"whid": 2011
		},
		"gnoll": {
			"name": "gnoll",
			"whid": 460
		},
		"gnomeregan infantry": {
			"name": "gnomeregan infantry",
			"whid": 2066
		},
		"gnomish experimenter": {
			"name": "gnomish experimenter",
			"whid": 2060
		},
		"gnomish inventor": {
			"name": "gnomish inventor",
			"whid": 308
		},
		"goblin auto-barber": {
			"name": "goblin auto-barber",
			"whid": 1988
		},
		"goblin blastmage": {
			"name": "goblin blastmage",
			"whid": 1934
		},
		"goblin sapper": {
			"name": "goblin sapper",
			"whid": 2063
		},
		"goldshire footman": {
			"name": "goldshire footman",
			"whid": 922
		},
		"gorehowl": {
			"name": "gorehowl",
			"whid": 810
		},
		"gorillabot a-3": {
			"name": "gorillabot a-3",
			"whid": 2911
		},
		"gormok the impaler": {
			"name": "gormok the impaler",
			"whid": 2724
		},
		"grand crusader": {
			"name": "grand crusader",
			"whid": 2510
		},
		"grim patron": {
			"name": "grim patron",
			"whid": 2279
		},
		"grimscale oracle": {
			"name": "grimscale oracle",
			"whid": 510
		},
		"grommash hellscream": {
			"name": "grommash hellscream",
			"whid": 338
		},
		"grove tender": {
			"name": "grove tender",
			"whid": 2225
		},
		"gruul": {
			"name": "gruul",
			"whid": 526
		},
		"guardian of kings": {
			"name": "guardian of kings",
			"whid": 1068
		},
		"gurubashi berserker": {
			"name": "gurubashi berserker",
			"whid": 768
		},
		"hammer of wrath": {
			"name": "hammer of wrath",
			"whid": 250
		},
		"hand of protection": {
			"name": "hand of protection",
			"whid": 727
		},
		"harrison jones": {
			"name": "harrison jones",
			"whid": 912
		},
		"harvest golem": {
			"name": "harvest golem",
			"whid": 778
		},
		"haunted creeper": {
			"name": "haunted creeper",
			"whid": 1781
		},
		"headcrack": {
			"name": "headcrack",
			"whid": 708
		},
		"healing totem": {
			"name": "healing totem",
			"whid": 764
		},
		"healing touch": {
			"name": "healing touch",
			"whid": 773
		},
		"healing wave": {
			"name": "healing wave",
			"whid": 2612
		},
		"heavy axe": {
			"name": "heavy axe",
			"whid": 1661
		},
		"hellfire": {
			"name": "hellfire",
			"whid": 950
		},
		"hemet nesingwary": {
			"name": "hemet nesingwary",
			"whid": 2088
		},
		"heroic strike": {
			"name": "heroic strike",
			"whid": 1007
		},
		"hex": {
			"name": "hex",
			"whid": 766
		},
		"hobgoblin": {
			"name": "hobgoblin",
			"whid": 2072
		},
		"hogger": {
			"name": "hogger",
			"whid": 640
		},
		"holy champion": {
			"name": "holy champion",
			"whid": 2555
		},
		"holy fire": {
			"name": "holy fire",
			"whid": 1365
		},
		"holy light": {
			"name": "holy light",
			"whid": 291
		},
		"holy nova": {
			"name": "holy nova",
			"whid": 841
		},
		"holy smite": {
			"name": "holy smite",
			"whid": 279
		},
		"holy wrath": {
			"name": "holy wrath",
			"whid": 435
		},
		"homing chicken": {
			"name": "homing chicken",
			"whid": 227
		},
		"houndmaster": {
			"name": "houndmaster",
			"whid": 1003
		},
		"huffer": {
			"name": "huffer",
			"whid": 100
		},
		"huge toad": {
			"name": "huge toad",
			"whid": 2918
		},
		"humility": {
			"name": "humility",
			"whid": 854
		},
		"hungry crab": {
			"name": "hungry crab",
			"whid": 443
		},
		"hungry dragon": {
			"name": "hungry dragon",
			"whid": 2283
		},
		"hunter's mark": {
			"name": "hunter's mark",
			"whid": 141
		},
		"i am murloc": {
			"name": "i am murloc",
			"whid": 1843
		},
		"inferno": {
			"name": "inferno",
			"whid": 1178
		},
		"ice barrier": {
			"name": "ice barrier",
			"whid": 621
		},
		"ice block": {
			"name": "ice block",
			"whid": 192
		},
		"ice lance": {
			"name": "ice lance",
			"whid": 172
		},
		"ice rager": {
			"name": "ice rager",
			"whid": 2594
		},
		"icehowl": {
			"name": "icehowl",
			"whid": 2725
		},
		"illidan stormrage": {
			"name": "illidan stormrage",
			"whid": 556
		},
		"illuminator": {
			"name": "illuminator",
			"whid": 2057
		},
		"imp": {
			"name": "imp",
			"whid": 76
		},
		"imp gang boss": {
			"name": "imp gang boss",
			"whid": 2288
		},
		"imp master": {
			"name": "imp master",
			"whid": 926
		},
		"imp-losion": {
			"name": "imp-losion",
			"whid": 2013
		},
		"infernal": {
			"name": "infernal",
			"whid": 1143
		},
		"injured blademaster": {
			"name": "injured blademaster",
			"whid": 1109
		},
		"injured kvaldir": {
			"name": "injured kvaldir",
			"whid": 2502
		},
		"inner fire": {
			"name": "inner fire",
			"whid": 376
		},
		"inner rage": {
			"name": "inner rage",
			"whid": 22
		},
		"innervate": {
			"name": "innervate",
			"whid": 254
		},
		"iron juggernaut": {
			"name": "iron juggernaut",
			"whid": 2024
		},
		"iron sensei": {
			"name": "iron sensei",
			"whid": 1992
		},
		"ironbark protector": {
			"name": "ironbark protector",
			"whid": 205
		},
		"ironbeak owl": {
			"name": "ironbeak owl",
			"whid": 290
		},
		"ironforge rifleman": {
			"name": "ironforge rifleman",
			"whid": 339
		},
		"ironfur grizzly": {
			"name": "ironfur grizzly",
			"whid": 1182
		},
		"jeeves": {
			"name": "jeeves",
			"whid": 2062
		},
		"jeweled scarab": {
			"name": "jeweled scarab",
			"whid": 2901
		},
		"jungle moonkin": {
			"name": "jungle moonkin",
			"whid": 2923
		},
		"jungle panther": {
			"name": "jungle panther",
			"whid": 921
		},
		"junkbot": {
			"name": "junkbot",
			"whid": 2074
		},
		"justicar trueheart": {
			"name": "justicar trueheart",
			"whid": 2736
		},
		"keeper of uldaman": {
			"name": "keeper of uldaman",
			"whid": 2889
		},
		"keeper of the grove": {
			"name": "keeper of the grove",
			"whid": 601
		},
		"kel'thuzad": {
			"name": "kel'thuzad",
			"whid": 1794
		},
		"kezan mystic": {
			"name": "kezan mystic",
			"whid": 2042
		},
		"kidnapper": {
			"name": "kidnapper",
			"whid": 287
		},
		"kill command": {
			"name": "kill command",
			"whid": 296
		},
		"king krush": {
			"name": "king krush",
			"whid": 1144
		},
		"king mukla": {
			"name": "king mukla",
			"whid": 1693
		},
		"king of beasts": {
			"name": "king of beasts",
			"whid": 2014
		},
		"king's defender": {
			"name": "king's defender",
			"whid": 2756
		},
		"king's elekk": {
			"name": "king's elekk",
			"whid": 2635
		},
		"kirin tor mage": {
			"name": "kirin tor mage",
			"whid": 748
		},
		"knife juggler": {
			"name": "knife juggler",
			"whid": 1073
		},
		"knight of the wild": {
			"name": "knight of the wild",
			"whid": 2788
		},
		"kobold geomancer": {
			"name": "kobold geomancer",
			"whid": 672
		},
		"kodorider": {
			"name": "kodorider",
			"whid": 2598
		},
		"kor'kron elite": {
			"name": "kor'kron elite",
			"whid": 28
		},
		"kvaldir raider": {
			"name": "kvaldir raider",
			"whid": 2511
		},
		"lance carrier": {
			"name": "lance carrier",
			"whid": 2577
		},
		"laughing sister": {
			"name": "laughing sister",
			"whid": 340
		},
		"lava burst": {
			"name": "lava burst",
			"whid": 864
		},
		"lava shock": {
			"name": "lava shock",
			"whid": 2289
		},
		"lay on hands": {
			"name": "lay on hands",
			"whid": 594
		},
		"leader of the pack": {
			"name": "leader of the pack",
			"whid": 835
		},
		"leeroy jenkins": {
			"name": "leeroy jenkins",
			"whid": 559
		},
		"leokk": {
			"name": "leokk",
			"whid": 226
		},
		"leper gnome": {
			"name": "leper gnome",
			"whid": 658
		},
		"lesser heal": {
			"name": "lesser heal",
			"whid": 479
		},
		"life tap": {
			"name": "life tap",
			"whid": 300
		},
		"light of the naaru": {
			"name": "light of the naaru",
			"whid": 1933
		},
		"light's champion": {
			"name": "light's champion",
			"whid": 2259
		},
		"light's justice": {
			"name": "light's justice",
			"whid": 383
		},
		"lightbomb": {
			"name": "lightbomb",
			"whid": 1938
		},
		"lightning bolt": {
			"name": "lightning bolt",
			"whid": 505
		},
		"lightning storm": {
			"name": "lightning storm",
			"whid": 629
		},
		"lightspawn": {
			"name": "lightspawn",
			"whid": 886
		},
		"lightwarden": {
			"name": "lightwarden",
			"whid": 1655
		},
		"lightwell": {
			"name": "lightwell",
			"whid": 797
		},
		"lil' exorcist": {
			"name": "lil' exorcist",
			"whid": 2065
		},
		"living roots": {
			"name": "living roots",
			"whid": 2792
		},
		"loatheb": {
			"name": "loatheb",
			"whid": 1914
		},
		"lock and load": {
			"name": "lock and load",
			"whid": 2484
		},
		"loot hoarder": {
			"name": "loot hoarder",
			"whid": 251
		},
		"lord jaraxxus": {
			"name": "lord jaraxxus",
			"whid": 777
		},
		"lord of the arena": {
			"name": "lord of the arena",
			"whid": 157
		},
		"lorewalker cho": {
			"name": "lorewalker cho",
			"whid": 1135
		},
		"lost tallstrider": {
			"name": "lost tallstrider",
			"whid": 2039
		},
		"lowly squire": {
			"name": "lowly squire",
			"whid": 2486
		},
		"mad bomber": {
			"name": "mad bomber",
			"whid": 762
		},
		"mad scientist": {
			"name": "mad scientist",
			"whid": 1783
		},
		"madder bomber": {
			"name": "madder bomber",
			"whid": 2058
		},
		"maexxna": {
			"name": "maexxna",
			"whid": 1791
		},
		"magma rager": {
			"name": "magma rager",
			"whid": 1653
		},
		"magnataur alpha": {
			"name": "magnataur alpha",
			"whid": 2753
		},
		"maiden of the lake": {
			"name": "maiden of the lake",
			"whid": 2488
		},
		"majordomo executus": {
			"name": "majordomo executus",
			"whid": 2281
		},
		"mal'ganis": {
			"name": "mal'ganis",
			"whid": 1986
		},
		"malorne": {
			"name": "malorne",
			"whid": 2003
		},
		"malygos": {
			"name": "malygos",
			"whid": 436
		},
		"mana addict": {
			"name": "mana addict",
			"whid": 12
		},
		"mana tide totem": {
			"name": "mana tide totem",
			"whid": 513
		},
		"mana wraith": {
			"name": "mana wraith",
			"whid": 715
		},
		"mana wyrm": {
			"name": "mana wyrm",
			"whid": 405
		},
		"mark of nature": {
			"name": "mark of nature",
			"whid": 151
		},
		"mark of the wild": {
			"name": "mark of the wild",
			"whid": 213
		},
		"mass dispel": {
			"name": "mass dispel",
			"whid": 1366
		},
		"master jouster": {
			"name": "master jouster",
			"whid": 2507
		},
		"master swordsmith": {
			"name": "master swordsmith",
			"whid": 351
		},
		"master of ceremonies": {
			"name": "master of ceremonies",
			"whid": 2493
		},
		"master of disguise": {
			"name": "master of disguise",
			"whid": 887
		},
		"mech-bear-cat": {
			"name": "mech-bear-cat",
			"whid": 2002
		},
		"mechanical dragonling": {
			"name": "mechanical dragonling",
			"whid": 59
		},
		"mechanical yeti": {
			"name": "mechanical yeti",
			"whid": 2046
		},
		"mechwarper": {
			"name": "mechwarper",
			"whid": 1940
		},
		"mekgineer thermaplugg": {
			"name": "mekgineer thermaplugg",
			"whid": 2084
		},
		"metaltooth leaper": {
			"name": "metaltooth leaper",
			"whid": 2016
		},
		"micro machine": {
			"name": "micro machine",
			"whid": 2071
		},
		"millhouse manastorm": {
			"name": "millhouse manastorm",
			"whid": 855
		},
		"mimiron's head": {
			"name": "mimiron's head",
			"whid": 2079
		},
		"mind blast": {
			"name": "mind blast",
			"whid": 545
		},
		"mind control": {
			"name": "mind control",
			"whid": 8
		},
		"mind control tech": {
			"name": "mind control tech",
			"whid": 734
		},
		"mind shatter": {
			"name": "mind shatter",
			"whid": 1623
		},
		"mind spike": {
			"name": "mind spike",
			"whid": 1622
		},
		"mind vision": {
			"name": "mind vision",
			"whid": 1099
		},
		"mindgames": {
			"name": "mindgames",
			"whid": 145
		},
		"mini-mage": {
			"name": "mini-mage",
			"whid": 2077
		},
		"mirror entity": {
			"name": "mirror entity",
			"whid": 195
		},
		"mirror image": {
			"name": "mirror image",
			"whid": 968
		},
		"misdirection": {
			"name": "misdirection",
			"whid": 1091
		},
		"misha": {
			"name": "misha",
			"whid": 959
		},
		"mistress of pain": {
			"name": "mistress of pain",
			"whid": 2172
		},
		"mogor the ogre": {
			"name": "mogor the ogre",
			"whid": 2080
		},
		"mogor's champion": {
			"name": "mogor's champion",
			"whid": 2491
		},
		"mogu'shan warden": {
			"name": "mogu'shan warden",
			"whid": 700
		},
		"molten giant": {
			"name": "molten giant",
			"whid": 1372
		},
		"moonfire": {
			"name": "moonfire",
			"whid": 467
		},
		"mortal coil": {
			"name": "mortal coil",
			"whid": 1092
		},
		"mortal strike": {
			"name": "mortal strike",
			"whid": 804
		},
		"mountain giant": {
			"name": "mountain giant",
			"whid": 993
		},
		"mounted raptor": {
			"name": "mounted raptor",
			"whid": 2922
		},
		"mukla's champion": {
			"name": "mukla's champion",
			"whid": 2497
		},
		"mulch": {
			"name": "mulch",
			"whid": 2793
		},
		"multi-shot": {
			"name": "multi-shot",
			"whid": 292
		},
		"murloc knight": {
			"name": "murloc knight",
			"whid": 2655
		},
		"murloc raider": {
			"name": "murloc raider",
			"whid": 191
		},
		"murloc scout": {
			"name": "murloc scout",
			"whid": 1078
		},
		"murloc tidecaller": {
			"name": "murloc tidecaller",
			"whid": 475
		},
		"murloc tidehunter": {
			"name": "murloc tidehunter",
			"whid": 976
		},
		"murloc tinyfin": {
			"name": "murloc tinyfin",
			"whid": 13879
		},
		"murloc warleader": {
			"name": "murloc warleader",
			"whid": 1063
		},
		"museum curator": {
			"name": "museum curator",
			"whid": 2878
		},
		"muster for battle": {
			"name": "muster for battle",
			"whid": 2029
		},
		"mysterious challenger": {
			"name": "mysterious challenger",
			"whid": 2726
		},
		"naga sea witch": {
			"name": "naga sea witch",
			"whid": 2910
		},
		"nat pagle": {
			"name": "nat pagle",
			"whid": 1147
		},
		"naturalize": {
			"name": "naturalize",
			"whid": 233
		},
		"nefarian": {
			"name": "nefarian",
			"whid": 2261
		},
		"neptulon": {
			"name": "neptulon",
			"whid": 2010
		},
		"nerub'ar weblord": {
			"name": "nerub'ar weblord",
			"whid": 1800
		},
		"nerubian egg": {
			"name": "nerubian egg",
			"whid": 1786
		},
		"nexus-champion saraad": {
			"name": "nexus-champion saraad",
			"whid": 2683
		},
		"nexus champion saraad": {
			"name": "nexus-champion saraad",
			"whid": 2683
		},
		"nightblade": {
			"name": "nightblade",
			"whid": 670
		},
		"nightmare": {
			"name": "nightmare",
			"whid": 217
		},
		"noble sacrifice": {
			"name": "noble sacrifice",
			"whid": 584
		},
		"north sea kraken": {
			"name": "north sea kraken",
			"whid": 2520
		},
		"northshire cleric": {
			"name": "northshire cleric",
			"whid": 1650
		},
		"nourish": {
			"name": "nourish",
			"whid": 95
		},
		"novice engineer": {
			"name": "novice engineer",
			"whid": 284
		},
		"nozdormu": {
			"name": "nozdormu",
			"whid": 411
		},
		"oasis snapjaw": {
			"name": "oasis snapjaw",
			"whid": 1370
		},
		"obsidian destroyer": {
			"name": "obsidian destroyer",
			"whid": 2881
		},
		"ogre brute": {
			"name": "ogre brute",
			"whid": 2033
		},
		"ogre magi": {
			"name": "ogre magi",
			"whid": 995
		},
		"ogre ninja": {
			"name": "ogre ninja",
			"whid": 2056
		},
		"ogre warmaul": {
			"name": "ogre warmaul",
			"whid": 2022
		},
		"old murk-eye": {
			"name": "old murk-eye",
			"whid": 736
		},
		"one-eyed cheat": {
			"name": "one-eyed cheat",
			"whid": 1990
		},
		"onyxia": {
			"name": "onyxia",
			"whid": 363
		},
		"orgrimmar aspirant": {
			"name": "orgrimmar aspirant",
			"whid": 2711
		},
		"panther": {
			"name": "panther",
			"whid": 812
		},
		"patient assassin": {
			"name": "patient assassin",
			"whid": 1133
		},
		"perdition's blade": {
			"name": "perdition's blade",
			"whid": 391
		},
		"piloted shredder": {
			"name": "piloted shredder",
			"whid": 2064
		},
		"piloted sky golem": {
			"name": "piloted sky golem",
			"whid": 2073
		},
		"pint-sized summoner": {
			"name": "pint-sized summoner",
			"whid": 37
		},
		"pit fighter": {
			"name": "pit fighter",
			"whid": 2521
		},
		"pit lord": {
			"name": "pit lord",
			"whid": 783
		},
		"pit snake": {
			"name": "pit snake",
			"whid": 2882
		},
		"poison seeds": {
			"name": "poison seeds",
			"whid": 1802
		},
		"poisoned blade": {
			"name": "poisoned blade",
			"whid": 2763
		},
		"polymorph": {
			"name": "polymorph",
			"whid": 77
		},
		"polymorph: boar": {
			"name": "polymorph: boar",
			"whid": 2542
		},
		"poultryizer": {
			"name": "poultryizer",
			"whid": 146
		},
		"power overwhelming": {
			"name": "power overwhelming",
			"whid": 846
		},
		"power word: glory": {
			"name": "power word: glory",
			"whid": 2568
		},
		"power word: shield": {
			"name": "power word: shield",
			"whid": 613
		},
		"power of the horde": {
			"name": "power of the horde",
			"whid": 1846
		},
		"power of the wild": {
			"name": "power of the wild",
			"whid": 503
		},
		"powermace": {
			"name": "powermace",
			"whid": 2004
		},
		"powershot": {
			"name": "powershot",
			"whid": 2638
		},
		"preparation": {
			"name": "preparation",
			"whid": 1158
		},
		"priestess of elune": {
			"name": "priestess of elune",
			"whid": 424
		},
		"prophet velen": {
			"name": "prophet velen",
			"whid": 9
		},
		"puddlestomper": {
			"name": "puddlestomper",
			"whid": 2032
		},
		"pyroblast": {
			"name": "pyroblast",
			"whid": 1087
		},
		"quartermaster": {
			"name": "quartermaster",
			"whid": 2028
		},
		"questing adventurer": {
			"name": "questing adventurer",
			"whid": 791
		},
		"quick shot": {
			"name": "quick shot",
			"whid": 2260
		},
		"raging worgen": {
			"name": "raging worgen",
			"whid": 1155
		},
		"ragnaros the firelord": {
			"name": "ragnaros the firelord",
			"whid": 374
		},
		"raid leader": {
			"name": "raid leader",
			"whid": 1401
		},
		"ram wrangler": {
			"name": "ram wrangler",
			"whid": 2552
		},
		"rampage": {
			"name": "rampage",
			"whid": 1108
		},
		"raven idol": {
			"name": "raven idol",
			"whid": 13335
		},
		"ravenholdt assassin": {
			"name": "ravenholdt assassin",
			"whid": 134
		},
		"razorfen hunter": {
			"name": "razorfen hunter",
			"whid": 257
		},
		"reckless rocketeer": {
			"name": "reckless rocketeer",
			"whid": 445
		},
		"recombobulator": {
			"name": "recombobulator",
			"whid": 2076
		},
		"recruiter": {
			"name": "recruiter",
			"whid": 2509
		},
		"recycle": {
			"name": "recycle",
			"whid": 1995
		},
		"redemption": {
			"name": "redemption",
			"whid": 140
		},
		"refreshment vendor": {
			"name": "refreshment vendor",
			"whid": 2704
		},
		"reincarnate": {
			"name": "reincarnate",
			"whid": 1809
		},
		"reinforce": {
			"name": "reinforce",
			"whid": 472
		},
		"reliquary seeker": {
			"name": "reliquary seeker",
			"whid": 13334
		},
		"rend blackhand": {
			"name": "rend blackhand",
			"whid": 2308
		},
		"reno jackson": {
			"name": "reno jackson",
			"whid": 2883
		},
		"repair bot": {
			"name": "repair bot",
			"whid": 329
		},
		"repentance": {
			"name": "repentance",
			"whid": 232
		},
		"resurrect": {
			"name": "resurrect",
			"whid": 2298
		},
		"revenge": {
			"name": "revenge",
			"whid": 2296
		},
		"reversing switch": {
			"name": "reversing switch",
			"whid": 2156
		},
		"rhonin": {
			"name": "rhonin",
			"whid": 2546
		},
		"river crocolisk": {
			"name": "river crocolisk",
			"whid": 1369
		},
		"rockbiter weapon": {
			"name": "rockbiter weapon",
			"whid": 239
		},
		"rogues do it": {
			"name": "rogues do it",
			"whid": 1845
		},
		"rumbling elemental": {
			"name": "rumbling elemental",
			"whid": 2888
		},
		"rusty horn": {
			"name": "rusty horn",
			"whid": 2153
		},
		"si:7 agent": {
			"name": "si:7 agent",
			"whid": 1117
		},
		"sabotage": {
			"name": "sabotage",
			"whid": 2015
		},
		"saboteur": {
			"name": "saboteur",
			"whid": 2576
		},
		"sacred trial": {
			"name": "sacred trial",
			"whid": 2899
		},
		"sacrificial pact": {
			"name": "sacrificial pact",
			"whid": 163
		},
		"salty dog": {
			"name": "salty dog",
			"whid": 2038
		},
		"sap": {
			"name": "sap",
			"whid": 461
		},
		"savage combatant": {
			"name": "savage combatant",
			"whid": 2780
		},
		"savage roar": {
			"name": "savage roar",
			"whid": 742
		},
		"savagery": {
			"name": "savagery",
			"whid": 481
		},
		"savannah highmane": {
			"name": "savannah highmane",
			"whid": 1261
		},
		"scarlet crusader": {
			"name": "scarlet crusader",
			"whid": 642
		},
		"scarlet purifier": {
			"name": "scarlet purifier",
			"whid": 2069
		},
		"scavenging hyena": {
			"name": "scavenging hyena",
			"whid": 1281
		},
		"screwjank clunker": {
			"name": "screwjank clunker",
			"whid": 2023
		},
		"sea giant": {
			"name": "sea giant",
			"whid": 211
		},
		"sea reaver": {
			"name": "sea reaver",
			"whid": 2717
		},
		"seal of champions": {
			"name": "seal of champions",
			"whid": 2723
		},
		"seal of light": {
			"name": "seal of light",
			"whid": 2025
		},
		"searing totem": {
			"name": "searing totem",
			"whid": 537
		},
		"secretkeeper": {
			"name": "secretkeeper",
			"whid": 158
		},
		"sen'jin shieldmasta": {
			"name": "sen'jin shieldmasta",
			"whid": 635
		},
		"sense demons": {
			"name": "sense demons",
			"whid": 860
		},
		"shade of naxxramas": {
			"name": "shade of naxxramas",
			"whid": 1784
		},
		"shado-pan rider": {
			"name": "shado-pan rider",
			"whid": 2765
		},
		"shadow bolt": {
			"name": "shadow bolt",
			"whid": 914
		},
		"shadow madness": {
			"name": "shadow madness",
			"whid": 220
		},
		"shadow word: death": {
			"name": "shadow word: death",
			"whid": 1363
		},
		"shadow word: pain": {
			"name": "shadow word: pain",
			"whid": 1367
		},
		"shadow of nothing": {
			"name": "shadow of nothing",
			"whid": 1720
		},
		"shadowbomber": {
			"name": "shadowbomber",
			"whid": 1937
		},
		"shadowboxer": {
			"name": "shadowboxer",
			"whid": 2040
		},
		"shadowfiend": {
			"name": "shadowfiend",
			"whid": 2566
		},
		"shadowflame": {
			"name": "shadowflame",
			"whid": 147
		},
		"shadowform": {
			"name": "shadowform",
			"whid": 1368
		},
		"shadowstep": {
			"name": "shadowstep",
			"whid": 365
		},
		"shady dealer": {
			"name": "shady dealer",
			"whid": 2768
		},
		"shan'do's lesson": {
			"name": "shan'do's lesson",
			"whid": 364
		},
		"shapeshift": {
			"name": "shapeshift",
			"whid": 1123
		},
		"shattered sun cleric": {
			"name": "shattered sun cleric",
			"whid": 608
		},
		"sheep": {
			"name": "sheep",
			"whid": 796
		},
		"shield block": {
			"name": "shield block",
			"whid": 1023
		},
		"shield slam": {
			"name": "shield slam",
			"whid": 546
		},
		"shieldbearer": {
			"name": "shieldbearer",
			"whid": 866
		},
		"shielded minibot": {
			"name": "shielded minibot",
			"whid": 2026
		},
		"shieldmaiden": {
			"name": "shieldmaiden",
			"whid": 2021
		},
		"ship's cannon": {
			"name": "ship's cannon",
			"whid": 2043
		},
		"shiv": {
			"name": "shiv",
			"whid": 573
		},
		"shrinkmeister": {
			"name": "shrinkmeister",
			"whid": 1936
		},
		"sideshow spelleater": {
			"name": "sideshow spelleater",
			"whid": 2573
		},
		"siege engine": {
			"name": "siege engine",
			"whid": 2054
		},
		"silence": {
			"name": "silence",
			"whid": 1189
		},
		"silent knight": {
			"name": "silent knight",
			"whid": 2579
		},
		"siltfin spiritwalker": {
			"name": "siltfin spiritwalker",
			"whid": 2008
		},
		"silver hand knight": {
			"name": "silver hand knight",
			"whid": 69
		},
		"silver hand recruit": {
			"name": "silver hand recruit",
			"whid": 1652
		},
		"silver hand regent": {
			"name": "silver hand regent",
			"whid": 2503
		},
		"silverback patriarch": {
			"name": "silverback patriarch",
			"whid": 67
		},
		"silvermoon guardian": {
			"name": "silvermoon guardian",
			"whid": 34
		},
		"sinister strike": {
			"name": "sinister strike",
			"whid": 710
		},
		"siphon soul": {
			"name": "siphon soul",
			"whid": 1100
		},
		"sir finley mrrgglton": {
			"name": "sir finley mrrgglton",
			"whid": 2948
		},
		"skycap'n kragg": {
			"name": "skycap'n kragg",
			"whid": 2757
		},
		"slam": {
			"name": "slam",
			"whid": 1074
		},
		"sludge belcher": {
			"name": "sludge belcher",
			"whid": 1793
		},
		"snake": {
			"name": "snake",
			"whid": 204
		},
		"snake trap": {
			"name": "snake trap",
			"whid": 455
		},
		"sneed's old shredder": {
			"name": "sneed's old shredder",
			"whid": 2082
		},
		"snipe": {
			"name": "snipe",
			"whid": 814
		},
		"snowchugger": {
			"name": "snowchugger",
			"whid": 1928
		},
		"solemn vigil": {
			"name": "solemn vigil",
			"whid": 2274
		},
		"soot spewer": {
			"name": "soot spewer",
			"whid": 2249
		},
		"sorcerer's apprentice": {
			"name": "sorcerer's apprentice",
			"whid": 614
		},
		"soul of the forest": {
			"name": "soul of the forest",
			"whid": 381
		},
		"soulfire": {
			"name": "soulfire",
			"whid": 974
		},
		"southsea captain": {
			"name": "southsea captain",
			"whid": 680
		},
		"southsea deckhand": {
			"name": "southsea deckhand",
			"whid": 724
		},
		"sparring partner": {
			"name": "sparring partner",
			"whid": 2733
		},
		"spawn of shadows": {
			"name": "spawn of shadows",
			"whid": 2551
		},
		"spectral knight": {
			"name": "spectral knight",
			"whid": 1789
		},
		"spellbender": {
			"name": "spellbender",
			"whid": 366
		},
		"spellbreaker": {
			"name": "spellbreaker",
			"whid": 754
		},
		"spellslinger": {
			"name": "spellslinger",
			"whid": 2571
		},
		"spider tank": {
			"name": "spider tank",
			"whid": 2012
		},
		"spirit wolf": {
			"name": "spirit wolf",
			"whid": 533
		},
		"spiteful smith": {
			"name": "spiteful smith",
			"whid": 61
		},
		"sprint": {
			"name": "sprint",
			"whid": 630
		},
		"squire": {
			"name": "squire",
			"whid": 482
		},
		"squirrel": {
			"name": "squirrel",
			"whid": 1190
		},
		"stablemaster": {
			"name": "stablemaster",
			"whid": 2639
		},
		"stalagg": {
			"name": "stalagg",
			"whid": 1796
		},
		"stampeding kodo": {
			"name": "stampeding kodo",
			"whid": 1371
		},
		"starfall": {
			"name": "starfall",
			"whid": 86
		},
		"starfire": {
			"name": "starfire",
			"whid": 823
		},
		"starving buzzard": {
			"name": "starving buzzard",
			"whid": 1241
		},
		"steady shot": {
			"name": "steady shot",
			"whid": 229
		},
		"steamwheedle sniper": {
			"name": "steamwheedle sniper",
			"whid": 2055
		},
		"stoneclaw totem": {
			"name": "stoneclaw totem",
			"whid": 850
		},
		"stoneskin gargoyle": {
			"name": "stoneskin gargoyle",
			"whid": 1861
		},
		"stonesplinter trogg": {
			"name": "stonesplinter trogg",
			"whid": 2035
		},
		"stonetusk boar": {
			"name": "stonetusk boar",
			"whid": 648
		},
		"stormforged axe": {
			"name": "stormforged axe",
			"whid": 960
		},
		"stormpike commando": {
			"name": "stormpike commando",
			"whid": 413
		},
		"stormwind champion": {
			"name": "stormwind champion",
			"whid": 753
		},
		"stormwind knight": {
			"name": "stormwind knight",
			"whid": 622
		},
		"stranglethorn tiger": {
			"name": "stranglethorn tiger",
			"whid": 68
		},
		"succubus": {
			"name": "succubus",
			"whid": 592
		},
		"summon a panther": {
			"name": "summon a panther",
			"whid": 60
		},
		"summoning portal": {
			"name": "summoning portal",
			"whid": 969
		},
		"summoning stone": {
			"name": "summoning stone",
			"whid": 2958
		},
		"sunfury protector": {
			"name": "sunfury protector",
			"whid": 891
		},
		"sunwalker": {
			"name": "sunwalker",
			"whid": 759
		},
		"swipe": {
			"name": "swipe",
			"whid": 64
		},
		"sword of justice": {
			"name": "sword of justice",
			"whid": 643
		},
		"sylvanas windrunner": {
			"name": "sylvanas windrunner",
			"whid": 1721
		},
		"target dummy": {
			"name": "target dummy",
			"whid": 2061
		},
		"tauren warrior": {
			"name": "tauren warrior",
			"whid": 45
		},
		"temple enforcer": {
			"name": "temple enforcer",
			"whid": 1364
		},
		"thaddius": {
			"name": "thaddius",
			"whid": 1798
		},
		"the beast": {
			"name": "the beast",
			"whid": 962
		},
		"the coin": {
			"name": "the coin",
			"whid": 1746
		},
		"the mistcaller": {
			"name": "the mistcaller",
			"whid": 2618
		},
		"the skeleton knight": {
			"name": "the skeleton knight",
			"whid": 2681
		},
		"thoughtsteal": {
			"name": "thoughtsteal",
			"whid": 30
		},
		"thrallmar farseer": {
			"name": "thrallmar farseer",
			"whid": 765
		},
		"thunder bluff valiant": {
			"name": "thunder bluff valiant",
			"whid": 2615
		},
		"timber wolf": {
			"name": "timber wolf",
			"whid": 606
		},
		"time rewinder": {
			"name": "time rewinder",
			"whid": 2152
		},
		"tinker's sharpsword oil": {
			"name": "tinker's sharpsword oil",
			"whid": 2095
		},
		"tinkertown technician": {
			"name": "tinkertown technician",
			"whid": 2070
		},
		"tinkmaster overspark": {
			"name": "tinkmaster overspark",
			"whid": 570
		},
		"tiny knight of evil": {
			"name": "tiny knight of evil",
			"whid": 2777
		},
		"tirion fordring": {
			"name": "tirion fordring",
			"whid": 890
		},
		"tomb pillager": {
			"name": "tomb pillager",
			"whid": 2884
		},
		"tomb spider": {
			"name": "tomb spider",
			"whid": 2919
		},
		"toshley": {
			"name": "toshley",
			"whid": 2083
		},
		"totem golem": {
			"name": "totem golem",
			"whid": 2610
		},
		"totemic call": {
			"name": "totemic call",
			"whid": 687
		},
		"totemic might": {
			"name": "totemic might",
			"whid": 830
		},
		"tournament attendee": {
			"name": "tournament attendee",
			"whid": 2499
		},
		"tournament medic": {
			"name": "tournament medic",
			"whid": 2575
		},
		"tracking": {
			"name": "tracking",
			"whid": 1047
		},
		"trade prince gallywix": {
			"name": "trade prince gallywix",
			"whid": 1993
		},
		"treant": {
			"name": "treant",
			"whid": 600
		},
		"tree of life": {
			"name": "tree of life",
			"whid": 2001
		},
		"troggzor the earthinator": {
			"name": "troggzor the earthinator",
			"whid": 2086
		},
		"truesilver champion": {
			"name": "truesilver champion",
			"whid": 847
		},
		"tundra rhino": {
			"name": "tundra rhino",
			"whid": 699
		},
		"tunnel trogg": {
			"name": "tunnel trogg",
			"whid": 2890
		},
		"tuskarr jouster": {
			"name": "tuskarr jouster",
			"whid": 2504
		},
		"tuskarr totemic": {
			"name": "tuskarr totemic",
			"whid": 2513
		},
		"twilight drake": {
			"name": "twilight drake",
			"whid": 1037
		},
		"twilight guardian": {
			"name": "twilight guardian",
			"whid": 2569
		},
		"twilight whelp": {
			"name": "twilight whelp",
			"whid": 2286
		},
		"twisting nether": {
			"name": "twisting nether",
			"whid": 859
		},
		"unbound elemental": {
			"name": "unbound elemental",
			"whid": 774
		},
		"undercity valiant": {
			"name": "undercity valiant",
			"whid": 2767
		},
		"undertaker": {
			"name": "undertaker",
			"whid": 1910
		},
		"unearthed raptor": {
			"name": "unearthed raptor",
			"whid": 2891
		},
		"unleash the hounds": {
			"name": "unleash the hounds",
			"whid": 1243
		},
		"unstable ghoul": {
			"name": "unstable ghoul",
			"whid": 1808
		},
		"unstable portal": {
			"name": "unstable portal",
			"whid": 1929
		},
		"upgrade": {
			"name": "upgrade",
			"whid": 511
		},
		"upgraded repair bot": {
			"name": "upgraded repair bot",
			"whid": 2051
		},
		"v-07-tr-0n": {
			"name": "v-07-tr-0n",
			"whid": 2232
		},
		"vanish": {
			"name": "vanish",
			"whid": 196
		},
		"vaporize": {
			"name": "vaporize",
			"whid": 286
		},
		"varian wrynn": {
			"name": "varian wrynn",
			"whid": 2760
		},
		"velen's chosen": {
			"name": "velen's chosen",
			"whid": 1935
		},
		"venture co. mercenary": {
			"name": "venture co. mercenary",
			"whid": 1122
		},
		"violet apprentice": {
			"name": "violet apprentice",
			"whid": 378
		},
		"violet teacher": {
			"name": "violet teacher",
			"whid": 1029
		},
		"vitality totem": {
			"name": "vitality totem",
			"whid": 2007
		},
		"void crusher": {
			"name": "void crusher",
			"whid": 2537
		},
		"void terror": {
			"name": "void terror",
			"whid": 1221
		},
		"voidcaller": {
			"name": "voidcaller",
			"whid": 1806
		},
		"voidwalker": {
			"name": "voidwalker",
			"whid": 48
		},
		"vol'jin": {
			"name": "vol'jin",
			"whid": 1931
		},
		"volcanic drake": {
			"name": "volcanic drake",
			"whid": 2258
		},
		"volcanic lumberer": {
			"name": "volcanic lumberer",
			"whid": 2295
		},
		"voodoo doctor": {
			"name": "voodoo doctor",
			"whid": 132
		},
		"wailing soul": {
			"name": "wailing soul",
			"whid": 1799
		},
		"war golem": {
			"name": "war golem",
			"whid": 712
		},
		"warbot": {
			"name": "warbot",
			"whid": 2019
		},
		"warhorse trainer": {
			"name": "warhorse trainer",
			"whid": 2515
		},
		"warsong commander": {
			"name": "warsong commander",
			"whid": 1009
		},
		"water elemental": {
			"name": "water elemental",
			"whid": 395
		},
		"webspinner": {
			"name": "webspinner",
			"whid": 1860
		},
		"wee spellstopper": {
			"name": "wee spellstopper",
			"whid": 2234
		},
		"whelp": {
			"name": "whelp",
			"whid": 54
		},
		"whirling blades": {
			"name": "whirling blades",
			"whid": 2150
		},
		"whirling zap-o-matic": {
			"name": "whirling zap-o-matic",
			"whid": 2005
		},
		"whirlwind": {
			"name": "whirlwind",
			"whid": 636
		},
		"wicked knife": {
			"name": "wicked knife",
			"whid": 485
		},
		"wild growth": {
			"name": "wild growth",
			"whid": 1124
		},
		"wild pyromancer": {
			"name": "wild pyromancer",
			"whid": 1014
		},
		"wildwalker": {
			"name": "wildwalker",
			"whid": 2786
		},
		"wilfred fizzlebang": {
			"name": "wilfred fizzlebang",
			"whid": 2621
		},
		"windfury": {
			"name": "windfury",
			"whid": 51
		},
		"windfury harpy": {
			"name": "windfury harpy",
			"whid": 567
		},
		"windspeaker": {
			"name": "windspeaker",
			"whid": 178
		},
		"wisp": {
			"name": "wisp",
			"whid": 179
		},
		"wobbling runts": {
			"name": "wobbling runts",
			"whid": 2961
		},
		"wolfrider": {
			"name": "wolfrider",
			"whid": 289
		},
		"worgen infiltrator": {
			"name": "worgen infiltrator",
			"whid": 994
		},
		"worthless imp": {
			"name": "worthless imp",
			"whid": 1723
		},
		"wrath": {
			"name": "wrath",
			"whid": 836
		},
		"wrath of air totem": {
			"name": "wrath of air totem",
			"whid": 458
		},
		"wrathguard": {
			"name": "wrathguard",
			"whid": 2623
		},
		"wyrmrest agent": {
			"name": "wyrmrest agent",
			"whid": 2596
		},
		"young dragonhawk": {
			"name": "young dragonhawk",
			"whid": 641
		},
		"young priestess": {
			"name": "young priestess",
			"whid": 1634
		},
		"youthful brewmaster": {
			"name": "youthful brewmaster",
			"whid": 415
		},
		"ysera": {
			"name": "ysera",
			"whid": 1186
		},
		"ysera awakens": {
			"name": "ysera awakens",
			"whid": 301
		},
		"zombie chow": {
			"name": "zombie chow",
			"whid": 1753
		}
	};
}