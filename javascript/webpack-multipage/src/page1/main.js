//"raw-loader" 引入HTML 文件，修改HTML文件时动态刷新
if(ENV == 'DEV') {
	require('pages/html/page1.html')
}

import './style.css'
import * as d3 from 'd3'
console.log(d3)
console.log(123)