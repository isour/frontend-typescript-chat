import React, { useEffect, useRef } from 'react';
import {
  Formik, Field, ErrorMessage, Form as FormikForm,
} from 'formik';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import { actions } from '../slices/index.js';
import getValidation from '../logic/validationRules.js';
import useApi from '../hooks/useApi.js';
import '../styles/channel-add.css';
import { getChannelsList } from '../selectors/index.js';

const channelValidation = (channels) => getValidation(['channel'], { channels });

function ChannelAdd(props) {
  const dispatch = useDispatch();
  const api = useApi();
  const { onHide } = props;
  const channels = useSelector(getChannelsList);
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const createChannel = (values, { setStatus, setSubmitting }) => {
    setStatus();
    setSubmitting(true);
    const channel = {
      name: leoProfanity.clean(values.channel),
    };
    api.createChannel(
      channel,
      (result) => {
        setSubmitting(false);
        onHide();
        dispatch(actions.setChannel(result[0].data));
        toast.success(t('channels.created'));
      },
      (error) => {
        rollbar.error(error);
        setSubmitting(false);
      },
    );
  };

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const getChannelClassNames = (formik) => classNames(
    { 'ChannelAdd-channel__content': true },
    { 'form-text': true },
    { 'form-text_error': Object.keys(formik.errors).length !== 0 },
  );

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channel: '' }}
          validationSchema={() => channelValidation(channels)}
          validateOnBlur={false}
          onSubmit={createChannel}
        >
          {(formik) => (
            <FormikForm className="add-channel">
              <div className="add-channel__content">
                <label className="form-field__label" htmlFor="channel">
                  {t('modals.channelName')}
                </label>
                <Field
                  type="text"
                  name="channel"
                  id="channel"
                  validate={formik.errors.channel}
                  value={formik.values.channel}
                  onChange={formik.handleChange}
                  className={getChannelClassNames(formik, 'channel')}
                  innerRef={inputEl}
                />
                <ErrorMessage
                  name="channel"
                  render={(msg) => (
                    <div className="form-error add-channel__error">{t(msg)}</div>
                  )}
                />
              </div>
              <div className="add-channel__footer">
                <button
                  className="button button_secondary"
                  type="button"
                  disabled={formik.isSubmitting}
                  onClick={onHide}
                >
                  {t('modals.cancel')}
                </button>
                <button
                  className="button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('modals.submit')}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ChannelAdd;
