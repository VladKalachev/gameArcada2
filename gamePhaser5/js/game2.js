
/*Состояние - Игра*/


/*Состояние - Игра*/

GameStates.Game2 = {

/*КОНСТАНТЫ*/


  /*метод добовляет мир в игру*/
  initWorld: function() {
    

    /*ИГРОВЫЕ КОНСТАНТЫ*/
    this.score = 0;
    // переменная хранения счетчика
    this.scoreText;
    this.platforms;
    this.live = 100;
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

   

    this.bullets;




/*ФИЗИКА*/


    //  добавляем в игру физику (выбираем аркадную фищику)
    this.physics.startSystem(Phaser.Physics.ARCADE);

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
    this.map = this.add.tilemap('map2');
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
    this.player.body.gravity.y = 300; // вектор гравитации
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


/*Счетчик звездочик*/

  this.scoreText = this.add.text(10,20, "Звездочки: 0", { fontSize: '32px', fill: '#fff' });

  //фиксируем счетчик на одном месте

  this.scoreText.fixedToCamera = true;



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



/*События столкновения*/



/*проверяем столкновение игрока и стены*/
collisianPlayLayer: function () {
  this.game.physics.arcade.collide(this.player, this.layer);
},


/*столкновение игрока со звездочкой*/
collisionPlayStar: function () {
  this.game.physics.arcade.collide(this.player, this.stars, this.ballCollidesWithBlock, null, this);
},



/*обработчик события столкновения игрока и звездочки*/

ballCollidesWithBlock: function(a, stars) {
  stars.kill();
  //star +=1;
  this.star += 10;

  //console.log(typeof this.star);

  //console.log(this.star);
  

  this.scoreText.text = "Звездочки: "+ this.star;



/*СОСТОЯНИЯ (обработка событий)*/


/*Конец игры*/

/*  if (this.star == 20)  {

    this.state.start('Gameover');

  };*/

      if (this.star == 300)  {

        this.state.start('win');
     };
},


/*столкновение звездочки и карты*/

collisianStarLivel: function () {
  this.game.physics.arcade.collide(this.stars, this.layer);
},



/*столкновение аптечки и карты*/
collisianAptLivel: function () {
  this.game.physics.arcade.collide(this.aptec, this.layer, this.AptCollisLivel);
},

/*обработчик события столкновения меча аптечки и уровня*/
AptCollisLivel: function (aptec, b) {
  aptec.kill();
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

        
        /*ЗЕРКАЛЬНО ОТОБРАЖАЕМ ОБЪЕКТ*/
        // element.scale.(x,y) - можно скалировать( изменять размеры относительно координат) и отображать зеркально (если поставить значение -1)
        //this.player.scale.x = -1;

        this.player.scale.x = -1;


        this.player.animations.play('go');

        //console.log(this.player.scale.x);

        //  изменяем крость тела игрока
        this.player.body.velocity.x = -150;


        // добовляем анимацию при нажатие
        //this.player.animations.play('left');
        //console.log(this.player.body.velocity.x);


        // сохраняем положение игрока в переменной
        /*if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }*/


    }

    /*ПРАВО*/

    else if (this.cursors.right.isDown){

        this.player.scale.x = 1;

        //this.player.scale.x = 1;

        //console.log(this.player.scale.x);

        //  изменяем вектор скорости и добовляем анимацию
        this.player.animations.play('go');

        this.player.body.velocity.x = 150;
        //this.player.animations.play('right');

        //this.camera.x += 1;
 //console.log(this.player.body.velocity.x);
        //this.player.animations.play('right');

        /*if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }*/
    


    }

    else {

/*В ПОКОЕ*/

        this.player.animations.stop();

        
       
            this.player.loadTexture('dude', 5);
       

            


      /*if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }*/
        // если мы не нажимаем то анимация остонавливается
        //this.player.animations.stop();
         //console.log(this.player.body.velocity.x);

        // выбираем 4 слайд (из спрайта)
        //this.player.frame = 4;
    }



/*ПРЫЖОК*/

    //  разрешае игроку прыгать если он находиться на змеле
    if (this.cursors.up.isDown && this.player.body.onFloor()) // если нажата кнопка вверх и тело игрока касаеться низа
    {
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
    
  },

/*добовляем динамические методы*/
  update: function() {

  this.collisianPlayLayer();
  this.collisionPlayStar();
  this.collisianStarLivel();
  //this.collisianAptLivel();
  this.handleKeyboardInput();


   

}

};