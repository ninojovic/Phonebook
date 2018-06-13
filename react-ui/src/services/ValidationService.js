export default class ValidationService {
    static validateName = (name) => {
        if(name){
            return name[0] === name[0].toUpperCase();
        }
        return false;
    }

    static validateNumber = (number) => {
        return number == parseInt(number)
    }
}