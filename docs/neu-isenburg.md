---
layout: default
title: Neu-Isenburg
description: Interaktive Übersicht aktueller Daten zur Corona-Pandemie in Neu-Isenburg.
permalink: neu-isenburg
image: /assets/neu-isenburg-card.png
---

Aktuellste Daten: <span id="current-date"></span>

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

{% include chart.html chartId="chart" %}

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
* [Informationen des Kreises Offenbach](https://www.kreis-offenbach.de/Themen/Gesundheit-Verbraucher-schutz/akut/Corona/)

{% include footer.html %}
{% include load-c3.html %}

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
            y: {
                min: 0,
                padding: { top: 20, bottom: 0 }
            },
	        y2: {
                min: 0,
                padding: { top: 20, bottom: 0 },
	            show: true
	        }
   		},
        line: {
            connectNull: true
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
		function setCurrentData(field, data) {
            const current = data.filter(x => x).slice(-1)[0];
            const dayEarlier = data.slice(0, -1).filter(x => x).slice(-1)[0];
            const weekEarlier = data.slice(0, -7).filter(x => x).slice(-1)[0];
			document.getElementById('current-' + field).innerText = current;
			setDataChange(document.getElementById('day-change-' + field), current, dayEarlier);
			setDataChange(document.getElementById('week-change-' + field), current, weekEarlier);
		}
		setCurrentData('cases', activeCases);
		setCurrentData('new-cases', newCasesNI);
		setCurrentData('7-days-incidence', sevenDaysIncidenceNI);
		setCurrentData('7-days-incidence-KO', sevenDaysIncidenceKO);

		// Draw chart
		chart.load({
			columns: [date, activeCases, newCasesNI, sevenDaysIncidenceNI, sevenDaysIncidenceKO]
		});
        
        {% include reader.js chartId="chart" description="Diagramm täglicher Daten zu Corona in Neu-Isenburg" %}
	}
</script>
