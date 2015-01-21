module.exports = function(rootRef) {
	var config = rootRef.child('config');
    return {
        root: rootRef,
        users: rootRef.child('users'),
        logs: rootRef.child('logs'),
        levels: config.child('levels')
    };
};
