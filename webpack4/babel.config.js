const removeConsolePlugin = [];

console.log("babel", process.env.NODE_ENV)
//移除console
if (process.env.NODE_ENV == "production") {
    console.log("====remove-console=====");
    removeConsolePlugin.push([
        "transform-remove-console",
        {
            "exclude": ["error", "warn"]
        }
    ]);
}

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "browsers": [
                        "last 2 Chrome versions",
                        "last 2 Firefox versions",
                        "last 2 Safari versions",
                        "last 2 iOS versions",
                        "last 1 Android version",
                        "last 1 ChromeAndroid version",
                        "ie 11"
                    ]
                }
            }
        ],
    ],
    "plugins": [
        // 按需加载
        'lodash',
        ...removeConsolePlugin
    ]
}