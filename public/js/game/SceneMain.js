class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.spritesheet("sprWater", "content/sprWater.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprSand", "content/sprSand.png");
    this.load.image("sprGrass", "content/sprGrass.png");

    this.load.image("sprBushRedFlowers", "images/plants/bushes/Bush_red_flowers1.png");
    this.load.image("sprBushPinkFlowers", "images/plants/bushes/Bush_pink_flowers1.png");
    this.load.image("sprBushBlueFlowers", "images/plants/bushes/Bush_blue_flowers1.png");
    this.load.image("sprBushOrangeFlowers", "images/plants/bushes/Bush_orange_flowers1.png");

    this.load.image("sprCrystalsBlack", "images/crystals/Black_crystal1.png");
    this.load.image("sprCrystalsBlue", "images/crystals/Blue_crystal1.png");
    this.load.image("sprCrystalsDark_red", "images/crystals/Dark_red_crystal1.png");
    this.load.image("sprCrystalsGreen", "images/crystals/Green_crystal1.png");
    this.load.image("sprCrystalsPink", "images/crystals/Pink_crystal1.png");
    this.load.image("sprCrystalsRed", "images/crystals/Red_crystal1.png");
    this.load.image("sprCrystalsViolet", "images/crystals/Violet_crystal1.png");
    this.load.image("sprCrystalsWhite", "images/crystals/White_crystal1.png");
    this.load.image("sprCrystalsYellow", "images/crystals/Yellow_crystal1.png");
    this.load.image("sprCrystalsYellow-green", "images/crystals/Yellow-green_crystal1.png");
    
    this.load.image("sprRock1_1", "images/rocks/Rock1_1.png");
    this.load.image("sprRock1_2", "images/rocks/Rock1_2.png");
    this.load.image("sprRock1_3", "images/rocks/Rock1_3.png");
    this.load.image("sprRock1_4", "images/rocks/Rock1_4.png");
    this.load.image("sprRock1_5", "images/rocks/Rock1_5.png");

    this.load.image("sprRuinsBlue-gray", "images/ruins/Blue-gray_ruins1.png");
    this.load.image("sprRuinsBrown", "images/ruins/Brown_ruins1.png");
    this.load.image("sprRuinsGray", "images/ruins/Gray_ruins1.png");
    this.load.image("sprRuinsSand", "images/ruins/Sand_ruins1.png");
    this.load.image("sprRuinsSnow", "images/ruins/Snow_ruins1.png");
    this.load.image("sprRuinsWater", "images/ruins/Water_ruins1.png");
    
    this.load.spritesheet("characterIdle", "images/characters/Enchantress/Idle.png", {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("characterWalk", "images/characters/Enchantress/Walk.png", {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("characterRun", "images/characters/Enchantress/Run.png", {
      frameWidth: 128,
      frameHeight: 128
    });
    
    this.load.image("sprTreePalmTree1", "images/plants/trees/Palm_tree1_1.png");
    this.load.image("sprTreePalmTree2", "images/plants/trees/Palm_tree2_2.png");
    
  }

  create() {
    this.anims.create({
      key: "sprWater",
      frames: this.anims.generateFrameNumbers("sprWater"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'characterIdle',
      frames: this.anims.generateFrameNumbers('characterIdle'), // Adjust frame numbers as needed
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'characterWalk',
      frames: this.anims.generateFrameNumbers('characterWalk', {frames:[0,1,2,3,4,5,6,7]}), // Adjust frame numbers as needed
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'characterRun',
      frames: this.anims.generateFrameNumbers('characterRun', {frames:[0,1,2,3,4,5,6,7]}), // Adjust frame numbers as needed
      frameRate: 15,
      repeat: -1
    });

    this.chunkSize = 16;
    this.tileSize = 16;
    this.cameraSpeed = .5;

    this.cameras.main.setZoom(4);

    this.chunks = [];

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Placeholder for chunk-generated tiles
    this.tiles = this.add.group();

    const initialPosition = { x: 100, y: 100 };
    // Generate initial chunks
    this.generateChunks(initialPosition);

    // Find a valid tile for character spawn
    let startX = initialPosition.x;
    let startY = initialPosition.y;
    const validTile = this.tiles.getChildren().find(
      tile => tile.texture.key === "sprSand" || tile.texture.key === "sprGrass"
    );

    if (validTile) {
      startX = validTile.x;
      startY = validTile.y;
    } else {
      // If no valid tile is found, set a default position
      console.warn("No valid tile found for character spawn. Using initial position.");
      startX = initialPosition.x;
      startY = initialPosition.y;
    }


    // Add character sprite
    this.character = this.physics.add.sprite(140, 115, "characterIdle");
    this.character.setScale(.25);
    this.character.setDepth(1);
    // this.character.body.setGravityX(300);
    
    // this.character.body.setCollideWorldBounds(true);
    this.character.anims.play("characterIdle", true); // Play the animation (define 'walk' earlier)
    // Camera follows character
    this.cameras.main.startFollow(this.character);
  }

  generateChunks(position = null) {
    console.log("Generating chunks", position);
    const characterX = position ? position.x : this.character.x;
    const characterY = position ? position.y : this.character.y;
    const snappedChunkX = Math.floor(characterX / (this.chunkSize * this.tileSize));
    const snappedChunkY = Math.floor(characterY / (this.chunkSize * this.tileSize));

    for (let x = snappedChunkX - 2; x <= snappedChunkX + 2; x++) {
      for (let y = snappedChunkY - 2; y <= snappedChunkY + 2; y++) {
        const existingChunk = this.getChunk(x, y);
        if (!existingChunk) {
          const newChunk = new Chunk(this, x, y);
          this.chunks.push(newChunk);
          newChunk.load();
        }
      }
    }
  }

  getChunk(x, y) {
    return this.chunks.find(chunk => chunk.x === x && chunk.y === y);
  }

  canMoveToTile(x, y) {
    // Check tile under the character
    const tileX = Math.floor(x / this.tileSize) * this.tileSize;
    const tileY = Math.floor(y / this.tileSize) * this.tileSize;

    const tile = this.tiles.getChildren().find(
      t => t.x === tileX && t.y === tileY
    );

    return tile && (tile.texture.key === "sprSand" || tile.texture.key === "sprGrass");
  }

  update() {
    let moveX = 0;
    let moveY = 0;
  
    // For left movement
    if (this.keyA.isDown) {
      this.character.flipX = true;
      if(this.keySHIFT.isDown) {
        moveX = -this.cameraSpeed *1.5;
        this.character.anims.play("characterRun", true); // Play walk left animation
      } else {
        moveX = -this.cameraSpeed;
        this.character.anims.play("characterWalk", true); // Play walk left animation
      }
    }
    // For right movement
    else if (this.keyD.isDown) {
      this.character.flipX = false;
      if(this.keySHIFT.isDown) {
        moveX = this.cameraSpeed *1.5;
        this.character.anims.play("characterRun", true); // Play walk right animation
      } else {
        moveX = this.cameraSpeed;
        this.character.anims.play("characterWalk", true); // Play walk right animation
      }
    } 
    // No horizontal movement
    else {
      this.character.anims.play("characterIdle", true); // Play idle animation when not moving
    }

    if (this.keyW.isDown) {
      if(this.keySHIFT.isDown) {
        moveY = -this.cameraSpeed * 1.5;
        this.character.anims.play("characterRun", true); // Play walk right animation
      } else {
        moveY = -this.cameraSpeed;
        this.character.anims.play("characterWalk", true); // Play walk right animation
      }
    }
    if (this.keyS.isDown) {
      if(this.keySHIFT.isDown) {
        moveY = this.cameraSpeed * 1.5;
        this.character.anims.play("characterRun", true); // Play walk right animation
      } else {
        moveY = this.cameraSpeed;
        this.character.anims.play("characterWalk", true); // Play walk right animation
      }
    }

  
    const newX = this.character.x + moveX;
    const newY = this.character.y + moveY;
  
    if (this.canMoveToTile(newX, newY)) {
      this.character.setPosition(newX, newY);
      console.log("Character moved to:", newX, newY);
    } else {
      console.log("Movement blocked at:", newX, newY);
    }

    
  
    this.generateChunks();
  }
}
