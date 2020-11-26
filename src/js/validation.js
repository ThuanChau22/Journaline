const username_min_length = 2;
const username_max_length = 20;
const password_min_length = 8;

export function validateUserName(userName) {
    if (userName === "") return "Username field cannot be empty\n";
    if (/[^a-zA-Z0-9]/.test(userName)) return "Username must contain only letters and numbers\n";
    if (!/^[a-zA-Z]/.test(userName)) return "Username must contain a letter as first character\n";
    if (userName.length < username_min_length) return "Username must contain at least " + username_min_length + " characters\n";
    if (userName.length > username_max_length) return "Username must not contain more than " + username_max_length + " characters\n";
    return "";
}

export function validateEmail(email) {
    if (email === "") return "Email address field cannot be empty\n";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address\n";
    return "";
}

export function validatePassword(password) {
    if (password === "") return "Passwords field cannot be empty\n";
    if (!/[a-z]/.test(password)) return "Passwords must contain at least a lowercase letter\n";
    if (!/[A-Z]/.test(password)) return "Passwords must contain at least an uppercase letter\n";
    if (!/[0-9]/.test(password)) return "Passwords must contain at least a number\n";
    if (password.length < password_min_length) return "Passwords must be at least " + password_min_length + " characters\n";
    return "";
}

export function validateRePassword(password, rePassword) {
    if (rePassword === "") return "Re-enter passwords field cannot be empty\n";
    if (password !== rePassword) return "Passwords are not matched\n";
    return "";
}

