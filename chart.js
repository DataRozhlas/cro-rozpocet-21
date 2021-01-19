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
            'Zúčtovaní fondu digitalizace': 'zúčtování účelového fondu na kraytí nákladů souvisejících s digitalizací vysílání a archivu ČRo',
            'Tržby za vlastní výkony': 'vedle výnosů z rozhlasových poplatků skupina obsahuje i výnosy z obchodních aktivit a prodeje služeb'  
        },
        'series': [{
            name: 'Výnosy',
            colorByPoint: true,
            data: [{
                name: 'Tržby za vlastní výkony',
                y: 2205756,
                drilldown: 'vlastni_vykony'
            }, {
                name: 'Zúčtování fondu digitalizace',
                y: 89000,
                drilldown: null
            }, {
                name: 'Ostatní provozní výnosy',
                y: 7344,
                drilldown: null
            }, {
                name: 'Finanční výnosy',
                y: 10900,
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
                    ['Výnosy z rozhlasových poplatků', 2077000],
                    ['Tržby z reklamy a sponzoringu a ost. obch. aktivit', 83000],
                    ['Výnosy ze zahraničního vysílání', 28500],
                    ['Ostatní tržby z prodeje služeb', 17256],
                    ['Zúčtování fondu digitalizace', 89000],
                    ['Ostatní provozní výnosy', 7344],
                    ['Finanční výnosy', 10900],
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
                y: 24755,
                drilldown: 'material'
            }, {
                name: 'Náklady na služby',
                y: 997207,
                drilldown: 'sluzby'
            }, {
                name: 'Náklady na provoz',
                y: 58772,
                drilldown: 'provoz'
            }, {
                name: 'Osobní náklady',
                y: 1033000,
                drilldown: 'osobni'
            }, {
                name: 'Daně',
                y: 17029,
                drilldown: 'dane'
            }, {
                name: 'Ostatní provozní náklady',
                y: 162000,
                drilldown: 'ostatni_provozni'
            }, {
                name: 'Nedaňové náklady',
                y: 15396,
                drilldown: 'nedanove'
            }, {
                name: 'Finanční náklady',
                y: 4841,
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
                    ['Drobný majetek', 3347],
                    ['Materiál - propagace', 11842],
                    ['Materiál ostatní', 9566]
                ]
            }, {
                name: 'Náklady na služby',
                id: 'sluzby',
                data: [
                    ['Technické programové služby', 46500],
                    ['Agenturní zpravodajství', 24018],
                    ['Honoráře kolektivním správcům', 92555],
                    ['Vysílací práva, náklady na program', 6518],
                    ['Honoráře fyzickým osobám', 193990],
                    ['Poradenské služby', 2875],
                    ['Služby propagace', 92426],
                    ['Provize za reklamu a sponzoring', 0],
                    ['Vysílače', 324250],
                    ['Ostatní vysílací prostředky', 26776],
                    ['Telefony', 7736],
                    ['Nehmotný majetek', 315],
                    ['Nájemné', 27668],
                    ['Inkasné za rozhlasové poplatky', 104000],
                    ['Ostatní služby', 47580]
                ]
            }, {
                name: 'Náklady na provoz',
                id: 'provoz',
                data: [
                    ['Energie', 23252],
                    ['Cestovné', 14894],
                    ['Opravy a údržba majetku', 12310],
                    ['Pohonné hmoty', 2450],
                    ['Ostatní provozní náklady', 5866]
                ]
            }, {
                name: 'Osobní náklady',
                id: 'osobni',
                data: [
                    ['Mzdové náklady včetně zákonného pojištění', 974500],
                    ['Ostatní příjmy FO včetně zákonného pojištění', 41700],
                    ['Sociální náklady', 16800]
                ]
            }, {
                name: 'Daně',
                id: 'dane',
                data: [
                    ['DPH bez nároku na odpočet', 14000],
                    ['Ostatní daně', 3029],
                    ['Daň z příjmů', 0]
                ]
            }, {
                name: 'Ostatní provozní náklady',
                id: 'ostatni_provozni',
                data: [
                    ['Odpisy dlouhodobého majetku', 133000],
                    ['Odpis pohledávek', 27000],
                    ['Tvorba a zúčtování opravných položek', 2000]
                ]
            }, {
                name: 'Nedaňové náklady',
                id: 'nedanove',
                data: [
                    ['Reprezentace', 5707],
                    ['Ostatní nedaňové náklady', 9689]
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
	            enabled: false,
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
	        text: 'Rozpočet 2021 – ' + dta[chapter]['series'][0]['name']
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