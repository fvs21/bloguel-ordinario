const validateCreateCommunityBody = (body: any): string | null => {
    if (!body) 
        return 'Request body is missing';

    if (!body.name || typeof body.name !== 'string') 
        return 'Invalid or missing community name';

    return null;
}

export {
    validateCreateCommunityBody
};