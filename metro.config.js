const { makeMetroConfig } = require("@rnx-kit/metro-config")
const { getDefaultConfig } = require("expo/metro-config")

/*if (process.env.NODE_ENV === 'production') {
  const config = getDefaultConfig(__dirname);
  module.exports = config
} else {*/
  module.exports = (async () => {
    const config = await getDefaultConfig(__dirname);
    
    return makeMetroConfig({
      projectRoot: __dirname,
      resolver: {
        //resolveRequest: MetroSymlinksResolver(),
        //assetExts: [...defaultConfig.resolver.assetExts, "bin"],
        sourceExts: [
          ...config.resolver.sourceExts,
          "mjs",
          "cjs",
        ],
      },
    })
  })()
//}
