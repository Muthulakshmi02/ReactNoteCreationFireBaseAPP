export class validator {
    static minValidation(inputValue, min) {
        if (inputValue.length < min) {
            return `Please enter minimum ${min} characters`
        }
    }
    static maxValidation(inputValue, max) {
        if (inputValue.length > max) {
            return `Can't update maximum ${max} characters`
        }
    }
}