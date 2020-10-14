class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
        this.scene = scene;
        this.coins = 10;

        //enable physics
        this.scene.physics.world.enable(this);
        //dodanie gracza do istniejącej sceny
        scene.add.existing(this); //jeśli nie, to gracz nie byłby powiązany z obiektem gry (który tworzony jest gdzie indziej)
    }
}