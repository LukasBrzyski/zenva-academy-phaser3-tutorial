class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
        this.scene = scene; //scena do której dodamy nasz kontener
        this.velocity = 160; //prędkość podczas ruchu gracza

        //enable physics
        this.scene.physics.world.enable(this);
        //set immovable if another object collides with our player
        this.setImmovable(false);
        //powiększenie postaci
        this.setScale(2);
        //kolizje z granicami okna gry
        this.setCollideWorldBounds(true);
        //dodanie gracza do istniejącej sceny
        scene.add.existing(this); //jeśli nie, to gracz nie byłby powiązany z obiektem gry (który tworzony jest gdzie indziej)
    }

    update(cursors) {
        this.body.setVelocity(0);

        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
        }

        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity)
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(this.velocity)
        }
    }
}