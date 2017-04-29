plus.webview.currentWebview().addEventListener('show', function() {
	var current = plus.webview.currentWebview().id;
	if(['index_send.html', 'index_order.html', 'index_message.html', 'index_ucenter.html'].indexOf(current)>0){
		var main = plus.webview.getLaunchWebview();
		console.log('show ' + current.id);
		mui.fire(main, 'init_header', {
			'title': document.getElementsByTagName('title')[0].innerText
		});
	}
});
mui('body').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('link');
	if(targetTab!=null){
		console.log('link = '+targetTab);
		var page = plus.webview.getWebviewById(targetTab);
		if(!page){
			console.log('open new page '+targetTab);
			mui.openWindow	({ 
				url:targetTab,
				id:targetTab,
				styles:{
					top:'0px'
				}
			});
		}else{
			console.log('page '+targetTab+' is loaded');
			page.show("slide-in-right", 300);
		}
	}
	return true;
});
