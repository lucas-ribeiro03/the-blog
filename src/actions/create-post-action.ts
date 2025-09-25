type createPostActionState = {
  numero: number;
};

export const createPostAction = async (
  prevState: createPostActionState
): Promise<createPostActionState> => {
  return {
    numero: prevState.numero + 1,
  };
};
