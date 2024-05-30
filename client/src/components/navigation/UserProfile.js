import React, { useState, useEffect } from "react"
import TopBar from "./TopBar"
import ProfilePhoto from "./ProfilePhoto"
import patchUser from "../../services/fetch/patchUser"
import ErrorList from "../utilities/ErrorList"
import FormError from "../utilities/FormError"
import config from "../../config"
import getFamily from "../../services/fetch/getFamily"
import patchFamilyName from "../../services/fetch/patchFamilyName"

const UserProfile = (props) => {
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [showEditNickname, setShowEditNickname] = useState(false)
  const [showEditEmail, setShowEditEmail] = useState(false)
  const [showEditFamily, setShowEditFamily] = useState(false)
  const [userPayload, setUserPayload] = useState({
    nickname: props.user.nickname,
    email: props.user.email,
    familyName: ""
  })

  useEffect(() => {
    const fetchedData = async () => {
      const response = await getFamily()
      setUserPayload({
        ...userPayload,
        familyName: response.name
      })
    }
    fetchedData()
  }, [])

  const validateInput = (payload) => {
    setErrors({})
    setServerErrors({})
    const { email, nickname, familyName } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "Email is invalid",
      }
    }
    if (nickname.trim() == "") {
      newErrors = {
        ...newErrors,
        nickname: "Nickname is required",
      }
    }
    if (familyName.trim() == "") {
      newErrors = {
        ...newErrors,
        nickname: "Family name is required",
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const fetchHandling = async () => {
    const userPayloadToSend = {
      nickname: userPayload.nickname,
      email: userPayload.email
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
    const response = await patchFamilyName({ familyName: userPayload.familyName })
    if (response.ok) {
      const editedFamilyName = response.body
      setUserPayload({
        ...userPayload,
        familyName: editedFamilyName
      })
    } else if (response.status == 422) {
      setServerErrors(response.error)
    } else {
      location.href = "/profile"
    }
  }

  const handleNicknameChange = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      await fetchHandling()
      setShowEditNickname(false)
    }
  }

  const handleEmailChange = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      await fetchHandling()
      setShowEditEmail(false)
    }
  }

  const handleFamilyChange = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      await fetchFamilyHandling()
      setShowEditFamily(false)
    }
  }

  const handleNicknameClick = () => {
    setShowEditNickname(true)
    setShowEditEmail(false)
    setShowEditFamily(false)
  }

  const handleEmailClick = () => {
    setShowEditEmail(true)
    setShowEditNickname(false)
    setShowEditFamily(false)
  }

  const handleFamilyClick = () => {
    setShowEditFamily(true)
    setShowEditNickname(false)
    setShowEditEmail(false)
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  return (
    <>
      <TopBar user={props.user} />
      <div className="background-color grid-x grid-margin-x grid-padding-x align-center profile-page">
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
                <td className="profile-category">Nickname</td>
                {showEditNickname ? (
                  <td colSpan="2">
                    <form onSubmit={handleNicknameChange}>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name="nickname"
                                value={userPayload.nickname}
                                onChange={onInputChange}
                              />
                              <FormError error={errors.nickname} />
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
                  </td>
                ) : (
                  <>
                    <td>{userPayload.nickname}</td>
                    <td>
                      <span
                        className="button-styling-small"
                        onClick={handleNicknameClick}
                      >
                        Edit
                      </span>
                    </td>
                  </>
                )}
              </tr>
              <tr>
                <td className="profile-category">Email</td>
                {showEditEmail ? (
                  <td colSpan="2">
                    <form onSubmit={handleEmailChange}>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name="email"
                                value={userPayload.email}
                                onChange={onInputChange}
                              />
                              <FormError error={errors.email} />
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
                  </td>
                ) : (
                  <>
                    <td>{userPayload.email}</td>
                    <td>
                      <span
                        className="button-styling-small"
                        onClick={handleEmailClick}
                      >
                        Edit
                      </span>
                    </td>
                  </>
                )}
              </tr>
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
              <tr>
                <td className="profile-category">Family Name</td>
                {showEditFamily ? (
                  <td colSpan="2">
                    <form onSubmit={handleFamilyChange}>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name="familyName"
                                value={userPayload.familyName}
                                onChange={onInputChange}
                              />
                              <FormError error={errors.familyName} />
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
                  </td>
                ) : (
                  <>
                    <td>{userPayload.familyName}</td>
                    <td>
                      {props.user.isParent ?
                        <span
                          className="button-styling-small"
                          onClick={handleFamilyClick}
                        >
                          Edit
                        </span>
                      :
                        null
                      }
                    </td>
                  </>
                )}            
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UserProfile
