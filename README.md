# Queries: 

  ## CUSTOMER
### 1) Registration customer : /api/customer/register (POST)

 <details>
  <summary>show body</summary>

	body : {
		"customer": {
			"email" : "qqqqqqqq@gmail.com",
			"password": "4231432412"	
		}
	}
 </details>
 <details>
  <summary>show response</summary>

	{ token: eyJhbGciOiJIUzI1NiIJ9.LmNvbSIsInV1aWQIMTU0Mjk2NzM5MH0.e5gcG4hsp3eA_eWowOD9HvILYxM }
 </details>
	


### 2) Login customer : /api/customer/login (POST)
 <details>
  <summary>show body</summary>

	body : {
		"customer": {
			"email" : "qqqqqqqq@gmail.com",
			"password": "4231432412"	
		}
	}
	
 </details>
 <details>
  <summary>show response</summary>

	{ token: eyJhbGciOiJIUzI1NiIJ9.LmNvbSIsInV1aWQIMTU0Mjk2NzM5MH0.e5gcG4hsp3eA_eWowOD9HvILYxM }
 </details>
		
  ## SITE
### 1) Add new site : /api/sites/add (POST) 

<details>
<summary>show body</summary>

	body: {
		{
			"site": "fqwefewfe.com"
		}
	}
</details>
<details>
  <summary>show response</summary>

	{
	"site":
		{
			"uuid":"efb27400-f144-11e8-906c-d55c514f1bc7",
			"customerUuid":"1cc45cc0-eef1-11e8-99b1-1514067ef5f9",
			"address":"google.com",
			"updatedAt":"2018-11-26T06:31:41.632Z",
			"createdAt":"2018-11-26T06:31:41.632Z"
		}
	}
 </details>
	
### 2) Delete site : /api/sites/:siteUuid (DELETE)

<details>
  <summary>show response</summary>

	{ deletedSite: true }
 </details>

### 3) Get all sites : /api/sites/ (GET)	

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>
<details>
  <summary>show response</summary>

	{
	"site":
		[{
			"uuid":"efb27400-f144-11e8-906c-d55c514f1bc7",
			"customerUuid":"1cc45cc0-eef1-11e8-99b1-1514067ef5f9",
			"address":"google.com",
			"updatedAt":"2018-11-26T06:31:41.632Z",
			"createdAt":"2018-11-26T06:31:41.632Z"
		},
		....
		]
	}
 </details>
 
 ### 4) Edit site address : /api/sites/edit (PUT)	

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>
	
<details>
<summary>show body</summary>

	body: {
		"uuid":"efb27400-f144-11e8-906c-d55c514f1bc7",  //uuid site that you want edit
		"address": "new address" 
	}
</details>

<details>
  <summary>show response</summary>

	{ success: true }
 </details>
 
  ## EVENTS
### 1) Add events : /api/events/add (POST)

<details>
<summary>show body</summary>

	body : {
		"clicks" : [
		{
			"time": 1542629670935, 
			"sessionId": "1542629669143", 
			"localName": "p", 
			"innerText": "footer works!"
		},
		....
		],
		"inputs": [
			{
			"time": 1542629670935, 
			"sessionId": "1542629669143", 
			"className": "p", 
			"localName": "12we12e12s",
			"targetValue": "footer works!",
			"targetId": "1212s"
			},
			....
			],
		....
		}
	}
</details>	

### 2) Get all actions : /api/events/all/:siteUuid/:filter*? (GET)  // filter is optional parametr

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>


### 3) Attach events : /api/events/attach (POST)

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>

<details>
<summary>show body</summary>

	{
	"site": {
		"uuid": "c2955650-ef27-11e8-a747-d571d2ef82aa", //uuid site
		"events": ["clicks", "inputs"]
	}
	}
</details>

### 4) Get all actions by type : /api/events/:typeEvent/:site (GET)

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>

### 5) Get all attached events : /api/events/attach/:site (GET)

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>

### 6) Get all types event : /api/events/allTypes (GET)

### 7) Delete events attach : /api/events/deleteAttach (DELETE)

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>

<details>
<summary>show body</summary>

	{
		"siteUuid": "c2955650-ef27-11e8-a747-d571d2ef82aa",
		"events": ["clicks", "inputs"]
	}
</details>

### 8) Get sort clicks : /api/events//clicks/sort/:uuidSite (GET) 

<details>
<summary>show headers</summary>

	headers : {
		Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
	}
</details>


## ROUTES
### 1) Add route : /api/routes/add (POST)

<details>
<summary>show body</summary>

	body : {
		 oldUrl: 'localhost/1',
		 newUrl: 'localhost/2',
		 sessionId: '123445677'
	}
</details>
	
### 2) Get all routes : /api/routes/all/:siteUuid (GET)

 <details>
  <summary>show response</summary>

	{
    "allRoutes": {
        "address": "http://localhost:4200",
        "uuid": "40c197a0-fc5c-11e8-a811-93ae31ef6bbb",
        "users": [
            {
                "sessionId": "1544434128490",
                "uuid": "015bf810-fc5e-11e8-8d2c-dd50340cecbc",
                "routes": [
                    {
                        "to": "http://localhost:4200/new",
                        "from": null
                    }
                ]
            },
            {
                "sessionId": "1544434137597",
                "uuid": "06b9b7c0-fc5e-11e8-8d2c-dd50340cecbc",
                "routes": [
                    {
                        "to": "http://localhost:4200/new",
                        "from": null
                    },
                    {
                        "to": "http://localhost:4200/analize",
                        "from": "http://localhost:4200/new"
                    },
                    {
                        "to": "http://localhost:4200/new",
                        "from": "http://localhost:4200/analize"
                    },
                    {
                        "to": "http://localhost:4200/analize",
                        "from": "http://localhost:4200/new"
                    }
                ]
            }
        ]
    }
}
 </details>
