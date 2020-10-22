class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.scene.launch('Ui'); //jeśli używamy 'launch' zamiast 'start', to uruchamiamy daną scenę równolegle z inną
        this.score = 0;
    }

    create() {
        this.createAudio();
        this.createChests();
        this.createWalls();
        this.createPlayer();
        this.addCollisions();
        this.createInput();
    }

    update() {
        this.player.update(this.cursors);
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound', {
            loop: false,
            volume: 0.2
        }); //określamy głośność i czy powtarzać dźwięk
    }

    createPlayer() {
        this.player = new Player(this, 32, 32, 'characters', 0);
    }

    createChests() {
        //create a chest group
        this.chests = this.physics.add.group();
        //create chest positions array
        this.chestPositions = [[100, 100], [200, 200], [300, 300], [400, 400], [500, 500]];
        //specify the max number of chest we can have
        this.maxNumberOfChests = 3;
        //spawn a chest
        for (let i = 0; i < this.maxNumberOfChests; i += 1) {
            this.spawnChest();
        }
    }

    spawnChest() {
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];
        const chest = new Chest(this, location[0], location[1], 'items', 0);
        //add chest to chests group
        this.chests.add(chest);
    }

    createWalls() {
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.wall); //kolizje postaci z innymi obiektami
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this); //Kolizje postaci z innymi obiektami. Kiedy postać dotknie skrzynię, ta znika i słyszymy dźwięk
    }

    collectChest(player, chest) {
        //play gold pickup sound
        this.goldPickupAudio.play();
        //update our score
        this.score += chest.coins;
        //update score in the UI
        this.events.emit('updateScore', this.score);
        //destroy the chest game object
        chest.destroy();
        //spawn a new chest
        this.time.delayedCall(1000, this.spawnChest, [], this);
    }
}