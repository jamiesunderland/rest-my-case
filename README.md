### RestMyCase

Rest my case is a tool for making networks requests between two systems with different variable cases written in typesript but can be used in any javascript environment. With rest my case you can decouple your api from the type system of its consumers, or make an external api fit the convention of your client.

An example of this might be that you have a javascript frontend (hopefully using camelCase) and python or ruby backend (using snake_case). However, you're not sure if you should convert your keys to camelCase for your web API. Rest My Case solves this by converting the keys of the outgoing request to the server case and upon receiving the incoming request, it converts the server cased keys back into the client case.

By default the client case is camelCase and the server case is snake_case. You can change the client and server case to your hearts desire and even write your own case conversion function (though this might be a little risky).

### How it works
                    
![alt text](https://github.com/jamiesunderland/rest-my-case/blob/master/diagram.png)

### Installation

`$ npm install rest-my-case`

### Creating a client
```javascript
// client.ts
import Rmc, { HttpConfig, RmcClient } from 'rest-my-case';

let config = new HttpConfig();
//not necessary if you're hosting this from your website
config.hostname = 'www.mywebsite.com';
 //not necessary if you're hosting this from a site with the port set
config.port = 3000;
// not necessary if you want the protocol to be inferred from the webaddress
config.useHttps();
//also not necessary but all requests will be prefixed with this sub route
config.uriPrefix = 'api/v1';

let client: RmcClient = Rmc(config);
// OR if you have no need for a config
// let client: RmcClient = Rmc();

export default client;

```
#### How we might make requests with that client
```javascript
import client from './client';

interface SuccessfulResponse {
  keyNumberOne: string,
  keyNumberTwo: number 
}

/* 
Note that the server will receive
{
  some_data: 123
}
and the server response will be 
{
  key_number_one: string,
  key_number_two: number
}
*/

async function requestExamples() {
    const getResponse = await client.get<SuccessfulResponse>('abc');
    const postResponse = await client.post<SuccessfulResponse>('abc', { someData: 123 });
    const putResponse = await client.put<SuccessfulResponse>('abc', { someData: 123 });
    const patchResponse = await client.patch<SuccessfulResponse>('abc', { someData: 123 });
    const deleteResponse = await client.delete<SuccessfulResponse>('abc', { someData: 123 });
}

```

#### Adding a query string
```javascript
import client from './client';


async function queryExamples() {
    // this will make the api request /abc?my_data=foo&other_data=bar
    // you can also define the query string yourself you like by passing in a string
    const getSerializedQueryResponse = await client.get<SuccessfulResponse>('abc', {myData: 'foo', otherData: 'bar'});
    // this will make the api request /abc?foo=1&bar=2
    const getStringQueryResponse = await client.get<SuccessfulResponse>('abc', '?foo=1&bar=2');

    // for other types of requests that are not GET requests you can add a query with the query method
    // before invoking the network request method
    
    // this will post {my_data: 'foo', other_data: 'bar' } to /abc?page_index=10
    const postWithQueryResponse = await client.query({pageIndex: 10}).post('abc', { myData: 'foo', otherData: 'bar'});
    
    // Note you can of course pass in a raw string to the query method as well
}

```
#### Adding custom headers
You can override the headers by calling the headers method prior to the request
```javascript
import client from './client';

/*
The default headers of HttpConfig are
  public headers: Headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
*/
async function headerExamples() {
    const getSerializedQueryResponse = await client
                                             .headers({'Content-Type': 'application/x-www-form-urlencoded'})
                                             .get<SuccessfulResponse>('abc');
}

```
#### Adding a request hook
A request hook can be added to the Http object if it is only used once. However, if you want your client to run a response hook with each request you must set it in the HttpConfig.
```javascript
// client.ts
import Rmc, { HttpConfig, RmcClient, Http, Headers } from 'rest-my-case';

let config = new HttpConfig();

// This request hook ensures that if an authorization token exists in localstorage it will be set in the request's headers
config.requestHook = (http: Http, headers: Headers, data) : Http => {
  let authorizationToken = localStorage.get('token');
  if (authorizationToken !== undefined) {
    return http.headers({...headers, 'Authorization': authorizationToken});
  }
  return http;
}

let client: RmcClient = Rmc(config);
export default client;
```

#### Writing your own case conversion function
While you most likely want to use a tried and tested case conversion function, you may need to write your own. RestMyCase utilizes the [change-case npm package](https://github.com/blakeembrey/change-case) to manage case conversions. If you want to write your own, the signature of a case conversion function is `(str: string) => string`. An example of this may be if your organization has a convention about keeping id in caps in camel case. For example `user id` is written `userID`, not `userId`. In that case you might want to write your own case conversion function.

``` javascript
import Rmc, { HttpConfig, RmcClient } from 'rest-my-case';
import { noCase } from 'change-case';

const camelCaseWithUpperCaseID = (str) => {
  return noCase(str)
    .toLowerCase()
    .split(' ')
    .map(s => s == 'id' ? 'ID': s)
    .map((s, i) => {
      if (i == 0) {
        return s;
      }
      var firstChar = s[0].toUpperCase();
      return firstChar + s.substr(1);
    })
    .join('');
}

let config = new HttpConfig();
// you could do the same thing for converting into the server case
config.clientCase = camelCaseWithUpperCaseID;
let client: RmcClient = Rmc(config);
export default client;
```
