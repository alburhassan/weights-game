var game = {

	generateSequence : function(number, sections, min){
		// TODO:
		// all the code that is required
		// to generate a sequence.
			var ary = [];
			var i = 0;
			while ( number >= 0 ) {
				if (!ary[i % sections]) ary[i % sections] = 0;
				if ( number >= min ) {
					number -= min;
					ary[i % sections] += min;
					min++;
				}
				else {
					ary[i % sections] += number;
					break;
				}
				// Randomize here
				if (i > sections) {
					i += Math.floor(Math.random() * 3);
				}
				else {
					i++;
				}
			}
			return ary;
	},

	level :0 ,
	isthere : [],

	numberSet : function(levelRange,set1,set2,minimum) {							/*(Math.random() * (max - min + 1)) + min;*/
		
		
		console.log(this.level);
		console.log(levelRange);

		if(levelRange<=5) {
			panOne = parseInt(Math.random() * ((levelRange+15)-10+1) + 10, 10);
			panTwo = panOne-2;
		}
		else if (levelRange<=16) {
			panOne = parseInt(Math.random() * ((levelRange+70)-30+1) + 30, 10);
			panTwo = panOne-2;
		}

		p1=this.generateSequence(panOne,set1,minimum);
		p2=this.generateSequence(panTwo,set2,minimum);

		var sequence = p1.concat(p2);
        $('#numberSet').html(sequence.join(','));
							
		this.result = (panOne+panTwo)/2;
		console.log(this.result);

		game.isthere.push(this.result);
		
		if(game.isthere.indexOf(this.result) !== -1) {
			game.isthere.splice(game.level-1,1);
			game.level--;
			return;
		}
	},

	gameFunction : function() {
		// params : number : the number entered by user,
		// balanceType : where the number was entered (left / right)
		// TODO:
		// everytime a user enters a number in any weight

		game.level+=1;
		game.result = 0;

		$('#result').html("");
		$('#level').html("LEVEL : "+game.level);

		if(this.level<=33){

			if(this.level<=5){
				game.numberSet(5,4,3,2);
			}
			else if(this.level<=16){
				game.numberSet(6,5,5,2);
			}
			else if(this.level<=24){
				game.numberSet(24);
			}
			else if(this.level<=33){
				game.numberSet(33);
			}

		}
		else if(this.level<=66){
			game.numberSet;
		}

		else if(this.level<=99){
			game.numberSet();
		}
		else if(this.level==100){
			game.numberSet();
		}
		else {
			console.log("Game Over!");
		}
	},

	winCondition : function(){
		// TODO :
		// Check weather a game is won, lost or needs to continue
		// should return true for win, false for continue.
		var sum1=0;
		var sum2=0;

		var set1 = $('#box1').val();
		var set2 = $('#box2').val();

		var set1Arr = set1.split(',');
		var set2Arr = set2.split(',');

		for(var i=0; i < set1Arr.length; i++) {
			sum1+=parseInt(set1Arr[i]);
		}

		for(var i=0; i < set2Arr.length; i++) {
			sum2+=parseInt(set2Arr[i]);
		}

		if(sum1==this.result && sum2==this.result) {
			$('#box1').val('');
			$('#box2').val('');
			$('#result').html("YOU WIN!!");
			this.gameFunction();
		}
		else
			$('#result').html("Try Again!!");
	}
};

$('#check').on('click',function(){
	game.winCondition();
});

game.gameFunction();
