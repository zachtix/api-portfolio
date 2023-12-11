# api-portfolio

## API End Point

|EndPoint                      |Method|Payload                                                        |Result       |
|------------------------------|------|---------------------------------------------------------------|-------------|
|/getprojects                  |GET   |                                                               |Data Projects|
|**`WIP`**<br>/addproject      |POST  |                                                               |             |
|**`WIP`**<br>/editproject     |PUT   |                                                               |             |
|**`WIP`**<br>/deleteproject   |DELETE|                                                               |             |
|/getskills                    |GET   |                                                               |Data Skills  |
|**`WIP`**<br>/addskill        |POST  |                                                               |             |
|**`WIP`**<br>/editskill       |PUT   |                                                               |             |
|**`WIP`**<br>/deleteskill     |DELETE|                                                               |             |
|/getpersonaldata              |GET   |                                                               |Data Personal|
|**`WIP`**<br>/editpersonaldata|PUT   |                                                               |             |
|**`WIP`**<br>/getlog          |GET   |                                                               |Data Access  |
|/access                       |POST  |**`json`**<br>{<br>  "ip":"127.0.0.1",<br>  "page":"/test"<br>}|             |
|**`WIP`**<br>/login           |POST  |                                                               |             |
|**`WIP`**<br>/auth            |POST  |                                                               |             |

## Environment
**`.env`** file

    ORIGINS = 'http://127.0.0.1,http://yourdomain.com'
    API_PORT = 8000
    DB_HOST = ''
    DB_NAME = ''
    DB_USER = ''
    DB_PASS = ''