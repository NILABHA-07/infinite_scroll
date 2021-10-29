const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let photosArray=[];
let ready=false;
let totalImages=0;
let loadedImages=0;

//unsplash api
let initialLoad=true;
const count=5;;
const apiKey='pJqQiWbTae90cAo7EUFnotmYL7X8LpCcu-OcpLAUNyw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//chec if all images were loaded

function imageLoaded(){
    
    loadedImages++;
    
    if(loadedImages===totalImages){
        
        ready=true;
        loader.hidden=true;
        count=30;
        initialLoad=false;
        
    }
}
//helper function

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

//create elements for links and photos,Add to DOm
function displayPhotos(){
    loadedImages=0;
    totalImages=photosArray.length;
    
    photosArray.forEach((photo)=>{
        const item=document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        })

    

    //create <img> for photo

    const img=document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);

    setAttributes(img,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description,
    })
 

    //Event listener, check when eacch is finished loading

    img.addEventListener('load',imageLoaded);
    //putting <img> inside <a> ,then oyt both inside imagecontainer element

    item.appendChild(img);
    imageContainer.appendChild(item);
});
}

//get photos from unsplash api

async function getPhotos(){
    try {
        const response=await fetch(apiUrl);
       photosArray=await response.json();
        displayPhotos();
    } catch (error) {
        //catching error here
    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
    }
});

//onload

getPhotos();