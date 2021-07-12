import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import
  {
    getUsersProfile,
    getUserStatus
  } from "../../redux/profile-reducer";
import { AppStateType } from "../../redux/redux-store";
import Profile from "./Profile";

type PathParamsType = {
  userId: string,
}
// type PropsRouterType = RouteComponentProps<PathParamsType>;
// type PropsType = MapStateToPropsType & MapDispatchPropsType & PropsRouterType;

const ProfilePage: React.FC = (props) =>
{
  const dispatch = useDispatch();
  let { userId }: PathParamsType = useParams();
  let history = useHistory();
  const autoritetId = useSelector((state: AppStateType) => state.auth.id);
  const refreshProfile = () =>
  {
    let ID: number | null = +userId;
    if (!ID)
    {
      ID = autoritetId;
      if (!ID)
      {
        history.push("/login");
      }
    }
    if (!ID) console.error('ID should exists in URI params is state (autoritetId)')
    else
    {
      dispatch(getUsersProfile(ID))
      dispatch(getUserStatus(ID))
    }
  }
  useEffect(() =>
  {
    refreshProfile();
  }, [userId]);
  return (
    <>
      <Profile  isOwner={!userId} />
    </>
  )
}

const ProfileContainer = withAuthRedirect(ProfilePage);
export default ProfileContainer;



