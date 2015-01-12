module.exports = function(rootRef) {
    return {
        rootRef: rootRef,
        userRef: rootRef.child('users')
    };
};
