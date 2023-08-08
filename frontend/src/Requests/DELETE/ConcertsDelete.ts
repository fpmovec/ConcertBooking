export const DeleteConcert = async (id: number) => {
   await fetch(`https://localhost:7235/concerts/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    }
   })
}