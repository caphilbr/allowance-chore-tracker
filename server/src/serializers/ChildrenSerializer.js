import ChoreSerializer from "./ChoreSerializer.js"

class ChildrenSerializer {

  static parentDashboardList = async (children) => {
    const allowedFields = ["id", "nickname", "chores", "imageUrl"]
    const serializedChildren = await Promise.all(children.map(async child => {
      const serializedChild = {}
      allowedFields.forEach(field => {
        serializedChild[field] = child[field]
      })
      serializedChild.chores = await ChoreSerializer.dashboard(child)
      return serializedChild
    }))
    return serializedChildren
  }
}

export default ChildrenSerializer