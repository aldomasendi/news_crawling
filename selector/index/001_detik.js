module.exports = {
  	path: '001_detik',
  	url: 'https://www.detik.com/search/searchall?query=jokowi&siteid=3&sortby=time&fromdatex=01/02/2019&todatex=31/03/2019',
	selector: {
	    container: '.list.media_rows.list-berita > article',
	    title: {
      		tag: 'h2.title'
	    },
	    url: {
      		tag: 'a',
  			baseUrl: ''
	    },
	    meta: {
	      	img: {
	        	tag: 'img',
	        	baseUrl: ''
	      	},
	      	time: {
	        	tag: 'span > date',
	        	attr: 'title'
	      	}
	    },
	    category: null,
      	tags: null
  	}
}