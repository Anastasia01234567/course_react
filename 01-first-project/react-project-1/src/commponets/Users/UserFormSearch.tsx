
import React, { useEffect } from "react"
import { Formik, Field, Form } from 'formik';
import { UserFilterType } from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import { getUserFilter } from "../../redux/users-selectors";

const userSearchFormValidate = (values: any) =>
{
  const errors = {};
  return errors;

}
type FriendFormType = 'null' | 'true' | 'false';
type FormType = {
  term: string,
  friend: FriendFormType
};
type PropsType = {
  onFilterChanged: (filter: UserFilterType) => void
}
export const UserFormSearch: React.FC<PropsType> = React.memo((props) =>
{
  const filter = useSelector(getUserFilter)
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) =>
  {
    const filter: UserFilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    props.onFilterChanged(filter);
    setSubmitting(false);
  };



  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
        validate={userSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Oncly unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )

})
