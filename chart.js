function makeTooltip(name, price, pct, text) {
    if (text == null) {
        text = ''
    };

    return '<b>' + name + '</b><br>'
        + thousandSep(price * 1000) + ' Kč (' + Math.round(pct * 10) / 10 + ' % z kapitoly)<br><i>' 
        + text + '</i>'
};

function thousandSep(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

function repl(val) {
	if (val != undefined) {
		return val;
	} else {
		return '';
	};
};

function drawTable(vals, chapter) {
	var tblCon = '<table><tr><td><b>Kapitola</td><td class="sum"><b>Kč</td></tr>'
	var sum = 0;
	
	for (var key in vals) {
		tblCon += '<tr><td>' + vals[key].name + '</td><td class="right">' + thousandSep(vals[key].y * 1000) + '</td>' 
		+'<td><i>' + repl(dta[chapter]['popisky'][vals[key].name]) + '</i></td></tr>';
		sum += vals[key].y;
	};
	tblCon += '<tr><td><b>CELKEM</b></td><td class="right">' + thousandSep(sum * 1000) + '</td>' 
		+'<td><i></i></td></tr></table>';

	$('#table').html(tblCon);
};

var dta = {
    'vynosy': {
        'popisky': {
            'Výnosy z rozhlasových poplatků': 'předpisy rozhlasových poplatků pro fyzické i právnické osoby vč. přirážek k rozhlasovým poplatkům',
            'Tržby z reklamy a sponzoringu a ost. obch. aktivit': 'tržby z obchodních aktivit (cashové i barterové operace) - reklama, sponzoring, prodej práv, ad.',
            'Výnosy ze zahraničního vysílání': 'dotace od Ministerstva zahraničních věcí České republiky na zahraniční vysílání',
            'Ostatní tržby z prodeje služeb': 'nájemné a přefakturace služeb, vstupné na koncerty hudebních těles, zdravotní služby, …',
            'Ostatní provozní výnosy': 'přijaté dary, granty a dotace, tržby z prodeje majetku a materiálu, zúčtování fondu digitalizace',
            'Finanční výnosy': 'přijaté úroky, kurzové zisky a ostatní finanční výnosy',
            'Mimořádné výnosy': 'tržby z prodeje nemovitostí, aj.',
            'Zúčtování fondu digitalizace': 'zúčtování účelového fondu na krytí nákladů souvisejících s digitalizací vysílání a archivu ČRo',
            'Tržby za vlastní výkony': 'vedle výnosů z rozhlasových poplatků skupina obsahuje i výnosy z obchodních aktivit a prodeje služeb'  
        },
        'series': [{
            name: 'Výnosy',
            colorByPoint: true,
            data: [{
                name: 'Tržby za vlastní výkony',
                y: 2220923,
                drilldown: 'vlastni_vykony'
            }, {
                name: 'Zúčtování fondu digitalizace',
                y: 68400,
                drilldown: null
            }, {
                name: 'Ostatní provozní výnosy',
                y: 6896,
                drilldown: null
            }, {
                name: 'Finanční výnosy',
                y: 15781,
                drilldown: null
            }, {
                name: 'Mimořádné výnosy',
                y: 0,
                drilldown: null
            }]
        }],
        'drilldown': {
            series: [{
                name: 'Tržby za vlastní výkony',
                id: 'vlastni_vykony',
                data: [
                    ['Výnosy z rozhlasových poplatků', 2086200],
                    ['Tržby z reklamy a sponzoringu a ost. obch. aktivit', 85000],
                    ['Výnosy ze zahraničního vysílání', 27750],
                    ['Ostatní tržby z prodeje služeb', 21973],
                    ['Zúčtování fondu digitalizace', 68400],
                    ['Ostatní provozní výnosy', 6896],
                    ['Finanční výnosy', 15781],
                    ['Mimořádné výnosy', 0]
                    
                ]
            }]
        }
    },
    'naklady': {
        'popisky': {
            'Drobný majetek': 'nákupy drobného hmotného majetku s pořizovací cenou do 40.000,- Kč (nábytek, PC, NB, …)',
            'Materiál - propagace': 'propagační předměty, tištěný materiál a ceny do soutěží',
            'Materiál ostatní': 'kancelářské potřeby, záznamový materiál, náhradní díly, knihy, časopisy, noviny, hyg. potřeby, ...',
            'Technické programové služby': 'především náklady na údržbu a podporu informačních systémů',
            'Agenturní zpravodajství': 'platby zpravodajským agenturám (ČTK, Reuters, DPA, …), meteorologické zpravodajství',
            'Honoráře kolektivním správcům': 'honoráře vyplácené přes kolektivní správce autorských práv (OSA, Intergram, DILIA, …)',
            'Vysílací práva, náklady na program': 'ostatní náklady na program (vysílací práva, honoráře vyplácené právnickým osobám ad.)',
            'Honoráře fyzickým osobám': 'honoráře vyplácené fyzickým osobám především při výrobě a vysílání pořadů',
            'Poradenské služby': 'náklady na poradenství, posudky, analýzy a expertízy',
            'Služby propagace': 'soubor marketingových služeb na propagaci ČRo i jednotlivých stanic a pořadů',
            'Provize za reklamu a sponzoring': 'provize za zprostředkování obchodních případů (reklama, sponzoring, …)',
            'Vysílače': 'náklady na distribuci signálu (České radiokomunikace, ad.)',
            'Ostatní vysílací prostředky': 'vnitrostátní, mezinárodní a satelitní přenosy, modulační a dorozumívací linky',
            'Telefony': 'náklady za hovorné a datové služby ',
            'Nehmotný majetek': 'nákupy drobného software, tj. nehmotného majetku s pořizovací cenou do 60.000,- Kč',
            'Nájemné': 'nájemné (dlouhodobé i příležitostné) za objekty, zařízení, internet, … a půjčovné za notový materiál',
            'Inkasné za rozhlasové poplatky': 'poplatky České poště za vedení databáze tzv. SIPO poplatníků a výběr rozhlasových poplatků',
            'Ostatní služby': 'náklady na výzkum poslechovosti, vzdělávání, překlady, nábor, úklid, ostrahu, svoz odpadů, ... ',
            'Energie': 'náklady na energie (elektrická energie, plyn, teplo, voda, …)',
            'Cestovné': 'tuzemské i zahraniční cestovné (ubytování, přeprava, …)',
            'Opravy a údržba majetku': 'náklady na opravy a udržování budov, rozhlasové techniky, IT, vozového parku a dalších druhů majetku',
            'Pohonné hmoty': 'náklady na pohonné hmoty',
            'Ostatní provozní náklady': 'náklady na pojištění majetku, převod nevyužitých investic do nákladů ad.',
            'Mzdové a ostatní osobní náklady': 'náklady na mzdy zaměstnancům, dohody (DPP a DPČ) a odměny členům Rady a Dozorčí komise.',
            'Náklady na sociální, zdravotní a úrazové pojištění': ' náklady na sociální, zdravotní a úrazové pojištění ke mzdám a ostatním osobním nákladům',
            'Sociální náklady': 'sociální benefity (stravenky, pracovní oděvy, lékařské prohlídky, příspěvky na penzijní připojištění ad.)',
            'DPH bez nároku na odpočet': 'DPH na vstupu bez nároku na odpočet, které se zúčtovává do provozních nákladů',
            'Ostatní daně': 'náklady na ostatní daně (srážková, silniční, z nemovitosti, z převodu nemovitosti) a poplatky',
            'Daň z příjmů': 'daň z příjmů právnických osob',
            'Odpisy dlouhodobého majetku': 'odpisy dlouhodobého majetku (budovy, zařízení, vozidla,…) vč. zůstatkové ceny prodávaného majetku',
            'Odpis pohledávek': 'odpis pohledávek (především nevymožených pohledávak z rozhlasových poplatků)',
            'Tvorba a zúčtování opravných položek': 'saldo (tj. tvorba a zúčtování) opravných položek (především k pohledávkám z rozhlasových poplatků)',
            'Reprezentace': 'náklady na pohoštění a reprezentaci',
            'Ostatní nedaňové náklady': 'ostatní nedaňové náklady (účastnické poplatky, dary, manka, opravy nákladů minulých let aj.)',
            'Finanční náklady': 'úroky, kurzové ztráty, poplatky za služby peněžních ústavů, smluvní pokuty a úroky z prodlení',
            'Mimořádné náklady': 'především tvorba účetních rezerv, zůstatková cena prodávaných nemovitostí apod.',
            'Náklady na materiál': 'nakupovaný materiál (drobný dlouh. majetek, kancelářské potřeby, propagační předměty ad.)',
            'Náklady na služby': 'nakupované služby (distribuce signálu, vyplácené honoráře, údržba a podpora IS, propagace ad.)',
            'Náklady na provoz': ' provozní náklady (energie, opravy a údržba budov a vozového parku, tuz. a zahr. cestovné, ...)',
            'Osobní náklady': 'mzdové a ostatní osobní náklady (DPP, DPČ) vč. zákonných odvodů na SP a ZP, sociální náklady',
            'Daně': 'daňové náklady ČRo (DPH bez nároku na odpočet, silniční daň, daň z nemovitosti, poplatky, …)',
            'Ostatní provozní náklady': 'jedná se o odpisy dlouh. majetku, odpis pohledávek a saldo oprav. položek k pohl. (především z RP)',
            'Nedaňové náklady': 'náklady, které je nutné vyloučit při výpočtu základu daně z příjmů právnických osob (reprezentace, …)'
        },
        'series': [{
            name: 'Náklady',
            colorByPoint: true,
            data: [{
                name: 'Náklady na materiál',
                y: 29170,
                drilldown: 'material'
            }, {
                name: 'Náklady na služby',
                y: 988169,
                drilldown: 'sluzby'
            }, {
                name: 'Náklady na provoz',
                y: 68215,
                drilldown: 'provoz'
            }, {
                name: 'Osobní náklady',
                y: 1023000,
                drilldown: 'osobni'
            }, {
                name: 'Daně',
                y: 17116,
                drilldown: 'dane'
            }, {
                name: 'Ostatní provozní náklady',
                y: 166900,
                drilldown: 'ostatni_provozni'
            }, {
                name: 'Nedaňové náklady',
                y: 15119,
                drilldown: 'nedanove'
            }, {
                name: 'Finanční náklady',
                y: 4311,
                drilldown: null
            }, {
                name: 'Mimořádné náklady',
                y: 0,
                drilldown: null
            }]
        }],
        'drilldown': {
            series: [{
                name: 'Náklady na materiál',
                id: 'material',
                data: [
                    ['Drobný majetek', 7149],
                    ['Materiál - propagace', 11045],
                    ['Materiál ostatní', 10976]
                ]
            }, {
                name: 'Náklady na služby',
                id: 'sluzby',
                data: [
                    ['Technické programové služby', 41000],
                    ['Agenturní zpravodajství', 23916],
                    ['Honoráře kolektivním správcům', 89088],
                    ['Vysílací práva, náklady na program', 2276],
                    ['Honoráře fyzickým osobám', 196938],
                    ['Poradenské služby', 3891],
                    ['Služby propagace', 87997],
                    ['Provize za reklamu a sponzoring', 0],
                    ['Vysílače', 315000],
                    ['Ostatní vysílací prostředky', 29506],
                    ['Telefony', 8559],
                    ['Nehmotný majetek', 460],
                    ['Nájemné', 28737],
                    ['Inkasné za rozhlasové poplatky', 106300],
                    ['Ostatní služby', 46601]
                ]
            }, {
                name: 'Náklady na provoz',
                id: 'provoz',
                data: [
                    ['Energie', 23773],
                    ['Cestovné', 22736],
                    ['Opravy a údržba majetku', 12964],
                    ['Pohonné hmoty', 2795],
                    ['Ostatní provozní náklady', 5947]
                ]
            }, {
                name: 'Osobní náklady',
                id: 'osobni',
                data: [
                    ['Mzdové náklady včetně zákonného pojištění', 967000],
                    ['Ostatní příjmy FO včetně zákonného pojištění', 39400],
                    ['Sociální náklady', 16600]
                ]
            }, {
                name: 'Daně',
                id: 'dane',
                data: [
                    ['DPH bez nároku na odpočet', 14000],
                    ['Ostatní daně', 3116],
                    ['Daň z příjmů', 0]
                ]
            }, {
                name: 'Ostatní provozní náklady',
                id: 'ostatni_provozni',
                data: [
                    ['Odpisy dlouhodobého majetku', 131700],
                    ['Odpis pohledávek', 33120],
                    ['Tvorba a zúčtování opravných položek', 2080]
                ]
            }, {
                name: 'Nedaňové náklady',
                id: 'nedanove',
                data: [
                    ['Reprezentace', 7339],
                    ['Ostatní nedaňové náklady', 7780]
                ]
            }]
        }
    }
};

function drawChart(chapter) {
	Highcharts.setOptions({
	    lang: {
	        drillUpText: 'Zpět'
	    }
	});

	Highcharts.chart('chart', {
	    //colors: ['#00b8e0', '#ed2e38', '#85248f', '#de7008', '#682a5a', '#00ab96', '#cda200', '#00809e', 
	    //'#ab035c', '#009645', '#0058a9', '#9e1f63', '#f58e7d', '#bd7cb5', '#ffd400', '#abe1fa', '#96cf97', '#00bbce'],
	    credits: {
	        enabled: false
	    },
	    chart: {
	        type: 'pie',
		        options3d: {
	            enabled: true,
	            alpha: 45
	        },
	        events: {
	        	load: function(e) {
	        		drawTable(e.target.series[0].data, chapter);
	        	},
	        	redraw: function(e) {
	        		drawTable(e.target.series[0].data, chapter);
	        	}
	        }
	    },
	    title: {
	        text: 'Rozpočet 2020 – ' + dta[chapter]['series'][0]['name']
	    },
	    subtitle: {
	        text: ''
	    },
	    legend: {
	        align: 'right',
	        verticalAlign: 'top',
	        layout: 'vertical',
	        x: 0,
	        y: 100
	    },
	    plotOptions: {
	    	pie: {
            	innerSize: 170,
            	depth: 45
        	},
	        series: {
	            dataLabels: {
	                enabled: true,
	                format: '{point.name}: {point.percentage:.2f} %'	            }
	        }
	    },

	    tooltip: {
	        formatter: function() {
	            return makeTooltip(this.key, this.y, this.percentage, dta[chapter]['popisky'][this.key])
	        }
	    },
	    series: dta[chapter]['series'],
	    drilldown: dta[chapter]['drilldown']
	});
};

$('#vynosy').click(function(){
	$('#naklady').removeClass("active")
	$('#vynosy').addClass("active")
	drawChart('vynosy');
});

$('#naklady').click(function(){
	$('#vynosy').removeClass("active")
	$('#naklady').addClass("active")
	drawChart('naklady');
});

drawChart('naklady');