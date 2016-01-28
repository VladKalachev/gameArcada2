var GameStates = {}; // <-- Объект для хранения всех наших игровых состояний

document.addEventListener("DOMContentLoaded", function()  {

	/*Создаем экран*/

	var width = 800;
	var height = 600;


var game = new Phaser.Game(width, height, Phaser.CANVAS, "game");

/*Иницилизируем состояния*/

  // Добавляем игровое состояние, все состояния нужно регистрировать
  game.state.add('Preloader', GameStates.Preloader);
  game.state.add('Nevgame', GameStates.NaveGame);
  game.state.add('Game', GameStates.Game);
  game.state.add('Game2', GameStates.Game2);
  game.state.add('win', GameStates.LivelWin);
  game.state.add('Gameover', GameStates.GameOver);
  game.state.add('GameWin', GameStates.GameWin);
  
  // чекпоинт первого уровня
  game.state.add('Gamec', GameStates.Gamec);
  game.state.add('Gameoverl', GameStates.GameOver2);



  // Запускаем состояние Preloader
  game.state.start('Preloader');
  
});