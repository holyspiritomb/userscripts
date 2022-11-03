// ==UserScript==
// @name        Eruda Mobile devtools
// @namespace   holyspiritomb
// @match       *://*/*
// @grant       none
// @version     1.1
// @author      holyspiritomb
// @run-at      document-start
// @require     https://cdn.jsdelivr.net/npm/eruda@2.5.0
// @require     https://cdn.jsdelivr.net/npm/eruda-code@2.0.0
// @require     https://cdn.jsdelivr.net/npm/eruda-dom@2.0.0
// @connect     chrome-extension://*
// @description Eruda mobile devtools as a userscript, for troubleshooting on mobile, targeting Vivaldi via Adguard for Android.
// ==/UserScript==

(function () {
    // if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    eruda.init({
        tool: ['console', 'elements', 'info', 'resources', 'sources','snippets'],
        autoScale: true,
        defaults: {
            displaySize: 40,
            transparency: 0.9,
            theme: 'Material Palenight'
        }
    });
	let console = eruda.get('console');
	let resources = eruda.get('resources');
	let elements = eruda.get('elements');
	let sources = eruda.get('sources');
	let snippets = eruda.get('snippets');
	console.config.set('asyncRender', true);
	console.config.set('jsExecution', true);
	console.config.set('catchGlobalErr', true);
	console.config.set('overrideConsole', true);
	console.config.set('displayExtraInfo', true);
	console.config.set('displayUnenumerable', true);
	console.config.set('displayGetterVal', true);
	console.config.set('lazyEvaluation', true);
	console.config.set('displayIfErr', true);
	resources.config.set('hideErudaSetting', false);
	elements.config.set('overrideEventTarget', true);
	sources.config.set('indentSize','4');
	sources.config.set('formatCode', false);
	sources.config.set('showLineNum', true);
	snippets.add('hello', function () {
    	console.log('Hello World!');
	}, 'Display hello on console');

    eruda.position({x: 20, y: 20});
    eruda.show();
	eruda.add(erudaCode);
	eruda.add(erudaDom);
	console.log('eruda is a console for %s.', 'mobile browsers');
	console.table([{test: 1}, {test: 2}, {test2: 3}], 'test');
	console.error(new Error('eruda'));
})();

