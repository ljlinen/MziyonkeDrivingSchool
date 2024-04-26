//Reusable fetch request
let envport = '';
let envhost = '';

(async() => {
  await fetch('./env.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('failed loading env json');
      }
      return response.json();
    })
    .then(data => {
      envport = data.port;
      envhost = data.host;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  })();

async function apiFetch(fetchType, endpoint, params) {
 
    const options = {
        method: `${fetchType}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
    }

    if (params instanceof Object) {
        console.log('params is object ' + JSON.stringify(params));
        //options.body = JSON.stringify(params);
    } else {
        console.log('params not object ' + JSON.stringify(params));
        throw new Error('params is not an object')
    }

    try {
        const response = await fetch(`${endpoint}`, options);
        if (!response.ok) {
            throw await response.json();
        }
        
        console.log('request was successful');        
        const responseBody = await response.json(); // Parse response body as JSON
        return responseBody;
    } catch (error) {
      if(error instanceof Object) {
                console.log(error);
      }

        throw error;
    }
}
