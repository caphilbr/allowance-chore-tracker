const editChoreWithinChildren = (choreToEdit, children) => {
  const updatedChildren = children.map(child => {
    if (child.id == choreToEdit.userId) {
      const updatedChores = child.chores.map(chore => {
        if (chore.id == choreToEdit.id) {
          return choreToEdit
        }
        return chore
      })
      child.chores = updatedChores
    }
    return child
  })
  return updatedChildren
}

export default editChoreWithinChildren