export default function checkPasswordStrength(password: string) {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password === ""){
        return ""
    }else{
        if (lengthCriteria && numberCriteria && lowercaseCriteria && uppercaseCriteria && specialCharacterCriteria) {
            return "Forte";
        } else if (lengthCriteria && (numberCriteria || lowercaseCriteria || uppercaseCriteria)) {
            return "Média";
        } else {
            return "Fraca";
        }
    }
}