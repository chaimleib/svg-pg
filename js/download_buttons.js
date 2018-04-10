var el = document.getElementById("text0");
var svg = document.getElementById("svg0");
var svgDL = document.getElementById("download-svg");
var pngDL = document.getElementById("download-png");
svgDL.onclick = function() {
  saveData(svg.outerHTML, "image.svg", "image/svg+xml");
};
pngDL.onclick = function() {
  svgToPng(svg.outerHTML, function(png) {
    saveData(png, "image.png", "image/png");
  });
};

function saveData(data, fname, mime) {
  var blob = new Blob([data], { type: mime });
  var url = URL.createObjectURL(blob);
  downloadDataURL(url, fname);
  URL.revokeObjectURL(url);
}

function downloadDataURL(url, fname) {
  var typeNBase64 = url.split(",");
  var typeParts = typeNBase64[0].split(":")[1];
  var mime = typeParts[0].split(";")[0];
  var a = document.createElement("a");
  a.href = url;
  a.download = fname;
  a.style = "display: none;";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function svgToPng(svg, callback) {
  var pngMime = "image/png";
  var svgMime = "image/svg+xml";
  var data =
      "data:" + svgMime + ";base64," + btoa(unescape(encodeURIComponent(svg))),
    img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var png;
    // this = img
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    var dataURL = canvas.toDataURL(pngMime);
    downloadDataURL(dataURL, "image.png");
  };
  img.src = data;
}

