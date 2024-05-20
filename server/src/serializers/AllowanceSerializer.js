import showDate from "../services/showDate.js"

class AllowanceSerializer {
  static forManageAllowance(allowanceObject) {
      const allowedFields = ["id", "amount", "firstDate", "lastDate", "frequency", "userId", "familyId"]
      const serializedAllowance = {}
      allowedFields.forEach(field => {
        if (field == "firstDate" || field == "lastDate") {
          serializedAllowance[field] = showDate(allowanceObject[field])
        } else {
          serializedAllowance[field] = allowanceObject[field]
        }
      })
    return serializedAllowance
  }
}

export default AllowanceSerializer