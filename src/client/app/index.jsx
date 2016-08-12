import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import './less/main.less';

import NavBox from 'navigation/NavBox';
import ChatBox from 'chat/ChatBox';
import GalleryBox from 'gallery/GalleryBox';
import SettingsBox from 'settings/SettingsBox';
import NotFound from 'not_found/NotFound';

class App extends React.Component {
	render () {
		return (
			<Router history={ browserHistory }>
				<Route path="/" component={ NavBox }>
					<IndexRoute component={ ChatBox }/>
					<Route path="/chat" component={ ChatBox }/>
					<Route path="/gallery" component={ GalleryBox }/>
					<Route path="/settings" component={ SettingsBox }/>
					<Route path="*" component={ NotFound }/>
				</Route>
			</Router>
		);
	}

}

render(<App/>, document.getElementById('content'));