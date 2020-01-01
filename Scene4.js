

class Scene4 extends Phaser.Scene {
    constructor() {
        super("Scene4");
    }
    

    preload(){
        this.load.image('background', 'assets/mainbackground.png');
        this.load.spritesheet('ninjasprite', 'assets/test.png', { frameWidth: 354, frameHeight: 439 });
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('crystal', 'assets/crystal.png');
        this.load.image('toprock15', 'assets/toprock15.png');
        this.load.image('middlerock3', 'assets/middlerock3.png');
        this.load.image('middlerock6', 'assets/middlerock6.png');
        this.load.image('middlerock', 'assets/middlerock.png');
        this.load.image('middlerock6side', 'assets/middlerock6side.png');
        this.load.image('toprock13side', 'assets/toprock13side.png');
        this.load.image('rock', 'assets/rock.png');
        this.load.image('rockplatform', 'assets/rockplatform.png');
        this.load.image('timebackground', 'assets/timebackground.png');
        this.load.image('door', 'assets/door.png');
    }

    create(){
        this.add.image(400, 300, 'background');


        var door = this.add.image(670, 520, 'door');
        this.physics.add.existing(door);
        door.body.setAllowGravity(false);
        door.body.setImmovable();

        platforms = this.physics.add.staticGroup();

        platforms.create(813, 100, 'toprock13side').setFlip(true, false);

        platforms.create(810, 460, 'middlerock6');

        platforms.create(420, 230, 'middlerock6side');
        platforms.create(420, 431, 'middlerock');

        platforms.create(610, 315, 'middlerock6side');
        platforms.create(668, 315, 'middlerock6side');
        

        platforms.create(400, 30, 'toprock15');
        platforms.create(400, 570, 'toprock15').setFlip(false, true);

        platforms.create(50, 183, 'middlerock3');
        platforms.create(50, 241, 'middlerock3');
        platforms.create(50, 299, 'middlerock3');
        platforms.create(50, 357, 'middlerock3');
        platforms.create(50, 415, 'middlerock3');
        platforms.create(50, 473, 'middlerock3');
        platforms.create(50, 531, 'middlerock3');
        platforms.create(50, 589, 'middlerock3');
        platforms.create(164, 538, 'toprock13side');

        var spikes = this.add.image(455, 307, 'spikes').setAngle(90);
        this.physics.add.existing(spikes);
        spikes.body.setAllowGravity(false);
        spikes.body.setImmovable();

        var spikes2 = this.add.image(575, 447, 'spikes').setAngle(270);
        this.physics.add.existing(spikes2);
        spikes2.body.setAllowGravity(false);
        spikes2.body.setImmovable();

        var spikes3 = this.add.image(575, 187, 'spikes').setAngle(270);
        this.physics.add.existing(spikes3);
        spikes3.body.setAllowGravity(false);
        spikes3.body.setImmovable();

        var spikes4 = this.add.image(455, 90, 'spikes').setAngle(90);
        this.physics.add.existing(spikes4);
        spikes4.body.setAllowGravity(false);
        spikes4.body.setImmovable();

        var spikes5 = this.add.image(300, 535, 'spikes');
        this.physics.add.existing(spikes5);
        spikes5.body.setAllowGravity(false);
        spikes5.body.setImmovable();

        var rock = this.add.image(660, 95, 'rock').setAngle(-30);
        this.physics.add.existing(rock);

        var rockplatform = this.add.image(738, 410, 'rockplatform');
        this.physics.add.existing(rockplatform);
        rockplatform.body.setAllowGravity(false);
        rockplatform.body.setImmovable();

        this.add.image(373, 300, 'crystal').setAngle(90);

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

        this.physics.add.collider(platforms, rock);
        this.physics.add.collider(player, rock);
        this.physics.add.collider(rock, rockplatform, function (_rock, _rockplatform)
        {
            rockplatform.setTintFill(0xffffff);
            door.destroy(); 
        });

        this.physics.add.collider(player, door);

        this.physics.add.collider(player, spikes, function (_player, _spikes)
        {
            player.setPosition(20, 120);   
        }
        );

        this.physics.add.collider(player, spikes2, function (_player, _spikes2)
        {
            player.setPosition(20, 120);   
        }
        );

        this.physics.add.collider(player, spikes3, function (_player, _spikes3)
        {
            player.setPosition(20, 120);   
        }
        );

        this.physics.add.collider(player, spikes4, function (_player, _spikes4)
        {
            player.setPosition(20, 120);   
        }
        );

        this.physics.add.collider(player, spikes5, function (_player, _spikes5)
        {
            player.setPosition(20, 120);   
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

        if (player.x > 800) {
            this.scene.start("Scene5");
        }

        if (player.x < -20) {
            player.setPosition(20, 120);
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