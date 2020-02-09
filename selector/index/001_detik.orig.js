module.exports = {
  	path: '001_detik',
  	url: 'https://news.detik.com/indeks',
	selector: {
	    container: '.list-content > article',
	    title: {
      		tag: 'h3 > a'
	    },
	    url: {
      		tag: 'h3 > a',
  			baseUrl: ''
	    },
	    meta: {
	      	img: {
	        	tag: 'img',
	        	baseUrl: ''
	      	},
	      	time: {
	        	tag: '.media__date > span',
	        	attr: 'title'
	      	}
	    },
	    category: null,
      	tags: null
  	}
}