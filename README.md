# Swerve

Swerve, dawg.

## Running
You will need to create a `config.js` file that contains the object that was
listed in the `config.js.example` file. Copy it, fill in the proper information,
swerve.

## Authentication
Currently, Swerve supports the following authentication methods:
- reddit
- Facebook
- Twitter

The server authenticates with one of those vendors and returns that vendor's
information. If a user with that vendor's id doesn't already exist, one is created.
Once properly authenticated, the server creates a JWT and redirects to the front-end
application, passing the JWT as the `qt` query parameter. Swerve.

## Data Structure
RethinkDB, swerve!

### Swerve Table, Swerve
```
{
	"id": "XXXX-XXXX-XXXXXX",
	"message": "text",

	"swerves": [
		{
			"swerve": [ ...emojis... ],
			"user_id": "XXXX",
			"date": "JSON DATE Object"
		},
		{
			"swerve": [ ...emojis... ],
			"user_id": "XXXX",
			"date": "JSON DATE Object"
		}
	]
}
```

### Users
```
{
	"id": "OAUTH GENERATED ID",
	"username": "Swerve User",

	"my_swerves": [
		"id", "id2", "id3"
	],

	"their_swerves": [
		"id", "id2", "id3"
	]
}
```
