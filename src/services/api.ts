export async function fetchData<T>(url: string): Promise<T>{
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if(Math.random() < 0.1){
                reject(new Error("Erro simulado na API"));
            }else{
                fetch(url)
                    .then(res => {
                        if(!res.ok) throw new Error("Erro ao carregar dados");
                        return res.json();
                    })
                    .then(data => resolve(data))
                    .catch(err => reject(err));
            }
        }, 800);
    }); 
}