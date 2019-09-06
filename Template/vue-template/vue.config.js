//vue.config.js
const path = require('path');
const port = 9999;
// 压缩代码
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

// 图片整合成雪碧图
const SpritesmithPlugin = require('webpack-spritesmith');

function resolve(dir) {
    return path.join(__dirname, dir);
}

// 是否是生产环境
const isPro = process.env.NODE_ENV == 'production';

// customerTemplate
var templateFunction = function (data) {
    // console.log('---', data)
    var shared = '.sprite_ico { background-image: url(I);display:inline-block;background-size: Wpx Hpx;}'
        .replace('I', data.sprites[0].image)
        .replace('W', data.spritesheet.width)
        .replace('H', data.spritesheet.height);

    var perSprite = data.sprites
        .map(function (sprite) {
            return `.sprite_ico_N { width: Wpx; height: Hpx; background-position: Xpx Ypx;}`
                .replace('N', sprite.name)
                .replace('W', sprite.width)
                .replace('H', sprite.height)
                .replace('X', sprite.offset_x)
                .replace('Y', sprite.offset_y);
        })
        .join('\n');

    return shared + '\n' + perSprite;
};

module.exports = {
    publicPath: './',
    outputDir: 'cdn',
    pages: {
        index: {
            entry: ['src/main.js'],
            template: 'public/index.html',
            fileName: 'index.html',
            title: 'Index'
        }
    },

    productionSourceMap: isPro,

    // 指定这个插件 babel
    transpileDependencies: ['vuex-local-sync'],

    // 抽离 css
    css: {
        extract: isPro
    },

    // dev Server
    devServer: {
        port: port,
        open: true,
        hot: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api/v1': {
                // target: 'http://192.168.2.111:18080',
                // target: 'http://62.234.133.41',
                target: 'http://111.200.244.194:18080',
                changeOrigin: true,
                router: {
                    // '/shareIndex': 'http://111.200.244.194:18080',
                    // '/shareIndex': 'http://192.168.2.111:18080',
                    // '/heartVoice': 'http://192.168.66.209:8080',
                    // '/heartVoice': 'http://192.168.2.111:18080',
                    // '/banner': 'http://192.168.2.111:18080',
                    // '/market': 'http://192.168.2.111:18080',
                    // '/tzgg': 'http://192.168.2.111:18080',
                }
            },
            // 线上服务
            '/uc/': {
                target: 'http://222.73.83.123:7080',
                changeOrigin: true
            },
            // 通讯录相关
            '/contact': {
                target: 'http://111.200.244.194:18080',
                // target: 'http://192.168.2.111:18080',
                changeOrigin: true
            },
            // 解决 TLS 问题
            '/media': {
                target: 'https://static-legacy.dingtalk.com',
                changeOrigin: true
            },
            // pdf 预览
            '/pdf': {
                // pathRewrite: {
                //     '/doc': '/'
                // },
                target: 'http://62.234.133.41:6002',
                changeOrigin: true
            },
            // 文件服务
            '/group1': {
                target: 'http://111.200.244.194:18888',
                changeOrigin: true
            },

        }
    },

    // webpack 链式操作 配置 loader
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);

        // 图片压缩
        config.module
            .rule('imgCompression')
            .test(/\.(jpe?g|png|gif|svg)$/)
            .pre()
            .use('image-webpack-loader')
            .loader('image-webpack-loader');

        //新建规则 --> 限制内联图片为 10K
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options =>
                Object.assign(options, {
                    limit: 10240
                })
            );
    },

    // webpack 配置 设置 alias
    configureWebpack: config => {
        config.resolve.alias['@'] = resolve('src');
        config.resolve.alias['@c'] = resolve('src/components');
        config.resolve.alias['@pages'] = resolve('src/pages');
        config.resolve.alias['@less'] = resolve('src/less');

        // 生产环境
        if (isPro) {
            const plugins = [
                // 雪碧图
                new SpritesmithPlugin({
                    src: {
                        //下面的路径，根据自己的实际路径配置
                        cwd: path.resolve(__dirname, './src/assets/icons'),
                        glob: '*.png'
                    },
                    // 输出雪碧图文件及样式文件
                    target: {
                        //下面的路径，根据自己的实际路径配置
                        image: path.resolve(__dirname, './src/assets/sprite.png'),
                        css: [
                            [
                                path.resolve(__dirname, './src/less/sprite.less'),
                                {
                                    format: 'function_based_template'
                                }
                            ]
                        ]
                        // css: path.resolve(__dirname, './src/less/sprite.less')
                    },
                    // 自定义模板
                    customTemplates: {
                        function_based_template: templateFunction
                    },
                    // 样式文件中调用雪碧图地址写法
                    apiOptions: {
                        // 这个路径根据自己页面配置
                        cssImageRef: '../assets/sprite.png'
                    },
                    spritesmithOptions: {
                        // algorithm: 'top-down'
                        padding: 5
                    }
                }),
                // 压缩代码
                new CompressionWebpackPlugin({
                    deleteOriginalAssets: false,
                    test: /\.(js|css|html|woff|ttf)$/,
                    compressionOptions: {
                        numiterations: 15
                    },
                    threshold: 10240,
                    minRatio: 0.8,
                    algorithm(input, compressionOptions, callback) {
                        return zopfli.gzip(input, compressionOptions, callback);
                    }
                })
            ];

            config.plugins = [...config.plugins, ...plugins];
        }

        // split code 分离公共依赖
        config.optimization = {
            splitChunks: {
                // 静态资源缓存
                // test, priority and reuseExistingChunk can only be configured on cache group level.
                cacheGroups: {
                    // 提取 node_modules 里面依赖的代码
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'chunk-vendors',
                        chunks: 'all',
                        minChunks: 2, //2个共享以及以上都提取
                        priority: -10 //优先级
                    },
                    // 提出每个模块公共的代码
                    commons: {
                        name: 'chunk-commons',
                        test: /\.js$/,
                        chunks: 'initial',
                        minChunks: 2, //两个共享以及以上都提取,
                        priority: -20, //优先级
                        reuseExistingChunk: true
                    },
                    css: {
                        name: 'chunk-common',
                        test: /\.less$/,
                        minChunks: 10,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            }
        };
    }
};
