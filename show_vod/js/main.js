
if (Hls.isSupported()) {
    const video = document.getElementById("video");
    const hls = new Hls();
	var enc = new TextEncoder("utf-8");
	//var key = "6e1580088bbdf7c0410a8fa3eb3e9a59";
    var m3u8list = getdummym3u8();
    console.log('returned-->' +m3u8list);
    var key =  CryptoJS.enc.Utf8.parse("Yq3t6w9z$C&F)J@M");
    var iv  = CryptoJS.enc.Utf8.parse("");
    //var m3u8_str = m3u8_dec(manifest_encrypted, key2)
    //var m3u8_str = decrypt(manifest_encrypted);
    var m3u8_str = decrypt(m3u8list[0]);
    console.log(m3u8_str);
    var arym3u8 = m3u(m3u8_str);
    console.log(arym3u8);
    arym3u8[4].KEY.URI ="data:text/plain;charset=utf-8,6e1580088bbdf7c0410a8fa3eb3e9a59";
    var __decryption_key =  "data:text/plain;charset=utf-8,6e1580088bbdf7c0410a8fa3eb3e9a59";
    //var __decryption_key =  "";
    var m3u8_new = changekey(m3u8_str);
    //var m3u8_new = m3u8obj2Jsonstr2(m3u8_str);
    //var m3u8_new = m3uw(  JSON.parse(JSON.stringify(arym3u8, null, 0)));
    //console.log(m3u3_json_replace( arym3u8));
    console.log('-----')
    var m3u8_ary = new Array(m3u8_new);
    console.log(m3u8_ary);
    
   //var arym3u8_w = m3u_w(arym3u8);
   //console.log(arym3u8_w);
 /*   const m3u8 =`
#EXTM3U
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXTINF:9
1.ts
#EXTINF:9
2.ts
EXT-X-DISCONTINUITY
#EXTINF:3,
3.ts
#EXT-X-ENDLIST`;
    var parser = VParser;

    var m3uObject = JSON.stringify(parser.m3u8Parser(manifest_str,'http://localhost',(tagInfo,result)=>{
  // do something with current parsed tag
  console.log(tagInfo);
  return result; // must return
}), null, 0);

*/
//console.log(JSON.stringify(manifest, null, 2));



 //console.log(URL.createObjectURL([enc.encode(m3u8_ary.join('\n'))]));


  hls.attachMedia(video);
  //alert(hls.config.loader);
  hls.on(Hls.Events.MEDIA_ATTACHED, function() {
    console.log("video and hls.js are now bound together !");
    hls.loadSource(
      //"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
	  //"http://localhost:8888/vod/my.m3u"
      //"http://localhost:8888/vod/test.m3u"
	//URL.createObjectURL(new Blob([enc.encode(manifest.join('\n'))]))
    URL.createObjectURL(new Blob([enc.encode(m3u8_ary.join('\n'))]))
      //URL.createObjectURL([enc.encode(m3u8_ary.join('\n'))])
    );
  });
/*
 hls.on(Hls.Events.MANIFEST_LOADING, function(e) {
    console.log("Loading m3u8 file !");
    alert(JSON.stringify(e));
	
  });
  play.addEventListener("click", () => {
    console.log("play");
    video.play();
  });
  pause.addEventListener("click", () => {
    console.log("play");
    video.pause();
  });
/*
hls.config.__loader = hls.config.loader
hls.config.loader = function () {
  xhrLoader = new hls.config.__loader(hls)
  src = '{src: "test.m3u", "crypto": {"method": "AES-128"", "key": "VeryVerySecretKey"}}';
  if (src && src.crypto ) {
    xhrLoader._load = xhrLoader.load
    xhrLoader.load = function() {
      if arguments[0].url == 'crypto://decrypt'
        src.crypto.key_raw = str2ab(src.crypto.key) if src.crypto.key_raw == undefined
        arguments[2].onSuccess.apply(this, [
          {data: src.crypto.key_raw, url: arguments[0].url},
          {},
          arguments[0]
        ])
      else
        if arguments[0].type == 'manifest'
          onSuccess = arguments[2].onSuccess
          arguments[2].onSuccess = ->
            arguments[0].data = arguments[0].data.replace(/#EXT-X-KEY[^#]/gm,'#EXT-X-KEY:METHOD=' + src.crypto.method + ',URI=crypto://decrypt\n')
            onSuccess.apply(this,arguments)
        xhrLoader._load.apply(this, arguments)
	}
  return xhrLoader
} */


    function getNode(array, id) {
        var node;
        array.some(function iter(a) {
            if (a._id === id) {
                node = a;
                return true;
            }
            return Array.isArray(a.subItems) && a.subItems.some(iter);
        });
        return node;
    }
        
    function getParent(array, id) {
        var parent ;
        array.some(function iter(p) {
            return function (a) {
                if (a._id === id) {
                    parent = p;
                    return true;
                }
                return Array.isArray(a.subItems) && a.subItems.some(iter(a));
            };
        }(undefined));
        return parent;
    }
    function m3u3_json_replace( m3u8json, newkey) {
        for (var i=0; i < m3u8json.length; i++) {
            if (m3u8json[i].KEY != undefined) {
                m
                return myArray[i];
            }
        }
    }
     function search( myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].KEY != undefined) {
                return myArray[i];
            }
        }
     }
     function getdummym3u8() {     
        var request = new XMLHttpRequest();
        var m3u8list  = new Array();
        for (var i=1; i<=3; i++){
            request.open('get', './dummy' + i + '.m3u8', false);
            request.send();
            console.log('request m3u8: ' + request.responseText);
            m3u8list.push(request.responseText);
            }
        return m3u8list;
    }    
    function m3u8_dec(m3u8_enc,key){
        //var b64info = m3u8_enc.toString().replace(/\ +/g,"").replace(/[\r\n]/g,"");
        //return GibberishAES.dec(b64info, key);
        var decrypted = CryptoJS.AES.decrypt(m3u8_enc, key);
        return decrypted;
    }
    function decrypt(encryptedText) {  
      var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(encryptedText)
      });
      return CryptoJS.AES.decrypt(cipherParams, key, 
                                  { iv: iv,
                                   padding: CryptoJS.pad.Pkcs7,
                                   mode: CryptoJS.mode.CBC
                                  }).toString(CryptoJS.enc.Utf8);
    }
    function encrypt(plainText) {
        return CryptoJS.AES.encrypt(plainText, key, 
              { iv: iv,
               padding: CryptoJS.pad.Pkcs7,
               mode: CryptoJS.mode.CBC
              }).ciphertext.toString(CryptoJS.enc.Base64);
    }
    function changekey(m3u8str){
     var jsonstr =   m3u8str.replace("./enc.key", __decryption_key)
        
    return jsonstr
    }
    function m3u8obj2Jsonstr2(m3u8list){
        var jsonstr = '';
        for (var i=0; i< m3u8list.length;i++) {
            //jsonstr +=  JSON.stringify(m3u8list[i]).replace(/^\{+/g, '').replace(/^\{+|\}+$/g, ','); 
            //jsonstr = JSON.parse(jsonstr);
            jsonstr += JSON.stringify(mapToObj(m3u8list[i]));
        
            
        }
        return jsonstr= jsonstr.replace(/,\s*$/, "");;
    }
    function mapToObj(map){
      const obj = {}
      for (let [k,v] of map)
        obj[k] = v
      return obj
    }
}