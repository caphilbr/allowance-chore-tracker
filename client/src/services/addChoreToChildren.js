const addChoreToChildren = (choreToAdd, children) => {
  const updatedChildren = children.map((child) => {
    if (child.id == choreToAdd.userId) {
      child.chores.push(choreToAdd)
    }
    return child
  })
  return updatedChildren
}

export default addChoreToChildren
