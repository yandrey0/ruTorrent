/*
 *      Main object.
 *
 */

var theWebUI =
{
        version: "5.0",
	tables:
	{
		trt:
		{
			obj: new dxSTable(),
			columns:
			[
				{ text: theUILang.Name, 		width: "315px", id: "name",		type: TYPE_STRING }, 
		      		{ text: theUILang.Status, 		width: "100px",	id: "status",		type: TYPE_STRING },
		   		{ text: theUILang.Size, 		width: "70px",	id: "size", 		type: TYPE_NUMBER },
				{ text: theUILang.Files,		width: "35px",  id: "num_files",	type: TYPE_NUMBER },
	   			{ text: theUILang.Done, 		width: "102px",	id: "done",		type: TYPE_PROGRESS },
				{ text: theUILang.Downloaded, 		width: "70px",	id: "downloaded",	type: TYPE_NUMBER },
				{ text: theUILang.Uploaded, 		width: "70px",	id: "uploaded",		type: TYPE_NUMBER },
				{ text: theUILang.Ratio, 		width: "60px",	id: "ratio",		type: TYPE_NUMBER },
				{ text: theUILang.DL, 			width: "70px", 	id: "dl",		type: TYPE_NUMBER },
				{ text: theUILang.UL, 			width: "70px", 	id: "ul",		type: TYPE_NUMBER },
				{ text: theUILang.Peers, 		width: "60px", 	id: "peers",		type: TYPE_PEERS, 	"align" : ALIGN_CENTER },
				{ text: theUILang.Seeds, 		width: "60px", 	id: "seeds",		type: TYPE_SEEDS, 	"align" : ALIGN_CENTER },
				{ text: theUILang.Remaining, 		width: "70px", 	id: "remaining",	type: TYPE_NUMBER },
				{ text: theUILang.ETA, 			width: "60px", 	id: "eta",		type: TYPE_NUMBER },
				{ text: theUILang.Priority, 		width: "80px", 	id: "priority",		type: TYPE_NUMBER },
				{ text: theUILang.Created_on,		width: "110px", id: "created",		type: TYPE_NUMBER },
				{ text: 'Добавлен',			width: '110px', id: 'addtime',		type: TYPE_NUMBER},
				{ text: 'Старт',			width: '110px', id: 'started',		type: TYPE_NUMBER},
				{ text: 'Завершен',			width: '60px', id: 'finished',		type: TYPE_NUMBER},
				{ text: theUILang.Save_path,		width: "200px", id: "save_path",	type: TYPE_STRING },
				{ text: theUILang.Label, 		width: "120px",	id: "label",		type: TYPE_STRING },
				{ text: theUILang.Tracker,		width: '110px', id: 'tracker',		type: TYPE_STRING}
			],
			container:	"List",
			format:		theFormatter.torrents,
			ondelete:	function() { theWebUI.remove(); },
  	                onselect:	function(e,id) { theWebUI.trtSelect(e,id) },
			ondblclick:	function(obj) { theWebUI.showDetails(obj.id); return(false); }
		},
		fls:
		{
			obj: new dxSTable(),
			columns:
			[
				{ text: theUILang.Name, 		width: "400px",	id: "name",		type: TYPE_STRING },
				{ text: theUILang.Size, 		width: "80px", 	id: "size",		type: TYPE_NUMBER },
				{ text: theUILang.Done, 		width: "80px",  id: "done",		type: TYPE_NUMBER },
				{ text: "%", 				width: "202px",	id: "percent",		type: TYPE_PROGRESS },
				{ text: theUILang.Priority, 		width: "100px",	id: "priority",		type: TYPE_NUMBER }
			],
			container:	"FileList",
			format:		theFormatter.files,
			onselect:	function(e,id) { theWebUI.flsSelect(e,id) },
			ondblclick:	function(obj)
			{
				if(!theWebUI.settings["webui.fls.view"] && (theWebUI.dID!=""))
				{
					var lnk = this.getAttr(obj.id, "link");
		                	if(lnk!=null)
		                	{
		                		theWebUI.dirs[theWebUI.dID].setDirectory(lnk);
						this.clearRows();
				    		theWebUI.redrawFiles(theWebUI.dID);
					}
				}
				return(false);
			}
		},
		trk:
		{
			obj: new dxSTable(),
			columns:
			[
				{ text: theUILang.Name,			width: "350px", id: "name",		type: TYPE_STRING },
				{ text: theUILang.Type, 		width: "40px", 	id: "type",		type: TYPE_STRING, 	"align" : ALIGN_RIGHT},
				{ text: theUILang.Enabled, 		width: "60px", 	id: "enabled",		type: TYPE_STRING, 	"align" : ALIGN_RIGHT},
				{ text: theUILang.Group, 		width: "60px", 	id: "group",		type: TYPE_NUMBER },
				{ text: theUILang.Seeds, 		width: "50px", 	id: "seeds",		type: TYPE_NUMBER },
				{ text: theUILang.Peers, 		width: "50px", 	id: "peers",		type: TYPE_NUMBER },
				{ text: theUILang.scrapeDownloaded,	width: "80px", 	id: "downloaded",	type: TYPE_NUMBER },
				{ text: theUILang.scrapeUpdate + " S",	width: "90px", 	id: "last",		type: TYPE_NUMBER },
				{ text: theUILang.scrapeUpdate,		width: "90px", 	id: "slast",		type: TYPE_NUMBER },
				{ text: theUILang.trkInterval,		width: "80px", 	id: "interval",		type: TYPE_NUMBER },
				{ text: theUILang.Peers + " (новые)",	width: "60px", 	id: "lpeers",		type: TYPE_PEERS, 	"align" : ALIGN_RIGHT},
				{ text: "Последняя активность",		width: "110px",	id: "alast",		type: TYPE_NUMBER },
				{ text: "Следующая активность",		width: "110px",	id: "anext",		type: TYPE_NUMBER },
				{ text: "Неудачи",			width: "60px", 	id: "err",		type: TYPE_NUMBER },
				{ text: "Удачи",			width: "60px", 	id: "ok",		type: TYPE_NUMBER },
				{ text: "Событие",			width: "80px", 	id: "levent",		type: TYPE_NUMBER },
				{ text: theUILang.trkPrivate, 		width: "60px", 	id: "private",		type: TYPE_STRING, 	"align" : ALIGN_RIGHT}
			],

			container:	"TrackerList",
			format:		theFormatter.trackers,
			onselect:	function(e,id) { theWebUI.trkSelect(e,id) }
		},
		prs:
		{
			obj: new dxSTable(),
			columns:
			[
				{ text: 'Страна',			width: "300px", id: "country",		type: TYPE_STRING },
				{ text: theUILang.Address,		width: "100px", id: "name",		type: TYPE_STRING },
				{ text: theUILang.Listening_Port,	width: "50px",  id: "port",		type: TYPE_NUMBER },
				{ text: theUILang.ClientVersion,	width: "150px", id: "version",		type: TYPE_STRING },
				{ text: 'Peer ID',			width: "150px", id: "id",		type: TYPE_STRING },
				{ text: theUILang.Flags, 		width: "60px", 	id: "flags",		type: TYPE_STRING, 	"align" : ALIGN_RIGHT},
				{ text: theUILang.Done, 		width: "102px", id: "done",		type: TYPE_PROGRESS },
				{ text: theUILang.Downloaded, 		width: "70px",  id: "downloaded",	type: TYPE_NUMBER },
				{ text: theUILang.Uploaded, 		width: "70px",  id: "uploaded",		type: TYPE_NUMBER },
				{ text: theUILang.DL, 			width: "70px", 	id: "dl",		type: TYPE_NUMBER },
				{ text: theUILang.UL, 			width: "70px", 	id: "ul",		type: TYPE_NUMBER },
                                { text: theUILang.PeerDL, 		width: "70px", 	id: "peerdl",		type: TYPE_NUMBER },
                                { text: theUILang.PeerDownloaded, 	width: "70px",  id: "peerdownloaded",	type: TYPE_NUMBER },
                                { text: 'ASN', 				width: "200px", id: "asn",		type: TYPE_STRING },
                                { text: 'Time Zone',			width: "120px", id: "timezone",		type: TYPE_STRING }
			],
			container:	"PeerList",
			format:		theFormatter.peers,
			onselect:	function(e,id) { theWebUI.prsSelect(e,id) },
			ondblclick:	function(obj)
			{
				if(obj.id && theWebUI.peers[obj.id])
					window.open(theURLs.IPQUERYURL + theWebUI.peers[obj.id].ip.replace(/^\[?(.+?)\]?$/, '$1'), "_blank");
				return(false);
			}
		},
		plg:
		{
			obj: new dxSTable(),
			columns:
			[
				{ text: theUILang.plgName,		width: "150px", id: "name",		type: TYPE_STRING },
				{ text: theUILang.plgVersion,		width: "60px",	id: "version",		type: TYPE_NUMBER },
				{ text: theUILang.plgStatus, 		width: "80px", 	id: "status",		type: TYPE_STRING, 	"align" : ALIGN_RIGHT},
				{ text: theUILang.plgLaunch,		width: "80px", 	id: "launch",		type: TYPE_STRING, 	"align" : ALIGN_RIGHT},
				{ text: theUILang.plgAuthor,		width: "100px",	id: "author",		type: TYPE_STRING },
				{ text: theUILang.plgDescr,		width: "500px",	id: "descr",		type: TYPE_STRING }
			],
			container:	"PluginList",
			format:		theFormatter.plugins,
			onselect:	function(e,id) { theWebUI.plgSelect(e,id) }
		}
	},
	settings:
	{
		"webui.fls.view":		0,
		"webui.show_cats":		1,
		"webui.show_dets":		1,
		"webui.needmessage":		1,
		"webui.reqtimeout":		30000,
		"webui.confirm_when_deleting":	1,
		"webui.alternate_color":	0,
		"webui.update_interval":	3000,
		"webui.hsplit":			0.88,
		"webui.vsplit":			0.5,
		"webui.effects":		0,
		"webui.fullrows":		0,
		"webui.no_delaying_draw":	1,
		"webui.search":			-1,
		"webui.speedlistdl":		"128,512,1024,2048,3072,4096,5120,6144,7168,8192,9216,10240",
		"webui.speedlistul":		"128,512,1024,2048,3072,4096,5120,6144,7168,8192,9216,10240",
		"webui.ignore_timeouts":	0,
		"webui.retry_on_error":		120,
		"webui.closed_panels":		{},
		"webui.timeformat":		0,
		"webui.dateformat":		0,
		"webui.speedintitle":		0,
		"webui.log_autoswitch":		1,
		"webui.show_labelsize":		1,
		"webui.register_magnet":	0
	},
	showFlags: 0,
	total:
	{
		rateDL: 	0,
		rateUL: 	0,
		speedDL: 	0,
		speedUL: 	0,
		totalDL: 	0,
		totalUL: 	0,
		DL: 		0,
		UL: 		0,
		DHT:		{},
		openHT:		0,
		openSK:		0
	},
	sTimer: 	null,
	updTimer: 	null,
	configured:	false,
	jsonLoaded:	false,
	pluginsLoaded: false,
	firstLoad:	true,
	interval:	-1,
	torrents:	{},
	files:		{},
	dirs:		{},
	trackers:	{},
	props:		{},
	peers:		{},
	labels:
	{
		"-_-_-all-_-_-":	0,
		"-_-_-dls-_-_-":	0,
		"-_-_-sed-_-_-":	0,
		"-_-_-com-_-_-":	0,
		"-_-_-stp-_-_-":	0,
		"-_-_-pus-_-_-":	0,
		"-_-_-act-_-_-":	0,
		"-_-_-iac-_-_-":	0,
		"-_-_-chk-_-_-":	0,
		"-_-_-que-_-_-":	0,
		"-_-_-nlb-_-_-":	0,
		"-_-_-err-_-_-":	0
	},
	actLbls:
	{
		"pstate_cont": ""
	},
	cLabels:	{},
	dID:		"",
	pID:		"",
	url:		window.location.href.substr(0,window.location.href.lastIndexOf("/")+1),
	timer:		new Timer(),
	activeView:	null,
	delmode:	"remove",
	tegs:		{},
	lastTeg:	0,
	deltaTime:	0,
	serverDeltaTime:0,

//
// init
//

	init: function()
	{
       		log("WebUI started.");
		this.setStatusUpdate();
		if(browser.isOldIE)
			this.msg(theUILang.Doesnt_support);
		else
		{
			this.catchErrors(false);
			this.getUISettings();
			this.getPlugins();
		}
	},

	assignEvents: function()
	{
		window.onresize = theWebUI.resize;
		window.onorientationchange = theWebUI.resize;
		$(document).on("dragstart",function(e) { return(false); } );
		$(document).on("selectstart",function(e) { return(e.fromTextCtrl); });
		$(document).on("contextmenu",function(e)
		{
			if(e.fromTextCtrl)
				theContextMenu.hide();
			else
				return(false);
		});
		var keyEvent = function (e)
		{
			switch(e.which)
			{
		   		case 27 : 				// Esc
		   		{
		   			if(theContextMenu.hide() || theDialogManager.hideTopmost())
						return(false);
		   			break;
		   		}
		   		case 79 : 				// ^O
   				{
					if(e.metaKey && !theDialogManager.isModalState())
   					{
						theWebUI.showAdd();
						return(false);
      					}
		   			break;
				}
				case 80 :                               // ^P
				{
					if(e.metaKey && !theDialogManager.isModalState())
					{
						theWebUI.showSettings();
						return(false);
      					}
		   			break;
				}
		  		case 112:				// F1
   				{
   				        if((!browser.isOpera || !e.fromTextCtrl) && !theDialogManager.isModalState())
   				        {
			   		        theDialogManager.show(e.metaKey ? "dlgAbout" : "dlgHelp");
						return(false);
					}
		   		}
				case 115 : 				// F4
				{
					if(!browser.isOpera || !e.fromTextCtrl)
					{
						theWebUI.toggleMenu();
						return(false);
					}
				}
				case 117 :                      	// F6
				{
				        if(!browser.isOpera || !e.fromTextCtrl)
				        {
						theWebUI.toggleDetails();
						return(false);
					}
				}
				case 118 :                      	// F7
				{
				        if(!browser.isOpera || !e.fromTextCtrl)
				        {
						theWebUI.toggleCategories();
						return(false);
					}
				}
			}
		};

		$(document).on( browser.isOpera ? 'keypress' : 'keydown', keyEvent);
	},

	updateServerTime: function()
	{
		$('#servertime').text(theConverter.date( (new Date().getTime()-theWebUI.serverDeltaTime)/1000, true ));
	},

	getPlugins: function()
	{
		this.requestWithoutTimeout("?action=getplugins", [this.loadPlugins, this]);
	},

	getUISettings: function()
	{
		this.requestWithoutTimeout("?action=getuisettings", [this.initSettings, this], true);
	},

	loadPlugins: function()
	{
		if(thePlugins.isInstalled("_getdir"))
		{
			$('#dir_edit').after($("<input type=button>").addClass("Button").attr("id","dir_btn").on('focus', function() { this.blur(); } ));
			var btn = new this.rDirBrowser( 'tadd', 'dir_edit', 'dir_btn' );
			theDialogManager.setHandler('tadd','afterHide',function()
			{
				btn.hide();
			});
		}
		correctContent();
//		this.updateServerTime();
//		window.setInterval( this.updateServerTime, 1000 );
		
		// Mark plugins as done loading. Initialize UI if JSON file is loaded
		this.pluginsLoaded = true;
		this.initFinish();
	},

	initFinish: function()
	{
		// Loading JSON settings and plugins are done in an asynchronous fashion
		// We must wait until both of these are completed before preceding
		// Otherwise, the WebUI and plugins will not initialize properly
		if (this.jsonLoaded && this.pluginsLoaded)
		{
			this.config();
			this.catchErrors(true);
			this.assignEvents();
			this.resize();
			this.update();	
		}
	},

	config: function()
	{
		$.each(this.tables, function(ndx,table)
		{
		        var width = theWebUI.settings["webui."+ndx+".colwidth"];
		        var enabled = theWebUI.settings["webui."+ndx+".colenabled"];
			$.each(table.columns, function(i,col)
			{
				if(width && i<width.length && width[i]>4)
					col.width = width[i];
				if(enabled && i<enabled.length)
					col.enabled = enabled[i];
			});
			table.obj.format = table.format;
			table.obj.onresize = theWebUI.save;
			table.obj.onmove = theWebUI.save;
			table.obj.ondblclick = table.ondblclick;
			table.obj.onselect = table.onselect;
			table.obj.ondelete = table.ondelete;
			table.obj.colorEvenRows = theWebUI.settings["webui.alternate_color"];
			table.obj.maxRows = iv(theWebUI.settings["webui.fullrows"]);
			table.obj.noDelayingDraw = iv(theWebUI.settings["webui.no_delaying_draw"]);
			if($type(theWebUI.settings["webui."+ndx+".sindex"]))
				table.obj.sIndex = iv(theWebUI.settings["webui."+ndx+".sindex"]);
			if($type(theWebUI.settings["webui."+ndx+".rev"]))
				table.obj.reverse = iv(theWebUI.settings["webui."+ndx+".rev"]);
			if($type(theWebUI.settings["webui."+ndx+".sindex2"]))
				table.obj.secIndex = iv(theWebUI.settings["webui."+ndx+".sindex2"]);
			if($type(theWebUI.settings["webui."+ndx+".rev2"]))
				table.obj.secRev = iv(theWebUI.settings["webui."+ndx+".rev2"]);
			if($type(theWebUI.settings["webui."+ndx+".colorder"]))
				table.obj.colOrder = theWebUI.settings["webui."+ndx+".colorder"];
			table.obj.onsort = function()
			{
   				if( (this.sIndex != theWebUI.settings["webui."+this.prefix+".sindex"]) ||
		   			(this.reverse != theWebUI.settings["webui."+this.prefix+".rev"]) ||
					(this.secIndex != theWebUI.settings["webui."+this.prefix+".sindex2"]) ||
		   			(this.secRev != theWebUI.settings["webui."+this.prefix+".rev2"]))
		      			theWebUI.save();
			}
		});
		var table = this.getTable("fls");
		table.oldFilesSortAlphaNumeric = table.sortAlphaNumeric;
		table.sortAlphaNumeric = function(x, y)
		{
			if(!theWebUI.settings["webui.fls.view"] && theWebUI.dID)
			{
			        var dir = theWebUI.dirs[theWebUI.dID];
			        var a = dir.dirs[dir.current][x.key];
			        var b = dir.dirs[dir.current][y.key];
		        	if((a.data.name=="..") ||
				   ((a.link!=null) && (b.link==null)))
					return(this.reverse ? 1 : -1);
				if((b.data.name=="..") ||
				   ((b.link!=null) && (a.link==null)))
					return(this.reverse ? -1 : 1);
			}
			return(this.oldFilesSortAlphaNumeric(x,y));
		}
		table.oldFilesSortNumeric = table.sortNumeric;
		table.sortNumeric = function(x, y)
		{
			if(!theWebUI.settings["webui.fls.view"] && theWebUI.dID)
			{
			        var dir = theWebUI.dirs[theWebUI.dID];
			        var a = dir.dirs[dir.current][x.key];
			        var b = dir.dirs[dir.current][y.key];
		        	if((a.data.name=="..") ||
				   ((a.link!=null) && (b.link==null)))
					return(this.reverse ? 1 : -1);
				if((b.data.name=="..") ||
				   ((b.link!=null) && (a.link==null)))
					return(this.reverse ? -1 : 1);
			}
			return(this.oldFilesSortNumeric(x,y));
		}
		if(!this.settings["webui.show_cats"])
			$("#CatList").hide();
		if(!this.settings["webui.show_dets"])
		{
			$("#tdetails").hide();
			if(!theWebUI.systemInfo.rTorrent.started)
				this.toggleDetails();
		}
		theDialogManager.setEffects( iv(this.settings["webui.effects"])*200 );
//		this.setStatusUpdate();
		$.each(this.tables, function(ndx,table)
		{
			table.obj.create($$(table.container), table.columns, ndx);
		});
		table = this.getTable("plg");
		if(table)
		{
			$.each( thePlugins.list, function(ndx,plugin)
			{
				table.addRowById(
				{
					name: plugin.name,
					version: plugin.version,
					author: plugin.author,
					descr: plugin.descr,
					status: plugin.enabled ? 1 : 0,
					launch: plugin.launched ? (plugin.canBeLaunched() ? 1 : 2) : 0
				}, "_plg_"+plugin.name);
			});
		}
		if(!theWebUI.systemInfo.rTorrent.started)
			$(theWebUI.getTable("trt").scp).text(theUILang.noTorrentList).show();
		$(".catpanel").each( function()
		{
			theWebUI.showPanel(this,!theWebUI.settings["webui.closed_panels"][this.id]);
		});

		// user must be able add peer when peers are empty
		$("#PeerList .stable-body").mouseclick(function(e)
		{
			if(e.which==3)
			{
				theWebUI.prsSelect(e,null);
				return(true);
			}
			return(false);
		});

		this.registerMagnetHandler();
		this.configured = true;
	},

	registerMagnetHandler: function()
	{
		if(typeof navigator.registerProtocolHandler == 'function')
		{
			var url = window.location.href.substr(0,window.location.href.lastIndexOf("/")) + "/php/addtorrent.php?url=%s";
			if( ((typeof navigator.isProtocolHandlerRegistered != 'function') ||
				!navigator.isProtocolHandlerRegistered('magnet', url)) &&
				theWebUI.settings["webui.register_magnet"])
			{
				navigator.registerProtocolHandler("magnet", url, "RuTorrent");
			}
		}
		else
		{
			$($$('webui.register_magnet')).attr('disabled',true);
			$($$('lbl_webui.register_magnet')).addClass('disabled');
		}
	},

	setStatusUpdate: function()
	{
		if(this.sTimer)
		{
			window.clearInterval(this.sTimer);
			this.sTimer = null;
		}
		this.sTimer = window.setInterval(this.updateStatus, iv(theWebUI.settings["webui.update_interval"]));
	},

//
// plugins
//

	showPluginsMenu: function()
	{
		theContextMenu.clear();
		for( var item in thePlugins.topMenu )
			thePlugins.get(thePlugins.topMenu[item].name).createPluginMenu();
        	var offs = $("#plugins").offset();
		theContextMenu.show(offs.left-5,offs.top+5+$("#plugins").height());
	},

	plgSelect: function(e, id)
	{
		if($type(id) && (e.which==3))
		{
		        theContextMenu.clear();
		        if(this.getTable("plg").selCount > 1)
		        {
				theContextMenu.add([theUILang.plgShutdown, "theWebUI.plgShutdown()"]);
				theContextMenu.add([CMENU_CHILD, theUILang.plgLaunch,
					[
						[theUILang.EnableTracker, "theWebUI.plgLaunch(true)"],
						[theUILang.DisableTracker, "theWebUI.plgLaunch(false)"]
					]]);
			}
			else
			{
				var plugin = thePlugins.get(id.substr(5));
				theContextMenu.add([theUILang.plgShutdown, (plugin.enabled && plugin.canShutdown()) ? "theWebUI.plgShutdown()" : null]);
				theContextMenu.add([CMENU_CHILD, theUILang.plgLaunch,
					[
						[theUILang.EnableTracker, !plugin.launched && plugin.canBeLaunched() ? "theWebUI.plgLaunch(true)" : null],
						[theUILang.DisableTracker, plugin.launched && plugin.canBeLaunched() ? "theWebUI.plgLaunch(false)" : null]
					]]);
				if(plugin.help)
				{
					theContextMenu.add([CMENU_SEP]);
					theContextMenu.add([theUILang.Help, "window.open('"+plugin.help+"', '_blank')" ]);
				}
			}
	   		theContextMenu.show();
			return(true);
		}
		return(false);
   	},

	plgShutdown : function()
	{
		var table = this.getTable("plg");
   		var sr = table.rowSel;
   		var str = "";
   		for(var k in sr)
   		{
      			if(sr[k])
      			{
      				var name = k.substr(5);
	      			var plugin = thePlugins.get(name);
      			        if(plugin.enabled && plugin.canShutdown())
            				str += "&hash=" + name;
         		}
      		}
		if(str.length>0)
	      		this.request("?action=doneplugins&s=done" + str, [this.plgRefresh, this]);
        },

	plgLaunch : function(enable)
	{
		var table = this.getTable("plg");
   		var sr = table.rowSel;
   		var str = "";
   		for(var k in sr)
   		{
      			if(sr[k])
      			{
      				var name = k.substr(5);
	      			var plugin = thePlugins.get(name);
      			        if( (enable ^ plugin.launched) && plugin.canBeLaunched())
            				str += "&hash=" + name;
         		}
      		}
		if(str.length>0)
	      		this.request("?action=doneplugins&s="+(enable ? "launch" : "unlaunch") + str, [this.plgRefresh, this]);
        },

        plgRefresh : function()
        {
        	table = this.getTable("plg");
		$.each( thePlugins.list, function(ndx,plugin)
		{
			table.setValueById( "_plg_"+plugin.name, "status", plugin.enabled ? 1 : 0 );
			table.setValueById( "_plg_"+plugin.name, "launch", plugin.launched ? (plugin.canBeLaunched() ? 1 : 2) : 0 );
		});
        },

//
// settings
//

	initSettings: function(newSettings)
	{
		// Add webui settings for the first time
		this.addSettings(newSettings);
		
		// Mark JSON file as loaded. Initialize UI if plugins are loaded
		this.jsonLoaded = true;
		this.initFinish();
	},
	
	addSettings: function(newSettings)
	{
		$.each(newSettings, function(i,v)
		{
			switch(v)
			{
				case "true":
				case "auto":
				case "on":
				{
					newSettings[i] = 1;
					break;
				}
				case "false":
				{
					newSettings[i] = 0;
					break;
				}
         		}
		});
		$.extend(this.settings,newSettings);
   		this.loadSettings();
   	},

	loadSettings: function()
	{
		$.each(this.settings, function(i,v)
		{
		        var o = $$(i);
			if(o)
			{
				o = $(o);
				if(o.is("input:checkbox"))
					o.prop('checked',(v!=0));
				else
				{
					switch(i)
					{
					        case "max_memory_usage":
              						v /= 1024;
						case "upload_rate":
						case "download_rate":
              						v /= 1024;
	          					v = Math.ceil(v);
					}
					o.val(v);
				}
				o.trigger('change');
			}
		});
		if($type(this.settings["webui.search"]))
			theSearchEngines.set(this.settings["webui.search"],true);
   	},

	setSettings: function()
	{
	        var req = '';
	        var needSave = false;
		var needResize = false;
		var reply = null;
		$.each(this.settings, function(i,v)
		{
		        var o = $$(i);
			if(o)
			{
				o = $(o);
				var nv = o.is("input:checkbox") ? (o.prop('checked') ? 1 : 0) : o.val();
				switch(i)
				{
				        case "max_memory_usage":
						nv *= 1024;
					case "upload_rate":
					case "download_rate":
						nv *= 1024;
				}
				if(nv!=v)
				{
					if((/^webui\./).test(i))
					{
						needSave = true;
						switch(i)
						{
						        case "webui.effects":
						        {
								theDialogManager.setEffects( iv(nv)*200 );
								break;
							}
							case "webui.alternate_color":
							{
								$.each(theWebUI.tables, function(ndx,table)
								{
							  		table.obj.colorEvenRows = nv;
						     			table.obj.refreshSelection();
								});
								break;
							}
							case "webui.show_cats":
							{
								$("#CatList").toggle();
								needResize = true;
								break;
							}
							case "webui.show_dets":
							{
								$("#tdetails").toggle();
								needResize = true;
								break;
							}
							case "webui.register_magnet":
							{
								reply = theWebUI.reload;
								break;
							}
							case "webui.fullrows":
							{
								$.each(theWebUI.tables, function(ndx,table)
								{
						      			table.obj.maxRows = iv(nv);
						      			table.obj.refreshRows();
								});
								break;
							}
							case "webui.no_delaying_draw":
							{
								$.each(theWebUI.tables, function(ndx,table)
								{
						      			table.obj.noDelayingDraw = iv(nv);
								});
								break;
							}
							case "webui.update_interval":
							{
								theWebUI.settings["webui.update_interval"] = nv;
								if(theWebUI.systemInfo.rTorrent.started)
									theWebUI.resetInterval();
								break;
							}
						}
					}
					else
					{
						var k_type = o.is("input:checkbox") || o.is("select") || o.hasClass("num") ? "n" : "s";
						req+=("&s="+k_type+i+"&v="+nv);
					}
					theWebUI.settings[i] = nv;
				}
			}
		});
		if(needResize)
			this.resize();
		if((req.length>0) && theWebUI.systemInfo.rTorrent.started)
	      		this.request("?action=setsettings" + req,null,true);
		if(needSave)
			this.save(reply);
   	},

   	reload: function()
   	{
		window.location.reload();
   	},

   	showSettings: function()
	{
		if($("#stg").is(":visible"))
			theDialogManager.hide("stg");
		else
		{
			if(this.systemInfo.rTorrent.started)
		   		this.request("?action=getsettings", [this.addAndShowSettings, this], true);
			else
				this.addAndShowSettings();
		}
   	},

	addAndShowSettings: function(data)
	{
	        if(data)
			this.addSettings(data);
		theDialogManager.show("stg");
	},

        save: function(reply)
	{
	        if(!theWebUI.configured)
			return;
	        $.each(theWebUI.tables, function(ndx,table)
		{
	   		var width = [];
	   		var enabled = [];
	   		for(i = 0; i < table.obj.cols; i++)
   			{
      				width.push( table.obj.getColWidth(i) );
	      			enabled.push( table.obj.isColumnEnabled(i) );
			}
			theWebUI.settings["webui."+ndx+".colwidth"] = width;
			theWebUI.settings["webui."+ndx+".colenabled"] = enabled;
			theWebUI.settings["webui."+ndx+".colorder"] = table.obj.colOrder;
			theWebUI.settings["webui."+ndx+".sindex"] = table.obj.sIndex;
			theWebUI.settings["webui."+ndx+".rev"] = table.obj.reverse;
			theWebUI.settings["webui."+ndx+".sindex2"] = table.obj.secIndex;
			theWebUI.settings["webui."+ndx+".rev2"] = table.obj.secRev;
		});
	        var cookie = {};
	        theWebUI.settings["webui.search"] = theSearchEngines.current;
	        $.each(theWebUI.settings, function(i,v)
		{
			if((/^webui\./).test(i))
				cookie[i] = v;
		});
		theWebUI.request("?action=setuisettings&v=" + JSON.stringify(cookie),reply);
	},

//
// peers
//

	updatePeers: function()
	{
		if(this.activeView=='PeerList')
		{
			if(this.dID != "")
				this.request("?action=getpeers&hash="+this.dID,[this.addPeers, this]);
			else
				this.clearPeers();
		}
	},

	clearPeers: function()
	{
		this.getTable("prs").clearRows();
		for(var k in this.peers)
      			delete this.peers[k];
		this.peers = {};
	},

	addPeers: function(data)
	{
   		var table = this.getTable("prs");
   		$.extend(this.peers,data);
   		$.each(data,function(id,peer)
		{
//			peer.name = peer.name+':'+peer.port
			if(!$type(table.rowdata[id]))
				table.addRowById(peer, id, peer.icon, peer.attr);
        		else 
			{
				for(var i in peer)
        	       			table.setValueById(id, i, peer[i]);
				table.setIcon(id,peer.icon);
				table.setAttr(id,peer.attr);
			}
			peer._updated = true;
		});
		for(var k in this.peers)
		{
			if(!this.peers[k]._updated)
			{
        			delete this.peers[k];
	        	 	table.removeRow(k);
	        	}
			else
				this.peers[k]._updated = false;
		}
		table.Sort();
	},

	prsSelect: function(e, id)
	{
		if(theWebUI.createPeerMenu(e, id))
	   		theContextMenu.show();
   	},

	getPeerIds: function(cmd)
	{
   		var sr = this.getTable("prs").rowSel;
   		var str = "";
   		for(var k in sr)
   		{
			var enabled = ((cmd=='unsnub') && this.peers[k].snubbed) ||
				((cmd=='snub') && !this.peers[k].snubbed) || ((cmd=='ban') || (cmd=='kick'));
      			if((sr[k] == true) && enabled)
				str += "&f=" + k;
      		}
   		return(str);
   	},

	addNewPeer: function()
	{
		this.request("?action=addpeer&hash="+this.dID+"&f="+encodeURIComponent($("#peerIP").val()), [this.updatePeers,this]);
	},

	addNewTracker: function()
	{
		this.request("?action=addtracker&hash="+this.dID+"&p="+encodeURIComponent($("#trackerGroup").val())+"&f="+encodeURIComponent($("#trackerURL").val()));
	},

	setPeerState: function(cmd)
	{
   		var prs = this.getPeerIds(cmd);
		if(prs.length)
	   		this.request("?action="+cmd+"&hash="+this.dID+prs, [this.updatePeers,this]);
	},

   	createPeerMenu : function(e, id)
	{
   		var ret = false;
   		if(e.which == 3)
		{
	   		theContextMenu.clear();
			var selCount = theWebUI.getTable("prs").selCount;
	   		if(this.dID && $type(this.torrents[this.dID]))
   			{
				theContextMenu.add([theUILang.peerAdd,
					(this.torrents[this.dID].private==0) &&
					this.isTorrentCommandEnabled('addpeer',this.dID) &&
					(theWebUI.systemInfo.rTorrent.iVersion>=0x804) ?
					"theDialogManager.show('padd')"	: null]);
				ret = true;
				if(selCount && theWebUI.systemInfo.rTorrent.iVersion>=0x807)
				{
					theContextMenu.add([theUILang.peerBan, this.isTorrentCommandEnabled('ban',this.dID) ? "theWebUI.setPeerState('ban')" : null]);
					theContextMenu.add([theUILang.peerKick, this.isTorrentCommandEnabled('kick',this.dID) ? "theWebUI.setPeerState('kick')" : null]);
		   			if(selCount > 1)
	   				{
						theContextMenu.add([theUILang.peerSnub, this.isTorrentCommandEnabled('snub',this.dID) ? "theWebUI.setPeerState('snub')" : null]);
						theContextMenu.add([theUILang.peerUnsnub, this.isTorrentCommandEnabled('unsnub',this.dID) ? "theWebUI.setPeerState('unsnub')" : null]);
					}
					else if (this.peers[id])
	                {
      					if(!this.peers[id].snubbed)
      						theContextMenu.add([theUILang.peerSnub, this.isTorrentCommandEnabled('snub',this.dID) ? "theWebUI.setPeerState('snub')" : null]);
						else
							theContextMenu.add([theUILang.peerUnsnub, this.isTorrentCommandEnabled('unsnub',this.dID) ? "theWebUI.setPeerState('unsnub')" : null]);
	      			}
		        	theContextMenu.add([CMENU_SEP]);
				}
			}
			if(selCount)
			{
				theContextMenu.add([theUILang.peerDetails, (selCount > 1) ? null : "theWebUI.getTable('prs').ondblclick({ id: '"+id+"'})"]);
			}
		}
		return(ret);
   	},

//
// trackers
//

	trkIsPrivate: function(url)
	{
		return(
			(/(http|https|udp):\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}((:(\d){2,5})|).*(\/a.*(\?.+=.+|\/.+)|\?.+=.+)/i).test(url) ||
			(/(http|https|udp):\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}((:(\d){2,5})|)\/.*[0-9a-z]{8,32}\/a/i).test(url) ||
			(/(http|https|udp):\/\/[a-z0-9-\.]+\.[a-z]{2,253}((:(\d){2,5})|).*(\/a.*(\?.+=.+|\/.+)|\?.+=.+)/i).test(url) ||
			(/(http|https|udp):\/\/[a-z0-9-\.]+\.[a-z]{2,253}((:(\d){2,5})|)\/.*[0-9a-z]{8,32}\/a/i).test(url) ? 1 : 0 );
	},

   	trkSelect: function(e, id)
	{
		if($type(id))
		{
			var arr = id.split('_t_');
	   		var ind = iv(arr[1]);
   			if(theWebUI.createTrackerMenu(e, ind))
		   		theContextMenu.show();
		}
   	},

   	getTrackers: function(hash)
	{
      		this.request("?action=gettrackers&hash=" + hash, [this.addTrackers, this]);
   	},

	getAllTrackers: function(arr)
	{
		var req = "?action=getalltrackers";
		for(var i=0; i<arr.length; i++)
			req+=("&hash=" + arr[i]);
		if(arr.length)
	      		this.request(req, [this.addTrackers, this]);
   	},

	addTrackers: function(data)
	{
   		var table = this.getTable("trk");
		$.each(data,function(hash,trk)
		{
			for(var i = 0; i < trk.length; i++)
			{
				trk[i].private = theWebUI.trkIsPrivate(trk[i].name);
				if(theWebUI.dID == hash)
				{
					var sId = hash + "_t_" + i;
        	 			if(!$type(table.rowdata[sId]) )
            					table.addRowById(trk[i], sId, trk[i].icon, trk[i].attr);
        	 			else
         				{
            					for(var j in trk[i])
        	       					table.setValueById(sId, j, trk[i][j]);
						table.setIcon(sId,trk[i].icon);
						table.setAttr(sId,trk[i].attr);
	            			}
					trk[i]._updated = true;
//	        	 		$('#'+sId+" > .stable-TrackerList-col-0").css( "font-weight",
//			        	 	($type(theWebUI.torrents[hash]) && (i==theWebUI.torrents[hash].tracker_focus)) ? "bold" : "normal" );
        	 		}
			}
	   	});
   		$.extend(this.trackers,data);
	   	var rowIDs = table.rowIDs.slice(0);
		for(var i in rowIDs)
		{
			var arr = rowIDs[i].split('_t_');
			var hash = arr[0];
			if(this.dID != hash)
         			table.removeRow(rowIDs[i]);
         		else
         		{
         			var no = arr[1];
				if(!$type(this.trackers[hash][no]))
	         			table.removeRow(rowIDs[i]);
				else
         			if(!this.trackers[hash][no]._updated)
         			{
	         			table.removeRow(rowIDs[i]);
	         			delete this.trackers[hash][no];
		        	 	this.trackers[hash].splice(no,1);
				}
         			else
	         			this.trackers[hash][no]._updated = false;
			}
      		}
		table.Sort();
      		this.updateDetails();
   	},

   	createTrackerMenu : function(e, ind)
	{
   		if(e.which!=3)
      			return(false);
   		theContextMenu.clear();
   		if( this.dID && $type(this.trackers[this.dID]) )
   		{
	   		if(this.getTable("trk").selCount > 1)
   			{
      				theContextMenu.add([theUILang.EnableTracker, this.isTorrentCommandEnabled('trkstate',this.dID) ? "theWebUI.setTrackerState('" + this.dID + "',1)" : null]);
      				theContextMenu.add([theUILang.DisableTracker, this.isTorrentCommandEnabled('trkstate',this.dID) ? "theWebUI.setTrackerState('" + this.dID + "',0)" : null]);
	      		}
   			else
   			{
      				if(this.trackers[this.dID][ind].enabled == 0)
	      			{
      					theContextMenu.add([theUILang.EnableTracker, this.isTorrentCommandEnabled('trkstate',this.dID) ? "theWebUI.setTrackerState('" + this.dID + "',1)" : null]);
	      				theContextMenu.add([theUILang.DisableTracker]);
         			}
	      			else
      				{
	      				theContextMenu.add([theUILang.EnableTracker]);
      					theContextMenu.add([theUILang.DisableTracker, this.isTorrentCommandEnabled('trkstate',this.dID) ? "theWebUI.setTrackerState('" + this.dID + "',0)" : null]);
	         		}
      			}
			if(theWebUI.systemInfo.rTorrent.iVersion>=0x809)
			{
		   		theContextMenu.add([CMENU_SEP]);
				theContextMenu.add([theUILang.updateTracker, this.isTorrentCommandEnabled("updateTracker",this.dID) ? "theWebUI.updateTracker()" : null]);
				theContextMenu.add(["Добавить трекер", this.isTorrentCommandEnabled("addtracker",this.dID) ? "theDialogManager.show('tradd')" : null]);
			}
		}
		return(true);
   	},

	setTrackerState: function(id, swtch)
	{
   		var trk = this.getTrackerIds(id, swtch);
   		this.request("?action=settrackerstate&hash=" + id + "&p=" + swtch + trk);
   	},

	getTrackerIds: function(id, swtch)
	{
		var table = this.getTable("trk");
   		var sr = table.rowSel;
   		var str = "";
   		var needSort = false;
   		for(var k in sr)
   		{
      			if(sr[k])
      			{
				var arr = k.split('_t_');
         			var i = iv(arr[1]);
         			if(this.trackers[id][i].enabled != swtch)
         			{
            				str += "&f=" + i;
            				this.trackers[id][i].enabled = swtch;
            				needSort = true;
            				table.setValueById(id + "_t_" + i, "enabled", swtch);
            			}
         		}
      		}
      		if(needSort)
			table.Sort();
   		return(str);
   	},

//
// files
//

	updateFiles: function(hash)
	{
	        if(this.dID == hash)
	        {
      			this.getFiles(hash, true);
      			this.updateDetails();
		}
   	},

	redrawFiles: function(hash)
	{
		if(this.dID == hash)
      		{
	      		var table = this.getTable("fls");
	      		for(var i in this.files[hash])
      			{
       				var sId = hash + "_f_" + i;
       				var file = this.files[hash][i];
       				file.percent = (file.size > 0) ? theConverter.round((file.done/file.size)*100,1): "100.0";
         			if(this.settings["webui.fls.view"])
         			{
					if(!$type(table.rowdata[sId]))
        	          			table.addRowById(file, sId, file.icon, file.attr);
            				else
            				{
	            				for(var j in file)
               						table.setValueById(sId, j, file[j]);
						table.setIcon(sId,file.icon);
						table.setAttr(sId,file.attr);
					}
				}
				else
				{
					if(!$type(this.dirs[hash]))
						this.dirs[hash] = new rDirectory();
					this.dirs[hash].addFile(file, i);
				}
			}
			if(!this.settings["webui.fls.view"] && this.dirs[hash])
			{
				var dir = this.dirs[hash].getDirectory();
				for(var i in dir)
				{
					var entry = dir[i];
					if(entry.link!=null)
					{
						if(!$type(table.rowdata[i]))
						        table.addRowById(entry.data, i, entry.icon, {link : entry.link});
						else
	            					for(var j in entry.data)
               							table.setValueById(i, j, entry.data[j]);
					}
				}
				for(var i in dir)
				{
					var entry = dir[i];
					if(entry.link==null)
					{
						if(!$type(table.rowdata[i]))
						        table.addRowById(entry.data, i, entry.icon, {link : null});
						else
	            					for(var j in entry.data)
               							table.setValueById(i, j, entry.data[j]);
					}
				}
			}
			table.Sort();
       	 	}
	},

	getFiles: function(hash, isUpdate)
	{
		var table = this.getTable("fls");
   		if(!isUpdate)
   		{
      			table.dBody.scrollTop = 0;
      			$(table.tpad).height(0);
      			$(table.bpad).height(0);
       			table.clearRows();
      		}
   		if($type(this.files[hash]) && !isUpdate)
      			this.redrawFiles(hash);
   		else
   		{
      			if(!$type(this.files[hash]))
         			this.files[hash] = new Array(0);
      			this.request("?action=getfiles&hash=" + hash, [this.addFiles, this]);
      		}
   	},

	addFiles: function(data)
	{
		$.extend(this.files,data);
		for( var hash in data )
	      		this.redrawFiles(hash);
   	},

	flsSelect: function(e, id)
	{
		if($type(id))
		{
	   		var p = null;
	   		if(theWebUI.settings["webui.fls.view"])
			{
				var arr = id.split('_f_');
		   		p = theWebUI.files[theWebUI.dID][iv(arr[1])];
			}
			else
				p = theWebUI.dirs[theWebUI.dID].getEntry(id);
   			if(theWebUI.createFileMenu(e, p))
				theContextMenu.show();
		}
   	},

	createFileMenu: function(e, p)
	{
   		if(e.which!=3)
      			return(false);
   		var id = this.dID;
   		theContextMenu.clear();
		var _bf = [];
		var table = this.getTable("fls");
		if(table.selCount > 1)
   		{
      			_bf.push([theUILang.High_priority, "theWebUI.setPriority('" + id + "',2)"]);
			_bf.push([theUILang.Normal_priority, "theWebUI.setPriority('" + id + "',1)"]);
			_bf.push([CMENU_SEP]);
			_bf.push([theUILang.Dont_download, "theWebUI.setPriority('" + id + "',0)"]);
		}
   		else
	   		if(p!=null)
   			{
   			       	_bf.push([theUILang.High_priority, (p.priority == 2) ? null : "theWebUI.setPriority('" + id + "',2)"]);
	   	        	_bf.push([theUILang.Normal_priority, (p.priority == 1) ? null : "theWebUI.setPriority('" + id + "',1)"]);
	   		        _bf.push([CMENU_SEP]);
   			        _bf.push([theUILang.Dont_download, (p.priority == 0) ? null : "theWebUI.setPriority('" + id + "',0)"]);
	      		}
	      	if(_bf.length && this.isTorrentCommandEnabled('setprio',this.dID) )
	      		theContextMenu.add([CMENU_CHILD, theUILang.Priority, _bf]);
		else
			theContextMenu.add([theUILang.Priority]);

		if(theWebUI.systemInfo.rTorrent.iVersion>=0x809)
		{
			_bf = [];
			if(table.selCount > 1)
   			{
				_bf.push([theUILang.prioritizeNormal, "theWebUI.setPrioritize('" + id + "',0)"]);
				_bf.push([CMENU_SEP]);
      				_bf.push([theUILang.prioritizeFirst, "theWebUI.setPrioritize('" + id + "',1)"]);
				_bf.push([theUILang.prioritizeLast, "theWebUI.setPrioritize('" + id + "',2)"]);
			}
   			else
	   			if(p!=null)
	   			{
					_bf.push([theUILang.prioritizeNormal, !p.prioritize ? null : "theWebUI.setPrioritize('" + id + "',0)"]);
					_bf.push([CMENU_SEP]);
      					_bf.push([theUILang.prioritizeFirst, (p.prioritize == 1) ? null : "theWebUI.setPrioritize('" + id + "',1)"]);
					_bf.push([theUILang.prioritizeLast, (p.prioritize == 2) ? null : "theWebUI.setPrioritize('" + id + "',2)"]);
		      		}
		      	if(_bf.length && this.isTorrentCommandEnabled('setprioritize',this.dID) )
	      			theContextMenu.add([CMENU_CHILD, theUILang.DLStrategy, _bf]);
			else
				theContextMenu.add([theUILang.DLStrategy]);
		}
		var _bf1 = [];
		if(this.settings["webui.fls.view"])
		{
			_bf1.push([theUILang.AsList]);
			_bf1.push([theUILang.AsTree, "theWebUI.toggleFileView()"]);
		}
		else
		{
			_bf1.push([theUILang.AsList, "theWebUI.toggleFileView()"]);
			_bf1.push([theUILang.AsTree]);
		}
		theContextMenu.add([CMENU_CHILD, theUILang.View, _bf1]);
		return(true);
   	},

	toggleFileView: function()
	{
		this.settings["webui.fls.view"] = !this.settings["webui.fls.view"];
		this.getTable("fls").clearRows();
		if(this.dID!="")
			this.redrawFiles(this.dID);
		this.save();
	},

	getFileIds: function(id, p, property)
	{
   		var sr = this.getTable("fls").rowSel;
   		var str = "";
   		var needSort = false;
   		for(var k in sr)
   		{
      			if(sr[k] == true)
      			{
      				if(this.settings["webui.fls.view"])
      				{
					var arr = k.split('_f_');
	         			var i = iv(arr[1]);
        	 			if(!property || (this.files[id][i][property] != p))
         				{
						str += "&f=" + i;
	            				needSort = true;
        	    			}
        			}
        			else
        			{
				        var dir = theWebUI.dirs[id];
				        var ids = new Array();
				        dir.getFilesIds(ids,dir.current,k,p);
				        for(var i in ids)
						str += "&f=" + ids[i];
					needSort = true;
        			}
         		}
      		}
      		if(needSort)
			this.getTable("fls").Sort();
   		return(str);
   	},

	setPriority: function(id, p)
	{
   		var fls = this.getFileIds(id, p, "priority");
   		this.request("?action=setprio&hash=" + id + "&p=" + p + fls, [this.updateFiles, this]);
   	},

   	setPrioritize: function(id, p)
	{
   		var fls = this.getFileIds(id, p, null);
   		this.request("?action=setprioritize&hash=" + id + "&p=" + p + fls, [this.updateFiles, this]);
   	},

//
// torrents
//

	trtSelect: function(e, id)
	{
		var table = theWebUI.getTable("trt");
		var hash = table.getFirstSelected();
		if((table.selCount==1) && hash)
			theWebUI.showDetails(hash, true);
		else
		{
			theWebUI.dID = "";
			theWebUI.clearDetails();
		}
		if(e.which==3)
		{
			theWebUI.createMenu(e, id);
			theContextMenu.show(e.clientX,e.clientY);
		}
	},

	trtDeselect: function()
	{
		var table = this.getTable("trt");
		var sr = table.rowSel;
		for(var k in sr)
			sr[k] = false;
		table.selCount = 0;
		table.refreshRows();
	},

   	createMenu: function(e, id)
	{
   		var table = this.getTable("trt");
   		theContextMenu.clear();
   		if(table.selCount > 1)
   		{
			theContextMenu.add([CMENU_SEL, theUILang.Torrents + ": " + table.selCount, "theWebUI.trtDeselect()"]);
			theContextMenu.add([CMENU_SEP]);
      			theContextMenu.add([theUILang.Start, "theWebUI.start()"]);
      			theContextMenu.add([theUILang.Pause, "theWebUI.pause()"]);
      			theContextMenu.add([theUILang.Stop, "theWebUI.stop()"]);
      			theContextMenu.add([theUILang.Force_recheck, "theWebUI.recheck()"]);
			theContextMenu.add([theUILang.peerAdd]);
   		}
   		else
   		{
			theContextMenu.add([CMENU_SEL, theUILang.Torrents + ": 1", "theWebUI.trtDeselect()"]);
			theContextMenu.add([CMENU_SEP]);
   			theContextMenu.add([theUILang.Start, this.isTorrentCommandEnabled("start",id) ? "theWebUI.start()" : null]);
   			theContextMenu.add([theUILang.Pause, (this.isTorrentCommandEnabled("pause",id) || this.isTorrentCommandEnabled("unpause",id)) ? "theWebUI.pause()" : null]);
   			theContextMenu.add([theUILang.Stop, this.isTorrentCommandEnabled("stop",id) ? "theWebUI.stop()" : null]);
			theContextMenu.add([theUILang.Force_recheck, this.isTorrentCommandEnabled("recheck",id) ? "theWebUI.recheck()" : null]);
			theContextMenu.add([theUILang.peerAdd,
				(!this.isTorrentCommandEnabled("start",id) &&
				this.isTorrentCommandEnabled("addpeer",id) &&
				$type(this.torrents[id]) &&
				(this.torrents[id].private==0) && (theWebUI.systemInfo.rTorrent.iVersion>=0x804)) ?
				"theDialogManager.show('padd')"	: null]);
		}
		theContextMenu.add([theUILang.Recreate_files, this.isTorrentCommandEnabled("recreate",id) ? "theWebUI.recreate()" : null]);
		if(theWebUI.systemInfo.rTorrent.iVersion>=0x809)
			theContextMenu.add([theUILang.updateTracker, this.isTorrentCommandEnabled("updateTracker",id) ? "theWebUI.updateTracker()" : null]);
   		theContextMenu.add([CMENU_SEP]);
   		var _bf = [];
		_bf.push([theUILang.New_label, (table.selCount > 1) || this.isTorrentCommandEnabled("setlabel",id) ? "theWebUI.newLabel()" : null]);
   		_bf.push([theUILang.Remove_label, (table.selCount > 1) || this.isTorrentCommandEnabled("setlabel",id) ? "theWebUI.removeLabel()" : null]);
   		_bf.push([CMENU_SEP]);
		for(var lbl in this.cLabels)
   		{
      			if((table.selCount == 1) && (this.torrents[id].label == lbl))
         			_bf.push([CMENU_SEL, lbl+" "]);
      			else
         			_bf.push([lbl+" ", (table.selCount > 1) || this.isTorrentCommandEnabled("setlabel",id) ? "theWebUI.setLabel('" + addslashes(lbl) + "')" : null]);
      		}
   		theContextMenu.add([CMENU_CHILD, theUILang.Labels, _bf]);
   		theContextMenu.add([CMENU_SEP]);
   		var _c0 = [];
		if(table.selCount > 1)
		{
			_c0.push([theUILang.High_priority, "theWebUI.perform('dsetprio&v=3')"]);
			_c0.push([theUILang.Normal_priority, "theWebUI.perform('dsetprio&v=2')"]);
			_c0.push([theUILang.Low_priority,  "theWebUI.perform('dsetprio&v=1')"]);
			_c0.push([theUILang.Dont_download,  "theWebUI.perform('dsetprio&v=0')"]);
		}
		else
		{
			var p = this.torrents[id].priority;
			_c0.push([theUILang.High_priority, (p==3) || !this.isTorrentCommandEnabled("dsetprio",id) ? null : "theWebUI.perform('dsetprio&v=3')"]);
			_c0.push([theUILang.Normal_priority, (p==2 || !this.isTorrentCommandEnabled("dsetprio",id)) ? null : "theWebUI.perform('dsetprio&v=2')"]);
			_c0.push([theUILang.Low_priority,  (p==1) || !this.isTorrentCommandEnabled("dsetprio",id) ? null : "theWebUI.perform('dsetprio&v=1')"]);
			_c0.push([theUILang.Dont_download, (p==0) || !this.isTorrentCommandEnabled("dsetprio",id) ? null : "theWebUI.perform('dsetprio&v=0')"]);
		}
		theContextMenu.add([CMENU_CHILD, theUILang.Priority, _c0]);
   		theContextMenu.add([CMENU_SEP]);
   		theContextMenu.add([theUILang.Remove, (table.selCount > 1) || this.isTorrentCommandEnabled("remove",id) ? "theWebUI.remove()" : null]);
   		theContextMenu.add([CMENU_SEP]);
   		theContextMenu.add([theUILang.Details, "theWebUI.showDetails('" + id + "')"]);
   		if((table.selCount > 1) || !this.isTorrentCommandEnabled("setprops",id))
      			theContextMenu.add([theUILang.Properties]);
   		else
      			theContextMenu.add([theUILang.Properties, "theWebUI.showProperties('" + id + "')"]);
	},

   	perform: function(cmd)
	{
		if(cmd == "pause")
		{
			var hp = this.getHashes("unpause");
			if(hp != "")
				this.request("?action=unpause" + hp);
		}
		var h = this.getHashes(cmd);
		if(h != "")
		{
			if((cmd.indexOf("remove")==0) && (h.indexOf(this.dID) >- 1))
			{
				this.dID = "";
				this.clearDetails();
			}
			this.getTorrents(cmd + h + "&list=1");
		}
   	},

	/**
	 * @param {string} act
	 * @param {string} hash
	 * @returns {boolean}
	 */
	isTorrentCommandEnabled: function(act,hash)
	{
		var ret = true;
   		var status = this.torrents[hash].state;
		switch(act)
		{
			case "start" :
			{
				ret = (!(status & dStatus.started) || (status & dStatus.paused) && !(status & dStatus.checking) && !(status & dStatus.hashing));
				break;
			}
			case "pause" :
			{
				ret = ((status & dStatus.started) && !(status & dStatus.paused) && !(status & dStatus.checking) && !(status & dStatus.hashing));
				break;
			}
			case "unpause" :
			{
				ret = ((status & dStatus.paused) && !(status & dStatus.checking) && !(status & dStatus.hashing));
				break;
			}
			case "stop" :
			{
				ret = ((status & dStatus.started) || (status & dStatus.hashing) || (status & dStatus.checking));
				break;
			}
			case "recheck" :
			{
				ret = !(status & dStatus.checking) && !(status & dStatus.hashing);
				break;
			}
		}
		return(ret);
	},

	getHashes: function(act)
	{
		var h = "";
		var pos = act.indexOf('&');
		if(pos>=0)
			act = act.substring(0,pos);
		var sr = this.getTable("trt").rowSel;
		for(var k in sr)
			if((sr[k] == true) && this.isTorrentCommandEnabled(act,k))
				h += "&hash=" + k;
		return(h);
	},

	start: function()
	{
		this.perform("start");
	},

	pause: function()
	{
   		this.perform("pause");
   	},

	stop: function()
	{
   		this.perform("stop");
   	},

   	updateTracker: function()
	{
   		this.perform("updateTracker");
   	},

	remove: function()
	{
		var table = this.getTable("trt");
		if((table.selCount>1) ||
			((table.selCount==1) &&	this.isTorrentCommandEnabled("remove",table.getFirstSelected())))
		{
			if(this.settings["webui.confirm_when_deleting"])
			{
				this.delmode = "remove";
				askYesNo( theUILang.Remove_torrents, theUILang.Rem_torrents_prompt, "theWebUI.doRemove()" );
	      		}
			else
				this.perform("remove");
		}
	},

	doRemove: function()
	{
		this.perform(this.delmode);
   	},

	recheck: function()
	{
		this.perform("recheck");
   	},

   	recreate: function()
	{
		this.perform("createqueued");
   	},

	getTorrents: function(qs)
	{
		if(this.updTimer)
			window.clearTimeout(this.updTimer);
		this.timer.start();
		if(qs != "list=1")
			qs = "action=" + qs;
		this.requestWithTimeout("?" + qs + "&getmsg=1", [this.addTorrents, this],
			function()
			{
	   			theWebUI.timeout();
				theWebUI.setInterval();
		   	},
			function(status,text)
			{
				theWebUI.systemInfo.rTorrent.started = false;
	   			theWebUI.error(status,text);
				if(theWebUI.settings["webui.retry_on_error"])
					theWebUI.setInterval( iv(theWebUI.settings["webui.retry_on_error"])*1000 );
		   	});
   	},

	fillAdditionalTorrentsCols: function(hash,cols)
	{
		return(cols);
	},

	updateAdditionalTorrentsCols: function(hash)
	{
	},

	/**
	 * @typedef {Object} WebUITorrent
	 * @property {string} name
	 * @property {string} label
	 * @property {number} dl
	 * @property {number} ul
	 * @property {StatusIcon} status
	 * @property {StatusMask} state
	 * @property {number} done - number between 0..1000
	 * @property {number} size
	 * @property {boolean} _updated
	 */

	/**
	 * @param {Object} data
	 * @param {Array.<WebUITorrent>} data.torrents
	 * @param {Object.<string, number>} data.labels
	 * @param {Object.<string, number>} data.labels_size
	 */
	addTorrents: function(data)
	{
		if(!theWebUI.systemInfo.rTorrent.started)
		{
			noty(theUILang.linkTorTorrentRestored,'success');
			theWebUI.systemInfo.rTorrent.started = true;
		}
   		var table = this.getTable("trt");
   		var tul = 0;
		var tdl = 0;
   		var tult = 0;
		var tdlt = 0;
		var tArray = [];
		var firstLoad = this.firstLoad;
		var mlcnt = {
		"nlb": [0, 0],
		"dls": [0, 0],
		"sed": [0, 0],
		"com": [0, 0],
		"stp": [0, 0],
		"pus": [0, 0],
		"act": [0, 0],
		"iac": [0, 0],
		"chk": [0, 0],
		"que": [0, 0],
		"err": [0, 0],
		"all": [0, 0]
		};
		$.each(data.torrents,
		/**
		 * @param {string} hash - torrent hash
		 * @param {WebUITorrent} torrent
		 */
		function(hash,torrent)
		{
			tdl += iv(torrent.dl);
			tul += iv(torrent.ul);
			tdlt += torrent.downloaded;
			tult += torrent.uploaded;
			var sInfo = theWebUI.getStatusIcon(torrent);
			torrent.status = sInfo[1];
			var lbl = theWebUI.getLabels(hash, torrent, mlcnt);
			if(!$type(theWebUI.torrents[hash]))
			{
				theWebUI.labels[hash] = lbl;
				table.addRowById(torrent, hash, sInfo[0], {label : lbl}, firstLoad);
				tArray.push(hash);
				theWebUI.filterByLabel(hash);
			}
			else
			{
				var oldTorrent = theWebUI.torrents[hash];
				if(lbl != theWebUI.labels[hash])
				{
					theWebUI.labels[hash] = lbl;
					table.setAttr(hash, { label: lbl });
					theWebUI.filterByLabel(hash);
				}
				if((oldTorrent.state!=torrent.state) ||
					(oldTorrent.size!=torrent.size) ||
					(oldTorrent.ul!=torrent.ul) ||
					(oldTorrent.done!=torrent.done))
					table.setIcon(hash, sInfo[0]);
//				if((oldTorrent.seeds!=torrent.seeds) || (oldTorrent.peers!=torrent.peers))
				{
				        if((theWebUI.dID == hash) &&
				                (theWebUI.activeView=='TrackerList'))
						theWebUI.getTrackers(hash);
				}
				if(oldTorrent.downloaded!=torrent.downloaded)
				{
				        if((theWebUI.dID == hash) &&
				                (theWebUI.activeView=='FileList'))
						theWebUI.updateFiles(hash);
					else
						delete theWebUI.files[hash];
				}
				for( var prop in torrent)
				        table.setValueById(hash, prop, torrent[prop]);
			}
			torrent._updated = true;
		});
		$.extend(this.torrents,data.torrents);
		this.setSpeedValues(tul,tdl,tult,tdlt);
		var wasRemoved = false;
		this.clearTegs();
		$.each(this.torrents,function(hash,torrent)
		{
			if(!torrent._updated)
			{
				delete theWebUI.torrents[hash];
				delete theWebUI.files[hash];
				delete theWebUI.dirs[hash];
				delete theWebUI.peers[hash];
				delete theWebUI.labels[hash];
				table.removeRow(hash);
				wasRemoved = true;
			}
			else
			{
				torrent._updated = false;
				theWebUI.updateTegs(torrent);
			}
		});
//		this.getAllTrackers(tArray);
		this.loadLabels(data.labels, data.labels_size);
		this.rebuildTrackersLabels(data.trackers_labels, data.trackers_labels_size);
		this.updateLabels(wasRemoved);
		this.loadTorrents();
		this.getTotal();
//		window.setTimeout(this.updateStatus, 100);

		$('#viewrows').text(table.viewRows + '/' + table.rows);

		// Cleanup memory leaks
		tArray = null;
		table = null;
		data = null;
	},

	setSpeedValues: function(tul,tdl,tult,tdlt)
	{
		this.total.speedDL = tdl;
		this.total.speedUL = tul;
		this.total.totalDL = tdlt;
		this.total.totalUL = tult;
	},

	loadTorrents: function()
	{
		var table = this.getTable("trt");
		if(this.firstLoad)
		{
			this.firstLoad = false;
			this.show();
		}
		else
		{
			table.refreshRows();
			table.Sort();
		}
		this.setInterval();
		this.updateDetails();
   	},

   	getTotal: function()
	{
	        this.request("?action=gettotal",[this.addTotal, this]);
	},

   	addTotal: function( d )
	{
	        $.extend(this.total,d);
	},

	/**
	 * @typedef {array.<string>} StatusIcon
	 * first element: icon name
	 * second element: localized status
	 */

	/**
	 * @param {WebUITorrent} torrent
	 * @returns {StatusIcon}
	 */
	getStatusIcon: function(torrent)
	{
		var state = torrent.state;
		var completed = torrent.done;
		var icon = "", status = "";
		if(state & dStatus.checking)
		{
			icon = "Status_Checking";
			status = theUILang.Checking;
		}
		else
		if(state & dStatus.hashing)
		{
			icon = "Status_Queued";
			status = theUILang.Queued;
		}
		else
		{
			if(state & dStatus.started)
			{
				if(state & dStatus.paused)
				{
					icon = "Status_Paused";
					status = theUILang.Pausing;
				}
				else
				{
					icon = (completed == 1000) ? "Status_Up" : "Status_Down";
					if((torrent.ul >= 1024) && (icon == "Status_Up")) icon = "Status_Up_Act";
//					if((torrent.dl >= 1024) && (icon == "Status_Down")) icon = "Status_Down_Act";
					status = (completed == 1000) ? theUILang.Seeding : theUILang.Downloading;
				}
			}
		}
		if(state & dStatus.error)
		{
			if(icon=="Status_Down")
				icon = "Status_Error_Down";
			else
			if(icon=="Status_Up")
				icon = "Status_Error_Up";
			else
				icon = "Status_Error";
		}
		if((completed == 1000) && (status == ""))
		{
			if(icon=="")
				icon = "Status_Completed";
			status = theUILang.Finished;
		}
		if((completed < 1000) && (status == ""))
		{
			if(icon=="")
				icon = "Status_Incompleted";
			status = theUILang.Stopped;
		}
		return([icon, status]);
	},

//
// labels
//

	setTeg: function(str)
	{
		str = str.trim();
		if(str!="")
		{
			for( var id in this.tegs )
				if(this.tegs[id].val==str)
				{
					this.switchLabel($$(id));
					return;
				}
			var tegIg = "teg_"+this.lastTeg;
			this.lastTeg++;
			var el = $("<LI>").attr("id",tegIg).addClass("teg").
				html(escapeHTML(str) + "&nbsp;(<span id=\"" + tegIg + "-c\">0</span>)").attr("title",str+" (0)").
				mouseclick(theWebUI.tegContextMenu).addClass("cat")
			$("#lblf").append( el );
			this.tegs[tegIg] = { val: str, cnt: 0 };
			this.updateTeg(tegIg);
			this.resetLabels();
			this.switchLabel(el[0]);
		}
		else
		{
			this.resetLabels();
		}
	},

	clearTegs: function()
	{
		for( var id in this.tegs )
			this.tegs[id].cnt = 0;
	},

	matchTeg: function(teg, name)
	{
		var pattern = teg.val.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&');
		return new RegExp(pattern.replace('*', '.+'), 'i').test(name);
	},

	updateTeg: function(id)
	{
		var teg = this.tegs[id];
		var self = this;
		$.each(this.torrents,function(hash,torrent)
		{
			if(self.matchTeg(teg, torrent.name))
				teg.cnt++;
		});
		var counter = $("#"+id+"-c");
		if(counter.text()!=teg.cnt)
		{
			counter.text(teg.cnt);
			$("#"+id).prop("title",teg.val+" ("+teg.cnt+")");
		}
	},

	/**
	 * @param {WebUITorrent} torrent
	 */
	updateTegs: function(torrent)
	{
		for( var id in this.tegs )
		{
			var teg = this.tegs[id];
			if(this.matchTeg(teg, torrent.name))
				teg.cnt++;
		}
	},

	removeTeg: function(id)
	{
		delete this.tegs[id];
		$($$(id)).remove();
		this.resetLabels();
	},

	removeAllTegs: function()
	{
		for (var id in this.tegs) {
			delete this.tegs[id];
			$($$(id)).remove();
		}
		this.resetLabels();
	},

	tegContextMenu: function(e)
	{
	        if(e.which==3)
	        {
		        var table = theWebUI.getTable("trt");
			table.clearSelection();
			theWebUI.switchLabel(this);
			table.fillSelection();
			var id = table.getFirstSelected();
			if(id)
			{
				theWebUI.createMenu(null, id);
		   		theContextMenu.add([CMENU_SEP]);
			}
			else
				theContextMenu.clear();
			theContextMenu.add([theUILang.removeTeg, "theWebUI.removeTeg('"+e.target.id+"');"]);
			theContextMenu.add([theUILang.removeAllTegs, "theWebUI.removeAllTegs();"]);
			theContextMenu.show(e.clientX,e.clientY);
		}
		else
			theWebUI.switchLabel(this);
		return(false);
	},

	labelContextMenu: function(e)
	{
	        if(e.which==3)
	        {
		        var table = theWebUI.getTable("trt");
			table.clearSelection();
			theWebUI.switchLabel(this);
			table.fillSelection();
			var id = table.getFirstSelected();
			if(id)
			{
				theWebUI.createMenu(null, id);
				theContextMenu.show(e.clientX,e.clientY);
			}
			else
				theContextMenu.hide();
		}
		else
			theWebUI.switchLabel(this);
		return(false);
	},



rebuildTrackersLabels: function(c, s)
{

		var p = $("#torrl");
		var temp = new Array();
		var keys = new Array();
		for(var lbl in c)
			keys.push(lbl);
		keys.sort();

		for(var i=0; i<keys.length; i++) 
		{
			var lbl = keys[i];
			var lblSize = this.settings["webui.show_labelsize"] ? theConverter.bytes(s[lbl], 2) : "";
//			this.cLabels[lbl] = 1;
			temp["i" + lbl] = true;

			if(!$$("i" + lbl)) 
			{
				//php/label.php?tracker="+lbl+"
				p.append( $("<li style=\"background-image: url(images/trackers/"+lbl+".png)\">").
					attr("id","i" + lbl).
					html(escapeHTML(lbl) + "&nbsp;(<span class=\"pct\" id=\"-" + lbl + "_c\">" + c[lbl] + "</span>) <span class=\"psz\" id=\"-" + lbl + "_s\">" + lblSize + "</span>").
					mouseclick(theWebUI.labelContextMenu).addClass("cat tracker") );
			}
			else
			{
				li = $($$('i'+lbl));
				li.children("span.pct").text(c[lbl]);
				li.children("span.psz").text(lblSize);
//				li.attr("title", c[lbl]);
			}

		}
		var needSwitch = false;
		p.children().each(function(ndx,val)
		{
			var id = val.id;
			if(id && !$type(temp[id]))
			{
				$(val).remove();
				if(theWebUI.actLbls["ptrackers_cont"] == id)
					needSwitch = true;
			}
		});
		if(needSwitch)
			theWebUI.resetLabels();

},

	/**
	 *
	 * @param {Object.<string, number>} c - <label_name, count>
	 * @param {Object.<string, number>} s - labels size
	 */
	loadLabels: function(c, s)
	{
		var p = $("#lbll");
		var temp = new Array();
		var keys = new Array();
		for(var lbl in c)
			keys.push(lbl);
		keys.sort();

		for(var i=0; i<keys.length; i++) 
		{
			var lbl = keys[i];
			var lblSize = this.settings["webui.show_labelsize"] ? theConverter.bytes(s[lbl], 2) : "";
			this.labels["-_-_-" + lbl + "-_-_-"] = [c[lbl], lblSize];
			this.cLabels[lbl] = 1;
			temp["-_-_-" + lbl + "-_-_-"] = true;
			if(!$$("-_-_-" + lbl + "-_-_-")) 
			{
				//php/label.php?label="+lbl+"
				pi = lbl.split("/");
				lab = (pi[1] && ['film','films','films2','films3','game','games','movie','movies','music','porn','porno','xxx','serial','serials','serials2','serials3','video','2tb','640'].includes(pi[1])) ? pi[1] : pi[0];
				p.append( $("<li style=\"background-image: url(images/labels/"+lab+".png)\">").
					attr("id","-_-_-" + lbl + "-_-_-").
					html(escapeHTML(lbl) + "&nbsp;(<span id=\"-_-_-" + lbl + "-_-_-c\">" + c[lbl] + lblSize + "</span>) <span class=\"psz\" id=\"-_-_-" + lbl + "-_-_-s\"></span>").
					mouseclick(theWebUI.labelContextMenu).addClass("cat") );
			}
		}
		var actDeleted = false;
		p.children().each(function(ndx,val)
		{
			var id = val.id;
			if(id && !$type(temp[id]))
			{
				$(val).remove();
				delete theWebUI.labels[id];
				delete theWebUI.cLabels[id.substr(5, id.length - 10)];
				if(theWebUI.actLbls["plabel_cont"] == id)
					actDeleted = true;
			}
		});
		if(actDeleted)
		{
			this.switchLabel($("#plabel_cont .-_-_-all-_-_-").get(0))
		}
   	},

	/**
	 *
	 * @param {string} id - torrent hash
	 * @param {WebUITorrent} torrent
	 */
	getLabels : function(id, torrent, mlcnt)
	{
		if(!$type(this.labels[id]))
			this.labels[id] = "";
		var lbl = torrent.label;

		
		if(lbl == "")
      		{
			lbl += "-_-_-nlb-_-_-";
			mlcnt.nlb[0]++;
			mlcnt.nlb[1] += torrent.size;
		}

		lbl = "-_-_-" + lbl + "-_-_-i" + torrent.tracker;

		if(torrent.state & dStatus.checking){

			lbl += "-_-_-chk-_-_-";
			mlcnt.chk[0]++;
			mlcnt.chk[1] += torrent.size;

		} else if(torrent.state & dStatus.hashing){

			lbl += "-_-_-que-_-_-";
			mlcnt.que[0]++;
			mlcnt.que[1] += torrent.size;

		} else {

		if(torrent.state & dStatus.started){
			
			if(torrent.state & dStatus.paused){

			lbl += "-_-_-pus-_-_-";
			mlcnt.pus[0]++;
			mlcnt.pus[1] += torrent.size;
			
			} else {

			 if(torrent.done == 1000){
			 
			lbl += "-_-_-sed-_-_-";
			mlcnt.sed[0]++;
			mlcnt.sed[1] += torrent.size;
			mlcnt.sed[2] += torrent.downloaded;
			mlcnt.sed[3] += torrent.uploaded;
		 
			 } else {

			lbl += "-_-_-dls-_-_-";
			mlcnt.dls[0]++;
			mlcnt.dls[1] += torrent.size;
			 
			 }
//
		if((torrent.dl >= 1024) || (torrent.ul >= 1024))
		{
			lbl += "-_-_-act-_-_-";
			mlcnt.act[0]++;
			mlcnt.act[1] += torrent.size;

		}
		else
		{
			lbl += "-_-_-iac-_-_-";
			mlcnt.iac[0]++;
			mlcnt.iac[1] += torrent.size;


		}
//
			 
			
			}
		}
		
		}
		
		if((torrent.done == 1000) && (torrent.state == "")){

			lbl += "-_-_-com-_-_-";
			mlcnt.com[0]++;
			mlcnt.com[1] += torrent.size;
		}

		if((torrent.done < 1000) && (torrent.state == "")){

			lbl += "-_-_-stp-_-_-";
			mlcnt.stp[0]++;
			mlcnt.stp[1] += torrent.size;

		}


		if(torrent.state & dStatus.error)
		{
			lbl += "-_-_-err-_-_-";
			mlcnt.err[0]++;
			mlcnt.err[1] += torrent.size;

		}

		mlcnt.all[0]++;
		mlcnt.all[1] += torrent.size;


		for (var l in mlcnt) {
			let lblSize = (this.settings["webui.show_labelsize"] && mlcnt[l][1]) ? theConverter.bytes(mlcnt[l][1], 2) : "";
			this.labels["-_-_-"+ l +"-_-_-"] = [mlcnt[l][0], lblSize];
		}
		
		
		return(lbl);
	},

	/**
	 *
	 * @param {string} lbl - label
	 */
	setLabel: function(lbl)
	{
		var req = '';
   		var sr = this.getTable("trt").rowSel;
   		for(var k in sr)
   		{
      			if(sr[k] && (this.torrents[k].label != lbl))
      				req += ("&hash=" + k + "&s=label&v=" + encodeURIComponent(lbl));
		}
		if(req.length>0)
			this.request("?action=setlabel"+req+"&list=1",[this.addTorrents, this]);
	},

	removeLabel: function()
	{
	        this.setLabel("");
   	},

	newLabel: function()
	{
		var table = this.getTable("trt");
		var s = theUILang.newLabel;
		if(table.selCount == 1)
      		{
      		        var k = table.getFirstSelected();
			var lbl = this.torrents[k].label;
			if(lbl != "")
				s = this.torrents[k].label;
		}
		$("#txtLabel").val(s);
		theDialogManager.show("dlgLabel");
	},

	createLabel: function()
	{
   		var lbl = $("#txtLabel").val().trim();
		lbl = lbl.replace(/\"/g, "'");
   		if(lbl != "")
		{
	   		var sr = this.getTable("trt").rowSel;
			var req = "";
			for(var k in sr)
			{
      				if(sr[k] && (this.torrents[k].label != lbl))
	         			req+=("&hash=" + k + "&s=label&v=" + encodeURIComponent(lbl));
	         	}
			if(req.length>0)
				this.request("?action=setlabel"+req+"&list=1",[this.addTorrents, this]);
		}
   	},

	updateLabels: function(wasRemoved)
	{
		$(".-_-_-all-_-_-c").text(this.labels["-_-_-all-_-_-"][0]);
		$(".-_-_-all-_-_-s").text(this.labels["-_-_-all-_-_-"][1]);

		for(var k in this.labels)
			if(k.substr(0, 5) == "-_-_-"){
				$($$(k+"c")).text(this.labels[k][0]);
				$($$(k+"s")).text(this.labels[k][1]);
			}

		for( var id in this.tegs )
		{
			var counter = $("#"+id+"-c");
			var teg = this.tegs[id];
			if(counter.text()!=teg.cnt)
			{
				counter.text(teg.cnt);
				$("#"+id).prop("title",teg.val+" ("+teg.cnt+")");
			}
		}
	},

	resetLabels: function() {
		var allLbls = $('.-_-_-all-_-_-');
		for(var i = 0; i < allLbls.length; i++)
			this.switchLabel(allLbls.get(i));
	},

	switchLabel: function(obj)
	{
		var panelCont = $(obj).closest(".catpanel_cont");
		var labelType = panelCont.attr('id')

		if(this.actLbls[labelType] != obj.id)
		{
			panelCont.find(".sel").removeClass("sel");
			$(obj).addClass("sel");

			this.actLbls[labelType] = obj.id;

			var table = this.getTable("trt");
			table.scrollTo(0);
			for(var k in this.torrents)
				this.filterByLabel(k);
			table.clearSelection();
			if(this.dID != "")
			{
				this.dID = "";
				this.clearDetails();
			}
			table.refreshRows();

			$('#viewrows').text(table.viewRows + '/' + table.rows);
		}
	},

	filterByLabel: function(sId)
	{
		var table = this.getTable("trt");

		var showRow = true;
		for(var lblType in this.actLbls)
		{
			if (lblType != "plabel_cont" && lblType != "pstate_cont" && lblType != "flabel_cont" && lblType != "ptrackers_cont")
				continue;

			var actLbl = this.actLbls[lblType];

			if($($$(actLbl)).hasClass("teg"))
			{
				var teg = this.tegs[actLbl];
				if(teg)
				{
					if(!this.matchTeg(teg, table.getValueById(sId, "name")))
						showRow = false;
				}
			}
			else if(table.getAttr(sId, "label").indexOf(actLbl) == -1)
				showRow = false;
		}

		if(showRow)
			table.unhideRow(sId);
		else
			table.hideRow(sId);
	},

//
// properties
//

   	showProperties: function(k)
	{
   		this.pID = k;
   		this.request("?action=getprops&hash=" + k, [this.loadProperties, this]);
   	},

	loadProperties: function(data)
	{
		$.extend(this.props, data);
   		this.updateProperties();
   	},

	updateProperties: function()
	{
   		var props = this.props[this.pID];
   		$("#prop-ulslots").val( props.ulslots );
   		$("#prop-peers_min").val( props.peers_min );
   		$("#prop-peers_max").val( props.peers_max );
   		$("#prop-tracker_numwant").val( props.tracker_numwant );
   		if(props.pex ==- 1)
		{
   		        $("#prop-pex").prop("checked",false).prop("disabled",true);
			$("#lbl_prop-pex").addClass("disabled");
		}
   		else
   		{
   			$("#prop-pex").prop("checked",(props.pex==1)).prop("disabled",false).removeClass("disabled");
			$("#lbl_prop-pex").removeClass("disabled");
		}
		o = $$("prop-superseed");
		if(this.torrents[this.pID].done==1000)
		{
		        $("#prop-superseed").prop("disabled",false);
      			$("#lbl_prop-superseed").removeClass("disabled");
		}
		else
		{
		        $("#prop-superseed").prop("disabled",true);
      			$("#lbl_prop-superseed").addClass("disabled");
     		}
     		$("#prop-superseed").prop("checked",(props.superseed==1));
   		theDialogManager.show("dlgProps");
   	},

	setProperties: function()
	{
   		theDialogManager.hide("dlgProps");
   		var req = '';
   		for(var k in this.props[this.pID])
   		{
      			var v = this.props[this.pID][k];
			var o = $("#prop-" + k);
      			var nv = o.is("input:checkbox") ? o.is(":checked")+0 : o.val()
      			if((k == "hash") || ((k == "pex") && (v ==- 1)))
         			continue;
      			if(v != nv)
      			{
				this.props[this.pID][k] = nv;
      				req+=("&s=" + k + "&v=" + nv);
   			}
		}
         	if(req.length>0)
	       		this.request("?action=setprops&hash=" + this.pID + req);
        },

//
// details
//

	showDetails: function(hash, noSwitch)
	{
   		if(!noSwitch)
      			theTabs.show("gcont");
   		this.dID = hash;
   		this.getFiles(hash);
 		this.getTrackers(hash);
   		if(!noSwitch && !theWebUI.settings["webui.show_dets"])
   		{
			$("#tdetails").show();
      			theWebUI.settings["webui.show_dets"] = true;
      			theWebUI.resize();
      			theWebUI.save();
      		}
   		this.updateDetails();
   	},

        clearDetails: function()
	{
		$(".det").text("");
		this.getTable("fls").clearRows();
		this.getTable("trk").clearRows();
		this.clearPeers();
	},

	updateDetails: function()
	{
   		if((this.dID != "") && this.torrents[this.dID])
   		{
	   		var d = this.torrents[this.dID];
                        $("#dl").text(theConverter.bytes(d.downloaded,2));
			$("#ul").text(theConverter.bytes(d.uploaded,2));
			$("#ra").html( (d.ratio ==- 1) ? "&#8734;" : theConverter.round(d.ratio/1000,3));
			$("#us").text(theConverter.speed(d.ul));
			$("#ds").text(theConverter.speed(d.dl));
			$("#rm").html((d.eta ==- 1) ? "&#8734;" : theConverter.time(d.eta));
			$("#se").text(d.seeds_actual + " " + theUILang.of + " " + d.seeds_all + " " + theUILang.connected);
			$("#pe").text(d.peers_actual + " " + theUILang.of + " " + d.peers_all + " " + theUILang.connected);
			$("#et").text(theConverter.time(Math.floor((new Date().getTime()-theWebUI.deltaTime)/1000-iv(d.state_changed)),true));
			$("#wa").text(theConverter.bytes(d.skip_total,2));
	        	$("#bf").text(d.base_path);
	        	$("#co").text(theConverter.date(iv(d.created)+theWebUI.deltaTime/1000));
//			$("#tu").text($type(this.trackers[this.dID]) && $type(this.trackers[this.dID][d.tracker_focus]) ? this.trackers[this.dID][d.tracker_focus].name : '');
	        	$("#hs").text(this.dID.substring(0,40));
			$("#ts").text(d.msg);
			var url = d.comment.trim();
			if(!url.match(/<a href/i))
			{
				var start = url.indexOf("http://");
				if(start<0)
					start = url.indexOf("https://");
				if(start>=0)
				{
					var end = url.indexOf(" ",start);
 					if(end<0)
						end = url.length;
					var prefix = url.substring(0,start);
					var postfix = url.substring(end);
					url = url.substring(start,end);
					url = prefix+"<a href='"+url+"' target=_blank>"+url+"</a>"+postfix;
				}
			}
			$("#cmt").html( strip_tags(url,'<a><b><strong>') );
			$("#dsk").text((d.free_diskspace=='0') ? '' : theConverter.bytes(d.free_diskspace,2));
			$("#sz").text((d.size=='0') ? '' : theConverter.bytes(d.size,2) + ' (' + d.chunks + ' x ' + theConverter.bytes(d.chunk_size,2) + ')');
			$("#by").text((d.created_by=='') ? '' : ' (' + d.created_by + ')');
			$("#st").text(d.status);
			$("#fl").text(d.num_files);
	   		this.updatePeers();
		}
	},

//
// service
//

	getTable: function(prefix)
	{
		return($type(this.tables[prefix]) ? this.tables[prefix].obj : null);
	},

	updateStatus: function()
	{
	        var self = theWebUI;
		var ul = theConverter.speed(self.total.speedUL);
		var dl = theConverter.speed(self.total.speedDL);
		var newTitle = '';
		if(theWebUI.settings["webui.speedintitle"])
		{
			if(ul.length)
				newTitle+=('↑'+ul+' ');
			if(dl.length)
				newTitle+=('↓'+dl+' ');
		}
		newTitle+="ruTorrent v"+self.version;
		if(document.title!=newTitle)
			document.title = newTitle;
	        $("#stup_speed").text(ul);
	        $("#stup_limit").text((self.total.rateUL>0 && self.total.rateUL<327625*1024) ? theConverter.speed(self.total.rateUL) : theUILang.no);
	        $("#stup_total").text(theConverter.bytes(self.total.UL));
	        $("#stdown_speed").text(dl);
	        $("#stdown_limit").text((self.total.rateDL>0 && self.total.rateDL<327625*1024) ? theConverter.speed(self.total.rateDL) : theUILang.no);
	        $("#stdown_total").text(theConverter.bytes(self.total.DL));

	        $("#up_total").text(theConverter.bytes(self.total.totalUL));
	        $("#down_total").text(theConverter.bytes(self.total.totalDL));

	        var dhtstat = '';
	        dhtstat += (self.total.DHT.active == "1") ? '' : ' off |';
       	        dhtstat += self.total.DHT.nodes ? ' N: ' + self.total.DHT.nodes + ' |' : '';
       	        dhtstat += self.total.DHT.buckets ? ' B: ' + self.total.DHT.buckets + ' |' : '';
	        dhtstat += (self.total.DHT.bytes_read || self.total.DHT.bytes_written) ? ' R: ' + theConverter.bytes(self.total.DHT.bytes_read) + ' W: ' + theConverter.bytes(self.total.DHT.bytes_written) + ' |' : '';
       	        dhtstat += (self.total.DHT.peers || self.total.DHT.peers_max) ? ' P: ' + self.total.DHT.peers + ' / ' + self.total.DHT.peers_max + ' |' : '';
       	        dhtstat += self.total.DHT.torrents ? ' T: ' + self.total.DHT.torrents + ' |' : '';;
	        $("#dhtstat").text(dhtstat.slice(0, -1));

		var netopen = '';
		netopen += self.total.openHT ? ' HTTP: ' + self.total.openHT + ' |' : '';
		netopen += self.total.openSK ? ' Socket: ' + self.total.openSK + ' |' : '';
		$("#netopen").text(netopen.slice(0, -1));
	},

	setDLRate: function(spd)
	{
		this.request("?action=setdlrate&s="+spd,[this.getTotal, this]);
	},

	setULRate: function(spd)
	{
		this.request("?action=setulrate&s="+spd,[this.getTotal, this]);
	},

	downRateMenu: function(e)
	{
	        if(e.which==3)
	        {
	                theContextMenu.clear();
	                var speeds=theWebUI.settings["webui.speedlistdl"].split(",");
	                if(theWebUI.total.rateDL<=0 || theWebUI.total.rateDL>=327625*1024)
	                	theContextMenu.add([CMENU_SEL,theUILang.unlimited,"theWebUI.setDLRate(327625*1024)"]);
			else
		                theContextMenu.add([theUILang.unlimited,"theWebUI.setDLRate(327625*1024)"]);
			theContextMenu.add([CMENU_SEP]);
	                for(var i=0; i<speeds.length; i++)
	                {
	                	var spd = iv(speeds[i])*1024;
		                if(theWebUI.total.rateDL==spd)
					theContextMenu.add([CMENU_SEL,theConverter.speed(spd),"theWebUI.setDLRate("+spd+")"]);
				else
					theContextMenu.add([theConverter.speed(spd),"theWebUI.setDLRate("+spd+")"]);
			}
			theContextMenu.show(e.clientX,e.clientY);
		}
		return(false);
	},

	upRateMenu: function(e)
	{
	        if(e.which==3)
	        {
	                theContextMenu.clear();
	                var speeds=theWebUI.settings["webui.speedlistul"].split(",");
	                if(theWebUI.total.rateUL<=0 || theWebUI.total.rateUL>=327625*1024)
	                	theContextMenu.add([CMENU_SEL,theUILang.unlimited,"theWebUI.setULRate(327625*1024)"]);
			else
		                theContextMenu.add([theUILang.unlimited,"theWebUI.setULRate(327625*1024)"]);
			theContextMenu.add([CMENU_SEP]);
	                for(var i=0; i<speeds.length; i++)
	                {
	                	var spd = iv(speeds[i])*1024;
		                if(theWebUI.total.rateUL==spd)
					theContextMenu.add([CMENU_SEL,theConverter.speed(spd),"theWebUI.setULRate("+spd+")"]);
				else
					theContextMenu.add([theConverter.speed(spd),"theWebUI.setULRate("+spd+")"]);
			}
			theContextMenu.show(e.clientX,e.clientY);
		}
		return(false);
	},

	resizeLeft: function( w, h )
	{
	        if(w!==null)
	        {
			$("#CatList").width( w );
			$("#VDivider").width( $(window).width()-w-10 );
		}
		if(h!==null)
		{
			$("#CatList").height( h );
		}
	},

	resizeTop : function( w, h )
	{
		this.getTable("trt").resize(w,h);
	},

	resizeBottom : function( w, h )
	{
        	if(w!==null)
        	{
			$("#tdetails").width( w );
			w-=8;
		}
		if(h!==null)
        	{
			$("#tdetails").height( h );
			h-=($("#tabbar").outerHeight());
			$("#tdcont").height( h );
			h-=2;
        	}
        	if(theWebUI.configured)
        	{
	        	this.getTable("fls").resize(w,h);
			this.getTable("trk").resize(w,h);
			this.getTable("prs").resize(w,h);
			var table = this.getTable("plg");
			if(table)
				table.resize(w,h);
		}
	},

	resize: function()
	{
		var ww = $(window).width();
		var wh = $(window).height();
       		var w = Math.floor(ww * (1 - theWebUI.settings["webui.hsplit"])) - 5;
	        var th = ($("#t").is(":visible") ? $("#t").height() : -1)+$("#StatusBar").height()+12;
		$("#StatusBar").width(ww);
		if(theWebUI.settings["webui.show_cats"])
		{
			theWebUI.resizeLeft( w, wh-th );
			w = ww - w;
		}
		else
		{
			$("#VDivider").width( ww-10 );
			w = ww;
		}
		w-=11;
		theWebUI.resizeTop( w, Math.floor(wh * (theWebUI.settings["webui.show_dets"] ? theWebUI.settings["webui.vsplit"] : 1))-th-7 );
		if(theWebUI.settings["webui.show_dets"])
			theWebUI.resizeBottom( w, Math.floor(wh * (1 - theWebUI.settings["webui.vsplit"])) );
		$("#HDivider").height( wh-th+2 );
	},

	update: function()
   	{
   	        if(theWebUI.systemInfo.rTorrent.started || !this.firstLoad)
			theWebUI.getTorrents("list=1");
		else
			theWebUI.show();
   	},

	setVSplitter : function()
	{
		var r = 1 - ($("#tdetails").height() / $(window).height());
		r = Math.floor(r * Math.pow(10, 3)) / Math.pow(10, 3);
		if((theWebUI.settings["webui.vsplit"] != r) && (r>0) && (r<1))
		{
			theWebUI.settings["webui.vsplit"] = r;
			theWebUI.save();
		}
	},

	setHSplitter : function()
	{
		var r = 1 - ($("#CatList").width()+5)/$(window).width();
		r = Math.floor(r * Math.pow(10, 3)) / Math.pow(10, 3);
		if((theWebUI.settings["webui.hsplit"] != r) && (r>0) && (r<1))
		{
			theWebUI.settings["webui.hsplit"] = r;
			theWebUI.save();
		}
	},

	toggleMenu: function()
	{
		$("#t").toggle();
  		theWebUI.resize();
	},

	toggleDetails: function()
	{
		theWebUI.settings["webui.show_dets"] = !theWebUI.settings["webui.show_dets"];
		$("#tdetails").toggle();
      		theWebUI.resize();
		theWebUI.save();
	},

	toggleCategories: function()
	{
	        theWebUI.settings["webui.show_cats"] = !theWebUI.settings["webui.show_cats"];
		$("#CatList").toggle();
      		theWebUI.resize();
		theWebUI.save();
	},

	showPanel: function(pnl,enable)
	{
		var cont = $('#'+pnl.id+"_cont");
		cont.toggle(enable);
		theWebUI.settings["webui.closed_panels"][pnl.id] = !enable;
		pnl.style.backgroundImage="url("+this.getTable("trt").paletteURL+(enable ? "/images/pnl_open.gif)" : "/images/pnl_close.gif)");
	},

	togglePanel: function(pnl)
	{
		theWebUI.showPanel(pnl,!$('#'+pnl.id+"_cont").is(":visible"));
		theWebUI.save();
	},

	showAdd: function()
	{
   		theDialogManager.toggle("tadd");
   	},

	resetInterval: function()
	{
		this.timer.stop();
		if(this.updTimer)
			window.clearTimeout(this.updTimer);
		this.interval = iv(this.settings["webui.update_interval"]);
		this.updTimer = window.setTimeout(this.update, this.interval);
	},

	setInterval: function( force )
	{
		this.timer.stop();
		if(force)
			this.interval = force;
		else
		if(this.interval ==- 1)
			this.interval = iv(this.settings["webui.update_interval"]) + this.timer.interval * 4;
		else
			this.interval = iv((this.interval + iv(this.settings["webui.update_interval"]) + this.timer.interval * 4) / 2);
		this.updTimer = window.setTimeout(this.update, this.interval);
   	},

   	setActiveView: function(id)
	{
		$("#tooltip").remove();
		this.activeView=id;
	},

	request: function(qs, onComplite, isASync)
	{
		this.requestWithTimeout(qs, onComplite, this.timeout, this.error, isASync);
	},

	requestWithTimeout: function(qs, onComplite, onTimeout, onError, isASync)
	{
		Ajax(this.url + qs, isASync, onComplite, onTimeout, onError, this.settings["webui.reqtimeout"]);
   	},

	requestWithoutTimeout: function(qs, onComplite, isASync)
	{
		Ajax(this.url + qs, isASync, onComplite, null, this.error, -1);
   	},

   	show: function()
   	{
   		if($("#cover").is(":visible"))
		{
			$("#cover").hide();
			setTimeout(theWebUI.resize, 0);
			theTabs.show("lcont");
		}
   	},

   	msg: function(s)
   	{
		$('#loadimg').hide();
    		$("#msg").text(s);
   	},

   	catchErrors: function(toLog)
   	{
		if(toLog)
	   		window.onerror = function(msg, url, line, col, error)
			{
				theWebUI.show();
				noty("JS error: [" + url + " : " + line + "] " + msg,"error");

				if (error != null)
					console.log(msg, "from", error.stack);

				return true;
			}
		else
			window.onerror = function(msg, url, line, col, error)
			{
				msg = "JS error: [" + url + " : " + line + "] " + msg;
				theWebUI.msg(msg);
				log(msg);
				
				if (error != null)
					console.log(msg, "from", error.stack);
				
				return true;
			}
   	},

	error: function(status,text)
	{
		theWebUI.show();
		noty("Bad response from server: ("+status+") "+(text ? text : ""),"error");
	},

	timeout: function()
	{
		theWebUI.show();
		if(!theWebUI.settings["webui.ignore_timeouts"])
			noty(theUILang.Request_timed_out,"alert");
	}
};

$(document).ready(function()
{
	makeContent();
	theContextMenu.init();
	theTabs.init();
	theWebUI.init();
});
