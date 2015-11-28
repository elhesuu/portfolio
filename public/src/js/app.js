import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './component/routing';
import { createHistory, useBasename } from 'history';
import { mapValues, keys } from 'lodash';

import Main from './component/main';
import AboutPage from './component/about';
import CareerPage from './component/career';
import SkillsPage from './component/skills';

import ES6Collections from 'es6-collections';
import ES6Promise from 'es6-promise'; // move 
import WhatwgFetch from 'whatwg-fetch'; // move 

function createWithProps (Component, props) {
	return React.createClass({
		render: () => React.createElement(Component, props)
	});
}

const routesComponentMap = {
    'about': AboutPage,
    'career': CareerPage,
    'skills': SkillsPage,
};

function render (data) {

	const configuredComponents = mapValues(routesComponentMap, (Component, name) => 
		createWithProps(Component, { content: data[name] })
	);

	const history = useBasename(createHistory)({
		basename: window.location.pathname
	});

	ReactDOM.render(
		<Routing main={ Main } routes={ configuredComponents } history={ history } />,
		document.getElementById('root')
	);
}

ES6Promise.polyfill();

fetch('/content.json')
	.then(res => res.json())
	.then(render);

export const routes = keys(routesComponentMap);

export default {};