

/*метод вызова состояние конец игры*/
GameStates.GameOver2 = {
  create: function() {
  
    // Добавляем фон
    //this.add.sprite(0, 0, 'phaser');
    // добовляем текст
    var text = this.add.text(270, 240, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
    //text.fill = '#ec008c';
   	this.add.text(110, 290, '"(Смерть 2)please press the SPACEB key to continue..."', { fontSize: '32px', fill: '#fff' });
         // Добавляем ввод с клавиатуры
    this.cursors = this.input.keyboard.createCursorKeys();

    this.Button = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  
  },

   update: function() {
  
    /**
     * Мы просто хотим отследить нажатие.
     * Если оно произошло, то переключаемся обратно в 
     * игровое состояние и начинаем игру заново.
     */
     //console.log(111);

     /*При нажатие кнопки <- начнет игру с начала*/
  
   /* if (this.cursors.left.isDown) {
      this.state.start('Game');
      
    }*/

    if (this.Button.isDown) {
      this.state.start('Gamec');
      
    }
  
  }
  
  
};