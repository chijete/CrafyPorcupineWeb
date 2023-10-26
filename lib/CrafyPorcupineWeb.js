var CrafyPorcupineWebScriptURL = document.currentScript.src;
class CrafyPorcupineWeb {
  constructor(
    accessKey // Get a free access key from https://console.picovoice.ai/
  ) {
    this.current_url = CrafyPorcupineWebScriptURL.substring(0, CrafyPorcupineWebScriptURL.lastIndexOf("/")) + '/';
    this.scripts_paths = [
      "node_modules/@picovoice/web-voice-processor/dist/iife/index.js",
      "node_modules/@picovoice/porcupine-web/dist/iife/index.js",
      "keywords/porcupineKeywords.js",
      "models/porcupineModel.js",
    ];
    this.porcupine = null;
    this.usingBuiltIns = false;
    this.keywordIndex = 0;
    this.accessKey = accessKey;
    this.scripts_loaded = false;
    this.inited = false;
  }

  async loadScriptAsync(url) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    })
  }

  async loadAllScripts() {
    var result = true;
    if (!this.scripts_loaded) {
      for (const scriptPath of this.scripts_paths) {
        try {
          await this.loadScriptAsync(this.current_url + scriptPath);
        } catch (error) {
          result = false;
        }
      }
      if (result) {
        porcupineModel.publicPath = this.current_url + porcupineModel.publicPath;
        this.scripts_loaded = true;
      }
    }
    return result;
  }

  async init() {
    var result = true;
    if (!this.inited) {
      var scripts_load_result = await this.loadAllScripts();
      if (scripts_load_result) {
        if (porcupineKeywords.length === 0 && porcupineModel.publicPath.endsWith("porcupine_params.pv")) {
          this.usingBuiltIns = true;
          for (const k in PorcupineWeb.BuiltInKeyword) {
            porcupineKeywords.push(k);
          }
        }
      } else {
        result = false;
      }
      if (result) {
        this.inited = true;
      }
    }
    return result;
  }

  setKeyword(
    label, // keyword as string
    sensitivity, // number from 0 to 1
    publicPath, // filename inside keywords/ folder (example: "almeja.ppn")
    customWritePath // name for IndexedDB
  ) {
    var newLength = porcupineKeywords.push({
      label: label,
      sensitivity: sensitivity,
      publicPath: this.current_url + 'keywords/' + publicPath,
      customWritePath: customWritePath,
    });
    this.keywordIndex = newLength - 1;
  }

  porcupineErrorCallback(error) {}
  porcupineKeywordCallback(detection) {}

  async stopPorcupine() {
    await window.WebVoiceProcessor.WebVoiceProcessor.unsubscribe(this.porcupine);
    await this.porcupine.terminate();
    return true;
  }

  async startPorcupine() {
    if (window.WebVoiceProcessor.WebVoiceProcessor.isRecording) {
      await this.stopPorcupine();
    }
    try {
      this.porcupine = await PorcupineWeb.PorcupineWorker.create(
        this.accessKey,
        [porcupineKeywords[this.keywordIndex]],
        this.porcupineKeywordCallback,
        porcupineModel
      );
      await window.WebVoiceProcessor.WebVoiceProcessor.subscribe(this.porcupine);
      return true;
    } catch (err) {
      this.porcupineErrorCallback(err);
      return false;
    }
  }
}