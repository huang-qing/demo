function route(pathname) {
    if (pathname.includes("user")) {
        return `
        About to route a request for ${pathname}
        __filename:${__filename}
        __dirname:${__dirname}

        
        `;
    }

    return false;
}

exports.route = route;