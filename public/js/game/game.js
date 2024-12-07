var config = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true

    }
  },
  scene: [
    SceneMain
  ],
  pixelArt: true,
  roundPixels: true
};

var game = new Phaser.Game(config);
