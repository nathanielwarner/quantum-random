import React from 'react';
import * as THREE from 'three';
import {LineSegmentsGeometry} from 'three/examples/jsm/lines/LineSegmentsGeometry';
import {LineMaterial} from 'three/examples/jsm/lines/LineMaterial';
import {LineSegments2} from 'three/examples/jsm/lines/LineSegments2';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {SMAAPass} from 'three/examples/jsm/postprocessing/SMAAPass';

import './Coin.css';

class Coin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mouseOver: false};
  }

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
    var linesGeom = new LineSegmentsGeometry().setPositions(edges.attributes.position.array);
    var linesMaterial = new LineMaterial({color: "yellow", linewidth: 4});
    linesMaterial.resolution.set(WIDTH, HEIGHT);
    var lines = new LineSegments2(linesGeom, linesMaterial);
    scene.add(lines);

    camera.position.z = 5;

    var renderScene = new RenderPass(scene, camera, undefined, new THREE.Color("#252433"), true);
    var bloomPass = new UnrealBloomPass(new THREE.Vector2(WIDTH, HEIGHT), 0.0, -0.8, 0.88);
    var smaaPass = new SMAAPass(WIDTH, HEIGHT);

    var composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(smaaPass);

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    var mouseHasEntered = false;
    var pendingClick = false;

    var onMouseEnter = (event) => {
      mouseHasEntered = true;
    }

    var onMouseMove = (event) => {
      mouse.x = (event.offsetX / WIDTH) * 2 - 1;
      mouse.y = - (event.offsetY / HEIGHT) * 2 + 1;
    }

    var onMouseLeave = (event) => {
      mouseHasEntered = false;
    }

    var onMouseClick = (event) => {
      if (!(this.props.awaitingResult)) {
        pendingClick = true;
      }
    }

    var animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObject(cylinder);
      if (mouseHasEntered && intersects.length > 0) {
        this.setState({mouseOver: true});
        bloomPass.strength = 1.0;
        if (pendingClick) {
          this.props.handleClick();
          pendingClick = false;
        }
      } else {
        this.setState({mouseOver: false});
        bloomPass.strength = 0.0;
        pendingClick = false;
      }
      
      if (this.props.awaitingResult) {
        cylinder.rotation.x += 0.1;
      } else {
        cylinder.rotation.x = Math.PI / 2;
      }

      lines.rotation.x = cylinder.rotation.x;

      composer.render();
    };

    this.canvas.addEventListener('mouseenter', onMouseEnter, false);
    this.canvas.addEventListener('mousemove', onMouseMove, false);
    this.canvas.addEventListener('mouseleave', onMouseLeave, false);
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
    <div className={`Coin ${this.state.mouseOver ? "MouseOver" : ""}`} ref={ref => (this.mount = ref)}>
      <div className="CoinStatusDisplay">
        {text}
      </div>
      <canvas ref={ref => {this.canvas = ref}}/>
    </div>);
  }
}

export default Coin;
