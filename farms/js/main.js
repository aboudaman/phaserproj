var game = new Phaser.Game(900, 600, Phaser.AUTO, '');

// Create a state for the game
var GameState = {
  preload: function() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('chicken', 'assets/images/chicken.png');
    this.load.image('horse', 'assets/images/horse.png');
    this.load.image('pig', 'assets/images/pig.png');
    this.load.image('sheep', 'assets/images/sheep3.png');
    this.load.image('rightarrow', 'assets/images/arrow.png');
  },
  create: function() {
    // Define the screen scale mode
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // Call the sprite backgroun and load it
    this.background = this.game.add.sprite(0, 0, 'background');

    // Set up Animal JSON data
    var animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'pig', text: 'PIG'},
        {key: 'sheep', text: 'SHEEP'},
      {key: 'horse', text: 'HORSE'},

    ];

    // Create a group for the animals
    this.animals = this.game.add.group();

    // create a variable so values can be accessed inside the for Loop
    var self = this;
    var animal;

    // Loop through animal data to position each animal
    animalData.forEach(function(element) {
      animal = self.animals.create(-320, 250, element.key);

      animal.customParams = {text: element.text};
      animal.anchor.setTo(0.5);

      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, self);
      console.log(element.key);
    });
    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(320, 250);

    // Center the chicken by using this.game.world feature of phaser
    // this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
    // this.chicken = this.game.add.sprite(300, 250, 'chicken');
    // this.chicken.anchor.setTo(0.5);
    // this.chicken.scale.setTo(2);

    // Add the horse
    // this.horse = this.game.add.sprite(310, 250, 'horse');
    // this.horse.anchor.setTo(0.5);

    // Add the pig
    // this.pig = this.game.add.sprite(310, 250, 'pig');
    // this.pig.anchor.setTo(0.5);
    // Flip it
    // this.pig.scale.setTo(-1, 1);

    // Set up pig to allow user input
    // this.pig.inputEnabled = true;
    // this.pig.input.pixelPerfectClick = true;
    // this.pig.events.onInputDown.add(this.animateAnimal, this);

    // Add the sheep
    // this.sheep = this.game.add.sprite(310, 250, 'sheep');
    // this.sheep.anchor.setTo(0.5);

    // Rotate the sheep
    // this.sheep.angle = 45;

    // Add Right arrow
    this.rightarrow = this.game.add.sprite(580, 200, 'rightarrow');
    this.rightarrow.anchor.setTo(0.5);
    this.rightarrow.customParams = {direction: 1};

    // Set up Right Arrow to allow user input
    this.rightarrow.inputEnabled = true;
    this.rightarrow.input.pixelPerfectClick = true;
    this.rightarrow.events.onInputDown.add(this.switchAnimal, this);

    // Add Left arrow
    this.leftarrow = this.game.add.sprite(60, 200, 'rightarrow');
    this.leftarrow.anchor.setTo(0.5);
    this.leftarrow.angle = 180;
    this.leftarrow.customParams = {direction: -1};

// Left Arrow allows user input
    this.leftarrow.inputEnabled = true;
    this.leftarrow.input.pixelPerfectClick = true;
    this.leftarrow.events.onInputDown.add(this.switchAnimal, this);
  },
  update: function() {
    // this.sheep.angle += 0.5;

  },
  switchAnimal: function(sprite, event) {
    var newAnimal, endX;
    if (sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      endX = 20040;

    } else {
      newAnimal = this.animals.previous();
      endX = -20040;
    }

    this.currentAnimal.x = endX;
    newAnimal.x = 300;
    this.currentAnimal = newAnimal;


  },
  animateAnimal: function(sprite, event) {
    console.log("Animate ");
  }
};

// Add the state to the game
game.state.add('GameState', GameState);

// This will start the game
game.state.start('GameState');
