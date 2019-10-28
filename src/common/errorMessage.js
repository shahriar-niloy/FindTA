const errorMessage = {
  200: "Operation Successful",
  400: "Bad request!",
  401: "User not logged in. Please log in to continue!",
  404: "Resource not found!",
  500: "Internal Server Error!",
  generic: "Couldn't perform the operation!",
  unexpected: "Unexpected error in application!",
  999: "Unexpected error in application!"
};

export const getErrorMessage = error => {
  let err = "";
  if (error.response) {
    switch (error.response.status) {
      case 400:
        err = errorMessage["400"];
        break;
      case 401:
        err = errorMessage["401"];
        break;
      default:
        err = errorMessage["generic"];
        break;
    }
  } else {
    err = errorMessage["unexpected"];
  }
  return err;
};

export const getErrorMessageByCode = code => {
  let err = "";
  switch (code) {
    case 400:
      err = errorMessage["400"];
      break;
    case 401:
      err = errorMessage["401"];
      break;
    default:
      err = errorMessage["generic"];
      break;
  }
  return err;
};
