---
layout: default
title: Corona Chart Neu-Isenburg
description: Interaktive Übersicht aktueller Daten zur Corona-Pandemie in Neu-Isenburg.
---

<!--Laut RKI können die Corona-Meldedaten an sowie um Weihnachten und den Jahreswechsel ungenauer und zu gering sein. Dies sei mit weniger Probenentnahmen und Laboruntersuchungen sowie teilweise verzögerter Ergebnisübermittlung zu erklären.-->

<div id="chart"></div>

<i style="display: block; text-align: center;" aria-hidden="true">Datenpunkt berühren zur Detailansicht der Werte. Zoomen/Scrollen zur Einschränkung der Zeitachse.</i>

## Aktuell (<span id="current-date"></span>)

<dl>
	<dt>Aktive Fälle</dt>
	<dd><span id="current-cases"></span> (<span id="day-change-cases"></span> Vortag, <span id="week-change-cases"></span> Vorwoche)</dd>
	<dt>Neue Fälle</dt>
	<dd><span id="current-new-cases"></span> (<span id="day-change-new-cases"></span> Vortag, <span id="week-change-new-cases"></span> Vorwoche)</dd>
	<dt>7-Tage-Inzidenz</dt>
	<dd><span id="current-7-days-incidence"></span> (<span id="day-change-7-days-incidence"></span> Vortag, <span id="week-change-7-days-incidence"></span> Vorwoche)</dd>
	<dt>7-Tage-Inzidenz Kreis</dt>
	<dd><span id="current-7-days-incidence-KO"></span> (<span id="day-change-7-days-incidence-KO"></span> Vortag, <span id="week-change-7-days-incidence-KO"></span> Vorwoche)</dd>
</dl>

## Legende

<dl>
	<dt>Aktive Fälle</dt>
	<dd>Positiv getestete Personen der letzten 14 Tage in Neu-Isenburg [1]. Vor dem 18.11. Anzahl der aktuell positiv Getesteten in Neu-Isenburg.</dd>
	<dt>Neue Fälle</dt>
	<dd>Neu positiv getestete Personen in Neu-Isenburg [1].</dd>
	<dt>7-Tage-Inzidenz</dt>
	<dd>Infektionen der letzten 7 Tage in Neu-Isenburg pro 100.000 Einwohner. Errechnet aus "Neue Fälle" unter Annahme von 38.105 Einwohnern.</dd>
	<dt>7-Tage-Inzidenz Kreis</dt>
	<dd>Infektionen der letzten 7 Tage im Kreis Offenbach pro 100.000 Einwohner [1].</dd>
</dl>

[1] Entnommen aus den [Tagesmeldungen des Kreises Offenbach](https://www.kreis-offenbach.de/Themen/Gesundheit-Verbraucher-schutz/akut/Corona/Corona-Entwicklung/).

## Weitere Informationsquellen

* [Informationsseite zum Corona-Virus der Stadt Neu-Isenburg](https://neu-isenburg.de/buergerservice/rathauspresse/news-zum-corona-virus/)
* [Hinweise zu Maskenpflicht der Stadt Neu-Isenburg](https://neu-isenburg.de/fileadmin/user_upload/Buergerservice/Rathauspresse/covid/210308_corona-regeln-N-I.pdf)
* [Corona-Regeln des Kreises Offenbach](https://neu-isenburg.de/fileadmin/user_upload/Buergerservice/Rathauspresse/covid/corona-regeln_KrOf.pdf)
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
	    	xFormat: '%d.%m.%Y',
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
		    	'7-Tage-Inzidenz': '#bc5090',
		    	'7-Tage-Inzidenz Kreis': '#003f5c',
			},
	    },
	    axis: {
	        x: {
	            type: 'timeseries',
	            tick: {
	                format: '%d.%m.%y',
                    fit: true,
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
	    tooltip: {
	    	format: {
	    		title: function (d) { return d.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); }
	    	}
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
		// Prepare data
		const data = request.response;
		const date = ['date'].concat(data.map(v => v['date']));
		const activeCases = ['Aktive Fälle'].concat(data.map(v => v['activeCasesNI']));
		const newCasesNI = ['Neue Fälle'].concat(data.map(v => v['newCasesNI']));
		const sevenDaysIncidenceKO = ['7-Tage-Inzidenz Kreis'].concat(data.map(v => v['sevenDaysIncidenceKO']));
		const activeCasesKO = ['Aktive Fälle Kreis'].concat(data.map(v => v['activeCasesKO']));

		const sevenDaysInfectionsNI = ['7-Tage Infektionen', null, null, null, null, null, null].concat(
			[...Array(Math.max(0, newCasesNI.length - 7)).keys()]
				.map(firstDay => newCasesNI.slice(firstDay+1,firstDay+8)
				.reduce((sum, summand) => sum + summand, 0)));
		const sevenDaysIncidenceNI = ['7-Tage-Inzidenz'].concat(sevenDaysInfectionsNI.slice(1)
			.map(v => v === null ? null : Number(100000.0 * v / population).toFixed(1)));

		// Print current data
		const currentExploded = date.slice(-1)[0].split('.')
		document.getElementById('current-date').innerText = new Date(currentExploded[2], currentExploded[1]-1, currentExploded[0])
			.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
		function setDataChange(element, current, before) {
			const change = current - before;
			element.innerText = (change < 0 ? '' : '+') + Math.round(change, 2);
			element.classList.add(change <= 0 ? 'better' : 'worse');
		}
		function setCurrentData(field, current, dayEarlier, weekEarlier) {
			document.getElementById('current-' + field).innerText = current;
			setDataChange(document.getElementById('day-change-' + field), current, dayEarlier);
			setDataChange(document.getElementById('week-change-' + field), current, weekEarlier);
		}
		setCurrentData('cases', activeCases.slice(-1)[0], activeCases.slice(-2)[0], activeCases.slice(-8)[0]);
		setCurrentData('new-cases', newCasesNI.slice(-1)[0], newCasesNI.slice(-2)[0], newCasesNI.slice(-8)[0]);
		setCurrentData('7-days-incidence', sevenDaysIncidenceNI.slice(-1)[0], sevenDaysIncidenceNI.slice(-2)[0], sevenDaysIncidenceNI.slice(-8)[0]);
		setCurrentData('7-days-incidence-KO', sevenDaysIncidenceKO.slice(-1)[0], sevenDaysIncidenceKO.slice(-2)[0], sevenDaysIncidenceKO.slice(-8)[0]);

		// Draw chart
		chart.load({
			columns: [date, activeCases, newCasesNI, sevenDaysIncidenceNI, sevenDaysIncidenceKO]
		});

		// Screen reader accessibility
		const dataPointEventTarget = document.querySelector('.c3-event-rect');
		const chartSvg = document.querySelector('#chart > svg');
		const chartDataPoints = Array.from(document.querySelectorAll('#chart .c3-axis.c3-axis-x .tick'));
		const chartIrrelevantAccessibilityTreeNodes = Array.from(document.querySelectorAll('#chart > svg > * > :not(.c3-axis-x), #chart > svg > * > :not(.c3-axis), #chart > svg > * > .c3-axis-x.c3-axis > :not(.tick)'));
		const chartTooltip = document.querySelector('#chart .c3-tooltip-container');

		chartSvg.setAttribute('role', 'graphics-document document');
		chartSvg.setAttribute('aria-label', 'Diagramm täglicher Daten zu Corona in Neu-Isenburg');
		chartIrrelevantAccessibilityTreeNodes.forEach(node => node.setAttribute('aria-hidden', 'true'));
		chartTooltip.setAttribute('id', 'chart-tooltip');
		chartTooltip.setAttribute('aria-hidden', 'true');

		chartDataPoints.forEach((node, index) => {
				node.setAttribute('tabindex', 0);
				node.setAttribute('role', 'graphics-symbol img');
				node.setAttribute('aria-describedby', 'chart-tooltip');
				node.addEventListener('focus', d => {
					const tickClientRect = d.target.getBoundingClientRect();
					const mouseMoveEvent = document.createEvent("MouseEvents");
					mouseMoveEvent.initMouseEvent(
						"mousemove", //event type : click, mousedown, mouseup, mouseover, mousemove, mouseout.  
						true, //canBubble
						false, //cancelable
						window, //event's AbstractView : should be window 
						1, // detail : Event's mouse click count 
						window.screenX + tickClientRect.left + tickClientRect.width / 2, // screenX
						window.screenY + tickClientRect.top - 20, // screenY
						tickClientRect.left + tickClientRect.width / 2, // clientX
						tickClientRect.top - 20, // clientY
						false, // ctrlKey
						false, // altKey
						false, // shiftKey
						false, // metaKey 
						0, // button : 0 = click, 1 = middle button, 2 = right button  
						null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
					);
					dataPointEventTarget.dispatchEvent(mouseMoveEvent);
				});
			});
	}
</script>
