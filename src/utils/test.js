export const FormSubmissionHandle = (...params) => {

  

  let error = {};
  params.forEach(ref=>{
    error[ref.current.name] = null
    if(!ref.current.value){
      error[ref.current.name] = `is required`
    }
  })
  return error;
}