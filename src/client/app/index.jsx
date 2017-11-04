import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import NavBox from 'navigation/NavBox';
import ChatBox from 'chat/ChatBox';
import GalleryBox from 'gallery/GalleryBox';
import SettingsBox from 'settings/SettingsBox';
import NotFound from 'not_found/NotFound';

import './less/main.less';

const App = (
	<Router>
		<div className="b_page">
			<div className="b_page__navigation">
				<NavBox />
			</div>
			<div className="b_page__container content container">
				<Switch>
					<Route exact path="/" component={ChatBox} />
					<Route path="/chat" component={ChatBox} />
					<Route path="/gallery" component={GalleryBox} />
					<Route path="/settings" component={SettingsBox} />

					<Route component={NotFound} />
				</Switch>
			</div>
		</div>
	</Router>
);

ReactDOM.render(App, document.getElementById('content'));
