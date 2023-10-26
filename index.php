<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CrafyPorcupineWeb</title>
  <script src="lib/CrafyPorcupineWeb.js"></script>
</head>
<body>

  <h1>CrafyPorcupineWeb</h1>
  <p>PorcupineWeb instance: Porcupine Wake Word (offline voice keyword detection) with async script load.</p>
  <p><a href="https://picovoice.ai/docs/quick-start/porcupine-web/">Picovoice Official documentation</a></p>
  <p>Project for "Almeja" - <a href="https://chijete.com/">Crafy Holding</a> voice assistant.</p>

  <button id="startButton">START</button>

  <h2>How to use (UI)</h2>
  <p>EN: press "START" and say "almeja".</p>
  <p>ES: presiona "START" y di "almeja".</p>

  <h2>How to use (dev)</h2>
  <p>JavaScript class "CrafyPorcupineWeb":</p>
  <ol>
    <li>new CrafyPorcupineWeb("ACCESS_KEY")</li>
    <li>crafyPorcupineWebInstance.porcupineErrorCallback = function (error) {}</li>
    <li>crafyPorcupineWebInstance.porcupineKeywordCallback = function (detection) {}</li>
    <li>crafyPorcupineWebInstance.init().then(function(initResult) { crafyPorcupineWebInstance.startPorcupine(); })</li>
  </ol>
  <h3>Important files</h3>
  <ul>
    <li>lib/CrafyPorcupineWeb.js: contains the class.</li>
    <li>index.php: contains this example.</li>
  </ul>

  <script>
    var crafyPorcupineWebInstance = new CrafyPorcupineWeb('YOUR_ACCESS_KEY');
    crafyPorcupineWebInstance.porcupineErrorCallback = function (error) {
      console.log('error', error);
    };
    crafyPorcupineWebInstance.porcupineKeywordCallback = function (detection) {
      console.log('detection', detection);
    };
    document.getElementById('startButton').addEventListener('click', function() {
      crafyPorcupineWebInstance.init().then(function(initResult) {
        if (initResult) {
          crafyPorcupineWebInstance.setKeyword(
            "almeja",
            0.7,
            "almeja_es_wasm_v3_0_0.ppn",
            "3.0.0_almeja_wasm.ppn"
          );
          crafyPorcupineWebInstance.startPorcupine();
        }
      });
    });
  </script>
  
</body>
</html>