handler = {}

handler.helloWorld = (request, h) => {
	return 'Hello World'
}

handler.helloWorldSecure = (request, h) => {
	return 'Hello ' + request.auth.credentials.id;
}

module.exports = handler;