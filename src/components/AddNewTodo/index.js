/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import {
  Input,
  makeStyles,
  TextareaAutosize,
  Button,
  Typography
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Modal from 'components/Modal';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: { margin: '5px 0px' }
});

const AddNewTodoModal = ({
  open,
  handleClose,
  createTodo,
  todo,
  updateTodo,
  edit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm({
    defaultValues: {
      title: todo?.title,
      description: todo?.description,
      dueDate: todo?.dueDate,
      id: todo?.id
    }
  });
  const classes = useStyles();

  const onSubmit = useCallback(
    async data => {
      try {
        if (edit) {
          await updateTodo(data);
        } else {
          await createTodo(data);
        }
        handleClose();
        reset();
      } catch (e) {
        console.log(e);
      }
    },
    [createTodo, edit, handleClose, reset, updateTodo]
  );

  return (
    <Modal open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form}>
          <Input
            {...register('title', {
              required: true
            })}
            aria-label="title"
            placeholder="title"
            className={classes.input}
            defaultValue={todo?.title}
            onChange={e =>
              setValue('title', e.target.value)
            }
          />
          {errors.title && (
            <Typography color="error">
              Title is required
            </Typography>
          )}

          <TextareaAutosize
            {...register('description', {
              required: true
            })}
            aria-label="description"
            placeholder="description"
            minRows={3}
            className={classes.input}
          />
          {errors.description && (
            <Typography color="error">
              Description is required
            </Typography>
          )}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              name="dueDate"
              control={control}
              defaultValue={todo?.dueDate || new Date()}
              rules={{ required: true }}
              render={({ field: { ref, ...rest } }) => (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  disablePast
                  initialFocusedDate={Date.now()}
                  KeyboardButtonProps={{
                    'aria-label': 'change end date'
                  }}
                  invalidDateMessage="End date is required"
                  {...rest}
                />
              )}
            />
          </MuiPickersUtilsProvider>
          {errors.dueDate && (
            <Typography color="error">
              Due date is required
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

AddNewTodoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  createTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  todo: PropTypes.object,
  edit: PropTypes.bool
};

AddNewTodoModal.defaultProps = {
  todo: {},
  createTodo: () => {},
  updateTodo: () => {},
  edit: false
};

export default AddNewTodoModal;
