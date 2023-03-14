class Storage {
	static setItem(key, value) {
		window.localStorage.setItem(key,value);
	}

	static getItem(key) {
		return window.localStorage.getItem(key);
	}

	static removeItem(key) {
		window.localStorage.removeItem(key);
    }
    
    static multiGet(keys){
        let values = [];
        for(let key of keys){
            values.push([ key, Storage.getItem(key) ]);
        }

        return values;
    }

    static multiSet(keyValuePairs){
        for(let pair of keyValuePairs){
            window.localStorage.setItem(pair[0], pair[1]);
        }
    }

    static multiRemove(keys){
        for(let key of keys){
            window.localStorage.removeItem(key);
        }
    }

    static clear(){
        window.localStorage.clear();
    }
}

class Session {
	static setItem(key, value) {
		window.localStorage.setItem(key,value);
	}

	static getItem(key) {
		return window.localStorage.getItem(key);
	}

	static removeItem(key) {
		window.localStorage.removeItem(key);
    }
    
    static multiGet(keys){
        let values = [];
        for(let key of keys){
            values.push([ key, Session.getItem(key) ]);
        }

        return values;
    }

    static multiSet(keyValuePairs){
        for(let pair of keyValuePairs){
            window.localStorage.setItem(pair[0], pair[1]);
        }
    }

    static multiRemove(keys){
        for(let key of keys){
            window.localStorage.removeItem(key);
        }
    }

    static clear(){
        window.localStorage.clear();
    }
}

class MockStorage {
	static setItem(key, value) {}

	static getItem(key) { return null }

	static removeItem(key) {}
    
    static multiGet(keys){ return [] }

    static multiSet(keyValuePairs){}

    static multiRemove(keys){}

    static clear(){}
}

let SyncStorage = function() {
	return (typeof window !== `undefined`)? Storage : MockStorage;
}();

let SessionStorage = function() {
	return (typeof window !== `undefined`)? Session : MockStorage;
}();

export default SyncStorage;
export { SessionStorage };