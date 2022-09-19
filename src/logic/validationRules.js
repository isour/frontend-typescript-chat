import * as Yup from 'yup';

const validationRules = (type, vars) => {
  /* eslint-disable functional/no-let */
  let rooms = [];
  if (vars) {
    rooms = vars.rooms;
  }

  const yupRules = {
    message: Yup.string()
      .min(3, 'chat.min')
      .max(20, 'chat.max')
      .required('chat.required'),
    username: Yup.string()
      .min(3, 'signup.usernameConstraints')
      .max(40, 'signup.usernameConstraints')
      .required('signup.usernameEnter'),
    password: Yup.string()
      .min(5, 'signup.passMin')
      .required('signup.passRequired'),
    password2: Yup.string().test(
      'signup.confirmPassword',
      'signup.mustMatch',
      (value, context) => value === context.parent.password,
    ),
    room: Yup.string()
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .required('modals.required')
      .notOneOf(rooms, 'modals.uniq'),
  };

  return yupRules[type];
};

const getValidation = (types, vars = null) => {
  const typesList = types.reduce(
    (acc, type) => ({
      ...acc,
      ...{ [type]: validationRules(type, vars) },
    }),
    {},
  );
  return Yup.object().shape(typesList);
};

export default getValidation;
