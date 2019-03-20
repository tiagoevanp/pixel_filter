window.onload = () => {
	doAll();
}

const doAll = () => {
	const image = createImage();
	image.onload = () => {
		const canvasOriginalImageContext = createCanvas(image);
		const canvasFilterImageContext = createCanvas(image);
		drawImageOnCanvas(canvasOriginalImageContext, image);
		drawImageFilterOnCanvas(canvasOriginalImageContext, canvasFilterImageContext, image);
	}
}

const createCanvas = image => {
	const root = document.getElementById('root');
	const canvas = document.createElement('canvas');
	canvas.setAttribute('width', image.width);
	canvas.setAttribute('height', image.height);
	canvas.setAttribute('style', 'margin: 10px');
	root.appendChild(canvas);
	
	return canvas.getContext("2d");
}

const createImage = () => {
	const image = new Image();
	image.src = 'dog.jpg';
	return image;
}

const drawImageOnCanvas = (canvas, image) => {
	canvas.drawImage(image, 0, 0);
}

const drawImageFilterOnCanvas = (canvasO, canvasF, image) => {
	for(var j = 0; j < image.height; j += 5) {
		for(let i = 0; i < image.width; i += 5) {
			imgData = makeNewData(canvasO, i, j);
			canvasF.putImageData(imgData, i, j);
		}
	}
}

const makeNewData = (c, i, j) => {
	const imgData = c.getImageData(i, j, 5, 5);
	const pixelsData = [];
	const hexadecimals = [];
	
	for(let l = 0; l < imgData.data.length; l += 4) {
		pixelsData.push(imgData.data.slice(l, l+4));
	}
	
	pixelsData.map((el, idx) => {
		hexadecimals.push(fullColorHex(el[0], el[1], el[2]));
	});
	
	const hexMostFrequent = mostFrequent(hexadecimals);
	const rgb = hexToRgb(hexMostFrequent);

	let red = true;
	let green = true;
	let blue = true;

	for(let m = 0; m < imgData.data.length; m++) {
		if(red) {
			red = false;
			imgData.data[m] = rgb.r;
		} else if(green) {
			green = false;
			imgData.data[m] = rgb.g;
		} else if(blue) {
			blue = false
			imgData.data[m] = rgb.b;
		} else {
			red = true;
			green = true;
			blue = true;
		}
	}

	return imgData;
}

const fullColorHex = (r,g,b) => {   
	const red = rgbToHex(r);
	const green = rgbToHex(g);
	const blue = rgbToHex(b);
	return red+green+blue;
}

const rgbToHex = rgb => { 
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
		hex = "0" + hex;
  }
  return hex;
}

const hexToRgb = hex => {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const mostFrequent = hex => {
	var counts = {};
  var compare = 0;
	var mostFrequent;
	
	for(let i = 0; i < hex.length; i++) {
      var word = hex[i];
   
      if(counts[word] === undefined){
         counts[word] = 1;
      }else{
         counts[word] = counts[word] + 1;
      }
      if(counts[word] > compare){
         compare = counts[word];
         mostFrequent = hex[i];
      }
	}
	
	return mostFrequent;
}

