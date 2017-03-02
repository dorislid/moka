var webpack = require('webpack');
var path= require("path");
var fs= require("fs");

var watch=process.argv[2]=='-w';

module.exports = {
    watch: watch,
    devtool: 'source-map',
    entry:get_entry(),
    output: {
        path: 'build/script',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$|\.jsx$/,
            loader: 'babel' ,
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    resolve: {extensions: ['', '.jsx', '.js']}
};

function get_entry() {
    var paths = path.resolve(__dirname,'src/components/pages');
    var dir_list=fs.readdirSync(paths);
    var entry_list={};
    dir_list.forEach(function(v,k){
        entry_list[v]='./src/components/pages/'+v+'/entry.jsx'
    });
    return entry_list;
}