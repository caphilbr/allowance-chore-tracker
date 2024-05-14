class ChoreSerializer {

  static dashboard = async (child) => {
    const allowedFields = ["id", "name", "description", "amount", "dueDate"]
    const relatedChores = await child.$relatedQuery("chores")
    const serializedChores = relatedChores.map(chore => {
      const serializedChore = {}
      allowedFields.forEach(field => {
        serializedChore[field] = chore[field]
      })
      return serializedChore
    })
    return serializedChores
  }
}

export default ChoreSerializer