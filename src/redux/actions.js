export const LOAD_USER = "LOAD_USER";
export const LOAD_CANVAS = "LOAD_CANVAS";
export const MOVE_STENCIL = "MOVE_STENCIL";
export const RESIZE_STENCIL = "RESIZE_STENCIL";
export const SET_FOCUS = "SET_FOCUS";
export const EDIT_STENCIL = "EDIT_STENCIL";
export const CREATE_STENCIL = "CREATE_STENCIL";
export const CREATE_WORD_STENCIL = "CREATE_WORD_STENCIL";
export const CHANGE_NAME = "CHANGE_NAME";

export const loadUser = (email, uuid) => {
  return {
    type: LOAD_USER,
    email: email,
    uuid: uuid
  };
};

export const loadCanvas = canvas => {
  return {
    type: LOAD_CANVAS,
    canvas: canvas
  };
};

export const moveStencil = (id, newX, newY) => {
  return {
    type: MOVE_STENCIL,
    id: id,
    newX: newX,
    newY: newY
  };
};

export const resizeStencil = (id, newX, newY, newWidth, newHeight) => {
  return {
    type: RESIZE_STENCIL,
    id: id,
    newX: newX,
    newY: newY,
    newWidth: newWidth,
    newHeight: newHeight
  };
};

export const setFocus = id => {
  return {
    type: SET_FOCUS,
    id: id
  };
};

export const editStencil = (
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius
) => {
  return {
    type: EDIT_STENCIL,
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderWidth: borderWidth,
    borderRadius: borderRadius
  };
};

export const createStencil = () => {
  return {
    type: CREATE_STENCIL
  };
};

export const createWordStencil = () => {
  return {
    type: CREATE_WORD_STENCIL
  };
};

export const changeName = newName => {
  return {
    type: CHANGE_NAME,
    newName: newName
  };
};
