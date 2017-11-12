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
import StaticNotFound from 'static/StaticNotFound';

import './less/main.less';

const App = (
	<Router>
		<div className="b_page">
			<div className="b_page__navigation">
				<NavBox />
			</div>
			<div className="b_page__content">
				<Switch>
					<Route exact path="/" component={ChatBox} />
					<Route path="/chat" component={ChatBox} />
					<Route path="/gallery" component={GalleryBox} />
					<Route path="/settings" component={SettingsBox} />

					<Route component={StaticNotFound} />
				</Switch>
			</div>
		</div>
	</Router>
);

ReactDOM.render(App, document.getElementById('content'));
