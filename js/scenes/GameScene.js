class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        var goldPickupAudio = this.sound.add('goldSound', {
            loop: false,
            volume: 0.2
        }); //określamy głośność i czy powtarzać dźwięk


        var button = this.add.image(100, 100, 'button1'); // metodę add.image() używamy do nie animowanych obrazków
        button.setOrigin(0.5, 0.5);

        this.add.sprite(300, 100, 'button1'); // sprajty służą do animacji

        this.chest = new Chest(this, 300, 300, 'items', 0);

        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();

        this.player = new Player(this, 32, 32, 'characters', 0);

        this.physics.add.collider(this.player, this.wall); //kolizje postaci z innymi obiektami
        this.physics.add.overlap(this.player, this.chest, function (player, chest) {
            goldPickupAudio.play();
            chest.destroy();
        }); //Kolizje postaci z innymi obiektami. Kiedy postać dotknie skrzynię, ta znika i słyszymy dźwięk

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.update(this.cursors);
    }
}