var UI = require('ui');
var ajax = require('ajax');
var mainCard = new UI.Card('');

var teamNumber = 'frc'+503;
var baseTeamURL = 'http://www.thebluealliance.com/api/v2/team/';

ajax ({
  url: baseTeamURL + teamNumber,
  type: 'json',
  headers: { 'X-TBA-App-Id': 'frc548_owendaprile:FIRST_for_Pebble:v01' }
},
  function(data) {
    mainCard.title(data.nickname);
    mainCard.subtitle(data.locality + ", " + data.region);
    mainCard.body(data.motto);
    mainCard.show();
  },
  function(error) {
    console.log('error retieving data '+error);
}
);