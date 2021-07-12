import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import userPhotos from "../../../assets/images/user.png";
import
  {
    createField,
    GetStringKeys,
    Input,
    Textarea
  } from "../../../common/FormControl/FormControl";
import { savePhotos, saveProfile } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { ContactsType, ProfileType } from "../../../types/types";
import Preloader from "../../Preloader/Preloader";
import ProfileStatusWithHook from "./ProfileStatusWithHook";

type Props = {
  // updateUserStatus: (status: string) => void
  isOwner: boolean
};

let ProfileInfo: React.FC<Props> = ({
  isOwner
}) =>
{
  const dispatch = useDispatch()
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)


  const [editMode, setEditMode] = useState(false);

  const onSubmit = (formData: ProfileType) =>
  {
    // TODO: remove then
    dispatch(saveProfile(formData))
    //   .then(() =>
    //   {
    //   setEditMode(false);
    // })
  };

  if (!profile)
  {
    return <Preloader />;
  }

  const onMainPhotosSelected = (event: ChangeEvent<HTMLInputElement>) =>
  {
    let files = event.target.files;
    if (files && files.length)
    {
      dispatch(savePhotos(files[0]))
    }
  };

  const goToEditMode = () =>
  {
    setEditMode(true);
  };

  return (
    <div>
      <img src={profile.photos?.large ?? userPhotos} alt="" />
      {isOwner && <input type="file" onChange={onMainPhotosSelected} />}
      <ProfileStatusWithHook/>
      {editMode ? (
        <PersonalDataFormRedux onSubmit={onSubmit} profile={profile} />
      ) : (
        <PersonalData
          profile={profile}
          isOwner={isOwner}
          goToEditMode={goToEditMode}
        />
      )}
    </div>
  );
};
export default ProfileInfo;

type ContactTypeProps = {
  contactTitle: string;
  contactValue: string | null;
};
const Contacts: React.FC<ContactTypeProps> = ({
  contactTitle,
  contactValue,
}) =>
{
  return (
    <div>
      <b>{contactTitle}</b>
      {contactValue}
    </div>
  );
};
type PersonalDataType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};
const PersonalData: React.FC<PersonalDataType> = ({
  profile,
  isOwner,
  goToEditMode,
}) =>
{
  return (
    <div>
      {isOwner && <button onClick={goToEditMode}>Edit</button>}
      <div>
        <b>full Name</b>
        {profile.fullName}
      </div>
      <div>
        <b>about Me</b> {profile.aboutMe}
      </div>
      <div className="">
        <b>lookingForAJob </b>- {profile.lookingForAJob}
      </div>
      <div className="">
        <b>lookingForAJobDescription</b> - {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) =>
        {
          return (
            <Contacts
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
    </div>
  );
};

type PersonalFormownerProps = {
  profile: ProfileType;
};
type PersonalFormFieldKeys = GetStringKeys<ProfileType>;
const PersonalDataForm: React.FC<
  InjectedFormProps<ProfileType, PersonalFormownerProps> &
  PersonalFormownerProps
> = ({ profile, handleSubmit, error }) =>
{
  return (
    <form action="" onSubmit={handleSubmit}>
      <button type="submit">Save</button>
      <div>
        <b>full Name</b>
        {createField<PersonalFormFieldKeys>(
          "Full name",
          "fullName",
          Input,
          [],
          {
            type: "text",
          }
        )}
      </div>
      <div>
        <b>about Me</b>{" "}
        {createField<PersonalFormFieldKeys>(
          "About me",
          "aboutMe",
          Textarea,
          [],
          {
            value: profile.aboutMe,
          }
        )}
      </div>
      <div className="">
        <b>lookingForAJob </b>
        {createField<PersonalFormFieldKeys>(
          undefined,
          "lookingForAJob",
          Input,
          [],
          {
            type: "checkbox",
          }
        )}
      </div>
      <div className="">
        <b>lookingForAJobDescription</b> -{" "}
        {createField<PersonalFormFieldKeys>(
          undefined,
          "lookingForAJobDescription",
          Textarea,
          []
        )}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) =>
        {
          return (
            <div key={key}>
              <b>{key}</b>
              // TODO: create some solutuion for embedded object
              {createField(undefined, `contacts[${key}']`, Input, [])}
            </div>
          );
        })}
      </div>

      {error && <div>{error}</div>}
    </form>
  );
};

const PersonalDataFormRedux = reduxForm<ProfileType, PersonalFormownerProps>({
  form: "edit-profile",
})(PersonalDataForm);

