// REMEMBER: Don't store any sensitive information here. We can utilize
// process.env variables if needed, and they can just map to this object as
// needed. Or we can figure out a decent way to get this repo private.

const FACEBOOK_APP_ID = '780398065407719';
const FACEBOOK_APP_SECRET = 'e80f451bfb923b2195c28c1bd2f12d5f';
const FACEBOOK_CALLBACK_URL = 'http://localhost:3000/auth/facebook/authorized';

const TWITTER_API_KEY = 'SWpgATfiWtKXahTXNX44iXxup';
const TWITTER_API_SECRET = 'nAMM1lnVVspVI8ATfGCVi1NQbb7YxgTZlR3HVo0WsWoC02ItwD';
const TWITTER_CALLBACK_URL = 'http://localhost:3000/auth/twitter/authorized';

const REDDIT_API_KEY = 'btA0DL1n4Z5_xQ';
const REDDIT_API_SECRET = '1FLtUx3vS8NbH72hLChxYQwheGk';
const REDDIT_CALLBACK_URL = 'http://127.0.0.1:3000/auth/reddit/authorized';

const SUCCESSFUL_LOGIN_REDIRECT = '/auth/complete';
const FAILURE_LOGIN_REDIRECT = 'http://localhost:3100';

const APP_SESSION_SECRET = 'vt6u7w9fKVDKJtak';

export {
	FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET,
	FACEBOOK_CALLBACK_URL,

	TWITTER_API_KEY,
	TWITTER_API_SECRET,
	TWITTER_CALLBACK_URL,

	REDDIT_API_KEY,
	REDDIT_API_SECRET,
	REDDIT_CALLBACK_URL,

	SUCCESSFUL_LOGIN_REDIRECT,
	FAILURE_LOGIN_REDIRECT,

	APP_SESSION_SECRET
}
