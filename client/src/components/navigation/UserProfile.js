import React, { useState, useEffect } from "react"
import TopBar from "./TopBar"
import ProfilePhoto from "./ProfilePhoto"
import patchUser from "../../services/fetch/patchUser"
import ErrorList from "../utilities/ErrorList"
import FormError from "../utilities/FormError"
import config from "../../config"
import getFamily from "../../services/fetch/getFamily"
import patchFamilyName from "../../services/fetch/patchFamilyName"
import AddParent from "../parents/AddParent"

const UserProfile = (props) => {
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [showEdit, setShowEdit] = useState({
    nickname: false,
    email: false,
    familyName: false,
    parent: false,
  })
  const [userPayload, setUserPayload] = useState({
    nickname: props.user.nickname,
    email: props.user.email,
    familyName: "",
  })
  const [spouse, setSpouse] = useState([])
  const [emailStatus, setEmailStatus] = useState({
    status: "",
    code: "",
  })

  useEffect(() => {
    const fetchedData = async () => {
      const response = await getFamily()
      setUserPayload({
        ...userPayload,
        familyName: response.name,
      })
      const fetchedSpouse = response.parents.filter(
        (parent) => parent.id != props.user.id,
      )
      setSpouse(fetchedSpouse)
    }
    fetchedData()
  }, [])

  const validateInput = (payload) => {
    setErrors({})
    setServerErrors({})
    const { email, nickname, familyName } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) newErrors.email = "Email is invalid"
    if (nickname.trim() == "") newErrors.nickname = "Nickname is required"
    if (familyName.trim() == "")
      newErrors.familyName = "Family name is required"
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const fetchHandling = async () => {
    const userPayloadToSend = {
      nickname: userPayload.nickname,
      email: userPayload.email,
    }
    const response = await patchUser(userPayloadToSend)
    if (response.ok) {
      const editedUser = response.body
      props.setCurrentUser(editedUser)
    } else if (response.status == 422) {
      setServerErrors(response.error)
    } else {
      location.href = "/profile"
    }
  }

  const fetchFamilyHandling = async () => {
    const response = await patchFamilyName({
      familyName: userPayload.familyName,
    })
    if (response.ok) {
      const editedFamilyName = response.body
      setUserPayload({
        ...userPayload,
        familyName: editedFamilyName,
      })
    } else if (response.status == 422) {
      setServerErrors(response.error)
    } else {
      location.href = "/profile"
    }
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const fieldToChange = event.currentTarget.getAttribute("name")
    if (validateInput(userPayload)) {
      if (fieldToChange == "familyName") {
        await fetchFamilyHandling()
      } else {
        await fetchHandling()
      }
      setShowEdit({
        ...showEdit,
        [fieldToChange]: false,
      })
    }
  }

  const handleEditClick = (event) => {
    const clickedField = event.currentTarget.getAttribute("name")
    const newValue = !showEdit[clickedField]
    setShowEdit((prevShowEdit) => {
      const newShowEdit = {}
      for (const key of Object.keys(prevShowEdit)) {
        newShowEdit[key] = key == clickedField ? newValue : false
      }
      return newShowEdit
    })
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const renderForm = (fieldName) => (
    <form onSubmit={handleEditSubmit} name={fieldName}>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name={fieldName}
                value={userPayload[fieldName]}
                onChange={onInputChange}
              />
              <FormError error={errors[fieldName]} />
            </td>
            <td>
              <input
                type="submit"
                className="button-styling-small"
                value="Submit"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )

  return (
    <>
      <TopBar user={props.user} />
      <div className="background-color grid-x grid-margin-x grid-padding-x align-center profile-page">
        {showEdit.parent ? (
          <AddParent
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            setEmailStatus={setEmailStatus}
          />
        ) : null}
        <div className="cell small-12 medium-6 large-3 profile-pic-containter">
          <ProfilePhoto
            user={props.user}
            setCurrentUser={props.setCurrentUser}
          />
        </div>
        <div className="cell small-12 large-8 profile-page-details">
          <ErrorList errors={serverErrors} />
          <table>
            <tbody>
              <tr>
                <td className="profile-category">Account Type</td>
                <td>{props.user.isParent ? "Parent" : "Child"}</td>
                <td></td>
              </tr>
              <tr>
                <td className="profile-category">Username</td>
                <td>{props.user.username}</td>
                <td></td>
              </tr>
              {props.user.isParent && spouse.length > 0 ? (
                <tr>
                  <td className="profile-category">Other Parent</td>
                  <td>{spouse[0].nickname}</td>
                  <td></td>
                </tr>
              ) : props.user.isParent ? (
                <tr>
                  <td className="profile-category">Other Parent</td>
                  <td>{`<No other parent>`}</td>
                  <td>
                    <span
                      className="button-styling-small"
                      name="parent"
                      onClick={handleEditClick}
                    >
                      Add
                    </span>
                  </td>
                </tr>
              ) : null}
              {[
                ["Nickname", "nickname"],
                ["Email", "email"],
                ["Family Name", "familyName"],
              ].map((field) => {
                return (
                  <tr key={field[1]}>
                    <td className="profile-category">{field[0]}</td>
                    {showEdit[field[1]] ? (
                      <td colSpan="2">{renderForm(field[1])}</td>
                    ) : (
                      <>
                        <td>{userPayload[field[1]]}</td>
                        <td>
                          {!props.user.isParent &&
                          field[1] == "familyName" ? null : (
                            <span
                              className="button-styling-small"
                              name={field[1]}
                              onClick={handleEditClick}
                            >
                              Edit
                            </span>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
          {emailStatus.status === "success" && (
            <span className="email-message">
              Email invite successfully sent! The registration code is:{" "}
              {emailStatus.code}
            </span>
          )}
          {emailStatus.status === "error" && (
            <span className="email-message">ERROR in sending email invite</span>
          )}
        </div>
      </div>
    </>
  )
}

export default UserProfile