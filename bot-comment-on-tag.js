const steem = require('steem');
const {createServer} = require('http').createServer().listen(3000)
//CONSTANTS AND VARIABLES
      var steemStream;
      var check = 1;
      const ACCOUNT_NAME = 'teamnz';
      const TAG = 'teamnz';
      const ACCOUNT_KEY = process.env.POSTING_KEY;
// WHITELIST
      var blacklist = ['mutiarahmi','srimulyani','adam.smit'];
      var whitelist = ['ravenruis','cryptonik','schopenhauer','jackmiller','trudeehunter','thetinykitchen','andysantics48','len.george','kiwiscanfly','john-unasa','melissakellie','biglipsmama','sift666','betelzeus','youvegotquail','kiwideb','samueldouglas','choogirl','ausbitbank','forkyw','masterswatch','uniforce','gamersclassified'];
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

//Check that it is a post
      if (txType=='comment' && (txData.parent_author=="")){
          var author = txData.author;
          var link = txData.permlink;
          //console.log('processing post by: ', author, ' link: ', link);
					var json;
          var problem;

            json = JSON.parse(txData.json_metadata);
                      if(json.hasOwnProperty('tags')){
                          hasTag=json.tags.indexOf(TAG);
                              if(hasTag > -1){

                                    if(blacklist.indexOf(author) > -1){
                                      console.log(author, ': This User is blacklisted.');
                                      postWarning(ACCOUNT_NAME,ACCOUNT_KEY,author,link);
                                                    }
                                    else if(whitelist.indexOf(author) > -1){
                                            console.log('Tag found in: ',link, ' by: ', author);
                                            postComment(ACCOUNT_NAME,ACCOUNT_KEY,author,link);
                                            sendVote(ACCOUNT_KEY, ACCOUNT_NAME, author, link, 10000);
                                                  }//close else if
                                            } // 1. close if hasTag

                                    }// 3. close hasOwnProperty

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
        function postWarning(ACCOUNT_NAME,ACCOUNT_KEY,author,link){
        var permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        steem.broadcast.comment(
          ACCOUNT_KEY,
          author, // Parent Author
          link, // Parent Permlink
          ACCOUNT_NAME, // Author
          permlink, // Permlink
          '', // Title
          '<h2>We do not encourage plagiarism, spam or tag abuse. This user has been blacklisted!</h2>', // Body,
          { tags: ['test'], app: 'steemjs' }, // Json Metadata
          function(err, result) {
            console.log(err, result);
            console.log('Commented on post.');

                                }
                        );
        }
        function postComment(ACCOUNT_NAME,ACCOUNT_KEY,author,link){
        var permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();

        steem.api.getContentReplies(author, link, function(err, result) {
        console.log(err, result);
        console.log('Array length: ', result.length);
        check = 1;
        if(result.length>0){
          for(i=0;i<result.length;i++){
            if(result[i].author==ACCOUNT_NAME){

              check = 0;
                }
              }
            }
            if(check==1){
              steem.broadcast.comment(
                ACCOUNT_KEY,
                author, // Parent Author
                link, // Parent Permlink
                ACCOUNT_NAME, // Author
                permlink, // Permlink
                '', // Title
                '<a href="https://discord.gg/rXENHmb"><img src="https://steemitimages.com/DQmW1NKA8XygdJzHidCbnx8o6SsFDKirS3CYrwRLYmRkhWe/teamnz.jpg"></a><br><i>This is a curation bot for TeamNZ. Please join our AUS/NZ community on <a href="https://discord.gg/rXENHmb">Discord</a>.<br>For any inquiries/issues about the bot please contact @cryptonik.</i>', // Body,
                { tags: ['test'], app: 'steemjs' }, // Json Metadata
                function(err, result) {
                  console.log(err, result);
                  console.log('Commented on post.');

                                      }
                              );
                    }
            else {
              console.log('Commented on this post already!')
                }
          });
}
