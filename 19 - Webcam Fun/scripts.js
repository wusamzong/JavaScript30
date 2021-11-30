const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

getMedia({audio: false, video: true})
async function getMedia(constraints){
    let stream = null;
    try{
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        video.srcObject = stream
        video.onloadedmetadata = ()=>{
            video.play();
            console.log(video.videoWidth);
            console.log(video.videoHeight);
            video.addEventListener('timeupdate',updateCanvas())
        }
        
    }catch(err){
        console.log(err);
    }
}
function updateCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        
        // mess with them
        // redEffect(pixels.data);
        rgbSplit(pixels.data)
        //pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;

        // pixels = greenScreen(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
    },16)
    

}
function redEffect(pixels){
    for(let i=0;i<=640*480*4;i+=4){
        pixels[i] = (pixels[i]+200) >= 256 ? 256:(pixels[i]+200)
    }
}
function rgbSplit(pixels){
    for(let i=0;i<=pixels.length;i+=4){
        pixels[i+520] = pixels[i]
        pixels[i-320] = pixels[i+1]
        pixels[i+420] = pixels[i+2]
    }
}
function takePhoto(){
    snap.play();
    let dataURL = canvas.toDataURL();
    let a = document.createElement('a');
    a.setAttribute('download', dataURL)
    a.setAttribute('href', dataURL)
    let img = document.createElement('img');
    img.setAttribute('src', dataURL)
    
    a.appendChild(img)
    strip.appendChild(a)
}