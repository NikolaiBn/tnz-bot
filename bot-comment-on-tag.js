const steem = require('steem');
const {createServer} = require('http').createServer().listen(3000)
//CONSTANTS AND VARIABLES
      var steemStream;
      const ACCOUNT_NAME = 'teamnz';
      const TAG = 'steemtest';
     const ACCOUNT_KEY = process.env.POSTING_KEY;
//START
      console.log('Bot started. Checking transactions, listening to tags... ');
      steem.api.setOptions({ url: 'https://api.steemit.com' });
//TIMER
      setTimeout(function(){
        // start stream after 5 seconds
        startSteemStream()
      },5000)
//GET DATA FROM BLOCKCHAIN
function startSteemStream(){
steemStream = steem.api.streamTransactions('head', function(err, result) {
try{
    var txType = result.operations[0][0]
    var txData = result.operations[0][1]

      var check;
//Check that it is a post
      if (txType=='comment' && (txData.parent_author=="")){
          var author = txData.author;
          var link = txData.permlink;
          //console.log('processing post by: ', author, ' link: ', link);
					var json;
          var problem;

          if(txData.hasOwnProperty('json_metadata') && txData.hasOwnProperty('json_metadata').length > 0){
            try {json = JSON.parse(txData.json_metadata);}
            catch(err) {console.log('Metadata Err: ', err.name);}
                      //console.log('has metadata');


                      if(json.hasOwnProperty('tags') && json.hasOwnProperty('tags').length > 0){

                          try {hasTag=json.tags.indexOf(TAG);
                            //console.log(' entered idexing ');
                              }
                            catch(err) {console.log('Indexof Err: ',err.name);}

                          if(hasTag > -1){
                            console.log('Tag found in: ',link, ' by: ', author);
                            postComment(ACCOUNT_NAME,ACCOUNT_KEY,author,link);
                            sendVote(ACCOUNT_KEY, ACCOUNT_NAME, author, link, 10000);
                            } // 1. close if hasTag
                      } // 2. close if has property tag
                    } // 3. close if json metadata
                }//close if=comment

              }//TRY
              catch(error){
                console.log(error)
                // if error restart stream
                restartSteemStream()
                            } //catch
        }//close err funk
    );//close streamTransactions
}//steemStream

function endSteemStream(){
  steemStream()
}
function restartSteemStream(){
  endSteemStream()
  startSteemStream()
}
        function sendVote(ACCOUNT_KEY, ACCOUNT_NAME,author,link, weight){
            steem.broadcast.vote(ACCOUNT_KEY, ACCOUNT_NAME, author, link, weight, function(err, result) {
                console.log(err, result);
                console.log('Voted on post: ' ,link, ' by: ', author );

            });
        }
        function postComment(ACCOUNT_NAME,ACCOUNT_KEY,author,link){
        var permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        steem.broadcast.comment(
          ACCOUNT_KEY,
          author, // Parent Author
          link, // Parent Permlink
          ACCOUNT_NAME, // Author
          permlink, // Permlink
          '', // Title
          '<a href="https://discord.gg/rXENHmb"><img src="https://steemitimages.com/DQmW1NKA8XygdJzHidCbnx8o6SsFDKirS3CYrwRLYmRkhWe/teamnz.jpg"></a><br><i>This is a curation bot for TeamNZ. Please join our AUS/NZ community on <a href="https://discord.gg/rXENHmb">Discord</a>.<br>For any inquiries about the bot please contact @cryptonik.</i>', // Body,
          { tags: ['test'], app: 'steemjs' }, // Json Metadata
          function(err, result) {
            console.log(err, result);
            console.log('Commented on post.');

                                }
                        );
                }
