/*Состояние*/
/*функция загрузки ассетов*/

GameStates.Preloader = {
	/*медот предворительно щагружает ресурсы и индексирует их*/
  preload: function() {
    //подгружаем карту в ресурсах 
    this.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
    // огненный шар
    this.load.image('fireball', 'assets/fireball.png',40,30);

    // добвляем тайт для карты
    this.load.image('tiles', 'assets/tiles.png');

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('apt', 'assets/firstaid.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48); // ключь, значение (адрес ресурса), размер одного кадра


    this.load.image('nev', 'assets/new.jpg');

    this.load.spritesheet('mario', 'assets/mariospritesheet-small.png',50,50);



    // враг
    this.load.spritesheet('badguy','assets/baddie.png', 32, 32);
    //this.load.spritesheet('evil', 'assets/baddie.png');
    // жизни
    this.load.image('live', 'assets/life.png');

    //взрывы (при уничтожение объектов)
    this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);


  },
  /*метод инициализирует игру для перезода в другое состояние (в
  	состояние самой игры)*/
  create: function(){
    this.state.start('Nevgame');
  }
};


/*здесь мы в начале загружаем все ресурсы а затем открываем само
окно с игрой*/