
/*Состояние - Игра*/

GameStates.Game = {



/*КОНСТАНТЫ*/


  /*метод добовляет мир в игру*/
  initWorld: function() {

    this.invader;

    // взрывы

    this.explosions;
  
    // Таймер

    this.hitTimer = 0;
    
    //this.live = 100;  
    /*ИГРОВЫЕ КОНСТАНТЫ*/
    this.evels;
    this.score = 0;
    // переменная хранения счетчика
    this.scoreText;
    this.platforms;
    
    //this.liveText;
    // переменные уровня
    this.map;
    this.layer;
    this.ships;

    this.star = 0;
    //console.log(typeof this.star);
    this.player;
    this.bulletTime = 0;

    //здесь храниться начальное положение игрока
    this.facing = 'right';

    // жизни

    //this.lives;
    this.lifes;


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

    this.physics.arcade.gravity.y = 200;
    

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

   

    // инициализируем слой
    this.layer = this.map.createLayer('Tile Layer 1');

    // растягиваем его по всему миру 
    this.layer.resizeWorld();

    this.layer.enableBody = true;

    this.layer.immovable = true; 

    // физика для карты (указываем коллизию для первого основного слоя)
    this.map.setCollisionByExclusion([0],true, 'Tile Layer 1');

/*ШИПЫ*/
    
    // инициализируем
    this.ships = this.map.createLayer('Tile Layer 2');
    //this.ships1 = this.map.createLayer('Tile Layer 3');

    // добовляем им коллизию
    this.map.setCollisionBetween(1,20,true,'Tile Layer 2');






    //mymap.setCollisionByExclusion([0],true, 'layer1');  // будет сталкиваться со всеми плитками кроме 0 т.к. ее нет!
    //mymap.setCollisionBetween(1,20,true,'layer2');  // столкновение будет возможно на всех плитках от 1 до 20


    this.ships.resizeWorld();
    

    this.ships.enableBody = true;

    this.ships.immovable = true;

    //this.ships.body.setSize(20, 32, 5, 16);
    
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
    this.physics.arcade.enable(this.player);

    //  добовляем параметры для физики
    this.player.body.bounce.y = 0.2; // отскок от поверхности
    this.player.body.gravity.y = 170; // вектор гравитации
    this.player.body.collideWorldBounds = true; // запещаем игроку заходить за гроницы мира
    //this.player.body.setSize(20, 32, 5, 16); // добовляем карту для тела, по нему будут происходить столкновения


/*АНИМАЦИЯ ИГРОКА*/

    //  добовляем анимации (ходьба влева и вправо)
    //this.player.animations.add('left', [0, 1, 2, 3], 10, true); // название, номера слайдов, колчество кадров в
    // секунду, true замыкаем анимацию в цикде
    this.player.animations.add('go', [5, 6, 7, 8], 10, true);
    this.player.animations.add('hit', [2, 4, 5], 20, true);


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

  //this.lives = this.add.text(600,20, "Жизни: 100", { fontSize: '32px', fill: '#fff' });

  //this.lives.fixedToCamera = true;

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

    /*ДОБОВЛЯЕМ ОБЛАКА*/

          /*  this.clouds = this.add.physicsGroup();

            this.cloud1 = new CloudPlatform(this.game, 300, 450, 'cloud-platform', this.clouds);

            this.cloud1.addMotionPath([
                { x: "+200", xSpeed: 2000, xEase: "Linear", y: "-200", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-200", xSpeed: 2000, xEase: "Linear", y: "-200", ySpeed: 2000, yEase: "Sine.easeOut" },
                { x: "-200", xSpeed: 2000, xEase: "Linear", y: "+200", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "+200", xSpeed: 2000, xEase: "Linear", y: "+200", ySpeed: 2000, yEase: "Sine.easeOut" }
            ]);*/


  },



/*ЖИЗНИ*/

addLive: function () {

// создаем группу сердечик
  this.lifes = this.add.group();

// через цикл выводим три звездочки
  for (var i=0;i<3;i++){

// выводим
    this.lifes.create(16+i*32,50,'live');
// фиксируем их на одном месте на экране
    this.lifes.fixedToCamera = true;

  }

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


/*ВЗРЫВЫ*/

addExplosions: function() {
  
  //  делаем группу
    this.explosions = this.add.group();

  // добовляем в нее изображения
    this.explosions.createMultiple(30, 'kaboom');


    console.log()
  // добовляем события для очистки огня и анимации взрыва
   //this.explosions.forEach(this.setupInvader, this);
},






 /*АПТЕЧКА*/

addApt: function () {


    // добовляем 
    this.aptec = this.add.group();
    // добовляем массу тела
    this.aptec.enableBody = true;

     var star = this.aptec.create(500, this.world.height - 264, 'apt');

    //  добовляем им вектор гравитации
    star.body.gravity.y = 300;

    // добовляем им случаную скорость отталкивания от поверхности
    star.body.bounce.y = 0.2;

    var star2 = this.aptec.create(200, this.world.height - 264, 'apt');

     //  добовляем им вектор гравитации
    star2.body.gravity.y = 300;

    // добовляем им случаную скорость отталкивания от поверхности
    star2.body.bounce.y = 0.2;

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

/*столкновение игрока с шипами*/

collisianPlayerShip: function () {

  this.game.physics.arcade.collide(this.player, this.ships, this.ShipCollionPlayer, null, this);
},

collisianPlayerShip2: function () {

  this.game.physics.arcade.collide(this.player, this.ships1, this.ShipCollionPlayer, null, this);
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


/*столкновение игрока и аптечки*/

collisianPlayerApt: function () {

 this.game.physics.arcade.collide(this.player, this.aptec, this.AptCollisPlauer, null, this);

},


/*столкновение врага и уровня*/
collisianEvilLivel: function () {

  this.game.physics.arcade.collide(this.bad_guys, this.layer);
},

/*событие врага и фаербола*/

collisianEvilFaerbol: function () {
  this.game.physics.arcade.collide(this.bad_guys, this.bullets, this.EvilCollisFaerb, null, this);
},

/*столкновение игрока с врагом*/

collisianEvilPlayer: function () {

  this.game.physics.arcade.collide( this.player, this.bad_guys, this.hit, null, this);
},




/*ОБРАБОТЧИКИ СОБЫТИЙ*/



/*Обработка события столкновение игрока с шипами*/

ShipCollionPlayer: function () {

  console.log("Это шипы!");

   this.state.start('Gameover');

},


/*обработчки события столкновения игрока и врага*/

hit: function(player, bad_guy) {

//this.live -= 10;

//this.lives.text = " Жизни: "+ this.live;

//console.log("Столкновение с врагом");

//прокручивет объект по оси  
//this.evels.body.angularAcceleration = 360;






if (this.hitTimer<=0){
  
    this.lifes.getFirstAlive().kill();


    //player.body.velocity.y = -150;

    if (this.player.body.x < this.bad_guy.body.x) {
      //console.log(player.body.x < bad_guy.body.x);
      this.player.body.velocity.x = -200;
    }

    else {

      this.player.body.velocity.x = 200;
      console.log(111);


    }
    
    this.player.animations.play('hit');

    this.hitTimer=50;

    //bulletTime = this.time.now + 300;
    
    // условие проиграша
    if (this.lifes.countLiving()==0){


      if (this.hitTimer<=0){
      //game.paused=true;
      this.player.body.angularAcceleration = 360;
    }
      else
      this.hitTimer=50;


      this.player.kill();

/*Создаем взрыв*/
//this.explosion = this.explosions.getFirstExists(false);

this.explosion = this.explosions.getFirstExists(false);// получаем из множества объектов один (false - находит первый не 
            // существующий элимент)
this.explosion.reset(this.player.body.x, this.player.body.y-60);
this.explosion.play('kaboom', 30, false, true);

//this.explosion.animations.add('kaboom');

  //анимация взрыва
this.explosion.animations.add('kaboomanim',[1,2,3,4,5,6,7,8,10,11],10,true)
//проиграет аницацию

this.explosion.animations.play('kaboomanim');


this.explosion.lifespan = 500;

//this.game.time.events.next.toFixed(0), 32, 64;

//this.game.time.events.duration.toFixed(100), 32, 32;

//this.game.time.events.loop(1500, this.state.start('Gameover'), this);


      this.state.start('Gameover');

    }

  } 

},



/*function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}*/

setupInvader: function  (invader) {

    //this.invader.anchor.x = 0.5;
    //invader.anchor.y = 0.5;
    //invader.animations.add('kaboom');

},



/*обработчки сотытия столкновения фаербола и врага*/

EvilCollisFaerb: function(bad_guy, a) {
//this.bad_guy.exists = true;

 //this.player.anchor.setTo(0.5, 0);
//bad_guy.scale.y = -1;
//bad_guy.add.sprite(32, 50, 'dude');

bad_guy.kill();

/*Создаем взрыв*/
//this.explosion = this.explosions.getFirstExists(false);

this.explosion = this.explosions.getFirstExists(false);// получаем из множества объектов один (false - находит первый не 
            // существующий элимент)
this.explosion.reset(bad_guy.body.x, bad_guy.body.y-60);
this.explosion.play('kaboom', 30, false, true);

//this.explosion.animations.add('kaboom');

  //анимация взрыва
this.explosion.animations.add('kaboomanim',[1,2,3,4,5,6,7,8,10,11],10,true)
//проиграет аницацию

this.explosion.animations.play('kaboomanim');


this.explosion.lifespan = 500;




//bad_guy.callAll('dude');

//bad_guy.enableBody = false;
//bad_guy.body.collideWorldBounds = false;

//bad_guy.body.bounce.y = 0.2; // отскок от поверхности
//bad_guy.body.gravity.y = -500; // вектор гравитации
//bad_guy.body.collideWorldBounds = true; // запещаем игроку заходить за гроницы мира

//bad_guy.anchor.setTo(0.5, 0.5);
//bad_guy.body.angularAcceleration = 100;
//bad_guy.lifespan = 500; // используеться в место кил, отличие в возможности установить таймер (через сколько милесикунд исчесзинт объект)


//bad_guy.kill();
//evels.kill();
console.log("Враг побежден!");
},


/*обработчик события столкновения меча аптечки и уровня*/

AptCollisLivel: function (aptec, layer) {

  //aptec.kill();
  //console.log("Это аптечкак!");

},


/*обработчик события столкновения фаербола со звездочкой*/
ballCollidesWithFaerbol: function (a, stars) {
    stars.kill();
},


/*Обработчик столкновения игрока и аптечки*/


AptCollisPlauer: function (player, aptec) {

  console.log("вы взяли аптечку");


  aptec.kill();

// удаляет первый элимент
  //this.lifes.getFirstAlive().kill();

// добовляем элимент в указанные коориднаты
 // this.lifes.create(16,50,'live');

  if (this.lifes.countLiving() == 2){
  this.lifes.create(16,50,'live');
 } else if (this.lifes.countLiving() == 1) {
  this.lifes.create(49,50,'live');
 } else if (this.lifes.countLiving() >= 3){ // услоивие при которое если у нас больше звездочек чем три то значение остаеться равно трем
  this.lifes.countLiving() == 3;
 }

//console.log(this.lifes);

  //console.log(this.lifes.countLiving().kill());



//this.lifes += 1;

/* if (this.lifes.countLiving() <= 3){
  this.lifes.create(16,50,'live');
 } else if ( this.lifes.countLiving() <= 2) {
  this.lifes.create(32,50,'live');
 } else {

 }*/

  

  //this.lifes.getFirstAlive().kill();

  //console.log(this.lifes.countLiving());

  /*if (this.lifes.countLiving() == 3){

    this.lifes.countLiving() ++;

    this.lifes.create(16,50,'live');*/

  /*}, else if (this.lifes.countLiving() == 2) {

    this.lifes.create(16,50,'live');

  }, else if (this.lifes.countLiving() == 1) {

    this.lifes.create(16,50,'live');

  }, else {
    consol.log("не добавит");
  },*/

  //if (this.lifes.countLiving()==0){

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

  if (this.hitTimer<=0){

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

         }

    else 

      this.hitTimer--;  




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
    this.addLive();

    
    this.addApt();

         /*Камера*/

    // добовляем камеру которая следит за игроком
    this.camera.follow(this.player);

    this.fireBullet();
    this.addEvil();
    this.togglePause();

    this.addExplosions();


  },

/*добовляем динамические методы*/
  update: function() {
    // игра не на пайхе при загрузке
    this.game.paused = false;

// проверка количество жизней
console.log(this.lifes.countLiving());

  this.collisianEvilPlayer();
  this.collisianPlayLayer();
 //столкновение с шипами

  this.collisianPlayerShip();
  this.collisianPlayerShip2();

  this.collisionPlayStar();
  this.collisianStarLivel();
  //аптечка
  this.collisianAptLivel();
  this.collisianPlayerApt();

  this.handleKeyboardInput();
  this.collisianFaerbolLayer();
  this.collisianFaerbolStar();
  this.collisianEvilLivel();
  this.collisianEvilFaerbol();

  //очищаем взрыв
  this.setupInvader();



 


  //this.physics.arcade.moveToPointer(this.evels, 60, this.player, 500);

  //this.physics.arcade.angleBetween(this.player, this.evels);
  

  //this.player.rotation = this.physics.arcade.angleBetween(this.player, this.evels);




  /*ВРАГИ ПРИСЛЕЛУЮТ*/

    for (var i=0; i < this.bad_guys.countLiving(); i++){

    // получаем одного врага из нескольких
    this.bad_guy=this.bad_guys.getAt(i);
    // устанавливаем их скороть перемищения
    this.speed=50+10*i;
    

    // основное условие
    if (this.player.body.x+1 < this.bad_guy.body.x)
    { 
      this.bad_guy.body.velocity.x=-this.speed;
      this.bad_guy.animations.play('left');
    
    } else  if (this.player.body.x-1 > this.bad_guy.body.x) {

      this.bad_guy.body.velocity.x=this.speed;
      this.bad_guy.animations.play('right');
    
    } else if (this.bad_guy.body.onFloor()){ 
      //this.cursors.up.isDown && this.player.body.onFloor()
      //console.log(this.bad_guy.body.touching.down);
      
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

    this.game.debug.body(this.ships);

    /*выводим текст и нужные переменные через дебагер*/
//    this.game.debug.text("Тут можно  выводить любое сообщение и нужные глобальные переменные", 32, 32, 'rgb(0,255,0)');

    /*дебагер камеры*/
 //   this.game.debug.cameraInfo(this.game.camera, 32, 64);

    /*дебагер спрайта- выдают инфу по координатам*/
   // this.game.debug.spriteCoords(this.player, 32, 150);

  },


 /*КОНСТРУКТОР ОБЛАКОВ*/
  CloudPlatform: function (game, x, y, key, group) {

        if (typeof group === 'undefined') { group = game.world; }

        Phaser.Sprite.call(this, game, x, y, key);

        game.physics.arcade.enable(this);

        this.anchor.x = 0.5;

        this.body.customSeparateX = true;
        this.body.customSeparateY = true;
        this.body.allowGravity = false;
        this.body.immovable = true;

        this.playerLocked = false;

        group.add(this);

    },



};