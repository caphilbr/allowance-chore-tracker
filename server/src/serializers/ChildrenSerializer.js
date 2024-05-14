class ChildrenSerializer {

  static parentDashboardList = (children) => {
    const allowedFields = ["id", "name", "imageUrl"]
    const serializedChildren = children.map(child => {
      const serializedChild = {}
      allowedFields.forEach(field => {
        serializedChild[field] = child[field]
      })
      return serializedChild
    })
    return serializedChildren
  }
}

export default ChildrenSerializer