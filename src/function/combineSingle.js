//requiring path and fs modules
const fs = window.require('fs');
const TempFolder = process.env.REACT_APP_FOLDER_TEMPORAL;
const network = ['AppLovin', 'Google', 'Unity', 'Mintegral', 'Iron', 'Tiktok'];
const date = new Date()
  .toISOString()
  .slice(0, 10)
  .replace('-', '_')
  .replace('-', '_');

export async function CombineAndExport({
  nameGame,
  linkStoreAndroid,
  linkStoreIOS,
  linkBaseCode,
  listFileCombine,
  listFileNew,
  ideaName,
  directorySave,
}) {
  //combineSingle
  let mainFile;
  const upFolder = `${directorySave}/Build`;
  if (listFileNew.length >= 1) {
    mainFile = fs.readFileSync(`${linkBaseCode}/index.html`, 'utf8');
    // console.log("🚀 ~ file: combineSingle.js ~ line 13 ~ CombineAndExport ~ mainFile", mainFile)

    listFileNew.map((file) => {
      let codeInFile = fs.readFileSync(`${TempFolder}/${file}`, 'utf8');
      if (file.toLowerCase().includes('map')) {
        mainFile = mainFile
          .replace(
            `<script src="map.json"></script>`,
            `<script>\n var map = ${codeInFile}\n</script>`
          )
          .replace(
            `this.load.tilemapTiledJSON('map', 'map.json')`,
            `this.load.tilemapTiledJSON('map', map);\n`
          )
          .replace(
            `this.load.tilemapTiledJSON('map', "map.json")`,
            `this.load.tilemapTiledJSON('map', map);\n`
          );
      } else if (file.toLowerCase().includes('image')) {
        mainFile = mainFile.replace(
          `<script src="Image.js"></script>`,
          `<script>\n${codeInFile}\n</script>`
        );
      } else if (file.toLowerCase().includes('sound')) {
        mainFile = mainFile.replace(
          `<script src="Sound.js"></script>`,
          `<script>\n${codeInFile}\n</script>`
        );
      }
    });

    listFileCombine.map((file) => {
      let codeInFile = fs.readFileSync(`${linkBaseCode}/${file}`, 'utf8');
      if (file.toLowerCase().includes('map')) {
        mainFile = mainFile.replace(
          `<script src="map.json"></script>`,
          `<script> \n var map = ${codeInFile}\n</script>`
        );
      } else if (file.toLowerCase().includes('image')) {
        mainFile = mainFile.replace(
          `<script src="Image.js"></script>`,
          `<script>\n${codeInFile}\n</script>`
        );
      } else if (file.toLowerCase().includes('Sound')) {
        mainFile = mainFile.replace(
          `<script src="Sound.js"></script>`,
          `<script>\n${codeInFile}\n</script>`
        );
      } else {
        mainFile = mainFile
          .replace(
            `<script src="${file}"></script>`,
            `<script>${codeInFile}</script>`
          )
          .replace(
            `this.load.tilemapTiledJSON('map', 'map.json')`,
            `this.load.tilemapTiledJSON('map', map);\n`
          )
          .replace(
            `this.load.tilemapTiledJSON('map', "map.json")`,
            `this.load.tilemapTiledJSON('map', map);\n`
          );
      }
    });
  } else {
    //render form basecode
    mainFile = fs.readFileSync(`${linkBaseCode}/index.html`, 'utf8');
    listFileCombine.map((file) => {
      let codeInFile = fs.readFileSync(`${linkBaseCode}/${file}`, 'utf8');
      if (file == 'map.json') {
        codeInFile = '<script>\nvar map = ' + codeInFile + '\n</script>';
        mainFile = mainFile.replace(
          `<script src="map.json"></script>`,
          codeInFile
        );
      } else {
        mainFile = mainFile
          .replace(
            `<script src="${file}"></script>`,
            `<script>\n${codeInFile}\n</script>`
          )
          .replace(
            `this.load.tilemapTiledJSON('map', 'map.json')`,
            `this.load.tilemapTiledJSON('map', map);\n`
          );
      }
    });
  }

  //check folder exists
  try {
    if (!fs.existsSync(upFolder)) {
      fs.mkdirSync(upFolder);
      //export
      for (let i = 0; i < network.length; i++) {
        console.log(network[i]);
        switch (network[i]) {
          case 'AppLovin':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .split(`console.log("GOTOSTORE")`).join(`
                          let device = "Android";
                          const linkGameIos = "${linkStoreIOS}";
                          const linkGameAndroid = "${linkStoreAndroid}";
                          function getMobileOperatingSystem() {
                              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                          
                              if (/android/i.test(userAgent)) {
                                  device = "Android";
                              } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                  device = "iOS";
                              } else {
                                  device = "Android";
                              }
                          
                          }
                          getMobileOperatingSystem();
                          
                             switch (device) {
                                  case "Android":
                                      mraid.open("${linkStoreAndroid}")
                                      break;
                                  case "iOS":
                                      mraid.open("${linkStoreIOS}")
                                      break;
                                  default: 
                                      mraid.open("${linkStoreAndroid}")
          
                              }
                         ;`);
              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;
          case 'Google':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .replace(
                  '<!-- GOOGLE -->',
                  `<meta name="ad.size" content="width=320,height=480">`
                )
                .replace(`<link rel="icon" href="favicon.ico" />`, '')
                .split(`console.log("GOTOSTORE")`).join(`
                          let device = "Android";
                          const linkGameIos = "${linkStoreIOS}";
                          const linkGameAndroid = "${linkStoreAndroid}";
                          function getMobileOperatingSystem() {
                              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                          
                              if (/android/i.test(userAgent)) {
                                  device = "Android";
                              } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                  device = "iOS";
                              } else {
                                  device = "Android";
                              }
                          
                          }
                          getMobileOperatingSystem();
                          
                              window.open(device == "Android" ? linkGameAndroid : linkGameIos)
                         ;`);

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;

          case 'Unity':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .split(`console.log("GOTOSTORE")`).join(`
                                  let device = "Android";
                          const linkGameIos = "${linkStoreIOS}";
                          const linkGameAndroid = "${linkStoreAndroid}";
                          function getMobileOperatingSystem() {
                              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                          
                              if (/android/i.test(userAgent)) {
                                  device = "Android";
                              } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                  device = "iOS";
                              } else {
                                  device = "Android";
                              }
                          
                          }
                          getMobileOperatingSystem();
                          
                             switch (device) {
                                  case "Android":
                                      mraid.open("${linkStoreAndroid}")
                                      break;
                                  case "iOS":
                                      mraid.open("${linkStoreIOS}")
                                      break;
                                  default: 
                                      mraid.open("${linkStoreAndroid}")
          
                              }
                          `);

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;

          case 'Mintegral':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .split(`console.log("GOTOSTORE")`)
                .join(
                  `
                                              window.install && window.install();
                                              window.gameEnd && window.gameEnd();
          
                                              `
                )
                .replace(
                  '// MINTE',
                  `
                                  function gameStart() { };
                                  window.gameReady && window.gameReady();
                                  function gameClose() { };
                                  `
                );

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;

          case 'Iron':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .replace(
                  `<!-- IRON1 -->`,
                  `
                                  
                              <script>
                              function getScript(e,i){var n=document.createElement("script");n.type="text/javascript",n.async=!0,i&&(n.onload=i),n.src=e,document.head.appendChild(n)}function parseMessage(e){var i=e.data,n=i.indexOf(DOLLAR_PREFIX+RECEIVE_MSG_PREFIX);if(-1!==n){var t=i.slice(n+2);return getMessageParams(t)}return{}}function getMessageParams(e){var i,n=[],t=e.split("/"),a=t.length;if(-1===e.indexOf(RECEIVE_MSG_PREFIX)){if(a>=2&&a%2===0)for(i=0;a>i;i+=2)n[t[i]]=t.length<i+1?null:decodeURIComponent(t[i+1])}else{var o=e.split(RECEIVE_MSG_PREFIX);void 0!==o[1]&&(n=JSON&&JSON.parse(o[1]))}return n}function getDapi(e){var i=parseMessage(e);if(!i||i.name===GET_DAPI_URL_MSG_NAME){var n=i.data;getScript(n,onDapiReceived)}}function invokeDapiListeners(){for(var e in dapiEventsPool)dapiEventsPool.hasOwnProperty(e)&&dapi.addEventListener(e,dapiEventsPool[e])}function onDapiReceived(){dapi=window.dapi,window.removeEventListener("message",getDapi),invokeDapiListeners()}function init(){window.dapi.isDemoDapi&&(window.parent.postMessage(DOLLAR_PREFIX+SEND_MSG_PREFIX+JSON.stringify({state:"getDapiUrl"}),"*"),window.addEventListener("message",getDapi,!1))}var DOLLAR_PREFIX="$$$",RECEIVE_MSG_PREFIX="DAPI_SERVICE:",SEND_MSG_PREFIX="DAPI_AD:",GET_DAPI_URL_MSG_NAME="connection.getDapiUrl",dapiEventsPool={},dapi=window.dapi||{isReady:function(){return!1},addEventListener:function(e,i){dapiEventsPool[e]=i},removeEventListener:function(e){delete dapiEventsPool[e]},isDemoDapi:!0};init();
                              </script>`
                )
                .split(`console.log("GOTOSTORE")`)
                .join(
                  `
                                  let device = "Android";
                                  const linkGameIos = "${linkStoreIOS}";
                                  const linkGameAndroid = "${linkStoreAndroid}";
                                  function getMobileOperatingSystem() {
                                      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                                  
                                      if (/android/i.test(userAgent)) {
                                          device = "Android";
                                      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                          device = "iOS";
                                      } else {
                                          device = "Android";
                                      }
                                  
                                  }
                                  getMobileOperatingSystem();
          
                      dapi.openStoreUrl(device == "Android" ? linkGameAndroid : linkGameIos);
                  `
                )
                .replace(
                  '// IRON2',
                  `
                                  
                      window.onload = function(){
                          (dapi.isReady()) ? onReadyCallback() : dapi.addEventListener("ready", onReadyCallback);	
                          //here you can put other code that not related to dapi logic
                      };
          
                      function onReadyCallback(){
                          //no need to listen to this event anymore
                          dapi.removeEventListener("ready", onReadyCallback);
                          let isAudioEnabled = !!dapi.getAudioVolume();
          
                          if(dapi.isViewable()){
                              adVisibleCallback({isViewable: true});
                          }
          
                          dapi.addEventListener("viewableChange", adVisibleCallback);
                          dapi.addEventListener("adResized", adResizeCallback);
                          dapi.addEventListener("audioVolumeChange",         audioVolumeChangeCallback);
                      }
          
                      function adVisibleCallback(event){
                          console.log("isViewable " + event.isViewable);
                          if (event.isViewable){
                              screenSize = dapi.getScreenSize();
                              //START or RESUME the ad
                          } else {
                              //PAUSE the ad and MUTE sounds
                          }
                      }
          
                      function adResizeCallback(event){
                          screenSize = event;
                      }
          
                      function audioVolumeChangeCallback(volume){
                          let isAudioEnabled = !!volume;
                          if (isAudioEnabled){
                              //START or turn on the sound
                          } else {
                              //PAUSE the turn off the sound
                          }
                      }
                      `
                );

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;
          case 'Tiktok':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .replace(
                  `<!-- TIKTOK -->`,
                  `<script src="https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js"></script>`
                )
                .split(`console.log("GOTOSTORE")`)
                .join(`window.playableSDK.openAppStore();`);

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;
          default:
            break;
        }
      }
    } else {

      //export
      for (let i = 0; i < network.length; i++) {
        console.log(network[i]);
        switch (network[i]) {
          case 'AppLovin':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .split(`console.log("GOTOSTORE")`).join(`
                          let device = "Android";
                          const linkGameIos = "${linkStoreIOS}";
                          const linkGameAndroid = "${linkStoreAndroid}";
                          function getMobileOperatingSystem() {
                              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                          
                              if (/android/i.test(userAgent)) {
                                  device = "Android";
                              } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                  device = "iOS";
                              } else {
                                  device = "Android";
                              }
                          
                          }
                          getMobileOperatingSystem();
                          
                             switch (device) {
                                  case "Android":
                                      mraid.open("${linkStoreAndroid}")
                                      break;
                                  case "iOS":
                                      mraid.open("${linkStoreIOS}")
                                      break;
                                  default: 
                                      mraid.open("${linkStoreAndroid}")
          
                              }
                         ;`);
              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;
          case 'Google':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .replace(
                  '<!-- GOOGLE -->',
                  `<meta name="ad.size" content="width=320,height=480">`
                )
                .replace(`<link rel="icon" href="favicon.ico" />`, '')
                .split(`console.log("GOTOSTORE")`).join(`
                          let device = "Android";
                          const linkGameIos = "${linkStoreIOS}";
                          const linkGameAndroid = "${linkStoreAndroid}";
                          function getMobileOperatingSystem() {
                              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                          
                              if (/android/i.test(userAgent)) {
                                  device = "Android";
                              } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                  device = "iOS";
                              } else {
                                  device = "Android";
                              }
                          
                          }
                          getMobileOperatingSystem();
                          
                              window.open(device == "Android" ? linkGameAndroid : linkGameIos)
                         ;`);

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;

          case 'Unity':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .split(`console.log("GOTOSTORE")`).join(`
                                  let device = "Android";
                          const linkGameIos = "${linkStoreIOS}";
                          const linkGameAndroid = "${linkStoreAndroid}";
                          function getMobileOperatingSystem() {
                              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                          
                              if (/android/i.test(userAgent)) {
                                  device = "Android";
                              } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                  device = "iOS";
                              } else {
                                  device = "Android";
                              }
                          
                          }
                          getMobileOperatingSystem();
                          
                             switch (device) {
                                  case "Android":
                                      mraid.open("${linkStoreAndroid}")
                                      break;
                                  case "iOS":
                                      mraid.open("${linkStoreIOS}")
                                      break;
                                  default: 
                                      mraid.open("${linkStoreAndroid}")
          
                              }
                          `);

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;

          case 'Mintegral':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .split(`console.log("GOTOSTORE")`)
                .join(
                  `
                                              window.install && window.install();
                                              window.gameEnd && window.gameEnd();
          
                                              `
                )
                .replace(
                  '// MINTE',
                  `
                                  function gameStart() { };
                                  window.gameReady && window.gameReady();
                                  function gameClose() { };
                                  `
                );

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;

          case 'Iron':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .replace(
                  `<!-- IRON1 -->`,
                  `
                                  
                              <script>
                              function getScript(e,i){var n=document.createElement("script");n.type="text/javascript",n.async=!0,i&&(n.onload=i),n.src=e,document.head.appendChild(n)}function parseMessage(e){var i=e.data,n=i.indexOf(DOLLAR_PREFIX+RECEIVE_MSG_PREFIX);if(-1!==n){var t=i.slice(n+2);return getMessageParams(t)}return{}}function getMessageParams(e){var i,n=[],t=e.split("/"),a=t.length;if(-1===e.indexOf(RECEIVE_MSG_PREFIX)){if(a>=2&&a%2===0)for(i=0;a>i;i+=2)n[t[i]]=t.length<i+1?null:decodeURIComponent(t[i+1])}else{var o=e.split(RECEIVE_MSG_PREFIX);void 0!==o[1]&&(n=JSON&&JSON.parse(o[1]))}return n}function getDapi(e){var i=parseMessage(e);if(!i||i.name===GET_DAPI_URL_MSG_NAME){var n=i.data;getScript(n,onDapiReceived)}}function invokeDapiListeners(){for(var e in dapiEventsPool)dapiEventsPool.hasOwnProperty(e)&&dapi.addEventListener(e,dapiEventsPool[e])}function onDapiReceived(){dapi=window.dapi,window.removeEventListener("message",getDapi),invokeDapiListeners()}function init(){window.dapi.isDemoDapi&&(window.parent.postMessage(DOLLAR_PREFIX+SEND_MSG_PREFIX+JSON.stringify({state:"getDapiUrl"}),"*"),window.addEventListener("message",getDapi,!1))}var DOLLAR_PREFIX="$$$",RECEIVE_MSG_PREFIX="DAPI_SERVICE:",SEND_MSG_PREFIX="DAPI_AD:",GET_DAPI_URL_MSG_NAME="connection.getDapiUrl",dapiEventsPool={},dapi=window.dapi||{isReady:function(){return!1},addEventListener:function(e,i){dapiEventsPool[e]=i},removeEventListener:function(e){delete dapiEventsPool[e]},isDemoDapi:!0};init();
                              </script>`
                )
                .split(`console.log("GOTOSTORE")`)
                .join(
                  `
                                  let device = "Android";
                                  const linkGameIos = "${linkStoreIOS}";
                                  const linkGameAndroid = "${linkStoreAndroid}";
                                  function getMobileOperatingSystem() {
                                      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                                  
                                      if (/android/i.test(userAgent)) {
                                          device = "Android";
                                      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                          device = "iOS";
                                      } else {
                                          device = "Android";
                                      }
                                  
                                  }
                                  getMobileOperatingSystem();
          
                      dapi.openStoreUrl(device == "Android" ? linkGameAndroid : linkGameIos);
                  `
                )
                .replace(
                  '// IRON2',
                  `
                                  
                      window.onload = function(){
                          (dapi.isReady()) ? onReadyCallback() : dapi.addEventListener("ready", onReadyCallback);	
                          //here you can put other code that not related to dapi logic
                      };
          
                      function onReadyCallback(){
                          //no need to listen to this event anymore
                          dapi.removeEventListener("ready", onReadyCallback);
                          let isAudioEnabled = !!dapi.getAudioVolume();
          
                          if(dapi.isViewable()){
                              adVisibleCallback({isViewable: true});
                          }
          
                          dapi.addEventListener("viewableChange", adVisibleCallback);
                          dapi.addEventListener("adResized", adResizeCallback);
                          dapi.addEventListener("audioVolumeChange",         audioVolumeChangeCallback);
                      }
          
                      function adVisibleCallback(event){
                          console.log("isViewable " + event.isViewable);
                          if (event.isViewable){
                              screenSize = dapi.getScreenSize();
                              //START or RESUME the ad
                          } else {
                              //PAUSE the ad and MUTE sounds
                          }
                      }
          
                      function adResizeCallback(event){
                          screenSize = event;
                      }
          
                      function audioVolumeChangeCallback(volume){
                          let isAudioEnabled = !!volume;
                          if (isAudioEnabled){
                              //START or turn on the sound
                          } else {
                              //PAUSE the turn off the sound
                          }
                      }
                      `
                );

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;
          case 'Tiktok':
            try {
              const dir = `${upFolder}/${network[i]}`;
              if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
              }
              let result = mainFile
                .replace(
                  `background: #171717 url(./splash.png) no-repeat center`,
                  `background: #171717`
                )
                .replace(
                  `<!-- TIKTOK -->`,
                  `<script src="https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js"></script>`
                )
                .split(`console.log("GOTOSTORE")`)
                .join(`window.playableSDK.openAppStore();`);

              fs.writeFile(
                `${dir}/${date}_PA_${nameGame}_${ideaName}.html`,
                result,
                'utf8',
                function (err) {
                  if (err) return console.log(err);
                }
              );
            } catch {
              // throw 'Unexpect error'
            }
            break;
          default:
            break;
        }
      }
    }
  } catch (err) { }
}
