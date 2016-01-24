
/*Состояние - Игра*/

GameStates.Game = {

/*КОНСТАНТЫ*/


  /*метод добовляет мир в игру*/
  initWorld: function() {

    
    this.live = 100;  
    /*ИГРОВЫЕ КОНСТАНТЫ*/
    this.evels;
    this.score = 0;
    // переменная хранения счетчика
    this.scoreText;
    this.platforms;
    
    this.liveText;
    // переменные уровня
    this.map;
    this.layer;

    this.star = 0;
    //console.log(typeof this.star);
    this.player;
    this.bulletTime = 0;

    //здесь храниться начальное положение игрока
    this.facing = 'right';

    // жизни

    this.lives;

    this.spaceKey;
  
    this.bullets;

    this.pausa;

// врани
    
    this.bad_guys=[];
    this.NR_OF_BAD_GUYS=10;

  

/*ФИЗИКА*/


    //  добавляем в игру физику (выбираем аркадную фищику)
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // изменяет скорость просчитывание столкновение коллизий (исправляет баг с проваливанием объектов через платформы)
    this.game.physics.arcade.TILE_BIAS = 40;

    //this.physics.arcade.gravity.y = 200;
    

/*ПАРАЛАКС ФОНА*/

     // добвляем небо в игру
    this.sky = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');
    this.sky.scale.setTo(2,2);
    this.sky.autoScroll(-10, 0);


    // фиксируем небо что бы сделать паралакс эффект
    this.sky.fixedToCamera = true;


/*КАРТА*/

    // загружаем json
    this.map = this.add.tilemap('map');
    // добовляем спрайт
    this.map.addTilesetImage('tiles');

    // физика для карты
    this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    // инициализируем слой
    this.layer = this.map.createLayer('Tile Layer 1');
    // растягиваем его по всему миру 
    this.layer.resizeWorld();

    this.layer.enableBody = true;

    this.layer.immovable = true;
    
    // добовляем коллизию с tilemap
    //this.map.setCollisionBetween(1, 12);


/*КЛАВИАТУРА*/


     // Добавляем ввод с клавиатуры
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    // добовялем кнопку
    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    // привязываем отдельной функцией к ней собитие
    this.spaceKey.onDown.add(this.togglePause, this);



  },



/*ИГРОК*/

  addPlayer: function () {

/*ДОБОВЛЯЕМ ИГРОКА*/

    // добовляем игрока
    this.player = this.add.sprite(32, this.world.height - 350, 'dude');

    this.player.anchor.setTo(0.5, 0);


/*ФИЗИКА ИГРОКА*/
    //  добовляем играку физику (инициализируем ее)
    this.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

    //  добовляем параметры для физики
    this.player.body.bounce.y = 0.2; // отскок от поверхности
    this.player.body.gravity.y = 500; // вектор гравитации
    this.player.body.collideWorldBounds = true; // запещаем игроку заходить за гроницы мира
    this.player.body.setSize(20, 32, 5, 16); // добовляем карту для тела, по нему будут происходить столкновения


/*АНИМАЦИЯ ИГРОКА*/

    //  добовляем анимации (ходьба влева и вправо)
    //this.player.animations.add('left', [0, 1, 2, 3], 10, true); // название, номера слайдов, колчество кадров в
    // секунду, true замыкаем анимацию в цикде
    this.player.animations.add('go', [5, 6, 7, 8], 10, true);


/*ПУЛЯ*/

    //  добовляем группу пули
    this.bullets = this.add.group();
    // добовляем группе массу тела
    this.bullets.enableBody = true;
    // добовляем им физику
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    // добовляем группу одинаковых спрайтов

    this.bullets.createMultiple(300, 'fireball', 0, false);
    //this.bullets.scale.setTo(1,1);

    // добовляем начальное расположение пули
    // setAll(переменная, значение) - добовляем всем элиментам данные параметры со значениями
    // смищение относительно объекта привязки
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);


/*СЧЕТЧИК ЗВЕЗДОЧИК*/

  this.scoreText = this.add.text(10,20, "Звездочки: 0", { fontSize: '32px', fill: '#fff' });

  //фиксируем счетчик на одном месте

  this.scoreText.fixedToCamera = true;


/*СЧЕТЧИК ЖЫЗНЕЙ*/

  this.lives = this.add.text(600,20, "Жизни: 100", { fontSize: '32px', fill: '#fff' });

  this.lives.fixedToCamera = true;

},


/*ВРАГИ*/

  addEvil: function () {

    this.bad_guys = this.add.group();
  // имее тело
    this.bad_guys.enableBody = true;
  // добовляем им физику
    this.physics.arcade.enable(this.bad_guys);

    for (var i=0;i<this.NR_OF_BAD_GUYS;i++){
    this.bad_guy= this.bad_guys.create(250+i*500, this.world.height - 300, 'badguy');//250+i*500
    
    this.bad_guy.body.bounce.y = 0.2; // отскок от поверхности 0.2*i+0.2;
    this.bad_guy.body.gravity.y = 300; // вектор гравитации
    this.bad_guy.body.collideWorldBounds = true; // запрещаяе заходить за карту

      // анимация врагов
    this.bad_guy.animations.add('left',[0,1],10,true);
    this.bad_guy.animations.add('right',[2,3],10,true);

  }

     //this.evel = this.add.group();

     //this.evel.enableBody = true;

     //var this.evels = this.add.create(70, 0, 'mario');

     /*this.evels = this.add.sprite(370, 350, 'mario');

     this.physics.arcade.enable(this.evels, Phaser.Physics.ARCADE);

     this.evels.anchor.setTo(0.5, 0);

     this.evels.scale.x = -1;
    
      this.evels.enableBody = true;
      this.evels.body.gravity.y = 300;*/


      // запрещает врагу передвигаться при столкновение!
     //this.evels.body.immovable = true;

     //изменяем зону коллизии

      //this.evels.body.setSize(30, 10, 0, 0);



    /*//  добовляем им вектор гравитации
    this.evels.body.gravity.y = 100;     
    this.evels.body.bounce.y = 0.2 ;*/

  },


/*ЗВЕЗДОЧКИ*/

  addStars: function () {


    // добовляем звездочки
    this.stars = this.add.group();
    // добовляем массу тела
    this.stars.enableBody = true;

    //  добовляем звездочки через цикл
    for (var i = 0; i < 100; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');

        //  добовляем им вектор гравитации
        star.body.gravity.y = 100;

        // добовляем им случаную скорость отталкивания от поверхности
        star.body.bounce.y = 0.2 + Math.random() * 0.2;
    };

},




 /*АПТЕЧКА*/

addApt: function () {


    // добовляем 
    this.aptec = this.add.group();
    // добовляем массу тела
    this.aptec.enableBody = true;

     var star = this.aptec.create(0, this.world.height - 164, 'apt');

    //  добовляем им вектор гравитации
    star.body.gravity.y = 300;

    // добовляем им случаную скорость отталкивания от поверхности
    star.body.bounce.y = 0.2;
    

},

/*СОБЫТИЯ КНОПОК*/

/*ENTER*/

togglePause: function()  {
    

    // переключатель состояний паузы
     this.game.paused = (this.game.paused) ? false : true;
    //this.game.paused = (this.game.paused) ? false : true/*this.pausa = this.add.text(100,100, "PAUSED", { fontSize: '32px', fill: '#fff' })*/;
    //console.log(this.game.paused);

    if (this.game.paused) {
      
      console.log("Пауза");

    } else {
      
     console.log("Не пауза");

      //this.pausa = this.add.text(100,100, "PAUSED", { fontSize: '32px', fill: '#fff' });
    };

},

/*СТОЛКНОВЕНИЯ*/


/*проверяем столкновение игрока и стены*/
collisianPlayLayer: function () {
  this.game.physics.arcade.collide(this.player, this.layer);
},


/*столкновение игрока со звездочкой*/
collisionPlayStar: function () {
  this.game.physics.arcade.collide(this.player, this.stars, this.ballCollidesWithBlock, null, this); // не забывай добовлять последние два параметра для коррктного
  // парсинга чисел!!!
},


/*столкновение фаербола с уровнем*/

collisianFaerbolStar: function () {
  this.game.physics.arcade.collide(this.bullets, this.stars, this.ballCollidesWithFaerbol, null, this);
},

/*столкновение фаербола со звездочкой*/

collisianFaerbolLayer: function () {
  this.game.physics.arcade.collide(this.bullets, this.layer);
},


/*столкновение звездочки и карты*/

collisianStarLivel: function () {
  this.game.physics.arcade.collide(this.stars, this.layer);
},



/*столкновение аптечки и карты*/
collisianAptLivel: function () {
  this.game.physics.arcade.collide(this.aptec, this.layer, this.AptCollisLivel);
},



/*столкновение врага и уровня*/
collisianEvilLivel: function () {

  this.game.physics.arcade.collide(this.bad_guys, this.layer);
},

/*событие врага и фаербола*/

collisianEvilFaerbol: function () {
  this.game.physics.arcade.collide(this.bad_guys, this.bullets, this.EvilCollisFaerb);
},

/*столкновение игрока с врагом*/

collisianEvilPlayer: function () {
  this.game.physics.arcade.collide(this.evels, this.player, this.EvilCollisPlayer,null, this);

},



/*ОБРАБОТЧИКИ СОБЫТИЙ*/


/*обработчки события столкновения игрока и врага*/

EvilCollisPlayer: function(evels, b) {

 this.live -= 10;
 //console.log(this.live);
this.lives.text = " Жизни: "+ this.live;

//прокручивет объект по оси  
//this.evels.body.angularAcceleration = 360;

},

/*обработчки сотытия столкновения фаербола и врага*/
EvilCollisFaerb: function(evels, a) {
evels.kill();
console.log("Враг побежден!");
},

/*обработчик события столкновения меча аптечки и уровня*/
AptCollisLivel: function (aptec, b) {
  aptec.kill();
},


/*обработчик события столкновения фаербола со звездочкой*/
ballCollidesWithFaerbol: function (a, stars) {
    stars.kill();
},

/*обработчик события столкновения игрока и звездочки*/

ballCollidesWithBlock: function(a, stars) {
  stars.kill();
  //star +=1;
  this.star += 10;



  //console.log(typeof this.star);

  //console.log(this.star);
  

  this.scoreText.text = "Звездочки: "+ this.star;

/*Конец игры*/

/*  if (this.star == 20)  {

    this.state.start('Gameover');

  };*/

      if (this.star == 200)  {

        this.state.start('win');
     };
},







/*Счетчик очков*/

wotchXP: function () {
  /* Обновляем отображение жизней игрока */

 // this.livesDisplay.setText("Lives: " + this.playerLives);
},


/*проверка проиграша игрока*/
/*ballCollidesWithGround: function() {
  if (this.ball.y >= 470) {
    this.playerLives -= 1;
    this.resetBall();
  }*/

  /*
   Обновляем отображение жизней игрока
   */
/*  this.livesDisplay.setText("Lives: " + this.playerLives);
  
  if (this.playerLives === 0) {
    // если уровень жизни равень нулю то игра перейдет в состояние
    // конец игры
    this.state.start("GameOver");
  }
  
},*/


/*ВЫСТРЕЛ ПУЛИ, ОБРАБОТКА ОГНЯ ИЗ ПУШКИ*/



 fireBullet: function () {



    if (this.time.now > this.bulletTime) // если внутренней время больше (начального времени пули) то
    {
        //  берем одну пулю из большого количества пуль
        this.bullet = this.bullets.getFirstExists(false);// получаем из множества объектов один (false - находит первый не 
            // существующий элимент)


/*ПОЛУЧАЕМ ОДИН ПАТРОН*/


        if (this.bullet) {

            this.bullet.exists = true;  // come to existance !
            this.bullet.lifespan = 400; // время через которое объект быдет удален

/*УСЛОВИЕ*/

            /*ЛЕВО*/

             if (this.player.scale.x == -1) {


                // перемещаем пулю отностильно координат игрока 
                this.bullet.reset(this.player.x - 35, this.player.y + 45);
                // задаем скорость пули для его перемищения в нужном нам направление

                this.bullet.body.velocity.x = - 600;
                
                // доблвядем к времени пули время игры
                this.bulletTime = this.time.now + 200; // тут мы определяем с каким промежудком времени будет отправлена пуля

            } else  {

            /*ПРАВО*/

                   //  то стреляем
                // перемещаем пулю отностильно координат игрока 
                this.bullet.reset(this.player.x + 30, this.player.y + 45);
                // задаем скорость пули для его перемищения в нужном нам направление

                this.bullet.body.velocity.x = 600;
                
                // доблвядем к времени пули время игры
                this.bulletTime = this.time.now + 200; // тут мы определяем с каким промежудком времени будет отправлена пуля

            }


        }
    }

  },



/*
обработка события нажатия клавиш (на лево и на право)
*/
handleKeyboardInput: function () {

    
    this.player.body.velocity.x = 0;
        // добовляем управление

    /*ЛЕВО*/
    if (this.cursors.left.isDown)
    { 

        


        this.player.scale.x = -1;


        this.player.animations.play('go');


        //  изменяем крость тела игрока
        this.player.body.velocity.x = -150;




    }

    /*ПРАВО*/

    else if (this.cursors.right.isDown){

        this.player.scale.x = 1;

        //  изменяем вектор скорости и добовляем анимацию
        this.player.animations.play('go');

        this.player.body.velocity.x = 150;
        //this.player.animations.play('right');

    


    }

    else {

/*В ПОКОЕ*/

        this.player.animations.stop();

        this.player.loadTexture('dude', 5);

  
    }



/*ПРЫЖОК*/
//this.cursors.up.isDown && this.player.body.touching.down
    //  разрешае игроку прыгать если он находиться на змеле this.cursors.up.isDown && this.player.body.onFloor()
    if (this.cursors.up.isDown && this.player.body.onFloor()) // если нажата кнопка вверх и тело игрока касаеться низа
    {
      //console.log(this.player.body.touching.down);
        this.player.body.velocity.y = -310;

    };


/*ОГОНЬ*/


    if (this.fireButton.isDown ){
         
        this.fireBullet();
            
    };

       

},





/*добавляем статичные методы*/

  create: function() {

    this.initWorld();
    this.addPlayer();
    this.addStars();
    this.wotchXP();

    
    //this.addApt();

         /*Камера*/

    // добовляем камеру которая следит за игроком
    this.camera.follow(this.player);

    this.fireBullet();
    this.addEvil();
    this.togglePause();


  },

/*добовляем динамические методы*/
  update: function() {
    // игра не на пайхе при загрузке
    this.game.paused = false;


  this.collisianEvilPlayer();
  this.collisianPlayLayer();
  this.collisionPlayStar();
  this.collisianStarLivel();
  //this.collisianAptLivel();
  this.handleKeyboardInput();
  this.collisianFaerbolLayer();
  this.collisianFaerbolStar();
  this.collisianEvilLivel();
  this.collisianEvilFaerbol();


  //this.physics.arcade.moveToPointer(this.evels, 60, this.player, 500);

  //this.physics.arcade.angleBetween(this.player, this.evels);
  

  //this.player.rotation = this.physics.arcade.angleBetween(this.player, this.evels);

  /*ВРАГИ ПРИСЛЕЛУЮТ*/



    for (var i=0; i < this.bad_guys.countLiving(); i++){

    // получаем одного врага из нескольких
    this.bad_guy=this.bad_guys.getAt(i);
    // устанавливаем их скороть перемищения
    this.speed=20+10*i;
    

    // основное условие
    if (this.player.body.x+1 < this.bad_guy.body.x)
    { 
      this.bad_guy.body.velocity.x=-this.speed;
      this.bad_guy.animations.play('left');
    
    } else  if (this.player.body.x-1 > this.bad_guy.body.x) {

      this.bad_guy.body.velocity.x=this.speed;
      this.bad_guy.animations.play('right');
    
    } else if (this.bad_guy.body.touching.down ){ 
//this.cursors.up.isDown && this.player.body.onFloor()
      console.log(this.bad_guy.body.touching.down);
      
      this.bad_guy.body.velocity.x=0;
      this.bad_guy.body.velocity.y= - this.speed*3;
      this.bad_guy.animations.stop();

    } 
  }




},



/*Дебагер игры*/

  render: function () {
    
    //console.log("Это дебагер!");
    //this.game.debug.body(this.player);
    //this.game.debug.body(this.evels);

    /*выводим текст и нужные переменные через дебагер*/
//    this.game.debug.text("Тут можно  выводить любое сообщение и нужные глобальные переменные", 32, 32, 'rgb(0,255,0)');

    /*дебагер камеры*/
 //   this.game.debug.cameraInfo(this.game.camera, 32, 64);

    /*дебагер спрайта- выдают инфу по координатам*/
   // this.game.debug.spriteCoords(this.player, 32, 150);

  }



};