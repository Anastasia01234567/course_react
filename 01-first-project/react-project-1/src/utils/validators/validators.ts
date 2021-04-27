export type FieldValidatorType = (value: string)=> string|undefined;

export const  require:FieldValidatorType = (values)=>{
    if(!values) return "Field required";
    return undefined;
}

export  const CreatorMaxLength = (maxLength:number):FieldValidatorType => (values) =>{
    if(values.length > maxLength) return `Max length ${maxLength} symbols`;
    return undefined
}
