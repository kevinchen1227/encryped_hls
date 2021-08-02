
function aaa(json_path){
	//请求接口
	$.ajax({
		url: json_path,
		dataType : "json",
		success:function(json){
			de_key = json["key"];
			console.log(json)
			for(var key in json){
				if (key == "key"){
					continue;
				}
				bbb(key, json[key], de_key)
		　　}
		}
	});
}


function bbb(path,id,key){
	$.ajax({
		url: path,
		success:function(result){
			// 去空格，去换行符
			var b64info = result.toString().replace(/\ +/g,"").replace(/[\r\n]/g,"");
			d = GibberishAES.dec(b64info, key);
			// Image加载解密后的base64
			$(id).attr("src", d);
		}
	});
}