class Chunk {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.tiles = this.scene.add.group();
    this.isLoaded = false;
    this.bushes = [];
    this.occupiedTiles = new Set(); // Track occupied positions
  }

  // Helper to create a unique key for a tile position
  getTileKey(x, y) {
    return `${x},${y}`;
  }

  // Check if a tile is already occupied
  isValidBushPlacement(x, y) {
    const tileKey = this.getTileKey(x, y);
    return !this.occupiedTiles.has(tileKey);
  }

  // Place bush and mark tile as occupied
  placeBush(x, y, key) {
    const bush = this.scene.add.sprite(x, y, key);
    bush.setOrigin(.5);
    bush.setScale(.25);
    this.bushes.push(bush);
    this.occupiedTiles.add(this.getTileKey(x, y)); // Mark position as occupied
  }

  // Place tree and mark tile as occupied
  placeTree(x, y, key) {
    const tree = this.scene.add.sprite(x, y, key);
    tree.setOrigin(.5);
    tree.setScale(.75); // Adjust scale if needed
    tree.setDepth(1.5);
    this.bushes.push(tree);
    this.occupiedTiles.add(this.getTileKey(x, y)); // Mark position as occupied
  }

  // Place rock and mark tile as occupied
  placeRock(x, y, key) {
    const rock = this.scene.add.sprite(x, y, key);
    rock.setOrigin(.5);
    rock.setScale(.5); // Adjust scale if needed
    rock.setDepth(1.25);
    this.bushes.push(rock);
    this.occupiedTiles.add(this.getTileKey(x, y)); // Mark position as occupied
  }

  placeRuin(x, y, key) {
    const ruin = this.scene.add.sprite(x, y, key);
    ruin.setOrigin(.5);
    ruin.setScale(.5); // Adjust scale if needed
    ruin.setDepth(1.25);
    this.bushes.push(ruin);
    this.occupiedTiles.add(this.getTileKey(x, y)); // Mark position as occupied
  }

  unload() {
    if (this.isLoaded) {
      this.tiles.clear(true, true);
      this.bushes.forEach(bush => bush.destroy());
      this.bushes = [];
      this.occupiedTiles.clear(); // Clear occupied positions
      this.isLoaded = false;
    }
  }

  load() {
    if (!this.isLoaded) {
      for (let x = 0; x < this.scene.chunkSize; x++) {
        for (let y = 0; y < this.scene.chunkSize; y++) {
          const tileX = this.x * (this.scene.chunkSize * this.scene.tileSize) + x * this.scene.tileSize;
          const tileY = this.y * (this.scene.chunkSize * this.scene.tileSize) + y * this.scene.tileSize;

          const perlinValue = noise.perlin2(tileX / 100, tileY / 100);
          let key = "";
          var animationKey = "";

          if (perlinValue < 0.0001) {
            key = "sprWater";
            animationKey = "sprWater";
          } else if (perlinValue >= 0.01 && perlinValue < 0.1) {
            key = "sprSand";
          } else {
            key = "sprGrass";
          }

          const tile = new Tile(this.scene, tileX, tileY, key);
          if (animationKey !== "") {
            tile.play(animationKey);
          }

          this.tiles.add(tile);
          this.scene.tiles.add(tile);

          if (key === "sprGrass" && Math.random() < 0.1) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprBushRedFlowers");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.0325) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprBushPinkFlowers");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.0325) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprBushBlueFlowers");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.0325) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprBushOrangeFlowers");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.03) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeTree(tileX, tileY, "sprTreePalmTree1");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.03) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeTree(tileX, tileY, "sprTreePalmTree2");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.00115) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsBlack");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00215) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsBlue");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00315) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsDark_red");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00415) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsGreen");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00515) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsPink");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00615) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsRed");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00715) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsViolet");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00815) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsWhite");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00915) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsYellow");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.0015) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeBush(tileX, tileY, "sprCrystalsYellow-green");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.0125) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRock(tileX, tileY, "sprRock1_1");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.0145) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRock(tileX, tileY, "sprRock1_2");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.0115) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRock(tileX, tileY, "sprRock1_3");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00915) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRock(tileX, tileY, "sprRock1_4");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00815) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRock(tileX, tileY, "sprRock1_5");
            }
          }


          if (key === "sprGrass" && Math.random() < 0.00015) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRuin(tileX, tileY, "sprRuinsBlue-gray");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.00015) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRuin(tileX, tileY, "sprRuinsBrown");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.00015) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRuin(tileX, tileY, "sprRuinsGray");
            }
          }

          if (key === "sprGrass" && Math.random() < 0.00015) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRuin(tileX, tileY, "sprRuinsSand");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00015) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRuin(tileX, tileY, "sprRuinsSnow");
            }
          }
          if (key === "sprGrass" && Math.random() < 0.00015) {  // 5% chance to place bush on grass tiles
            if (this.isValidBushPlacement(tileX, tileY)) {
              this.placeRuin(tileX, tileY, "sprRuinsWater");
            }
          }
          // Repeat similar checks for other objects...
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