
const apiService = {
    get: async function (url:string): Promise<any> {
        console.log('get', url)

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log('response', json)

                resolve(json)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    post: async function (url:string, data: any): Promise<any> {
        console.log(url, data)
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log('response', json)

                resolve(json)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}

export default apiService;