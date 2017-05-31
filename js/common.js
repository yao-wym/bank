mui.plusReady(function() {

	self = plus.webview.currentWebview()
	self.addEventListener('show', function() {
		var current = self.id;
		if(['index_recive_list.html', 'index_order_list.html', 'index_check_list.html', 'index_message_sub.html', 'index_ucenter.html'].indexOf(current) >= 0) {
			var main = plus.webview.getLaunchWebview();
			console.log('show ' + current.id);
			mui.fire(main, 'init_header', {
				'title': document.getElementsByTagName('title')[0].innerText
			});
		}
	});
})
mui('body').on('tap', 'a,li,div', function(e) {
	var targetTab_url = this.getAttribute('link');
	if(!targetTab_url) {
		return;
	}
	targetTab = targetTab_url.split("?")[0];
	var params = parseQueryString(targetTab_url);
	if(targetTab != null) {
		console.log('link = ' + targetTab);
		var page = plus.webview.getWebviewById(targetTab);
		if(!page) {
			console.log('open new page ' + targetTab);
			console.log('params:' + JSON.stringify(params));
			mui.openWindow({
				url: targetTab,
				id: targetTab,
				styles: {
					top: '0px'
				},
				extras: params
			});
		} else {
			mui.fire(page, 'init_with_params', {
				'params': params
			});
			console.log('page ' + targetTab + ' is loaded');
			page.show("slide-in-right", 300);
		}
	}
	return true;
});

function redirect(pageFullUrl) {
	console.log('link = ' + pageFullUrl);
	pageUrl = pageFullUrl.split("?")[0];
	var params = parseQueryString(pageFullUrl);
	var page = plus.webview.getWebviewById(pageUrl);
	if(!page) {
		console.log('open new page ' + pageUrl);
		mui.openWindow({
			url: pageUrl,
			id: pageUrl,
			styles: {
				top: '0px'
			},
			extras: params
		});
	} else {
		console.log('page ' + pageUrl + ' is loaded');
		mui.fire(page, 'init_with_params', {
			'params': params
		});
		page.show("slide-in-right", 300);
	}
}
bank = {
	"getItem": function(key) {
		var strVal = localStorage.getItem(key);
		if(strVal) {
			try {
				var val = JSON.parse(strVal);
				return val;
			} catch(e) {
				return strVal;
			}
		} else {
			return false;
		}
	},
	"setItem": function(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	},
	"post": function(url, data, callback) {
		token = localStorage.getItem('token') ? localStorage.getItem('token') : 'YHPD0001';
		console.log('token=' + token);
		data['token'] = token;
		if(!data['uid']) {
			data['uid'] = localStorage.getItem('uid');
		}
		if(!data['account']) {
			data['account'] = localStorage.getItem('account') ? localStorage.getItem('account') : "YHPD0001";
		}
		if(!data['sid']) {
			data['sid'] = 'YHPD0001';
		}
		if(!data['id']) {
			data['id'] = 'YHPD0001';
		}
		url = url + "?token=" + token + "&account=" + token + "&sid=" + data['sid'] + "&id=" + data['id']
		console.log("body=" + data['body']);
		console.log("url=" + url);
		mui.ajax({
			url: url,
			type: 'post',
			data: data,
			dataType: 'json',
			success: function(res) {
				console.log('current page = ' + self.id + ' response=' + JSON.stringify(res));
				if(res.code == "A00001") {
					if(callback) {
						callback(res.data);
					}
				} else {
					mui.toast(res.msg);
				}
			},
			error: function() {
				mui.toast('网络错误');
			}
		})
	},
	"get": function(url, params, callback) {
		console.log(url);
		token = localStorage.getItem('token') ? localStorage.getItem('token') : 'YHPD0001';

		params['token'] = token;
		if(!params['account']) {
			params['account'] = localStorage.getItem('account') ? localStorage.getItem('account') : "402848eb5bf02279015bf03ebbc5001c";
		}
		if(!params['sid']) {
			params['sid'] = 'YHPD0001';
		}
		if(!params['id']) {
			params['id'] = 'YHPD0001';
		}
		console.log('current page = ' + self.id + ' getParams=' + JSON.stringify(params));
		mui.ajax({
			url: url,
			type: 'GET',
			data: params,
			dataType: 'json',
			success: function(res) {
				console.log('current page = ' + self.id + ' data=' + JSON.stringify(res));
				if(res.code == 'A00001') {
					if(callback) {
						callback(res.data);
					}
				} else {
					mui.toast(res.msg);
				}
			},
			error: function() {

				mui.toast('网络错误');
			},
			complete: function() {
				//				if(mui('#refreshContainer')!=undefined) {
				//					console.log(mui('#refreshContainer'));
				//					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
				//					mui('#refreshContainer').pullRefresh().endPullupToRefresh();
				//				}
			}

		})
	}
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function parseQueryString(url) {
	var reg_url = /^[^\?]+\?([\w\W]+)$/,
		reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
		arr_url = reg_url.exec(url),
		ret = {};
	if(arr_url && arr_url[1]) {
		var str_para = arr_url[1],
			result;
		while((result = reg_para.exec(str_para)) != null) {
			ret[result[1]] = result[2];
		}
	}
	return ret;
}

function parseTimeStamp(timeStamp) {
	var date = new Date(timeStamp * 1);
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	return Y + M + D + h + m;
}

function logLocation(funcSeccess, funcFail) {
	plus.geolocation.getCurrentPosition(function(p) {
		console.log("Geolocation\nLatitude:" + p.coords.latitude + "\nLongitude:" + p.coords.longitude + "\nAltitude:" + p.coords.altitude);
		funcSeccess(p);
	}, function(e) {
		alert("Geolocation error: " + e.message);
		funcFail(p);
	});
}

function captureImage(funcSuccess, funcFail) {
	var cmr = plus.camera.getCamera();
	var res = cmr.supportedImageResolutions[0];
	var fmt = cmr.supportedImageFormats[0];
	console.log("Resolution: " + res + ", Format: " + fmt);
	cmr.captureImage(function(path) {
			console.log("Capture image success: " + path);
			funcSuccess(path);
		},
		function(error) {
			console.log("Capture image failed: " + error.message);
		}, {
			resolution: res,
			format: fmt
		}
	);
}

function createUpload(api, fileObj, funcSuccess) {
	plus.zip.compressImage({
			src: api,
			dst: "_doc/a.jpg",
			quality: 20
		},
		function() {
			api += "?account=18265378888";
			api += "&token=ccd5c24a35ee30fdf21b9635dc75541d";
			api += "&sid=" + "YHPD0001";
			var task = plus.uploader.createUpload(api, {
					method: "POST",
					blocksize: 204800,
					priority: 100
				},
				function(t, status) {
					alert(JSON.stringify(t));
					//			funcSuccess(t.url);
					// 上传完成
					if(status == 200) {
						alert("Upload success: " + t.url);
					} else {
						alert("Upload failed: " + status);
					}
				}
			);
			for(var key in fileObj) {
				alert(fileObj[key]);
				task.addFile("_doc/a.jpg", {
					"key": "file"
				});
			}
			//task.addEventListener( "statechanged", onStateChanged, false );
			console.log("api=" + api)
			console.log("uploading img src=" + fileObj['file'] + " acount=" + localStorage.getItem("account") + "token=" + localStorage.getItem("token"))
			task.start();
		},
		function(error) {
			alert("Compress error!");
		});

}