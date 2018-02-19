  <script src="https://cdn.steemjs.com/lib/latest/steem.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
      <script>
      var profit;
      var amountFloat;
      var ACCOUNT_NAME = '';
      var ACCOUNT_KEY = '';
      var permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        console.log('Checking Transactions: ')
        // Tutorial 05 - @mention Bot
        const ACCOUNT_NAME = 'minnowbooster'
        steem.api.setOptions({ url: 'https://api.steemit.com' });
        steem.api.streamTransactions('head', function(err, result) {
          let txType = result.operations[0][0]
          let txData = result.operations[0][1]

          if (txType=='comment'){
            let author = txData.author;
            let link = txData.permlink;
          console.log('TXDATA: ', txData);
          let json = JSON.parse(txData.json_metadata);
          console.log('JSON: ', json.tags);
         if (json.tags.indexOf("steemtest") > -1){
          postComment(ACCOUNT_NAME,ACCOUNT_KEY,permlink,author,link);
          }
        }
//json_metadata: "{\"tags\":[\"photography\",\"castellano\",\"carnaval\",\"travel\",\"venezuela\"],\"image\":[\"https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/34806_150380245014518_7920146_n.jpg?oh=d97de59e2fa514dc5ef7aa86f2af0149&oe=5B258830\",\"https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/10398493_58079215926_4436441_n.jpg?oh=562702edd38b55144f6623d4d223ff03&oe=5B102CC5\",\"https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/10398493_58079230926_607391_n.jpg?oh=2ef2e0d716593289c3f183fb40bf204c&oe=5B150E82\",\"https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/165546_150382271680982_3329837_n.jpg?oh=43261d642c37d2cda6544f630d3c5def&oe=5B11186E\",\"https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9


          let includesMention = checkTransaction(txType,txData)
          if (includesMention) {
            sendEmail(txData)
            getPriceFeed();
          }
        });
        function getPriceFeed(){
          $.getJSON('https://api.coinmarketcap.com/v1/ticker/steem-dollars/', function(data) {
    var price = data[0].price_usd;
    price = Number(price)
    profit = amountFloat*price;
  //  console.log('Pricefeed: ' + price.toFixed(2) + ' (USD/SBD) // Amount: ' + amountFloat + ' SBD // Profit: $' + profit.toFixed(2)+ ' USD');
});
        }

        function checkTransaction(txType,txData) {
          if(txType == 'transfer') {
            console.log('PROCESSING: ','from:' + txData.from, 'to: ' + txData.to)
            let sender = txData.from;
            let mentionACCOUNT_NAME = '@' + ACCOUNT_NAME;
            if(txData.from == 'minnowbooster'){
          //  console.log('Transfer identified!')
          //  console.log (`Hey! Looks like @${txData.to} just got a payout from @${txData.from}`);
        //    console.log (txData)
            amountFloat = Number(txData.amount.match( /[\d|,|.|e|E|\+]+/g ))
            }

            return (txData.from == 'minnowbooster')
          }
        }
        function sendEmail(txData){
        //  console.log('SENDING EMAIL')
          $.ajax({
              url: 'https://formspree.io/nickb1893@gmail.com',
              method: 'POST',
              data: { message: `Hey! Looks like @${txData.to} just got a payout from @${txData.from}` },
              dataType: 'json'
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
          { tags: ['test'], app: `steemjs/examples` }, // Json Metadata
          function(err, result) {
            console.log(err, result);
          }
        );
        }
      </script>
