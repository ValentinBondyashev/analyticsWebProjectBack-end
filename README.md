# Queries: 

  ## CUSTOMER
1) Register customer : /api/customer/register (POST)
  	
		body : {
			"customer": {
				"email" : "qqqqqqqq@gmail.com",
				"password": "4231432412"	
			}
		}
2) Login customer : /api/customer/login (POST)

		body : {
			"customer": {
				"email" : "qqqqqqqq@gmail.com",
				"password": "4231432412"	
			}
		}
  ## SITE
1) Add new site : /api/sites/add (POST) 

		body: {
			{
				"site": "fqwefewfe.com"
			}
		}

2) Delete site : /api/sites/ (DELETE)
	
		body: {
			{
				"id": "1"
			}
		}

3) Get all sites : /api/sites/ (GET)
		
		headers : {
			Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
		}
		
  ## EVENTS
1) Add events : /api/events/add (POST)

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

2) Get all clicks : /api/events/add/get/clicks/:session (GET)
		
		headers : {
			Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
		}
		
2) Get all inputs : /api/events/add/get/inputs/:session (GET)
		
		headers : {
			Authorization : Token 12ew1ske21ed12d.e12ed12d23dfqw3f.f324wf43fgq3
		}
