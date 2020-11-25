---
layout: default
title: Corona Chart Neu-Isenburg
description: Interaktive Übersicht aktueller Daten zur Corona-Pandemie in Neu-Isenburg.
---

<div id="chart"></div>

## Daten

* Aktive Fälle: Fallzahlen der letzten 14 Tage in Neu-Isenburg [1].
* Neue Infektionen: Neu positiv getestete Personen in Neu-Isenburg [1].
* 7-Tage Inzidenz: Infektionen der letzten 7 Tage in Neu-Isenburg pro 100.000 Einwohner. Errechnet aus "Neue Infektionen" unter Annahme von 38.105 Einwohnern.
* 7-Tage Inzidenz Kreis: Infektionen der letzten 7 Tage im Kreis Offenbach pro 100.000 Einwohner [1].

[1] Entnommen aus den [Tagesberichten des Kreis Offenbach](https://www.kreis-offenbach.de/Themen/Gesundheit-Verbraucher-schutz/akut/Corona/Corona-Entwicklung/).

Privat angeboten von [Daniel Sokolowski](https://dsoko.de). Verbesserungen und Erweiterungen willkommen als [Issue](https://github.com/DSoko2/Corona-NI/issues) oder [PR](https://github.com/DSoko2/Corona-NI/pulls). Nutzt [Github Pages](https://pages.github.com/), [Jekyll](https://jekyllrb.com/) und [C3.js](https://c3js.org).

<!-- Load c3.css -->
<link href="assets/c3.min.css" rel="stylesheet">

<!-- Load d3.js and c3.js -->
<script src="assets/d3.min.js" charset="utf-8"></script>
<script src="assets/c3.min.js"></script>
<script type="text/javascript">
	const data = [
		["30.09.20",18,5],
		["01.10.20",17,0],
		["02.10.20",19,4],
		["03.10.20",21,2],
		["04.10.20",24,1],
		["05.10.20",24,0],
		["06.10.20",18,1],
		["07.10.20",22,6],
		["08.10.20",29,8],
		["09.10.20",26,2],
		["10.10.20",28,3],
		["11.10.20",32,5],
		["12.10.20",33,1],
		["13.10.20",32,1],
		["14.10.20",30,3],
		["15.10.20",36,6],
		["16.10.20",41,6],
		["17.10.20",47,5],
		["18.10.20",51,4],
		["19.10.20",53,4],
		["20.10.20",54,2],
		["21.10.20",60,9],
		["22.10.20",65,7],
		["23.10.20",65,5],
		["24.10.20",72,10],
		["25.10.20",75,3],
		["26.10.20",null,6],
		["27.10.20",72,8],
		["28.10.20",75,13],
		["29.10.20",91,20],
		["30.10.20",94,13],
		["31.10.20",103,14],
		["01.11.20",117,21],
		["02.11.20",127,17],
		["03.11.20",133,12],
		["04.11.20",145,24],
		["05.11.20",146,11],
		["06.11.20",158,19],
		["07.11.20",175,23],
		["08.11.20",179,14],
		["09.11.20",192,15],
		["10.11.20",198,9],
		["11.11.20",206,14],
		["12.11.20",208,21],
		["13.11.20",213,14],
		["14.11.20",206,18],
		["15.11.20",205,12],
		["16.11.20",209,22],
		["17.11.20",204,7],
		["18.11.20",188,23],
		["19.11.20",191,13],
		["20.11.20",190,18],
		["21.11.20",189,18],
		["22.11.20",188,7],
		["23.11.20",193,11,1573,230.2],
		["24.11.20",196,11,1583,218.7],
		["25.11.20",195,14,1518,222.6]
	];
	const population = 38105; // Wikipedia as of 31.12.2019
	const date = ['date'].concat(data.map(v => v[0]));
	const activeCases = ['Aktive Fälle'].concat(data.map(v => v[1]));
	const newInfections = ['Neue Infektionen'].concat(data.map(v => v[2]));
	// const sevenDaysIncidenceRegion = ['7-Tage Inzidenz Kreis'].concat(data.map(v => v[4]));
	const sevenDaysInfections = ['7-Tage Infektionen', null, null, null, null, null, null].concat(
		[...Array(newInfections.length - 6).keys()]
			.map(firstDay => newInfections.slice(firstDay+1,firstDay+8)
			.reduce((sum, summand) => sum + summand, 0)));
	const sevenDaysIncidence = ['7-Tage Inzidenz'].concat(sevenDaysInfections.slice(1).map(v => v === null ? null : Number(100000.0 * v / population).toFixed(1)));
	const chart = c3.generate({
	    bindto: '#chart',
	    size: {
			height: 580,
	    },
	    data: {
	    	x: 'date',
	    	xFormat: '%d\.%m\.%y',
	    	columns: [date, activeCases, newInfections, sevenDaysIncidence],
	    	axes: {
	    		'Neue Infektionen': 'y2'
	    	},
		    types: {
		    	'Neue Infektionen': 'bar'
		    },
		    colors: {
		    	// https://learnui.design/tools/data-color-picker.html#palette
		    	'Neue Infektionen': '#FDA',
		    	'Aktive Fälle': '#ffa600',
		    	'7-Tage Inzidenz': '#bc5090',
		    	'7-Tage Inzidenz Kreis': '#003f5c',
			},
	    },
	    axis: {
	        x: {
	            type: 'timeseries',
	            tick: {
	                format: '%d.%m.%y',
                    fit:true,
                    culling: {
                        max: window.innerWidth > 500 ? 8 : 5
                    }
	            }
		    },
	        y2: {
	            show: true
	        }
   		},
	    subchart: {
	        show: true
	    },
	    zoom: {
	        enabled: true
	    }
	});
</script>