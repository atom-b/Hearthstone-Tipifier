var commentAreaClass = "commentarea";
var postDivClass = "md";
var cardRegex = /\[\[(.+?)\]\]/ig;
var hheadCardUrl = "//www.hearthhead.com/card=";
var hheadScriptUrl = "//wow.zamimg.com/widgets/power.js"
var cardDict = loadCardData();

(function()
{
	linkify(document);

	// listen for and process any DOM mutations	
	subscribeDomMuations();

	// add HearthHead tooltip scripts
	addTooltips();
}());

function subscribeDomMuations()
{
	var commentArea = document.getElementsByClassName(commentAreaClass);

	var insertedNodes = [];
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			for (var i = mutation.addedNodes.length - 1; i >= 0; i--) {
				var node = mutation.addedNodes[i];
				linkify(node);
			}
		});
	});

	observer.observe(commentArea[0], { childList: true, subtree: true });
}

function linkify(postsRootElement)
{
	if (!postsRootElement) return;
	if (!postsRootElement.getElementsByClassName) return;

	var postDivs = postsRootElement.getElementsByClassName(postDivClass);
	var paragraphs = [];

	for (var i = postDivs.length - 1; i >= 0; i--) {
		Array.prototype.push.apply(paragraphs, postDivs[i].getElementsByTagName("p"));
	};

	for (var i = paragraphs.length - 1; i >= 0; i--) {
		var paragraph = paragraphs[i];

		// Don't linkify a paragraph we've already linkified
		if (paragraph.linkified) continue;
		paragraph.linkified = true;

		var textNodes = findTextNodes(paragraph);
		textNodes.forEach(function(element, index, array) {
			linkifyTextNode(element, cardRegex, createCardLink);
		});
	};
}

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

function linkifyTextNode(node, regex, replaceFn)
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
	var card = cardDict[cardName.toLowerCase()];
	if (card == null) return;

	// construct HearthHead link
	var link = document.createElement('a');
	link.href = hheadCardUrl + card.whid;
	link.target = '_blank';
	link.innerHTML = cardName;

	return link;	
}

function addTooltips()
{
	var whScriptElement = document.createElement('script');
	whScriptElement.type = 'text/javascript';
	whScriptElement.src = hheadScriptUrl;
	document.getElementsByTagName('head')[0].appendChild(whScriptElement);

	var whVarsElement = document.createElement('script');
	var whVarsText = document.createTextNode('var wowhead_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": false }');
	whVarsElement.appendChild(whVarsText);
	document.getElementsByTagName('head')[0].appendChild(whVarsElement);
}

function loadCardData()
{
	return {
		"a light in the darkness":{
			"name":"A Light in the Darkness",
			"whid":38913
		},
		"aberrant berserker":{
			"name":"Aberrant Berserker",
			"whid":38531
		},
		"abomination":{
			"name":"Abomination",
			"whid":440
		},
		"abusive sergeant":{
			"name":"Abusive Sergeant",
			"whid":242
		},
		"acidic swamp ooze":{
			"name":"Acidic Swamp Ooze",
			"whid":906
		},
		"acidmaw":{
			"name":"Acidmaw",
			"whid":2633
		},
		"acolyte of pain":{
			"name":"Acolyte of Pain",
			"whid":1659
		},
		"addled grizzly":{
			"name":"Addled Grizzly",
			"whid":38916
		},
		"al'akir":{
			"name":"Al'Akir",
			"whid":32
		},
		"al'akir the windlord":{
			"name":"Al'Akir the Windlord",
			"whid":32
		},
		"alarm-o-bot":{
			"name":"Alarm-o-Bot",
			"whid":1658
		},
		"aldor peacekeeper":{
			"name":"Aldor Peacekeeper",
			"whid":1167
		},
		"alexstrasza":{
			"name":"Alexstrasza",
			"whid":581
		},
		"alexstrasza's champion":{
			"name":"Alexstrasza's Champion",
			"whid":2758
		},
		"am'gam rager":{
			"name":"Am'gam Rager",
			"whid":38782
		},
		"amani berserker":{
			"name":"Amani Berserker",
			"whid":790
		},
		"ancestor's call":{
			"name":"Ancestor's Call",
			"whid":1998
		},
		"ancestral healing":{
			"name":"Ancestral Healing",
			"whid":149
		},
		"ancestral knowledge":{
			"name":"Ancestral Knowledge",
			"whid":2514
		},
		"ancestral spirit":{
			"name":"Ancestral Spirit",
			"whid":404
		},
		"ancient brewmaster":{
			"name":"Ancient Brewmaster",
			"whid":186
		},
		"ancient harbinger":{
			"name":"Ancient Harbinger",
			"whid":38873
		},
		"ancient mage":{
			"name":"Ancient Mage",
			"whid":915
		},
		"ancient of lore":{
			"name":"Ancient of Lore",
			"whid":920
		},
		"ancient of war":{
			"name":"Ancient of War",
			"whid":1035
		},
		"ancient shade":{
			"name":"Ancient Shade",
			"whid":9081
		},
		"ancient shieldbearer":{
			"name":"Ancient Shieldbearer",
			"whid":38897
		},
		"ancient watcher":{
			"name":"Ancient Watcher",
			"whid":605
		},
		"angry chicken":{
			"name":"Angry Chicken",
			"whid":1688
		},
		"anima golem":{
			"name":"Anima Golem",
			"whid":2045
		},
		"animal companion":{
			"name":"Animal Companion",
			"whid":437
		},
		"animated armor":{
			"name":"Animated Armor",
			"whid":36111
		},
		"annoy-o-tron":{
			"name":"Annoy-o-Tron",
			"whid":2053
		},
		"anodized robo cub":{
			"name":"Anodized Robo Cub",
			"whid":2096
		},
		"anomalus":{
			"name":"Anomalus",
			"whid":38463
		},
		"antique healbot":{
			"name":"Antique Healbot",
			"whid":2037
		},
		"anub'ar ambusher":{
			"name":"Anub'ar Ambusher",
			"whid":1810
		},
		"anub'arak":{
			"name":"Anub'arak",
			"whid":2586
		},
		"anubisath sentinel":{
			"name":"Anubisath Sentinel",
			"whid":2933
		},
		"anyfin can happen":{
			"name":"Anyfin Can Happen",
			"whid":2898
		},
		"arathi weaponsmith":{
			"name":"Arathi Weaponsmith",
			"whid":538
		},
		"arcane anomaly":{
			"name":"Arcane Anomaly",
			"whid":39215
		},
		"arcane blast":{
			"name":"Arcane Blast",
			"whid":2572
		},
		"arcane explosion":{
			"name":"Arcane Explosion",
			"whid":447
		},
		"arcane giant":{
			"name":"Arcane Giant",
			"whid":39426
		},
		"arcane golem":{
			"name":"Arcane Golem",
			"whid":466
		},
		"arcane intellect":{
			"name":"Arcane Intellect",
			"whid":555
		},
		"arcane missiles":{
			"name":"Arcane Missiles",
			"whid":564
		},
		"arcane nullifier":{
			"name":"Arcane Nullifier",
			"whid":2059
		},
		"arcane nullifier x-21":{
			"name":"Arcane Nullifier X-21",
			"whid":2059
		},
		"arcane shot":{
			"name":"Arcane Shot",
			"whid":877
		},
		"arcanite reaper":{
			"name":"Arcanite Reaper",
			"whid":304
		},
		"arcanosmith":{
			"name":"Arcanosmith",
			"whid":39491
		},
		"arch-thief rafaam":{
			"name":"Arch-Thief Rafaam",
			"whid":2964
		},
		"archmage":{
			"name":"Archmage",
			"whid":525
		},
		"archmage antonidas":{
			"name":"Archmage Antonidas",
			"whid":1080
		},
		"argent commander":{
			"name":"Argent Commander",
			"whid":281
		},
		"argent horserider":{
			"name":"Argent Horserider",
			"whid":2490
		},
		"argent lance":{
			"name":"Argent Lance",
			"whid":2720
		},
		"argent protector":{
			"name":"Argent Protector",
			"whid":1022
		},
		"argent squire":{
			"name":"Argent Squire",
			"whid":757
		},
		"argent watchman":{
			"name":"Argent Watchman",
			"whid":2505
		},
		"armored warhorse":{
			"name":"Armored Warhorse",
			"whid":2627
		},
		"armorsmith":{
			"name":"Armorsmith",
			"whid":596
		},
		"ashbringer":{
			"name":"Ashbringer",
			"whid":1730
		},
		"assassin's blade":{
			"name":"Assassin's Blade",
			"whid":421
		},
		"assassinate":{
			"name":"Assassinate",
			"whid":345
		},
		"astral communion":{
			"name":"Astral Communion",
			"whid":2785
		},
		"auchenai soulpriest":{
			"name":"Auchenai Soulpriest",
			"whid":237
		},
		"auctioneer":{
			"name":"Auctioneer",
			"whid":932
		},
		"avenge":{
			"name":"Avenge",
			"whid":1804
		},
		"avenging wrath":{
			"name":"Avenging Wrath",
			"whid":1174
		},
		"avian watcher":{
			"name":"Avian Watcher",
			"whid":39489
		},
		"aviana":{
			"name":"Aviana",
			"whid":2796
		},
		"axe flinger":{
			"name":"Axe Flinger",
			"whid":2297
		},
		"azure drake":{
			"name":"Azure Drake",
			"whid":825
		},
		"babbling book":{
			"name":"Babbling Book",
			"whid":39169
		},
		"backstab":{
			"name":"Backstab",
			"whid":180
		},
		"ball of spiders":{
			"name":"Ball of Spiders",
			"whid":2483
		},
		"bane of doom":{
			"name":"Bane of Doom",
			"whid":23
		},
		"barnes":{
			"name":"Barnes",
			"whid":39941
		},
		"baron geddon":{
			"name":"Baron Geddon",
			"whid":336
		},
		"baron rivendare":{
			"name":"Baron Rivendare",
			"whid":1915
		},
		"bash":{
			"name":"Bash",
			"whid":2729
		},
		"battle rage":{
			"name":"Battle Rage",
			"whid":400
		},
		"bear trap":{
			"name":"Bear Trap",
			"whid":2641
		},
		"beckoner of evil":{
			"name":"Beckoner of Evil",
			"whid":38859
		},
		"belcher":{
			"name":"Belcher",
			"whid":1793
		},
		"beneath the grounds":{
			"name":"Beneath the Grounds",
			"whid":2587
		},
		"bestial wrath":{
			"name":"Bestial Wrath",
			"whid":903
		},
		"betrayal":{
			"name":"Betrayal",
			"whid":282
		},
		"bgh":{
			"name":"BGH",
			"whid":1657
		},
		"big game hunter":{
			"name":"Big Game Hunter",
			"whid":1657
		},
		"bilefin tidehunter":{
			"name":"Bilefin Tidehunter",
			"whid":38538
		},
		"bite":{
			"name":"Bite",
			"whid":577
		},
		"black knight":{
			"name":"Black Knight",
			"whid":1656
		},
		"blackwater pirate":{
			"name":"Blackwater Pirate",
			"whid":38960
		},
		"blackwing corruptor":{
			"name":"Blackwing Corruptor",
			"whid":2409
		},
		"blackwing technician":{
			"name":"Blackwing Technician",
			"whid":2408
		},
		"blade flurry":{
			"name":"Blade Flurry",
			"whid":1064
		},
		"blade of c'thun":{
			"name":"Blade of C'Thun",
			"whid":38861
		},
		"bladed cultist":{
			"name":"Bladed Cultist",
			"whid":38391
		},
		"blessed champion":{
			"name":"Blessed Champion",
			"whid":1522
		},
		"blessing of kings":{
			"name":"Blessing of Kings",
			"whid":943
		},
		"blessing of might":{
			"name":"Blessing of Might",
			"whid":70
		},
		"blessing of wisdom":{
			"name":"Blessing of Wisdom",
			"whid":1373
		},
		"blingtron 3000":{
			"name":"Blingtron 3000",
			"whid":2087
		},
		"blizzard":{
			"name":"Blizzard",
			"whid":457
		},
		"blood imp":{
			"name":"Blood Imp",
			"whid":469
		},
		"blood knight":{
			"name":"Blood Knight",
			"whid":755
		},
		"blood of the ancient one":{
			"name":"Blood of The Ancient One",
			"whid":38567
		},
		"blood to ichor":{
			"name":"Blood To Ichor",
			"whid":38918
		},
		"blood warriors":{
			"name":"Blood Warriors",
			"whid":38848
		},
		"bloodfen raptor":{
			"name":"Bloodfen Raptor",
			"whid":216
		},
		"bloodhoof brave":{
			"name":"Bloodhoof Brave",
			"whid":38738
		},
		"bloodlust":{
			"name":"Bloodlust",
			"whid":1171
		},
		"bloodmage thalnos":{
			"name":"Bloodmage Thalnos",
			"whid":749
		},
		"bloodsail corsair":{
			"name":"Bloodsail Corsair",
			"whid":997
		},
		"bloodsail cultist":{
			"name":"Bloodsail Cultist",
			"whid":38920
		},
		"bloodsail raider":{
			"name":"Bloodsail Raider",
			"whid":999
		},
		"bluegill warrior":{
			"name":"Bluegill Warrior",
			"whid":739
		},
		"bog creeper":{
			"name":"Bog Creeper",
			"whid":38534
		},
		"bolf ramshield":{
			"name":"Bolf Ramshield",
			"whid":2595
		},
		"bolster":{
			"name":"Bolster",
			"whid":2754
		},
		"bolvar":{
			"name":"Bolvar",
			"whid":2031
		},
		"bolvar fordragon":{
			"name":"Bolvar Fordragon",
			"whid":2031
		},
		"bomb lobber":{
			"name":"Bomb Lobber",
			"whid":2067
		},
		"boneguard lieutenant":{
			"name":"Boneguard Lieutenant",
			"whid":2495
		},
		"book wyrm":{
			"name":"Book Wyrm",
			"whid":39210
		},
		"boom bot":{
			"name":"Boom Bot",
			"whid":2235
		},
		"booty bay bodyguard":{
			"name":"Booty Bay Bodyguard",
			"whid":1140
		},
		"boulderfist ogre":{
			"name":"Boulderfist Ogre",
			"whid":1686
		},
		"bouncing blade":{
			"name":"Bouncing Blade",
			"whid":2018
		},
		"brann":{
			"name":"Brann",
			"whid":2949
		},
		"brann bronzebeard":{
			"name":"Brann Bronzebeard",
			"whid":2949
		},
		"brave archer":{
			"name":"Brave Archer",
			"whid":2642
		},
		"brawl":{
			"name":"Brawl",
			"whid":75
		},
		"buccaneer":{
			"name":"Buccaneer",
			"whid":2715
		},
		"burgle":{
			"name":"Burgle",
			"whid":2770
		},
		"burly rockjaw trogg":{
			"name":"Burly Rockjaw Trogg",
			"whid":2036
		},
		"burrowing mine":{
			"name":"Burrowing Mine",
			"whid":2221
		},
		"buzzard":{
			"name":"Buzzard",
			"whid":1241
		},
		"c'thun":{
			"name":"C'Thun",
			"whid":38857
		},
		"c'thun's chosen":{
			"name":"C'Thun's Chosen",
			"whid":38863
		},
		"cabal shadow priest":{
			"name":"Cabal Shadow Priest",
			"whid":272
		},
		"cabalist's tome":{
			"name":"Cabalist's Tome",
			"whid":38418
		},
		"cairne":{
			"name":"Cairne",
			"whid":420
		},
		"cairne bloodhoof":{
			"name":"Cairne Bloodhoof",
			"whid":420
		},
		"call of the wild":{
			"name":"Call of the Wild",
			"whid":38727
		},
		"call pet":{
			"name":"Call Pet",
			"whid":2094
		},
		"captain greenskin":{
			"name":"Captain Greenskin",
			"whid":456
		},
		"captain's parrot":{
			"name":"Captain's Parrot",
			"whid":530
		},
		"captured jormungar":{
			"name":"Captured Jormungar",
			"whid":2522
		},
		"carrion grub":{
			"name":"Carrion Grub",
			"whid":38985
		},
		"cat trick":{
			"name":"Cat Trick",
			"whid":39160
		},
		"cenarius":{
			"name":"Cenarius",
			"whid":36
		},
		"charge":{
			"name":"Charge",
			"whid":344
		},
		"charged hammer":{
			"name":"Charged Hammer",
			"whid":2617
		},
		"chillmaw":{
			"name":"Chillmaw",
			"whid":2682
		},
		"chillwind yeti":{
			"name":"Chillwind Yeti",
			"whid":90
		},
		"cho'gall":{
			"name":"Cho'gall",
			"whid":38464
		},
		"chromaggus":{
			"name":"Chromaggus",
			"whid":2280
		},
		"circle of healing":{
			"name":"Circle of Healing",
			"whid":1362
		},
		"claw":{
			"name":"Claw",
			"whid":1050
		},
		"cleave":{
			"name":"Cleave",
			"whid":940
		},
		"cloaked huntress":{
			"name":"Cloaked Huntress",
			"whid":39492
		},
		"clockwork giant":{
			"name":"Clockwork Giant",
			"whid":2233
		},
		"clockwork gnome":{
			"name":"Clockwork Gnome",
			"whid":2050
		},
		"clockwork knight":{
			"name":"Clockwork Knight",
			"whid":2500
		},
		"cobalt guardian":{
			"name":"Cobalt Guardian",
			"whid":2030
		},
		"cobra shot":{
			"name":"Cobra Shot",
			"whid":2041
		},
		"coghammer":{
			"name":"Coghammer",
			"whid":2027
		},
		"cogmaster":{
			"name":"Cogmaster",
			"whid":1932
		},
		"cogmaster's wrench":{
			"name":"Cogmaster's Wrench",
			"whid":1989
		},
		"cold blood":{
			"name":"Cold Blood",
			"whid":268
		},
		"coldarra drake":{
			"name":"Coldarra Drake",
			"whid":2544
		},
		"coldlight oracle":{
			"name":"Coldlight Oracle",
			"whid":1016
		},
		"coldlight seer":{
			"name":"Coldlight Seer",
			"whid":453
		},
		"coliseum manager":{
			"name":"Coliseum Manager",
			"whid":2585
		},
		"commanding shout":{
			"name":"Commanding Shout",
			"whid":1026
		},
		"competitive spirit":{
			"name":"Competitive Spirit",
			"whid":2648
		},
		"conceal":{
			"name":"Conceal",
			"whid":990
		},
		"cone of cold":{
			"name":"Cone of Cold",
			"whid":430
		},
		"confessor paletress":{
			"name":"Confessor Paletress",
			"whid":2556
		},
		"confuse":{
			"name":"Confuse",
			"whid":2564
		},
		"consecrate":{
			"name":"Consecrate",
			"whid":476
		},
		"consecration":{
			"name":"Consecration",
			"whid":476
		},
		"convert":{
			"name":"Convert",
			"whid":2563
		},
		"core hound":{
			"name":"Core Hound",
			"whid":1687
		},
		"core rager":{
			"name":"Core Rager",
			"whid":2263
		},
		"corrupted healbot":{
			"name":"Corrupted Healbot",
			"whid":38528
		},
		"corrupted seer":{
			"name":"Corrupted Seer",
			"whid":38545
		},
		"corruption":{
			"name":"Corruption",
			"whid":982
		},
		"counterspell":{
			"name":"Counterspell",
			"whid":113
		},
		"crackle":{
			"name":"Crackle",
			"whid":2006
		},
		"crazed alchemist":{
			"name":"Crazed Alchemist",
			"whid":801
		},
		"crazed worshipper":{
			"name":"Crazed Worshipper",
			"whid":38958
		},
		"crowd favorite":{
			"name":"Crowd Favorite",
			"whid":2518
		},
		"cruel taskmaster":{
			"name":"Cruel Taskmaster",
			"whid":285
		},
		"crush":{
			"name":"Crush",
			"whid":2020
		},
		"cult apothecary":{
			"name":"Cult Apothecary",
			"whid":38888
		},
		"cult master":{
			"name":"Cult Master",
			"whid":811
		},
		"cult sorcerer":{
			"name":"Cult Sorcerer",
			"whid":38900
		},
		"curse of rafaam":{
			"name":"Curse of Rafaam",
			"whid":2879
		},
		"cursed blade":{
			"name":"Cursed Blade",
			"whid":35025
		},
		"cutpurse":{
			"name":"Cutpurse",
			"whid":2766
		},
		"cyclopian horror":{
			"name":"Cyclopian Horror",
			"whid":39041
		},
		"dalaran aspirant":{
			"name":"Dalaran Aspirant",
			"whid":2549
		},
		"dalaran mage":{
			"name":"Dalaran Mage",
			"whid":175
		},
		"dancing swords":{
			"name":"Dancing Swords",
			"whid":1913
		},
		"dark arakkoa":{
			"name":"Dark Arakkoa",
			"whid":38882
		},
		"dark bargain":{
			"name":"Dark Bargain",
			"whid":2632
		},
		"dark cultist":{
			"name":"Dark Cultist",
			"whid":1807
		},
		"dark iron dwarf":{
			"name":"Dark Iron Dwarf",
			"whid":348
		},
		"dark iron skulker":{
			"name":"Dark Iron Skulker",
			"whid":2291
		},
		"dark peddler":{
			"name":"Dark Peddler",
			"whid":2895
		},
		"dark wispers":{
			"name":"Dark Wispers",
			"whid":2009
		},
		"darkbomb":{
			"name":"Darkbomb",
			"whid":2093
		},
		"darkscale healer":{
			"name":"Darkscale Healer",
			"whid":582
		},
		"darkshire alchemist":{
			"name":"Darkshire Alchemist",
			"whid":38764
		},
		"darkshire councilman":{
			"name":"Darkshire Councilman",
			"whid":38452
		},
		"darkshire librarian":{
			"name":"Darkshire Librarian",
			"whid":38447
		},
		"darkspeaker":{
			"name":"Darkspeaker",
			"whid":38436
		},
		"darnassus aspirant":{
			"name":"Darnassus Aspirant",
			"whid":2782
		},
		"dart trap":{
			"name":"Dart Trap",
			"whid":2893
		},
		"deadly fork":{
			"name":"Deadly Fork",
			"whid":39822
		},
		"deadly poison":{
			"name":"Deadly Poison",
			"whid":459
		},
		"deadly shot":{
			"name":"Deadly Shot",
			"whid":1093
		},
		"death's bite":{
			"name":"Death's Bite",
			"whid":1805
		},
		"deathlord":{
			"name":"Deathlord",
			"whid":1790
		},
		"deathwing":{
			"name":"Deathwing",
			"whid":834
		},
		"deathwing, dragonlord":{
			"name":"Deathwing, Dragonlord",
			"whid":38943
		},
		"defender of argus":{
			"name":"Defender of Argus",
			"whid":763
		},
		"defias":{
			"name":"Defias",
			"whid":201
		},
		"defias ringleader":{
			"name":"Defias Ringleader",
			"whid":201
		},
		"demented frostcaller":{
			"name":"Demented Frostcaller",
			"whid":38412
		},
		"demolisher":{
			"name":"Demolisher",
			"whid":979
		},
		"demonfire":{
			"name":"Demonfire",
			"whid":1142
		},
		"demonfuse":{
			"name":"Demonfuse",
			"whid":2535
		},
		"demonheart":{
			"name":"Demonheart",
			"whid":1985
		},
		"demonwrath":{
			"name":"Demonwrath",
			"whid":2301
		},
		"desert camel":{
			"name":"Desert Camel",
			"whid":2892
		},
		"dire wolf alpha":{
			"name":"Dire Wolf Alpha",
			"whid":985
		},
		"disciple of c'thun":{
			"name":"Disciple of C'Thun",
			"whid":38547
		},
		"divine favor":{
			"name":"Divine Favor",
			"whid":679
		},
		"divine spirit":{
			"name":"Divine Spirit",
			"whid":1361
		},
		"divine strength":{
			"name":"Divine Strength",
			"whid":38749
		},
		"djinni of zephyrs":{
			"name":"Djinni of Zephyrs",
			"whid":2925
		},
		"doom!":{
			"name":"DOOM!",
			"whid":38770
		},
		"doom":{
			"name":"DOOM!",
			"whid":38770
		},
		"doomcaller":{
			"name":"Doomcaller",
			"whid":38795
		},
		"doomguard":{
			"name":"Doomguard",
			"whid":631
		},
		"doomhammer":{
			"name":"Doomhammer",
			"whid":352
		},
		"doomsayer":{
			"name":"Doomsayer",
			"whid":138
		},
		"dr. boom":{
			"name":"Dr. Boom",
			"whid":2078
		},
		"draenei totemcarver":{
			"name":"Draenei Totemcarver",
			"whid":2613
		},
		"dragon consort":{
			"name":"Dragon Consort",
			"whid":2299
		},
		"dragon egg":{
			"name":"Dragon Egg",
			"whid":2278
		},
		"dragon's breath":{
			"name":"Dragon's Breath",
			"whid":2284
		},
		"dragonhawk rider":{
			"name":"Dragonhawk Rider",
			"whid":2533
		},
		"dragonkin sorcerer":{
			"name":"Dragonkin Sorcerer",
			"whid":2306
		},
		"dragonling mechanic":{
			"name":"Dragonling Mechanic",
			"whid":523
		},
		"drain life":{
			"name":"Drain Life",
			"whid":919
		},
		"drakonid crusher":{
			"name":"Drakonid Crusher",
			"whid":2257
		},
		"dread corsair":{
			"name":"Dread Corsair",
			"whid":878
		},
		"dread infernal":{
			"name":"Dread Infernal",
			"whid":1019
		},
		"dreadscale":{
			"name":"Dreadscale",
			"whid":2634
		},
		"dreadsteed":{
			"name":"Dreadsteed",
			"whid":2822
		},
		"druid of the claw":{
			"name":"Druid of the Claw",
			"whid":692
		},
		"druid of the fang":{
			"name":"Druid of the Fang",
			"whid":2048
		},
		"druid of the flame":{
			"name":"Druid of the Flame",
			"whid":2292
		},
		"druid of the saber":{
			"name":"Druid of the Saber",
			"whid":2783
		},
		"dunemaul shaman":{
			"name":"Dunemaul Shaman",
			"whid":2034
		},
		"duplicate":{
			"name":"Duplicate",
			"whid":1801
		},
		"duskboar":{
			"name":"Duskboar",
			"whid":39002
		},
		"dust devil":{
			"name":"Dust Devil",
			"whid":618
		},
		"eadric the pure":{
			"name":"Eadric the Pure",
			"whid":2727
		},
		"eaglehorn bow":{
			"name":"Eaglehorn Bow",
			"whid":1662
		},
		"earth elemental":{
			"name":"Earth Elemental",
			"whid":1141
		},
		"earth shock":{
			"name":"Earth Shock",
			"whid":767
		},
		"earthen ring farseer":{
			"name":"Earthen Ring Farseer",
			"whid":1651
		},
		"eater of secrets":{
			"name":"Eater of Secrets",
			"whid":38792
		},
		"echo of medivh":{
			"name":"Echo of Medivh",
			"whid":1941
		},
		"echoing ooze":{
			"name":"Echoing Ooze",
			"whid":1858
		},
		"edwin":{
			"name":"Edwin",
			"whid":306
		},
		"edwin vancleef":{
			"name":"Edwin VanCleef",
			"whid":306
		},
		"eerie statue":{
			"name":"Eerie Statue",
			"whid":9107
		},
		"effigy":{
			"name":"Effigy",
			"whid":2541
		},
		"eldritch horror":{
			"name":"Eldritch Horror",
			"whid":38522
		},
		"elemental destruction":{
			"name":"Elemental Destruction",
			"whid":2620
		},
		"elise":{
			"name":"Elise",
			"whid":2951
		},
		"elise starseeker":{
			"name":"Elise Starseeker",
			"whid":2951
		},
		"elite tauren chieftain":{
			"name":"Elite Tauren Chieftain",
			"whid":1754
		},
		"elven archer":{
			"name":"Elven Archer",
			"whid":389
		},
		"embrace the shadow":{
			"name":"Embrace the Shadow",
			"whid":38439
		},
		"emerald drake":{
			"name":"Emerald Drake",
			"whid":489
		},
		"emperor cobra":{
			"name":"Emperor Cobra",
			"whid":1098
		},
		"emperor thaurissan":{
			"name":"Emperor Thaurissan",
			"whid":2262
		},
		"enchanted raven":{
			"name":"Enchanted Raven",
			"whid":39350
		},
		"enhance-o-mechano":{
			"name":"Enhance-o-Mechano",
			"whid":2075
		},
		"enter the coliseum":{
			"name":"Enter the Coliseum",
			"whid":2654
		},
		"entomb":{
			"name":"Entomb",
			"whid":3015
		},
		"equality":{
			"name":"Equality",
			"whid":756
		},
		"eternal sentinel":{
			"name":"Eternal Sentinel",
			"whid":38265
		},
		"ethereal arcanist":{
			"name":"Ethereal Arcanist",
			"whid":1737
		},
		"ethereal conjurer":{
			"name":"Ethereal Conjurer",
			"whid":2875
		},
		"ethereal peddler":{
			"name":"Ethereal Peddler",
			"whid":39700
		},
		"everyfin is awesome":{
			"name":"Everyfin is Awesome",
			"whid":3007
		},
		"evil heckler":{
			"name":"Evil Heckler",
			"whid":2752
		},
		"eviscerate":{
			"name":"Eviscerate",
			"whid":904
		},
		"evolve":{
			"name":"Evolve",
			"whid":38266
		},
		"evolved kobold":{
			"name":"Evolved Kobold",
			"whid":38408
		},
		"excavated evil":{
			"name":"Excavated Evil",
			"whid":2999
		},
		"excess mana":{
			"name":"Excess Mana",
			"whid":1725
		},
		"execute":{
			"name":"Execute",
			"whid":785
		},
		"explorer's hat":{
			"name":"Explorer's Hat",
			"whid":3001
		},
		"explosive sheep":{
			"name":"Explosive Sheep",
			"whid":2044
		},
		"explosive shot":{
			"name":"Explosive Shot",
			"whid":394
		},
		"explosive trap":{
			"name":"Explosive Trap",
			"whid":585
		},
		"eydis darkbane":{
			"name":"Eydis Darkbane",
			"whid":2519
		},
		"eye for an eye":{
			"name":"Eye for an Eye",
			"whid":462
		},
		"faceless behemoth":{
			"name":"Faceless Behemoth",
			"whid":38521
		},
		"faceless manipulator":{
			"name":"Faceless Manipulator",
			"whid":531
		},
		"faceless shambler":{
			"name":"Faceless Shambler",
			"whid":38569
		},
		"faceless summoner":{
			"name":"Faceless Summoner",
			"whid":38725
		},
		"faerie dragon":{
			"name":"Faerie Dragon",
			"whid":609
		},
		"fallen hero":{
			"name":"Fallen Hero",
			"whid":2545
		},
		"fan of knives":{
			"name":"Fan of Knives",
			"whid":667
		},
		"fandral staghelm":{
			"name":"Fandral Staghelm",
			"whid":38318
		},
		"far sight":{
			"name":"Far Sight",
			"whid":818
		},
		"fearsome doomguard":{
			"name":"Fearsome Doomguard",
			"whid":2624
		},
		"feign death":{
			"name":"Feign Death",
			"whid":1991
		},
		"fel cannon":{
			"name":"Fel Cannon",
			"whid":1997
		},
		"fel reaver":{
			"name":"Fel Reaver",
			"whid":1982
		},
		"felguard":{
			"name":"Felguard",
			"whid":517
		},
		"fen creeper":{
			"name":"Fen Creeper",
			"whid":602
		},
		"fencing coach":{
			"name":"Fencing Coach",
			"whid":2581
		},
		"feral rage":{
			"name":"Feral Rage",
			"whid":38334
		},
		"feral spirit":{
			"name":"Feral Spirit",
			"whid":238
		},
		"feugen":{
			"name":"Feugen",
			"whid":1797
		},
		"fierce monkey":{
			"name":"Fierce Monkey",
			"whid":2894
		},
		"fiery bat":{
			"name":"Fiery Bat",
			"whid":38584
		},
		"fiery war axe":{
			"name":"Fiery War Axe",
			"whid":401
		},
		"finley":{
			"name":"Finley",
			"whid":2948
		},
		"fire elemental":{
			"name":"Fire Elemental",
			"whid":189
		},
		"fireball":{
			"name":"Fireball",
			"whid":315
		},
		"fireguard destroyer":{
			"name":"Fireguard Destroyer",
			"whid":2290
		},
		"firelands portal":{
			"name":"Firelands Portal",
			"whid":39715
		},
		"fist of jaraxxus":{
			"name":"Fist of Jaraxxus",
			"whid":2628
		},
		"fjola lightbane":{
			"name":"Fjola Lightbane",
			"whid":2748
		},
		"flame imp":{
			"name":"Flame Imp",
			"whid":1090
		},
		"flame juggler":{
			"name":"Flame Juggler",
			"whid":2580
		},
		"flame lance":{
			"name":"Flame Lance",
			"whid":2539
		},
		"flame leviathan":{
			"name":"Flame Leviathan",
			"whid":1939
		},
		"flame strike":{
			"name":"Flame Strike",
			"whid":1004
		},
		"flamecannon":{
			"name":"Flamecannon",
			"whid":1927
		},
		"flamestrike":{
			"name":"Flamestrike",
			"whid":1004
		},
		"flametongue totem":{
			"name":"Flametongue Totem",
			"whid":1008
		},
		"flamewaker":{
			"name":"Flamewaker",
			"whid":2275
		},
		"flamewreathed faceless":{
			"name":"Flamewreathed Faceless",
			"whid":38263
		},
		"flare":{
			"name":"Flare",
			"whid":896
		},
		"flash heal":{
			"name":"Flash Heal",
			"whid":2582
		},
		"flesheating ghoul":{
			"name":"Flesheating Ghoul",
			"whid":397
		},
		"floating watcher":{
			"name":"Floating Watcher",
			"whid":2068
		},
		"flying machine":{
			"name":"Flying Machine",
			"whid":2052
		},
		"foe reaper":{
			"name":"Foe Reaper",
			"whid":2081
		},
		"foe reaper 4000":{
			"name":"Foe Reaper 4000",
			"whid":2081
		},
		"fool's bane":{
			"name":"Fool's Bane",
			"whid":39417
		},
		"forbidden ancient":{
			"name":"Forbidden Ancient",
			"whid":38340
		},
		"forbidden flame":{
			"name":"Forbidden Flame",
			"whid":38413
		},
		"forbidden healing":{
			"name":"Forbidden Healing",
			"whid":38666
		},
		"forbidden ritual":{
			"name":"Forbidden Ritual",
			"whid":38454
		},
		"forbidden shaping":{
			"name":"Forbidden Shaping",
			"whid":38434
		},
		"force of nature":{
			"name":"Force of Nature",
			"whid":493
		},
		"force-tank max":{
			"name":"Force-Tank MAX",
			"whid":2047
		},
		"forgotten torch":{
			"name":"Forgotten Torch",
			"whid":2874
		},
		"forked lightning":{
			"name":"Forked Lightning",
			"whid":299
		},
		"forlorn stalker":{
			"name":"Forlorn Stalker",
			"whid":38875
		},
		"fossilized devilsaur":{
			"name":"Fossilized Devilsaur",
			"whid":2945
		},
		"freezing trap":{
			"name":"Freezing Trap",
			"whid":519
		},
		"frigid snobold":{
			"name":"Frigid Snobold",
			"whid":2532
		},
		"frost elemental":{
			"name":"Frost Elemental",
			"whid":512
		},
		"frost giant":{
			"name":"Frost Giant",
			"whid":2512
		},
		"frost nova":{
			"name":"Frost Nova",
			"whid":587
		},
		"frost shock":{
			"name":"Frost Shock",
			"whid":971
		},
		"frostbolt":{
			"name":"Frostbolt",
			"whid":662
		},
		"frostwolf grunt":{
			"name":"Frostwolf Grunt",
			"whid":41
		},
		"frostwolf warlord":{
			"name":"Frostwolf Warlord",
			"whid":496
		},
		"frothing berserker":{
			"name":"Frothing Berserker",
			"whid":654
		},
		"gadgetzan auctioneer":{
			"name":"Gadgetzan Auctioneer",
			"whid":932
		},
		"gadgetzan jouster":{
			"name":"Gadgetzan Jouster",
			"whid":2818
		},
		"gahz'rilla":{
			"name":"Gahz'rilla",
			"whid":2017
		},
		"gallywix's coin":{
			"name":"Gallywix's Coin",
			"whid":2277
		},
		"gang up":{
			"name":"Gang Up",
			"whid":2304
		},
		"garrison commander":{
			"name":"Garrison Commander",
			"whid":2517
		},
		"gazlowe":{
			"name":"Gazlowe",
			"whid":2085
		},
		"gelbin mekkatorque":{
			"name":"Gelbin Mekkatorque",
			"whid":858
		},
		"get down":{
			"name":"Get Down",
			"whid":584
		},
		"giant sand worm":{
			"name":"Giant Sand Worm",
			"whid":38909
		},
		"gilblin stalker":{
			"name":"Gilblin Stalker",
			"whid":2049
		},
		"gladiator's longbow":{
			"name":"Gladiator's Longbow",
			"whid":311
		},
		"glaivezooka":{
			"name":"Glaivezooka",
			"whid":2011
		},
		"gnomeregan infantry":{
			"name":"Gnomeregan Infantry",
			"whid":2066
		},
		"gnomish experimenter":{
			"name":"Gnomish Experimenter",
			"whid":2060
		},
		"gnomish inventor":{
			"name":"Gnomish Inventor",
			"whid":308
		},
		"goblin auto-barber":{
			"name":"Goblin Auto-Barber",
			"whid":1988
		},
		"goblin blastmage":{
			"name":"Goblin Blastmage",
			"whid":1934
		},
		"goblin sapper":{
			"name":"Goblin Sapper",
			"whid":2063
		},
		"goldshire footman":{
			"name":"Goldshire Footman",
			"whid":922
		},
		"gorehowl":{
			"name":"Gorehowl",
			"whid":810
		},
		"gorillabot a-3":{
			"name":"Gorillabot A-3",
			"whid":2911
		},
		"gormok the impaler":{
			"name":"Gormok the Impaler",
			"whid":2724
		},
		"grand crusader":{
			"name":"Grand Crusader",
			"whid":2510
		},
		"grim patron":{
			"name":"Grim Patron",
			"whid":2279
		},
		"grimscale oracle":{
			"name":"Grimscale Oracle",
			"whid":510
		},
		"grom":{
			"name":"Grom",
			"whid":338
		},
		"grommash hellscream":{
			"name":"Grommash Hellscream",
			"whid":338
		},
		"grotesque dragonhawk":{
			"name":"Grotesque Dragonhawk",
			"whid":38533
		},
		"grove tender":{
			"name":"Grove Tender",
			"whid":2225
		},
		"gruul":{
			"name":"Gruul",
			"whid":526
		},
		"guardian of kings":{
			"name":"Guardian of Kings",
			"whid":1068
		},
		"gurubashi berserker":{
			"name":"Gurubashi Berserker",
			"whid":768
		},
		"hallazeal the ascended":{
			"name":"Hallazeal the Ascended",
			"whid":38722
		},
		"hammer of twilight":{
			"name":"Hammer of Twilight",
			"whid":38270
		},
		"hammer of wrath":{
			"name":"Hammer of Wrath",
			"whid":250
		},
		"hand of protection":{
			"name":"Hand of Protection",
			"whid":727
		},
		"harrison":{
			"name":"Harrison",
			"whid":912
		},
		"harrison jones":{
			"name":"Harrison Jones",
			"whid":912
		},
		"harvest golem":{
			"name":"Harvest Golem",
			"whid":778
		},
		"haunted creeper":{
			"name":"Haunted Creeper",
			"whid":1781
		},
		"headcrack":{
			"name":"Headcrack",
			"whid":708
		},
		"healing touch":{
			"name":"Healing Touch",
			"whid":773
		},
		"healing wave":{
			"name":"Healing Wave",
			"whid":2612
		},
		"hellfire":{
			"name":"Hellfire",
			"whid":950
		},
		"hemet nesingwary":{
			"name":"Hemet Nesingwary",
			"whid":2088
		},
		"herald volazj":{
			"name":"Herald Volazj",
			"whid":38922
		},
		"heroic strike":{
			"name":"Heroic Strike",
			"whid":1007
		},
		"hex":{
			"name":"Hex",
			"whid":766
		},
		"highmane":{
			"name":"Highmane",
			"whid":1261
		},
		"hobgoblin":{
			"name":"Hobgoblin",
			"whid":2072
		},
		"hogger":{
			"name":"Hogger",
			"whid":640
		},
		"hogger, doom of elwynn":{
			"name":"Hogger, Doom of Elwynn",
			"whid":38944
		},
		"holy champion":{
			"name":"Holy Champion",
			"whid":2555
		},
		"holy fire":{
			"name":"Holy Fire",
			"whid":1365
		},
		"holy light":{
			"name":"Holy Light",
			"whid":291
		},
		"holy nova":{
			"name":"Holy Nova",
			"whid":841
		},
		"holy smite":{
			"name":"Holy Smite",
			"whid":279
		},
		"holy wrath":{
			"name":"Holy Wrath",
			"whid":435
		},
		"hooded acolyte":{
			"name":"Hooded Acolyte",
			"whid":39033
		},
		"houndmaster":{
			"name":"Houndmaster",
			"whid":1003
		},
		"huffer":{
			"name":"Huffer",
			"whid":100
		},
		"huge toad":{
			"name":"Huge Toad",
			"whid":2918
		},
		"humility":{
			"name":"Humility",
			"whid":854
		},
		"hungry crab":{
			"name":"Hungry Crab",
			"whid":443
		},
		"hungry dragon":{
			"name":"Hungry Dragon",
			"whid":2283
		},
		"hunter's mark":{
			"name":"Hunter's Mark",
			"whid":141
		},
		"hyena":{
			"name":"Hyena",
			"whid":1281
		},
		"i am murloc":{
			"name":"I Am Murloc",
			"whid":1843
		},
		"ice barrier":{
			"name":"Ice Barrier",
			"whid":621
		},
		"ice block":{
			"name":"Ice Block",
			"whid":192
		},
		"ice lance":{
			"name":"Ice Lance",
			"whid":172
		},
		"ice rager":{
			"name":"Ice Rager",
			"whid":2594
		},
		"icehowl":{
			"name":"Icehowl",
			"whid":2725
		},
		"illidan":{
			"name":"Illidan",
			"whid":556
		},
		"illidan stormrage":{
			"name":"Illidan Stormrage",
			"whid":556
		},
		"illuminator":{
			"name":"Illuminator",
			"whid":2057
		},
		"imp gang boss":{
			"name":"Imp Gang Boss",
			"whid":2288
		},
		"imp master":{
			"name":"Imp Master",
			"whid":926
		},
		"imp-losion":{
			"name":"Imp-losion",
			"whid":2013
		},
		"infernal":{
			"name":"Infernal",
			"whid":1143
		},
		"infest":{
			"name":"Infest",
			"whid":38329
		},
		"infested tauren":{
			"name":"Infested Tauren",
			"whid":38784
		},
		"infested wolf":{
			"name":"Infested Wolf",
			"whid":38734
		},
		"injured blademaster":{
			"name":"Injured Blademaster",
			"whid":1109
		},
		"injured kvaldir":{
			"name":"Injured Kvaldir",
			"whid":2502
		},
		"inner fire":{
			"name":"Inner Fire",
			"whid":376
		},
		"inner rage":{
			"name":"Inner Rage",
			"whid":22
		},
		"innervate":{
			"name":"Innervate",
			"whid":254
		},
		"iron juggernaut":{
			"name":"Iron Juggernaut",
			"whid":2024
		},
		"iron sensei":{
			"name":"Iron Sensei",
			"whid":1992
		},
		"ironbark protector":{
			"name":"Ironbark Protector",
			"whid":205
		},
		"ironbeak owl":{
			"name":"Ironbeak Owl",
			"whid":290
		},
		"ironforge portal":{
			"name":"Ironforge Portal",
			"whid":39747
		},
		"ironforge rifleman":{
			"name":"Ironforge Rifleman",
			"whid":339
		},
		"ironfur grizzly":{
			"name":"Ironfur Grizzly",
			"whid":1182
		},
		"ivory knight":{
			"name":"Ivory Knight",
			"whid":39439
		},
		"jaraxxus":{
			"name":"Jaraxxus",
			"whid":777
		},
		"jeeves":{
			"name":"Jeeves",
			"whid":2062
		},
		"jeweled scarab":{
			"name":"Jeweled Scarab",
			"whid":2901
		},
		"journey below":{
			"name":"Journey Below",
			"whid":38393
		},
		"jungle moonkin":{
			"name":"Jungle Moonkin",
			"whid":2923
		},
		"jungle panther":{
			"name":"Jungle Panther",
			"whid":921
		},
		"junkbot":{
			"name":"Junkbot",
			"whid":2074
		},
		"justicar trueheart":{
			"name":"Justicar Trueheart",
			"whid":2736
		},
		"kara kazham!":{
			"name":"Kara Kazham!",
			"whid":39197
		},
		"keeper of the grove":{
			"name":"Keeper of the Grove",
			"whid":601
		},
		"keeper of uldaman":{
			"name":"Keeper of Uldaman",
			"whid":2889
		},
		"kel'thuzad":{
			"name":"Kel'Thuzad",
			"whid":1794
		},
		"kezan mystic":{
			"name":"Kezan Mystic",
			"whid":2042
		},
		"kidnapper":{
			"name":"Kidnapper",
			"whid":287
		},
		"kill command":{
			"name":"Kill Command",
			"whid":296
		},
		"kindly grandmother":{
			"name":"Kindly Grandmother",
			"whid":39481
		},
		"king krush":{
			"name":"King Krush",
			"whid":1144
		},
		"king mukla":{
			"name":"King Mukla",
			"whid":1693
		},
		"king of beasts":{
			"name":"King of Beasts",
			"whid":2014
		},
		"king's defender":{
			"name":"King's Defender",
			"whid":2756
		},
		"king's elekk":{
			"name":"King's Elekk",
			"whid":2635
		},
		"kirin tor mage":{
			"name":"Kirin Tor Mage",
			"whid":748
		},
		"klaxxi amber-weaver":{
			"name":"Klaxxi Amber-Weaver",
			"whid":38621
		},
		"knife juggler":{
			"name":"Knife Juggler",
			"whid":1073
		},
		"knight of the wild":{
			"name":"Knight of the Wild",
			"whid":2788
		},
		"kobold geomancer":{
			"name":"Kobold Geomancer",
			"whid":672
		},
		"kodorider":{
			"name":"Kodorider",
			"whid":2598
		},
		"kor'kron elite":{
			"name":"Kor'kron Elite",
			"whid":28
		},
		"kvaldir raider":{
			"name":"Kvaldir Raider",
			"whid":2511
		},
		"lance carrier":{
			"name":"Lance Carrier",
			"whid":2577
		},
		"laughing sister":{
			"name":"Laughing Sister",
			"whid":340
		},
		"lava burst":{
			"name":"Lava Burst",
			"whid":864
		},
		"lava shock":{
			"name":"Lava Shock",
			"whid":2289
		},
		"lay on hands":{
			"name":"Lay on Hands",
			"whid":594
		},
		"leeroy":{
			"name":"Leeroy",
			"whid":559
		},
		"leeroy jenkins":{
			"name":"Leeroy Jenkins",
			"whid":559
		},
		"leokk":{
			"name":"Leokk",
			"whid":226
		},
		"leper gnome":{
			"name":"Leper Gnome",
			"whid":658
		},
		"light of the naaru":{
			"name":"Light of the Naaru",
			"whid":1933
		},
		"light's champion":{
			"name":"Light's Champion",
			"whid":2259
		},
		"light's justice":{
			"name":"Light's Justice",
			"whid":383
		},
		"lightbomb":{
			"name":"Lightbomb",
			"whid":1938
		},
		"lightning bolt":{
			"name":"Lightning Bolt",
			"whid":505
		},
		"lightning storm":{
			"name":"Lightning Storm",
			"whid":629
		},
		"lightspawn":{
			"name":"Lightspawn",
			"whid":886
		},
		"lightwarden":{
			"name":"Lightwarden",
			"whid":1655
		},
		"lightwell":{
			"name":"Lightwell",
			"whid":797
		},
		"lil' exorcist":{
			"name":"Lil' Exorcist",
			"whid":2065
		},
		"living roots":{
			"name":"Living Roots",
			"whid":2792
		},
		"loatheb":{
			"name":"Loatheb",
			"whid":1914
		},
		"lock and load":{
			"name":"Lock and Load",
			"whid":2484
		},
		"loot hoarder":{
			"name":"Loot Hoarder",
			"whid":251
		},
		"lord jaraxxus":{
			"name":"Lord Jaraxxus",
			"whid":777
		},
		"lord of the arena":{
			"name":"Lord of the Arena",
			"whid":157
		},
		"lorewalker cho":{
			"name":"Lorewalker Cho",
			"whid":1135
		},
		"lost tallstrider":{
			"name":"Lost Tallstrider",
			"whid":2039
		},
		"lowly squire":{
			"name":"Lowly Squire",
			"whid":2486
		},
		"mad bomber":{
			"name":"Mad Bomber",
			"whid":762
		},
		"mad scientist":{
			"name":"Mad Scientist",
			"whid":1783
		},
		"madder bomber":{
			"name":"Madder Bomber",
			"whid":2058
		},
		"maelstrom portal":{
			"name":"Maelstrom Portal",
			"whid":39712
		},
		"maexxna":{
			"name":"Maexxna",
			"whid":1791
		},
		"magma rager":{
			"name":"Magma Rager",
			"whid":1653
		},
		"magnataur alpha":{
			"name":"Magnataur Alpha",
			"whid":2753
		},
		"maiden of the lake":{
			"name":"Maiden of the Lake",
			"whid":2488
		},
		"majordomo executus":{
			"name":"Majordomo Executus",
			"whid":2281
		},
		"mal'ganis":{
			"name":"Mal'Ganis",
			"whid":1986
		},
		"malchezaar's imp":{
			"name":"Malchezaar's Imp",
			"whid":39740
		},
		"malkorok":{
			"name":"Malkorok",
			"whid":38739
		},
		"malorne":{
			"name":"Malorne",
			"whid":2003
		},
		"malygos":{
			"name":"Malygos",
			"whid":436
		},
		"mana addict":{
			"name":"Mana Addict",
			"whid":12
		},
		"mana tide totem":{
			"name":"Mana Tide Totem",
			"whid":513
		},
		"mana wraith":{
			"name":"Mana Wraith",
			"whid":715
		},
		"mana wyrm":{
			"name":"Mana Wyrm",
			"whid":405
		},
		"mark of nature":{
			"name":"Mark of Nature",
			"whid":151
		},
		"mark of the wild":{
			"name":"Mark of the Wild",
			"whid":213
		},
		"mark of y'shaarj":{
			"name":"Mark of Y'Shaarj",
			"whid":38337
		},
		"mass dispel":{
			"name":"Mass Dispel",
			"whid":1366
		},
		"master jouster":{
			"name":"Master Jouster",
			"whid":2507
		},
		"master of ceremonies":{
			"name":"Master of Ceremonies",
			"whid":2493
		},
		"master of disguise":{
			"name":"Master of Disguise",
			"whid":887
		},
		"master of evolution":{
			"name":"Master of Evolution",
			"whid":39008
		},
		"master swordsmith":{
			"name":"Master Swordsmith",
			"whid":351
		},
		"mech-bear-cat":{
			"name":"Mech-Bear-Cat",
			"whid":2002
		},
		"mechanical yeti":{
			"name":"Mechanical Yeti",
			"whid":2046
		},
		"mechwarper":{
			"name":"Mechwarper",
			"whid":1940
		},
		"medivh, the guardian":{
			"name":"Medivh, the Guardian",
			"whid":39841
		},
		"medivh's valet":{
			"name":"Medivh's Valet",
			"whid":39767
		},
		"mekgineer thermaplugg":{
			"name":"Mekgineer Thermaplugg",
			"whid":2084
		},
		"menagerie magician":{
			"name":"Menagerie Magician",
			"whid":39269
		},
		"menagerie warden":{
			"name":"Menagerie Warden",
			"whid":39696
		},
		"metaltooth leaper":{
			"name":"Metaltooth Leaper",
			"whid":2016
		},
		"micro machine":{
			"name":"Micro Machine",
			"whid":2071
		},
		"midnight drake":{
			"name":"Midnight Drake",
			"whid":38957
		},
		"millhouse manastorm":{
			"name":"Millhouse Manastorm",
			"whid":855
		},
		"mimiron's head":{
			"name":"Mimiron's Head",
			"whid":2079
		},
		"mind blast":{
			"name":"Mind Blast",
			"whid":545
		},
		"mind control":{
			"name":"Mind Control",
			"whid":8
		},
		"mind control tech":{
			"name":"Mind Control Tech",
			"whid":734
		},
		"mind vision":{
			"name":"Mind Vision",
			"whid":1099
		},
		"mindgames":{
			"name":"Mindgames",
			"whid":145
		},
		"mini-mage":{
			"name":"Mini-Mage",
			"whid":2077
		},
		"mire keeper":{
			"name":"Mire Keeper",
			"whid":38718
		},
		"mirror entity":{
			"name":"Mirror Entity",
			"whid":195
		},
		"mirror image":{
			"name":"Mirror Image",
			"whid":1084
		},
		"misdirection":{
			"name":"Misdirection",
			"whid":1091
		},
		"misha":{
			"name":"Misha",
			"whid":959
		},
		"mistress of pain":{
			"name":"Mistress of Pain",
			"whid":2172
		},
		"moat lurker":{
			"name":"Moat Lurker",
			"whid":39465
		},
		"mogor the ogre":{
			"name":"Mogor the Ogre",
			"whid":2080
		},
		"mogor's champion":{
			"name":"Mogor's Champion",
			"whid":2491
		},
		"mogu'shan warden":{
			"name":"Mogu'shan Warden",
			"whid":700
		},
		"molten giant":{
			"name":"Molten Giant",
			"whid":1372
		},
		"moonfire":{
			"name":"Moonfire",
			"whid":467
		},
		"moonglade portal":{
			"name":"Moonglade Portal",
			"whid":39714
		},
		"moroes":{
			"name":"Moroes",
			"whid":39453
		},
		"mortal coil":{
			"name":"Mortal Coil",
			"whid":1092
		},
		"mortal strike":{
			"name":"Mortal Strike",
			"whid":804
		},
		"mountain giant":{
			"name":"Mountain Giant",
			"whid":993
		},
		"mounted raptor":{
			"name":"Mounted Raptor",
			"whid":2922
		},
		"mukla":{
			"name":"Mukla",
			"whid":1693
		},
		"mukla, tyrant of the vale":{
			"name":"Mukla, Tyrant of the Vale",
			"whid":38468
		},
		"mukla's champion":{
			"name":"Mukla's Champion",
			"whid":2497
		},
		"mulch":{
			"name":"Mulch",
			"whid":2793
		},
		"multi-shot":{
			"name":"Multi-Shot",
			"whid":292
		},
		"murloc knight":{
			"name":"Murloc Knight",
			"whid":2655
		},
		"murloc raider":{
			"name":"Murloc Raider",
			"whid":191
		},
		"murloc tidecaller":{
			"name":"Murloc Tidecaller",
			"whid":475
		},
		"murloc tidehunter":{
			"name":"Murloc Tidehunter",
			"whid":976
		},
		"murloc tinyfin":{
			"name":"Murloc Tinyfin",
			"whid":13879
		},
		"murloc warleader":{
			"name":"Murloc Warleader",
			"whid":1063
		},
		"museum curator":{
			"name":"Museum Curator",
			"whid":2878
		},
		"muster for battle":{
			"name":"Muster for Battle",
			"whid":2029
		},
		"mysterious challenger":{
			"name":"Mysterious Challenger",
			"whid":2726
		},
		"n'zoth":{
			"name":"N'Zoth",
			"whid":38496
		},
		"n'zoth, the corruptor":{
			"name":"N'Zoth, the Corruptor",
			"whid":38496
		},
		"n'zoth's first mate":{
			"name":"N'Zoth's First Mate",
			"whid":38914
		},
		"naga sea witch":{
			"name":"Naga Sea Witch",
			"whid":2910
		},
		"nat pagle":{
			"name":"Nat Pagle",
			"whid":1147
		},
		"nat, the darkfisher":{
			"name":"Nat, the Darkfisher",
			"whid":39046
		},
		"naturalize":{
			"name":"Naturalize",
			"whid":233
		},
		"nefarian":{
			"name":"Nefarian",
			"whid":2261
		},
		"neptulon":{
			"name":"Neptulon",
			"whid":2010
		},
		"nerub'ar weblord":{
			"name":"Nerub'ar Weblord",
			"whid":1800
		},
		"nerubian egg":{
			"name":"Nerubian Egg",
			"whid":1786
		},
		"nerubian prophet":{
			"name":"Nerubian Prophet",
			"whid":38517
		},
		"netherspite historian":{
			"name":"Netherspite Historian",
			"whid":39554
		},
		"nexus-champion saraad":{
			"name":"Nexus-Champion Saraad",
			"whid":2683
		},
		"nightbane templar":{
			"name":"Nightbane Templar",
			"whid":39477
		},
		"nightblade":{
			"name":"Nightblade",
			"whid":670
		},
		"noble sacrifice":{
			"name":"Noble Sacrifice",
			"whid":584
		},
		"north sea kraken":{
			"name":"North Sea Kraken",
			"whid":2520
		},
		"northshire cleric":{
			"name":"Northshire Cleric",
			"whid":1650
		},
		"nourish":{
			"name":"Nourish",
			"whid":95
		},
		"novice engineer":{
			"name":"Novice Engineer",
			"whid":284
		},
		"nozdormu":{
			"name":"Nozdormu",
			"whid":411
		},
		"nzoth":{
			"name":"NZoth",
			"whid":38496
		},
		"oasis snapjaw":{
			"name":"Oasis Snapjaw",
			"whid":1370
		},
		"obsidian destroyer":{
			"name":"Obsidian Destroyer",
			"whid":2881
		},
		"ogre brute":{
			"name":"Ogre Brute",
			"whid":2033
		},
		"ogre magi":{
			"name":"Ogre Magi",
			"whid":995
		},
		"ogre ninja":{
			"name":"Ogre Ninja",
			"whid":2056
		},
		"ogre warmaul":{
			"name":"Ogre Warmaul",
			"whid":2022
		},
		"old murk-eye":{
			"name":"Old Murk-Eye",
			"whid":736
		},
		"on the hunt":{
			"name":"On the Hunt",
			"whid":38377
		},
		"one-eyed cheat":{
			"name":"One-eyed Cheat",
			"whid":1990
		},
		"onyx bishop":{
			"name":"Onyx Bishop",
			"whid":39374
		},
		"onyxia":{
			"name":"Onyxia",
			"whid":363
		},
		"orgrimmar aspirant":{
			"name":"Orgrimmar Aspirant",
			"whid":2711
		},
		"owl":{
			"name":"Owl",
			"whid":290
		},
		"pagle":{
			"name":"Pagle",
			"whid":1147
		},
		"pantry spider":{
			"name":"Pantry Spider",
			"whid":39207
		},
		"patient assassin":{
			"name":"Patient Assassin",
			"whid":1133
		},
		"perdition's blade":{
			"name":"Perdition's Blade",
			"whid":391
		},
		"piloted shredder":{
			"name":"Piloted Shredder",
			"whid":2064
		},
		"piloted sky golem":{
			"name":"Piloted Sky Golem",
			"whid":2073
		},
		"pint-sized summoner":{
			"name":"Pint-Sized Summoner",
			"whid":37
		},
		"pit fighter":{
			"name":"Pit Fighter",
			"whid":2521
		},
		"pit lord":{
			"name":"Pit Lord",
			"whid":783
		},
		"pit snake":{
			"name":"Pit Snake",
			"whid":2882
		},
		"poison seeds":{
			"name":"Poison Seeds",
			"whid":1802
		},
		"poisoned blade":{
			"name":"Poisoned Blade",
			"whid":2763
		},
		"polluted hoarder":{
			"name":"Polluted Hoarder",
			"whid":38961
		},
		"polymorph":{
			"name":"Polymorph",
			"whid":77
		},
		"polymorph: boar":{
			"name":"Polymorph: Boar",
			"whid":2542
		},
		"pompous thespian":{
			"name":"Pompous Thespian",
			"whid":39476
		},
		"possessed villager":{
			"name":"Possessed Villager",
			"whid":38774
		},
		"power of the horde":{
			"name":"Power of the Horde",
			"whid":1846
		},
		"power of the wild":{
			"name":"Power of the Wild",
			"whid":503
		},
		"power overwhelming":{
			"name":"Power Overwhelming",
			"whid":846
		},
		"power word: glory":{
			"name":"Power Word: Glory",
			"whid":2568
		},
		"power word: shield":{
			"name":"Power Word: Shield",
			"whid":613
		},
		"power word: tentacles":{
			"name":"Power Word: Tentacles",
			"whid":38426
		},
		"powermace":{
			"name":"Powermace",
			"whid":2004
		},
		"powershot":{
			"name":"Powershot",
			"whid":2638
		},
		"preparation":{
			"name":"Preparation",
			"whid":1158
		},
		"priest of the feast":{
			"name":"Priest of the Feast",
			"whid":39442
		},
		"priestess of elune":{
			"name":"Priestess of Elune",
			"whid":424
		},
		"primal fusion":{
			"name":"Primal Fusion",
			"whid":38262
		},
		"prince malchezaar":{
			"name":"Prince Malchezaar",
			"whid":39840
		},
		"princess huhuran":{
			"name":"Princess Huhuran",
			"whid":38910
		},
		"prophet velen":{
			"name":"Prophet Velen",
			"whid":9
		},
		"protect the king!":{
			"name":"Protect the King!",
			"whid":39495
		},
		"psych-o-tron":{
			"name":"Psych-o-Tron",
			"whid":38526
		},
		"puddlestomper":{
			"name":"Puddlestomper",
			"whid":2032
		},
		"purify":{
			"name":"Purify",
			"whid":39468
		},
		"pyroblast":{
			"name":"Pyroblast",
			"whid":1087
		},
		"quartermaster":{
			"name":"Quartermaster",
			"whid":2028
		},
		"questing adventurer":{
			"name":"Questing Adventurer",
			"whid":791
		},
		"quick shot":{
			"name":"Quick Shot",
			"whid":2260
		},
		"raging worgen":{
			"name":"Raging Worgen",
			"whid":1155
		},
		"ragnaros":{
			"name":"Ragnaros",
			"whid":374
		},
		"ragnaros the firelord":{
			"name":"Ragnaros the Firelord",
			"whid":374
		},
		"ragnaros, lightlord":{
			"name":"Ragnaros, Lightlord",
			"whid":38758
		},
		"raid leader":{
			"name":"Raid Leader",
			"whid":1401
		},
		"rallying blade":{
			"name":"Rallying Blade",
			"whid":38745
		},
		"ram wrangler":{
			"name":"Ram Wrangler",
			"whid":2552
		},
		"rampage":{
			"name":"Rampage",
			"whid":1108
		},
		"ravaging ghoul":{
			"name":"Ravaging Ghoul",
			"whid":38530
		},
		"raven idol":{
			"name":"Raven Idol",
			"whid":13335
		},
		"ravenholdt assassin":{
			"name":"Ravenholdt Assassin",
			"whid":134
		},
		"razorfen hunter":{
			"name":"Razorfen Hunter",
			"whid":257
		},
		"reckless rocketeer":{
			"name":"Reckless Rocketeer",
			"whid":445
		},
		"recombobulator":{
			"name":"Recombobulator",
			"whid":2076
		},
		"recruiter":{
			"name":"Recruiter",
			"whid":2509
		},
		"recycle":{
			"name":"Recycle",
			"whid":1995
		},
		"redemption":{
			"name":"Redemption",
			"whid":140
		},
		"refreshment vendor":{
			"name":"Refreshment Vendor",
			"whid":2704
		},
		"reincarnate":{
			"name":"Reincarnate",
			"whid":1809
		},
		"reliquary seeker":{
			"name":"Reliquary Seeker",
			"whid":13334
		},
		"rend blackhand":{
			"name":"Rend Blackhand",
			"whid":2308
		},
		"reno":{
			"name":"Reno",
			"whid":2883
		},
		"reno jackson":{
			"name":"Reno Jackson",
			"whid":2883
		},
		"renounce darkness":{
			"name":"Renounce Darkness",
			"whid":38461
		},
		"repentance":{
			"name":"Repentance",
			"whid":232
		},
		"resurrect":{
			"name":"Resurrect",
			"whid":2298
		},
		"revenge":{
			"name":"Revenge",
			"whid":2296
		},
		"rhino":{
			"name":"Rhino",
			"whid":699
		},
		"rhonin":{
			"name":"Rhonin",
			"whid":2546
		},
		"river crocolisk":{
			"name":"River Crocolisk",
			"whid":1369
		},
		"rockbiter":{
			"name":"Rockbiter",
			"whid":239
		},
		"rockbiter weapon":{
			"name":"Rockbiter Weapon",
			"whid":239
		},
		"rogues do it":{
			"name":"Rogues Do It",
			"whid":1845
		},
		"rumbling elemental":{
			"name":"Rumbling Elemental",
			"whid":2888
		},
		"runic egg":{
			"name":"Runic Egg",
			"whid":39433
		},
		"sabotage":{
			"name":"Sabotage",
			"whid":2015
		},
		"saboteur":{
			"name":"Saboteur",
			"whid":2576
		},
		"sacred trial":{
			"name":"Sacred Trial",
			"whid":2899
		},
		"sacrificial pact":{
			"name":"Sacrificial Pact",
			"whid":163
		},
		"salty dog":{
			"name":"Salty Dog",
			"whid":2038
		},
		"sap":{
			"name":"Sap",
			"whid":461
		},
		"saraad":{
			"name":"Saraad",
			"whid":2683
		},
		"savage combatant":{
			"name":"Savage Combatant",
			"whid":2780
		},
		"savage roar":{
			"name":"Savage Roar",
			"whid":742
		},
		"savagery":{
			"name":"Savagery",
			"whid":481
		},
		"savannah highmane":{
			"name":"Savannah Highmane",
			"whid":1261
		},
		"scaled nightmare":{
			"name":"Scaled Nightmare",
			"whid":38832
		},
		"scarlet crusader":{
			"name":"Scarlet Crusader",
			"whid":642
		},
		"scarlet purifier":{
			"name":"Scarlet Purifier",
			"whid":2069
		},
		"scavenging hyena":{
			"name":"Scavenging Hyena",
			"whid":1281
		},
		"screwjank clunker":{
			"name":"Screwjank Clunker",
			"whid":2023
		},
		"sea giant":{
			"name":"Sea Giant",
			"whid":211
		},
		"sea reaver":{
			"name":"Sea Reaver",
			"whid":2717
		},
		"seal of champions":{
			"name":"Seal of Champions",
			"whid":2723
		},
		"seal of light":{
			"name":"Seal of Light",
			"whid":2025
		},
		"secretkeeper":{
			"name":"Secretkeeper",
			"whid":158
		},
		"selfless hero":{
			"name":"Selfless Hero",
			"whid":38740
		},
		"sen'jin shieldmasta":{
			"name":"Sen'jin Shieldmasta",
			"whid":635
		},
		"sense demons":{
			"name":"Sense Demons",
			"whid":860
		},
		"servant of yogg-saron":{
			"name":"Servant of Yogg-Saron",
			"whid":38414
		},
		"shade of naxxramas":{
			"name":"Shade of Naxxramas",
			"whid":1784
		},
		"shado-pan rider":{
			"name":"Shado-Pan Rider",
			"whid":2765
		},
		"shadow bolt":{
			"name":"Shadow Bolt",
			"whid":914
		},
		"shadow madness":{
			"name":"Shadow Madness",
			"whid":220
		},
		"shadow strike":{
			"name":"Shadow Strike",
			"whid":38578
		},
		"shadow word: death":{
			"name":"Shadow Word: Death",
			"whid":1363
		},
		"shadow word: horror":{
			"name":"Shadow Word: Horror",
			"whid":38433
		},
		"shadow word: pain":{
			"name":"Shadow Word: Pain",
			"whid":1367
		},
		"shadowbomber":{
			"name":"Shadowbomber",
			"whid":1937
		},
		"shadowboxer":{
			"name":"Shadowboxer",
			"whid":2040
		},
		"shadowcaster":{
			"name":"Shadowcaster",
			"whid":38876
		},
		"shadowfiend":{
			"name":"Shadowfiend",
			"whid":2566
		},
		"shadowflame":{
			"name":"Shadowflame",
			"whid":147
		},
		"shadowform":{
			"name":"Shadowform",
			"whid":1368
		},
		"shadowstep":{
			"name":"Shadowstep",
			"whid":365
		},
		"shady dealer":{
			"name":"Shady Dealer",
			"whid":2768
		},
		"shatter":{
			"name":"Shatter",
			"whid":38407
		},
		"shattered sun cleric":{
			"name":"Shattered Sun Cleric",
			"whid":608
		},
		"shield block":{
			"name":"Shield Block",
			"whid":1023
		},
		"shield slam":{
			"name":"Shield Slam",
			"whid":546
		},
		"shieldbearer":{
			"name":"Shieldbearer",
			"whid":866
		},
		"shielded minibot":{
			"name":"Shielded Minibot",
			"whid":2026
		},
		"shieldmaiden":{
			"name":"Shieldmaiden",
			"whid":2021
		},
		"shieldmasta":{
			"name":"Shieldmasta",
			"whid":635
		},
		"shifter zerus":{
			"name":"Shifter Zerus",
			"whid":38475
		},
		"shifting shade":{
			"name":"Shifting Shade",
			"whid":39034
		},
		"ship's cannon":{
			"name":"Ship's Cannon",
			"whid":2043
		},
		"shiv":{
			"name":"Shiv",
			"whid":573
		},
		"shrinkmeister":{
			"name":"Shrinkmeister",
			"whid":1936
		},
		"si:7 agent":{
			"name":"SI:7 Agent",
			"whid":1117
		},
		"sideshow spelleater":{
			"name":"Sideshow Spelleater",
			"whid":2573
		},
		"siege engine":{
			"name":"Siege Engine",
			"whid":2054
		},
		"silence":{
			"name":"Silence",
			"whid":1189
		},
		"silent knight":{
			"name":"Silent Knight",
			"whid":2579
		},
		"silithid swarmer":{
			"name":"Silithid Swarmer",
			"whid":38304
		},
		"siltfin spiritwalker":{
			"name":"Siltfin Spiritwalker",
			"whid":2008
		},
		"silver hand knight":{
			"name":"Silver Hand Knight",
			"whid":69
		},
		"silver hand regent":{
			"name":"Silver Hand Regent",
			"whid":2503
		},
		"silverback patriarch":{
			"name":"Silverback Patriarch",
			"whid":67
		},
		"silvermoon guardian":{
			"name":"Silvermoon Guardian",
			"whid":34
		},
		"silvermoon portal":{
			"name":"Silvermoon Portal",
			"whid":39716
		},
		"silverware golem":{
			"name":"Silverware Golem",
			"whid":39380
		},
		"sinister strike":{
			"name":"Sinister Strike",
			"whid":710
		},
		"siphon soul":{
			"name":"Siphon Soul",
			"whid":1100
		},
		"sir finley mrrgglton":{
			"name":"Sir Finley Mrrgglton",
			"whid":2948
		},
		"skeram cultist":{
			"name":"Skeram Cultist",
			"whid":39118
		},
		"skycap'n kragg":{
			"name":"Skycap'n Kragg",
			"whid":2757
		},
		"slam":{
			"name":"Slam",
			"whid":1074
		},
		"sludge belcher":{
			"name":"Sludge Belcher",
			"whid":1793
		},
		"snake trap":{
			"name":"Snake Trap",
			"whid":455
		},
		"sneed's old shredder":{
			"name":"Sneed's Old Shredder",
			"whid":2082
		},
		"snipe":{
			"name":"Snipe",
			"whid":814
		},
		"snowchugger":{
			"name":"Snowchugger",
			"whid":1928
		},
		"soggoth the slitherer":{
			"name":"Soggoth the Slitherer",
			"whid":39119
		},
		"solemn vigil":{
			"name":"Solemn Vigil",
			"whid":2274
		},
		"soot spewer":{
			"name":"Soot Spewer",
			"whid":2249
		},
		"sorcerer's apprentice":{
			"name":"Sorcerer's Apprentice",
			"whid":614
		},
		"soul of the forest":{
			"name":"Soul of the Forest",
			"whid":381
		},
		"soulfire":{
			"name":"Soulfire",
			"whid":974
		},
		"southsea captain":{
			"name":"Southsea Captain",
			"whid":680
		},
		"southsea deckhand":{
			"name":"Southsea Deckhand",
			"whid":724
		},
		"southsea squidface":{
			"name":"Southsea Squidface",
			"whid":38825
		},
		"sparring partner":{
			"name":"Sparring Partner",
			"whid":2733
		},
		"spawn of n'zoth":{
			"name":"Spawn of N'Zoth",
			"whid":38797
		},
		"spawn of shadows":{
			"name":"Spawn of Shadows",
			"whid":2551
		},
		"spectral knight":{
			"name":"Spectral Knight",
			"whid":1789
		},
		"spellbender":{
			"name":"Spellbender",
			"whid":366
		},
		"spellbreaker":{
			"name":"Spellbreaker",
			"whid":754
		},
		"spellslinger":{
			"name":"Spellslinger",
			"whid":2571
		},
		"spider tank":{
			"name":"Spider Tank",
			"whid":2012
		},
		"spirit claws":{
			"name":"Spirit Claws",
			"whid":39694
		},
		"spiteful smith":{
			"name":"Spiteful Smith",
			"whid":61
		},
		"spreading madness":{
			"name":"Spreading Madness",
			"whid":38456
		},
		"sprint":{
			"name":"Sprint",
			"whid":630
		},
		"squirming tentacle":{
			"name":"Squirming Tentacle",
			"whid":39003
		},
		"stablemaster":{
			"name":"Stablemaster",
			"whid":2639
		},
		"stalagg":{
			"name":"Stalagg",
			"whid":1796
		},
		"stampeding kodo":{
			"name":"Stampeding Kodo",
			"whid":1371
		},
		"stand against darkness":{
			"name":"Stand Against Darkness",
			"whid":38843
		},
		"starfall":{
			"name":"Starfall",
			"whid":86
		},
		"starfire":{
			"name":"Starfire",
			"whid":823
		},
		"starving buzzard":{
			"name":"Starving Buzzard",
			"whid":1241
		},
		"steamwheedle sniper":{
			"name":"Steamwheedle Sniper",
			"whid":2055
		},
		"steward of darkshire":{
			"name":"Steward of Darkshire",
			"whid":38911
		},
		"stoneskin gargoyle":{
			"name":"Stoneskin Gargoyle",
			"whid":1861
		},
		"stonesplinter trogg":{
			"name":"Stonesplinter Trogg",
			"whid":2035
		},
		"stonetusk boar":{
			"name":"Stonetusk Boar",
			"whid":648
		},
		"stormcrack":{
			"name":"Stormcrack",
			"whid":38724
		},
		"stormforged axe":{
			"name":"Stormforged Axe",
			"whid":960
		},
		"stormpike commando":{
			"name":"Stormpike Commando",
			"whid":413
		},
		"stormwind champion":{
			"name":"Stormwind Champion",
			"whid":753
		},
		"stormwind knight":{
			"name":"Stormwind Knight",
			"whid":622
		},
		"stranglethorn tiger":{
			"name":"Stranglethorn Tiger",
			"whid":68
		},
		"succubus":{
			"name":"Succubus",
			"whid":592
		},
		"summoning portal":{
			"name":"Summoning Portal",
			"whid":969
		},
		"summoning stone":{
			"name":"Summoning Stone",
			"whid":2958
		},
		"sunfury protector":{
			"name":"Sunfury Protector",
			"whid":891
		},
		"sunwalker":{
			"name":"Sunwalker",
			"whid":759
		},
		"swashburglar":{
			"name":"Swashburglar",
			"whid":39698
		},
		"swipe":{
			"name":"Swipe",
			"whid":64
		},
		"sword of justice":{
			"name":"Sword of Justice",
			"whid":643
		},
		"sylvanas":{
			"name":"Sylvanas",
			"whid":1721
		},
		"sylvanas windrunner":{
			"name":"Sylvanas Windrunner",
			"whid":1721
		},
		"target dummy":{
			"name":"Target Dummy",
			"whid":2061
		},
		"tauren warrior":{
			"name":"Tauren Warrior",
			"whid":45
		},
		"taz'dingo":{
			"name":"Taz'dingo",
			"whid":635
		},
		"temple enforcer":{
			"name":"Temple Enforcer",
			"whid":1364
		},
		"tentacle of n'zoth":{
			"name":"Tentacle of N'Zoth",
			"whid":38532
		},
		"tentacles for arms":{
			"name":"Tentacles for Arms",
			"whid":38279
		},
		"thaddius":{
			"name":"Thaddius",
			"whid":1798
		},
		"thalnos":{
			"name":"Thalnos",
			"whid":749
		},
		"the beast":{
			"name":"The Beast",
			"whid":962
		},
		"the boogeymonster":{
			"name":"The Boogeymonster",
			"whid":38895
		},
		"the coin":{
			"name":"The Coin",
			"whid":1746
		},
		"the curator":{
			"name":"The Curator",
			"whid":39225
		},
		"the mistcaller":{
			"name":"The Mistcaller",
			"whid":2618
		},
		"the skeleton knight":{
			"name":"The Skeleton Knight",
			"whid":2681
		},
		"thing from below":{
			"name":"Thing from Below",
			"whid":38267
		},
		"thistle tea":{
			"name":"Thistle Tea",
			"whid":38395
		},
		"thoughtsteal":{
			"name":"Thoughtsteal",
			"whid":30
		},
		"thrallmar farseer":{
			"name":"Thrallmar Farseer",
			"whid":765
		},
		"thunder bluff valiant":{
			"name":"Thunder Bluff Valiant",
			"whid":2615
		},
		"timber wolf":{
			"name":"Timber Wolf",
			"whid":606
		},
		"tinker's sharpsword oil":{
			"name":"Tinker's Sharpsword Oil",
			"whid":2095
		},
		"tinkertown technician":{
			"name":"Tinkertown Technician",
			"whid":2070
		},
		"tinkmaster":{
			"name":"Tinkmaster",
			"whid":570
		},
		"tinkmaster overspark":{
			"name":"Tinkmaster Overspark",
			"whid":570
		},
		"tiny knight of evil":{
			"name":"Tiny Knight of Evil",
			"whid":2777
		},
		"tirion":{
			"name":"Tirion",
			"whid":890
		},
		"tirion fordring":{
			"name":"Tirion Fordring",
			"whid":890
		},
		"tomb pillager":{
			"name":"Tomb Pillager",
			"whid":2884
		},
		"tomb spider":{
			"name":"Tomb Spider",
			"whid":2919
		},
		"toshley":{
			"name":"Toshley",
			"whid":2083
		},
		"totem golem":{
			"name":"Totem Golem",
			"whid":2610
		},
		"totemic might":{
			"name":"Totemic Might",
			"whid":830
		},
		"tournament attendee":{
			"name":"Tournament Attendee",
			"whid":2499
		},
		"tournament medic":{
			"name":"Tournament Medic",
			"whid":2575
		},
		"tracking":{
			"name":"Tracking",
			"whid":1047
		},
		"trade prince gallywix":{
			"name":"Trade Prince Gallywix",
			"whid":1993
		},
		"tree of life":{
			"name":"Tree of Life",
			"whid":2001
		},
		"troggzor the earthinator":{
			"name":"Troggzor the Earthinator",
			"whid":2086
		},
		"truesilver champion":{
			"name":"Truesilver Champion",
			"whid":847
		},
		"tundra rhino":{
			"name":"Tundra Rhino",
			"whid":699
		},
		"tunnel trogg":{
			"name":"Tunnel Trogg",
			"whid":2890
		},
		"tuskarr jouster":{
			"name":"Tuskarr Jouster",
			"whid":2504
		},
		"tuskarr totemic":{
			"name":"Tuskarr Totemic",
			"whid":2513
		},
		"twilight darkmender":{
			"name":"Twilight Darkmender",
			"whid":38429
		},
		"twilight drake":{
			"name":"Twilight Drake",
			"whid":1037
		},
		"twilight elder":{
			"name":"Twilight Elder",
			"whid":38868
		},
		"twilight flamecaller":{
			"name":"Twilight Flamecaller",
			"whid":38409
		},
		"twilight geomancer":{
			"name":"Twilight Geomancer",
			"whid":38864
		},
		"twilight guardian":{
			"name":"Twilight Guardian",
			"whid":2569
		},
		"twilight summoner":{
			"name":"Twilight Summoner",
			"whid":38833
		},
		"twilight whelp":{
			"name":"Twilight Whelp",
			"whid":2286
		},
		"twin emperor vek'lor":{
			"name":"Twin Emperor Vek'lor",
			"whid":38488
		},
		"twisted worgen":{
			"name":"Twisted Worgen",
			"whid":38781
		},
		"twisting nether":{
			"name":"Twisting Nether",
			"whid":859
		},
		"unbound elemental":{
			"name":"Unbound Elemental",
			"whid":774
		},
		"undercity huckster":{
			"name":"Undercity Huckster",
			"whid":39026
		},
		"undercity valiant":{
			"name":"Undercity Valiant",
			"whid":2767
		},
		"undertaker":{
			"name":"Undertaker",
			"whid":1910
		},
		"unearthed raptor":{
			"name":"Unearthed Raptor",
			"whid":2891
		},
		"unleash the hounds":{
			"name":"Unleash the Hounds",
			"whid":1243
		},
		"unstable ghoul":{
			"name":"Unstable Ghoul",
			"whid":1808
		},
		"unstable portal":{
			"name":"Unstable Portal",
			"whid":1929
		},
		"upgrade":{
			"name":"Upgrade",
			"whid":511
		},
		"upgraded repair bot":{
			"name":"Upgraded Repair Bot",
			"whid":2051
		},
		"usher of souls":{
			"name":"Usher of Souls",
			"whid":38898
		},
		"uth":{
			"name":"UTH",
			"whid":1243
		},
		"v-07-tr-0n":{
			"name":"V-07-TR-0N",
			"whid":2232
		},
		"validated doomsayer":{
			"name":"Validated Doomsayer",
			"whid":38669
		},
		"vancleef":{
			"name":"VanCleef",
			"whid":306
		},
		"vanish":{
			"name":"Vanish",
			"whid":196
		},
		"vaporize":{
			"name":"Vaporize",
			"whid":286
		},
		"varian":{
			"name":"Varian",
			"whid":2760
		},
		"varian wrynn":{
			"name":"Varian Wrynn",
			"whid":2760
		},
		"velen's chosen":{
			"name":"Velen's Chosen",
			"whid":1935
		},
		"venture co. mercenary":{
			"name":"Venture Co. Mercenary",
			"whid":1122
		},
		"vilefin inquisitor":{
			"name":"Vilefin Inquisitor",
			"whid":38227
		},
		"violet illusionist":{
			"name":"Violet Illusionist",
			"whid":39313
		},
		"violet teacher":{
			"name":"Violet Teacher",
			"whid":1029
		},
		"vitality totem":{
			"name":"Vitality Totem",
			"whid":2007
		},
		"void crusher":{
			"name":"Void Crusher",
			"whid":2537
		},
		"void terror":{
			"name":"Void Terror",
			"whid":1221
		},
		"voidcaller":{
			"name":"Voidcaller",
			"whid":1806
		},
		"voidwalker":{
			"name":"Voidwalker",
			"whid":48
		},
		"vol'jin":{
			"name":"Vol'jin",
			"whid":1931
		},
		"volcanic drake":{
			"name":"Volcanic Drake",
			"whid":2258
		},
		"volcanic lumberer":{
			"name":"Volcanic Lumberer",
			"whid":2295
		},
		"voltron":{
			"name":"Voltron",
			"whid":2232
		},
		"voodoo doctor":{
			"name":"Voodoo Doctor",
			"whid":132
		},
		"wailing soul":{
			"name":"Wailing Soul",
			"whid":1799
		},
		"war golem":{
			"name":"War Golem",
			"whid":712
		},
		"warbot":{
			"name":"Warbot",
			"whid":2019
		},
		"warhorse trainer":{
			"name":"Warhorse Trainer",
			"whid":2515
		},
		"warsong commander":{
			"name":"Warsong Commander",
			"whid":1009
		},
		"water elemental":{
			"name":"Water Elemental",
			"whid":395
		},
		"webspinner":{
			"name":"Webspinner",
			"whid":1860
		},
		"wee spellstopper":{
			"name":"Wee Spellstopper",
			"whid":2234
		},
		"whirling zap-o-matic":{
			"name":"Whirling Zap-o-matic",
			"whid":2005
		},
		"whirlwind":{
			"name":"Whirlwind",
			"whid":636
		},
		"wicked witchdoctor":{
			"name":"Wicked Witchdoctor",
			"whid":39190
		},
		"wild growth":{
			"name":"Wild Growth",
			"whid":1124
		},
		"wild pyromancer":{
			"name":"Wild Pyromancer",
			"whid":1014
		},
		"wildwalker":{
			"name":"Wildwalker",
			"whid":2786
		},
		"wilfred fizzlebang":{
			"name":"Wilfred Fizzlebang",
			"whid":2621
		},
		"windfury":{
			"name":"Windfury",
			"whid":51
		},
		"windfury harpy":{
			"name":"Windfury Harpy",
			"whid":567
		},
		"windspeaker":{
			"name":"Windspeaker",
			"whid":178
		},
		"wisp":{
			"name":"Wisp",
			"whid":179
		},
		"wisps of the old gods":{
			"name":"Wisps of the Old Gods",
			"whid":38655
		},
		"wobbling runts":{
			"name":"Wobbling Runts",
			"whid":2961
		},
		"wolfrider":{
			"name":"Wolfrider",
			"whid":289
		},
		"worgen infiltrator":{
			"name":"Worgen Infiltrator",
			"whid":994
		},
		"wrath":{
			"name":"Wrath",
			"whid":836
		},
		"wrathguard":{
			"name":"Wrathguard",
			"whid":2623
		},
		"wyrmrest agent":{
			"name":"Wyrmrest Agent",
			"whid":2596
		},
		"xaril, poisoned mind":{
			"name":"Xaril, Poisoned Mind",
			"whid":38403
		},
		"y'shaarj":{
			"name":"Y'Shaarj",
			"whid":38312
		},
		"y'shaarj, rage unbound":{
			"name":"Y'Shaarj, Rage Unbound",
			"whid":38312
		},
		"yogg":{
			"name":"Yogg",
			"whid":38505
		},
		"yogg-saron":{
			"name":"Yogg-Saron",
			"whid":38505
		},
		"yogg-saron, hope's end":{
			"name":"Yogg-Saron, Hope's End",
			"whid":38505
		},
		"young dragonhawk":{
			"name":"Young Dragonhawk",
			"whid":641
		},
		"young priestess":{
			"name":"Young Priestess",
			"whid":1634
		},
		"youthful brewmaster":{
			"name":"Youthful Brewmaster",
			"whid":415
		},
		"ysera":{
			"name":"Ysera",
			"whid":1186
		},
		"yshaarj":{
			"name":"YShaarj",
			"whid":38312
		},
		"zealous initiate":{
			"name":"Zealous Initiate",
			"whid":38541
		},
		"zombie chow":{
			"name":"Zombie Chow",
			"whid":1753
		},
		"zoobot":{
			"name":"Zoobot",
			"whid":39839
		}
	}
}