function ErrorMessage({error} : {error: string}){
    return <p style = {{color: "red"}}>Erro: {error}</p>;
}

export default ErrorMessage;