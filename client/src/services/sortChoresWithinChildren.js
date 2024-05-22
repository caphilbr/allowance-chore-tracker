const sortChoresWithinChildren = (childrenList) => {

  const childrenWithSortedChores = childrenList.map(child => {
    
    const sortedChoresByDueDate = child.chores.sort((a, b) => {
    if (new Date(a.dueDate) < new Date(b.dueDate)) {
      return -1
    } else if (new Date(a.dueDate) > new Date(b.dueDate)) {
      return 1
    }
    return 0
    })
    
    const sortedChoredByStatus = sortedChoresByDueDate.sort((a, b) => {
      if (a.status == "pending" && b.status != "pending") {
        return -1
      } else if (b.status == "pending" && a.status != "pending") {
        return 1
      }
      return 0
    })
    
    child.chores = sortedChoredByStatus
    return child
  })

  return childrenWithSortedChores
}

export default sortChoresWithinChildren