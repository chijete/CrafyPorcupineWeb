var thisDocumentUrl_d8f1g981f891sfg1w5d = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/")) + '/';
var porcupineKeywords = [
  {
    label: "almeja",
    sensitivity: 0.7,
    publicPath: thisDocumentUrl_d8f1g981f891sfg1w5d + "almeja_es_wasm_v3_0_0.ppn",    
    customWritePath: "3.0.0_almeja_wasm.ppn",
  },
];

(function () {
  if (typeof module !== "undefined" && typeof module.exports !== "undefined")
    module.exports = porcupineKeywords;
})();