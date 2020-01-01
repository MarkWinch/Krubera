var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 1400 },
                debug: false
            }
        },
        scene: [TitleScene, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8,
         Scene9, Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16, Scene17, Scene18, 
         Scene19, Scene20, Scene21, Scene22, Scene23, Scene24, Scene25, Scene26, Scene27, Scene28,
         Scene29, Scene30, EndScreen]
    };

var player;
var platforms;
var cursors;

var player_x;
var player_y;

var player_direction = 'right';
var player_state = 'normal';
var jumping_state = 'first_jump';

var laser1;
var laser2;

var lasersub1;
var lasersub2;

var ball1;
var ball2;
var ball3;

var bigspikes;

var startdate;
var enddate;

var boosters;
var wall_spikes;
var h_spikes;

var laserx1;
var laserx2;
var laserx3;
var laserx4;

var laserxclear1;
var laserxclear2;
var laserxclear3;
var laserxclear4;

var crusher1;
var crusher2;

var jump_count = 0;
var game = new Phaser.Game(config);






