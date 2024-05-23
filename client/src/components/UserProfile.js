import React, { useState } from "react";
import TopBar from "./layout/TopBar";
import ProfilePhoto from "./ProfilePhoto";
import patchUser from "../services/patchUser";
import ErrorList from "./layout/ErrorList"
import FormError from "./layout/FormError"
import config from "../config";

const UserProfile = (props) => {

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [showEditNickname, setShowEditNickname] = useState(false)
  const [showEditEmail, setShowEditEmail] = useState(false)
  const [userPayload, setUserPayload] = useState({
    nickname: props.user.nickname,
    email: props.user.email
  })

  const validateInput = (payload) => {
    setErrors({});
    setServerErrors({});
    const { email, nickname } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "Email is invalid",
      };
    }
    if (nickname.trim() == "") {
      console.log('in the if')
      newErrors = {
        ...newErrors,
        nickname: "Nickname is required",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const fetchHandling = async () => {
    try {
      const response = await patchUser(userPayload)
      console.log('rsponse ', response)
      if (!response.ok) {
        if (response.status === 422) {
          setServerErrors(response.error)
        } else {
          const errorMessage = `${response.status} (${response.error.message})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const editedUser = response.body
        props.setCurrentUser(editedUser)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
      location.href = "/profile"
    }
  }
  
  const handleNicknameChange = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)){
      await fetchHandling()
      setShowEditNickname(false)
    }
  }

  const handleEmailChange = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)){
      await fetchHandling()
      setShowEditEmail(false)
    }
  }

  const handleNicknameClick = () => {
    setShowEditNickname(true)
    setShowEditEmail(false)
  }

  const handleEmailClick = () => {
    setShowEditEmail(true)
    setShowEditNickname(false)
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <>
      <TopBar user={props.user} />
      <div className="background-color grid-x grid-margin-x grid-padding-x align-center profile-page">
        <div className="cell small-12 medium-6 large-3 profile-pic-containter">
          <ProfilePhoto user={props.user} setCurrentUser={props.setCurrentUser} />
        </div>
        <div className="cell small-12 large-8 profile-page-details">       
          <ErrorList errors={serverErrors} />
          <table>
            <tbody>
              <tr>
                <td className="profile-category">Nickname</td>
                {showEditNickname ?
                  <td colSpan="2">
                    <form onSubmit={handleNicknameChange}>
                      <table><tbody><tr>
                          <td>
                            <input type="text" name="nickname" value={userPayload.nickname} onChange={onInputChange}/>
                            <FormError error={errors.nickname} />
                          </td>
                          <td>
                            <input type="submit" className="button-styling-small" value="Submit"/>
                          </td>
                        </tr></tbody></table>
                    </form>
                  </td>
                :
                  <>
                    <td>{userPayload.nickname}</td>
                    <td><span className="button-styling-small" onClick={handleNicknameClick}>Edit</span></td>
                  </>
                }
              </tr>
              <tr>
                <td className="profile-category">Email</td>
                {showEditEmail ?
                  <td colSpan="2">
                    <form onSubmit={handleEmailChange}>
                      <table><tbody><tr>
                          <td>
                            <input type="text" name="email" value={userPayload.email} onChange={onInputChange}/>
                            <FormError error={errors.email} />
                          </td>
                          <td>
                            <input type="submit" className="button-styling-small" value="Submit"/>
                          </td>
                        </tr></tbody></table>
                    </form>
                  </td>
                :
                  <>
                    <td>{userPayload.email}</td>
                    <td><span className="button-styling-small" onClick={handleEmailClick}>Edit</span></td>
                  </>
                }
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
