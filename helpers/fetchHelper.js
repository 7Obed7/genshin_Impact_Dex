const fetchHelper = (endpoint, data, method = "GET") => {
    const url = encodeURI(endpoint)

    if (method === "GET") {
        return fetch(url);
    } else
        return fetch(url, {
            method,
            headers: {
                "Content-type": "aplication/json",
            },
            body: JSON.stringify(data),
        });
    
};

