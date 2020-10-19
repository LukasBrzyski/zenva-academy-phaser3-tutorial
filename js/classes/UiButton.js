class UiButton extends Phaser.GameObjects.Container {
    // takie extends ponieważ ta klasa tworzona jest z różnych obiektów gry i różnych typów (coś takiego)
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y);
        this.scene = scene; //scena do której dodamy nasz kontener
        this.x = x; //pozycja X naszego kontenera
        this.y = y; //pozycja Y naszego kontenera
        this.key = key; //tło naszego przycisku
        this.hoverKey = hoverKey; //zmiana tła przycisku podczas 'hover'
        this.text = text; //tekst na przycisku
        this.targetCallback = targetCallback; //funkcja callback wywoływana przy kliknięciu przycisku

        this.createButton(); //stworzenie naszego Ui Button
        this.scene.add.existing(this); //dodanie tego kontenera do naszej Phaser Scene
    }

    createButton() {
        //create play game button
        this.button = this.scene.add.image(0, 0, 'button1');
        //make button interactive
        this.button.setInteractive();
        //scale the button
        this.button.setScale(1.4);

        //create the button text
        this.buttonText = this.scene.add.text(0, 0, this.text, {fontSize: '32px', fill: '#fff'});
        Phaser.Display.Align.In.Center(this.buttonText, this.button); //metoda do wyśrodkowywania danego obiektu w określonym miejscu

        //add the two game objects to our container
        this.add(this.button);
        this.add(this.buttonText);

        //listen for events
        this.button.on('pointerdown', () => {
            this.targetCallback();
        });

        this.button.on('pointerover', () => {
            this.button.setTexture(this.hoverKey); //zmieniamy wygląd przycisku
        });

        this.button.on('pointerout', () => {
            this.button.setTexture(this.key); //przywracamy wygląd przycisku
        });
    }
}

