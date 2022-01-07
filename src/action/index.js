import * as Types from "./../constant";

export const InitGameAction = (payload) => {
  return {
    type: Types.INIT_GAME,
    payload,
  };
};
export const AddGameAction = (payload) => {
  return {
    type: Types.ADD_GAME,
    payload,
  };
};

export const UpdateGameAction = (payload) => {
  return {
    type: Types.UPDATE_GAME,
    payload,
  };
};
export const DeleteGameAction = (payload) => {
  return {
    type: Types.DELETE_GAME,
    payload,
  };
};

export const AddIdeaAction = (payload) => {
  return {
    type: Types.ADD_IDEA,
    payload,
  };
};
export const UpdateIdeaAction = (payload) => {
  return {
    type: Types.UPDATE_IDEA,
    payload,
  };
};
export const DeleteIdeaAction = (payload) => {
  return {
    type: Types.DELETE_IDEA,
    payload,
  };
};

export const SelectGameAction = (payload) => {
  return {
    type: Types.SELECT_GAME,
    payload,
  };
};

export const getUserData = (payload) => {
  return {
    type: Types.GET_USER_DATA,
    payload,
  }
}