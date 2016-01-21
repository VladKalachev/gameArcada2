
/*состояние когда игрок выигрывает*/

GameStates.GameWin = {
  create: function() {
  
    // Добавляем фон
    this.add.sprite(0, 0, 'background');
  
    // Добавляем сообщение
    this.add.sprite(20, 30, 'gamewin');
  
    // Добавляем кнопку для продолжения игры
    this.add.sprite(20, 300, 'taptoplay');
  },
  
  update: function() {
  
    /**
     * Мы просто хотим отследить нажатие.
     * Если оно произошло, то переключаемся обратно в 
     * игровое состояние и начинаем игру заново.
     */
  
    if (this.input.pointer1.isDown) {
      this.state.start('Game');
    }
  
  }
  
};