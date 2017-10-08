class Storage {
	constructor() {
		this.storage = {
			width: 500,
			height: 300
		};
	}

	set(key, value) {
		if (key === undefined || key === null) {
			throw new Error('Invalid argument');
		}

		this.storage[key] = value;
	}

	get(key) {
		return this.storage[key];
	}
}

export default new Storage();
