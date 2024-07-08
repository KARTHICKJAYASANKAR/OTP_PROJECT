export default function validateEmailAndPassword(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let result = {
        emailValid: true,
        passwordValid: true,
        message: "Validation successful"
    };

    if (!emailRegex.test(email)) {
        result.emailValid = false;
        result.message = "Invalid email format.";
    }

    if (!passwordRegex.test(password)) {
        result.passwordValid = false;
        if (result.message !== "Validation successful") {
            result.message += " ";
        } else {
            result.message = "";
        }
        result.message += "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    return result.message;
}