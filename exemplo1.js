var scene;
var camera;
var renderer;

var velocity = 0.1;


var createACube = function() {
    var geometry = new THREE.BoxGeometry( 2, 10, 2 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        geometry.faces[4 * i].color = colors[i];
        geometry.faces[4 * i+1].color = colors[i];
        geometry.faces[4 * i+2].color = colors[i];
        geometry.faces[4 * i+3].color = colors[i];

    }
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    cubo = new THREE.Mesh( geometry, material );
    

    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    sphere = new THREE.Mesh(geometry2, material2);
    sphere.position.y-=5;
    cubo.add(sphere);
    

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(cubo); //adicinou ombro ao pivo
    scene.add(pivot);
    cubo.position.y+=pivot.position.x+5;


    var geometry3 = new THREE.SphereGeometry(2, 32,32); 
    var material3 = new THREE.MeshBasicMaterial( { color: 0xD9CEAC} );
    sphere2 = new THREE.Mesh(geometry3, material3);
    cubo.add(sphere2);
    sphere2.position.y+=6;

    pivot2 = new THREE.Group();
    pivot2.position.set(0,0,0);
    sphere2.add( pivot2 );

    var geometry4 = new THREE.BoxGeometry( 2, 10, 2 ); 
    var material4 = new THREE.MeshBasicMaterial( { color: 0xD9CEAC} );
    cubo2 = new THREE.Mesh( geometry4, material4 );
    pivot2.add( cubo2 );
    cubo2.position.y+=5;



    

};
var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
        cubo.position.x-=velocity;
    }
    if (e.keyCode == 32){ //espaco -> rotacao pelo pivo.
        
        console.log("Z: "+ pivot.rotation.z);
        if (pivot.rotation.z > 2.8 || pivot.rotation.z < 0){
            rotationVelocity*=-1;
        }
        pivot.rotation.z+=rotationVelocity; 
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        cubo.scale.x+=0.1;
        cubo.scale.y+=0.1;
        cubo.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        cubo.scale.x-=0.1;
        cubo.scale.y-=0.1;
        cubo.scale.z-=0.1;
    }

    if(e.keyCode == 37){
        cubo2.position.x-=velocity;
    }
    if (e.keyCode == 90){ //z -> rotacao pelo pivo.
        
        console.log("Z: "+ pivot2.rotation.z);
        if (pivot2.rotation.z > 2.5 || pivot2.rotation.z < 0){
            rotationVelocity*=-1;
        }
        pivot2.rotation.z+=rotationVelocity; 
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        cubo2.scale.x+=0.1;
        cubo2.scale.y+=0.1;
        cubo2.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        cubo2.scale.x-=0.1;
        cubo2.scale.y-=0.1;
        cubo2.scale.z-=0.1;
    }
}


var posicaoMouser = { //controla a posiÃ§Ã£o do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
    console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

        cubo.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        cubo.rotation.y += toRadians(deltaMovimento.x*1)*0.5;

        cubo2.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        cubo2.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
    }

    posicaoMouser = {  //nova posiÃ§Ã£o do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}
