module.exports = {
    HEADER: {
        'content-type': 'application/json'
    },
	// #ifdef H5
    baseURL: process.env.NODE_ENV == 'production' ? '/addons/pages/samos/public/index.php/api/' : '/addons/pages/samos/public/index.php/api/',
    // baseURL: process.env.NODE_ENV == 'production' ? '/api/' : '/api/',
	// #endif
	// #ifndef H5
	baseURL: '/addons/pages/samos/public/index.php/api/'
	// #endif
}