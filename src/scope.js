/* jshint globalstrict: true */
'use strict';

function Scope() {
	this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
	var watcher = {
		watchFn: watchFn,
		listenerFn: listenerFn,
		last: initWatchVal
	};
	this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function() {
	var self = this;
	var newValue, oldValue;
	_.forEach( this.$$watchers, function(watcher){
		newValue = watcher.watchFn(self);
		oldValue = watcher.last;
		if ( newValue !== oldValue ) {
			watcher.last = newValue;
			watcher.listenerFn(newValue, oldValue, self);
		}
	});
};

/*
 * What we need is to initialize the last attribute to something we can guarantee to be unique,
 * so that it’s different from anything a watch function might return.
 * A function fits this purpose well, since JavaScript functions are so-called reference
 * values - they are not considered equal to anything but themselves.
 */
function initWatchVal() {  }