class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
        this.scene = scene; //scena do której dodamy ten obiekt
        this.coins = 10; //liczba monet w skrzyni

        //enable physics
        this.scene.physics.world.enable(this);
        //dodanie gracza do istniejącej sceny
        scene.add.existing(this); //jeśli nie, to gracz nie byłby powiązany z obiektem gry (który tworzony jest gdzie indziej)
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.body.checkCollision.none = false;
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body.checkCollision.none = true;
    }
}