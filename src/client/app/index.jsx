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
		<div>
			<NavBox>
				<Switch>
					<Route exact path="/" component={ChatBox} />
					<Route path="/chat" component={ChatBox} />
					<Route path="/gallery" component={GalleryBox} />
					<Route path="/settings" component={SettingsBox} />

					<Route component={NotFound} />
				</Switch>
			</NavBox>
		</div>
	</Router>
);

ReactDOM.render(App, document.getElementById('content'));
