import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { API } from "../utils";

function Profile({ token }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(API + 'users/me/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(e => console.error('error fetching profile', e))
  }, [token])
  return (
    <div className="profile-page">
      <div className="bio-page">
        <img src={user.profile_pic} id="profile-icon"/>
        <div>
          <p id="first-name">{user.first_name} {user.last_name}</p>
          <p>@{user.username}</p>
          <p>Joined {new Date(user.date_joined).toDateString()}</p>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-headings">
          <div>
            <p>Posts</p>
          </div>
          <div>
            <p>Bookmarks</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile