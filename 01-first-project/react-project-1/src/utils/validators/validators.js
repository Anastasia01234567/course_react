export const  require = (values) =>{
    if(!values) return "Field required";
    return undefined;
}

export  const CreatorMaxLength = (maxLength) => values =>{
    if(values.length > maxLength) return `Max length ${maxLength} symbols`;
    return undefined
}
