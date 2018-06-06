/**
 * Require Browsersync
 */
var browserSync = require('browser-sync').create();

/**
 * Run Browsersync with server config
 * You can use an arrays for files to specify multiple files
 */
browserSync.init({
  proxy: {
    target: 'http://localhost:1234/',
    // proxyRes: [
    //   function(proxyRes, req, res) {
    //     // console.log(proxyRes.req.path);
    //     console.log(req.url)
    //     if (req.url.indexOf('t.php') != -1) {
    //       req.url = 'http://abvedanta.online' + req.url
    //       console.log(req.url)
    //     }
    //   }
    // ]
  },

  // middleware: [{
  //   route: '/inc',
  //   handle: function(req, res, next) {
  //     console.log(req, res)
  //     if (req.url.indexOf('api') != -1) {
  //       proxy.web(req, res);
  //     } else {
  //       next();
  //     }
  //   }
  // }],

  // serveStatic: ['app/static'],
  // files: 'app/static/_custom.css',
})