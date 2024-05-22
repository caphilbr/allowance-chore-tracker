const removeChoreFromChildren = (choreToRemove, children) => {
  const updatedChildren = children.filter(child => {
    if (child.id == choreToRemove.userId) {
      child.chores = child.chores.filter(chore => {
        return chore.id != choreToRemove.id
      })
    }
    return child
  })
  return updatedChildren
}

export default removeChoreFromChildren