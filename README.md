# api-portfolio

## API End Point

|EndPoint         |Method|Requirement            |Result       |
|-----------------|------|-----------------------|-------------|
|/getprojects     |GET   |                       |Data Projects|
|/addproject      |POST  |**`Bearer`**+**`json`**|             |
|/editproject     |PUT   |**`Bearer`**+**`json`**|             |
|/deleteproject   |DELETE|**`Bearer`**+**`json`**|             |
|/getskills       |GET   |                       |Data Skills  |
|/addskill        |POST  |**`Bearer`**+**`json`**|             |
|/editskill       |PUT   |**`Bearer`**+**`json`**|             |
|/deleteskill     |DELETE|**`Bearer`**+**`json`**|             |
|/getpersonaldata |GET   |                       |Data Personal|
|/editpersonaldata|PUT   |**`Bearer`**+**`json`**|             |
|/getlog          |GET   |**`Bearer`**           |Data Access  |
|/access          |POST  |**`json`**             |             |
|/login           |POST  |**`json`**             |             |
|/auth            |POST  |**`Bearer`**           |             |

### Json Requirement
EndPoint /addproject  |  /editproject[Edit Add "id" Primary Key]

    {
        "title": "demo",
        "description": "demo",
        "tag": "demo",
        "stacks": "demo",
        "typeContent": "image/video",
        "liveSite": "https://demo.com",
        "repo": "https://demo.com",
        "ThumbnailUrl": "https://demo.com",
        "thumbnailDes": "demo",
        "contents": "https://demo.com",
        "onShow": "true",
        "showHome": "true"
    }
EndPoint /deleteproject["id" Primary Key]

    {
        "id": "1"
    }
EndPoint /addskill  |  /editskill[Edit Add "id" Primary Key]

    {
        "skill": "demo",
        "level": "Entry-Level",
        "iconUrl": "https://demo.com",
        "iconName": "demo",
        "description": "demo",
        "onShow": "true/false"
    }
EndPoint /deleteskill["id" Primary Key]

    {
        "id": "1"
    }
EndPoint /editpersonaldata[Edit on "id" 1]

    {
        "name": "",
        "birthday": "",
        "age": "",
        "location": "",
        "phone": "",
        "email": "",
        "motto": "",
        "personalRecord": "",
        "personalImage": "",
        "contactImage": ""
    }
EndPoint /access

    {
        "ip": "127.0.0.1",
        "page": "/page"
    }
EndPoint /login

    {
        "user": "demo",
        "pass": "demo"
    }

## Environment
**`.env`** file

    ORIGINS = 'http://127.0.0.1,http://yourdomain.com'
    API_PORT = 8000
    DB_HOST = ''
    DB_NAME = ''
    DB_USER = ''
    DB_PASS = ''