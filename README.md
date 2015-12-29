# Swerve

Swerve, dawg.

## Running
You will need to create a `config.js` file that contains the object that was
listed in the `config.js.example` file. Copy it, fill in the proper information,
swerve.

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
