## external crypto key support start
str2ab = (str) ->
  buf = new ArrayBuffer(str.length) 
  bufView = new Uint8Array(buf)
  for ind in [0..str.length-1]
    bufView[ind] = str.charCodeAt(ind)
  return buf

hls.config.__loader = hls.config.loader
hls.config.loader = ->
  xhrLoader = new hls.config.__loader(hls)
  src = currentSource
  if src && src.crypto
    xhrLoader._load = xhrLoader.load
    xhrLoader.load = ->
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
  return xhrLoader
## external crypto key support end
currentSource example:

{src: '//mydomain/video.m3u8', crypto: {method: 'AES-128', key: 'VeryVerySecretKey'}}