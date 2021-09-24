---
layout: default
title: Corona Chart Hessen
description: Interaktive Übersicht der hessischen Indikatoren zur Bestimmung des Pandemiegeschehens.
permalink: hessen
image: /assets/hessen-card.png
---

Seit dem 16.09.2021 ersetzen neue Leitindikatoren die 7-Tage-Inzidenz als Grundlage zur Festlegung von Schutzmaßnahmen.
Es sind zwei Eskalationsstufen definiert, deren Erreichung anhand <a href="https://soziales.hessen.de/gesundheit/corona-in-hessen/hospitalisierungsinzidenz-und-intensivbettenbelegung-ruecken-in-den-mittelpunkt">der landesweiten Hospitalisierungsinzidenz und Intensivbettenbelegung festgestellt wird</a>.

## Leitindikatoren

{% include chart.html chartId="leitindikatoren-chart" %}

## Weitere Indikatoren

{% include chart.html chartId="weitere-indikatoren-chart-1" %}
{% include chart.html chartId="weitere-indikatoren-chart-2" %}

## Aktuell (<span id="current-date"></span>)

<dl>
	<dt>Hospitalisierungsinzidenz</dt>
	<dd><span id="current-hospitalisierungsinzidenz"></span> (<span id="day-change-hospitalisierungsinzidenz"></span> Vortag, <span id="week-change-hospitalisierungsinzidenz"></span> Vorwoche)</dd>
	<dt>Intensivbetten</dt>
	<dd><span id="current-intensivbetten"></span> (<span id="day-change-intensivbetten"></span> Vortag, <span id="week-change-intensivbetten"></span> Vorwoche)<br />
        <b>(bestätigt):</b> <span id="current-intensivbetten-confirmed"></span> (<span id="day-change-intensivbetten-confirmed"></span> Vortag, <span id="week-change-intensivbetten-confirmed"></span> Vorwoche)<br />
        <b>(Verdacht):</b> <span id="current-intensivbetten-suspicion"></span> (<span id="day-change-intensivbetten-suspicion"></span> Vortag, <span id="week-change-intensivbetten-suspicion"></span> Vorwoche)<br />
        <b>(geimpft):</b> <span id="current-intensivbetten-immunized"></span> (<span id="day-change-intensivbetten-immunized"></span> Vortag, <span id="week-change-intensivbetten-immunized"></span> Vorwoche)<br />
        <b>(ungeimpft):</b> <span id="current-intensivbetten-not-immunized"></span> (<span id="day-change-intensivbetten-not-immunized"></span> Vortag, <span id="week-change-intensivbetten-not-immunized"></span> Vorwoche)
    </dd>
	<dt>Normalbetten</dt>
	<dd><span id="current-normalbetten"></span> (<span id="day-change-normalbetten"></span> Vortag, <span id="week-change-normalbetten"></span> Vorwoche)<br />
        <b>(bestätigt):</b> <span id="current-normalbetten-confirmed"></span> (<span id="day-change-normalbetten-confirmed"></span> Vortag, <span id="week-change-normalbetten-confirmed"></span> Vorwoche)<br />
        <b>(Verdacht):</b> <span id="current-normalbetten-suspicion"></span> (<span id="day-change-normalbetten-suspicion"></span> Vortag, <span id="week-change-normalbetten-suspicion"></span> Vorwoche)
    </dd>
	<dt>Geimpft</dt>
	<dd><span id="current-immunized"></span> (<span id="day-change-immunized"></span> Vortag, <span id="week-change-immunized"></span> Vorwoche)</dd>
	<dt>Geimpft (impffähig)</dt>
	<dd><span id="current-immunized-approved"></span> (<span id="day-change-immunized-approved"></span> Vortag, <span id="week-change-immunized-approved"></span> Vorwoche)</dd>
</dl>

## Legende


<dl>
	<dt>Hospitalisierungsinzidenz</dt>
	<dd>Personen je 100.000 Einwohner, die in den vergangenen sieben Tagen wegen einer Corona-Erkrankung in einem hessischen Krankenhaus aufgenommen wurden [1].</dd>
	<dt>Intensivbetten</dt>
	<dd>Personen mit Corona-Infektion auf hessischen Intensivstationen [1].<br />
	    <b>(bestätigt):</b>	Mit bestätigter Infektion [1].<br />
        <b>(Verdacht):</b> Mit Verdacht auf eine Infektion [1].<br />
        <b>(geimpft):</b> Anteil der vollständig geimpften Personen [1].<br />
        <b>(ungeimpft):</b> Anteil der ungeimpften und nicht vollständig geimpften Personen [1].
    </dd>
	<dt>Normalbetten</dt>
	<dd>Personen mit Corona-Infektion in hessischen Normalpflegebetten [1].<br />
	    <b>(bestätigt):</b>	Mit bestätigter Infektion [1].<br />
        <b>(Verdacht):</b> Mit Verdacht auf eine Infektion [1].
    </dd>
    <dt>Geimpft</dt>
    <dd>Anteil der Personen in Hessen mit vollständiger Impfung gegen Corona [1].</dd>
    <dt>Geimpft (impffähig)</dt>
    <dd>Anteil der Personen in Hessen im impffähigen Alter (12+) mit vollständiger Impfung gegen Corona [1].</dd>
</dl>

[1] Entnommen aus dem [täglichen Bulletin des hessischen Ministeriums für Soziales und Integration](https://soziales.hessen.de/gesundheit/corona-in-hessen/taegliche-uebersicht-ueber-die-indikatoren-zur-pandemiebestimmung).

## Weitere Informationsquellen

* [Tägliche Übersicht über die Indikatoren zur Pandemiebestimmung des Landes Hessen](https://soziales.hessen.de/gesundheit/corona-in-hessen/taegliche-uebersicht-ueber-die-indikatoren-zur-pandemiebestimmung)
* [Corona-Regeln in Hessen Hessen: Was gilt wo?](https://soziales.hessen.de/sites/default/files/media/hessen.de_land/corona-regeln_in_hessen1609_final2.pdf)

{% include footer.html %}
{% include load-c3.html %}

<script type="text/javascript">
	const leitindikatorenChart = c3.generate({
	    bindto: '#leitindikatoren-chart',
	    size: {
			height: 400,
	    },
	    data: {
	    	x: 'date',
	    	xFormat: '%d.%m.%Y',
	    	columns: [],
	    	axes: {
	    		'Intensivbetten': 'y2',
	    		'Intensivbetten (bestätigt)': 'y2',
	    		'Intensivbetten (Verdacht)': 'y2',
	    	},
		    types: {
		    	'Intensivbetten (bestätigt)': 'bar',
		    	'Intensivbetten (Verdacht)': 'bar',
		    },
		    colors: {
		    	// https://learnui.design/tools/data-color-picker.html#palette
		    	'Hospitalisierungsinzidenz': '#003f5c',
		    	'Intensivbetten': '#ffa600',
		    	'Intensivbetten (bestätigt)': '#bc5090',
		    	'Intensivbetten (Verdacht)': '#FDA',
			},
            groups: [
                ['Intensivbetten (Verdacht)', 'Intensivbetten (bestätigt)'],
            ],
            order: null,
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
                max: 16,
                padding: { top: 20, bottom: 0 }
            },
	        y2: {
                min: 0,
                max: 400,
                padding: { top: 20, bottom: 0 },
	            show: true
	        }
   		},
        grid: {
            y: {
                lines: [
                    {value: 8, text: 'Stufe 1', axis: 'y', position: 'start'},
                    {value: 200, text: 'Stufe 1', axis: 'y2', position: 'end'},
                    {value: 15, text: 'Stufe 2', axis: 'y', position: 'start'},
                    {value: 400, text: 'Stufe 2', axis: 'y2', position: 'end'},
                ]
            }
        },
	    subchart: {
	        show: false
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

	const weitereIndikatorenChart1 = c3.generate({
	    bindto: '#weitere-indikatoren-chart-1',
	    size: {
			height: 300,
	    },
	    data: {
	    	x: 'date',
	    	xFormat: '%d.%m.%Y',
	    	columns: [],
		    types: {
		    	'Normalbetten (bestätigt)': 'bar',
		    	'Normalbetten (Verdacht)': 'bar',
		    },
		    colors: {
		    	// https://learnui.design/tools/data-color-picker.html#palette
		    	'Normalbetten': '#ffa600',
		    	'Normalbetten (bestätigt)': '#bc5090',
		    	'Normalbetten (Verdacht)': '#FDA',
			},
            groups: [
                ['Normalbetten (Verdacht)', 'Normalbetten (bestätigt)'],
            ],
            order: null,
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
   		},
	    subchart: {
	        show: false
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

	const weitereIndikatorenChart2 = c3.generate({
	    bindto: '#weitere-indikatoren-chart-2',
	    size: {
			height: 300,
	    },
	    data: {
	    	x: 'date',
	    	xFormat: '%d.%m.%Y',
	    	columns: [],
		    colors: {
		    	// https://learnui.design/tools/data-color-picker.html#palette
		    	'Geimpft': '#bc5090',
		    	'Geimpft (impffähig)': '#003f5c',
		    	'Intensivbetten (geimpft)': '#ffa600',
		    	'Intensivbetten (ungeimpft)': '#FDA',
			},
		    types: {
		    	'Intensivbetten (geimpft)': 'bar',
		    	'Intensivbetten (ungeimpft)': 'bar',
		    },
            groups: [
                ['Intensivbetten (geimpft)', 'Intensivbetten (ungeimpft)'],
            ],
            order: null,
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
                max: 1,
                min: 0,
	            tick: {
	                format: d3.format(",.0%"),
	            },
                padding: { top: 0, bottom: 0 }
            },
   		},
	    subchart: {
	        show: false
	    },
	    tooltip: {
	    	format: {
	    		title: function (d) { return d.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); },
                value: d3.format(",.1%"),
	    	}
	    },
	    zoom: {
	        enabled: true
	    }
    });

	const request = new XMLHttpRequest();
	request.open('GET', 'data-hmsi.json');
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		// Prepare data
		const data = request.response;
		const date = ['date'].concat(data.map(v => v['date']));
        const hospitalisierung = ['Hospitalisierungsinzidenz'].concat(data.map(v => v['hospitalisierung']));
        const intensivbettenConfirmed = ['Intensivbetten (bestätigt)'].concat(data.map(v => v['intensivbettenConfirmed']));
        const intensivbettenSuspicion = ['Intensivbetten (Verdacht)'].concat(data.map(v => v['intensivbettenSuspicion']));
        const intensivbetten = ['Intensivbetten'].concat(data.map(v => v['intensivbettenConfirmed'] + v['intensivbettenSuspicion']));
        const normalbettenConfirmed = ['Normalbetten (bestätigt)'].concat(data.map(v => v['normalbettenConfirmed']));
        const normalbettenSuspicion = ['Normalbetten (Verdacht)'].concat(data.map(v => v['normalbettenSuspicion']));
        const normalbetten = ['Normalbetten'].concat(data.map(v => v['normalbettenConfirmed'] + v['normalbettenSuspicion']));
        const intensivbettenNotImmunizedRatio = ['Intensivbetten (ungeimpft)'].concat(data.map(v => v['intensivbettenNotImmunizedRatio']));
        const intensivbettenImmunizedRatio = ['Intensivbetten (geimpft)'].concat(data.map(v => v['intensivbettenImmunizedRatio']));
        const immunizedRatio = ['Geimpft'].concat(data.map(v => v['immunizedRatio']));
        const immunizedRatioApproved = ['Geimpft (impffähig)'].concat(data.map(v => v['immunizedRatioApproved']));

		// Print current data
		const currentExploded = date.slice(-1)[0].split('.')
		document.getElementById('current-date').innerText = new Date(currentExploded[2], currentExploded[1]-1, currentExploded[0])
			.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
		function setDataChange(element, current, before, format) {
			const change = current - before;
			element.innerText = (change < 0 ? '' : '+') + format(change);
			element.classList.add(change <= 0 ? 'better' : 'worse');
		}
		function setCurrentData(field, data, format) {
            const current = data.slice(-1)[0];
            const dayEarlier = data.slice(-2)[0];
            const weekEarlier = data.slice(-8)[0];
			document.getElementById('current-' + field).innerText = format(current);
			setDataChange(document.getElementById('day-change-' + field), current, dayEarlier, format);
			setDataChange(document.getElementById('week-change-' + field), current, weekEarlier, format);
		}
		setCurrentData('hospitalisierungsinzidenz', hospitalisierung, t => Number(t).toFixed(2));
		setCurrentData('intensivbetten', intensivbetten, t => Math.round(t));
		setCurrentData('intensivbetten-confirmed', intensivbettenConfirmed, t => Math.round(t));
		setCurrentData('intensivbetten-suspicion', intensivbettenSuspicion, t => Math.round(t));
		setCurrentData('intensivbetten-immunized', intensivbettenImmunizedRatio, t => Number(t * 100).toFixed(1) + '%');
		setCurrentData('intensivbetten-not-immunized', intensivbettenNotImmunizedRatio, t => Number(t * 100).toFixed(1) + '%');
		setCurrentData('normalbetten', normalbetten, t => Math.round(t));
		setCurrentData('normalbetten-confirmed', normalbettenConfirmed, t => Math.round(t));
		setCurrentData('normalbetten-suspicion', normalbettenSuspicion, t => Math.round(t));
		setCurrentData('immunized', immunizedRatio, t => Number(t * 100).toFixed(1) + '%');
		setCurrentData('immunized-approved', immunizedRatioApproved, t => Number(t * 100).toFixed(1) + '%');

		// Draw charts
		leitindikatorenChart.load({
			columns: [date, hospitalisierung, intensivbetten, intensivbettenConfirmed, intensivbettenSuspicion]
		});
		weitereIndikatorenChart1.load({
			columns: [date, normalbetten, normalbettenConfirmed, normalbettenSuspicion]
		});
		weitereIndikatorenChart2.load({
			columns: [date, immunizedRatio, immunizedRatioApproved, intensivbettenImmunizedRatio, intensivbettenNotImmunizedRatio]
		});

        {
            {% include reader.js chartId="leitindikatoren-chart" description="Diagramm des Verlaufs der Leitindikatoren zur Bestimmung des hessischen Pandemiegeschehens" %}
        }
        {
            {% include reader.js chartId="weitere-indikatoren-chart-1" description="Diagramm des Verlaufs weiterer Indikatoren zur Bestimmung des hessischen Pandemiegeschehens (Normalbetten)" %}
        }
        {
            {% include reader.js chartId="weitere-indikatoren-chart-2" description="Diagramm des Verlaufs weiterer Indikatoren zur Bestimmung des hessischen Pandemiegeschehens (Anteil Geimpfte)" %}
        }
	}
</script>
