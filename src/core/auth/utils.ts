export function validateRegistrationBody(body: any): string | null {
    if (!body) {
        return 'Request body is missing';
    }
    
    if (!body.username || typeof body.username !== 'string') {
        return 'Invalid or missing username';
    }

    if (!body.name || typeof body.name !== 'string') {
        return 'Invalid or missing name';
    }

    if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
        return 'Invalid or missing email';
    }

    if (!body.password || typeof body.password !== 'string' || body.password.length < 6) {
        return 'Invalid or missing password. Password must be at least 6 characters long.';
    }

    return null;
}

export function validateLoginBody(body: any): string | null {
    if (!body.username || typeof body.username !== 'string') {
        return 'Invalid or missing username';
    }

    if (!body.password || typeof body.password !== 'string') {
        return 'Invalid or missing password';
    }
    
    return null;
}