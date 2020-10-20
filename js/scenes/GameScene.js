class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.scene.launch('Ui'); //jeśli używamy 'launch' zamiast 'start', to uruchamiamy daną scenę równolegle z inną
    }

    create() {
        this.goldPickupAudio = this.sound.add('goldSound', {
            loop: false,
            volume: 0.2
        }); //określamy głośność i czy powtarzać dźwięk

        this.chest = new Chest(this, 300, 300, 'items', 0);

        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();

        this.player = new Player(this, 32, 32, 'characters', 0);

        this.physics.add.collider(this.player, this.wall); //kolizje postaci z innymi obiektami
        this.physics.add.overlap(this.player, this.chest, this.collectChest, null, this); //Kolizje postaci z innymi obiektami. Kiedy postać dotknie skrzynię, ta znika i słyszymy dźwięk

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.update(this.cursors);
    }

    collectChest(player, chest) {
        //play gold pickup sound
        this.goldPickupAudio.play();
        //update score in the UI
        this.events.emit('updateScore', chest.coins);
        //destroy the chest game object
        chest.destroy();
    }
}