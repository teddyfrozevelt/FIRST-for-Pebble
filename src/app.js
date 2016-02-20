var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');
Settings.data('teamInfo', {nickname: '', locality: '', region: '', motto: ''});
var teamInfo = Settings.data('teamInfo');

//Initialize and check if teamNumber has been chosen;
Settings.data('teamNum');
var teamNumber = Settings.data('teamNum');
console.log('teamNumber is: ' + teamNumber);
if(teamNumber === undefined) {
  Settings.data('teamNum', 548);
  teamNumber = Settings.data('teamNum');
  console.log('teamNumber successfully set to 548');
  //Retrieve team information and save it
  ajax ({
      url: 'www.thebluealliance.com/api/v2/team/frc' + teamNumber,
      type: 'json',
      headers: { 'X-TBA-App-Id': 'frc548:FIRST-for-Pebble:v0-1' }
    },
      function(data) {
        Settings.data('teamInfo', {nickname: data.nickname, locality: data.locality, region: data.region, motto: data.motto});
        teamInfo = Settings.data('teamInfo');
      },
      function(error) {
        console.log('Error retrieving team information: ' + error);
  });
}
console.log('teamNumber is: ' + teamNumber);

//If user opens page, save their response in teamNum
Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL('https://testspace-teddyfrozevelt.c9.io/');
});

Pebble.addEventListener('webviewclosed', function(e) {
  Settings.data('teamNum', e.response);
  teamNumber = Settings.data('teamNum');
  console.log('teamNumber successfully set to ' + teamNumber);
  //Retrieve team information and save it
  ajax ({
    url: 'www.thebluealliance.com/api/v2/team/frc' + teamNumber,
    type: 'json',
    headers: { 'X-TBA-App-Id': 'frc548:FIRST-for-Pebble:v0-1' }
  },
      function(data) {
        Settings.data('teamInfo', {nickname: data.nickname, locality: data.locality, region: data.region, motto: data.motto});
        teamInfo = Settings.data('teamInfo');
    },
      function(error) {
        console.log('Error retrieving team information: ' + error);
  });
});
//Initialize and display UI elements

var mainMenu = new UI.Menu({
  sections: [{
    items: [{
      title: 'Team Info',
      subtitle: 'FRC ' + teamNumber
    }]
  }]
});
var teamInfoCard = new UI.Card();
mainMenu.show();

mainMenu.on('select', function(e) {
  teamInfoCard.title(teamInfo.nickname);
  teamInfoCard.subtitle(teamInfo.locality + ", " + teamInfo.region);
  teamInfoCard.body(teamInfo.motto);
  teamInfoCard.show();
});