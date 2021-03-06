export function signInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { email, password }
    };
}

export function signInSuccess(token, user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { token, user }
    };
}

export function signUpRequest(name, email, password, cpf, cep, number, complement, public_place, neighborhood, city, state, phone) {
    return {
        type: '@auth/SIGN_UP_REQUEST',
        payload: { name, email, password, cpf, cep, number, complement, public_place, neighborhood, city, state, phone }
    };
}

export function signFailure(error) {
    return {
        type: '@auth/SIGN_FAILURE',
        payload: { error }
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT'
    };
}