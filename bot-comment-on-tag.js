// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

const steem = require('steem');
//CONSTANTS AND VARIABLES
      var profit;
      var amountFloat;
      var ACCOUNT_NAME = '';
      var ACCOUNT_KEY = '';
      const TAG = "teamnz";
      var permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
//START
      console.log('Checking Transactions: ');
      steem.api.setOptions({ url: 'https://api.steemit.com' });

//GET DATA FROM BLOCKCHAIN
      steem.api.streamTransactions('head', function(err, result) {
      var txType = result.operations[0][0];
      var txData = result.operations[0][1];
//Check that it is a post
      if (txType=='comment'){
          var author = txData.author;
          var link = txData.permlink;
          console.log('processing post by: ', author, ' link: ', link);
					var json;
          try {json = JSON.parse(txData.json_metadata);}
          catch(err) {console.log('No json metadata: ', err.name);}
          try {console.log('JSON: ', json.tags);}
          catch(err){console.log('No tag object in json: ', err.name);}
          var hasTag;
          try {hasTag=json.tags.indexOf(TAG);}
          catch(err) {console.log('Cannot call indexOf: ', err.name);}

          if (hasTag > -1){
          console.log('Tag found in post by: ', author);
          postComment(ACCOUNT_NAME,ACCOUNT_KEY,permlink,author,link);
          sendVote(ACCOUNT_KEY, ACCOUNT_NAME, author, link, 10000);

                         } // close if
                }//close if=comment
        }//close err funk
    );//close streamTransactions

        function sendVote(ACCOUNT_KEY, ACCOUNT_NAME,author, link, weight){
            steem.broadcast.vote(ACCOUNT_KEY, ACCOUNT_NAME, author, link, weight, function(err, result) {
                console.log(err, result);
                console.log('Voted on post.');

            });
        }
        function postComment(ACCOUNT_NAME,ACCOUNT_KEY,permlink,author,link){
        steem.broadcast.comment(
          ACCOUNT_KEY,
          author, // Parent Author
          link, // Parent Permlink
          ACCOUNT_NAME, // Author
          permlink, // Permlink
          '', // Title
          '<a href="https://discord.gg/rXENHmb"><img src="https://steemitimages.com/DQmW1NKA8XygdJzHidCbnx8o6SsFDKirS3CYrwRLYmRkhWe/teamnz.jpg"></a><br><i>This is a curation bot for TeamNZ. Please join our AUS/NZ community on <a href="https://discord.gg/rXENHmb">Discord</a>.<br>For any inquiries about the bot please contact @cryptonik.</i>', // Body,
          { tags: ['test'], app: 'teamnz/cryptonik' }, // Json Metadata
          function(err, result) {
            console.log(err, result);
            console.log('Commented on post.');

                                }
                        );
                }
