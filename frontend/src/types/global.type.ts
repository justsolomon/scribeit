export interface User {
  id: string;
}

export interface APIDefaultErrorDetail {
  msg: string;
  type: 'value_error' | 'less_than';
}
export interface APIErrorResponse {
  data: {
    detail: string | APIDefaultErrorDetail[];
  };
}
