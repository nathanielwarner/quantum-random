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
    var animate = () => {
      requestAnimationFrame(animate);
      cylinder.rotation.x += 0.01;
      renderer.render(scene, camera);
    };
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
