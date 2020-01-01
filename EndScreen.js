
class EndScreen extends Phaser.Scene {
    constructor() {
        super("EndScreen");
    }
    

    preload(){
        this.load.image('endbackground', 'assets/endbackground.png');
    }

    create(){
        this.add.image(400, 300, 'endbackground');

        var today = new Date();
        var diff = Math.abs(today - startdate);
        var image = this.add.text(375, 258, (diff/1000).toFixed(0) + " seconds", { fontSize: '36px', fill: '#FFF' });
    }

    update(){
        

    }
}