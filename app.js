window.onload = () => {
	doAll();
}

const doAll = () => {
	const image = createImage();
	const pixelSize = 10;
	image.onload = () => {
		const canvasOriginalImageContext = createCanvas(image);
		const canvasFilterImageContext = createCanvas(image);
		drawImageOnCanvas(canvasOriginalImageContext, image);
		drawImageFilterOnCanvas(canvasOriginalImageContext, canvasFilterImageContext, image, pixelSize);
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
	image.src = 'teleguiada.jpeg';
	return image;
}

const drawImageOnCanvas = (canvas, image) => {
	canvas.drawImage(image, 0, 0);
}

const drawImageFilterOnCanvas = (canvasO, canvasF, image, size) => {
	for(var j = 0; j < image.height; j += size) {
		for(let i = 0; i < image.width; i += size) {
			imgData = makeNewData(canvasO, i, j, size);
			canvasF.putImageData(imgData, i, j);
		}
	}
}

const makeNewData = (c, i, j, s) => {
	const imgData = c.getImageData(i, j, s, s);
	const pixelsData = [];
	const hexadecimals = [];
	
	for(let l = 0; l < imgData.data.length; l += 4) {
		pixelsData.push(imgData.data.slice(l, l+4));
	}
	
	const av = averageRGB(pixelsData, Math.pow(s, 2));

	let red = true;
	let green = true;
	let blue = true;

	for(let m = 0; m < imgData.data.length; m++) {
		if(red) {
			red = false;
			imgData.data[m] = av.r;
		} else if(green) {
			green = false;
			imgData.data[m] = av.g;
		} else if(blue) {
			blue = false
			imgData.data[m] = av.b;
		} else {
			red = true;
			green = true;
			blue = true;
		}
	}

	return imgData;
}

const averageRGB = (data, squareSize) => {
	const r = [];
	const g = [];
	const b = [];
	const reducer = (accu, curr) => {
		return accu + curr;
	}

	data.map(el => {
		r.push(el[0]);	 
		g.push(el[1]);	 
		b.push(el[2]);	 
	})

	const averageR = r.reduce(reducer)/squareSize;
	const averageG = g.reduce(reducer)/squareSize;
	const averageB = b.reduce(reducer)/squareSize;
	
	return {r: averageR, g: averageG, b: averageB};
}
