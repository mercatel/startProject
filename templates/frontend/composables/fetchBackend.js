const baseUrl = 'http://127.0.0.1:8000'
export const fetchAdmin = () => {
    const exampleCreate = async (body) => {
        return await fetch(`${baseUrl}/patch/create/`, {
            method: "POST",
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
    const exampleDetail = async (id) => {
        return await fetch(`${baseUrl}/patch/${id}/`, {
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
    }
    const exampleUpdate = async (body) => {
        return await fetch(`${baseUrl}/patch/${body.id}/`, {
            method: "PUT",
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
    const exampleDelete = async (id) => {
        return await fetch(`${baseUrl}/patch/${id}/`, {
            method: "DELETE",
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
    }

    return {
        exampleCreate,
        exampleDetail,
        exampleUpdate,
        exampleDelete,
    }
}