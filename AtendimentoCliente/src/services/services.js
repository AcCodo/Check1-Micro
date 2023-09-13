const fetch = require('node-fetch')

exports.getPessoa = async (codigoPessoa) => {
    try {
        const response = await fetch('http://localhost:3002/pessoas/' + codigoPessoa)
        const json = await response.json()

        return json

    } catch (error) {
        return null
    }
}