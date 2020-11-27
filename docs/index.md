---
layout: default
title: Corona Chart Neu-Isenburg
description: Interaktive Übersicht aktueller Daten zur Corona-Pandemie in Neu-Isenburg.
---

<div id="chart"></div>

<i style="display: block; text-align: center;">Datenpunkt berühren zur Detailansicht der Werte. Zoomen/Scrollen zur Einschränkung der Zeitachse.</i>

## Daten

<dl>
	<dt>Aktive Fälle</dt>
	<dd>Positiv getestete Personen der letzten 14 Tage in Neu-Isenburg [1]. Vor dem 18.11. Anzahl der aktuell positiv Getesteten in Neu-Isenburg.</dd>
	<dt>Neue Fälle</dt>
	<dd>Neu positiv getestete Personen in Neu-Isenburg [1].</dd>
	<dt>7-Tage Inzidenz</dt>
	<dd>Infektionen der letzten 7 Tage in Neu-Isenburg pro 100.000 Einwohner. Errechnet aus "Neue Fälle" unter Annahme von 38.105 Einwohnern.</dd>
	<dt>7-Tage Inzidenz Kreis</dt>
	<dd>Infektionen der letzten 7 Tage im Kreis Offenbach pro 100.000 Einwohner [1].</dd>
</dl>

[1] Entnommen aus den [Tagesmeldungen des Kreises Offenbach](https://www.kreis-offenbach.de/Themen/Gesundheit-Verbraucher-schutz/akut/Corona/Corona-Entwicklung/).

## Weitere Informationsquellen

* [Informationsseite zum Corona-Virus der Stadt Neu-Isenburg](https://neu-isenburg.de/buergerservice/rathauspresse/news-zum-corona-virus/)
* [Corona-Hinweise der Stadt Neu-Isenburg](https://neu-isenburg.de/fileadmin/user_upload/Buergerservice/Rathauspresse/covid/201110_corona-regeln-N-I.pdf)
* [Corona-Regeln des Kreises Offenbach](https://neu-isenburg.de/fileadmin/user_upload/Buergerservice/Rathauspresse/covid/201110_corona-regeln_KrOf.pdf)
* [Bundesweites Corona Dashboard des RKI](https://experience.arcgis.com/experience/478220a4c454480e823b17327b2bf1d4)

<hr />

Privat angeboten von [Daniel Sokolowski](https://dsoko.de). [Verbesserungen und Erweiterungen willkommen](https://github.com/DSoko2/Corona-NI#Contributing) als [Issue](https://github.com/DSoko2/Corona-NI/issues) oder [PR](https://github.com/DSoko2/Corona-NI/pulls). Nutzt [Github Pages](https://pages.github.com/), [Jekyll](https://jekyllrb.com/) und [C3.js](https://c3js.org). [Impressum & Datenschutz](impressum-datenschutz.html).

<!-- Load c3.css -->
<link href="assets/c3.min.css" rel="stylesheet">

<!-- Load d3.js and c3.js -->
<script src="assets/d3.min.js" charset="utf-8"></script>
<script src="assets/c3.min.js"></script>
<script type="text/javascript">
	const chart = c3.generate({
	    bindto: '#chart',
	    size: {
			height: 580,
	    },
	    data: {
	    	x: 'date',
	    	xFormat: '%d\.%m\.%Y',
	    	columns: [],
	    	axes: {
	    		'Neue Fälle': 'y2'
	    	},
		    types: {
		    	'Neue Fälle': 'bar'
		    },
		    colors: {
		    	// https://learnui.design/tools/data-color-picker.html#palette
		    	'Neue Fälle': '#FDA',
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

	const population = 38105; // Wikipedia as of 31.12.2019

	const request = new XMLHttpRequest();
	request.open('GET', 'data-kreis-offenbach.json');
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		const data = request.response;
		const date = ['date'].concat(data.map(v => v['date']));
		const activeCases = ['Aktive Fälle'].concat(data.map(v => v['activeCasesNI']));
		const newCasesNI = ['Neue Fälle'].concat(data.map(v => v['newCasesNI']));
		const sevenDaysIncidenceKO = ['7-Tage Inzidenz Kreis'].concat(data.map(v => v['sevenDaysIncidenceKO']));
		const activeCasesKO = ['Aktive Fälle Kreis'].concat(data.map(v => v['activeCasesKO']));

		const sevenDaysInfectionsNI = ['7-Tage Infektionen', null, null, null, null, null, null].concat(
			[...Array(Math.max(0, newCasesNI.length - 6)).keys()]
				.map(firstDay => newCasesNI.slice(firstDay+1,firstDay+8)
				.reduce((sum, summand) => sum + summand, 0)));
		const sevenDaysIncidenceNI = ['7-Tage Inzidenz'].concat(sevenDaysInfectionsNI.slice(1)
			.map(v => v === null ? null : Number(100000.0 * v / population).toFixed(1)));

		chart.load({
			columns: [date, activeCases, newCasesNI, sevenDaysIncidenceNI, sevenDaysIncidenceKO]
		});
	}
</script>
