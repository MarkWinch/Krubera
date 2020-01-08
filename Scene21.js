

class Scene21 extends Phaser.Scene {
    constructor() {
        super("Scene21");
    }
    

    preload(){
        this.load.image('background', 'assets/mainbackground.png');
        this.load.spritesheet('ninjasprite', 'assets/test.png', { frameWidth: 354, frameHeight: 439 });
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('crystal', 'assets/crystal.png');
        this.load.image('toprock15', 'assets/toprock15.png');
        this.load.image('middlerock', 'assets/middlerock.png');
        this.load.image('middlerock3', 'assets/middlerock3.png');
        this.load.image('longdoor', 'assets/longdoor.png');
        this.load.image('bouncer', 'assets/bouncer.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('timebackground', 'assets/timebackground.png');
    }

    create(){
        this.add.image(400, 300, 'background');

        var longdoor1 = this.add.image(620, 90, 'longdoor');
        this.physics.add.existing(longdoor1);
        longdoor1.body.setAllowGravity(false);
        longdoor1.body.setImmovable();

        var longdoor2 = this.add.image(620, 500, 'longdoor');
        this.physics.add.existing(longdoor2);
        longdoor2.body.setAllowGravity(false);
        longdoor2.body.setImmovable();

        platforms = this.physics.add.staticGroup();

        platforms.create(880, 171, 'toprock15').setFlip(false, true);
        platforms.create(880, 400, 'toprock15').setFlip(false, true);
        platforms.create(880, 571, 'toprock15').setFlip(false, true);

        platforms.create(29, 171, 'middlerock');

        platforms.create(250, 171, 'middlerock');

        platforms.create(250, 400, 'middlerock3');

        platforms.create(115, 571, 'middlerock');
        platforms.create(250, 571, 'middlerock');

        var doorplatform1 = this.add.image(249, 150, 'bouncer');
        this.physics.add.existing(doorplatform1);
        doorplatform1.body.setAllowGravity(false);
        doorplatform1.body.setImmovable();

        var doorplatform2 = this.add.image(250, 551, 'bouncer');
        this.physics.add.existing(doorplatform2);
        doorplatform2.body.setAllowGravity(false);
        doorplatform2.body.setImmovable();

        wall_spikes = this.physics.add.staticGroup();
        wall_spikes.create(500, 135, 'spikes');
        wall_spikes.create(715, 135, 'spikes');
        wall_spikes.create(500, 535, 'spikes');
        wall_spikes.create(715, 535, 'spikes');

        ball1 = this.add.image(1500, 265, 'ball').setScale(2);
        this.physics.add.existing(ball1);
        ball1.body.setAllowGravity(false);
        ball1.body.setImmovable();
        ball1.body.setVelocityX(-500);

        ball2 = this.add.image(780, 340, 'ball').setScale(2);
        this.physics.add.existing(ball2);
        ball2.body.setAllowGravity(false);
        ball2.body.setImmovable();
        ball2.body.setVelocityX(-500);

        this.add.image(250, 446, 'crystal');

        player = this.physics.add.sprite(0, player_y, 'ninjasprite').setScale(0.07, 0.07);

        player.setBounce(0.15);
        player.setDragX(1100);
        

        this.anims.create({
            key: 'jump',
            frames: [ { key: 'ninjasprite', frame: 11 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ninjasprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [ { key: 'ninjasprite', frame: 2 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ninjasprite', { start: 12, end: 21 }),
            frameRate: 10,
            repeat: -1
        }); 

        this.anims.create({
            key: 'stuck',
            frames: [ { key: 'ninjasprite', frame: 0 } ],
            frameRate: 20
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, longdoor1);
        this.physics.add.collider(player, longdoor2);

        this.physics.add.collider(player, ball1, function (_player, _ball1)
        {
            player.setPosition(20, 90);   
        }
        );

        this.physics.add.collider(player, ball2, function (_player, _ball2)
        {
            player.setPosition(20, 90);   
        }
        );


        this.physics.add.collider(player, wall_spikes, function (_player, _wall_spikes)
        {
            player.setPosition(20, 90);   
        }
        );

        this.physics.add.collider(player, doorplatform1, function (_player, _doorplatform1)
        {
            doorplatform1.setTintFill(0xffffff);
            longdoor1.destroy(); 
        });

        this.physics.add.collider(player, doorplatform2, function (_player, _doorplatform2)
        {
            doorplatform2.setTintFill(0xffffff);
            longdoor2.destroy(); 
        });

        this.physics.add.collider(player, platforms, function (_player, _platform)
        {
            if (_player.body.touching.right && _platform.body.touching.left)
            {
                player.setVelocityY(0);
                player.anims.play('stuck', true);
                player_state = 'on_wall';
            }


            if (_player.body.touching.left && _platform.body.touching.right)
            {
                player.setVelocityY(0);
                player.anims.play('stuck', true);
                player_state = 'on_wall_left';
            }

        });

        image = this.add.text(11, 10, ' ', { fontSize: '16px', fill: '#FFF' });

    }

    update(){
        player_x = player.x;
        player_y = player.y;
        
        var today = new Date();
        var diff = Math.abs(today - startdate);
        image.setText((diff/1000).toFixed(1));

        if (player.x > 800) {
            this.scene.start("Scene22");
        }

        if (player.x < -20) {
            player.setPosition(20, 90);
        }

        if (player.y > 600) {
            player.setPosition(20, 90);
        }

        if (ball1.x < 0) {
            ball1.setPosition(800,265);
        }

        if (ball2.x < 0) {
            ball2.setPosition(800,340);
        }



        //Keyboard input flipping the player on its x axis.
        if (cursors.right.isDown) {
           if (player_direction == 'left'){
              player.x +=20;
           }
           player_direction = 'right';
           player.setScale(0.07, 0.07);
           player.setOrigin(0.5, 0.5);
        }

        if (cursors.left.isDown) {
           if (player_direction == 'right'){
              player.x -=20;
           }
           player_direction = 'left'
           player.setScale(-0.07, 0.07);
           player.setOrigin(1.5, 0.5);
        }

        //Determining wall climbing and hanging mechanics for right side.
        
        if (player_state == 'on_wall') {
            player.body.gravity.x = 2000;
            if (cursors.right._justDown) {
                if (cursors.up._justDown && player.body.touching.right){
                   
                   setTimeout(function(){ player.setVelocityX(-200); }, 150);
                }
            }
        }

        if (player_state == 'on_wall') {
            if (cursors.up._justDown && player.body.touching.right && cursors.right._justDown)
            {
                
                setTimeout(function(){ player.setVelocityY(-425); }, 150);
                
            }
        }

        if (!cursors.right.isDown && player_state == 'on_wall'){
            player_state = 'normal';
            
            if (cursors.up.isDown) {
                player.setVelocityY(-22);
            }
        }

        if (cursors.right.isUp && !player.body.blocked.right && player_state == 'on_wall') {
            player_state = 'normal';
            
        }

        //Determining wall climbing and hanging mechanics for left side.
        if (player_state == 'on_wall_left') {
            player.body.gravity.x = -2000;
            if (cursors.left._justDown) {
                if (cursors.up._justDown && player.body.touching.left){
                  
                   setTimeout(function(){ player.setVelocityX(200); }, 150);
                }
            }
        }

        if (player_state == 'on_wall_left') {
            if (cursors.up._justDown && player.body.touching.left && cursors.left._justDown)
            {
                
                setTimeout(function(){ player.setVelocityY(-425); }, 150);
                
            }
        }

        if (!cursors.left.isDown && player_state == 'on_wall_left'){
            player_state = 'normal';
            
            if (cursors.up.isDown) {
                player.setVelocityY(-22);
                jumping_state = 'second_jump';
            }
        }

        if (cursors.right.isDown && player_state == 'on_wall_left')
        {
            player_state = 'normal';
        }

        //Player jumping mechanics.
        if (player.body.blocked.down) {
            jumping_state = 'first_jump';
            jump_count = 1;
        }
        else if (player.body.blocked.right || player.body.blocked.left) {
            jumping_state = 'first_jump';
            if (cursors.up.isDown) {
               jump_count = 0;
            }
            else {
                jump_count = 1;
            }
        }

        if (player_state == 'normal') {
            player.body.gravity.x = 0;
            if (cursors.up.isDown && player.body.blocked.down)
            {
                player.anims.play('jump', true);
                player.setVelocityY(-550);
            }

            if (!player.body.blocked.down){
                player.anims.play('jump', true);
                if (player.body.velocity.y > 0 && player_state == 'normal') {
                   if (cursors.up.isDown) {
                     if (jumping_state == 'first_jump') {
                        jumping_state = 'second_jump';
                        player.setVelocityY(-550);
                     }
                     if (jumping_state == 'second_jump' && jump_count < 2) {
                        player.setVelocityY(-550);
                        jump_count += 1;
                     }
                   }
                }
            }
        }

        if (cursors.right.isDown && player_state == 'on_wall_left') {
            player.setVelocityX(160);
            player_state = 'normal';
            
            player.anims.play('right', true);
        }


        if (cursors.left.isDown && player_state !== 'on_wall_left')
        {
            player.setVelocityX(-160);
            player_state = 'normal';

            if (player.body.blocked.down) {
                player.anims.play('right', true);
            }
            else {
                player.anims.play('jump', true);
            }
        }
        if (cursors.right.isDown)
        {
            if (player_state == 'normal') {
               player.setVelocityX(160);

               if (!cursors.up.isDown) {
                   if (player.body.velocity.y !== 0) {
                      player.anims.play('right', true);
                   }  
               }
            }
            
        }
        else
        {
            if (player_state == 'normal') {
               if (!cursors.left.isDown){
                  player.setVelocityX(0);
               }
            }

            if (!cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
               if (player.body.touching.right == false && player.body.touching.left == false){
                 player.anims.play('idle');
               }
            }

        }

        if (cursors.down.isDown)
        {
            player.setVelocityY(550);
        }

    }
}