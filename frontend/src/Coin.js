import React from 'react';
import * as THREE from 'three';

import './Coin.css';

class Coin extends React.Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true, canvas: this.canvas});
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const WIDTH = 200;
    const HEIGHT = 200;
    renderer.setSize(WIDTH, HEIGHT);
    this.mount.appendChild(renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);
    
    var geometry = new THREE.CylinderGeometry(1.8, 1.8, 0.1, 500, 1, false);
    var material = new THREE.MeshStandardMaterial({color: 0x252433});
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 0, 0);
    scene.add(cylinder);

    var edges = new THREE.EdgesGeometry(cylinder.geometry);
    var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: "yellow", linewidth: 2}));
    scene.add(lines);

    camera.position.z = 5;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var pendingClick = false;

    var onMouseClick = (event) => {
      mouse.x = (event.offsetX / WIDTH) * 2 - 1;
      mouse.y = - (event.offsetY / HEIGHT) * 2 + 1;
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
      
      if (this.props.awaitingResult) {
        cylinder.rotation.x += 0.1;
      } else {
        cylinder.rotation.x = Math.PI / 2;
      }

      lines.rotation.x = cylinder.rotation.x;

      renderer.render(scene, camera);
    };

    this.canvas.addEventListener('click', onMouseClick, false);
    
    animate();
  }

  render() {
    let text;
    if (this.props.awaitingResult) {
      text = "...";
    } else if (this.props.gotResult) {
      if (this.props.lastResult.isHeads) {
        text = "Heads";
      } else {
        text = "Tails";
      }
    } else {
      text = "Flip";
    }
    return (
    <div className="Coin" ref={ref => (this.mount = ref)}>
      <div className="CoinStatusDisplay">
        {text}
      </div>
      <canvas ref={ref => {this.canvas = ref}}/>
    </div>);
  }
}

export default Coin;
