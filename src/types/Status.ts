export enum Status {
    SUCCESS,
    NO_ENTRIES = "No public repositories were found for this username.",
    UNKNOWN_USER = "The entered username does not exist on GitHub.",
    QUERY_ERROR = "Your request could not be processed. Please check your connection and try again.",
    GENERAL_ERROR = "An error occured. Please try again."
  }