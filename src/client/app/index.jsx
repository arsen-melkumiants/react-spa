import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import './less/main.less';

import NavBox from 'navigation/NavBox';
import ChatBox from 'chat/ChatBox';
import GalleryBox from 'gallery/GalleryBox';
import SettingsBox from 'settings/SettingsBox';
import NotFound from 'not_found/NotFound';

class App extends React.Component {
	render () {
		return (
			<Router>
				<div>
					<NavBox>
						<Switch>
							<Route exact path="/" component={ ChatBox }/>
							<Route path="/chat" component={ ChatBox }/>
							<Route path="/gallery" component={ GalleryBox }/>
							<Route path="/settings" component={ SettingsBox }/>

							<Route component={ NotFound }/>
						</Switch>
					</NavBox>
				</div>
			</Router>
		);
	}
}

render(<App/>, document.getElementById('content'));
