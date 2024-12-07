<template>
  <div class="" id="game-container"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import Phaser from 'phaser';
const skyUrl = '/images/post/Postapocalypce1/Bright/clouds1.png';
const groundUrl = '/images/post/Postapocalypce1/Bright/road.png';

function preload() {
  this.load.image('sky', skyUrl);
  this.load.image('ground', groundUrl);

  // this.load.image('logo', '/assets/images/logo.png');
}

var platforms;

function create() {
  this.add.image(400, 300, 'sky');
  // const logo = this.add.image(400, 150, 'logo');

  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1,
  // });
    platforms = this.physics.add.staticGroup();
    platforms.create(750, 310, 'ground');
}

function update() {
  // Update game logic here
}

function initGame() {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x:0, y: 0 },
            debug: false
        }
    },
    scene: {
      preload,
      create,
      update,
    },
    pixelArt: true,
    roundPixels: true
  };

  new Phaser.Game(config);
}

class Chunk {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.tiles = this.scene.add.group();
    this.isLoaded = false;
  }

  unload() {
    if (this.isLoaded) {
      this.tiles.clear(true, true);

      this.isLoaded = false;
    }
  }

  load() {
    if (!this.isLoaded) {
      for (var x = 0; x < this.scene.chunkSize; x++) {
        for (var y = 0; y < this.scene.chunkSize; y++) {

          var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
          var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

          var perlinValue = noise.perlin2(tileX / 100, tileY / 100);

          var key = "";
          var animationKey = "";

          if (perlinValue < 0.2) {
            key = "sprWater";
            animationKey = "sprWater";
          }
          else if (perlinValue >= 0.2 && perlinValue < 0.3) {
            key = "sprSand";
          }
          else if (perlinValue >= 0.3) {
            key = "sprGrass";
          }


          var tile = new Tile(this.scene, tileX, tileY, key);

          if (animationKey !== "") {
            tile.play(animationKey);
          }

          this.tiles.add(tile);
        }
      }

      this.isLoaded = true;
    }
  }
}

class Tile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0);
  }
}

onMounted(() => {
  initGame();
});
</script>

<style scoped>
#game-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>