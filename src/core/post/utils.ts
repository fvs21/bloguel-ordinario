const validateCreatePostData = (data: any): string | null => {
    if (!data.title || typeof data.title !== 'string') {
        return "Invalid or missing title";
    }
    if (!data.content || typeof data.content !== 'string') {
        return "Invalid or missing content";
    }
    return null;
}

export {
    validateCreatePostData
};