// 外部ファイルの読み込み
const dash_button = require('node-dash-button');
const twitter = require('twitter');
const config = require('./config.json');

const client = new twitter({
	consumer_key: config['consumer_key'],
	consumer_secret: config['consumer_secret'],
	access_token_key: config['access_token'],
	access_token_secret: config['access_token_secret']
});
const params = {
	exclude_replies: true, // リプを含めないか否か
	include_rts: false // リツイートを含めるか否か
};

// Amazon Dash Button
const dash = dash_button(config['address'], null, null, 'all');
dash.on("detected", function() {
	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		const length = Object.keys(tweets).length;
		if (!length) return;
		const target = tweets[0]['id_str'];
		
		console.log(target + 'を削除しようとしています...');
		client.post('statuses/destroy', {id: target}, function(error, tweet, response) {
			if (error) {
				console.log('何かがおかしいよ.');
				console.log(error);
			} else {
				console.log('にゃーん');
			}
		});
		
	});
	
});
