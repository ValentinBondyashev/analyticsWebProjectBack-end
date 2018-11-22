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
	<details>
		
### 2) Login customer : /api/customer/login (POST)

	<details>
	<summary>show body</summary>
	
		body : {
			"customer": {
				"email" : "qqqqqqqq@gmail.com",
				"password": "4231432412"	
			}
		}
	<details>
		
  ## SITE
### 1) Add new site : /api/sites/add (POST) 
	<details>
	<summary>show body</summary>
	
		body: {
			{
				"site": "fqwefewfe.com"
			}
		}
	<details>
### 2) Delete site : /api/sites/ (DELETE)
	<details>
	<summary>show body</summary>
	
		body: {
			{
				"id": "1"
			}
		}
	<details>

### 3) Get all sites : /api/sites/ (GET)	
	<details>
	<summary>show headers</summary>
	
		headers : {
			Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
		}
	<details>
		
		
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
	<details>	
	
### 2) Get all clicks : /api/events/add/get/clicks/:session (GET)	
	<details>
	<summary>show headers</summary>
	
		headers : {
			Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
		}
	<details>
		
### 3) Get all inputs : /api/events/add/get/inputs/:session (GET)
	<details>
	<summary>show headers</summary>
	
		headers : {
			Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
		}
	<details>
