class ChoreSerializer {

  static dashboard = async (child) => {
    const allowedFields = ["id", "name", "description", "amount", "dueDate", "status", "isComplete", "userId"]
    const relatedChores = await child.$relatedQuery("chores")
    if (relatedChores) {
      const serializedChores = relatedChores.map(chore => {
        const serializedChore = {}
        allowedFields.forEach(field => {
          serializedChore[field] = chore[field]
        })
        return serializedChore
      })
      const filteredSerializedChores = serializedChores.filter(chore => {
        return !chore.isComplete
      })
      return filteredSerializedChores
    }
    return []
  }
}

export default ChoreSerializer