'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  Viro3DObject
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {
      text: "Hello world!"
    } // Set initial state here  use as global varaible

    this._onBoxHover = this._onBoxHover.bind(this);
    this._showHelloBeachScene = this._showHelloBeachScene.bind(this);
  }

  render() {
    return (
      <ViroScene>


        <Viro360Image source={require('./res/360_park.jpg')} />
        <ViroText text={this + state.text} width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -1, -2]} scale={[.5, .5, .2]} materials={["grid"]} onHover={this._onBoxHover} onClick={this._showHelloBeachScene} />
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={require('./res/naruto/scene.gltf')}
          position={[0, 0, -5]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-45, 50, 40]}
          type="GLTF"
        />
      </ViroScene>


    );
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('./res/360_park.jpg')} />
        <ViroText text={this.state.text} width={2} height={2}
          position={[0, 0, -2]} style={styles.helloWorldTextStyle} />

        <ViroBox position={[0, -1, -2]} scale={[.5, .5, .2]}
          materials={["grid"]} onHover={this._onBoxHover}
          onClick={this._showHelloBeachScene} />
        <ViroAmbientLight color="#FFFFFF" />
        <Viro3DObject
          source={require('./res/naruto/scene.gltf')}
          resources={[
            require('./res/naruto/textures/C__Users_Loris_Desktop___ntxr00_0_baseColor.png'),
            require('./res/naruto/textures/C__Users_Loris_Desktop___ntxr00_baseColor.png'),
            require('./res/naruto/textures/Material__3_baseColor.png'),
            require('./res/naruto/textures/Material__3_emissive.png'),
            require('./res/naruto/scene.bin')]}
          position={[0.0, -5.0, -12.1]}
          rotation={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          onLoadStart={this._onLoadStart}
          onLoadEnd={this._onLoadEnd}
          onError={this._onError}
          type="GLTF" />

      </ViroScene>
    );
  }



  _onBoxHover(isHovering) {
    let text = isHovering ? "Hello Box!" : "Hello World!";
    this.setState({
      text
    });
  }

  _showHelloBeachScene() {
    this.props.sceneNavigator.push({ scene: require("./HelloBeachScene.js") });
  }



}

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});



var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldScene;
