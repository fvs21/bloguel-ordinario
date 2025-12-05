const validateCreateCommunityBody = (body: any): string | null => {
    if (!body) 
        return 'Request body is missing';

    if (!body.name || typeof body.name !== 'string') 
        return 'Invalid or missing community name';

    if (!body.title || typeof body.title !== 'string')
        return 'Invalid or missing community title';

    if (!body.description || typeof body.description !== 'string') 
        return 'Invalid or missing community description';

    return null;
}

export {
    validateCreateCommunityBody
};