const initialState = {
  isLoading: false,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzA2N2Q1MzE3YWUwMzgxZWU3YWI3OCIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTc0MDY2NDQwNiwiZXhwIjoxNzQwNjY1MzA2fQ.K5-clfAjLCTD0unyMbvSnzMvg0fVo5YSUmfMXOlwlHY",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
