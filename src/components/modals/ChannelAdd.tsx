import React, { useEffect, useRef } from 'react';
import {
  Formik, Field, ErrorMessage, Form as FormikForm, FormikHelpers, FormikProps,
} from 'formik';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import { actions } from '../../store/index';
import getValidation from '../../logic/validationRules';
import useApi from '../../hooks/useApi';
import getChannelsNames from '../../selectors/index.js';
import '../../styles/channel-add.css';

interface IProps {
  readonly onHide: () => void;
}

interface IFormValues {
  readonly channel: string;
}

const channelValidation = (channels: readonly IChannel[]) => getValidation(['channel'], { channels });

const ChannelAdd: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const api = useApi();
  const { onHide } = props;
  const channels = getChannelsNames();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const createChannel = (
    values: IFormValues,
    { setStatus, setSubmitting }: FormikHelpers<IFormValues>,
  ) => {
    setStatus();
    setSubmitting(true);
    const channel = {
      name: leoProfanity.clean(values.channel),
    };
    api.createChannel(
      channel,
      (result: any) => {
        setSubmitting(false);
        onHide();
        dispatch(actions.setChannel(result[0].data));
        toast.success(t('channels.created'));
      },
      (error: any) => {
        toast.error(error);
        rollbar.error(error);
        setSubmitting(false);
      },
    );
  };

  const inputEl = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const getChannelClassNames = (formik: Readonly<FormikProps<IFormValues>>) => classNames(
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
                  className={getChannelClassNames(formik)}
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
};

export default ChannelAdd;
