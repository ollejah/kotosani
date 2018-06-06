'use strict'

var sharp = require('sharp')

module.exports = function(imagePath) {
  // Improves the performance of `resize`, `blur` and `sharpen` operations
  const simd = sharp.simd(true)
  var image = sharp(imagePath)

  return {
    metadata: function metadata() {
      return image.metadata()
    },

    resize: function resize(_ref) {
      var width = _ref.width,
        mime = _ref.mime,
        options = _ref.options

      return new Promise(function(resolve, reject) {
        var resized = image.clone().resize(width, null)

        // For css background
        if (options.background) {
          resized = resized.background(options.background).flatten()
        }

        // For 'image/jpeg'
        if (mime === 'image/jpeg') {
          resized = resized.jpeg({
            quality: options.quality,
            progressive: true,
            //  String set to '4:4:4' to prevent chroma subsampling
            //  when quality <= 90 (optional, default '4:2:0')
            chromaSubsampling: '4:4:4',
          })
        }

        /*// For 'image/webp' alternative
        if (mime === 'image/webp') {
          resized = resized.webp({
            quality: options.quality
          })
        }*/

        // For blurred placeholder
        if (options.placeholder && options.quality == 20) {
          resized = resized.jpeg({ quality: options.quality }).blur(30)
        }

        // console.log('jpegQuality', resized.options.jpegQuality)
        // console.log('blurSigma', resized.options.blurSigma)

        resized.toBuffer(function(err, data, _ref2) {
          var height = _ref2.height

          if (err) {
            reject(err)
          } else {
            resolve({
              data,
              width,
              height,
            })
          }
        })
      })
    },
  }
}