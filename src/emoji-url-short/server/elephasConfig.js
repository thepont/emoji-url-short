
export default elephas_config = {
    __dirname: __dirname,
    routes_root_path: __dirname + '/',
    services_root_path: __dirname + '/',
    static_root_path: __dirname.replace('server', 'public') + '/',
    httpsOnly: false,
    server: {
        port: process.env['EMOJI_URL-SHORT_PORT'] || 3000,
    },
    session: false,
    csp: false
};

