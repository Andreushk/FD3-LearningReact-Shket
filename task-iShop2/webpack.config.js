const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = { 
    entry: "./app.js", // основной файл приложения
    output:{ 
        path: __dirname, // путь к каталогу выходных файлов
        filename: "bundle.js"  // название создаваемого файла 
    }, 
    devtool:'source-map',
    module:{ 
        rules:[
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: ["css-loader"]
                })
            },       
        ] 
    },
    plugins: [
        extractCSS
    ]
}