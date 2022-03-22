'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroBox,
    ViroMaterials,
    Viro3DObject,
    ViroAmbientLight,
    ViroARPlaneSelector,
    ViroNode,
    ViroSpotLight,
    ViroAnimations,
    ViroARTrackingTargets,
    ViroARImageMarker
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

    constructor() {
        super();

        // Set initial state here
        this.state = {
            text: "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
    }

    render() {

        const anchorFound = () => {
            console.log("Anchor Image Detected")
        }

        ViroARTrackingTargets.createTargets({
            gridImage: {
                source: require('./res/360_park.jpg'),
                orientation: 'up',
                physicalWidth: 0.1
            }
        })

        return (
            <ViroARScene onTrackingUpdated={this._onInitialized}>
                <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]}
                          style={styles.helloWorldTextStyle}/>
                <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]}
                         animation={{name: "rotate", run: true, loop: true}}/>
                <ViroARImageMarker target="gridImage" onAnchorFound={anchorFound}>
                    <ViroAmbientLight color={"#aaaaaa"}/>
                    <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
                                   position={[0, 3, 1]} color="#ffffff" castsShadow={true}/>


                    <Viro3DObject
                        source={require('./res/emoji_smile/emoji_smile.vrx')}
                        resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                            require('./res/emoji_smile/emoji_smile_normal.png'),
                            require('./res/emoji_smile/emoji_smile_specular.png')]}
                        position={[0, 0, 0]}
                        scale={[.1, .1, .1]}
                        rotation={[-90.,0,0.]}
                        type="VRX"/>

                </ViroARImageMarker>
            </ViroARScene>
        );
    }

    _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: "Hello World!"
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }


}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});

ViroMaterials.createMaterials({
    grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
    },
});

ViroAnimations.registerAnimations({
    rotate: {
        properties: {
            rotateY: "+=90"
        },
        duration: 250, //.25 seconds
    },
});


module.exports = HelloWorldSceneAR;
