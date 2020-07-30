import React from 'react';
import * as THREE from 'three';

class Coin extends React.Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true, canvas: this.canvas});
    renderer.setPixelRatio(window.devicePixelRatio);
    
    //renderer.setSize(600, 600);
    this.mount.appendChild(renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);
    
    var geometry = new THREE.CylinderGeometry(2, 2, 0.1, 100, 1, false);
    var material = new THREE.MeshStandardMaterial({color: "yellow"});
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 0, 0);
    scene.add(cylinder);

    camera.position.z = 5;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var pendingClick = false;

    var onMouseClick = (event) => {
      console.log(event);
      mouse.x = (event.offsetX / this.canvas.width) * 2 - 1;
      mouse.y = - (event.offsetY / this.canvas.height) * 2 + 1;
      console.log(mouse);
      pendingClick = true;
    }

    var animate = () => {
      requestAnimationFrame(animate);
      if (pendingClick) {
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObject(cylinder);
        if (intersects.length > 0) {
          this.props.handleClick();
        }
        pendingClick = false;
      }
      
      if (this.props.flipping) {
        cylinder.rotation.x += 0.01;
      } else {
        cylinder.rotation.x = Math.PI / 2;
      }
      renderer.render(scene, camera);
    };

    this.canvas.addEventListener('click', onMouseClick, false);
    
    animate();
  }

  render() {
    return (
    <div ref={ref => (this.mount = ref)}>
      <canvas width="50" height="50" ref={ref => {this.canvas = ref}}/>
    </div>);
  }
}

export default Coin;