module.exports = function(rootRef) {
    console.log(rootRef, 'rootRef')
	var config = rootRef.database().ref('config');
    return {
        root: rootRef,
        users: rootRef.database().ref('users'),
        logs: rootRef.database().ref('logs'),
        levels: config.child('levels')
    };
};
