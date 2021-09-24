// Screen reader accessibility
const dataPointEventTarget = document.querySelector('#{{ include.chartId }} .c3-event-rect');
const chartSvg = document.querySelector('#{{ include.chartId }} > svg');
const chartDataPoints = Array.from(document.querySelectorAll('#{{ include.chartId }} .c3-axis.c3-axis-x .tick'));
const chartIrrelevantAccessibilityTreeNodes = Array.from(document.querySelectorAll('#{{ include.chartId }} > svg > * > :not(.c3-axis-x), #{{ include.chartId }} > svg > * > :not(.c3-axis), #{{ include.chartId }} > svg > * > .c3-axis-x.c3-axis > :not(.tick)'));
const chartTooltip = document.querySelector('#{{ include.chartId }} .c3-tooltip-container');

chartSvg.setAttribute('role', 'graphics-document document');
chartSvg.setAttribute('aria-label', '{{ include.description }}');
chartIrrelevantAccessibilityTreeNodes.forEach(node => node.setAttribute('aria-hidden', 'true'));
chartTooltip.setAttribute('id', '{{ include.chartId }}-chart-tooltip');
chartTooltip.setAttribute('aria-hidden', 'true');

chartDataPoints.forEach((node, index) => {
    node.setAttribute('tabindex', 0);
    node.setAttribute('role', 'graphics-symbol img');
    node.setAttribute('aria-describedby', '{{ include.chartId }}-chart-tooltip');
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
