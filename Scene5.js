

class Scene5 extends Phaser.Scene {
    constructor() {
        super("Scene5");
    }
    
    preload(){
        this.load.image('background', 'assets/mainbackground.png');
        this.load.spritesheet('ninjasprite', 'assets/test.png', { frameWidth: 354, frameHeight: 439 });
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('crystal', 'assets/crystal.png');
        this.load.image('toprock15', 'assets/toprock15.png');
        this.load.image('toprock3', 'assets/toprock3.png');
        this.load.image('toprock5', 'assets/toprock5.png');
        this.load.image('middlerock6side', 'assets/middlerock6side.png');
        this.load.image('laser', 'assets/laser.png');
        this.load.image('middlerock3up', 'assets/middlerock3up.png');
        this.load.image('middlerock6', 'assets/middlerock6.png');
        this.load.image('spikesleft', 'assets/spikesleft.png');
        this.load.image('lasersub', 'assets/lasersub.png');
        this.load.image('timebackground', 'assets/timebackground.png');
    }

    create(){
        this.add.image(400, 300, 'background');

        laser1 = this.add.image(700, 270, 'laser').setScale(0.2).setAngle(32.5);
        this.physics.add.existing(laser1);
        laser1.body.setAllowGravity(false);
        laser1.body.setImmovable();

        laser2 = this.add.image(700, 175, 'laser').setScale(0.2).setAngle(32.5);
        this.physics.add.existing(laser2);
        laser2.body.setAllowGravity(false);
        laser2.body.setImmovable();

        lasersub1 = this.add.image(680, 270, 'lasersub');
        this.physics.add.existing(lasersub1);
        lasersub1.body.setAllowGravity(false);
        lasersub1.body.setImmovable();

        lasersub2 = this.add.image(680, 175, 'lasersub');
        this.physics.add.existing(lasersub2);
        lasersub2.body.setAllowGravity(false);
        lasersub2.body.setImmovable();

        platforms = this.physics.add.staticGroup();

        platforms.create(771, 223, 'middlerock3up');
        platforms.create(771, 50, 'middlerock3up');

        platforms.create(400, 30, 'toprock15');
        platforms.create(-383, 570, 'toprock15').setFlip(false, true);

        platforms.create(250, 450, 'toprock3');
        platforms.create(95, 300, 'toprock3');
        platforms.create(350, 250, 'toprock3');

        platforms.create(550, 310, 'middlerock6side');
        platforms.create(550, 600, 'middlerock6side');

        platforms.create(695, 571, 'middlerock6');
        platforms.create(695, 512, 'middlerock6');
        platforms.create(695, 453, 'middlerock6');

        platforms.create(726, 453, 'toprock5').setFlip(false, true);
        

        var spikes = this.add.image(310, 415, 'spikes');
        this.physics.add.existing(spikes);
        spikes.body.setAllowGravity(false);
        spikes.body.setImmovable();

        var spikes2 = this.add.image(289, 215, 'spikes');
        this.physics.add.existing(spikes2);
        spikes2.body.setAllowGravity(false);
        spikes2.body.setImmovable();

        var spikesleft = this.add.image(514, 313, 'spikesleft');
        this.physics.add.existing(spikesleft);
        spikesleft.body.setAllowGravity(false);
        spikesleft.body.setImmovable();

        this.add.image(724, 100, 'crystal').setAngle(90);

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

        this.physics.add.collider(player, lasersub1, function (_player, _lasersub1)
        {
            player.setPosition(20, 450);   
        }
        );

        this.physics.add.collider(player, lasersub2, function (_player, _lasersub2)
        {
            player.setPosition(20, 450);   
        }
        );

        this.physics.add.collider(player, spikes, function (_player, _spikes)
        {
            player.setPosition(20, 450);   
        }
        );

        this.physics.add.collider(player, spikes2, function (_player, _spikes2)
        {
            player.setPosition(20, 450);   
        }
        );

        this.physics.add.collider(player, spikesleft, function (_player, _spikesleft)
        {
            player.setPosition(20, 450);   
        }
        );

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

        if (laser1.x == 700) {
            setTimeout(function(){ laser1.setPosition(900, 270); }, 2000);
        }
        if (laser1.x == 900) {
            setTimeout(function(){ laser1.setPosition(700, 270); }, 2000);
        }

        if (laser2.x == 700) {
            setTimeout(function(){ laser2.setPosition(900, 175); }, 1000);
        }
        if (laser2.x == 900) {
            setTimeout(function(){ laser2.setPosition(700, 175); }, 1000);
        }

        if (lasersub1.x == 680) {
            setTimeout(function(){ lasersub1.setPosition(900, 270); }, 2000);
        }
        if (lasersub1.x == 900) {
            setTimeout(function(){ lasersub1.setPosition(680, 270); }, 2000);
        }

        if (lasersub2.x == 680) {
            setTimeout(function(){ lasersub2.setPosition(900, 175); }, 1000);
        }
        if (lasersub2.x == 900) {
            setTimeout(function(){ lasersub2.setPosition(680, 175); }, 1000);
        }

        player_x = player.x;
        player_y = player.y;
        
        var today = new Date();
        var diff = Math.abs(today - startdate);
        image.setText((diff/1000).toFixed(1));

        if (player.y > 600) {
            player.setPosition(20, 450);
        }

        if (player.x > 800) {
            this.scene.start("Scene6");
        }

        if (player.x < -20) {
            player.setPosition(20, 450);
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