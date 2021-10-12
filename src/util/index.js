const { REACT_APP_BASE_URL } = process.env;

export const callApi = async ({url, method, token, body}) => {
    try {
        const options = {
            method: method ? method.toUppercase() : 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        if (token) options.headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${REACT_BASE_URL}${url}`, options);
        const data = await response.json();
        if (data.error) {
            throw (data.error)
        };
        return data;
    } catch (error) {
        console.error(error)
    };
};