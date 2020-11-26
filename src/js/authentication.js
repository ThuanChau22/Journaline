import { Auth } from 'aws-amplify';

export async function signUp(username, email, password) {
    try {
        await Auth.signUp({
            username, password, attributes: { email }
        });
        return "";
    } catch (error) {
        return error.message;
    }
}

export async function confirmSignUp(username, code) {
    try {
        await Auth.confirmSignUp(username, code);
        return "";
    } catch (error) {
        return error.message;
    }
}

export async function resendConfirmationCode(username) {
    try {
        await Auth.resendSignUp(username);
        return "Confirmation code resent"
    } catch (error) {
        return error.message;
    }
}

export async function signIn(username, password) {
    try {
        await Auth.signIn(username, password);
        return "";
    } catch (error) {
        return error.message;
    }
}

export async function checkUser() {
    try {
        await Auth.currentSession();
        return "";
    } catch (error) {
        return error.message;
    }
}

export async function signOut() {
    try {
        await Auth.signOut();
        return "";
    } catch (error) {
        return error.message;
    }
}