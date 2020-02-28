/*
	players is an array to hold each player's information.
	Fields:
		name - Football player's name
		img  - The relative/absolute path to the image file.
		alt  - The alternative text that describes the image.
		year - The student's year in college (Freshman, Sophomore, Junior, Senior).
		major- The student's current college major.
		games_played    - The number of football games the student has played for the Buffs.
		pass_yards      - The total number of passing yards in the student's football career for the Buffs.
		rushing_yards   - The total number of rushing yards in the student's football career for the Buffs.
		receiving_yards - The total number of receiving yards in the student's football career for the Buffs.
*/
var players = [{name:"John Doe", img: "../resources/img/player1.jpg", alt:"Image of Player 1", year:"Sophomore", major:"Art", games_played: 23, pass_yards: 435, rushing_yards: 200, receiving_yards: 88},
				{name:"James Smith", img: "../resources/img/player2.jpg", alt:"Image of Player 2", year:"Junior", major:"Science", games_played: 17, pass_yards: 192, rushing_yards: 102, receiving_yards: 344},
				{name:"Samuel Phillips", img: "../resources/img/player3.jpg", alt:"Image of Player 3", year:"Freshman", major:"Math", games_played: 8, pass_yards: 35, rushing_yards: 70, receiving_yards: 98},
				{name:"Robert Myers", img: "../resources/img/player4.jpg", alt:"Image of Player 4", year:"Senior", major:"Computer Science", games_played: 31, pass_yards: 802, rushing_yards: 375, receiving_yards: 128}];


/*
	Registration Page:
		viewStudentStats(id, toggle) method
			parameters:
				id - The css id of the html tag being updated.
				toggle - 
					0 - hide the html tag
					1 - make the html tag visible
			
			purpose: This method will accept the id of an html tag and a toggle value.
					 The method will then set the html tag's css visibility and height.  
					 To hide the html tag (toggle - 0), the visibility will be set to hidden and
					 the height will be set to 0.  
					 To reveal the html tag (toggle - 1), the visibility will be set to visible and
					 the height will be set to auto.
*/
function viewStudentStats(id, toggle){
		if (toggle == 0){
			document.getElementById(id).style.height = 0
			document.getElementById(id).style.visibility = "hidden"
		}
		else if (toggle == 1){
			document.getElementById(id).style.height = "50px"
			document.getElementById(id).style.visibility = "visible"

		}
	}
				
/*
	Home Page: 
		changeColor(color) method
			parameter: 
				color- A css color
				
			purpose: This method will set the html body's background color to the 
					 provided parameter.
*/
function changeColor(color){
		document.body.style.backgroundColor = color;

}
/*
	Football Season Stats Page:
		loadStatsPage method:
			parameters: none
			
			purpose: This method will iterate through the stats table and 
					 do the following:
						1. Read through each row of the table & determine which team won
						   the game.
						
						2. Update the winner column to the name of the winning team.
						
						3. Keep track of the number of wins/losses for the Buffs.
						
						4. Update the second table to show the total number of wins/losses for the Buffs.
*/
function loadStatsPage(){
		
		var id = "stats_table";
		var table = document.getElementById("stats_table");
		var row_counter;
		var col_counter;
		var home_value;
		var opp_value;
		var team_face;
		var total_wins = 0;
		var total_lost = 0;

		for(row_counter = 0;  row_counter < table.rows.length; row_counter++)

		{
		
			for(col_counter = 0; col_counter < table.rows[row_counter].cells.length; col_counter++)
			{
				if (col_counter == 1){
					team_face = table.rows[row_counter].cells[col_counter].innerHTML;
					
				}
				else if(col_counter == 2){
					home_value = table.rows[row_counter].cells[col_counter].innerHTML;
					home_value = parseInt(home_value);
				}
				else if(col_counter == 3){
					opp_value = table.rows[row_counter].cells[col_counter].innerHTML;
					opp_value = parseInt(opp_value);
				}
				
				if(col_counter == table.rows[row_counter].cells.length - 1){
					if(parseInt(home_value) > parseInt(opp_value)){
						table.rows[row_counter].cells[table.rows[row_counter].cells.length - 1].innerHTML = 'CU Boulder';
						total_wins++;
						
					}
				
				else if(parseInt(opp_value) > parseInt(home_value)){
					
						table.rows[row_counter].cells[table.rows[row_counter].cells.length - 1].innerHTML = team_face;
						total_lost++;
						
					}
				}
			}
			}
		
		var other_table = document.getElementById("total_Score");
		document.getElementById('wins').innerHTML = parseInt(total_wins);
		document.getElementById('losses').innerHTML = parseInt(total_lost);

	}
/*
	Football Player Information Page
		loadPlayersPage method:
			parameters: none
			
			purpose: This method will populate the dropdown menu to allow the 
					 user to select which player's information to view.
					 
					 To handle this, you will need to iterate through the players array
					 and do the following for each player:
						1. Create an anchor tag
						2. Set the href to "#", this will make sure the 
							anchor tag doesn't change pages
						3. Set the onclick to call switchPlayers method 
							(this will need to pass in the index inside the players array)
						4. Set the anchor tag's text to the player's name.
						
					After setting all of the anchor tags, update the innerHTML of the dropdown menu.
					As a note, the id for the dropdown menu is player_selector.
		
		switchPlayers(playerNum) method:
			parameters: 
				playerNum - The index of the football player in the players array.
			
			purpose:
				This method will update the the spans on the player's information pageX
				and calculate the average passing, rushing, and receiving yards.
				
				Span ids:
					p_year     - the player's year in college
					p_major    - the player's major in college
					g_played   - the number of games played for Buffs
					player_img - the player's photo (must set src and alt)
					p_yards    - the number of passing yards
					r_yards    - the number of rushing yards
					rec_yards  - the number of receiving yards
					
					Calculated values:
					  avg_p_yards   - the average number of passing yards for the player's Buff career
					  avg_r_yards   - the average number of rushing yards for the player's Buff career
					  avg_rec_yards - the average number of receiving yards for the player's Buff career
*/
				
function loadPlayersPage(){
	var drop_menu = document.getElementById("player_selector");
	var anchor_tags = new Array();
	var index_count;
	for(let index_count = 0 ;index_count <= players.length - 1; index_count++){
		const new_anchor = document.createElement("a");
		new_anchor.href = "#";
		const index_tracker = index_count;
		new_anchor.addEventListener('click',(function(){
			switchPlayers(index_tracker);}));
		new_anchor.innerHTML = players[index_count]["name"];
		drop_menu.appendChild(new_anchor);
		const br_tag = document.createElement("br");
		drop_menu.appendChild(br_tag);
	}
		
	
}
function switchPlayers(playerNum){
	var player_info = players[playerNum];
	var player_image = document.getElementById('player_img');
	player_image.src = player_info['img'];
	var player_year = document.getElementById("p_year");
	player_year.innerHTML = player_info['year'];
	var player_major = document.getElementById('p_major');
	player_major.innerHTML = player_info['major'];
	var games_played = document.getElementById('g_played');
	games_played.innerHTML = player_info['games_played'];
	var p_yards = document.getElementById('p_yards');
	p_yards.innerHTML = player_info['pass_yards'];
	var avg_yards_id = (player_info['pass_yards'] / player_info['games_played']);
	var tag_avg_yards = document.getElementById('avg_p_yards');
	tag_avg_yards.innerHTML = avg_yards_id.toFixed(2);
	var avg_rush_id = (player_info['rushing_yards'] / player_info['games_played']);
	var avg_recieve_id = (player_info['receiving_yards'] / player_info['games_played']);
	var rush_yard = document.getElementById('r_yards');
	var rec_yards_total = document.getElementById('rec_yards');
	rush_yard.innerHTML = player_info['rushing_yards'];
	rec_yards_total.innerHTML = player_info['receiving_yards'];
	var avg_rush_od = document.getElementById('avg_r_yards');
	var avg_rec_od = document.getElementById('avg_rec_yards');
	avg_rush_od.innerHTML = avg_rush_id.toFixed(2);
	avg_rec_od.innerHTML = avg_recieve_id.toFixed(2);

}