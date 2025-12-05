const validateUpdateProfile = (data: any): string | null => {
    if (!data)
        return "Data is required";

    if (!data.bio)
        return "Bio is required";

    if (typeof data.bio !== 'string')
        return "Bio must be a string";

    if (data.birthdate && isNaN(Date.parse(data.birthdate)))
        return "Birthdate must be a valid date";

    if (data.major && typeof data.major !== 'string')
        return "Major must be a string";

    if (data.semester && (typeof data.semester !== 'number' || data.semester < 1))
        return "Semester must be a positive number";

    return null;
}

export { validateUpdateProfile };