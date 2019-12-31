import {
  MOVE_STENCIL,
  RESIZE_STENCIL,
  SET_FOCUS,
  EDIT_STENCIL,
  CREATE_STENCIL,
  LOAD_CANVAS,
  CREATE_WORD_STENCIL,
  CHANGE_NAME
} from "../actions.js";
import DefaultCanvas from "../../components/DefaultCanvas";

const words = [
  "heyo",
  "ayo",
  "hallo",
  "o",
  "pingu",
  "pengu",
  "yerp",
  "merp",
  "yert",
  "TRU",
  "OH NO",
  "ooop",
  "boop",
  "wah",
  "UH OH",
  "angery"
];

export const wireframerReducer = (state = DefaultCanvas, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_CANVAS:
      return action.canvas;
    case MOVE_STENCIL:
      newState.stencils[action.id].layout.x = action.newX;
      newState.stencils[action.id].layout.y = action.newY;
      return newState;
    case RESIZE_STENCIL:
      newState.stencils[action.id].layout.x = action.newX;
      newState.stencils[action.id].layout.y = action.newY;
      newState.stencils[action.id].layout.width += action.newWidth;
      newState.stencils[action.id].layout.height += action.newHeight;
      return newState;
    case SET_FOCUS:
      newState.focus = action.id;
      return newState;
    case EDIT_STENCIL:
      if (action.backgroundColor !== null)
        newState.stencils[state.focus].style.backgroundColor =
          action.backgroundColor;
      if (action.borderColor !== null)
        newState.stencils[state.focus].style.borderColor = action.borderColor;
      if (action.borderWidth !== null)
        newState.stencils[state.focus].style.borderWidth = action.borderWidth;
      if (action.borderRadius !== null)
        newState.stencils[state.focus].style.borderRadius = action.borderRadius;
      return newState;
    case CREATE_STENCIL:
      newState.stencils.push({
        type: "box",
        id: state.maxId + 1,
        layout: { width: 100, height: 100, x: 50, y: 50 },
        style: {
          backgroundColor: "springgreen",
          borderColor: "fuchsia",
          borderWidth: 2,
          borderRadius: 10
        }
      });
      newState.maxId += 1;
      newState.focus = newState.maxId;
      return newState;
    case CREATE_WORD_STENCIL:
      newState.stencils.push({
        type: "box",
        id: state.maxId + 1,
        layout: { width: 100, height: 100, x: 50, y: 50 },
        style: {
          backgroundColor: "springgreen",
          borderColor: "fuchsia",
          borderWidth: 2,
          borderRadius: 10
        },
        content: words[Math.floor(Math.random() * 16)]
      });
      newState.maxId += 1;
      newState.focus = newState.maxId;
      return newState;
    case CHANGE_NAME:
      newState.name = action.newName;
      return newState;
  }
  return state;
};
