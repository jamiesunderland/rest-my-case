### RestMyCase

Rest my case is a tool for making networks requests between two systems with different variable cases, written in typesript but can be used in any javascript environment.

An example of this might be that you have a javascript frontend (hopefully using camelCase) and python or ruby backend (using snake_case). However, you're not sure if you should convert your keys to camelCase for your web API. Rest My Case solves this by converting the keys of the outgoing request to the server from the client case to the server case and upon receiving the incoming request, it converts the server cased keys back into the client case.

By default the client case is camelCase and the server case is snake_case. You can change the client and server case to your hearts desire and even write your own case conversion function (though this might be a little risky).

### How it works
                    
```seq
Note left of Client:  client receives\n request data \n{ someData: 123 }
Client->Server: rmc sends \n{some_data:  123}
Server-->Client: rmc receives \n{ server_data: 123 } 
Note left of Client:  rmc converts \nresponse data to \n{ serverData: 123 }

```

### Installation

`$ npm install rest-my-case`

### Creating a client
```javascript
//client.js
import Rmc, { HttpConfig } from 'rest-my-case';

let config = new HttpConfig();
//not necessary if you're hosting this from your website
config.hostname = 'www.mywebsite.com';
 //not necessary if you're hosting this from a site with the port set
config.port = 3000;
// not necessary if you want the protocol to be inferred from the webaddress
config.useHttps();
//also not necessary but all requests will be prefixed with this sub route
config.uriPrefix = 'api/v1';

export default Rmc()(config);
```

