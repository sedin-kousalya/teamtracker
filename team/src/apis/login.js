import { DOMAIN } from "./config"


export const loginApi = async(bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    };

    // try {
    //     const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);
    //     // const result = await response.json();

    //     // console.log(result)
    //     // if (response.ok) {
    //     //     return [result, ''];
    //     // }

    //     // return ['', result.errors || 'Unknown server error'];
    //     if (response.ok) {
    //         const response = await response.json();

    //         return [response, ''];
    //     }
    //     const errorMessage = await response.text();
    //     return ['', `Server side error: ${errorMessage} `];
    // } catch (error){
    //     return ['',`Server down: ${error}`]
    // }
    try {
        const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);
    
        if (response.ok) {
            
            return [response, ''];
        }
    
        // Handle non-OK responses
        const errorText = await response.text(); // Extract raw text for non-OK responses
        return ['', `Server side error: ${errorText}`];
    
    } catch (networkError) {
        // Handle network errors
        return ['', `Server down: ${networkError.message}`];
    }
    
}