import React from 'react';

import 'not_found/less/not_found.less';

class NotFound extends React.Component {
	render() {
		return (
			<h1 className="not-found">Whooops....<br/>Page not found</h1>
		)
	}
}

export default NotFound;