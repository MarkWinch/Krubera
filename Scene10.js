

class Scene10 extends Phaser.Scene {
    constructor() {
        super("Scene10");
    }
    

    preload(){
        this.load.image('background', 'assets/mainbackground.png');
        this.load.spritesheet('ninjasprite', 'assets/test.png', { frameWidth: 354, frameHeight: 439 });
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('crystal', 'assets/crystal.png');
        this.load.image('toprock15', 'assets/toprock15.png');
        this.load.image('middlerock12side', 'assets/middlerock12side.png');
        this.load.image('middlerock3x3', 'assets/middlerock3x3.png');
        this.load.image('middlerock2', 'assets/middlerock2.png');
        this.load.image('laserx', 'assets/laserx.png');
        this.load.image('laserxclear', 'assets/laserxclear.png');
        this.load.image('timebackground', 'assets/timebackground.png');
    }

    create(){
        this.add.image(400, 300, 'background');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 30, 'toprock15');

        platforms.create(29.5, 499, 'middlerock12side');
        platforms.create(88, 499, 'middlerock12side');

        platforms.create(204, 409, 'middlerock3x3');
        platforms.create(378, 466, 'middlerock3x3');
        platforms.create(552, 523, 'middlerock3x3');
        platforms.create(407, 351, 'middlerock2');
        platforms.create(523, 408, 'middlerock2');
        platforms.create(725, 465, 'middlerock3x3');

        platforms.create(203, 583, 'middlerock3x3');
        platforms.create(377, 640, 'middlerock3x3');
        platforms.create(726, 639, 'middlerock3x3');

        laserx1 = this.add.image(318, 195, 'laserx').setScale(0.26).setAngle(45);
        this.physics.add.existing(laserx1);
        laserx1.body.setAllowGravity(false);
        laserx1.body.setImmovable();

        laserx2 = this.add.image(318, 195, 'laserx').setScale(0.26).setAngle(-45);
        this.physics.add.existing(laserx2);
        laserx2.body.setAllowGravity(false);
        laserx2.body.setImmovable();

        laserx3 = this.add.image(607, 242, 'laserx').setScale(0.26).setAngle(45);
        this.physics.add.existing(laserx3);
        laserx3.body.setAllowGravity(false);
        laserx3.body.setImmovable();

        laserx4 = this.add.image(607, 242, 'laserx').setScale(0.26).setAngle(-45);
        this.physics.add.existing(laserx4);
        laserx4.body.setAllowGravity(false);
        laserx4.body.setImmovable();

        laserxclear1 = this.add.image(318, 195, 'laserxclear').setAngle(45);
        this.physics.add.existing(laserxclear1);
        laserxclear1.body.setAllowGravity(false);
        laserxclear1.body.setImmovable();

        laserxclear2 = this.add.image(318, 195, 'laserxclear').setAngle(-45);
        this.physics.add.existing(laserxclear2);
        laserxclear2.body.setAllowGravity(false);
        laserxclear2.body.setImmovable();

        laserxclear3 = this.add.image(607, 242, 'laserxclear').setAngle(45);
        this.physics.add.existing(laserxclear3);
        laserxclear3.body.setAllowGravity(false);
        laserxclear3.body.setImmovable();

        laserxclear4 = this.add.image(607, 242, 'laserxclear').setAngle(-45);
        this.physics.add.existing(laserxclear4);
        laserxclear4.body.setAllowGravity(false);
        laserxclear4.body.setImmovable();

        this.add.image(750, 75, 'crystal');

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

        this.physics.add.collider(player, laserxclear1, function (_player, _laserxclear1)
        {
            player.setPosition(20, 70);
        }
        );

        this.physics.add.collider(player, laserxclear2, function (_player, _laserxclear2)
        {
            player.setPosition(20, 70);
        }
        );

        this.physics.add.collider(player, laserxclear3, function (_player, _laserxclear3)
        {
            player.setPosition(20, 70);
        }
        );

        this.physics.add.collider(player, laserxclear4, function (_player, _laserxclear4)
        {
            player.setPosition(20, 70);
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

    }

    update(){
        player_x = player.x;
        player_y = player.y;

        var today = new Date();
        var diff = Math.abs(today - startdate);
        this.add.image(30, 18, 'timebackground');
        var image = this.add.text(11, 10, (diff/1000).toFixed(1), { fontSize: '16px', fill: '#000' });

        laserx1.rotation -= 0.027; 
        laserx2.rotation -= 0.027;
        laserx3.rotation -= 0.027; 
        laserx4.rotation -= 0.027;

        laserxclear1.rotation -= 0.027;
        laserxclear2.rotation -= 0.027;
        laserxclear3.rotation -= 0.027;
        laserxclear4.rotation -= 0.027;

        if (player.x > 800) {
            this.scene.start("Scene11");
        }

        if (player.x < -20) {
            player.setPosition(20, 70);
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