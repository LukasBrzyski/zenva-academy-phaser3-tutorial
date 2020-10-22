class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        //load images
        this.loadImages();
        //load spritsheets
        this.loadSpriteSheets();
        //load audio 
        this.loadAudio();
    }

    loadImages() {
        this.load.image('button1', 'assets/images/ui/blue_button01.png');
        this.load.image('button2', 'assets/images/ui/blue_button02.png');
    }

    loadSpriteSheets() {
        this.load.spritesheet('items', 'assets/images/items.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('characters', 'assets/images/characters.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    loadAudio() {
        this.load.audio('goldSound', ['assets/audio/Pickup.wav']); // dźwięki pdajemy w tablicy
    }

    create() {
        this.scene.start('Game'); //uruchamiamy scenę Game, bo jak nie to wczytywany jest tylko pierwszy element z tablicy scene[]
    }
}