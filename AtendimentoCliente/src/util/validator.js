let errors = [] //lista de validação de possíveis erros

function ValidationContract(){
    errors = [] 
}

// prototype : metodo do javascript para criar uma função
ValidationContract.prototype.isRequired = (value, message) => {
    if(!value || value.length <= 0){
        errors.push({message : message})
    }
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if(!value || value.length < min){
        errors.push({message : message})

    }
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if(!value || value.length > max) {
        errors.push({message : message})
    }
}

ValidationContract.prototype.hasExactLen = (value, len, message) => {
    if (!value || value.length != len) {
        errors.push({ message: message })
    }
}

ValidationContract.prototype.isValid = () => {
    console.log(errors.length)
    return errors.length == 0
}

ValidationContract.prototype.popError = () => {
    return errors.pop()
}

module.exports = ValidationContract